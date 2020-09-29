'use strict';

const resources = require('../data/resources.js');

for (const resource of resources) {
	const version = resource.version;
	console.log(version);
}
