'use strict';

const utils = require('./utils.js');

const parseNames = function(version) {
	const map = {};
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const lines = source.split('\n');

	let flag = false;
	let first = 0;
	lines.forEach(function(line) {
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];

		if (!isNaN(codePoint)) {
			if (flag) {
				if (/<.+, Last>/.test(name)) {
					flag = false;
					const rangeName = /<(.+), Last>/.exec(name)[1];

					utils.range(first, codePoint).forEach(function (value) {
						utils.append(map, rangeName, value);
					});
				} else {
					throw Error('Database exception');
				}
			} else {
				if (/<.+, First>/.test(name)) {
					flag = true;
					first = codePoint;
				} else {
					utils.append(map, name, codePoint);
				}
			}
		}
	});

	return map;
};

module.exports = parseNames;
