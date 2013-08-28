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

// -----------------------------------------------------------------------------

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var i;

var pad = function(number) {
	return ('00' + String(number)).slice(-2);
};

var getTime = function() {
	var currentdate = new Date();
	return pad(currentdate.getHours()) + ':' +
		pad(currentdate.getMinutes()) + ':' +
		pad(currentdate.getSeconds());
};

var complicatedWorkThatTakesTime = function(resource, callback) {

	var version;
	var dirs;

	if (resource.length) {

		version = resource[0].version;
		console.log('[%s] Worker %d \u2192 Unicode v%s',
			getTime(), cluster.worker.id, version);

		dirs = generateData(version);

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

		complicatedWorkThatTakesTime(
			resource.slice(1),
			callback
		);

	} else {
		callback();
	}
};

if (cluster.isMaster) {

	for (i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('online', function(worker) {

		var size = Math.round(resources.length / numCPUs);
		var x = worker.id - 1;

		// divide work
		if (worker.id === 1) { // first worker
			worker.send(resources.slice(0, worker.id * size));
		} else if (worker.id < numCPUs) { // other workers, except the last one
			worker.send(resources.slice(x * size, worker.id * size));
		} else { // last worker
			worker.send(resources.slice(x * size, resources.length));
		}

	});

	cluster.on('exit', function(worker) {
		if (worker.suicide) {
			console.log('[%s] Worker %d is done!', getTime(), worker.id);
		}
	});

} else {

	process.on('message', function(message) {
		complicatedWorkThatTakesTime(message, function() {
			cluster.worker.kill();
		});
	});

}
