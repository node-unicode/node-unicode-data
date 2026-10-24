import { test } from 'node:test';
import parseDecompositionMapping from '../scripts/parse-decomposition-mapping.mjs';

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
