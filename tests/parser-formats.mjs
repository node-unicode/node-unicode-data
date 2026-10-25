import { test } from 'node:test';
import parseSpecialCasing from '../scripts/parse-special-casing.mjs';
import parseEmoji from '../scripts/parse-emoji.mjs';
import parseEmojiSequences from '../scripts/parse-emoji-sequences.mjs';
import parseBidiBrackets from '../scripts/parse-bidi-brackets.mjs';
import parseNameAliases from '../scripts/parse-name-aliases.mjs';
import parseSimpleCaseMapping from '../scripts/parse-simple-case-mapping.mjs';
import parseJoiningType from '../scripts/parse-joining-type.mjs';
import parseCaseFolding from '../scripts/parse-case-folding.mjs';
import parseScriptExtensions from '../scripts/parse-script-extensions.mjs';
import {
	parseBlocks,
	parseDerivedCoreProperties,
	parseProperties,
	parseScripts,
} from '../scripts/parse-blocks-scripts-properties.mjs';
import utils from '../scripts/utils.mjs';

test('Legacy property diagnostics end a record section until the next heading', async (t) => {
	t.mock.method(
		utils,
		'readDataFile',
		() => `
Property dump for: 0x20000001 (Alphabetic)

  0041..005A  (26 chars)
Discrepancy A: Unilib but not UnicodeData

0041
Discrepancy B: UnicodeData but not Unilib

4E00..9FA5  (20902 chars)
Property dump for: 0x20010000 (Diacritic)

0300
  Discrepancy B: UnicodeData but not Unilib
0640
Property dump for: 0x01000000 (Bidi: Left-to-Right)

0041

Discrepancy B: UnicodeData but not Unilib

0042

Property dump for: 0x00000000 (Unassigned Code Value)

0378

Property dump for: 0x10000004 (White space)

0020
`,
	);
	const properties = await parseProperties('2.1.8');
	t.assert.deepEqual(Object.keys(properties), [
		'Alphabetic',
		'Diacritic',
		'White_Space',
	]);
	t.assert.deepEqual(
		properties.Alphabetic.toArray(),
		Array.from({ length: 26 }, (_, i) => 0x41 + i),
	);
	t.assert.deepEqual(properties.Diacritic.toArray(), [0x300]);
	t.assert.deepEqual(properties.White_Space.toArray(), [0x20]);
});

test('Simple case mappings ignore comments after empty and explicit titlecase fields', async (t) => {
	t.mock.method(utils, 'readDataFile', () =>
		[
			'  # A comment; with field delimiters',
			'0000;<control>;Cc;0;BN;;;;;N;;;;;# no case mappings; still a comment',
			'0041;LATIN CAPITAL LETTER A;Lu;0;L;;;;;N;;;;0061;# lowercase only',
			'0061;LATIN SMALL LETTER A;Ll;0;L;;;;;N;;;0041;;# null titlecase defaults to uppercase',
			'01C6;LATIN SMALL LETTER DZ WITH CARON;Ll;0;L;<compat> 0064 017E;;;;N;;;01C4;;01C5# explicit titlecase; # extra comment marker',
		].join('\n'),
	);
	for (const version of ['4.0.0', '18.0.0']) {
		const map = await parseSimpleCaseMapping(version);
		t.assert.equal(map.Uppercase.get(0x61), 0x41);
		t.assert.equal(map.Lowercase.get(0x41), 0x61);
		t.assert.equal(map.Titlecase.get(0x61), 0x41);
		t.assert.equal(map.Titlecase.get(0x1c6), 0x1c5);
		for (const mappings of Object.values(map)) {
			t.assert.ok(!mappings.has(0));
		}
	}
});

test('Script_Extensions accepts whitespace runs for singletons and ranges', async (t) => {
	const read = utils.readDataFile;
	let source;
	t.mock.method(utils, 'readDataFile', (version, type) =>
		type === 'script-extensions' ? source : read(version, type),
	);
	for (const separator of [' ', '  ', '\t', ' \t  ']) {
		source = `30FC; Hira${separator}Kana\n3031..3035; Hira${separator}Kana\n3099; Hira${separator}Kana\n`;
		const map = await parseScriptExtensions(
			'18.0.0',
			await parseScripts('18.0.0'),
		);
		for (const cp of [0x30fc, 0x3031, 0x3035, 0x3099]) {
			t.assert.ok(map.Hiragana.contains(cp));
			t.assert.ok(map.Katakana.contains(cp));
			t.assert.ok(!map.Common.contains(cp));
			t.assert.ok(!map.Inherited.contains(cp));
		}
		t.assert.ok(map.Hiragana.contains(0x3042));
		t.assert.ok(map.Katakana.contains(0x30a2));
		t.assert.ok(map.Common.contains(0x20));
	}
});

test('Case-folding expansions accept runs of whitespace between code points', async (t) => {
	let source;
	t.mock.method(utils, 'readDataFile', () => source);
	for (const separator of [' ', '  ', '\t', ' \t  ']) {
		source = `0130; F; 0069${separator}0307; # I WITH DOT\n0041; C; 0061; # A\n`;
		const map = await parseCaseFolding('18.0.0');
		t.assert.deepEqual(map.F.get(0x130), [0x69, 0x307]);
		t.assert.equal(map.C.get(0x41), 0x61);
	}
});

test('Explicit Non_Joining records remain in the default joining set', async (t) => {
	t.mock.method(utils, 'readDataFile', (version, type) =>
		type === 'derived-joining-type'
			? '0041; U\n0042..0043; U\n0628; D\n0300..0301; T\n'
			: undefined,
	);
	const map = await parseJoiningType('18.0.0');
	for (const [cp, type] of [
		[0x41, 'Non_Joining'],
		[0x42, 'Non_Joining'],
		[0x43, 'Non_Joining'],
		[0x378, 'Non_Joining'],
		[0x10ffff, 'Non_Joining'],
		[0x628, 'Dual_Joining'],
		[0x300, 'Transparent'],
		[0x301, 'Transparent'],
	]) {
		t.assert.ok(map[type].contains(cp));
		t.assert.equal(
			Object.values(map).filter((set) => set.contains(cp)).length,
			1,
		);
	}
	t.assert.equal(map.Non_Joining.toArray().length, 0x110000 - 3);
});

test('Null simple titlecase mappings default to uppercase mappings', async (t) => {
	t.mock.method(utils, 'readDataFile', () =>
		[
			'0061;LATIN SMALL LETTER A;Ll;0;L;;;;;N;;;0041;;',
			'01C6;LATIN SMALL LETTER DZ WITH CARON;Ll;0;L;<compat> 0064 017E;;;;N;;;01C4;;01C5',
			'0030;DIGIT ZERO;Nd;0;EN;;0;0;0;N;;;;;',
		].join('\n'),
	);
	for (const version of ['4.0.0', '18.0.0']) {
		const map = await parseSimpleCaseMapping(version);
		t.assert.equal(map.Titlecase.get(0x61), 0x41);
		t.assert.equal(map.Titlecase.get(0x1c6), 0x1c5);
		t.assert.ok(!map.Titlecase.has(0x30));
	}
});

test('SpecialCasing accepts optional comments and flexible whitespace', async (t) => {
	t.mock.method(
		utils,
		'readDataFile',
		() => `
  # Comment-only lines and whitespace-only lines are ignored.
\t
00DF;00DF;0053  0073;0053\t0053;
FB00 ; FB00 ; 0046 0066 ; 0046 0046 ; # comment with # and ; characters
`,
	);
	const map = await parseSpecialCasing('18.0.0');
	t.assert.deepEqual(map.Uppercase.get(0xdf), [0x53, 0x53]);
	t.assert.deepEqual(map.Titlecase.get(0xdf), [0x53, 0x73]);
	t.assert.deepEqual(map.Lowercase.get(0xdf), [0xdf]);
	t.assert.deepEqual(map.Uppercase.get(0xfb00), [0x46, 0x46]);
	t.assert.deepEqual(Object.keys(map).sort(), [
		'Lowercase',
		'Titlecase',
		'Uppercase',
	]);
});

test('Semicolons inside comments do not turn binary records into enumerated records', async (t) => {
	t.mock.method(
		utils,
		'readDataFile',
		() => `
0041 ; Alphabetic # note; still a comment
0300 ; InCB; Extend # an actual enumerated property
`,
	);
	const map = await parseDerivedCoreProperties('18.0.0');
	t.assert.deepEqual(Object.keys(map), ['Alphabetic']);
	t.assert.deepEqual(map.Alphabetic.toArray(), [0x41]);
});

test('Block names exclude inline comments in modern and legacy formats', async (t) => {
	t.mock.method(utils, 'readDataFile', (version) =>
		version === '3.0.1'
			? '\n  # comment\n0000;007F;Basic Latin # ASCII; block\n'
			: '\n  # comment\n0000..007F;Basic Latin # ASCII; block\n',
	);
	for (const version of ['3.0.1', '18.0.0']) {
		const map = await parseBlocks(version);
		t.assert.deepEqual(Object.keys(map).sort(), ['Basic_Latin', 'No_Block']);
		t.assert.ok(map.Basic_Latin.contains(0));
		t.assert.ok(map.Basic_Latin.contains(0x7f));
		t.assert.ok(!map.Basic_Latin.contains(0x80));
		t.assert.ok(!map.No_Block.contains(0x7f));
		t.assert.ok(map.No_Block.contains(0x80));
		t.assert.ok(map.No_Block.contains(0x10ffff));
	}
});

test('Repeated legacy block records accumulate without filling their gaps', async (t) => {
	t.mock.method(
		utils,
		'readDataFile',
		() => 'FEFF; FEFF; Specials\nFFF0; FFFD; Specials\n',
	);
	const blocks = await parseBlocks('3.0.1');
	t.assert.deepEqual(blocks.Specials.toArray(), [
		0xfeff,
		...Array.from({ length: 14 }, (_, i) => 0xfff0 + i),
	]);
	t.assert.ok(!blocks.No_Block.contains(0xfeff));
	t.assert.ok(!blocks.No_Block.contains(0xfffd));
	t.assert.ok(blocks.No_Block.contains(0xff00));
});

test('Name aliases ignore inline comments without splitting alias groups', async (t) => {
	t.mock.method(
		utils,
		'readDataFile',
		() => `
  # comment
000A;LINE FEED;control # note; still a comment
000A ; NEW LINE ; control
000A;LF;abbreviation # another name
`,
	);
	t.assert.deepEqual(await parseNameAliases('18.0.0'), {
		control: { 10: ['LINE FEED', 'NEW LINE'] },
		abbreviation: { 10: ['LF'] },
	});
});

test('Two-field historical name aliases are corrections', async (t) => {
	t.mock.method(
		utils,
		'readDataFile',
		() =>
			'  # Historical format\n01A2;LATIN CAPITAL LETTER GHA # corrected name\n01A3; LATIN SMALL LETTER GHA\n',
	);
	t.assert.deepEqual(await parseNameAliases('6.0.0'), {
		correction: {
			418: ['LATIN CAPITAL LETTER GHA'],
			419: ['LATIN SMALL LETTER GHA'],
		},
	});
});

test('Emoji properties accept compact and padded field separators', async (t) => {
	let source;
	t.mock.method(utils, 'readDataFile', () => source);
	for (const separator of [';', ' ; ', '\t;\t', '   ;\t']) {
		source = `  # comment\n\t\n231A..231B${separator}Emoji_Presentation # watches\n1F600${separator}Emoji\n`;
		const map = await parseEmoji('18.0.0');
		t.assert.deepEqual(map.Emoji_Presentation, [0x231a, 0x231b]);
		t.assert.deepEqual(map.Emoji, [0x1f600]);
	}
});

test('Emoji sequences preserve property names with flexible field spacing', async (t) => {
	const sources = {
		'emoji-sequences':
			'0023  FE0F\t20E3;Emoji_Keycap_Sequence; keycap\n231A..231B;Basic_Emoji; watches\n',
		'emoji-zwj-sequences':
			'1F469\t200D  1F4BB\t;\tEmoji_ZWJ_Sequence ; technologist\n',
		'emoji-test': '0023\tFE0F  20E3;fully-qualified # keycap\n',
	};
	t.mock.method(utils, 'readDataFile', (version, type) => sources[type]);
	const map = await parseEmojiSequences('18.0.0');
	t.assert.deepEqual(map.Emoji_Keycap_Sequence, ['#\ufe0f\u20e3']);
	t.assert.deepEqual(map.Basic_Emoji, ['\u231a', '\u231b']);
	t.assert.deepEqual(map.Emoji_ZWJ_Sequence, ['\u{1f469}\u200d\u{1f4bb}']);
	t.assert.deepEqual(map.Emoji_Test, ['#\ufe0f\u20e3']);
	t.assert.equal(map.keycap, undefined);
});

test('Bidi brackets do not depend on separator spacing', async (t) => {
	let source;
	t.mock.method(utils, 'readDataFile', () => source);
	for (const separator of [';', ' ; ', '\t;\t']) {
		source = `  # comment\n\t\n0028${separator}0029${separator}o\n0029${separator}0028${separator}c\n`;
		const map = await parseBidiBrackets('18.0.0');
		t.assert.deepEqual(map.Open.toArray(), [0x28]);
		t.assert.deepEqual(map.Close.toArray(), [0x29]);
		t.assert.ok(!map.None.contains(0x28));
		t.assert.ok(!map.None.contains(0x29));
		t.assert.ok(map.None.contains(0x41));
	}
});

test('SpecialCasing preserves empty mappings and normalizes condition separators', async (t) => {
	t.mock.method(
		utils,
		'readDataFile',
		() => '0307;0307;;;lt  After_Soft_Dotted;\n',
	);
	const map = await parseSpecialCasing('18.0.0');
	t.assert.deepEqual(
		map['Lowercase--lt--After_Soft_Dotted'].get(0x307),
		[0x307],
	);
	t.assert.deepEqual(map['Titlecase--lt--After_Soft_Dotted'].get(0x307), []);
	t.assert.deepEqual(map['Uppercase--lt--After_Soft_Dotted'].get(0x307), []);
});
