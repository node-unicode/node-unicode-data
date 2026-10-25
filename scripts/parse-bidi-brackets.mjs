import regenerate from 'regenerate';
import utils from './utils.mjs';

const bidiBracketMap = new Map([
	['o', 'Open'],
	['c', 'Close'],
	['n', 'None'],
]);

const parseBidiBrackets = async (version) => {
	const map = {
		Open: regenerate(),
		Close: regenerate(),
		None: regenerate().addRange(0, 0x10ffff),
	};
	const source = utils.readDataFile(version, 'bidi-brackets');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	for (const line of lines) {
		const record = line.split('#')[0].trim();
		if (!record) {
			continue;
		}
		const data = record.split(';').map((field) => field.trim());
		const charRange = data[0].replace('..', '-').trim();
		let item = data[2];
		item = bidiBracketMap.get(item);
		const rangeParts = charRange.split('-');
		if (rangeParts.length === 2) {
			const [from, to] = [
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16),
			];
			map['None'].removeRange(from, to);
			map[item].addRange(from, to);
		} else {
			const codePoint = parseInt(charRange, 16);
			map['None'].remove(codePoint);
			map[item].add(codePoint);
		}
	}

	return map;
};

export default parseBidiBrackets;
