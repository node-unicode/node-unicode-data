'use strict';

const resources = require('../data/resources.js');
const generateData = require('../index.js');
const utils = require('../scripts/utils.js');

// -----------------------------------------------------------------------------

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const pad = function(number) {
	return ('00' + String(number)).slice(-2);
};

const getTime = function() {
	const currentdate = new Date();
	return pad(currentdate.getHours()) + ':' +
		pad(currentdate.getMinutes()) + ':' +
		pad(currentdate.getSeconds());
};

const complicatedWorkThatTakesTime = function(resource, callback) {

	if (resource.length) {

		const version = resource[0].version;
		console.log('[%s] Worker %d \u2192 Unicode v%s',
			getTime(), cluster.worker.id, version);

		generateData(version);

		complicatedWorkThatTakesTime(
			resource.slice(1),
			callback
		);

	} else {
		callback();
	}
};

if (cluster.isMaster) {

	for (let index = 0; index < numCPUs; index++) {
		cluster.fork();
	}

	cluster.on('online', function(worker) {

		const size = Math.round(resources.length / numCPUs);
		const x = worker.id - 1;

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
