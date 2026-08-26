import utils from './utils.mjs';

const parseNameAliases = async (version) => {
	const map = {};
	const source = await utils.readDataFile(version, 'name-aliases');
	if (!source) {
		return;
	}
	const lines = source.split('\n');

	for (const line of lines) {
		const data = line.trim().split(';');
		const codePoint = parseInt(data[0], 16);
		const name = data[1];
		const type = data[2];

		if (!isNaN(codePoint)) {
			if (map[type] === undefined) {
				map[type] = {};
			}
			utils.append(map[type], codePoint, name);
		}
	}

	return map;
};

export default parseNameAliases;

