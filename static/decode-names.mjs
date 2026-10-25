/**
 * This file ships to end users.
 * See `encodeNames` in scripts/utils.mjs for the encoder.
 */

const base64enc =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Decode a front-coded table of character names into a map from code point
 * to name.
 *
 * The first line of `input` is a JSON array of `[gap, length]` pairs, one per
 * name, describing the run of code points each name applies to: `gap` is the
 * number of unnamed code points since the end of the previous run, and
 * `length` is the number of consecutive code points sharing the name.
 *
 * Every following line holds one name, front-coded against the previous
 * name: the first character is the base64 digit for the number of leading
 * characters shared with the previous name, and the rest is the remainder.
 * @param {string} input
 */
const decodeNames = (input) => {
	const lines = input.split('\n');
	const runs = JSON.parse(lines[0]);
	const map = new Map();
	let previous = '';
	for (let codePoint = 0, i = 1, j = 0; i < lines.length; i++, j += 2) {
		const line = lines[i];
		const name = previous.slice(0, base64enc.indexOf(line[0])) + line.slice(1);
		previous = name;
		codePoint += runs[j];
		for (const end = codePoint + runs[j + 1]; codePoint < end; codePoint++) {
			map.set(codePoint, name);
		}
	}
	return map;
};

export default decodeNames;
