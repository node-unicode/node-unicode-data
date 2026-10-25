/**
 * This file ships to end users.
 *
 * Derive the symbol-to-symbol(s) map of a case mapping, case folding, or
 * decomposition mapping from its code-point-to-code-point(s) map.
 */

const fromCodePoint = String.fromCodePoint;

/**
 * @param {Map<number, number | number[]>} codePoints
 * @returns {Map<string, string>}
 */
const mappingToSymbols = (codePoints) => {
	const symbols = new Map();
	for (const [from, to] of codePoints) {
		symbols.set(
			fromCodePoint(from),
			Array.isArray(to) ? fromCodePoint(...to) : fromCodePoint(to),
		);
	}
	return symbols;
};

export default mappingToSymbols;
