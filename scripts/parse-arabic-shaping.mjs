import utils from './utils.mjs';
import regenerate from 'regenerate';

const parseArabicShaping = async (version) => {
	const source = await utils.readDataFile(version, 'arabic-shaping');
	if (!source) {
		return;
	}
	const map = {};
	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		// Format: `0600; ARABIC NUMBER SIGN; U; No_Joining_Group`.
		// Field 1 (schematic name) is a comment; field 2 is the
		// Joining_Type value; field 3 (Joining_Group) is out of scope.
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0].trim(), 16);
		const joiningType = data[2].trim();
		map[joiningType] ??= regenerate();
		map[joiningType].add(codePoint);
	}
	return map;
};

export default parseArabicShaping;
