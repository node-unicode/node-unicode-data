import { test } from 'node:test';
import fs from 'node:fs';
import parseCaseFolding from '../scripts/parse-case-folding.mjs';
import parseBidiClass from '../scripts/parse-bidi-class.mjs';
import parseNames from '../scripts/parse-names.mjs';
import utils from '../scripts/utils.mjs';
import parseDecompositionMapping from '../scripts/parse-decomposition-mapping.mjs';
import parseIndicConjunctBreak from '../scripts/parse-indic-conjunct-break.mjs';
import parseJoiningType from '../scripts/parse-joining-type.mjs';
import {
	parseDerivedCoreProperties,
	parseDerivedNormalizationProperties,
	parseProperties,
	parseScripts,
} from '../scripts/parse-blocks-scripts-properties.mjs';

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

test('Legacy property ranges preserve six-digit code points', async (t) => {
	const properties = await parseProperties('3.0.1');
	t.assert.ok(properties.Private_Use.contains(0x100000));
	t.assert.ok(properties.Private_Use.contains(0x10fffd));
	t.assert.ok(!properties.Private_Use.contains(0x10000));
	t.assert.ok(!properties.Private_Use.contains(0xffff));
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
