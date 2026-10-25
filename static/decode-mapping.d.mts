/**
 * Decode a delta-encoded mapping from code points to code point(s), e.g. a
 * case mapping or a decomposition mapping.
 */
declare function decodeMapping(input: string): Map<number, number | number[]>;

export default decodeMapping;
