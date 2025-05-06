/**
 * This file ships to end users.
 * See scripts/encode-ranges.js for encode utilities
 */

const base64enc =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

const base64dec = Object.freeze(Object.fromEntries(
	Array.from(base64enc, (c, i) => [c, i])
));

class UnicodeRange {
	/**
	 * @param {number} begin 
	 * @param {number} end 
	 */
	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
		this.length = end - begin;
	}
	*keys() {
		const { begin, end } = this;
		for (let i = begin; i < end; ++i) {
			yield i;
		}
	}
	*values() {
		const { begin, end } = this;
		for (let i = begin; i < end; ++i) {
			yield String.fromCodePoint(i);
		}
	}
}

/**
  * Base64 decode variable-length deltas (5/10/15/21-bit).
  * @param {string} input
  */
function decodeDeltas(input) {
	/** @type {number[]} */
	const output = [];
	for (let i = 0; i < input.length; ) {
		let x = base64dec[input[i++]];
		switch (x & 56) {
			case 32:
			case 40:
				x = (x & 15) << 6;
				x |= base64dec[input[i++]];
				break;
			case 48:
				x = (x & 7) << 12;
				x |= base64dec[input[i++]] << 6;
				x |= base64dec[input[i++]];
				break;
			case 56:
				x = (x & 7) << 18;
				x |= base64dec[input[i++]] << 12;
				x |= base64dec[input[i++]] << 6;
				x |= base64dec[input[i++]];
				break;
		}
		output.push(x);
	}
	return output;
}


/**
  * RLE + base64 decode code point ranges.
  * @param {string} input
  */
function decodeRanges(input) {
	const deltas = decodeDeltas(input);
	const ranges = [];
	for (let end = -1, i = 1; i < deltas.length; i += 2) {
		const begin = end + 1 + deltas[i - 1];
		const length = 1 + deltas[i];
		end = begin + length;
		ranges.push(new UnicodeRange(begin, end));
	}
	return ranges;
}

module.exports = decodeRanges;
