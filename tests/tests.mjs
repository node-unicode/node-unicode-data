import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { suite, test } from 'node:test';
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

// Every mapping `symbols.mjs` must equal its `code-points.mjs` with each code
// point replaced by the corresponding symbol.
const assertSymbolsMatchCodePoints = async (t, version) => {
	const root = path.resolve(__dirname, '..', 'output', `unicode-${version}`);
	let count = 0;
	for (const type of [
		'Case_Folding',
		'Simple_Case_Mapping',
		'Special_Casing',
		'Decomposition_Mapping',
	]) {
		const typeDir = path.join(root, type);
		if (!fs.existsSync(typeDir)) {
			continue;
		}
		for (const name of fs.readdirSync(typeDir)) {
			const dir = path.join(typeDir, name);
			const { default: codePoints } = await import(
				path.join(dir, 'code-points.mjs')
			);
			const { default: symbols } = await import(path.join(dir, 'symbols.mjs'));
			const expected = [...codePoints].map(([from, to]) => [
				String.fromCodePoint(from),
				String.fromCodePoint(...(Array.isArray(to) ? to : [to])),
			]);
			t.assert.deepStrictEqual([...symbols], expected, `${type}/${name}`);
			count++;
		}
	}
	t.assert.ok(count > 0, 'found mapping directories');
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
	test('Names should decode to the expected names', async (t) => {
		const { default: names } = await import(
			`../output/unicode-${newest}/Names/index.mjs`
		);
		const entries = [...names];
		t.assert.deepStrictEqual(entries[0], [0, '<control>']);
		t.assert.strictEqual(names.get(0x41), 'LATIN CAPITAL LETTER A');
		t.assert.strictEqual(names.get(0x4e00), 'CJK Ideograph');
		t.assert.strictEqual(names.get(0xac00), 'Hangul Syllable');
		t.assert.strictEqual(names.get(0xf900), 'CJK COMPATIBILITY IDEOGRAPH-F900');
		t.assert.strictEqual(names.get(0x1f600), 'GRINNING FACE');
		t.assert.deepStrictEqual(entries.at(-1), [
			0x10fffd,
			'Plane 16 Private Use',
		]);
		// Entries are in code point order.
		for (let i = 1; i < entries.length; i++) {
			if (entries[i][0] <= entries[i - 1][0]) {
				t.assert.fail(`entry ${i} out of order`);
			}
		}
	});
	test('index.d.mts should declare the default export of index.mjs', async (t) => {
		const root = path.resolve(__dirname, '..', 'output', `unicode-${newest}`);
		const { default: data } = await import(path.join(root, 'index.mjs'));
		const declaration = fs.readFileSync(path.join(root, 'index.d.mts'), 'utf8');
		t.assert.match(declaration, /^export default data;$/m);
		const declaredKeys = [
			...declaration.matchAll(/^\treadonly (\w+): string\[\];$/gm),
		].map((m) => m[1]);
		t.assert.deepStrictEqual(declaredKeys, Object.keys(data));
	});
	test('type declarations should be shared via typesVersions', async (t) => {
		const root = path.resolve(__dirname, '..', 'output', `unicode-${newest}`);
		const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
		// Every typesVersions target that is not a wildcard must exist.
		for (const targets of Object.values(pkg.typesVersions['*'])) {
			for (const target of targets) {
				if (!target.includes('*')) {
					t.assert.ok(fs.existsSync(path.join(root, target)), target);
				}
			}
		}
		for (const type of fs.readdirSync(root)) {
			const typeDir = path.join(root, type);
			if (type.startsWith('.') || !fs.statSync(typeDir).isDirectory()) {
				continue;
			}
			const isMapping = Object.hasOwn(
				pkg.typesVersions['*'],
				`${type}/*/symbols.mjs`,
			);
			for (const name of fs.readdirSync(typeDir)) {
				const dir = path.join(typeDir, name);
				if (!fs.existsSync(path.join(dir, 'symbols.mjs'))) {
					continue;
				}
				// Mapping directories keep their own declarations; others share.
				t.assert.strictEqual(
					fs.existsSync(path.join(dir, 'symbols.d.mts')),
					isMapping,
					dir,
				);
				t.assert.strictEqual(
					fs.existsSync(path.join(dir, 'code-points.d.mts')),
					isMapping,
					dir,
				);
				t.assert.ok(!fs.existsSync(path.join(dir, 'ranges.d.mts')), dir);
				t.assert.ok(!fs.existsSync(path.join(dir, 'regex.d.mts')), dir);
			}
		}
	});
	test('every mapping symbols.mjs should match code-points.mjs', async (t) => {
		await assertSymbolsMatchCodePoints(t, newest);
	});
});
