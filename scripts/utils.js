'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const jsesc = require('jsesc');
const mkdirp = require('mkdirp');
const regenerate = require('regenerate');
const decodeRanges = require('../static/decode-ranges.js');

const gzipInline = function(data) {
	if (data instanceof Map) {
		return `new Map(${ gzipInline([...data]) })`;
	}
	const json = jsesc(data, { 'json': true });
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

const append = function(object, key, value) {
	if (hasKey(object, key)) {
		object[key].push(value);
	} else {
		object[key] = [value];
	}
};

const samePropertyRuns = function(codePointProperties) {
	const result = [];
	const len = codePointProperties.length;
	for (let last = 0, cur = 0; cur < len; ) {
		const begin = cur;
		const value = codePointProperties[cur];
		while (++cur < len && codePointProperties[cur] === value)
			;
		if (value !== undefined) {
			const gapLen = begin - last;
			const runLen = cur - begin;
			result.push(gapLen, runLen, value);
			last = cur;
		}
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
	const auxMap = {};
	Object.keys(map).forEach(function(item) {
		const codePoints = map[item];
		const type = typeof options.type == 'function'
			? options.type(item)
			: options.type;
		const isCaseFolding = type == 'Case_Folding';
		const isBidiClass = type == 'Bidi_Class';
		const isNamesCanon = type == 'Names' && !subType;
		const isNameAliases = type == 'Names' && subType == 'name-aliases';
		if (isBidiClass) {
			item = item.replace(/^Bidi_/, '');
		}
		const subdir = isNameAliases ? item.charAt(0).toUpperCase() + item.slice(1) : item;
		const dir = path.resolve(
			__dirname, '..',
			'output', 'unicode-' + version, type, subdir
		);
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
			if (!auxMap[type]) {
				auxMap[type] = [];
			}
			codePoints.forEach(function(codePoint) {
				console.assert(!auxMap[type][codePoint]);
				auxMap[type][codePoint] = item;
			});
		}
		if (type == 'Bidi_Mirroring_Glyph' || isNamesCanon) {
			return;
		}
		append(dirMap, type, subdir);
		// Create the target directory if it doesn’t exist yet.
		mkdirp.sync(dir);

		// Sequence properties are special.
		if (type == 'Sequence_Property' || isNameAliases) {
			const sequences = codePoints;
			const output = `module.exports=${ gzipInline(map[item]) }`;
			fs.writeFileSync(
				path.resolve(dir, 'index.js'),
				output
			);
			return;
		}

		// Save the data to a file
		let codePointsExports = `require('./ranges.js').flatMap(r=>Array.from(r.keys()))`;
		let symbolsExports = `require('./ranges.js').flatMap(r=>Array.from(r.values()))`;
		if (!isCaseFolding) {
			const sortedCodePoints = [...codePoints].sort((a, b) => a - b);
			fs.writeFileSync(
				path.resolve(dir, 'ranges.js'),
				`module.exports=require('../../decode-ranges.js')('${
					decodeRanges.encode(sortedCodePoints)
				}')`
			);
			fs.writeFileSync(
				path.resolve(dir, 'regex.js'),
				'module.exports=/' + regenerate(codePoints).toString() + '/'
			);
			if (codePoints.length < 10) {
				codePointsExports = jsesc(codePoints);
				symbolsExports = jsesc(codePoints.map(cp => String.fromCodePoint(cp)));
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
			codePointsExports = jsesc(codePoints);
			symbolsExports = jsesc(symbols);
		}
		fs.writeFileSync(
			path.resolve(dir, 'code-points.js'),
			`module.exports=${ codePointsExports }`
		);
		fs.writeFileSync(
			path.resolve(dir, 'symbols.js'),
			`module.exports=${ symbolsExports }`
		);
	});
	Object.keys(auxMap).forEach(function(type) {
		const dir = path.resolve(
			__dirname, '..',
			'output', 'unicode-' + version, type
		);
		if (!hasKey(dirMap, type)) {
			dirMap[type] = [];
		}
		mkdirp.sync(dir);
		let output = '';
		if ('Bidi_Mirroring_Glyph' == type) { // `Bidi_Mirroring_Glyph/index.js`
			// Note: `Bidi_Mirroring_Glyph` doesn’t have repeated strings; don’t gzip.
			const flatPairs = auxMap[type]
				.map(ch => ch.codePointAt(0))
				.flatMap((a, b) => a < b ? [a, b - a] : []);
			output = [
				`const chr=String.fromCodePoint`,
				`const pair=(t,u,v)=>[t?u+v:v,chr(t?u:u+v)]`,
				`module.exports=new Map(${
					jsesc(flatPairs)
				}.map((v,i,a)=>pair(i&1,a[i^1],v)))`
			].join(';');
		} else { // `categories/index.js`
			// or `Bidi_Class/index.js`
			// or `bidi-brackets/index.js`
			// or `Names/index.js`
			const flatRuns = samePropertyRuns(auxMap[type]);
			output = `module.exports=require('../decode-property-map.js')(${
				gzipInline(flatRuns)
			})`;
		}
		fs.writeFileSync(
			path.resolve(dir, 'index.js'),
			output
		);
	});
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
