import { test } from 'node:test';
import fs from 'node:fs';
import parseCaseFolding from '../scripts/parse-case-folding.mjs';
import parseBidiClass from '../scripts/parse-bidi-class.mjs';
import parseNames from '../scripts/parse-names.mjs';
import utils from '../scripts/utils.mjs';
import parseDecompositionMapping from '../scripts/parse-decomposition-mapping.mjs';
import parseIndicConjunctBreak from '../scripts/parse-indic-conjunct-break.mjs';
import parseJoiningType from '../scripts/parse-joining-type.mjs';
import parseSimpleCaseMapping from '../scripts/parse-simple-case-mapping.mjs';
import parseNameAliases from '../scripts/parse-name-aliases.mjs';
import parseLineBreak from '../scripts/parse-line-break.mjs';
import parseCompositionExclusions from '../scripts/parse-composition-exclusions.mjs';
import {
	parseBlocks,
	parseDerivedCoreProperties,
	parseDerivedGeneralCategory,
	parseDerivedNormalizationProperties,
	parseMirroring,
	parseProperties,
	parseScripts,
} from '../scripts/parse-blocks-scripts-properties.mjs';

test('Unicode 2.1.8 property values exclude discrepancy diagnostics', async (t) => {
	const properties = await parseProperties('2.1.8');
	t.assert.equal(properties.Math.toArray().length, 345);
	t.assert.equal(properties.Alphabetic.toArray().length, 15181);
	t.assert.equal(properties.Diacritic.toArray().length, 274);
	t.assert.ok(properties.Math.contains(0xffe9));
	t.assert.ok(!properties.Math.contains(0xffe8));
	t.assert.ok(properties.Alphabetic.contains(0x41));
	t.assert.ok(!properties.Alphabetic.contains(0x2d0));
	t.assert.ok(!properties.Alphabetic.contains(0x4e00));
	t.assert.ok(properties.Diacritic.contains(0x300));
	t.assert.ok(!properties.Diacritic.contains(0x640));
	// The next property's real records still include the ideograph.
	t.assert.ok(properties.Ideographic.contains(0x4e00));
});

test('Unicode 5.0 through 6.0 provide their historical correction aliases', async (t) => {
	for (const version of ['5.0.0', '5.1.0', '5.2.0', '6.0.0']) {
		const aliases = await parseNameAliases(version);
		t.assert.deepEqual(Object.keys(aliases), ['correction']);
		t.assert.equal(Object.keys(aliases.correction).length, 11);
		t.assert.deepEqual(aliases.correction[0x1a2], ['LATIN CAPITAL LETTER GHA']);
		t.assert.deepEqual(aliases.correction[0x1a3], ['LATIN SMALL LETTER GHA']);
		t.assert.deepEqual(aliases.correction[0x1d0c5], [
			'BYZANTINE MUSICAL SYMBOL FTHORA SKLIRON CHROMA VASIS',
		]);
	}
	t.assert.equal(await parseNameAliases('4.1.0'), undefined);
});

test('Historical titlecase digraphs retain their identity mapping', async (t) => {
	for (const version of ['1.1.5', '2.0.14', '3.2.0', '4.0.0', '18.0.0']) {
		const { Titlecase, Uppercase } = await parseSimpleCaseMapping(version);
		for (const cp of [0x1c5, 0x1c8, 0x1cb, 0x1f2]) {
			t.assert.equal(Titlecase.get(cp) ?? cp, cp, version);
			t.assert.equal(Uppercase.get(cp), cp - 1, version);
		}
	}
});

test('Block values cover Unicode, including No_Block gaps', async (t) => {
	for (const version of ['2.0.14', '2.1.8', '2.1.9', '3.1.0', '18.0.0']) {
		const blocks = await parseBlocks(version);
		t.assert.ok(blocks.No_Block.contains(0x40000), version);
		t.assert.ok(!blocks.No_Block.contains(0x41), version);
		const ranges = Object.values(blocks)
			.flatMap((set) => {
				const result = [];
				for (let i = 0; i < set.data.length; i += 2) {
					result.push(set.data.slice(i, i + 2));
				}
				return result;
			})
			.sort((a, b) => a[0] - b[0]);
		let end = 0;
		for (const [start, next] of ranges) {
			t.assert.equal(start, end, `${version}: Block must partition Unicode`);
			end = next;
		}
		t.assert.equal(end, 0x110000);
	}
	t.assert.equal(await parseBlocks('1.1.5'), undefined);
});

test('Legacy blocks retain every discontiguous Specials range', async (t) => {
	for (const version of [
		'2.0.14',
		'2.1.2',
		'2.1.5',
		'2.1.8',
		'2.1.9',
		'3.0.0',
		'3.0.1',
	]) {
		const blocks = await parseBlocks(version);
		t.assert.ok(blocks.Specials.contains(0xfeff), version);
		t.assert.ok(blocks.Specials.contains(0xfff0), version);
		t.assert.ok(blocks.Specials.contains(0xfffd), version);
		t.assert.ok(!blocks.Specials.contains(0xff00), version);
		t.assert.ok(!blocks.No_Block.contains(0xfeff), version);
		// The earliest source files also list U+FEFF in Arabic Presentation
		// Forms-B. The more specific Specials entry wins.
		t.assert.ok(!blocks.Arabic_Presentation_Forms_B.contains(0xfeff), version);
		t.assert.ok(blocks.Arabic_Presentation_Forms_B.contains(0xfefe), version);
	}
});

test('Hangul has pairwise canonical decomposition mappings', async (t) => {
	for (const version of ['2.0.14', '3.2.0', '18.0.0']) {
		const { Canonical } = await parseDecompositionMapping(version);
		t.assert.deepEqual(Canonical.get(0xac00), [0x1100, 0x1161]);
		t.assert.deepEqual(Canonical.get(0xac01), [0xac00, 0x11a8]);
		t.assert.deepEqual(Canonical.get(0xd7a3), [0xd788, 0x11c2]);
		for (let cp = 0xac00; cp <= 0xd7a3; cp++) {
			t.assert.equal(Canonical.get(cp)?.length, 2);
		}
	}
	t.assert.equal(await parseDecompositionMapping('1.1.5'), undefined);
});

test('Algorithmic ranges have individual formal names', async (t) => {
	for (const version of ['2.0.14', '3.2.0', '18.0.0']) {
		const names = await parseNames(version);
		for (const [cp, name] of [
			[0xac00, 'HANGUL SYLLABLE GA'],
			[0xac01, 'HANGUL SYLLABLE GAG'],
			[0xd7a3, 'HANGUL SYLLABLE HIH'],
			[0x4e00, 'CJK UNIFIED IDEOGRAPH-4E00'],
			[0xf900, 'CJK COMPATIBILITY IDEOGRAPH-F900'],
		]) {
			t.assert.ok(names[name]?.contains(cp), `${version}: ${name}`);
		}
		t.assert.equal(names['Hangul Syllable'], undefined);
		t.assert.equal(names['CJK Ideograph'], undefined);
		t.assert.equal(names['Private Use'], undefined);
		t.assert.equal(names['<control>'], undefined);
	}
	const names = await parseNames('18.0.0');
	for (const [cp, name] of [
		[0x20000, 'CJK UNIFIED IDEOGRAPH-20000'],
		[0x17000, 'TANGUT IDEOGRAPH-17000'],
		[0x18d00, 'TANGUT IDEOGRAPH-18D00'],
		[0x18e00, 'JURCHEN CHARACTER-18E00'],
		[0x19191, 'JURCHEN CHARACTER-19191'],
		[0x3d000, 'SMALL SEAL CHARACTER-3D000'],
		[0x3fc3f, 'SMALL SEAL CHARACTER-3FC3F'],
	]) {
		t.assert.ok(names[name]?.contains(cp), name);
	}
});

test('Names omit trailing spaces from the source data', async (t) => {
	const names = await parseNames('4.0.0');
	t.assert.ok(
		names['LATIN SMALL LETTER TURNED H WITH FISHHOOK'].contains(0x2ae),
	);
	t.assert.ok(names['ARABIC SMALL HIGH TAH'].contains(0x615));
	t.assert.deepEqual(
		Object.keys(names).filter((name) => name !== name.trim()),
		[],
	);
});

test('Unicode 1.1.5 assigns the Unified Han range represented by U+4E00', async (t) => {
	const categories = await parseDerivedGeneralCategory('1.1.5');
	for (const cp of [0x4e00, 0x4e01, 0x9fa5]) {
		t.assert.ok(categories.Other_Letter.contains(cp), cp.toString(16));
		t.assert.ok(categories.Assigned.contains(cp), cp.toString(16));
		t.assert.ok(!categories.Unassigned.contains(cp), cp.toString(16));
	}
	t.assert.ok(categories.Unassigned.contains(0x9fa6));
	t.assert.ok(!categories.Assigned.contains(0x9fa6));
});

test('Unicode 1.1.5 assigns the unlisted CJK compatibility ideographs', async (t) => {
	const categories = await parseDerivedGeneralCategory('1.1.5');
	for (const cp of [0xf900, 0xfa0e, 0xfa2d]) {
		t.assert.ok(categories.Other_Letter.contains(cp), cp.toString(16));
		t.assert.ok(categories.Letter.contains(cp), cp.toString(16));
		t.assert.ok(categories.Assigned.contains(cp), cp.toString(16));
		t.assert.ok(!categories.Unassigned.contains(cp), cp.toString(16));
		t.assert.ok(!categories.Other.contains(cp), cp.toString(16));
	}
	for (const cp of [0xf8ff, 0xfa2e]) {
		t.assert.ok(categories.Unassigned.contains(cp), cp.toString(16));
	}
});

test('Supplementary private-use planes are assigned from Unicode 2.0', async (t) => {
	for (const version of ['2.0.14', '2.1.9', '3.0.0', '3.0.1', '3.1.0']) {
		const categories = await parseDerivedGeneralCategory(version);
		for (const cp of [0xf0000, 0xffffd, 0x100000, 0x10fffd]) {
			const message = `${version}: ${cp.toString(16)}`;
			t.assert.ok(categories.Private_Use.contains(cp), message);
			t.assert.ok(categories.Assigned.contains(cp), message);
			t.assert.ok(!categories.Unassigned.contains(cp), message);
		}
		for (const cp of [0xeffff, 0xffffe, 0xfffff, 0x10ffff]) {
			const message = `${version}: ${cp.toString(16)}`;
			t.assert.ok(categories.Unassigned.contains(cp), message);
		}
	}
	const categories = await parseDerivedGeneralCategory('1.1.5');
	t.assert.ok(categories.Unassigned.contains(0xf0000));
});

test('Bidi class applies historical and current unassigned defaults', async (t) => {
	for (const version of [
		'3.0.0',
		'3.1.0',
		'3.2.0',
		'4.0.1',
		'14.0.0',
		'18.0.0',
	]) {
		const map = await parseBidiClass(version);
		t.assert.ok(map.Left_To_Right.contains(0x378));
		t.assert.ok(map.Right_To_Left.contains(0x590));
		t.assert.ok(map.Left_To_Right.contains(0x41));
		t.assert.ok(!map.Right_To_Left.contains(0x5b0));
		t.assert.ok(map.Nonspacing_Mark.contains(0x5b0));
		const ranges = Object.values(map)
			.flatMap((set) => {
				const result = [];
				for (let i = 0; i < set.data.length; i += 2)
					result.push(set.data.slice(i, i + 2));
				return result;
			})
			.sort((a, b) => a[0] - b[0]);
		let end = 0;
		for (const [start, next] of ranges) {
			t.assert.equal(
				start,
				end,
				`${version}: bidi classes must partition Unicode`,
			);
			end = next;
		}
		t.assert.equal(end, 0x110000);
	}
	const current = await parseBidiClass('18.0.0');
	t.assert.ok(current.Arabic_Letter.contains(0x7b2));
	t.assert.ok(current.European_Terminator.contains(0x20c2));
	t.assert.ok(current.Boundary_Neutral.contains(0xffff));
	t.assert.ok(current.Right_To_Left.contains(0x10cff));
});

test('Case folding declarations describe scalar and expansion values', async (t) => {
	const map = await parseCaseFolding('3.0.1');
	t.assert.equal(map.E.get(0xb5), 0x3bc);
	t.assert.deepEqual(map.E.get(0xdf), [0x73, 0x73]);
	utils.writeFiles({ version: 'parser-types-test', type: 'Case_Folding', map });
	const declaration = fs.readFileSync(
		new URL(
			'../output/unicode-parser-types-test/Case_Folding/E/code-points.d.mts',
			import.meta.url,
		),
		'utf8',
	);
	t.assert.match(declaration, /Map<number, number \| number\[\]>/);
});

test('ArabicShaping fallback derives implicit joining types', async (t) => {
	for (const version of ['3.2.0', '4.0.0', '4.0.1']) {
		const map = await parseJoiningType(version);
		for (const [cp, type] of [
			[0x41, 'Non_Joining'],
			[0x378, 'Non_Joining'],
			[0x300, 'Transparent'],
			[0x200e, 'Transparent'],
			[0x200c, 'Non_Joining'],
			[0x200d, 'Join_Causing'],
			[0x628, 'Dual_Joining'],
		]) {
			t.assert.ok(
				map[type].contains(cp),
				`${version}: ${cp.toString(16)}=${type}`,
			);
			t.assert.equal(
				Object.values(map).filter((set) => set.contains(cp)).length,
				1,
			);
		}
		if (version !== '3.2.0') {
			t.assert.ok(map.Non_Joining.contains(0x600));
			t.assert.ok(!map.Transparent.contains(0x600));
		}
	}
});

test('Historical Quick_Check values are not emitted as binary properties', async (t) => {
	for (const version of ['3.1.0', '3.1.1', '3.2.0', '4.0.0']) {
		const binary = await parseDerivedNormalizationProperties(version);
		for (const name of [
			'NFD_NO',
			'NFC_NO',
			'NFC_MAYBE',
			'NFKD_NO',
			'NFKC_NO',
			'NFKC_MAYBE',
		]) {
			t.assert.equal(binary[name], undefined, `${version}: ${name}`);
		}
		t.assert.ok(binary.Full_Composition_Exclusion.contains(0x340), version);
		t.assert.ok(binary.Expands_On_NFD.contains(0xc0), version);
	}
});

test('Normalization mappings are not emitted as binary properties', async (t) => {
	for (const version of ['15.1.0', '16.0.0', '17.0.0', '18.0.0']) {
		const binary = await parseDerivedNormalizationProperties(version);
		t.assert.equal(binary.NFKC_Simple_Casefold, undefined);
		t.assert.equal(binary.NFKC_Casefold, undefined);
		t.assert.ok(binary.Changes_When_NFKC_Casefolded.contains(0x41));
		t.assert.ok(binary.Full_Composition_Exclusion.contains(0x340));
	}
});

test('Indic conjunct break retains enumerated values', async (t) => {
	for (const version of ['15.1.0', '16.0.0', '17.0.0', '18.0.0']) {
		const map = await parseIndicConjunctBreak(version);
		t.assert.ok(map.Linker.contains(0x94d));
		t.assert.ok(map.Consonant.contains(0x915));
		t.assert.ok(map.Extend.contains(0x300));
		t.assert.ok(map.None.contains(0x41));
		for (const cp of [0x94d, 0x915, 0x300, 0x41]) {
			t.assert.equal(
				Object.values(map).filter((set) => set.contains(cp)).length,
				1,
			);
		}
		const binary = await parseDerivedCoreProperties(version);
		t.assert.equal(binary.InCB, undefined);
		t.assert.equal(binary.Indic_Conjunct_Break, undefined);
	}
	t.assert.equal(await parseIndicConjunctBreak('15.0.0'), undefined);
});

test('Binary property aliases use canonical names', async (t) => {
	for (const version of [
		'4.0.1',
		'4.1.0',
		'5.0.0',
		'6.3.0',
		'8.0.0',
		'18.0.0',
	]) {
		const properties = await parseProperties(version);
		t.assert.ok(properties.Sentence_Terminal.contains(0x21));
		t.assert.equal(properties.STerm, undefined);
	}
});

test('Historical White_space uses the canonical White_Space name', async (t) => {
	for (const version of [
		'2.0.14',
		'2.1.2',
		'2.1.8',
		'2.1.9',
		'3.0.0',
		'3.0.1',
		'3.1.0',
		'3.1.1',
	]) {
		const properties = await parseProperties(version);
		t.assert.ok(properties.White_Space.contains(0x20));
		t.assert.ok(properties.White_Space.contains(0x9));
		t.assert.equal(properties.White_space, undefined);
		// The legacy Space property is a distinct set, despite its modern alias.
		if (properties.Space) {
			t.assert.ok(properties.Space.contains(0x20));
			t.assert.ok(!properties.Space.contains(0x9));
		}
	}
});

test('Historical Script values use canonical names', async (t) => {
	for (const version of ['3.1.0', '3.1.1', '3.2.0', '4.0.0']) {
		const scripts = await parseScripts(version);
		t.assert.ok(scripts.Latin.contains(0x41));
		t.assert.ok(scripts.Greek.contains(0x3b1));
		t.assert.ok(scripts.Inherited.contains(0x300));
		t.assert.equal(scripts.LATIN, undefined);
		if (version === '3.2.0' || version === '4.0.0') {
			t.assert.ok(scripts.Old_Italic.contains(0x10300));
		}
	}
});

test('Early Line_Break data gives unlisted assigned code points AL', async (t) => {
	for (const version of ['3.1.0', '3.1.1', '3.2.0']) {
		const lineBreak = await parseLineBreak(version);
		for (const cp of [0xe000, 0xf8ff, 0xf0000, 0x10fffd]) {
			const message = `${version}: ${cp.toString(16)}`;
			t.assert.ok(lineBreak.Alphabetic.contains(cp), message);
			t.assert.ok(!lineBreak.Unknown.contains(cp), message);
		}
		// Unassigned code points keep XX.
		t.assert.ok(lineBreak.Unknown.contains(0x0378), version);
		t.assert.ok(lineBreak.Unknown.contains(0xfffff), version);
	}
	// Unicode 4.0 gives every unlisted code point XX.
	const lineBreak = await parseLineBreak('4.0.0');
	t.assert.ok(lineBreak.Unknown.contains(0xe000));
	t.assert.ok(!lineBreak.Alphabetic.contains(0xe000));
});

test('Unicode 3.0 Line_Break data expands First/Last ranges', async (t) => {
	for (const version of ['3.0.0', '3.0.1']) {
		const lineBreak = await parseLineBreak(version);
		for (const cp of [0x3400, 0x3401, 0x4db5, 0x4e00, 0x9fa5, 0xac00, 0xd7a3]) {
			t.assert.ok(lineBreak.Ideographic.contains(cp), `${version}: ${cp}`);
		}
		t.assert.ok(lineBreak.Surrogate.contains(0xdb80), version);
		t.assert.ok(lineBreak.Ambiguous.contains(0xe001), version);
		t.assert.ok(lineBreak.Contingent_Break.contains(0xfffc), version);
		t.assert.ok(lineBreak.Unknown.contains(0x0378), version);
	}
});

test('Composition exclusions are available from Unicode 3.0', async (t) => {
	for (const [version, size] of [
		['3.0.0', 66],
		['3.0.1', 66],
		['3.1.0', 80],
		['3.1.1', 80],
		['3.2.0', 81],
		['4.0.0', 81],
		['4.0.1', 81],
	]) {
		const { Composition_Exclusion } = await parseCompositionExclusions(version);
		t.assert.equal(Composition_Exclusion.toArray().length, size, version);
		t.assert.ok(Composition_Exclusion.contains(0x958), version);
		t.assert.equal(Composition_Exclusion.contains(0x1d1bf), size > 66, version);
	}
	t.assert.equal(await parseCompositionExclusions('2.1.9'), undefined);
});

test('Bidi mirroring data is available from Unicode 3.0.1', async (t) => {
	for (const [version, size] of [
		['3.0.1', 140],
		['3.1.0', 140],
		['3.1.1', 140],
		['3.2.0', 318],
		['4.0.0', 318],
		['4.0.1', 318],
	]) {
		const mirroring = await parseMirroring(version);
		const count = Object.values(mirroring).reduce(
			(sum, codePoints) => sum + codePoints.toArray().length,
			0,
		);
		t.assert.equal(count, size, version);
		t.assert.ok(mirroring[')'].contains(0x28), version);
	}
	t.assert.equal(await parseMirroring('3.0.0'), undefined);
});

test('Generated Bidi_Mirroring_Glyph keeps one-way mappings', async (t) => {
	// Unicode 3.2 maps U+2A2D to U+2A2C, while U+2A2C maps back to U+2A2B.
	const version = 'test-bidi-mirroring-glyph';
	const dir = new URL(`../output/unicode-${version}/`, import.meta.url);
	t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
	utils.writeFiles({
		version,
		map: await parseMirroring('3.2.0'),
		type: 'Bidi_Mirroring_Glyph',
	});
	const { default: glyphs } = await import(
		new URL('Bidi_Mirroring_Glyph/index.mjs', dir)
	);
	t.assert.equal(glyphs.size, 318);
	t.assert.equal(glyphs.get(0x2a2b), '\u2a2c');
	t.assert.equal(glyphs.get(0x2a2c), '\u2a2b');
	t.assert.equal(glyphs.get(0x2a2d), '\u2a2c');
	t.assert.equal(glyphs.get(0x2a2e), '\u2a2d');
	t.assert.equal(glyphs.get(0x28), ')');
	t.assert.equal(glyphs.get(0x29), '(');
});

test('Joining_Type is available from Unicode 2.0', async (t) => {
	for (const version of [
		'2.0.14',
		'2.1.9',
		'3.0.0',
		'3.1.0',
		'3.1.1',
		'4.0.1',
	]) {
		const joiningType = await parseJoiningType(version);
		t.assert.ok(joiningType.Right_Joining.contains(0x627), version);
		t.assert.ok(joiningType.Dual_Joining.contains(0x628), version);
		t.assert.ok(joiningType.Join_Causing.contains(0x640), version);
		t.assert.ok(joiningType.Transparent.contains(0x64b), version);
		t.assert.ok(joiningType.Non_Joining.contains(0x41), version);
	}
	// Syriac was added in Unicode 3.0.
	t.assert.ok((await parseJoiningType('2.1.9')).Non_Joining.contains(0x712));
	t.assert.ok((await parseJoiningType('3.0.0')).Dual_Joining.contains(0x712));
	// DerivedJoiningType lists ZWJ as Join_Causing from Unicode 3.1.1.
	t.assert.ok((await parseJoiningType('3.1.1')).Join_Causing.contains(0x200d));
	t.assert.equal(await parseJoiningType('1.1.5'), undefined);
});

test('Unicode 3.1.1 uses its corrected property list', async (t) => {
	const v310 = await parseProperties('3.1.0');
	const v311 = await parseProperties('3.1.1');
	t.assert.ok(v310.Hex_Digit.contains(0x1d7ce));
	t.assert.equal(v310.ASCII_Hex_Digit, undefined);
	t.assert.ok(!v311.Hex_Digit.contains(0x1d7ce));
	t.assert.ok(!v311.Hex_Digit.contains(0x1d7ff));
	t.assert.ok(v311.Hex_Digit.contains(0xff21));
	t.assert.deepEqual(
		v311.ASCII_Hex_Digit.toArray(),
		[...'0123456789ABCDEFabcdef'].map((c) => c.codePointAt(0)),
	);
});

test('Legacy property ranges preserve six-digit code points', async (t) => {
	const properties = await parseProperties('3.0.1');
	t.assert.ok(properties.Private_Use.contains(0x100000));
	t.assert.ok(properties.Private_Use.contains(0x10fffd));
	t.assert.ok(!properties.Private_Use.contains(0x10000));
	t.assert.ok(!properties.Private_Use.contains(0xffff));
});

test('Legacy noncharacter records are preserved as a binary property', async (t) => {
	const properties = await parseProperties('3.0.1');
	const noncharacters = properties.Noncharacter_Code_Point;
	t.assert.equal(noncharacters.toArray().length, 34);
	for (let plane = 0; plane <= 16; plane++) {
		t.assert.ok(noncharacters.contains((plane << 16) + 0xfffe));
		t.assert.ok(noncharacters.contains((plane << 16) + 0xffff));
	}
	t.assert.ok(!noncharacters.contains(0x378));
	// FDD0..FDEF became noncharacters in Unicode 3.1.
	t.assert.ok(!noncharacters.contains(0xfdd0));
	t.assert.equal(properties.Unassigned_Code_Value, undefined);
});

test('Property records do not require spaces around semicolons', async (t) => {
	for (const version of ['4.0.1', '4.1.0']) {
		const scripts = await parseScripts(version);
		t.assert.ok(scripts.Common.contains(0x100000));
		t.assert.ok(scripts.Common.contains(0x10fffd));
		t.assert.ok(!scripts.Unknown?.contains(0x100000));
	}
	for (const version of ['4.0.1', '4.1.0', '5.0.0']) {
		const core = await parseDerivedCoreProperties(version);
		t.assert.ok(core.Default_Ignorable_Code_Point.contains(0x10fffe));
		t.assert.ok(core.Default_Ignorable_Code_Point.contains(0x10ffff));
	}
});

test('Script defaults follow the Unicode version', async (t) => {
	for (const version of [
		'3.1.0',
		'3.1.1',
		'3.2.0',
		'4.0.0',
		'4.0.1',
		'4.1.0',
	]) {
		const scripts = await parseScripts(version);
		t.assert.ok(scripts.Common.contains(0x20));
		t.assert.ok(scripts.Common.contains(0x378));
		t.assert.ok(!scripts.Common.contains(0x41));
		t.assert.equal(scripts.Unknown, undefined);
	}
	const scripts = await parseScripts('5.0.0');
	t.assert.ok(scripts.Common.contains(0x20));
	t.assert.ok(scripts.Unknown.contains(0x378));
	t.assert.ok(!scripts.Common.contains(0x378));
});
