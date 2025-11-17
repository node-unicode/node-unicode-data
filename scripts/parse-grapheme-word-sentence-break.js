'use strict';

const utils = require('./utils.js');
const regenerate = require('regenerate');

const parseGraphemeWordSentenceBreak = function(version, kind) {
	const source = utils.readDataFile(version, kind);
	if (!source) {
		return;
	}
	const map = {
		// All code points not explicitly listed have the value `Other` (`XX`).
		'Other': regenerate().addRange(0, 0x10FFFF)
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
		const canonicalName = value;
		map[canonicalName] ??= regenerate();
		if (rangeParts.length == 2) {
			const [from, to] = [
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16),
			];
			map['Other'].removeRange(from, to);
			map[canonicalName].addRange(from, to);
		} else {
			const codePoint = parseInt(charRange, 16);
			map['Other'].remove(codePoint);
			map[canonicalName].add(codePoint);
		}
	}
	return map;
};

module.exports = parseGraphemeWordSentenceBreak;
