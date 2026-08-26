import cluster from 'node:cluster';
import os from 'node:os';
import resources from '../data/resources.mjs';
import generateData from '../index.mjs';

// -----------------------------------------------------------------------------

const numCPUs = os.cpus().length;

const pad = (number) => {
	return String(number).padStart(2, '0');
};

const getTime = () => {
	const currentdate = new Date();
	return pad(currentdate.getHours()) + ':' +
		pad(currentdate.getMinutes()) + ':' +
		pad(currentdate.getSeconds());
};

const complicatedWorkThatTakesTime = async (resource, callback) => {
	if (resource.length) {
		const version = resource[0].version;
		console.log('[%s] Worker %d \u2192 Unicode v%s',
			getTime(), cluster.worker.id, version);

		console.groupCollapsed();
		await generateData(version);
		console.groupEnd();

		await complicatedWorkThatTakesTime(
			resource.slice(1),
			callback
		);
	} else {
		callback();
	}
};

if (cluster.isPrimary) {
	const chunks = Array.from({ length: numCPUs }, () => []);
	resources.forEach((resource, index) => {
		chunks[index % numCPUs].push(resource);
	});

	for (let index = 0; index < numCPUs; index++) {
		const worker = cluster.fork();
		worker.on('message', (message) => {
			if (message?.type === 'ready') {
				const workerIndex = worker.id - 1;
				worker.send({
					type: 'work',
					resources: chunks[workerIndex] || [],
				});
			} else if (message?.type === 'error') {
				for (const id in cluster.workers) {
					cluster.workers[id].kill();
				}
				throw new Error(`Worker ${worker.id} encountered an error: ${message.message}`);
			}
		});
	}

	cluster.on('exit', (worker) => {
		if (worker.exitedAfterDisconnect) {
			console.log('[%s] Worker %d is done!', getTime(), worker.id);
		}
	});
} else {
	process.on('message', (message) => {
		if (message?.type === 'work') {
			complicatedWorkThatTakesTime(message.resources, () => {
				cluster.worker.kill();
			});
		}
	});

	process.on('uncaughtException', (error) => {
		console.error(error);
		process.send({
			type: 'error',
			message: error.message,
		});
	});

	process.on('unhandledRejection', (error) => {
		console.error(error);
		process.send({
			type: 'error',
			message: error.message || error,
		});
	});

	process.send({
		type: 'ready',
	});
}


