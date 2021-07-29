'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('./scripts/utils.js');
const parsers = require('./scripts/parse-blocks-scripts-properties.js');
parsers.parseBidiBrackets = require('./scripts/parse-bidi-brackets.js');
parsers.parseCaseFolding = require('./scripts/parse-case-folding.js');
parsers.parseCategories = require('./scripts/parse-categories.js');
parsers.parseCompositionExclusions = require('./scripts/parse-composition-exclusions.js');
parsers.parseLineBreak = require('./scripts/parse-line-break.js');
parsers.parseScriptExtensions = require('./scripts/parse-script-extensions.js');
parsers.parseWordBreak = require('./scripts/parse-word-break.js');
parsers.parseEmoji = require('./scripts/parse-emoji.js');
parsers.parseEmojiSequences = require('./scripts/parse-emoji-sequences.js');
parsers.parseNames = require('./scripts/parse-names.js');
const extend = utils.extend;
const cp = require('cp');
const jsesc = require('jsesc');
const template = require('lodash.template');

const templatePath = path.resolve(__dirname, 'templates');
const staticPath = path.resolve(__dirname, 'static');
const compileReadMe = template(fs.readFileSync(
	path.resolve(templatePath, 'README.md'),
	'utf-8')
);
const compilePackage = template(fs.readFileSync(
	path.resolve(templatePath, 'package.json'),
	'utf-8')
);
const compileIndex = template('module.exports=<%= data %>');

const generateData = function(version) {
	const dirMap = {};
	console.log('Generating data for Unicode v%s…', version);
	console.log('Parsing Unicode v%s categories…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseCategories(version),
		'type': function(category) {
			if (/^(?:Any|ASCII|Assigned|Bidi_Mirrored)$/.test(category)) {
				return 'Binary_Property';
			}
			if (/^Bidi_/.test(category)) {
				return 'Bidi_Class';
			}
			return 'General_Category';
		}
	}));
	console.log('Parsing Unicode v%s `Script`…', version);
	const scriptsMap = parsers.parseScripts(version)
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': scriptsMap,
		'type': 'Script'
	}));
	console.log('Parsing Unicode v%s `Script_Extensions`…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseScriptExtensions(version, scriptsMap),
		'type': 'Script_Extensions'
	}));
	console.log('Parsing Unicode v%s properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseProperties(version),
		'type': 'Binary_Property'
	}));
	console.log('Parsing Unicode v%s derived core properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseDerivedCoreProperties(version),
		'type': 'Binary_Property'
	}));
	console.log('Parsing Unicode v%s derived normalization properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseDerivedNormalizationProperties(version),
		'type': 'Binary_Property'
	}));
	console.log('Parsing Unicode v%s composition exclusions…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseCompositionExclusions(version),
		'type': 'Binary_Property'
	}));
	console.log('Parsing Unicode v%s `Case_Folding`…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseCaseFolding(version),
		'type': 'Case_Folding'
	}));
	console.log('Parsing Unicode v%s `Block`…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseBlocks(version),
		'type': 'Block'
	}));
	console.log('Parsing Unicode v%s `Bidi_Mirroring_Glyph`', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseMirroring(version),
		'type': 'Bidi_Mirroring_Glyph'
	}));
	console.log('Parsing Unicode v%s bidi brackets…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseBidiBrackets(version),
		'type': 'Bidi_Paired_Bracket_Type'
	}));
	console.log('Parsing Unicode v%s `Line_Break`…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseLineBreak(version),
		'type': 'Line_Break'
	}));
	console.log('Parsing Unicode v%s `Word_Break`…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseWordBreak(version),
		'type': 'Word_Break'
	}));
	console.log('Parsing Unicode v%s binary emoji properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseEmoji(version),
		'type': 'Binary_Property'
	}));
	console.log('Parsing Unicode v%s emoji sequence properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseEmojiSequences(version),
		'type': 'Sequence_Property'
	}));
	console.log('Parsing Unicode v%s `Names`…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseNames(version),
		'type': 'Names'
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
			'regenerateExample': '<%= set.toString() %>'
		})
	);
	fs.writeFileSync(
		path.resolve(__dirname, `output/unicode-${version}/index.js`),
		compileIndex({ 'version': version, 'data': jsesc(dirMap) })
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
	[
		'.github/workflows/publish-on-tag.yml',
		'.gitattributes',
		'.gitignore',
		'.npmignore',
		'decode-property-map.js',
		'decode-ranges.js',
	].forEach(function(file) {
		cp.sync(
			path.resolve(staticPath, file),
			path.resolve(__dirname, `output/unicode-${version}/${file}`)
		);
	});
	return dirMap;
};

module.exports = generateData;
