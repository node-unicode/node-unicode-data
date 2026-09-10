import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import jsesc from 'jsesc';
import regenerate from 'regenerate';
import { encodeRanges, encodeRegenerate } from './encode-ranges.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const gzipInline = (data) => {
	if (data instanceof Map) {
		return `new Map(${ gzipInline([...data]) })`;
	}
	const json = JSON.stringify(data);
	const gzipBuffer = zlib.gzipSync(json);
	const str = gzipBuffer.toString('base64');
	return `JSON.parse(gunzipSync(Buffer.from('${ str }', 'base64')))`;
};

const range = (start, stop) => {
	// Inclusive, e.g. `range(1, 3)` → `[1, 2, 3]`.
	const result = [];
	for (; start <= stop; result.push(start++));
	return result;
};

const object = {};
const hasOwnProperty = object.hasOwnProperty;
const hasKey = (object, key) => {
	return hasOwnProperty.call(object, key);
};

const codePointsSizeLt = (codePoints, value) => {
	if (codePoints instanceof regenerate) {
		const regenerateData = codePoints.data;
		for (let seenSize = 0, i = 0; i < regenerateData.length; i += 2) {
			seenSize += (regenerateData[i + 1] - regenerateData[i]);
			if (seenSize >= value) {
				return false;
			}
		}
		return true;
	} else if (Array.isArray(codePoints)) {
		return codePoints.length < value;
	}
};

const append = (object, key, value) => {
	if (hasKey(object, key)) {
		object[key].push(value);
	} else {
		object[key] = [value];
	}
};

const samePropertyRuns = (codePointProperties) => {
	const result = [];
	const unsorted = [];
	for (const [value, regenerateSet] of codePointProperties) {
		const regenerateData = regenerateSet.data;
		for (let i = 0; i < regenerateData.length; i += 2) {
			const start = regenerateData[i];
			const runLen = regenerateData[i + 1] - start;
			unsorted.push([start, runLen, value]);
		}
	}
	unsorted.sort((a, b) => a[0] - b[0]);
	const sorted = unsorted;

	for (let i = 0, last = 0; i < sorted.length; i++) {
		const element = sorted[i];
		result.push(element[0] - last, element[1], element[2]);
		last = element[0] + element[1];
	}
	return result;
};

const writeFiles = (options) => {
	const version = options.version;
	const subType = options.subType;

	const map = options.map;
	if (map == null) {
		return;
	}
	const dirMap = {};

	const rootDir = path.resolve(
		__dirname, '..',
		'output', 'unicode-' + version
	);

	/**
	 * A list of flatten (x, y) pairs,
	 * where x is a codepoint, y := codepoint(z) - x,
	 * where z is the BidiMirroringGlyph of character(x) and codepoint(z) > x.
	 * @type number[]
	 */
	const bidiMirroringGlyphFlatPairs = [];
	const auxMap = {};
	for (const item of Object.keys(map)) {
		const codePoints = map[item];
		const type = typeof options.type === 'function'
			? options.type(item)
			: options.type;
		const isCaseFoldingOrMapping = type === 'Case_Folding' || type === 'Simple_Case_Mapping' || type === 'Special_Casing';
		const isNamesCanon = type === 'Names' && !subType;
		const isNameAliases = type === 'Names' && subType === 'name-aliases';
		const subdir = isNameAliases ? item.charAt(0).toUpperCase() + item.slice(1) : item;
		const dir = path.resolve(rootDir, type, subdir);
		if (
			type === 'Bidi_Class' ||
			type === 'Bidi_Mirroring_Glyph' ||
			type === 'Bidi_Paired_Bracket_Type' ||
			isNamesCanon ||
			(
				type === 'General_Category' &&
				// Use the most specific category names, i.e. those whose aliases match
				// `^[A-Z][a-z]$`. Ignore the others.
				!/^(?:Other|Letter|Cased_Letter|Mark|Number|Punctuation|Symbol|Separator)$/.test(item)
			)
		) {
			if (type === 'Bidi_Mirroring_Glyph') {
				const toCodepoint = item.codePointAt(0);
				codePoints.toArray().forEach((codePoint) => {
					if (codePoint < toCodepoint) {
						bidiMirroringGlyphFlatPairs.push(codePoint, toCodepoint - codePoint);
					}
				});
			} else {
				if (!auxMap[type]) {
					auxMap[type] = [];
				}
				auxMap[type].push([item, codePoints]);
			}
		}
		if (isNamesCanon || type === 'Bidi_Mirroring_Glyph') {
			continue;
		}

		// Create the target directory if it doesn’t exist yet.
		fs.mkdirSync(dir, { recursive: true });
		append(dirMap, type, subdir);

		// Sequence properties are special.
		if (type === 'Sequence_Property' || isNameAliases) {
			const sequences = codePoints;
			const output = `import { gunzipSync } from 'node:zlib';\n\nexport default ${ gzipInline(sequences) };\n`;
			fs.writeFileSync(
				path.resolve(dir, 'index.mjs'),
				output
			);
			fs.writeFileSync(
				path.resolve(dir, 'index.d.mts'),
				type === 'Sequence_Property'
					? `declare const data: string[];\nexport default data;\n`
					: `declare const aliasMap: Record<number, string[]>;\nexport default aliasMap;\n`
			);
			continue;
		}

		// Save the data to a file.
		let codePointsFileContent = `import ranges from './ranges.mjs';\n\nexport default ranges.flatMap((r) => Array.from(r.keys()));\n`;
		let symbolsFileContent = `import ranges from './ranges.mjs';\n\nexport default ranges.flatMap((r) => Array.from(r.values()));\n`;
		let codePointsType = 'number[]';
		let symbolsType = 'string[]';
		if (!isCaseFoldingOrMapping) {
			const encodedRanges = codePoints instanceof regenerate ? encodeRegenerate(codePoints) : encodeRanges(codePoints);
			fs.writeFileSync(
				path.resolve(dir, 'ranges.mjs'),
				`import decodeRanges from '../../decode-ranges.mjs';\n\nexport default decodeRanges('${encodedRanges}');\n`
			);
			fs.writeFileSync(
				path.resolve(dir, 'ranges.d.mts'),
				'import type { UnicodeRange } from "../../decode-ranges.mjs";\n\ndeclare const ranges: UnicodeRange[];\nexport default ranges;\n'
			);
			fs.writeFileSync(
				path.resolve(dir, 'regex.mjs'),
				'export default /' + regenerate(codePoints).toString() + '/;\n'
			);
			fs.writeFileSync(
				path.resolve(dir, 'regex.d.mts'),
				'declare const regex: RegExp;\nexport default regex;\n'
			);
			if (codePointsSizeLt(codePoints, 10)) {
				const codePointsAsArray = codePoints instanceof regenerate ? codePoints.toArray() : codePoints;
				codePointsFileContent = `export default ${ jsesc(codePointsAsArray) };\n`;
				symbolsFileContent = `export default ${ jsesc(codePointsAsArray.map((cp) => String.fromCodePoint(cp))) };\n`;
			}
		} else {
			const symbols = new Map();
			for (let [from, to] of codePoints) {
				from = String.fromCodePoint(from);
				if (Array.isArray(to)) {
					to = String.fromCodePoint.apply(null, to);
				} else {
					to = String.fromCodePoint(to);
				}
				symbols.set(from, to);
			}
			if (codePoints.size < 10) {
				codePointsFileContent = `export default ${ jsesc(codePoints) };\n`;
				symbolsFileContent = `export default ${ jsesc(symbols) };\n`;
			} else {
				codePointsFileContent = `import { gunzipSync } from 'node:zlib';\n\nexport default ${ gzipInline(codePoints) };\n`;
				symbolsFileContent = `import { gunzipSync } from 'node:zlib';\n\nexport default ${ gzipInline(symbols) };\n`;
			}
			if ((type === 'Case_Folding' && item === 'F') || type === 'Special_Casing') {
				codePointsType = 'Map<number, number[]>';
			} else {
				codePointsType = 'Map<number, number>';
			}
			symbolsType = 'Map<string, string>';
		}
		fs.writeFileSync(
			path.resolve(dir, 'code-points.mjs'),
			codePointsFileContent
		);
		fs.writeFileSync(
			path.resolve(dir, 'code-points.d.mts'),
			`declare const codePoints: ${ codePointsType };\nexport default codePoints;\n`
		);
		fs.writeFileSync(
			path.resolve(dir, 'symbols.mjs'),
			symbolsFileContent
		);
		fs.writeFileSync(
			path.resolve(dir, 'symbols.d.mts'),
			`declare const symbols: ${ symbolsType };\nexport default symbols;\n`
		);
	}
	if (options.type === 'Bidi_Mirroring_Glyph') {
		const type = options.type;
		const dir = path.resolve(
			__dirname, '..',
			'output', 'unicode-' + version, type
		);
		if (!hasKey(dirMap, type)) {
			dirMap[type] = [];
		}
		fs.mkdirSync(dir, { recursive: true });
		// `Bidi_Mirroring_Glyph/index.mjs`
		// Note: `Bidi_Mirroring_Glyph` doesn’t have repeated strings; don’t gzip.
		const output = [
			`const chr = String.fromCodePoint;`,
			`const pair = (t, u, v) => [t ? u + v : v, chr(t ? u : u + v)];`,
			`export default new Map(${
				JSON.stringify(bidiMirroringGlyphFlatPairs)
			}.map((v, i, a) => pair(i & 1, a[i ^ 1], v)));\n`
		].join('\n');
		fs.writeFileSync(
			path.resolve(dir, 'index.mjs'),
			output
		);
		fs.writeFileSync(
			path.resolve(dir, 'index.d.mts'),
			`declare const data: Map<number, string>;\nexport default data;\n`
		);
	} else {
		for (const type of Object.keys(auxMap)) {
			const dir = path.resolve(
				__dirname, '..',
				'output', 'unicode-' + version, type
			);
			if (!hasKey(dirMap, type)) {
				dirMap[type] = [];
			}
			fs.mkdirSync(dir, { recursive: true });
			// `categories/index.mjs`
			// or `Bidi_Class/index.mjs`
			// or `bidi-brackets/index.mjs`
			// or `Names/index.mjs`
			const flatRuns = samePropertyRuns(auxMap[type]);
			const output = `import { gunzipSync } from 'node:zlib';\nimport decodePropertyMap from '../decode-property-map.mjs';\n\nexport default decodePropertyMap(${gzipInline(
				flatRuns
			)});\n`;
			fs.writeFileSync(path.resolve(dir, 'index.mjs'), output);
			fs.writeFileSync(path.resolve(dir, 'index.d.mts'), `declare const map: Map<number, string>;\nexport default map;\n`);
		}
	}
	return dirMap;
};

const extend = (destination, source) => {
	for (const key in source) {
		if (hasKey(source, key)) {
			if (!hasKey(destination, key)) {
				destination[key] = [];
			}
			source[key].forEach((item) => {
				append(destination, key, item);
			});
		}
	}
};

const readDataFile = (version, type) => {
	const sourceFile = path.resolve(
		__dirname, '..',
		'data', version + '-' + type + '.txt'
	);
	try {
		const source = fs.readFileSync(sourceFile, 'utf-8');
		return source;
	} catch {
		return;
	}
};

export default {
	range,
	append,
	extend,
	readDataFile,
	writeFiles,
};

