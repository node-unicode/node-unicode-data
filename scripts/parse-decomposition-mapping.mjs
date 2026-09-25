import utils from './utils.mjs';
import valueAliases from 'unicode-property-value-aliases';

// The tags in UnicodeData.txt are the long Decomposition_Type names (e.g.
// `<noBreak>`), not the short aliases the map is keyed by.
const canonicalNames = new Map(
	[...valueAliases.get('Decomposition_Type').values()]
		.map((name) => [name.toLowerCase(), name])
);

const findCanonicalName = (tag) => {
	const canonicalName = canonicalNames.get(tag.toLowerCase());
	if (!canonicalName) {
		throw new Error(`Failed to find canonical name for Decomposition_Type=${tag}. Update \`unicode-property-value-aliases\`.`);
	}
	return canonicalName;
};

// The column index of Decomposition_Mapping in UnicodeData.txt:
// https://www.unicode.org/reports/tr44/#UnicodeData.txt
const columnIndexOfDecompositionMapping = 5;

const parseDecompositionMapping = async (version) => {
	if (parseInt(version.split('.')[0], 10) < 2) {
		// Unicode v1.1.5 uses a pre-standard format, e.g. `<+circled> 0031
		// <-circled>`, with no Decomposition_Type to map the tags onto.
		return;
	}
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const map = {};
	const lines = source.split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const data = trimmed.split(';');
		const decomposition = data[columnIndexOfDecompositionMapping].trim();
		if (decomposition === '') {
			continue;
		}
		// Format: `<isolated> 0640 064B`, or `0627 0653` for a canonical
		// decomposition, which carries no tag.
		const match = /^<(\w+)>\s*(.*)$/.exec(decomposition);
		const decompositionType = match ? findCanonicalName(match[1]) : 'Canonical';
		const from = parseInt(data[0], 16);
		const to = (match ? match[2] : decomposition).split(/\s+/)
			.map((codePoint) => parseInt(codePoint, 16));
		if (to.some(Number.isNaN)) {
			throw new Error('Cannot parse the unicode data: ' + line);
		}
		map[decompositionType] ??= new Map();
		map[decompositionType].set(from, to);
	}
	return map;
};

export default parseDecompositionMapping;
