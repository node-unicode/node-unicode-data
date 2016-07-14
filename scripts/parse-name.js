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
			var match = /<([^>]+)>/.exec(name);

			if (match) {
				const rangeName = /(.+), (First|Last)/.exec(match[1]);

				if (rangeName) {
					if (flag && rangeName[2] === 'Last') {
						flag = false;

						utils.range(first, codePoint).forEach(function (value) {
							utils.append(map, rangeName[1] + ' ' + utils.codePointToHex(value), value);
						});
					} else if (!flag && rangeName[2] === 'First') {
						flag = true;
						first = codePoint;
					} else {
						throw Error('Database exception');
					}
				} else {
					utils.append(map, match[1] + ' ' + utils.codePointToHex(codePoint), codePoint);
				}
			} else {
				utils.append(map, name, codePoint);
			}
		}
	});

	return map;
};

module.exports = parseName;
