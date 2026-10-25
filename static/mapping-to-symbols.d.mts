/**
 * Derive the symbol-to-symbol(s) map of a case mapping, case folding, or
 * decomposition mapping from its code-point-to-code-point(s) map.
 */
declare function mappingToSymbols(
	codePoints: Map<number, number | number[]>,
): Map<string, string>;

export default mappingToSymbols;
