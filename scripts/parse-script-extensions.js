'use strict';

const utils = require('./utils.js');

// Temporarily hardcoded. Remove this as soon as #23 is fixed.
// https://github.com/mathiasbynens/node-unicode-data/issues/24
const scriptAliases = {
	'Aghb': 'Caucasian_Albanian',
	'Ahom': 'Ahom',
	'Arab': 'Arabic',
	'Armi': 'Imperial_Aramaic',
	'Armn': 'Armenian',
	'Avst': 'Avestan',
	'Bali': 'Balinese',
	'Bamu': 'Bamum',
	'Bass': 'Bassa_Vah',
	'Batk': 'Batak',
	'Beng': 'Bengali',
	'Bopo': 'Bopomofo',
	'Brah': 'Brahmi',
	'Brai': 'Braille',
	'Bugi': 'Buginese',
	'Buhd': 'Buhid',
	'Cakm': 'Chakma',
	'Cans': 'Canadian_Aboriginal',
	'Cari': 'Carian',
	'Cham': 'Cham',
	'Cher': 'Cherokee',
	'Copt': 'Coptic',
	'Cprt': 'Cypriot',
	'Cyrl': 'Cyrillic',
	'Deva': 'Devanagari',
	'Dsrt': 'Deseret',
	'Dupl': 'Duployan',
	'Egyp': 'Egyptian_Hieroglyphs',
	'Elba': 'Elbasan',
	'Ethi': 'Ethiopic',
	'Geor': 'Georgian',
	'Glag': 'Glagolitic',
	'Goth': 'Gothic',
	'Gran': 'Grantha',
	'Grek': 'Greek',
	'Gujr': 'Gujarati',
	'Guru': 'Gurmukhi',
	'Hang': 'Hangul',
	'Hani': 'Han',
	'Hano': 'Hanunoo',
	'Hatr': 'Hatran',
	'Hebr': 'Hebrew',
	'Hira': 'Hiragana',
	'Hluw': 'Anatolian_Hieroglyphs',
	'Hmng': 'Pahawh_Hmong',
	'Hrkt': 'Katakana_Or_Hiragana',
	'Hung': 'Old_Hungarian',
	'Ital': 'Old_Italic',
	'Java': 'Javanese',
	'Kali': 'Kayah_Li',
	'Kana': 'Katakana',
	'Khar': 'Kharoshthi',
	'Khmr': 'Khmer',
	'Khoj': 'Khojki',
	'Knda': 'Kannada',
	'Kthi': 'Kaithi',
	'Lana': 'Tai_Tham',
	'Laoo': 'Lao',
	'Latn': 'Latin',
	'Lepc': 'Lepcha',
	'Limb': 'Limbu',
	'Lina': 'Linear_A',
	'Linb': 'Linear_B',
	'Lisu': 'Lisu',
	'Lyci': 'Lycian',
	'Lydi': 'Lydian',
	'Mahj': 'Mahajani',
	'Mand': 'Mandaic',
	'Mani': 'Manichaean',
	'Mend': 'Mende_Kikakui',
	'Merc': 'Meroitic_Cursive',
	'Mero': 'Meroitic_Hieroglyphs',
	'Mlym': 'Malayalam',
	'Modi': 'Modi',
	'Mong': 'Mongolian',
	'Mroo': 'Mro',
	'Mtei': 'Meetei_Mayek',
	'Mult': 'Multani',
	'Mymr': 'Myanmar',
	'Narb': 'Old_North_Arabian',
	'Nbat': 'Nabataean',
	'Nkoo': 'Nko',
	'Ogam': 'Ogham',
	'Olck': 'Ol_Chiki',
	'Orkh': 'Old_Turkic',
	'Orya': 'Oriya',
	'Osma': 'Osmanya',
	'Palm': 'Palmyrene',
	'Pauc': 'Pau_Cin_Hau',
	'Perm': 'Old_Permic',
	'Phag': 'Phags_Pa',
	'Phli': 'Inscriptional_Pahlavi',
	'Phlp': 'Psalter_Pahlavi',
	'Phnx': 'Phoenician',
	'Plrd': 'Miao',
	'Prti': 'Inscriptional_Parthian',
	'Qaac': 'Coptic',
	'Qaai': 'Inherited',
	'Rjng': 'Rejang',
	'Runr': 'Runic',
	'Samr': 'Samaritan',
	'Sarb': 'Old_South_Arabian',
	'Saur': 'Saurashtra',
	'Sgnw': 'SignWriting',
	'Shaw': 'Shavian',
	'Shrd': 'Sharada',
	'Sidd': 'Siddham',
	'Sind': 'Khudawadi',
	'Sinh': 'Sinhala',
	'Sora': 'Sora_Sompeng',
	'Sund': 'Sundanese',
	'Sylo': 'Syloti_Nagri',
	'Syrc': 'Syriac',
	'Tagb': 'Tagbanwa',
	'Takr': 'Takri',
	'Tale': 'Tai_Le',
	'Talu': 'New_Tai_Lue',
	'Taml': 'Tamil',
	'Tavt': 'Tai_Viet',
	'Telu': 'Telugu',
	'Tfng': 'Tifinagh',
	'Tglg': 'Tagalog',
	'Thaa': 'Thaana',
	'Thai': 'Thai',
	'Tibt': 'Tibetan',
	'Tirh': 'Tirhuta',
	'Ugar': 'Ugaritic',
	'Vaii': 'Vai',
	'Wara': 'Warang_Citi',
	'Xpeo': 'Old_Persian',
	'Xsux': 'Cuneiform',
	'Yiii': 'Yi',
	'Zinh': 'Inherited',
	'Zyyy': 'Common',
	'Zzzz': 'Unknown'
};

const findCanonicalName = function(shortName) {
	// Expand `script` to its canonical name.
	return scriptAliases[shortName];
};

const parseScriptExtensions = function(version, scriptsMap) {
	// Old Unicode versions lack scripts data. Return early in such cases.
	if (!scriptsMap) {
		return;
	}
	// Turn the array of code points for each script into a set, so we can more
	// easily add/remove from them.
	const knownScriptNames = Object.keys(scriptsMap);
	for (const script of knownScriptNames) {
		scriptsMap[script] = new Set(scriptsMap[script]);
	}
	const source = utils.readDataFile(version, 'script-extensions');
	if (!source) {
		return;
	}
	const lines = source.split('\n');
	lines.forEach(function(line) {
		if (!line || /^#/.test(line)) {
			return;
		}
		const data = line.trim().split(';');
		const charRange = data[0].replace('..', '-').trim();
		const rangeParts = charRange.split('-');
		const scripts = data[1].split('#')[0].trim().split(' ');
		if (rangeParts.length == 2) {
			utils.range(
				parseInt(rangeParts[0], 16),
				parseInt(rangeParts[1], 16)
			).forEach(function(codePoint) {
				scripts.forEach(function(script) {
					const canonicalName = findCanonicalName(script);
					scriptsMap.Common.delete(codePoint);
					scriptsMap[canonicalName].add(codePoint);
				});
			});
		} else {
			scripts.forEach(function(script) {
				const canonicalName = findCanonicalName(script);
				const codePoint = parseInt(charRange, 16);
				scriptsMap.Common.delete(codePoint);
				scriptsMap[canonicalName].add(codePoint);
			});
		}
	});
	// Convert the sets back into arrays.
	for (const script of knownScriptNames) {
		scriptsMap[script] = [...scriptsMap[script]].sort();
	}
	return scriptsMap;
};

module.exports = parseScriptExtensions;
