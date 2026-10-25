import valueAliases from 'unicode-property-value-aliases';
import utils from './utils.mjs';
import regenerate from 'regenerate';
import { parseDerivedGeneralCategory } from './parse-blocks-scripts-properties.mjs';

const aliases = valueAliases.get('Line_Break');

const findCanonicalName = (shortName) => {
	const canonicalName = aliases.get(shortName);
	if (!canonicalName) {
		throw new Error(
			`Failed to find canonical name for Line_Break=${shortName}. Update \`unicode-property-value-aliases\`.`,
		);
	}
	return canonicalName;
};

const parseLineBreak = async (version) => {
	const source = utils.readDataFile(version, 'line-break');
	if (!source) {
		return;
	}
	const map = {
		// All code points, assigned and unassigned, that are not listed explicitly
		// are given the value `XX`.
		Unknown: regenerate().addRange(0, 0x10ffff),
	};
	// Before Unicode 4.0, only unassigned code points default to `XX`:
	// “Assigned characters that are not listed explicitly are given the
	// value "AL".”
	const assignedDefault =
		/Assigned characters that are not listed explicitly are given the value\s*#?\s*"(\w+)"/.exec(
			source,
		)?.[1];
	// Unicode 3.0 lists ranges as UnicodeData does, e.g.
	// `3400;ID;<CJK Ideograph Extension A, First>` and
	// `4DB5;ID;<CJK Ideograph Extension A, Last>`.
	let rangeStart;
	const lines = source.split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const data = trimmed.split(';');
		const value = data[1].split('#')[0].trim();
		const canonicalName = findCanonicalName(value);
		const name = data[2]?.split('#')[0].trim() ?? '';
		let [from, to = from] = data[0]
			.trim()
			.split('..')
			.map((codePoint) => parseInt(codePoint, 16));
		if (/^<.+, First>$/.test(name)) {
			rangeStart = from;
			continue;
		}
		if (/^<.+, Last>$/.test(name)) {
			if (rangeStart === undefined) {
				throw new Error(`Range end without a start: ${line}`);
			}
			from = rangeStart;
			rangeStart = undefined;
		}
		map[canonicalName] ??= regenerate();
		map['Unknown'].removeRange(from, to);
		map[canonicalName].addRange(from, to);
	}
	if (assignedDefault) {
		const canonicalName = findCanonicalName(assignedDefault);
		const { Assigned } = await parseDerivedGeneralCategory(version);
		const unlistedAssigned = map['Unknown'].clone().intersection(Assigned);
		map['Unknown'].remove(unlistedAssigned);
		map[canonicalName] ??= regenerate();
		map[canonicalName].add(unlistedAssigned);
	}

	return map;
};

export default parseLineBreak;
