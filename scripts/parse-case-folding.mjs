import utils from './utils.mjs';

const parseCaseFolding = async (version) => {
	const caseFoldingMap = {};
	const source = utils.readDataFile(version, 'case-folding');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const data = trimmed.split(';');
		const codePoint = parseInt(data[0], 16);
		const status = data[1].trim();
		const mappings = data[2]
			.trim()
			.split(/\s+/)
			.map((cp) => parseInt(cp, 16)); // Note: this could be two characters!
		if (!caseFoldingMap[status]) {
			caseFoldingMap[status] = new Map();
		}
		caseFoldingMap[status].set(
			codePoint,
			mappings.length === 1 ? mappings[0] : mappings,
		);
	}
	return caseFoldingMap;
};

export default parseCaseFolding;
