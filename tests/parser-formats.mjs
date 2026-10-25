import { test } from 'node:test';
import parseSpecialCasing from '../scripts/parse-special-casing.mjs';
import parseEmoji from '../scripts/parse-emoji.mjs';
import parseEmojiSequences from '../scripts/parse-emoji-sequences.mjs';
import parseBidiBrackets from '../scripts/parse-bidi-brackets.mjs';
import parseNameAliases from '../scripts/parse-name-aliases.mjs';
import {
	parseBlocks,
	parseDerivedCoreProperties,
} from '../scripts/parse-blocks-scripts-properties.mjs';
import utils from '../scripts/utils.mjs';

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
