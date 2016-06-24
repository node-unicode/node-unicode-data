'use strict';

const utils = require('./utils.js');

const parseCaseFolding = function(version) {
	const caseFoldingMap = {};
	const source = utils.readDataFile(version, 'case-folding');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const status = data[1].trim();
		const mappings = data[2].trim().split(' ').map(function(codePoint) {
			return parseInt(codePoint, 16);
		}); // Note: this could be two characters!
		if (!caseFoldingMap[status]) {
			caseFoldingMap[status] = new Map();
		}
		caseFoldingMap[status].set(
			codePoint,
			mappings.length == 1 ? mappings[0] : mappings
		);
	});
	return caseFoldingMap;
};

module.exports = parseCaseFolding;
