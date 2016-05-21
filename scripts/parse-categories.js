'use strict';

const utils = require('./utils.js');
const bidiAliases = require('unicode-property-value-aliases').get('Bidi_Class');

const parseDatabase = function(version) {
	const symbolMap = {};
	const bidiMap = {};
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	let flag = false;
	let first = 0;
	lines.forEach(function(line) {
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];
		const generalCategory = data[2];
		const bidiCategory = bidiAliases.get(data[4]);
		if (flag) {
			if (/<.+, Last>/.test(name)) {
				flag = false;
				utils.range(first, codePoint).forEach(function(value) {
					symbolMap[value] = generalCategory;
					bidiMap[value] = bidiCategory;
				});
			} else {
				throw Error('Database exception');
			}
		} else {
			if (/<.+, First>/.test(name)) {
				flag = true;
				first = codePoint;
			} else {
				symbolMap[codePoint] = generalCategory;
				bidiMap[codePoint] = bidiCategory;
			}
		}
	});

	// http://unicode.org/reports/tr44/#GC_Values_Table
	// http://unicode.org/reports/tr18/#Categories
	const categoryMap = {};
	let categories = [];
	utils.range(0x000000, 0x10FFFF).forEach(function(codePoint) {
		// Note: `Any`, `ASCII`, and `Assigned` are actually properties,
		// not categories. http://unicode.org/reports/tr18/#Categories
		if (!symbolMap.hasOwnProperty(codePoint)) {
			categories = ['Any', 'C', 'Cn'];
		} else {
			const tmp = symbolMap[codePoint];
			categories = ['Any', tmp, tmp.charAt(0), 'Assigned'];
			if (/^(?:Ll|Lu|Lt)$/.test(tmp)) {
				categories.push('LC');
			}
			if (codePoint <= 0x7F) {
				categories.push('ASCII');
			}
		}
		if (bidiMap[codePoint]) {
			categories.push('Bidi_' + bidiMap[codePoint]);
		}
		categories.forEach(function(category) {
			utils.append(categoryMap, category, codePoint);
		});
	});
	return categoryMap;
};

module.exports = parseDatabase;
