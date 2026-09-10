import utils from './utils.mjs';
import valueAliases from 'unicode-property-value-aliases';
import regenerate from 'regenerate';

const aliases = valueAliases.get('Joining_Type');

const findCanonicalName = (shortName) => {
	const canonicalName = aliases.get(shortName);
	if (!canonicalName) {
		throw new Error(`Failed to find canonical name for Joining_Type=${shortName}. Update \`unicode-property-value-aliases\`.`);
	}
	return canonicalName;
};

const parseArabicShaping = async (version) => {
	const source = utils.readDataFile(version, 'arabic-shaping');
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
		// Format: `0600; ARABIC NUMBER SIGN; U; No_Joining_Group`.
		// Field 1 (schematic name) is a comment; field 2 is the
		// Joining_Type value; field 3 (Joining_Group) is out of scope.
		const data = trimmed.split(';');
		const codePoint = parseInt(data[0].trim(), 16);
		const joiningType = findCanonicalName(data[2].trim());
		map[joiningType] ??= regenerate();
		map[joiningType].add(codePoint);
	}
	return map;
};

export default parseArabicShaping;
