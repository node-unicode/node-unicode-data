'use strict';

const utils = require('./utils.js');

const parseEmojiSequencesWithId = ({ version, id }) => {
	const source = utils.readDataFile(version, id);
	if (!source) {
		return;
	}
	const propertyMap = new Map();
	const lines = source.split('\n');
	lines.forEach((line) => {
		if (!line || /^#/.test(line)) {
			return;
		}
		const data = line.trim().split('; ');
		const codePoints = data[0].trim().split(' ').map((hex) => {
			return parseInt(hex, 16);
		});
		const sequence = String.fromCodePoint(...codePoints);
		const property = data[1].split('#')[0].trim();
		if (propertyMap.has(property)) {
			propertyMap.get(property).add(sequence);
		} else {
			propertyMap.set(property, new Set([sequence]));
		}
	});
	const plainObject = {};
	for (const [property, codePoints] of propertyMap) {
		plainObject[property] = [...codePoints].sort((a, b) => a - b);
	}
	return plainObject;
};

const parseEmojiSequences = (version) => {
	return {
		...parseEmojiSequencesWithId({ version, id: 'emoji-sequences' }),
		...parseEmojiSequencesWithId({ version, id: 'emoji-zwj-sequences' }),
	};
};

module.exports = parseEmojiSequences;
