import utils from './utils.mjs';

const parseEmoji = async (version) => {
	const source = utils.readDataFile(version, 'emoji');
	if (!source) {
		return;
	}
	const propertyMap = new Map();
	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data = line.trim().split(' ; ');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const property = data[1].split('#')[0].trim();
		if (rangeParts.length === 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach((codePoint) => {
				if (propertyMap.has(property)) {
					propertyMap.get(property).add(codePoint);
				} else {
					propertyMap.set(property, new Set([codePoint]));
				}
			});
		} else {
			const codePoint = parseInt(charRange, 16);
			if (propertyMap.has(property)) {
				propertyMap.get(property).add(codePoint);
			} else {
				propertyMap.set(property, new Set([codePoint]));
			}
		}
	}
	const plainObject = {};
	for (const [property, codePoints] of propertyMap) {
		plainObject[property] = [...codePoints].sort((a, b) => a - b);
	}
	return plainObject;
};

export default parseEmoji;

