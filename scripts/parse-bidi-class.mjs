import utils from './utils.mjs';
import valueAliases from 'unicode-property-value-aliases';
import regenerate from 'regenerate';

const bidiAliases = valueAliases.get('Bidi_Class');

const createDefaults = (version) => {
	const defaults = { Left_To_Right: regenerate().addRange(0, 0x10ffff) };
	// Unicode 3.x documents these defaults in UAX #9, Table 3-7. Its early
	// extracted files do not list the unassigned characters or @missing rules.
	if (parseInt(version, 10) === 3) {
		defaults.Right_To_Left = regenerate()
			.addRange(0x590, 0x5ff)
			.addRange(0xfb1d, 0xfb4f);
		defaults.Arabic_Letter = regenerate()
			.addRange(0x600, 0x7bf)
			.addRange(0xfb50, 0xfdff)
			.addRange(0xfe70, 0xfeff);
		defaults.Left_To_Right.remove(defaults.Right_To_Left).remove(
			defaults.Arabic_Letter,
		);
	}
	return defaults;
};

const addDefaults = (map, defaults) => {
	const explicit = regenerate();
	for (const set of Object.values(map)) {
		explicit.add(set);
	}
	for (const [value, set] of Object.entries(defaults)) {
		map[value] ??= regenerate();
		map[value].add(set.remove(explicit));
	}
	return map;
};

const parseDerivedBidiClass = (source, version) => {
	const map = {};
	const defaults = createDefaults(version);
	for (const line of source.split('\n')) {
		const missing = /^#\s*@missing:\s*([\dA-F]+)\.\.([\dA-F]+);\s*(\w+)/.exec(
			line,
		);
		if (missing) {
			const start = parseInt(missing[1], 16);
			const end = parseInt(missing[2], 16);
			const value = bidiAliases.get(missing[3]) ?? missing[3];
			for (const set of Object.values(defaults)) {
				set.removeRange(start, end);
			}
			defaults[value] ??= regenerate();
			defaults[value].addRange(start, end);
			continue;
		}
		const fields = line.split('#')[0].trim().split(';');
		if (fields.length < 2) {
			continue;
		}
		const [start, end = start] = fields[0]
			.trim()
			.split('..')
			.map((s) => parseInt(s, 16));
		const value = bidiAliases.get(fields[1].trim());
		if (!value) {
			throw new Error(`Unknown Bidi_Class in ${line}.`);
		}
		map[value] ??= regenerate();
		map[value].addRange(start, end);
	}
	return addDefaults(map, defaults);
};

const parseBidiClass = async (version) => {
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
	const derived = utils.readDataFile(version, 'derived-bidi-class');
	if (derived) {
		return parseDerivedBidiClass(derived, version);
	}
	if (parseFloat(version) >= 3.2) {
		throw new Error(`Missing DerivedBidiClass data for Unicode ${version}.`);
	}
	const categoryMap = {};
	const lines = source.split('\n');
	let flag = false;
	let first = 0;
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const data = trimmed.split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];
		const bidiCategory = data[4] === '' ? undefined : bidiAliases.get(data[4]);
		if (bidiCategory === undefined) {
			continue;
		}
		categoryMap[bidiCategory] ??= regenerate();
		if (flag) {
			if (/<.+, Last>/.test(name)) {
				flag = false;
				categoryMap[bidiCategory].addRange(first, codePoint);
			} else {
				throw new Error('Database exception');
			}
		} else {
			if (/<.+, First>/.test(name)) {
				flag = true;
				first = codePoint;
			} else {
				categoryMap[bidiCategory].add(codePoint);
			}
		}
	}

	return addDefaults(categoryMap, createDefaults(version));
};

export default parseBidiClass;
