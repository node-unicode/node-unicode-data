'use strict';

const fs = require('fs');
const guard = require('when/guard');
const path = require('path');
const request = require('request');
const resources = require('../data/resources.js');
const when = require('when');

const PARALLEL_REQUEST_LIMIT = 5;

const download = function(url, version, type) {
	const deferred = when.defer();
	const file = path.resolve(
		__dirname,
		'..', 'data', version + '-' + type + '.txt'
	);
	console.log(' ', url, '→', path.basename(file));
	request(url).on('end', function() {
		return deferred.resolve();
	}).on('error', function(err) {
		return deferred.reject(err);
	}).pipe(fs.createWriteStream(file));
	return deferred.promise;
};
// Limit maximum parallelism to something reasonable
const guardedDownload = guard(guard.n(PARALLEL_REQUEST_LIMIT), download);

console.log('Downloading resources…');

resources.forEach(function(resource) {
	const version = resource.version;
	guardedDownload(resource.main, version, 'database');
	[
		'scripts',
		'script-extensions',
		'blocks',
		'properties',
		'derived-core-properties',
		'derived-normalization-properties',
		'case-folding',
		'bidi-mirroring',
		'bidi-brackets'
	].forEach(function(type) {
		if (resource[type]) {
			guardedDownload(resource[type], version, type);
		}
	});
});
