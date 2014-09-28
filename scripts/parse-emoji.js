var utils = require('./utils.js');
require('string.fromcodepoint');

var parseEmoji = function(version) {
	// Collect an array of strings; one for each emoji. (This cannot be passed to
	// Regenerate directly, as each string might contain multiple code points.)
	var symbols = [];
	// Collect an array of numbers (in case the emoji consists of a single code
	// point) or nested arrays of numbers (in case the emoji consists of multiple
	// code points). Note that this still cannot be used with Regenerate directly,
	// as it treats each code point as an individual item (by design).
	var codePoints = [];
	var source = utils.readDataFile(version, 'emoji');
	if (!source) {
		return;
	}
	var lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		var data = line.trim().split(';');
		var currentCodePoints = data[0].trim().split(' ').map(function(string) {
			// Turn a string representing a code point such as `'U+0023'` into the
			// corresponding number, e.g. `0x23`.
			return parseInt(string.slice(2), 16);
		});
		if (currentCodePoints.length == 1) {
			codePoints.push(currentCodePoints[0]);
			symbols.push(String.fromCodePoint(currentCodePoints[0]));
		} else {
			codePoints.push(currentCodePoints);
			symbols.push(String.fromCodePoint.apply(null, currentCodePoints));
		}
	});
	return {
		'symbols': symbols,
		'codePoints': codePoints
	};
};

module.exports = parseEmoji;
