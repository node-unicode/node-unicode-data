import { test } from 'node:test';
import parseJoiningType from '../scripts/parse-joining-type.mjs';

test('Legacy joining data preserves both joining controls', async (t) => {
	for (const version of [
		'2.0.14',
		'2.1.2',
		'2.1.5',
		'2.1.8',
		'2.1.9',
		'3.0.0',
		'3.0.1',
		'3.1.0',
		'3.1.1',
		'3.2.0',
		'4.0.1',
	]) {
		const map = await parseJoiningType(version);
		for (const [cp, expected] of [
			[0x200c, 'Non_Joining'],
			[0x200d, 'Join_Causing'],
			[0x300, 'Transparent'],
			[0x640, 'Join_Causing'],
		]) {
			t.assert.deepEqual(
				Object.entries(map)
					.filter(([, set]) => set.contains(cp))
					.map(([value]) => value),
				[expected],
				`${version}: U+${cp.toString(16).toUpperCase()}`,
			);
		}
	}
});
