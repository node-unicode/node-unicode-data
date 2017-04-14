'use strict';

const looseMatch = require('unicode-loose-match');
const propertyAliases = require('unicode-property-aliases');
const utils = require('./utils.js');

const bidiBracketMap = new Map([
	['o', 'Open'],
	['c', 'Close'],
	['n', 'None']
]);

const parseBidiBrackets = function(version) {
	const map = {};
	const source = utils.readDataFile(version, 'bidi-brackets');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	const symbolsHandled = new Set();
	lines.forEach(function(line) {
		if (
			/^#/.test(line) ||
			!/;\x20/.test(line)
		) {
			return;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		let item = data[2].split('#')[0].trim();
		item = bidiBracketMap.get(item);
		const rangeParts = charRange.split('-');
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				symbolsHandled.add(codePoint);
				utils.append(map, item, codePoint);
			});
		} else {
			const codePoint = parseInt(charRange, 16);
			symbolsHandled.add(codePoint);
			utils.append(map, item, codePoint);
		}
	});
	for (let codePoint = 0x000000; codePoint <= 0x10FFFF; codePoint++) {
		// Note: `Any`, `ASCII`, and `Assigned` are actually properties,
		// not categories. http://unicode.org/reports/tr18/#Categories
		if (!symbolsHandled.has(codePoint)) {
			utils.append(map, 'None', codePoint);
		}
	}
	return map;
};

module.exports = parseBidiBrackets;
