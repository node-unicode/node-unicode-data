'use strict';

const utils = require('./utils.js');

const parseSimpleCaseMapping = function(version) {
	const maps = [
		// Simple_Uppercase_Mapping
		new Map(),
		// Simple_Lowercase_Mapping
		new Map(),
		// Simple_Titlecase_Mapping
		new Map()
	];
	// The column index of Simple_Uppwercase_Mapping in UnicodeData.txt
	// https://www.unicode.org/reports/tr44/#UnicodeData.txt
	const columnIndexOfSimpleUppercaseMapping = 12;

	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	for (const line of lines) {
		const lineTrimmed = line.trim();
		if (lineTrimmed === "" || lineTrimmed.startsWith("#")) {
			continue;
		}
		const data = lineTrimmed.split(';');
		const from = parseInt(data[0], 16);
		for (let columnOffset = 0; columnOffset <= 2; columnOffset++) {
			const raw = data[columnIndexOfSimpleUppercaseMapping + columnOffset];
			if (raw !== "") {
				const to = parseInt(raw, 16);
				if (isNaN(to)) {
					throw new Error("Cannot parse the unicode data: " + line)
				}
				maps[columnOffset].set(from, to);
			}
		}
	}
	return {
		Uppercase: maps[0],
		Lowercase: maps[1],
		Titlecase: maps[2]
	}
};

module.exports = parseSimpleCaseMapping;
