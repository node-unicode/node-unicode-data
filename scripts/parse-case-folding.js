var utils = require('./utils.js');

var parseCaseFolding = function(version) {
	var caseFoldingMap = {};
	var source = utils.readDataFile(version, 'case-folding');
	if (!source) {
		return;
	}
	var lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		var data = line.trim().split(';');
		var codePoint = parseInt(data[0], 16);
		var status = data[1].trim();
		var mapping = parseInt(data[2], 16);
		if (!caseFoldingMap[status]) {
			caseFoldingMap[status] = {};
		}
		caseFoldingMap[status][codePoint] = mapping;
	});
	return caseFoldingMap;
};

module.exports = parseCaseFolding;
