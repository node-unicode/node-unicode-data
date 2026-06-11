'use strict';

const utils = require('./utils.js');
const regenerate = require('regenerate');

const parseVerticalOrientation = function(version) {
	const source = utils.readDataFile(version, 'vertical-orientation');
	if (!source) {
		return;
	}
	const map = {
		// All other code points, assigned and unassigned, that are not listed explicitly in the data section of VerticalOrientation.txt are given the value R.
		'R': regenerate().addRange(0, 0x10FFFF)
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
		// Skip handling R since it's the default property value
		if (propertyValue === 'R') {
			continue;
		}
		if (rangeParts.length == 2) {
			const [from, to] = [
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16),
			];
			map['R'].removeRange(from, to);
			map[propertyValue].addRange(from, to);
		} else {
			const codePoint = parseInt(charRange, 16);
			map['R'].remove(codePoint);
			map[propertyValue].add(codePoint);
		}
	}
	return map;
};

module.exports = parseVerticalOrientation;
