import valueAliases from 'unicode-property-value-aliases';
import utils from './utils.mjs';
import regenerate from 'regenerate';

const aliases = valueAliases.get('Line_Break');

const findCanonicalName = (shortName) => {
	const canonicalName = aliases.get(shortName);
	if (!canonicalName) {
		throw new Error(`Failed to find canonical name for Line_Break=${shortName}. Update \`unicode-property-value-aliases\`.`);
	}
	return canonicalName;
};

const parseLineBreak = async (version) => {
	const source = await utils.readDataFile(version, 'line-break');
	if (!source) {
		return;
	}
	const map = {
		// All code points, assigned and unassigned, that are not listed explicitly
		// are given the value `XX`.
		'Unknown': regenerate().addRange(0, 0x10FFFF),
	};
	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const value = data[1].split('#')[0].trim();
		const canonicalName = findCanonicalName(value);
		map[canonicalName] ??= regenerate();
		if (rangeParts.length === 2) {
			const [from, to] = [
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16),
			];
			map['Unknown'].removeRange(from, to);
			map[canonicalName].addRange(from, to);
		} else {
			const codePoint = parseInt(charRange, 16);
			map['Unknown'].remove(codePoint);
			map[canonicalName].add(codePoint);
		}
	}

	return map;
};

export default parseLineBreak;

