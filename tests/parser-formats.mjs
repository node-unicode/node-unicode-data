import { test } from 'node:test';
import parseSpecialCasing from '../scripts/parse-special-casing.mjs';
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
