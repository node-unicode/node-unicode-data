'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('./scripts/utils.js');
const parsers = require('./scripts/parse-blocks-scripts-properties.js');
parsers.parseCategories = require('./scripts/parse-categories.js');
parsers.parseCaseFolding = require('./scripts/parse-case-folding.js');
parsers.parseScriptExtensions = require('./scripts/parse-script-extensions.js');
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
			if (/^Bidi_/.test(category)) {
				return 'bidi-classes';
			}
			if (/^(?:Any|ASCII|Assigned)$/.test(category)) {
				return 'properties';
			}
			return 'categories';
		}
	}));
	console.log('Parsing Unicode v%s scripts…', version);
	const scriptsMap = parsers.parseScripts(version)
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': scriptsMap,
		'type': 'scripts'
	}));
	console.log('Parsing Unicode v%s scripts extensions…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseScriptExtensions(version, scriptsMap),
		'type': 'script-extensions'
	}));
	console.log('Parsing Unicode v%s properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseProperties(version),
		'type': 'properties'
	}));
	console.log('Parsing Unicode v%s derived core properties…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseDerivedCoreProperties(version),
		'type': 'properties'
	}));
	console.log('Parsing Unicode v%s case folding…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseCaseFolding(version),
		'type': 'case-folding'
	}));
	console.log('Parsing Unicode v%s blocks…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseBlocks(version),
		'type': 'blocks'
	}));
	console.log('Parsing Unicode v%s bidi mirroring…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseMirroring(version),
		'type': 'bidi-mirroring'
	}));
	console.log('Parsing Unicode v%s bidi brackets…', version);
	extend(dirMap, utils.writeFiles({
		'version': version,
		'map': parsers.parseBrackets(version),
		'type': 'bidi-brackets'
	}));
	fs.writeFileSync(
		path.resolve(__dirname, 'output', 'unicode-' + version, 'README.md'),
		compileReadMe({
			'version': version,
			'dirs': dirMap,
			'regenerateExample': '<%= set.toString() %>'
		})
	);
	fs.writeFileSync(
		path.resolve(__dirname, 'output', 'unicode-' + version, 'index.js'),
		compileIndex({ 'version': version, 'data': jsesc(dirMap) })
	);
	fs.writeFileSync(
		path.resolve(__dirname, 'output', 'unicode-' + version, 'package.json'),
		compilePackage({ 'version': version })
	);
	[
		'.gitattributes',
		'.gitignore'
	].forEach(function(file) {
		cp.sync(
			path.resolve(staticPath, file),
			path.resolve(__dirname, 'output', 'unicode-' + version, file)
		);
	});
	return dirMap;
};

module.exports = generateData;
