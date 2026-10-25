/**
 * This file ships to end users.
 *
 * Builds a regular expression from the ranges produced by
 * `decode-ranges.mjs`. This is a port of the serialization logic in
 * Regenerate <https://mths.be/regenerate> (MIT licensed), so the resulting
 * `source` is byte-for-byte identical to `regenerate(set).toString()`.
 *
 * Throughout this file, “data” refers to Regenerate’s internal representation:
 * a flat, sorted array of `[start, end)` pairs, e.g. `[0x41, 0x5B, 0x61, 0x7B]`.
 */

const HIGH_SURROGATE_MIN = 0xd800;
const HIGH_SURROGATE_MAX = 0xdbff;
const LOW_SURROGATE_MIN = 0xdc00;
const LOW_SURROGATE_MAX = 0xdfff;

const regexNull = /\\x00([^0123456789]|$)/g;

const hex = (number) => number.toString(16).toUpperCase();

const pad = (string, totalCharacters) => {
	return string.length < totalCharacters
		? ('0000' + string).slice(-totalCharacters)
		: string;
};

const dataIsSingleton = (data) => {
	// Check if the set only represents a single code point.
	return data.length == 2 && data[0] + 1 == data[1];
};

const dataAdd = (data, codePoint) => {
	// Iterate over the data per `(start, end)` pair.
	let index = 0;
	let lastIndex = null;
	const length = data.length;
	while (index < length) {
		const start = data[index];
		const end = data[index + 1];

		// Check if the code point is already in the set.
		if (codePoint >= start && codePoint < end) {
			return data;
		}

		if (codePoint == start - 1) {
			// Just replace `start` with a new value.
			data[index] = codePoint;
			return data;
		}

		// At this point, if `start` is `greater` than `codePoint`, insert a new
		// `[start, end]` pair before the current pair, or after the current pair
		// if there is a known `lastIndex`.
		if (start > codePoint) {
			data.splice(
				lastIndex != null ? lastIndex + 2 : 0,
				0,
				codePoint,
				codePoint + 1,
			);
			return data;
		}

		if (codePoint == end) {
			// Check if adding this code point causes two separate ranges to become
			// a single range, e.g. `dataAdd([0, 4, 5, 10], 4)` → `[0, 10]`.
			if (codePoint + 1 == data[index + 2]) {
				data.splice(index, 4, start, data[index + 3]);
				return data;
			}
			// Else, just replace `end` with a new value.
			data[index + 1] = codePoint + 1;
			return data;
		}
		lastIndex = index;
		index += 2;
	}
	// The loop has finished; add the new pair to the end of the data set.
	data.push(codePoint, codePoint + 1);
	return data;
};

const dataAddRange = (data, rangeStart, rangeEnd) => {
	// Iterate over the data per `(start, end)` pair.
	let index = 0;
	let added = false;
	const length = data.length;
	while (index < length) {
		const start = data[index];
		const end = data[index + 1];

		if (added) {
			// The range has already been added to the set; at this point, we just
			// need to get rid of the following ranges in case they overlap.

			// Check if this range can be combined with the previous range.
			if (start == rangeEnd + 1) {
				data.splice(index - 1, 2);
				return data;
			}

			// Exit as soon as no more possibly overlapping pairs can be found.
			if (start > rangeEnd) {
				return data;
			}

			// E.g. `[0, 11, 12, 16]` and we’ve added 5-15, so we now have
			// `[0, 16, 12, 16]`. Remove the `12,16` part, as it lies within the
			// `0,16` range that was previously added.
			if (start >= rangeStart && start <= rangeEnd) {
				// `start` lies within the range that was previously added.

				if (end > rangeStart && end - 1 <= rangeEnd) {
					// `end` lies within the range that was previously added as well,
					// so remove this pair.
					data.splice(index, 2);
					index -= 2;
					// Note: we cannot `return` just yet, as there may still be other
					// overlapping pairs.
				} else {
					// `start` lies within the range that was previously added, but
					// `end` doesn’t. E.g. `[0, 11, 12, 31]` and we’ve added 5-15, so
					// now we have `[0, 16, 12, 31]`. This must be written as `[0, 31]`.
					// Remove the previously added `end` and the current `start`.
					data.splice(index - 1, 2);
					index -= 2;
				}

				// Note: we cannot return yet.
			}
		} else if (start == rangeEnd + 1 || start == rangeEnd) {
			data[index] = rangeStart;
			return data;
		}

		// Check if a new pair must be inserted *before* the current one.
		else if (start > rangeEnd) {
			data.splice(index, 0, rangeStart, rangeEnd + 1);
			return data;
		} else if (rangeStart >= start && rangeStart < end && rangeEnd + 1 <= end) {
			// The new range lies entirely within an existing range pair. No action
			// needed.
			return data;
		} else if (
			// E.g. `[0, 11]` and you add 5-15 → `[0, 16]`.
			(rangeStart >= start && rangeStart < end) ||
			// E.g. `[0, 3]` and you add 3-6 → `[0, 7]`.
			end == rangeStart
		) {
			// Replace `end` with the new value.
			data[index + 1] = rangeEnd + 1;
			// Make sure the next range pair doesn’t overlap, e.g. `[0, 11, 12, 14]`
			// and you add 5-15 → `[0, 16]`, i.e. remove the `12,14` part.
			added = true;
			// Note: we cannot `return` just yet.
		} else if (rangeStart <= start && rangeEnd + 1 >= end) {
			// The new range is a superset of the old range.
			data[index] = rangeStart;
			data[index + 1] = rangeEnd + 1;
			added = true;
		}

		index += 2;
	}
	// The loop has finished without doing anything; add the new pair to the end
	// of the data set.
	if (!added) {
		data.push(rangeStart, rangeEnd + 1);
	}
	return data;
};

// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
const highSurrogate = (codePoint) => {
	return Math.floor((codePoint - 0x10000) / 0x400) + HIGH_SURROGATE_MIN;
};

const lowSurrogate = (codePoint) => {
	return ((codePoint - 0x10000) % 0x400) + LOW_SURROGATE_MIN;
};

const stringFromCharCode = String.fromCharCode;
const codePointToString = (codePoint) => {
	// https://mathiasbynens.be/notes/javascript-escapes#single
	// Note: the `\b` escape sequence for U+0008 BACKSPACE in strings has a
	// different meaning in regular expressions (word boundary), so it cannot
	// be used here.
	if (codePoint == 0x09) {
		return '\\t';
	}
	// Note: IE < 9 treats `'\v'` as `'v'`, so avoid using it.
	if (codePoint == 0x0a) {
		return '\\n';
	}
	if (codePoint == 0x0c) {
		return '\\f';
	}
	if (codePoint == 0x0d) {
		return '\\r';
	}
	if (codePoint == 0x2d) {
		// https://mathiasbynens.be/notes/javascript-escapes#hexadecimal
		// Note: `-` (U+002D HYPHEN-MINUS) is escaped in this way rather
		// than by backslash-escaping, in case the output is used outside
		// of a character class in a `u` RegExp. /\-/u throws, but
		// /\x2D/u is fine.
		return '\\x2D';
	}
	if (codePoint == 0x5c) {
		return '\\\\';
	}
	if (
		codePoint == 0x24 ||
		(codePoint >= 0x28 && codePoint <= 0x2b) ||
		codePoint == 0x2e ||
		codePoint == 0x2f ||
		codePoint == 0x3f ||
		(codePoint >= 0x5b && codePoint <= 0x5e) ||
		(codePoint >= 0x7b && codePoint <= 0x7d)
	) {
		// The code point maps to an unsafe printable ASCII character;
		// backslash-escape it. Here’s the list of those symbols:
		//
		//     $()*+./?[\]^{|}
		//
		// This matches SyntaxCharacters as well as `/` (U+002F SOLIDUS).
		// https://tc39.github.io/ecma262/#prod-SyntaxCharacter
		return '\\' + stringFromCharCode(codePoint);
	}
	if (codePoint >= 0x20 && codePoint <= 0x7e) {
		// The code point maps to one of these printable ASCII symbols
		// (including the space character):
		//
		//      !"#%&',/0123456789:;<=>@ABCDEFGHIJKLMNO
		//     PQRSTUVWXYZ_`abcdefghijklmnopqrstuvwxyz~
		//
		// These can safely be used directly.
		return stringFromCharCode(codePoint);
	}
	if (codePoint <= 0xff) {
		return '\\x' + pad(hex(codePoint), 2);
	}
	// `codePoint <= 0xFFFF` holds true.
	// https://mathiasbynens.be/notes/javascript-escapes#unicode
	return '\\u' + pad(hex(codePoint), 4);
};

const createBMPCharacterClasses = (data) => {
	// Iterate over the data per `(start, end)` pair.
	let result = '';
	let index = 0;
	const length = data.length;
	if (dataIsSingleton(data)) {
		return codePointToString(data[0]);
	}
	while (index < length) {
		const start = data[index];
		const end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
		if (start == end) {
			result += codePointToString(start);
		} else if (start + 1 == end) {
			result += codePointToString(start) + codePointToString(end);
		} else {
			result += codePointToString(start) + '-' + codePointToString(end);
		}
		index += 2;
	}
	return '[' + result + ']';
};

const splitAtBMP = (data) => {
	// Iterate over the data per `(start, end)` pair.
	const loneHighSurrogates = [];
	const loneLowSurrogates = [];
	const bmp = [];
	const astral = [];
	let index = 0;
	const length = data.length;
	while (index < length) {
		const start = data[index];
		const end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

		if (start < HIGH_SURROGATE_MIN) {
			// The range starts and ends before the high surrogate range.
			// E.g. (0, 0x10).
			if (end < HIGH_SURROGATE_MIN) {
				bmp.push(start, end + 1);
			}

			// The range starts before the high surrogate range and ends within it.
			// E.g. (0, 0xD855).
			if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
				bmp.push(start, HIGH_SURROGATE_MIN);
				loneHighSurrogates.push(HIGH_SURROGATE_MIN, end + 1);
			}

			// The range starts before the high surrogate range and ends in the low
			// surrogate range. E.g. (0, 0xDCFF).
			if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
				bmp.push(start, HIGH_SURROGATE_MIN);
				loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
				loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
			}

			// The range starts before the high surrogate range and ends after the
			// low surrogate range. E.g. (0, 0x10FFFF).
			if (end > LOW_SURROGATE_MAX) {
				bmp.push(start, HIGH_SURROGATE_MIN);
				loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
				loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
				if (end <= 0xffff) {
					bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
				} else {
					bmp.push(LOW_SURROGATE_MAX + 1, 0xffff + 1);
					astral.push(0xffff + 1, end + 1);
				}
			}
		} else if (start >= HIGH_SURROGATE_MIN && start <= HIGH_SURROGATE_MAX) {
			// The range starts and ends in the high surrogate range.
			// E.g. (0xD855, 0xD866).
			if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
				loneHighSurrogates.push(start, end + 1);
			}

			// The range starts in the high surrogate range and ends in the low
			// surrogate range. E.g. (0xD855, 0xDCFF).
			if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
				loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
				loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
			}

			// The range starts in the high surrogate range and ends after the low
			// surrogate range. E.g. (0xD855, 0x10FFFF).
			if (end > LOW_SURROGATE_MAX) {
				loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
				loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
				if (end <= 0xffff) {
					bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
				} else {
					bmp.push(LOW_SURROGATE_MAX + 1, 0xffff + 1);
					astral.push(0xffff + 1, end + 1);
				}
			}
		} else if (start >= LOW_SURROGATE_MIN && start <= LOW_SURROGATE_MAX) {
			// The range starts and ends in the low surrogate range.
			// E.g. (0xDCFF, 0xDDFF).
			if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
				loneLowSurrogates.push(start, end + 1);
			}

			// The range starts in the low surrogate range and ends after the low
			// surrogate range. E.g. (0xDCFF, 0x10FFFF).
			if (end > LOW_SURROGATE_MAX) {
				loneLowSurrogates.push(start, LOW_SURROGATE_MAX + 1);
				if (end <= 0xffff) {
					bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
				} else {
					bmp.push(LOW_SURROGATE_MAX + 1, 0xffff + 1);
					astral.push(0xffff + 1, end + 1);
				}
			}
		} else if (start > LOW_SURROGATE_MAX && start <= 0xffff) {
			// The range starts and ends after the low surrogate range.
			// E.g. (0xFFAA, 0x10FFFF).
			if (end <= 0xffff) {
				bmp.push(start, end + 1);
			} else {
				bmp.push(start, 0xffff + 1);
				astral.push(0xffff + 1, end + 1);
			}
		} else {
			// The range starts and ends in the astral range.
			astral.push(start, end + 1);
		}

		index += 2;
	}
	return { loneHighSurrogates, loneLowSurrogates, bmp, astral };
};

const optimizeByLowSurrogates = (surrogateMappings) => {
	if (surrogateMappings.length == 1) {
		return surrogateMappings;
	}
	let index = -1;
	let innerIndex = -1;
	while (++index < surrogateMappings.length) {
		const mapping = surrogateMappings[index];
		const lowSurrogates = mapping[1];
		const lowSurrogateStart = lowSurrogates[0];
		const lowSurrogateEnd = lowSurrogates[1];
		innerIndex = index; // Note: the loop starts at the next index.
		while (++innerIndex < surrogateMappings.length) {
			const otherMapping = surrogateMappings[innerIndex];
			const otherLowSurrogates = otherMapping[1];
			const otherLowSurrogateStart = otherLowSurrogates[0];
			const otherLowSurrogateEnd = otherLowSurrogates[1];
			if (
				lowSurrogateStart == otherLowSurrogateStart &&
				lowSurrogateEnd == otherLowSurrogateEnd &&
				otherLowSurrogates.length === 2
			) {
				// Add the code points in the other item to this one.
				if (dataIsSingleton(otherMapping[0])) {
					mapping[0] = dataAdd(mapping[0], otherMapping[0][0]);
				} else {
					mapping[0] = dataAddRange(
						mapping[0],
						otherMapping[0][0],
						otherMapping[0][1] - 1,
					);
				}
				// Remove the other, now redundant, item.
				surrogateMappings.splice(innerIndex, 1);
				--innerIndex;
			}
		}
	}
	return surrogateMappings;
};

const optimizeSurrogateMappings = (surrogateMappings) => {
	const result = [];
	let tmpLow = [];
	let addLow = false;
	let index = -1;
	const length = surrogateMappings.length;
	while (++index < length) {
		let mapping = surrogateMappings[index];
		let nextMapping = surrogateMappings[index + 1];
		if (!nextMapping) {
			result.push(mapping);
			continue;
		}
		let highSurrogates = mapping[0];
		let lowSurrogates = mapping[1];
		let nextHighSurrogates = nextMapping[0];
		let nextLowSurrogates = nextMapping[1];

		// Check for identical high surrogate ranges.
		tmpLow = lowSurrogates;
		while (
			nextHighSurrogates &&
			highSurrogates[0] == nextHighSurrogates[0] &&
			highSurrogates[1] == nextHighSurrogates[1]
		) {
			// Merge with the next item.
			if (dataIsSingleton(nextLowSurrogates)) {
				tmpLow = dataAdd(tmpLow, nextLowSurrogates[0]);
			} else {
				tmpLow = dataAddRange(
					tmpLow,
					nextLowSurrogates[0],
					nextLowSurrogates[1] - 1,
				);
			}
			++index;
			mapping = surrogateMappings[index];
			highSurrogates = mapping[0];
			lowSurrogates = mapping[1];
			nextMapping = surrogateMappings[index + 1];
			nextHighSurrogates = nextMapping && nextMapping[0];
			nextLowSurrogates = nextMapping && nextMapping[1];
			addLow = true;
		}
		result.push([highSurrogates, addLow ? tmpLow : lowSurrogates]);
		addLow = false;
	}
	return optimizeByLowSurrogates(result);
};

const surrogateSet = (data) => {
	// Exit early if `data` is an empty set.
	if (!data.length) {
		return [];
	}

	// Iterate over the data per `(start, end)` pair.
	let index = 0;
	const surrogateMappings = [];
	const length = data.length;
	while (index < length) {
		const start = data[index];
		const end = data[index + 1] - 1;

		const startHigh = highSurrogate(start);
		const startLow = lowSurrogate(start);
		const endHigh = highSurrogate(end);
		const endLow = lowSurrogate(end);

		const startsWithLowestLowSurrogate = startLow == LOW_SURROGATE_MIN;
		const endsWithHighestLowSurrogate = endLow == LOW_SURROGATE_MAX;
		let complete = false;

		// Append the previous high-surrogate-to-low-surrogate mappings.
		// Step 1: `(startHigh, startLow)` to `(startHigh, LOW_SURROGATE_MAX)`.
		if (
			startHigh == endHigh ||
			(startsWithLowestLowSurrogate && endsWithHighestLowSurrogate)
		) {
			surrogateMappings.push([
				[startHigh, endHigh + 1],
				[startLow, endLow + 1],
			]);
			complete = true;
		} else {
			surrogateMappings.push([
				[startHigh, startHigh + 1],
				[startLow, LOW_SURROGATE_MAX + 1],
			]);
		}

		// Step 2: `(startHigh + 1, LOW_SURROGATE_MIN)` to
		// `(endHigh - 1, LOW_SURROGATE_MAX)`.
		if (!complete && startHigh + 1 < endHigh) {
			if (endsWithHighestLowSurrogate) {
				// Combine step 2 and step 3.
				surrogateMappings.push([
					[startHigh + 1, endHigh + 1],
					[LOW_SURROGATE_MIN, endLow + 1],
				]);
				complete = true;
			} else {
				surrogateMappings.push([
					[startHigh + 1, endHigh],
					[LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1],
				]);
			}
		}

		// Step 3. `(endHigh, LOW_SURROGATE_MIN)` to `(endHigh, endLow)`.
		if (!complete) {
			surrogateMappings.push([
				[endHigh, endHigh + 1],
				[LOW_SURROGATE_MIN, endLow + 1],
			]);
		}

		index += 2;
	}

	// The format of `surrogateMappings` is as follows:
	//
	//     [ surrogateMapping1, surrogateMapping2 ]
	//
	// i.e.:
	//
	//     [
	//       [ highSurrogates1, lowSurrogates1 ],
	//       [ highSurrogates2, lowSurrogates2 ]
	//     ]
	return optimizeSurrogateMappings(surrogateMappings);
};

const createSurrogateCharacterClasses = (surrogateMappings) => {
	const result = [];
	for (const surrogateMapping of surrogateMappings) {
		const highSurrogates = surrogateMapping[0];
		const lowSurrogates = surrogateMapping[1];
		result.push(
			createBMPCharacterClasses(highSurrogates) +
				createBMPCharacterClasses(lowSurrogates),
		);
	}
	return result.join('|');
};

const createCharacterClassesFromData = (data) => {
	const result = [];

	const { loneHighSurrogates, loneLowSurrogates, bmp, astral } =
		splitAtBMP(data);

	const surrogateMappings = surrogateSet(astral);

	if (bmp.length) {
		// The data set contains BMP code points that are not high surrogates
		// needed for astral code points in the set.
		result.push(createBMPCharacterClasses(bmp));
	}
	if (surrogateMappings.length) {
		// The data set contains astral code points; append character classes
		// based on their surrogate pairs.
		result.push(createSurrogateCharacterClasses(surrogateMappings));
	}
	// https://gist.github.com/mathiasbynens/bbe7f870208abcfec860
	if (loneHighSurrogates.length) {
		result.push(
			createBMPCharacterClasses(loneHighSurrogates) +
				// Make sure the high surrogates aren’t part of a surrogate pair.
				'(?![\\uDC00-\\uDFFF])',
		);
	}
	if (loneLowSurrogates.length) {
		result.push(
			// It is not possible to accurately assert the low surrogates aren’t
			// part of a surrogate pair, since JavaScript regular expressions do
			// not support lookbehind.
			'(?:[^\\uD800-\\uDBFF]|^)' + createBMPCharacterClasses(loneLowSurrogates),
		);
	}
	return result.join('|');
};

/**
 * Serialize `data` the same way `regenerate(set).toString()` would.
 * @param {number[]} data
 */
const dataToRegexSource = (data) => {
	const result = createCharacterClassesFromData(data);
	if (!result) {
		// For an empty set, return something that can be inserted `/here/` to
		// form a valid regular expression. Avoid `(?:)` since that matches the
		// empty string.
		return '[]';
	}
	// Use `\0` instead of `\x00` where possible.
	return result.replace(regexNull, '\\0$1');
};

/**
 * Build a regular expression that matches any symbol in `ranges`.
 * @param {Array<{ begin: number, end: number }>} ranges
 */
const rangesToRegex = (ranges) => {
	const data = [];
	for (const range of ranges) {
		data.push(range.begin, range.end);
	}
	return new RegExp(dataToRegexSource(data));
};

export default rangesToRegex;
