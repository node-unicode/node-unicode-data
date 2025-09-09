'use strict';

const looseMatch = require('unicode-loose-match');
const propertyAliases = require('unicode-property-aliases');
const regenerate = require('regenerate');
const utils = require('./utils.js');
const valueAliases = require('unicode-property-value-aliases');
const categoryAliases = valueAliases.get('General_Category');
const CODEPOINT_MAX = 0x10ffff;

const findCanonicalName = function(shortName) {
	const canonicalName = propertyAliases.get(shortName);
	if (!canonicalName) {
		// This is useful when adding newer versions, but fails for older Unicode versions.
		// TODO: Fix and re-enable the exception.
		//throw new Error(`Failed to find canonical name for property ${shortName}. Update \`unicode-property-aliases\`.`);
		return shortName;
	}
	return canonicalName;
};

const initialMapForType = function(type) {
	switch (type) {
		case 'scripts':
			return {
				Unknown: regenerate().addRange(0, CODEPOINT_MAX),
			};
		default:
			return {};
	}
};

/**
 * @param {'blocks' | 'bidi-mirroring' | 'derived-binary-properties' | 'derived-core-properties' | 'derived-general-category' | 'scripts'} type
 * @param {string} version
 * @returns
 */
const parseBlocksScriptsProperties = function(type, version) {
	const map = initialMapForType(type);
	const source = utils.readDataFile(version, type);
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	for (const line of lines) {
		if (
			/^#/.test(line) ||
			!(
				/^(?:blocks|bidi-mirroring|derived-general-category|properties)$/.test(type)
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
				const canonical = findCanonicalName(item);
				if (canonical) {
					if (/FC_NFKC_Closure|^NFKC_Casefold$|(?:NFC|NFD|NFKC|NFKD)_Quick_Check/.test(canonical)) {
						// These are not binary properties, or their default value (in the
						// file) is not `True`.
						continue;
					}
					item = canonical;
				}
			}
		} else if (type == 'blocks') {
			// Use canonical block names. See #34
			const tmp = looseMatch('Block', item).value;
			if (!tmp) {
				throw new Error(`Canonical block name not found for ${item}. Update \`unicode-loose-match\`.`);
			}
			item = tmp;
		} else if (type == 'bidi-mirroring') {
			item = String.fromCodePoint(parseInt(item, 16));
		} else if (type == 'derived-general-category') {
			item = categoryAliases.get(item) || item
		}
		map[item] ??= regenerate();
		const rangeParts = charRange.split('-');
		if (rangeParts.length == 2) {
			const start = parseInt(rangeParts[0], 16), end = parseInt(rangeParts[1], 16);
			map[item].addRange(start, end);
			if (type == 'scripts') {
				map.Unknown.removeRange(start, end);
			}
		} else {
			const codepoint = parseInt(charRange, 16);
			map[item].add(codepoint);
			if (type == 'scripts') {
				map.Unknown.remove(codepoint);
			}
		}
	}
	return map;
};

const parseDerivedBinaryProperties = function(version) {
	if (version === '3.1.1' || version === '3.1.0' || version === '3.0.1' || version === '3.0.0' || parseInt(version.split('.')[0], 10) < 3) {
		// Unicode <= 3.1.1 does not provide derived-binary-properties,
		// so we should derive Bidi_Mirrored from the UnicodeData
		const source = utils.readDataFile(version, 'database');
		if (!source) {
			return;
		}
		const result = [];
		for (const line of source.split('\n')) {
			if (line === '' || line.startsWith('#')) {
				continue;
			}
			const data = line.split(';');
			if (data[9] === 'Y') {
				const codePoint = parseInt(data[0], 16);
				result.push(codePoint);
			}
		}
		return {
			Bidi_Mirrored: result
		}
	} else {
		return parseBlocksScriptsProperties('derived-binary-properties', version);
	}
}

const parseDerivedGeneralCategory = function (version) {
	if (
		version === '3.0.1' ||
		version === '3.0.0' ||
		parseInt(version.split('.')[0], 10) < 3
	) {
		// Unicode <= 3.0.1 does not provide derived-general-category,
		// so we should derive General_Category from the UnicodeData
		const source = utils.readDataFile(version, 'database');
		if (!source) {
			return;
		}
		const lines = source.split('\n');
		const categoryMap = {
			// Note: `Any`, `ASCII`, and `Assigned` are actually properties,
			// not categories. http://unicode.org/reports/tr18/#Categories
			Any: regenerate().addRange(0, CODEPOINT_MAX),
			ASCII: regenerate().addRange(0, 0x7f),
			Assigned: regenerate(),
		};
		let flag = false;
		let first = 0;
		let lastCodePoint = -1;
		// http://unicode.org/reports/tr44/#GC_Values_Table
		// http://unicode.org/reports/tr18/#Categories
		for (const line of lines) {
			if (line === '' || line.startsWith('#')) {
				continue;
			}
			const data = line.trim().split(';');
			const codePoint = parseInt(data[0], 16);
			const name = data[1];
			const generalCategory = data[2];
			const categories = [
				categoryAliases.get(generalCategory),
				categoryAliases.get(generalCategory.charAt(0)),
				'Assigned',
			];
			if (/^(?:Ll|Lu|Lt)$/.test(generalCategory)) {
				categories.push(categoryAliases.get('LC'));
			}
			for (const category of categories) {
				categoryMap[category] ??= regenerate();
			}
			if (flag) {
				if (/<.+, Last>/.test(name)) {
					flag = false;
					for (const category of categories) {
						categoryMap[category].addRange(first, codePoint);
					}
				} else {
					throw Error('Database exception');
				}
			} else {
				// If there is a gap within UnicodeData, it must be unassigned code points
				if (lastCodePoint + 1 < codePoint) {
					const categories = [
						categoryAliases.get('C'),
						categoryAliases.get('Cn'),
					];
					for (const category of categories) {
						categoryMap[category] ??= regenerate();
						categoryMap[category].addRange(lastCodePoint + 1, codePoint - 1);
					}
				}
				if (/<.+, First>/.test(name)) {
					flag = true;
					first = codePoint;
				} else {
					for (const category of categories) {
						categoryMap[category].add(codePoint);
					}
				}
			}
			lastCodePoint = codePoint;
		}

		if (lastCodePoint < CODEPOINT_MAX) {
			// Add the last unassigned code point range
			const categories = [categoryAliases.get('C'), categoryAliases.get('Cn')];
			for (const category of categories) {
				categoryMap[category] ??= regenerate();
				categoryMap[category].addRange(lastCodePoint + 1, CODEPOINT_MAX);
			}
		}

		return categoryMap;
	} else {
		const map = parseBlocksScriptsProperties(
			'derived-general-category',
			version
		);
		const getCategory = (shortName) =>
			categoryAliases.get(shortName) || shortName;
		const getCategoryMap = (shortName) => map[getCategory(shortName)];

		// Note: `Any`, `ASCII`, and `Assigned` are actually properties,
		// not categories. http://unicode.org/reports/tr18/#Categories
		map['Any'] = regenerate().addRange(0, CODEPOINT_MAX);
		map['ASCII'] = regenerate().addRange(0, 0x7f);
		map['Assigned'] = regenerate()
			.addRange(0, CODEPOINT_MAX)
			.remove(getCategoryMap('Cn'));

		// https://www.unicode.org/reports/tr44/#General_Category_Values
		const categoryRules = {
			LC: ['Lu', 'Ll', 'Lt'],
			L: ['LC', 'Lm', 'Lo'],
			M: ['Mn', 'Mc', 'Me'],
			N: ['Nd', 'Nl', 'No'],
			P: ['Pc', 'Pd', 'Ps', 'Pe', 'Pi', 'Pf', 'Po'],
			S: ['Sm', 'Sc', 'Sk', 'So'],
			Z: ['Zs', 'Zl', 'Zp'],
			C: ['Cc', 'Cf', 'Cs', 'Co', 'Cn'],
		};
		for (const [key, values] of Object.entries(categoryRules)) {
			const result = regenerate();
			for (const value of values) {
				result.add(getCategoryMap(value));
			}
			map[getCategory(key)] = result;
		}
		return map;
	}
}

const parseBlocks = function (version) {
	if (version === '3.0.1' || version === '3.0.0' || parseInt(version.split('.')[0], 10) < 3) {
		const source = utils.readDataFile(version, 'blocks');
		if (!source) {
			return;
		}
		const map = {};
		for (const line of source.trimEnd().split('\n')) {
			if (line.startsWith('#')) {
				continue;
			}
			const [start, end, blockName] = line.split('; ');
			const canonicalBlockName = looseMatch('Block', blockName).value;
			map[canonicalBlockName] = regenerate().addRange(
				parseInt(start, 16),
				parseInt(end, 16)
			);
		}
		return map;
	} else {
		return parseBlocksScriptsProperties('blocks', version);
	}
}

const parseProperties = function (version) {
	if (
		version === '3.0.1' ||
		version === '3.0.0' ||
		parseInt(version.split('.')[0], 10) < 3
	) {
		const source = utils.readDataFile(version, 'properties');
		if (!source) {
			return;
		}
		const map = {};
		const lines = source.trimEnd().split('\n');
		let currentProperty, maybeProperty, maybeRange
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if ((maybeProperty = /0x[A-F\d]+ \((.+?)\)$/.exec(line)) != null) {
				currentProperty = maybeProperty[1];
				if (
					// ignore Bidi_Class as they have been generated from UnicodeData
					currentProperty.startsWith("Bidi:") ||
					// ignore Not a Character and Unassigned Code Value as they have been generated from UnicodeData
					currentProperty === "Not a Character" ||
					currentProperty === "Unassigned Code Value"
				) {
					// skip contents
					i++;
					while (++i < lines.length && lines[i] !== "");
					continue;
				}
				currentProperty = currentProperty.replaceAll(' ', '_');
				currentProperty = findCanonicalName(currentProperty) ?? currentProperty;
				map[currentProperty] = regenerate();
			} else if ((maybeRange = /^([A-F\d]{4,5})(?:..([A-F\d]{4,5}))?/.exec(line)) != null) {
				if (maybeRange[2]) {
					map[currentProperty].addRange(
						parseInt(maybeRange[1], 16),
						parseInt(maybeRange[2], 16)
					);
				} else {
					map[currentProperty].add(parseInt(maybeRange[1], 16));
				}
			}
		}
		return map;
	} else {
		return parseBlocksScriptsProperties('properties', version);
	}
};

module.exports = {
	'parseScripts': parseBlocksScriptsProperties.bind(null, 'scripts'),
	'parseProperties': parseProperties,
	'parseDerivedCoreProperties': parseBlocksScriptsProperties.bind(null, 'derived-core-properties'),
	'parseDerivedNormalizationProperties': parseBlocksScriptsProperties.bind(null, 'derived-normalization-properties'),
	'parseBlocks': parseBlocks,
	'parseMirroring': parseBlocksScriptsProperties.bind(null, 'bidi-mirroring'),
	'parseDerivedBinaryProperties': parseDerivedBinaryProperties,
	'parseDerivedGeneralCategory': parseDerivedGeneralCategory
};
