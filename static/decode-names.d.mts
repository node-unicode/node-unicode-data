/**
 * Decode a front-coded table of character names into a map from code point
 * to name.
 */
declare function decodeNames(input: string): Map<number, string>;

export default decodeNames;
