'use strict';

const utils = require('./utils.js');
const regenerate = require('regenerate');

const parseNames = function(version) {
	const map = {};
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const lines = source.split('\n');

	let flag = false;
	let first = 0;
	for (const line of lines) {
		if (line === '' || line.startsWith('#')) {
			continue;
		}
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];
		if (flag) {
			if (/<.+, Last>/.test(name)) {
				flag = false;
				const rangeName = /<(.+), Last>/.exec(name)[1];
				map[rangeName] ??= regenerate();
				map[rangeName].addRange(first, codePoint);
			} else {
				throw Error('Database exception');
			}
		} else {
			if (/<.+, First>/.test(name)) {
				flag = true;
				first = codePoint;
			} else {
				map[name] ??= regenerate();
				map[name].add(codePoint);
			}
		}
	}

	return map;
};

module.exports = parseNames;
