var fs = require('fs');
var path = require('path');
var request = require('request');
var resources = require('../data/resources.js');

var download = function(url, version, type) {
	file = path.resolve(
		__dirname,
		'..', 'data', version + '-' + type + '.txt'
	);
	request(url).pipe(fs.createWriteStream(file));
};

console.log('Downloading resources…');

resources.forEach(function(resource) {
	var version = resource.version;
	download(resource.main, version, 'database');
	if (resource.scripts) {
		download(resource.scripts, version, 'scripts');
		download(resource.blocks, version, 'blocks');
		download(resource.properties, version, 'properties');
	}
});
