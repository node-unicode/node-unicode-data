'use strict';

const utils = require('./utils.js');

const parseNameAliases = function(version) {
	const map = {};
	const source = utils.readDataFile(version, 'name-aliases');
	if (!source) {
		return;
	}
	const lines = source.split('\n');

	let first = 0;
	lines.forEach(function(line) {
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];
		const type = data[2];


		if (!isNaN(codePoint)) {
			if (map[type] === undefined) {
				map[type] = {};
			}
			utils.append(map[type], codePoint, name);
		}
	});

	return map;
};

module.exports = parseNameAliases;
