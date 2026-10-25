/**
 * This file ships to end users.
 * See `encodeMapping` in scripts/utils.mjs for the encoder.
 */

import { decodeDeltas } from './decode-ranges.mjs';

// Undo zigzag encoding: 0 → 0, 1 → -1, 2 → 1, 3 → -2, …
const unzigzag = (value) => (value >>> 1) ^ -(value & 1);

/**
 * Decode a delta-encoded mapping from code points to code point(s), e.g. a
 * case mapping or a decomposition mapping.
 *
 * `input` is a base64 stream of variable-length integers (see
 * `decodeDeltas`). Each entry consists of the zigzag-encoded difference
 * between its key and the previous key, a count, and then `count` values
 * (or one value, if `count` is 0). Each value is the zigzag-encoded difference
 * from the previous code point in the entry, starting from the key. A count
 * of 0 means the entry maps to a single code point rather than to an array.
 * @param {string} input
 * @returns {Map<number, number | number[]>}
 */
const decodeMapping = (input) => {
	const deltas = decodeDeltas(input);
	const map = new Map();
	for (let from = 0, i = 0; i < deltas.length;) {
		from += unzigzag(deltas[i++]);
		const count = deltas[i++];
		let codePoint = from;
		if (count === 0) {
			codePoint += unzigzag(deltas[i++]);
			map.set(from, codePoint);
		} else {
			const codePoints = [];
			for (let j = 0; j < count; j++) {
				codePoint += unzigzag(deltas[i++]);
				codePoints.push(codePoint);
			}
			map.set(from, codePoints);
		}
	}
	return map;
};

export default decodeMapping;
