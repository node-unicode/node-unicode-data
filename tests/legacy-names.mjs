import { test } from 'node:test';
import parseNames from '../scripts/parse-names.mjs';

test('Unicode 1.1.5 provides formal names for its complete Han repertoire', async (t) => {
	const names = await parseNames('1.1.5');
	for (const [cp, name] of [
		[0x4e00, 'CJK UNIFIED IDEOGRAPH-4E00'],
		[0x4e01, 'CJK UNIFIED IDEOGRAPH-4E01'],
		[0x9fa5, 'CJK UNIFIED IDEOGRAPH-9FA5'],
		[0xf900, 'CJK COMPATIBILITY IDEOGRAPH-F900'],
		[0xf901, 'CJK COMPATIBILITY IDEOGRAPH-F901'],
		[0xfa2d, 'CJK COMPATIBILITY IDEOGRAPH-FA2D'],
	]) {
		t.assert.deepEqual(names[name]?.toArray(), [cp], name);
	}
	t.assert.equal(
		Object.keys(names).filter((name) =>
			name.startsWith('CJK UNIFIED IDEOGRAPH-'),
		).length,
		20902,
	);
	t.assert.equal(
		Object.keys(names).filter((name) =>
			name.startsWith('CJK COMPATIBILITY IDEOGRAPH-'),
		).length,
		302,
	);
	t.assert.equal(names['CJK UNIFIED IDEOGRAPH-9FA6'], undefined);
	t.assert.equal(names['CJK COMPATIBILITY IDEOGRAPH-FA2E'], undefined);
	t.assert.equal(names['<CJK IDEOGRAPH REPRESENTATIVE>'], undefined);
});
