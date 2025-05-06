class UnicodeRange {
	readonly begin: number;
	readonly end: number;
	readonly length: number;

	private constructor(begin: number, end: number);

	keys(): Generator<number, void, unknown>;
	values(): Generator<string, void, unknown>;
}

/**
 * RLE + base64 decode code point ranges.
 */
export default function decodeRanges(input: string): UnicodeRange[];

export type { UnicodeRange };
