declare namespace decodeRanges {
	class UnicodeRange {
		readonly begin: number;
		readonly end: number;
		readonly length: number;

		private constructor(begin: number, end: number);

		keys(): Generator<number, void, unknown>;
		values(): Generator<string, void, unknown>;
	}
	export type { UnicodeRange };
}

/**
 * RLE + base64 decode code point ranges.
 */
declare function decodeRanges(input: string): decodeRanges.UnicodeRange[];

export = decodeRanges;
