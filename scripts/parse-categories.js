'use strict';

const utils = require('./utils.js');
const valueAliases = require('unicode-property-value-aliases');
const bidiAliases = valueAliases.get('Bidi_Class');
const categoryAliases = valueAliases.get('General_Category');

const parseDatabase = function(version) {
	const symbolMap = new Map();
	const bidiMap = new Map();
	const bidiMirrored = new Set();
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
		const isBidiMirrored = data[9] == 'Y';
		if (isBidiMirrored) {
			bidiMirrored.add(codePoint);
		}
		const bidiCategory = bidiAliases.get(data[4]);
		if (flag) {
			if (/<.+, Last>/.test(name)) {
				flag = false;
				utils.range(first, codePoint).forEach(function(value) {
					symbolMap.set(value, generalCategory);
					bidiMap.set(value, bidiCategory);
				});
			} else {
				throw Error('Database exception');
			}
		} else {
			if (/<.+, First>/.test(name)) {
				flag = true;
				first = codePoint;
			} else {
				symbolMap.set(codePoint, generalCategory);
				bidiMap.set(codePoint, bidiCategory);
			}
		}
	});

	// http://unicode.org/reports/tr44/#GC_Values_Table
	// http://unicode.org/reports/tr18/#Categories
	const categoryMap = {};
	let categories = [];
	for (let codePoint = 0x000000; codePoint <= 0x10FFFF; codePoint++) {
		// Note: `Any`, `ASCII`, and `Assigned` are actually properties,
		// not categories. http://unicode.org/reports/tr18/#Categories
		if (!symbolMap.has(codePoint)) {
			categories = ['Any', 'C', 'Cn'];
		} else {
			const tmp = symbolMap.get(codePoint);
			categories = ['Any', tmp, tmp.charAt(0), 'Assigned'];
			if (/^(?:Ll|Lu|Lt)$/.test(tmp)) {
				categories.push('LC');
			}
			if (codePoint <= 0x7F) {
				categories.push('ASCII');
			}
		}
		if (bidiMap.has(codePoint)) {
			categories.push('Bidi_' + bidiMap.get(codePoint));
		}
		if (bidiMirrored.has(codePoint)) {
			categories.push('Bidi_Mirrored');
		}
		for (const category of categories) {
			utils.append(
				categoryMap,
				categoryAliases.get(category) || category,
				codePoint
			);
		}
	}
	return categoryMap;
};

module.exports = parseDatabase;
