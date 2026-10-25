import looseMatch from 'unicode-loose-match';
import propertyAliases from 'unicode-property-aliases';
import regenerate from 'regenerate';
import utils from './utils.mjs';
import valueAliases from 'unicode-property-value-aliases';

const categoryAliases = valueAliases.get('General_Category');
const CODEPOINT_MAX = 0x10ffff;

const canonicalPropertyNames = new Map(
	[...propertyAliases.values()].map((name) => [name.toLowerCase(), name]),
);

const findCanonicalName = (shortName) => {
	const canonicalName =
		propertyAliases.get(shortName) ??
		canonicalPropertyNames.get(shortName.toLowerCase());
	if (!canonicalName) {
		return shortName;
	}
	return canonicalName;
};

const initialMapForType = (type, defaultScript) => {
	switch (type) {
		case 'scripts':
			return {
				[defaultScript]: regenerate().addRange(0, CODEPOINT_MAX),
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
const parseBlocksScriptsProperties = async (type, version) => {
	// Script=Unknown was introduced in Unicode 5.0. Earlier releases use Common.
	const defaultScript = parseInt(version, 10) < 5 ? 'Common' : 'Unknown';
	const map = initialMapForType(type, defaultScript);
	const source = utils.readDataFile(version, type);
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	for (const line of lines) {
		const trimmed = line.split('#')[0].trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const data = trimmed.split(';');
		if (type === 'derived-core-properties' && data.length > 2) {
			// Enumerated properties such as InCB have an explicit third field.
			continue;
		}
		const charRange = data[0].replace('..', '-').trim();
		let item = data[1].trim().replace(/\x20/g, '_');
		if (type === 'derived-normalization-properties') {
			if (item === 'FNC' || /^NFK?[CD]_(?:NO|MAYBE)$/.test(item)) {
				// Old Unicode versions up to v4.0.0 use the `FNC` alias instead of
				// `FC_NFKC` (for `FC_NFKC_Closure`), and record Quick_Check values
				// as e.g. `NFC_NO` or `NFC_MAYBE` instead of `NFC_QC; N`. These are
				// not binary properties.
				continue;
			} else {
				const canonical = findCanonicalName(item);
				if (canonical) {
					if (
						/FC_NFKC_Closure|^NFKC_(?:Simple_)?Casefold$|(?:NFC|NFD|NFKC|NFKD)_Quick_Check/.test(
							canonical,
						)
					) {
						// These are not binary properties, or their default value (in the
						// file) is not `True`.
						continue;
					}
					item = canonical;
				}
			}
		} else if (type === 'blocks') {
			// Use canonical block names. See #34.
			const tmp = looseMatch('Block', item).value;
			if (!tmp) {
				throw new Error(
					`Canonical block name not found for ${item}. Update \`unicode-loose-match\`.`,
				);
			}
			item = tmp;
		} else if (type === 'bidi-mirroring') {
			item = String.fromCodePoint(parseInt(item, 16));
		} else if (type === 'derived-general-category') {
			item = categoryAliases.get(item) || item;
		} else if (type === 'scripts') {
			// Older Scripts.txt files use names such as LATIN and OLD_ITALIC.
			item = looseMatch('Script', item).value;
			if (!item) {
				throw new Error(`Canonical script name not found in ${line}.`);
			}
		} else {
			item = findCanonicalName(item);
		}
		map[item] ??= regenerate();
		const rangeParts = charRange.split('-');
		if (rangeParts.length === 2) {
			const start = parseInt(rangeParts[0], 16);
			const end = parseInt(rangeParts[1], 16);
			map[item].addRange(start, end);
			if (type === 'scripts' && item !== defaultScript) {
				map[defaultScript].removeRange(start, end);
			}
		} else {
			const codepoint = parseInt(charRange, 16);
			map[item].add(codepoint);
			if (type === 'scripts' && item !== defaultScript) {
				map[defaultScript].remove(codepoint);
			}
		}
	}
	return map;
};

const parseDerivedBinaryProperties = async (version) => {
	if (
		version === '3.1.1' ||
		version === '3.1.0' ||
		version === '3.0.1' ||
		version === '3.0.0' ||
		parseInt(version.split('.')[0], 10) < 3
	) {
		// Unicode <= 3.1.1 does not provide derived-binary-properties,
		// so we should derive Bidi_Mirrored from the UnicodeData.
		const source = utils.readDataFile(version, 'database');
		if (!source) {
			return;
		}
		const result = [];
		for (const line of source.split('\n')) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#')) {
				continue;
			}
			const data = trimmed.split(';');
			if (data[9] === 'Y') {
				const codePoint = parseInt(data[0], 16);
				result.push(codePoint);
			}
		}
		return {
			Bidi_Mirrored: result,
		};
	} else {
		return await parseBlocksScriptsProperties(
			'derived-binary-properties',
			version,
		);
	}
};

const parseDerivedGeneralCategory = async (version) => {
	if (
		version === '3.0.1' ||
		version === '3.0.0' ||
		parseInt(version.split('.')[0], 10) < 3
	) {
		// Unicode <= 3.0.1 does not provide derived-general-category,
		// so we should derive General_Category from the UnicodeData.
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
		// Unicode 1.1.5 lists only U+4E00 as a representative of the Unified
		// Han ideographs. The Unicode 1.1 Han cross-reference table assigns the
		// whole 4E00..9FA5 range:
		// https://www.unicode.org/Public/1.1-Update/CJKXREF.TXT
		const representativeRangeEnds = new Map([
			['<CJK IDEOGRAPH REPRESENTATIVE>', 0x9fa5],
		]);
		// http://unicode.org/reports/tr44/#GC_Values_Table
		// http://unicode.org/reports/tr18/#Categories
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#')) {
				continue;
			}
			const data = trimmed.split(';');
			const codePoint = parseInt(data[0], 16);
			const name = data[1];
			const recordEnd = representativeRangeEnds.get(name) ?? codePoint;
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
					throw new Error('Database exception');
				}
			} else {
				// If there is a gap within UnicodeData, it must be unassigned code points.
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
						categoryMap[category].addRange(codePoint, recordEnd);
					}
				}
			}
			lastCodePoint = recordEnd;
		}

		if (lastCodePoint < CODEPOINT_MAX) {
			// Add the last unassigned code point range.
			const categories = [categoryAliases.get('C'), categoryAliases.get('Cn')];
			for (const category of categories) {
				categoryMap[category] ??= regenerate();
				categoryMap[category].addRange(lastCodePoint + 1, CODEPOINT_MAX);
			}
		}

		return categoryMap;
	} else {
		const map = await parseBlocksScriptsProperties(
			'derived-general-category',
			version,
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
};

const parseBlocks = async (version) => {
	let map;
	if (
		version === '3.0.1' ||
		version === '3.0.0' ||
		parseInt(version.split('.')[0], 10) < 3
	) {
		const source = utils.readDataFile(version, 'blocks');
		if (!source) {
			return;
		}
		map = {};
		const records = [];
		for (const line of source.trimEnd().split('\n')) {
			const record = line.split('#')[0].trim();
			if (!record) {
				continue;
			}
			const [start, end, blockName] = record
				.split(';')
				.map((field) => field.trim());
			const canonicalBlockName = looseMatch('Block', blockName).value;
			map[canonicalBlockName] ??= regenerate();
			records.push({
				block: canonicalBlockName,
				start: parseInt(start, 16),
				end: parseInt(end, 16),
			});
		}
		// The Unicode 2.0 blocks file lists FE70..FEFF as Arabic Presentation
		// Forms-B and FEFF..FEFF as Specials. Apply narrower ranges last so the
		// more specific entry wins, as the corrected Unicode 2.1.9 file does.
		records.sort((a, b) => b.end - b.start - (a.end - a.start));
		for (const { block, start, end } of records) {
			for (const codePoints of Object.values(map)) {
				codePoints.removeRange(start, end);
			}
			map[block].addRange(start, end);
		}
	} else {
		map = await parseBlocksScriptsProperties('blocks', version);
	}
	if (!map) {
		return;
	}
	// Block=No_Block covers every gap between the explicitly named blocks.
	const noBlock = regenerate().addRange(0, CODEPOINT_MAX);
	for (const [block, codePoints] of Object.entries(map)) {
		if (block !== 'No_Block') {
			noBlock.remove(codePoints);
		}
	}
	map.No_Block = noBlock;
	return map;
};

const parseProperties = async (version) => {
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
		let currentProperty, maybeProperty, maybeRange;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if ((maybeProperty = /0x[A-F\d]+ \((.+?)\)$/.exec(line)) != null) {
				currentProperty = maybeProperty[1];
				if (
					// Ignore Bidi_Class as they have been generated from UnicodeData.
					currentProperty.startsWith('Bidi:') ||
					// Unassigned code points are already available as General_Category=Cn.
					currentProperty === 'Unassigned Code Value'
				) {
					currentProperty = undefined;
					continue;
				}
				if (currentProperty === 'Not a Character') {
					currentProperty = 'Noncharacter_Code_Point';
				}
				currentProperty = currentProperty.replaceAll(' ', '_');
				currentProperty = findCanonicalName(currentProperty) ?? currentProperty;
				map[currentProperty] = regenerate();
			} else if (line.startsWith('Discrepancy ')) {
				// Unicode 2.1.8 includes comparisons with UnicodeData after each
				// record list. Those ranges are diagnostics, not property members.
				currentProperty = undefined;
			} else if (
				currentProperty &&
				(maybeRange = /^([A-F\d]{4,6})(?:\.\.([A-F\d]{4,6}))?(?=\s|$)/.exec(
					line,
				)) != null
			) {
				if (maybeRange[2]) {
					map[currentProperty].addRange(
						parseInt(maybeRange[1], 16),
						parseInt(maybeRange[2], 16),
					);
				} else {
					map[currentProperty].add(parseInt(maybeRange[1], 16));
				}
			}
		}
		return map;
	} else {
		return await parseBlocksScriptsProperties('properties', version);
	}
};

const parseScripts = (version) =>
	parseBlocksScriptsProperties('scripts', version);
const parseDerivedCoreProperties = (version) =>
	parseBlocksScriptsProperties('derived-core-properties', version);
const parseDerivedNormalizationProperties = (version) =>
	parseBlocksScriptsProperties('derived-normalization-properties', version);
const parseMirroring = (version) =>
	parseBlocksScriptsProperties('bidi-mirroring', version);

export {
	parseScripts,
	parseProperties,
	parseDerivedCoreProperties,
	parseDerivedNormalizationProperties,
	parseBlocks,
	parseMirroring,
	parseDerivedBinaryProperties,
	parseDerivedGeneralCategory,
};
