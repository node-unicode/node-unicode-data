import utils from './utils.mjs';
import valueAliases from 'unicode-property-value-aliases';
import regenerate from 'regenerate';
import { parseDerivedGeneralCategory } from './parse-blocks-scripts-properties.mjs';

const aliases = valueAliases.get('Joining_Type');

const findCanonicalName = (shortName) => {
	const canonicalName = aliases.get(shortName);
	if (!canonicalName) {
		throw new Error(
			`Failed to find canonical name for Joining_Type=${shortName}. Update \`unicode-property-value-aliases\`.`,
		);
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
		const [first, last] = data[0]
			.trim()
			.split('..')
			.map((codePoint) => parseInt(codePoint, 16));
		const joiningType = findCanonicalName(data[1].split('#')[0].trim());
		map[joiningType] ??= regenerate();
		map[joiningType].addRange(first, last ?? first);
	}
	// Code points that aren’t listed have the default value `Non_Joining`.
	const nonJoining = regenerate().addRange(0, 0x10ffff);
	for (const [joiningType, codePoints] of Object.entries(map)) {
		if (joiningType !== 'Non_Joining') {
			nonJoining.remove(codePoints);
		}
	}
	map.Non_Joining = nonJoining;
	return map;
};

const parseArabicShaping = (source, categories) => {
	// ArabicShaping files from Unicode 3.1.1 define implicit T as Mn or Cf,
	// excluding joining controls, and DerivedJoiningType agrees for 3.1.1
	// through 4.0.1. Earlier files state no rule, so apply the same one.
	// Explicit ArabicShaping records override defaults.
	const transparent = regenerate()
		.add(categories.Nonspacing_Mark)
		.add(categories.Format)
		.remove(0x200c)
		.remove(0x200d);
	const map = {
		Transparent: transparent,
		// Before Unicode 3.1.1, ArabicShaping omits the joining controls.
		// ZWJ still causes cursive joining; ZWNJ remains Non_Joining.
		Join_Causing: regenerate(0x200d),
		Non_Joining: regenerate()
			.addRange(0, 0x10ffff)
			.remove(transparent)
			.remove(0x200d),
	};
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
		map.Transparent.remove(codePoint);
		map.Join_Causing.remove(codePoint);
		map.Non_Joining.remove(codePoint);
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
	return parseArabicShaping(source, await parseDerivedGeneralCategory(version));
};

export default parseJoiningType;
