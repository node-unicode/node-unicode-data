'use strict';

const resources = require('../data/resources.js');
const generateData = require('../index.js');

// -----------------------------------------------------------------------------

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const pad = (number) => {
	return String(number).padStart(2, '0');
};

const getTime = () => {
	const currentdate = new Date();
	return pad(currentdate.getHours()) + ':' +
		pad(currentdate.getMinutes()) + ':' +
		pad(currentdate.getSeconds());
};

const complicatedWorkThatTakesTime = (resource, callback) => {

	if (resource.length) {

		const version = resource[0].version;
		console.log('[%s] Worker %d \u2192 Unicode v%s',
			getTime(), cluster.worker.id, version);

		console.groupCollapsed();
		generateData(version);
		console.groupEnd();

		complicatedWorkThatTakesTime(
			resource.slice(1),
			callback
		);

	} else {
		callback();
	}
};

if (cluster.isPrimary) {

	for (let index = 0; index < numCPUs; index++) {
		const worker = cluster.fork();
		worker.on('message', (error) => {
			for (const id in cluster.workers) {
				cluster.workers[id].kill();
			}
			throw new Error(`Worker ${worker.id} encountered an error: ${error}`);
		})
	}

	cluster.on('online', (worker) => {

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

	cluster.on('exit', (worker) => {
		if (worker.exitedAfterDisconnect) {
			console.log('[%s] Worker %d is done!', getTime(), worker.id);
		}
	});

} else {

	process.on('message', (message) => {
		complicatedWorkThatTakesTime(message, () => {
			cluster.worker.kill();
		});
	});

	process.on('uncaughtException', (error) => {
		console.error(error);
		process.send(error.message);
	});

	process.on('unhandledRejection', (error) => {
		console.error(error);
		process.send(error.message || error);
	});

}
