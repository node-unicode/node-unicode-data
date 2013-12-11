var utils = require('./scripts/utils.js');
var parsers = require('./scripts/parse-blocks-scripts-properties.js');
parsers.parseCategories = require('./scripts/parse-categories.js');
var extend = utils.extend;

var generateData = function(version) {
	var dirMap = {};
	console.log('Generating data for Unicode v%s…', version);
	console.log('Parsing Unicode v%s categories…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseCategories(version),
		'type': function(category) {
			return /^(?:Any|ASCII|Assigned|Bidi_[A-Z]+)$/.test(category)
				? 'properties'
				: 'categories';
		}
	}));
	console.log('Parsing Unicode v%s scripts…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseScripts(version),
		'type': 'scripts'
	}));
	console.log('Parsing Unicode v%s properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseProperties(version),
		'type': 'properties'
	}));
	console.log('Parsing Unicode v%s blocks…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseBlocks(version),
		'type': 'blocks'
	}));
	console.log('Parsing Unicode v%s bidi-mirroring…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseMirroring(version),
		'type': 'bidi-mirroring'
	}));
	console.log('Parsing Unicode v%s bidi-brackets…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseBrackets(version),
		'type': 'bidi-brackets'
	}));
	return dirMap;
};

module.exports = generateData;
