import utils from './utils.mjs';

const parseEmojiSequencesWithId = async ({ version, id }) => {
	const source = await utils.readDataFile(version, id);
	if (!source) {
		return;
	}
	const propertyMap = new Map();
	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data = line.trim().split('; ');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const property = data[1].split('#')[0].trim();
		if (rangeParts.length === 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach((codePoint) => {
				const symbol = String.fromCodePoint(codePoint);
				if (propertyMap.has(property)) {
					propertyMap.get(property).add(symbol);
				} else {
					propertyMap.set(property, new Set([symbol]));
				}
			});
		} else {
			const codePoints = data[0].trim().split(' ').map((hex) => {
				return parseInt(hex, 16);
			});
			const sequence = String.fromCodePoint(...codePoints);
			if (propertyMap.has(property)) {
				propertyMap.get(property).add(sequence);
			} else {
				propertyMap.set(property, new Set([sequence]));
			}
		}
	}
	const plainObject = {};
	for (const [property, codePoints] of propertyMap) {
		plainObject[property] = [...codePoints].sort((a, b) => a - b);
	}
	return plainObject;
};

const parseEmojiTestData = async ({ version }) => {
	const source = await utils.readDataFile(version, 'emoji-test');
	if (!source) {
		return;
	}
	const sequences = [];
	const lines = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data = line.trim().split('; ');
		const codePoints = data[0].trim().split(' ').map((hex) => {
			return parseInt(hex, 16);
		});
		const sequence = String.fromCodePoint(...codePoints);
		sequences.push(sequence);
	}
	const plainObject = {
		'Emoji_Test': sequences.sort((a, b) => a - b),
	};
	return plainObject;
};

const parseEmojiSequences = async (version) => {
	const [emojiSeq, emojiZwjSeq, emojiTest] = await Promise.all([
		parseEmojiSequencesWithId({ version, id: 'emoji-sequences' }),
		parseEmojiSequencesWithId({ version, id: 'emoji-zwj-sequences' }),
		parseEmojiTestData({ version }),
	]);
	const props = {
		...emojiSeq,
		...emojiZwjSeq,
		...emojiTest,
	};
	// Older Unicode versions that lack RGI_Emoji_* properties should not
	// get RGI_Emoji either.
	if (props.RGI_Emoji_ZWJ_Sequence) {
		// https://unicode.org/reports/tr51/#def_rgi_set
		const RGI_Emoji = [
			...props.Basic_Emoji,
			...props.Emoji_Keycap_Sequence,
			...props.RGI_Emoji_Modifier_Sequence,
			...props.RGI_Emoji_Flag_Sequence,
			...props.RGI_Emoji_Tag_Sequence,
			...props.RGI_Emoji_ZWJ_Sequence,
		].sort();
		const result = {
			RGI_Emoji,
			...props,
		};
		return result;
	}
	return props;
};

export default parseEmojiSequences;

