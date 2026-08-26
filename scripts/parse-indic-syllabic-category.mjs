import utils from './utils.mjs';
import regenerate from 'regenerate';

const parseIndicSyllabicCategory = async (version) => {
	const source = await utils.readDataFile(version, 'indic-syllabic-category');
	if (!source) {
		return;
	}
	const map = {
		// All code points not explicitly listed for Indic_Syllabic_Category have the value Other.
		'Other': regenerate().addRange(0, 0x10FFFF),
	};
	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const value = data[1].split('#')[0].trim();
		const propertyValue = value;
		map[propertyValue] ??= regenerate();
		if (rangeParts.length === 2) {
			const [from, to] = [
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16),
			];
			map['Other'].removeRange(from, to);
			map[propertyValue].addRange(from, to);
		} else {
			const codePoint = parseInt(charRange, 16);
			map['Other'].remove(codePoint);
			map[propertyValue].add(codePoint);
		}
	}
	return map;
};

export default parseIndicSyllabicCategory;

