'use strict';

const utils = require('./utils.js');

const parseSpecialCasing = function(version) {
	const specialCasingMap = {};
	const source = utils.readDataFile(version, 'special-casing');
	if (!source) {
		return;
	}
	for (const line of source.split('\n')) {
		if (line === "" || line.startsWith("#")) {
			continue;
		}
		const data = line.slice(0, line.lastIndexOf("#")).split('; ');
		const from = parseInt(data[0], 16);

		const lowercase = data[1] === "" ? [] : data[1].split(' ').map(function(codePoint) {
			return parseInt(codePoint, 16);
		}); // Note: this could be zero or two characters!
		const titlecase = data[2] === "" ? [] : data[2].split(' ').map(function(codePoint) {
			return parseInt(codePoint, 16);
		}); // Note: this could be zero or two characters!
		const uppercase = data[3] === "" ? [] : data[3].split(' ').map(function(codePoint) {
			return parseInt(codePoint, 16);
		}); // Note: this could be zero or two characters!
		
		// conditions can contain a language ID defined by BCP 47 and casing contexts
		// defined in Table 3-17 Context Specification for Casing
		// https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-3/#G54277
		// Because the language ID may contain `-`, we let `--` be the separator
		// between the language ID and the casing contexts.
		const conditions = data[4].replaceAll(" ", "--");
		const storageKeyPostfix = conditions ? "--" + conditions : ""
		specialCasingMap["Lowercase" + storageKeyPostfix] ??= new Map();
		specialCasingMap["Lowercase" + storageKeyPostfix].set(from, lowercase);
		specialCasingMap["Titlecase" + storageKeyPostfix] ??= new Map();
		specialCasingMap["Titlecase" + storageKeyPostfix].set(from, titlecase);
		specialCasingMap["Uppercase" + storageKeyPostfix] ??= new Map();
		specialCasingMap["Uppercase" + storageKeyPostfix].set(from, uppercase);
	}
	return specialCasingMap;
};

module.exports = parseSpecialCasing;
