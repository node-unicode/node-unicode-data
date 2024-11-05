'use strict';

const scriptAliases = require('unicode-property-value-aliases').get('Script');
const utils = require('./utils.js');

const findCanonicalName = function(shortName) {
	return scriptAliases.get(shortName);
};

const parseScriptExtensions = function(version, scriptsMap) {
	const source = utils.readDataFile(version, 'script-extensions');
	if (!source) {
		return;
	}
	// Old Unicode versions lack scripts data. Return early in such cases.
	if (!scriptsMap) {
		return;
	}

	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const scripts = data[1].split('#')[0].trim().split(' ');
		if (rangeParts.length == 2) {
			const from = parseInt(rangeParts[0], 16),
				to = parseInt(rangeParts[1], 16);
				for (const script of scripts) {
					const canonicalName = findCanonicalName(script);
					scriptsMap.Common.removeRange(from, to);
					scriptsMap.Inherited.removeRange(from, to);
					console.assert(
						scriptsMap[canonicalName],
						`canonical name for ${script} = ${canonicalName} not present in \`scriptsMap\``
					);
					scriptsMap[canonicalName].addRange(from, to);
				}
		} else {
			const codePoint = parseInt(charRange, 16);
			for (const script of scripts) {
				const canonicalName = findCanonicalName(script);
				scriptsMap.Common.remove(codePoint);
				scriptsMap.Inherited.remove(codePoint);
				console.assert(
					scriptsMap[canonicalName],
					`canonical name for ${script} = ${canonicalName} not present in \`scriptsMap\``
				);
				scriptsMap[canonicalName].add(codePoint);
			}
		}
	};
	return scriptsMap;
};

module.exports = parseScriptExtensions;
