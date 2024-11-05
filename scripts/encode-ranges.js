/**
 * See static/decode-ranges.js for decode utilities
 */

const base64enc =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

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
	debugger;
	return encodeDeltas(deltas);
}

function encodeRegenerate(regenerateSet) {
	const deltas = [];
	const regenerateData = regenerateSet.data;
	for (let end = - 1, i = 0; i < regenerateData.length; i += 2) {
		const begin = regenerateData[i];
		console.assert(begin > end, `code point ${begin} out of order`);
		deltas.push(begin - end - 1);
		end = regenerateData[i + 1];
		deltas.push(end - begin - 1);
	}
	return encodeDeltas(deltas);
}

module.exports = {
    encodeRanges: encodeRanges,
    encodeRegenerate: encodeRegenerate,
}