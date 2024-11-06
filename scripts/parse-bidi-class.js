'use strict';

const utils = require('./utils.js');
const valueAliases = require('unicode-property-value-aliases');
const regenerate = require('regenerate');
const bidiAliases = valueAliases.get('Bidi_Class');

const parseBidiClass = function (version) {
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const categoryMap = {};
	const lines = source.split('\n');
	let flag = false;
	let first = 0;
	for (const line of lines) {
		if (line === '' || line.startsWith('#')) {
			continue;
		}
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];
		const bidiCategory = data[4] === '' ? undefined : bidiAliases.get(data[4]);
		if (bidiCategory === undefined) {
			continue;
		}
		categoryMap[bidiCategory] ??= regenerate();
		if (flag) {
			if (/<.+, Last>/.test(name)) {
				flag = false;
				categoryMap[bidiCategory].addRange(first, codePoint);
			} else {
				throw Error('Database exception');
			}
		} else {
			if (/<.+, First>/.test(name)) {
				flag = true;
				first = codePoint;
			} else {
				categoryMap[bidiCategory].add(codePoint);
			}
		}
	}

	return categoryMap;
};

module.exports = parseBidiClass;
