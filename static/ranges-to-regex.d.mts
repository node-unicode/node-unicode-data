import type { UnicodeRange } from './decode-ranges.mjs';

/**
 * Build a regular expression that matches any symbol in `ranges`.
 */
declare function rangesToRegex(ranges: UnicodeRange[]): RegExp;

export default rangesToRegex;
