import regenerate from 'regenerate';
import utils from './utils.mjs';

const parseIndicConjunctBreak = async (version) => {
	const source = utils.readDataFile(version, 'derived-core-properties');
	if (!source) {
		return;
	}
	const map = { None: regenerate().addRange(0, 0x10ffff) };
	let found = false;
	for (const line of source.split('\n')) {
		const fields = line
			.split('#')[0]
			.trim()
			.split(';')
			.map((s) => s.trim());
		if (fields[1] !== 'InCB') {
			continue;
		}
		found = true;
		const [start, end = start] = fields[0]
			.split('..')
			.map((s) => parseInt(s, 16));
		const value = fields[2];
		map[value] ??= regenerate();
		map.None.removeRange(start, end);
		map[value].addRange(start, end);
	}
	return found ? map : undefined;
};

export default parseIndicConjunctBreak;
