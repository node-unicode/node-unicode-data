import utils from './utils.mjs';

const parseSpecialCasing = async (version) => {
	const specialCasingMap = {};
	const source = utils.readDataFile(version, 'special-casing');
	if (!source) {
		return;
	}
	for (const line of source.split('\n')) {
		const record = line.split('#')[0].trim();
		if (!record) {
			continue;
		}
		const data = record.split(';').map((field) => field.trim());
		const from = parseInt(data[0], 16);
		const [lowercase, titlecase, uppercase] = data
			.slice(1, 4)
			.map((mapping) =>
				mapping === ''
					? []
					: mapping.split(/\s+/).map((codePoint) => parseInt(codePoint, 16)),
			);

		// Conditions can contain a language ID defined by BCP 47 and casing contexts
		// defined in Table 3-17 Context Specification for Casing:
		// https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-3/#G54277
		// Because the language ID may contain `-`, we let `--` be the separator
		// between the language ID and the casing contexts.
		const conditions = (data[4] ?? '').replace(/\s+/g, '--');
		const storageKeyPostfix = conditions ? '--' + conditions : '';
		specialCasingMap['Lowercase' + storageKeyPostfix] ??= new Map();
		specialCasingMap['Lowercase' + storageKeyPostfix].set(from, lowercase);
		specialCasingMap['Titlecase' + storageKeyPostfix] ??= new Map();
		specialCasingMap['Titlecase' + storageKeyPostfix].set(from, titlecase);
		specialCasingMap['Uppercase' + storageKeyPostfix] ??= new Map();
		specialCasingMap['Uppercase' + storageKeyPostfix].set(from, uppercase);
	}
	return specialCasingMap;
};

export default parseSpecialCasing;
