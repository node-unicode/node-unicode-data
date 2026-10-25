import regenerate from 'regenerate';
import utils from './utils.mjs';

const parseCompositionExclusions = async (version) => {
	const source = utils.readDataFile(version, 'composition-exclusions');
	if (!source) {
		return;
	}
	const result = regenerate();
	const lines = source.split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const data = trimmed.split('#');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		if (rangeParts.length === 2) {
			result.addRange(parseInt(rangeParts[0], 16), parseInt(rangeParts[1], 16));
		} else {
			const codePoint = parseInt(charRange, 16);
			result.add(codePoint);
		}
	}
	return {
		Composition_Exclusion: result,
	};
};

export default parseCompositionExclusions;
