'use strict';

const utils = require('./utils.js');

const handled = new Set();

const parseWordBreak = function(version) {
	const source = utils.readDataFile(version, 'word-break');
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
		const canonicalName = value;
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach((codePoint) => {
				utils.append(map, canonicalName, codePoint);
				handled.add(codePoint);
			});
		} else {
			const codePoint = parseInt(charRange, 16);
			utils.append(map, canonicalName, codePoint);
			handled.add(codePoint);
		}
	});
	// All code points not explicitly listed have the value `Other` (`XX`).
	for (let codePoint = 0x000000; codePoint <= 0x10FFFF; codePoint++) {
		if (!handled.has(codePoint)) {
			utils.append(map, 'Other', codePoint);
		}
	}
	return map;
};

module.exports = parseWordBreak;
