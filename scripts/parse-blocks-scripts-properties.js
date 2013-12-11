var punycode = require('punycode');
var utils = require('./utils.js');

var parseBlocksScriptsProperties = function(type, version) {
	// `type` is 'properties' or 'scripts' or 'block'
	var map = {};
	var source = utils.readDataFile(version, type);
	if (!source) {
		return;
	}
	var lines = source.split('\n');
	lines.forEach(function(line) {
		if (
			/^#/.test(line) ||
			!(/^(blocks|bidi-mirroring|bidi-brackets)$/.test(type) ?
			 /;\x20/.test(line) : /\x20;\x20/.test(line))
		) {
			return;
		}
		var data = line.trim().split(';');
		var charRange = data[0].replace('..', '-').trim();
		var item = data[ type == 'bidi-brackets' ? 2 : 1 ].split(
			type == 'blocks' ? ';' : '#'
		)[0].trim();
		if (type == 'bidi-mirroring') {
			item = punycode.ucs2.encode([parseInt(item, 16)]);
		}
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
	'parseBlocks': parseBlocksScriptsProperties.bind(null, 'blocks'),
	'parseMirroring': parseBlocksScriptsProperties.bind(null, 'bidi-mirroring'),
	'parseBrackets': parseBlocksScriptsProperties.bind(null, 'bidi-brackets')
};
