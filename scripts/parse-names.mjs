import utils from './utils.mjs';
import regenerate from 'regenerate';

// Short jamo names used by the Hangul Syllable Name Generation algorithm.
const leading = [
	'G',
	'GG',
	'N',
	'D',
	'DD',
	'R',
	'M',
	'B',
	'BB',
	'S',
	'SS',
	'',
	'J',
	'JJ',
	'C',
	'K',
	'T',
	'P',
	'H',
];
const vowels = [
	'A',
	'AE',
	'YA',
	'YAE',
	'EO',
	'E',
	'YEO',
	'YE',
	'O',
	'WA',
	'WAE',
	'OE',
	'YO',
	'U',
	'WEO',
	'WE',
	'WI',
	'YU',
	'EU',
	'YI',
	'I',
];
const trailing = [
	'',
	'G',
	'GG',
	'GS',
	'N',
	'NJ',
	'NH',
	'D',
	'L',
	'LG',
	'LM',
	'LB',
	'LS',
	'LT',
	'LP',
	'LH',
	'M',
	'B',
	'BS',
	'S',
	'SS',
	'NG',
	'J',
	'C',
	'K',
	'T',
	'P',
	'H',
];

const getRangeName = (rangeName, codePoint) => {
	if (rangeName === 'Hangul Syllable') {
		const index = codePoint - 0xac00;
		return `HANGUL SYLLABLE ${leading[Math.floor(index / 588)]}${vowels[Math.floor(index / 28) % 21]}${trailing[index % 28]}`;
	}
	let prefix;
	if (/^CJK Ideograph(?: Extension [A-Z])?$/.test(rangeName)) {
		prefix = 'CJK UNIFIED IDEOGRAPH';
	} else if (rangeName === 'CJK Compatibility Ideograph') {
		prefix = 'CJK COMPATIBILITY IDEOGRAPH';
	} else if (/^Tangut Ideograph(?: Supplement)?$/.test(rangeName)) {
		prefix = 'TANGUT IDEOGRAPH';
	} else if (rangeName === 'Jurchen Character') {
		prefix = 'JURCHEN CHARACTER';
	} else if (rangeName === 'Seal Character') {
		prefix = 'SMALL SEAL CHARACTER';
	} else {
		throw new Error(`Unknown algorithmic name range: ${rangeName}.`);
	}
	return `${prefix}-${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
};

const parseNames = async (version) => {
	const map = {};
	const source = utils.readDataFile(version, 'database');
	if (!source) {
		return;
	}
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
		// Unicode 4.0.0 has trailing spaces after the names of U+02AE and U+0615.
		const name = data[1].trim();
		if (flag) {
			if (/<.+, Last>/.test(name)) {
				flag = false;
				const rangeName = /<(.+), Last>/.exec(name)[1];
				// Surrogates and private-use code points have no formal Name.
				if (data[2] !== 'Cs' && data[2] !== 'Co') {
					for (let cp = first; cp <= codePoint; cp++) {
						const derivedName = getRangeName(rangeName, cp);
						map[derivedName] ??= regenerate();
						map[derivedName].add(cp);
					}
				}
			} else {
				throw new Error('Database exception');
			}
		} else {
			if (/<.+, First>/.test(name)) {
				flag = true;
				first = codePoint;
			} else if (!name.startsWith('<')) {
				map[name] ??= regenerate();
				map[name].add(codePoint);
			}
		}
	}

	return map;
};

export default parseNames;
