'use strict';

const scriptAliases = require('unicode-property-value-aliases').get('Script');
const utils = require('./utils.js');

const findCanonicalName = function(shortName) {
	return scriptAliases.get(shortName);
};

const parseScriptExtensions = function(version, scriptsMap) {
	// Old Unicode versions lack scripts data. Return early in such cases.
	if (!scriptsMap) {
		return;
	}
	// Turn the array of code points for each script into a set, so we can more
	// easily add/remove from them.
	const knownScriptNames = Object.keys(scriptsMap);
	for (const script of knownScriptNames) {
		scriptsMap[script] = new Set(scriptsMap[script]);
	}
	const source = utils.readDataFile(version, 'script-extensions');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const scripts = data[1].split('#')[0].trim().split(' ');
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				scripts.forEach(function(script) {
					const canonicalName = findCanonicalName(script);
					scriptsMap.Common.delete(codePoint);
					scriptsMap.Inherited.delete(codePoint);
					console.assert(
						scriptsMap[canonicalName],
						`canonical name for ${ script } = ${
						canonicalName } not present in \`scriptsMap\``
					);
					scriptsMap[canonicalName].add(codePoint);
				});
			});
		} else {
			scripts.forEach(function(script) {
				const canonicalName = findCanonicalName(script);
				const codePoint = parseInt(charRange, 16);
				scriptsMap.Common.delete(codePoint);
				scriptsMap.Inherited.delete(codePoint);
				console.assert(
					scriptsMap[canonicalName],
					`canonical name for ${ script } = ${
					canonicalName } not present in \`scriptsMap\``
				);
				scriptsMap[canonicalName].add(codePoint);
			});
		}
	});
	// Convert the sets back into arrays.
	for (const script of knownScriptNames) {
		scriptsMap[script] = [...scriptsMap[script]].sort((a, b) => a - b);
	}
	return scriptsMap;
};

module.exports = parseScriptExtensions;
