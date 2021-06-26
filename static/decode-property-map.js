/**
  * Generate [codePoint, value] pairs from RLE array of values.
  */
function * generateEntries(runs) {
	const len = runs.length - 2;
	for (let cp = 0, i = 0; i < len; ) {
		cp += runs[i++];
		const end = cp + runs[i++];
		const value = runs[i++];
		while (cp < end) {
			yield [cp++, value];
		}
	}
}

function decodePropertyMap(runs) {
	return new Map(generateEntries(runs));
}

module.exports = decodePropertyMap;
