'use strict';

const looseMatch = require('unicode-loose-match');
const propertyAliases = require('unicode-property-aliases');
const utils = require('./utils.js');

const parseBlocksScriptsProperties = function(type, version) {
	// `type` is 'properties', 'derived-core-properties', 'scripts', 'blocks',
	// or 'bidi-mirroring'.
	const map = {};
	const source = utils.readDataFile(version, type);
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	for (const line of lines) {
		if (
			/^#/.test(line) ||
			!(
				/^(?:blocks|bidi-mirroring|properties)$/.test(type)
					? /;\x20/.test(line)
					: /\x20;\x20/.test(line)
			)
		) {
			continue;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		let item = data[1].split(
			type == 'blocks' ? ';' : '#'
		)[0].trim().replace(/\x20/g, '_');
		if (type == 'derived-normalization-properties') {
			if (item == 'FNC') {
				// Old Unicode versions up to v4.0.0 use the `FNC` alias instead of
				// `FC_NFKC` (for `FC_NFKC_Closure`). This is not a binary property.
				continue;
			} else {
				const canonical = propertyAliases.get(item);
				if (canonical) {
					if (/FC_NFKC_Closure|NFKC_Casefold|(?:NFC|NFD|NFKC|NFKD)_Quick_Check/.test(canonical)) {
						// These are not binary properties, or their default value (in the
						// file) is not `True`.
						continue;
					}
					item = canonical;
				}
			}
		}
		if (type == 'blocks') {
			// Use canonical block names. See #34
			const tmp = looseMatch('Block', item).value;
			console.assert(item, `Canonical block name not found for ${item}`);
			item = tmp;
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
	}
	return map;
};

module.exports = {
	'parseScripts': parseBlocksScriptsProperties.bind(null, 'scripts'),
	'parseProperties': parseBlocksScriptsProperties.bind(null, 'properties'),
	'parseDerivedCoreProperties': parseBlocksScriptsProperties.bind(null, 'derived-core-properties'),
	'parseDerivedNormalizationProperties': parseBlocksScriptsProperties.bind(null, 'derived-normalization-properties'),
	'parseBlocks': parseBlocksScriptsProperties.bind(null, 'blocks'),
	'parseMirroring': parseBlocksScriptsProperties.bind(null, 'bidi-mirroring')
};
