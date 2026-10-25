import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { suite, test } from 'node:test';
import regenerate from 'regenerate';
import resources from '../data/resources.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const oldest = resources[0].version;
const newest = resources.at(-1).version;

if (!process.env.CI) {
	const { default: generateData } = await import('../index.mjs');
	// Generate the data for the oldest and newest available Unicode version.
	await generateData(oldest);
	await generateData(newest);
}

// Every `regex.mjs` is built at runtime from `ranges.mjs`; its source must be
// identical to what Regenerate produces for the same set of code points.
const assertRegexesMatchRegenerate = async (t, version) => {
	const root = path.resolve(__dirname, '..', 'output', `unicode-${version}`);
	let count = 0;
	for (const type of fs.readdirSync(root)) {
		const typeDir = path.join(root, type);
		if (type.startsWith('.') || !fs.statSync(typeDir).isDirectory()) {
			continue;
		}
		for (const name of fs.readdirSync(typeDir)) {
			const dir = path.join(typeDir, name);
			if (!fs.existsSync(path.join(dir, 'regex.mjs'))) {
				continue;
			}
			const { default: ranges } = await import(path.join(dir, 'ranges.mjs'));
			const { default: regex } = await import(path.join(dir, 'regex.mjs'));
			const set = regenerate();
			for (const range of ranges) {
				set.addRange(range.begin, range.end - 1);
			}
			t.assert.strictEqual(regex.source, set.toString(), `${type}/${name}`);
			t.assert.strictEqual(regex.flags, '', `${type}/${name}`);
			count++;
		}
	}
	t.assert.ok(count > 0, 'found regex.mjs files');
};

suite(`The generated Unicode ${oldest} js`, () => {
	test('General_Category/Modifier_Letter should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${oldest}/General_Category/Modifier_Letter/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Binary_Property/ASCII should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${oldest}/Binary_Property/ASCII/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Bidi_Class/Right_To_Left should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${oldest}/Bidi_Class/Right_To_Left/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('every regex.mjs should match Regenerate output', async (t) => {
		await assertRegexesMatchRegenerate(t, oldest);
	});
});

suite(`The generated latest Unicode js`, () => {
	test('Block/Bopomofo should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Block/Bopomofo/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('General_Category/Modifier_Letter should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/General_Category/Modifier_Letter/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Binary_Property/Sentence_Terminal should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Binary_Property/Sentence_Terminal/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Binary_Property/Hex_Digit should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Binary_Property/Hex_Digit/ranges.mjs`
		);
		t.assert.snapshot(data); // Note: `Hex_Digit` is a derived core property.
	});
	test('Bidi_Class/Pop_Directional_Isolate should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Bidi_Class/Pop_Directional_Isolate/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Script/Canadian_Aboriginal should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Script/Canadian_Aboriginal/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Bidi_Mirroring_Glyph should match the snapshot', async (t) => {
		const { default: map } = await import(
			`../output/unicode-${newest}/Bidi_Mirroring_Glyph/index.mjs`
		);
		const mapEntries = [...map.entries()].sort((a, b) => a[0] - b[0]);
		t.assert.snapshot(mapEntries);
	});
	test('Bidi_Paired_Bracket_Type/Open should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Bidi_Paired_Bracket_Type/Open/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Case_Folding/S should match the snapshot', async (t) => {
		const { default: map } = await import(
			`../output/unicode-${newest}/Case_Folding/S/code-points.mjs`
		);
		t.assert.snapshot([...map.entries()]);
	});
	test('Joining_Type/Dual_Joining should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Joining_Type/Dual_Joining/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Joining_Type/Transparent should match the snapshot', async (t) => {
		const { default: data } = await import(
			`../output/unicode-${newest}/Joining_Type/Transparent/ranges.mjs`
		);
		t.assert.snapshot(data);
	});
	test('Decomposition_Mapping/Isolated should match the snapshot', async (t) => {
		const { default: map } = await import(
			`../output/unicode-${newest}/Decomposition_Mapping/Isolated/code-points.mjs`
		);
		t.assert.snapshot([...map.entries()]);
	});
	test('every regex.mjs should match Regenerate output', async (t) => {
		await assertRegexesMatchRegenerate(t, newest);
	});
});
