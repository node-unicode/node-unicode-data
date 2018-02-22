'use strict';

const utils = require('./utils.js');

const parseEmoji = function(version) {
	const source = utils.readDataFile(version, 'emoji');
	if (!source) {
		return;
	}
	const propertyMap = new Map();
	const lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		const data = line.trim().split(' ; ');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const property = data[1].split('#')[0].trim();
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				if (propertyMap.has(property)) {
					propertyMap.get(property).add(codePoint);
				} else {
					propertyMap.set(property, new Set([codePoint]));
				}
			});
		} else {
			const codePoint = parseInt(rangeParts, 16);
			if (propertyMap.has(property)) {
				propertyMap.get(property).add(codePoint);
			} else {
				propertyMap.set(property, new Set([codePoint]));
			}
		}
	});
	const plainObject = {};
	for (const [property, codePoints] of propertyMap) {
		plainObject[property] = [...codePoints].sort((a, b) => a - b);
	}
	return plainObject;
};

module.exports = parseEmoji;
