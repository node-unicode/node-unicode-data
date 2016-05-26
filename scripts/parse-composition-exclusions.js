'use strict';

const utils = require('./utils.js');

const parseCompositionExclusions = function(version) {
	const map = {};
	const source = utils.readDataFile(version, 'composition-exclusions');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		const data = line.trim().split('#');
		const propertyName = 'Composition_Exclusion';
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				utils.append(map, propertyName, codePoint);
			});
		} else {
			const codePoint = parseInt(charRange, 16);
			utils.append(map, propertyName, codePoint);
		}
	});
	return map;
};

module.exports = parseCompositionExclusions;
