var fs = require('fs');
var path = require('path');
var utils = require('./utils.js');

var parseBlocksScriptsProperties = function(type, version) {
	// `type` is 'properties' or 'scripts' or 'block'
	var map = {};
	var sourceFile = path.resolve(__dirname, '..', 'data', version + '-' + type + '.txt');
	if (!fs.existsSync(sourceFile)) {
		return;
	}
	var source = fs.readFileSync(sourceFile, 'utf-8');
	var lines = source.split('\n');
	lines.forEach(function(line) {
		if (
			/^#/.test(line) ||
			(type == 'blocks' && !/;\x20/.test(line)) ||
			(type != 'blocks' && !/\x20;\x20/.test(line))
		) {
			return;
		}
		var data = line.trim().split(';');
		var charRange = data[0].replace('..', '-').trim();
		var item = data[1].split(
			type == 'blocks' ? ';' : '#'
		)[0].trim();
		var rangeParts = charRange.split('-');
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				utils.append(map, item, codePoint);
			});
		} else {
			utils.append(map, item, parseInt(charRange, 16));
		}
	});
	return map;
};

module.exports = {
	'parseScripts': parseBlocksScriptsProperties.bind(null, 'scripts'),
	'parseProperties': parseBlocksScriptsProperties.bind(null, 'properties'),
	'parseBlocks': parseBlocksScriptsProperties.bind(null, 'blocks')
};
