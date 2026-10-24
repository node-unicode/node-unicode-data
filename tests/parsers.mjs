import { test } from 'node:test';
import parseDecompositionMapping from '../scripts/parse-decomposition-mapping.mjs';
import {
	parseDerivedCoreProperties,
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
	for (const version of ['3.1.0', '3.1.1', '3.2.0', '4.0.0', '4.0.1', '4.1.0']) {
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
