import { suite, test } from 'node:test';
import resources from '../data/resources.mjs';

const oldest = resources[0].version;
const newest = resources.at(-1).version;

if (!process.env.CI) {
	const { default: generateData } = await import('../index.mjs');
	// Generate the data for the oldest and newest available Unicode version.
	await generateData(oldest);
	await generateData(newest);
}

suite(`The generated Unicode ${oldest} js`, () => {
	test('General_Category/Modifier_Letter should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${oldest}/General_Category/Modifier_Letter/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('Binary_Property/ASCII should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${oldest}/Binary_Property/ASCII/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('Bidi_Class/Right_To_Left should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${oldest}/Bidi_Class/Right_To_Left/ranges.mjs`);
		t.assert.snapshot(data);
	});
});

suite(`The generated latest Unicode js`, () => {
	test('Block/Bopomofo should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/Block/Bopomofo/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('General_Category/Modifier_Letter should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/General_Category/Modifier_Letter/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('Binary_Property/Sentence_Terminal should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/Binary_Property/Sentence_Terminal/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('Binary_Property/Hex_Digit should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/Binary_Property/Hex_Digit/ranges.mjs`);
		t.assert.snapshot(data); // Note: `Hex_Digit` is a derived core property.
	});
	test('Bidi_Class/Pop_Directional_Isolate should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/Bidi_Class/Pop_Directional_Isolate/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('Script/Canadian_Aboriginal should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/Script/Canadian_Aboriginal/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('Bidi_Mirroring_Glyph should match the snapshot', async (t) => {
		const { default: map } = await import(`../output/unicode-${newest}/Bidi_Mirroring_Glyph/index.mjs`);
		const mapEntries = [...map.entries()].sort((a, b) => a[0] - b[0]);
		t.assert.snapshot(mapEntries);
	});
	test('Bidi_Paired_Bracket_Type/Open should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/Bidi_Paired_Bracket_Type/Open/ranges.mjs`);
		t.assert.snapshot(data);
	});
	test('Case_Folding/S should match the snapshot', async (t) => {
		const { default: map } = await import(`../output/unicode-${newest}/Case_Folding/S/code-points.mjs`);
		t.assert.snapshot(
			[...map.entries()]
		);
	});
	test('Joining_Type/Dual_Joining should match the snapshot', async (t) => {
		const { default: data } = await import(`../output/unicode-${newest}/Joining_Type/Dual_Joining/ranges.mjs`);
		t.assert.snapshot(data);
	});
});

