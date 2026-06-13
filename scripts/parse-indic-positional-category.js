'use strict';

const utils = require('./utils.js');
const regenerate = require('regenerate');

const parseIndicPositionalCategory = function(version) {
	const source = utils.readDataFile(version, 'indic-positional-category');
	if (!source) {
		return;
	}
	const NAKey = +version.split(".")[0] >= 17 ? 'Not_Applicable' : 'NA';
	const map = {
		// All code points not explicitly listed for Indic_Positional_Category have the value Not_Applicable (NA).
		[NAKey]: regenerate().addRange(0, 0x10FFFF)
	};
	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const value = data[1].split('#')[0].trim();
		const propertyValue = value;
		map[propertyValue] ??= regenerate();
		if (rangeParts.length == 2) {
			const [from, to] = [
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16),
			];
			map[NAKey].removeRange(from, to);
			map[propertyValue].addRange(from, to);
		} else {
			const codePoint = parseInt(charRange, 16);
			map[NAKey].remove(codePoint);
			map[propertyValue].add(codePoint);
		}
	}
	return map;
};

module.exports = parseIndicPositionalCategory;
