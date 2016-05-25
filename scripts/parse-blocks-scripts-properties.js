'use strict';

const propertyAliases = require('unicode-property-aliases');
const utils = require('./utils.js');

const parseBlocksScriptsProperties = function(type, version) {
	// `type` is 'properties', 'derived-core-properties', 'scripts', 'blocks',
	// 'bidi-brackets', or 'bidi-mirroring'.
	const map = {};
	const source = utils.readDataFile(version, type);
	if (!source) {
		return;
	}
	const isBidiBrackets = type == 'bidi-brackets';
	const bidiBracketMap = new Map([
		['o', 'Open'],
		['c', 'Close'],
		['n', 'None']
	]);
	const lines = source.split('\n');
	lines.forEach(function(line) {
		if (
			/^#/.test(line) ||
			!(
				/^(?:blocks|bidi-mirroring|bidi-brackets)$/.test(type)
					? /;\x20/.test(line)
					: /\x20;\x20/.test(line)
			)
		) {
			return;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		let item = data[ isBidiBrackets ? 2 : 1 ].split(
			type == 'blocks' ? ';' : '#'
		)[0].trim().replace(/\x20/g, '_');
		if (type == 'derived-normalization-properties') {
			if (item == 'FNC') {
				// Old Unicode versions up to v4.0.0 use the `FNC` alias instead of
				// `FC_NFKC`.
				item = 'FC_NFKC_Closure';
			} else {
				const canonical = propertyAliases.get(item);
				if (canonical) {
					if (/NFKC_Casefold|(?:NFC|NFD|NFKC|NFKD)_Quick_Check/.test(canonical)) {
						// These are not binary properties.
						return;
					}
					item = canonical;
				}
			}
		}
		if (isBidiBrackets) {
			item = bidiBracketMap.get(item);
		} else if (type == 'bidi-mirroring') {
			item = String.fromCodePoint(parseInt(item, 16));
		}
		const rangeParts = charRange.split('-');
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				utils.append(map, item, codePoint);
			});
		} else {
			utils.append(map, item, parseInt(charRange, 16));
		}
	});
	return map;
};

module.exports = {
	'parseScripts': parseBlocksScriptsProperties.bind(null, 'scripts'),
	'parseProperties': parseBlocksScriptsProperties.bind(null, 'properties'),
	'parseDerivedCoreProperties': parseBlocksScriptsProperties.bind(null, 'derived-core-properties'),
	'parseDerivedNormalizationProperties': parseBlocksScriptsProperties.bind(null, 'derived-normalization-properties'),
	'parseBlocks': parseBlocksScriptsProperties.bind(null, 'blocks'),
	'parseMirroring': parseBlocksScriptsProperties.bind(null, 'bidi-mirroring'),
	'parseBrackets': parseBlocksScriptsProperties.bind(null, 'bidi-brackets')
};
