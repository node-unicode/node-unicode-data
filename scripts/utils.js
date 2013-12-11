var fs = require('fs');
var path = require('path');
var jsesc = require('jsesc');
var regenerate = require('regenerate');
var punycode = require('punycode');
var mkdirp = require('mkdirp');

var range = function(start, stop) {
	// inclusive, e.g. `range(1, 3)` → `[1, 2, 3]`
	for (var result = []; start <= stop; result.push(start++));
	return result;
};

var object = {};
var hasOwnProperty = object.hasOwnProperty;
var hasKey = function(object, key) {
	return hasOwnProperty.call(object, key);
};

var append = function(object, key, value) {
	if (hasKey(object, key)) {
		object[key].push(value);
	} else {
		object[key] = [value];
	}
};

var writeFiles = function(options) {
	var version = options.version;
	var map = options.map;
	if (map == null) {
		return;
	}
	var dirMap = {};
	var auxMap = {};
	Object.keys(map).forEach(function(item) {
		var codePoints = map[item];
		var type = typeof options.type == 'function'
			? options.type(item)
			: options.type;
		var dir = path.resolve(
			__dirname,
			'..', version, type, item
		);
		if (type == 'bidi-mirroring' || type == 'bidi-brackets' ||
			(type == 'properties' && /^Bidi_[A-Z]+$/.test(item)) ||
			(type == 'categories' && /^[A-Z][a-z]$/.test(item))) {
			if (!auxMap[type]) {
				auxMap[type] = [];
			}
			codePoints.forEach(function(cp) {
				console.assert(!auxMap[type][cp]);
				var v = item.slice(type == 'properties' ? 5 : 0);
				auxMap[type][cp] = v;
			});
		}
		if (type == 'bidi-mirroring') { return; }
		append(dirMap, type, item);
		// Create the target directory if it doesn’t exist yet
		mkdirp.sync(dir);
		// Save the data to a file
		fs.writeFileSync(
			path.resolve(dir, 'code-points.js'),
			'module.exports=' + jsesc(codePoints)
		);
		fs.writeFileSync(
			path.resolve(dir, 'regex.js'),
			'module.exports=/' + regenerate.fromCodePoints(codePoints) + '/'
		);
		fs.writeFileSync(
			path.resolve(dir, 'symbols.js'),
			'module.exports=' + jsesc(codePoints.map(function(codePoint) {
				return punycode.ucs2.encode([codePoint]);
			}))
		);
	});
	Object.keys(auxMap).forEach(function(type) {
		var dir = path.resolve(__dirname, '..', version, type);
		if (!hasKey(dirMap, type)) {
			dirMap[type] = [];
		}
		mkdirp.sync(dir);
		var s = 'module.exports=';
		if (/^(bidi-mirroring|bidi-brackets)$/.test(type)) {
			s += '[];\n';
			Object.keys(auxMap[type]).forEach(function(k) {
				// It seems like it would be nice to map both the codepoint
				// and the character, but that causes problems with
				// '0' vs codepoint 0, etc.
				s += 'module.exports[' + k + ']=' +
					jsesc(auxMap[type][k], { json:true }) +
					';\n';
			});
		} else {
			s += jsesc(auxMap[type]);
		}
		var filename = (type == 'properties') ? 'bidi.js' : 'index.js';
		fs.writeFileSync(
			path.resolve(dir, filename), s, 'utf-8'
		);
	});
	return dirMap;
};

var extend = function(destination, source) {
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

var readDataFile = function(version, type) {
	var sourceFile = path.resolve(
		__dirname,
		'..', 'data', version + '-' + type + '.txt'
	);
	if (!fs.existsSync(sourceFile)) {
		return;
	}
	var source = fs.readFileSync(sourceFile, 'utf-8');
	return source;
};

module.exports = {
	'range': range,
	'append': append,
	'extend': extend,
	'readDataFile': readDataFile,
	'writeFiles': writeFiles
};
