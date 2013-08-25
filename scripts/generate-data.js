var resources = require('../data/resources.js');
var generateData = require('../index.js');
var utils = require('../scripts/utils.js');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var templatePath = path.resolve(__dirname, '..', 'templates');
var compileReadMe = _.template(fs.readFileSync(
	path.resolve(templatePath, 'README.md'),
	'utf-8')
);
var compilePackage = _.template(fs.readFileSync(
	path.resolve(templatePath, 'package.json'),
	'utf-8')
);
var compileIndex = _.template(fs.readFileSync(
	path.resolve(templatePath, 'index.js'),
	'utf-8')
);

// Generate the data for every available Unicode version
resources.forEach(function(resource) {
	var version = resource.version;
	var dirs = generateData(version);
	fs.writeFileSync(
		path.resolve(__dirname, '..', version, 'README.md'),
		compileReadMe({ 'version': version, 'dirs': dirs })
	);
	fs.writeFileSync(
		path.resolve(__dirname, '..', version, 'index.js'),
		compileIndex({ 'version': version })
	);
	fs.writeFileSync(
		path.resolve(__dirname, '..', version, 'package.json'),
		compilePackage({ 'version': version })
	);
});
