const base64enc =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

const base64dec = Object.freeze(Object.fromEntries(
	Array.from(base64enc, (c, i) => [c, i])
));

class UnicodeRange {
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
  */
function decodeDeltas(input) {
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
  * Base64 encode variable-length deltas (5/10/15/21-bit).
  */
function encodeDeltas(input) {
	const output = [];
	for (let i = 0; i < input.length; ++i) {
		const x = input[i];
		if ((x >> 5) === 0) {
			output.push(x);
		} else if ((x >> 10) === 0) {
			output.push(32 + (x >> 6), x);
		} else if ((x >> 15) === 0) {
			output.push(48 + (x >> 12), x >> 6, x);
		} else {
			console.assert((x >> 21) === 0, `delta ${x} out of range`);
			output.push(56 + (x >> 18), x >> 12, x >> 6, x);
		}
	}
	return output.map(x => base64enc[x & 63]).join('');
}

/**
  * RLE + base64 decode code point ranges.
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

/**
  * RLE + base64 encode code point ranges.
  */
function encodeRanges(values) {
	const deltas = [];
	for (let end = -1, i = 0; i < values.length; ) {
		const begin = values[i];
		console.assert(begin > end, `code point ${begin} out of order`);
		deltas.push(begin - end - 1);
		end = begin + 1;
		while (++i < values.length && values[i] === end) {
			++end;
		}
		deltas.push(end - begin - 1);
	}
	return encodeDeltas(deltas);
}

module.exports = Object.defineProperty(
	decodeRanges, 'encode', { value: encodeRanges }
);
