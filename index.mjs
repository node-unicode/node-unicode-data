import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import jsesc from 'jsesc';
import template from 'lodash.template';

import * as parsers from './scripts/parse-blocks-scripts-properties.mjs';
import parseBidiBrackets from './scripts/parse-bidi-brackets.mjs';
import parseCaseFolding from './scripts/parse-case-folding.mjs';
import parseBidiClass from './scripts/parse-bidi-class.mjs';
import parseCompositionExclusions from './scripts/parse-composition-exclusions.mjs';
import parseIndicPositionalCategory from './scripts/parse-indic-positional-category.mjs';
import parseIndicSyllabicCategory from './scripts/parse-indic-syllabic-category.mjs';
import parseLineBreak from './scripts/parse-line-break.mjs';
import parseScriptExtensions from './scripts/parse-script-extensions.mjs';
import parseSpecialCasing from './scripts/parse-special-casing.mjs';
import parseSimpleCaseMapping from './scripts/parse-simple-case-mapping.mjs';
import parseGraphemeWordSentenceBreak from './scripts/parse-grapheme-word-sentence-break.mjs';
import parseVerticalOrientation from './scripts/parse-vertical-orientation.mjs';
import parseArabicShaping from './scripts/parse-arabic-shaping.mjs';
import parseEmoji from './scripts/parse-emoji.mjs';
import parseEmojiSequences from './scripts/parse-emoji-sequences.mjs';
import parseNames from './scripts/parse-names.mjs';
import parseNameAliases from './scripts/parse-name-aliases.mjs';
import utils from './scripts/utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templatePath = path.resolve(__dirname, 'templates');
const staticPath = path.resolve(__dirname, 'static');
const compileReadMe = template(fs.readFileSync(
	path.resolve(templatePath, 'README.md'),
	'utf-8'
));
const compilePackage = template(fs.readFileSync(
	path.resolve(templatePath, 'package.json'),
	'utf-8'
));
const compileIndex = template('export default <%= data %>;\n');

const generateData = async (version) => {
	const dirMap = {};
	console.log('Generating data for Unicode v%s…', version);
	console.log('Parsing Unicode v%s categories…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parsers.parseDerivedGeneralCategory(version),
		'type': (category) => {
			if (/^(?:Any|ASCII|Assigned)$/.test(category)) {
				return 'Binary_Property';
			}
			return 'General_Category';
		},
	}));
	console.log('Parsing Unicode v%s `Bidi_Class`', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseBidiClass(version),
		'type': 'Bidi_Class',
	}));
	console.log('Parsing Unicode v%s `Script`…', version);
	const scriptsMap = await parsers.parseScripts(version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': scriptsMap,
		'type': 'Script',
	}));
	console.log('Parsing Unicode v%s `Script_Extensions`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseScriptExtensions(version, scriptsMap),
		'type': 'Script_Extensions',
	}));
	console.log('Parsing Unicode v%s properties…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parsers.parseProperties(version),
		'type': 'Binary_Property',
	}));
	console.log('Parsing Unicode v%s derived core properties…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parsers.parseDerivedCoreProperties(version),
		'type': 'Binary_Property',
	}));
	console.log('Parsing Unicode v%s derived binary properties…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parsers.parseDerivedBinaryProperties(version),
		'type': 'Binary_Property',
	}));
	console.log('Parsing Unicode v%s derived normalization properties…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parsers.parseDerivedNormalizationProperties(version),
		'type': 'Binary_Property',
	}));
	console.log('Parsing Unicode v%s composition exclusions…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseCompositionExclusions(version),
		'type': 'Binary_Property',
	}));
	console.log('Parsing Unicode v%s `Case_Folding`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseCaseFolding(version),
		'type': 'Case_Folding',
	}));
	console.log('Parsing Unicode v%s `Block`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parsers.parseBlocks(version),
		'type': 'Block',
	}));
	console.log('Parsing Unicode v%s `Bidi_Mirroring_Glyph`', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parsers.parseMirroring(version),
		'type': 'Bidi_Mirroring_Glyph',
	}));
	console.log('Parsing Unicode v%s bidi brackets…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseBidiBrackets(version),
		'type': 'Bidi_Paired_Bracket_Type',
	}));
	{
		const InPCName = +version.split('.')[0] >= 8 ? 'Indic_Positional_Category' : 'Indic_Matra_Category';
		console.log('Parsing Unicode v%s `%s`…', version, InPCName);
		utils.extend(dirMap, utils.writeFiles({
			'version': version,
			'map': await parseIndicPositionalCategory(version),
			'type': InPCName,
		}));
	}
	console.log('Parsing Unicode v%s `Indic_Syllabic_Category`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseIndicSyllabicCategory(version),
		'type': 'Indic_Syllabic_Category',
	}));
	console.log('Parsing Unicode v%s `Line_Break`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseLineBreak(version),
		'type': 'Line_Break',
	}));
	console.log('Parsing Unicode v%s `Grapheme_Cluster_Break`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseGraphemeWordSentenceBreak(version, 'grapheme-cluster-break'),
		'type': 'Grapheme_Cluster_Break',
	}));
	console.log('Parsing Unicode v%s `Word_Break`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseGraphemeWordSentenceBreak(version, 'word-break'),
		'type': 'Word_Break',
	}));
	console.log('Parsing Unicode v%s `Sentence_Break`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseGraphemeWordSentenceBreak(version, 'sentence-break'),
		'type': 'Sentence_Break',
	}));
	console.log('Parsing Unicode v%s `Vertical_Orientation`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseVerticalOrientation(version),
		'type': 'Vertical_Orientation',
	}));
	console.log('Parsing Unicode v%s `Joining_Type`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseArabicShaping(version),
		'type': 'Joining_Type',
	}));
	console.log('Parsing Unicode v%s binary emoji properties…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseEmoji(version),
		'type': 'Binary_Property',
	}));
	console.log('Parsing Unicode v%s emoji sequence properties…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseEmojiSequences(version),
		'type': 'Sequence_Property',
	}));
	console.log('Parsing Unicode v%s `Names`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseNames(version),
		'type': 'Names',
	}));
	console.log('Parsing Unicode v%s Aliases…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseNameAliases(version),
		'type': 'Names',
		'subType': 'name-aliases',
	}));
	console.log('Parsing Unicode v%s simple case mappings…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseSimpleCaseMapping(version),
		'type': 'Simple_Case_Mapping',
	}));
	console.log('Parsing Unicode v%s `Special_Casing`…', version);
	utils.extend(dirMap, utils.writeFiles({
		'version': version,
		'map': await parseSpecialCasing(version),
		'type': 'Special_Casing',
	}));
	// Sort array values.
	for (const property of Object.keys(dirMap)) {
		if (Array.isArray(dirMap[property])) {
			dirMap[property] = dirMap[property].sort();
		}
	}
	fs.writeFileSync(
		path.resolve(__dirname, `output/unicode-${version}/README.md`),
		compileReadMe({
			'version': version,
			'dirs': dirMap,
			'regenerateExample': '<%= set.toString() %>',
		})
	);
	fs.writeFileSync(
		path.resolve(__dirname, `output/unicode-${version}/index.mjs`),
		compileIndex({ 'version': version, 'data': jsesc(dirMap) })
	);
	fs.writeFileSync(
		path.resolve(__dirname, `output/unicode-${version}/index.d.mts`),
		Object.keys(dirMap)
			.map((key) => `export const ${key}: string[];`)
			.join('\n')
	);
	fs.writeFileSync(
		path.resolve(__dirname, `output/unicode-${version}/package.json`),
		compilePackage({ 'version': version })
	);
	fs.mkdirSync(
		path.resolve(__dirname, `output/unicode-${version}/.github/workflows`),
		{
			recursive: true,
		}
	);
	const staticFiles = [
		'.github/workflows/publish-on-tag.yml',
		'.gitattributes',
		'.gitignore',
		'.npmignore',
		'decode-property-map.mjs',
		'decode-property-map.d.mts',
		'decode-ranges.mjs',
		'decode-ranges.d.mts',
	];
	for (const file of staticFiles) {
		fs.copyFileSync(
			path.resolve(staticPath, file),
			path.resolve(__dirname, `output/unicode-${version}/${file}`)
		);
	}
	return dirMap;
};

export default generateData;

