/**
 * Generate [codePoint, value] pairs from RLE array of values.
 */
const generateEntries = function*(runs) {
	const len = runs.length - 2;
	for (let cp = 0, i = 0; i < len; ) {
		cp += runs[i++];
		const end = cp + runs[i++];
		const value = runs[i++];
		while (cp < end) {
			yield [cp++, value];
		}
	}
};

const decodePropertyMap = (runs) => {
	return new Map(generateEntries(runs));
};

export default decodePropertyMap;
