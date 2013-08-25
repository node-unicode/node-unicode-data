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
	Object.keys(map).forEach(function(item) {
		var codePoints = map[item];
		var type = typeof options.type == 'function'
			? options.type(item)
			: options.type;
		var dir = path.resolve(
			__dirname,
			'..', version, type, item
		);
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
	return dirMap;
};

var extend = function(destination, source) {
	for (var key in source) {
		if (hasKey(source, key)) {
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
