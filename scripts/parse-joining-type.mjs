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

const parseDerivedJoiningType = (source) => {
	const map = {};
	const lines = source.split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		// Format: `064B..0655; T # Mn [11] ARABIC FATHATAN..ARABIC HAMZA BELOW`.
		const data = trimmed.split(';');
		const [first, last] = data[0].trim().split('..')
			.map((codePoint) => parseInt(codePoint, 16));
		const joiningType = findCanonicalName(data[1].split('#')[0].trim());
		map[joiningType] ??= regenerate();
		map[joiningType].addRange(first, last ?? first);
	}
	// Code points that aren’t listed have the default value `Non_Joining`.
	const nonJoining = regenerate().addRange(0, 0x10FFFF);
	for (const codePoints of Object.values(map)) {
		nonJoining.remove(codePoints);
	}
	map.Non_Joining = nonJoining;
	return map;
};

const parseArabicShaping = (source) => {
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

const parseJoiningType = async (version) => {
	// `DerivedJoiningType.txt` lists the `Transparent` code points that
	// `ArabicShaping.txt` leaves implicit, so prefer it where it’s available.
	const derivedSource = utils.readDataFile(version, 'derived-joining-type');
	if (derivedSource) {
		return parseDerivedJoiningType(derivedSource);
	}
	const source = utils.readDataFile(version, 'arabic-shaping');
	if (!source) {
		return;
	}
	return parseArabicShaping(source);
};

export default parseJoiningType;
