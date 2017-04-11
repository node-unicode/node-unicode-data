'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const jsesc = require('jsesc');
const mkdirp = require('mkdirp');
const regenerate = require('regenerate');

const gzipInline = function(data) {
	if (data instanceof Map) {
		return `new Map(${ gzipInline([...data]) })`;
	}
	const json = jsesc(data, { 'json': true });
	const gzipBuffer = zlib.gzipSync(json);
	return `JSON.parse(require('zlib').gunzipSync(${ jsesc(gzipBuffer) }))`;
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

const writeFiles = function(options) {
	const version = options.version;
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
		if (isBidiClass) {
			item = item.replace(/^Bidi_/, '');
		}
		const dir = path.resolve(
			__dirname, '..',
			'output', 'unicode-' + version, type, item
		);
		if (
			type == 'Bidi_Class' ||
			type == 'Bidi_Mirroring_Glyph' ||
			type == 'Bidi_Paired_Bracket_Type' ||
			type == 'Names' ||
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
		if (type == 'Bidi_Mirroring_Glyph' || type == 'Names') {
			return;
		}
		append(dirMap, type, item);
		// Create the target directory if it doesn’t exist yet
		mkdirp.sync(dir);
		// Save the data to a file
		fs.writeFileSync(
			path.resolve(dir, 'code-points.js'),
			'module.exports=' + (
				codePoints.length > 999 ? gzipInline : jsesc
			)(codePoints)
		);
		if (!isCaseFolding) {
			fs.writeFileSync(
				path.resolve(dir, 'regex.js'),
				'module.exports=/' + regenerate(codePoints).toString() + '/'
			);
		}

		const symbols = isCaseFolding ?
			(() => {
				const result = new Map();
				for (let [from, to] of codePoints) {
					from = String.fromCodePoint(from);
					if (Array.isArray(to)) {
						to = String.fromCodePoint.apply(null, to);
					} else {
						to = String.fromCodePoint(to);
					}
					result.set(from, to);
				}
				return result;
			})() :
			codePoints.map((codePoint) => String.fromCodePoint(codePoint));
		fs.writeFileSync(
			path.resolve(dir, 'symbols.js'),
			'module.exports=' + (
				!isCaseFolding && symbols.length > 999 ? gzipInline : jsesc
			)(symbols)
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
		if (/^(?:Bidi_Class|Bidi_Mirroring_Glyph|bidi-brackets|Names)$/.test(type)) {
			const map = new Map();
			Object.keys(auxMap[type]).forEach(function(key) {
				const codePoint = Number(key);
				const value = auxMap[type][key];
				map.set(codePoint, value);
			});
			if ('Bidi_Mirroring_Glyph' == type) { // `Bidi_Mirroring_Glyph/index.js`
				// Note: `Bidi_Mirroring_Glyph` doesn’t have repeated strings; don’t gzip.
				output = `module.exports=${ jsesc(map) }`;
			} else { // `Bidi_Class/index.js` or `bidi-brackets/index.js` or `Names/index.js`
				output = `module.exports=${ gzipInline(map) }`;
			}
		} else { // `categories/index.js`
			const array = auxMap[type];
			output = `var x=${ gzipInline(array) };module.exports=new Map(x.entries())`;
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
