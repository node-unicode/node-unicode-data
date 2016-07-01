'use strict';

const utils = require('./utils.js');

const parseName = function(version) {
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
				} else {
					throw Error('Database exception');
				}
			} else {
				if (/<.+, First>/.test(name)) {
					flag = true;
					first = codePoint;
				} else {
					const oldName = data[10];

					if (/<control>/.test(name)) {
						if (oldName !== "") {
							utils.append(map, oldName, codePoint);
						}
					} else {
						utils.append(map, name, codePoint);
					}
				}
			}
		}
	});

	return map;
};

module.exports = parseName;
