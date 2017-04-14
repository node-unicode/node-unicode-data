'use strict';

const aliases = require('unicode-property-value-aliases').get('Line_Break');
const utils = require('./utils.js');

const findCanonicalName = function(shortName) {
	return aliases.get(shortName);
};

const handled = new Set();

const parseLineBreak = function(version) {
	const source = utils.readDataFile(version, 'line-break');
	if (!source) {
		return;
	}
	const map = {};
	const lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const value = data[1].split('#')[0].trim();
		const canonicalName = findCanonicalName(value);
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				utils.append(map, canonicalName, codePoint);
				handled.add(codePoint);
			});
		} else {
			const codePoint = parseInt(charRange, 16);
			utils.append(map, canonicalName, codePoint);
			handled.add(codePoint);
		}
	});
	// All code points, assigned and unassigned, that are not listed explicitly
	// are given the value `XX`.
	for (let codePoint = 0x000000; codePoint <= 0x10FFFF; codePoint++) {
		if (!handled.has(codePoint)) {
			utils.append(map, 'Unknown', codePoint);
		}
	}
	return map;
};

module.exports = parseLineBreak;
