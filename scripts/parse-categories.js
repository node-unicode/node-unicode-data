'use strict';

const utils = require('./utils.js');
const valueAliases = require('unicode-property-value-aliases');
const regenerate = require('regenerate');
const bidiAliases = valueAliases.get('Bidi_Class');
const categoryAliases = valueAliases.get('General_Category');

const CODEPOINT_MAX = 0x10ffff;

const parseDatabase = function (version) {
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	const categoryMap = {
		// Note: `Any`, `ASCII`, and `Assigned` are actually properties,
		// not categories. http://unicode.org/reports/tr18/#Categories
		Any: regenerate().addRange(0, CODEPOINT_MAX),
		ASCII: regenerate().addRange(0, 0x7f),
		Assigned: regenerate(),
	};
	let flag = false;
	let first = 0;
	let lastCodePoint = -1,
		lastName;
	// http://unicode.org/reports/tr44/#GC_Values_Table
	// http://unicode.org/reports/tr18/#Categories
	for (const line of lines) {
		if (line === '' || line.startsWith('#')) {
			continue;
		}
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];
		const generalCategory = data[2];
		const bidiCategory = data[4] === '' ? undefined : bidiAliases.get(data[4]);
		const categories = [
			categoryAliases.get(generalCategory),
			categoryAliases.get(generalCategory.charAt(0)),
			'Assigned',
		];
		if (/^(?:Ll|Lu|Lt)$/.test(generalCategory)) {
			categories.push(categoryAliases.get('LC'));
		}
		if (bidiCategory !== undefined) {
			categories.push('Bidi_' + bidiCategory);
		}
		for (const category of categories) {
			categoryMap[category] ??= regenerate();
		}
		if (flag) {
			if (/<.+, Last>/.test(name)) {
				flag = false;
				for (const category of categories) {
					categoryMap[category].addRange(first, codePoint);
				}
			} else {
				throw Error('Database exception');
			}
		} else {
			// If there is a gap within UnicodeData, it must be unassigned code points
			if (lastCodePoint + 1 < codePoint) {
				const categories = [
					categoryAliases.get('C'),
					categoryAliases.get('Cn'),
				];
				for (const category of categories) {
					categoryMap[category] ??= regenerate();
					categoryMap[category].addRange(lastCodePoint + 1, codePoint - 1);
				}
			}
			if (/<.+, First>/.test(name)) {
				flag = true;
				first = codePoint;
			} else {
				for (const category of categories) {
					categoryMap[category].add(codePoint);
				}
			}
		}
		(lastCodePoint = codePoint), (lastName = name);
	}

	if (lastCodePoint < CODEPOINT_MAX) {
		// Add the last unassigned code point range
		const categories = [categoryAliases.get('C'), categoryAliases.get('Cn')];
		for (const category of categories) {
			categoryMap[category] ??= regenerate();
			categoryMap[category].addRange(lastCodePoint + 1, CODEPOINT_MAX);
		}
	}

	return categoryMap;
};

module.exports = parseDatabase;
