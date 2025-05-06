'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const jsesc = require('jsesc');
const regenerate = require('regenerate');
const { encodeRanges, encodeRegenerate } = require('./encode-ranges.js');

const gzipInline = function(data) {
	if (data instanceof Map) {
		return `new Map(${ gzipInline([...data]) })`;
	}
	const json = JSON.stringify(data);
	const gzipBuffer = zlib.gzipSync(json);
	const str = gzipBuffer.toString('base64');
	return `JSON.parse(require('zlib').gunzipSync(Buffer.from('${ str }','base64')))`;
};

const range = function(start, stop) {
	// inclusive, e.g. `range(1, 3)` → `[1, 2, 3]`
	const result = [];
	for (; start <= stop; result.push(start++));
	return result;
};

const object = {};
const hasOwnProperty = object.hasOwnProperty;
const hasKey = function(object, key) {
	return hasOwnProperty.call(object, key);
};

const codePointsSizeLt = function(codePoints, value) {
	if (codePoints instanceof regenerate) {
		const regenerateData = codePoints.data;
		for (let seenSize = 0, i = 0; i < regenerateData.length; i+= 2) {
			seenSize += (regenerateData[i + 1] - regenerateData[i]);
			if (seenSize >= value) {
				return false;
			}
		}
		return true;
	} else if (Array.isArray(codePoints)) {
		return codePoints.length < value;
	}
}

const append = function(object, key, value) {
	if (hasKey(object, key)) {
		object[key].push(value);
	} else {
		object[key] = [value];
	}
};

const samePropertyRuns = function(codePointProperties) {
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

const writeFiles = function(options) {
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
	 * where z is the BidiMirroringGlyph of character(x) and codepoint(z) > x
	 * @type number[]
	 */
	const bidiMirroringGlyphFlatPairs = [];
	const auxMap = {};
	Object.keys(map).forEach(function(item) {
		const codePoints = map[item];
		const type = typeof options.type == 'function'
			? options.type(item)
			: options.type;
		const isCaseFoldingOrMapping = type == 'Case_Folding' || type == 'Simple_Case_Mapping' || type == 'Special_Casing';
		const isNamesCanon = type == 'Names' && !subType;
		const isNameAliases = type == 'Names' && subType == 'name-aliases';
		const subdir = isNameAliases ? item.charAt(0).toUpperCase() + item.slice(1) : item;
		const dir = path.resolve(rootDir, type, subdir);
		if (
			type == 'Bidi_Class' ||
			type == 'Bidi_Mirroring_Glyph' ||
			type == 'Bidi_Paired_Bracket_Type' ||
			isNamesCanon ||
			(
				type == 'General_Category' &&
				// Use the most specific category names, i.e. those whose aliases match
				// `^[A-Z][a-z]$`. Ignore the others.
				!/^(?:Other|Letter|Cased_Letter|Mark|Number|Punctuation|Symbol|Separator)$/.test(item)
			)
		) {
			if (type == 'Bidi_Mirroring_Glyph') {
				const toCodepoint = item.codePointAt(0);
				codePoints.toArray().forEach(function(codePoint) {
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
		if (isNamesCanon || type == 'Bidi_Mirroring_Glyph') {
			return;
		}

		// Create the target directory if it doesn’t exist yet.
		fs.mkdirSync(dir, { recursive: true });
		append(dirMap, type, subdir);

		// Sequence properties are special.
		if (type == 'Sequence_Property' || isNameAliases) {
			const sequences = codePoints;
			const output = `module.exports=${ gzipInline(sequences) }`;
			fs.writeFileSync(
				path.resolve(dir, 'index.js'),
				output
			);
			fs.writeFileSync(
				path.resolve(dir, 'index.d.ts'),
				type === 'Sequence_Property'
					? `const data: string[];\nexport default data;`
					: `const aliasMap: Record<number, string[]>;\nexport default aliasMap;`
			);
			return;
		}

		// Save the data to a file
		let codePointsExports = `require('./ranges.js').flatMap(r=>Array.from(r.keys()))`;
		let symbolsExports = `require('./ranges.js').flatMap(r=>Array.from(r.values()))`;
		if (!isCaseFoldingOrMapping) {
			const encodedRanges = codePoints instanceof regenerate ? encodeRegenerate(codePoints) : encodeRanges(codePoints);
			fs.writeFileSync(
				path.resolve(dir, 'ranges.js'),
				`module.exports=require('../../decode-ranges.js')('${encodedRanges}')`
			);
			fs.writeFileSync(
				path.resolve(dir, 'ranges.d.ts'),
				'import type { UnicodeRange } from "../../decode-ranges.js";\n\nconst ranges: UnicodeRange[];\nexport default ranges;\n'
			);
			fs.writeFileSync(
				path.resolve(dir, 'regex.js'),
				'module.exports=/' + regenerate(codePoints).toString() + '/'
			);
			fs.writeFileSync(
				path.resolve(dir, 'regex.d.ts'),
				'declare const regex: RegExp;\nexport default regex;'
			);
			if (codePointsSizeLt(codePoints, 10)) {
				const codePointsAsArray = codePoints instanceof regenerate ? codePoints.toArray() : codePoints;
				codePointsExports = jsesc(codePointsAsArray);
				symbolsExports = jsesc(codePointsAsArray.map(cp => String.fromCodePoint(cp)));
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
			codePointsExports = codePoints.size < 10 ? jsesc(codePoints) : gzipInline(codePoints);
			symbolsExports = codePoints.size < 10 ? jsesc(symbols) : gzipInline(symbols);
		}
		fs.writeFileSync(
			path.resolve(dir, 'code-points.js'),
			`module.exports=${ codePointsExports }`
		);
		fs.writeFileSync(
			path.resolve(dir, 'code-points.d.ts'),
			`declare const codePoints: number[];\nexport default codePoints;`
		);
		fs.writeFileSync(
			path.resolve(dir, 'symbols.js'),
			`module.exports=${ symbolsExports }`
		);
		fs.writeFileSync(
			path.resolve(dir, 'symbols.d.ts'),
			`declare const symbols: string[];\nexport default symbols;`
		);
	});
	if (options.type == 'Bidi_Mirroring_Glyph') {
		const type = options.type;
		const dir = path.resolve(
			__dirname, '..',
			'output', 'unicode-' + version, type
		);
		if (!hasKey(dirMap, type)) {
			dirMap[type] = [];
		}
		fs.mkdirSync(dir, { recursive: true });
		// `Bidi_Mirroring_Glyph/index.js`
		// Note: `Bidi_Mirroring_Glyph` doesn’t have repeated strings; don’t gzip.
		const output = [
			`const chr=String.fromCodePoint`,
			`const pair=(t,u,v)=>[t?u+v:v,chr(t?u:u+v)]`,
			`module.exports=new Map(${
				JSON.stringify(bidiMirroringGlyphFlatPairs)
			}.map((v,i,a)=>pair(i&1,a[i^1],v)))`
		].join(';');
		fs.writeFileSync(
			path.resolve(dir, 'index.js'),
			output
		);
		fs.writeFileSync(
			path.resolve(dir, 'index.d.ts'),
			`const data: Map<number, string>;\nexport default data;`
		);
	} else {
		Object.keys(auxMap).forEach(function(type) {
			const dir = path.resolve(
				__dirname, '..',
				'output', 'unicode-' + version, type
			);
			if (!hasKey(dirMap, type)) {
				dirMap[type] = [];
			}
			fs.mkdirSync(dir, { recursive: true });
			// `categories/index.js`
			// or `Bidi_Class/index.js`
			// or `bidi-brackets/index.js`
			// or `Names/index.js`
			const flatRuns = samePropertyRuns(auxMap[type]);
			const output = `module.exports=require('../decode-property-map.js')(${gzipInline(
				flatRuns
			)})`;
			fs.writeFileSync(path.resolve(dir, "index.js"), output);
			fs.writeFileSync(path.resolve(dir, "index.d.ts"), `declare const map: Map<number, string>;\nexport default map;`);
		});
	}
	return dirMap;
};

const extend = function(destination, source) {
	for (var key in source) {
		if (hasKey(source, key)) {
			if (!hasKey(destination, key)) {
				destination[key] = [];
			}
			source[key].forEach(function(item) {
				append(destination, key, item);
			});
		}
	}
};

const readDataFile = function(version, type) {
	const sourceFile = path.resolve(
		__dirname, '..',
		'data', version + '-' + type + '.txt'
	);
	if (!fs.existsSync(sourceFile)) {
		return;
	}
	const source = fs.readFileSync(sourceFile, 'utf-8');
	return source;
};

module.exports = {
	'range': range,
	'append': append,
	'extend': extend,
	'readDataFile': readDataFile,
	'writeFiles': writeFiles
};
