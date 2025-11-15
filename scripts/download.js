'use strict';

const fs = require('fs');
const guard = require('when/guard');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const resources = require('../data/resources.js');

const PARALLEL_REQUEST_LIMIT = 5;

const download = async function(url, version, type) {
	const res = await fetch(url);
	const file = path.resolve(
		__dirname,
		'..', 'data', version + '-' + type + '.txt'
	);
	console.log(' ', url, '→', path.basename(file));
	//console.log(`curl ${url} > data/${path.basename(file)};`);
	return finished(
		Readable.fromWeb(res.body).pipe(fs.createWriteStream(file))
	);
};
// Limit maximum parallelism to something reasonable
const guardedDownload = guard(guard.n(PARALLEL_REQUEST_LIMIT), download);

console.log('Downloading resources…');

const TYPES = [
	'scripts',
	'script-extensions',
	'blocks',
	'properties',
	'name-aliases',
	'derived-binary-properties',
	'derived-core-properties',
	'derived-general-category',
	'derived-normalization-properties',
	'composition-exclusions',
	'case-folding',
	'special-casing',
	'bidi-mirroring',
	'bidi-brackets',
	'line-break',
	'grapheme-cluster-break',
	'word-break',
	'sentence-break',
	'emoji',
	'emoji-sequences',
	'emoji-test',
	'emoji-zwj-sequences',
];

for (const resource of resources) {
	const version = resource.version;
	guardedDownload(resource.main, version, 'database');
	for (const type of TYPES) {
		if (resource[type]) {
			guardedDownload(resource[type], version, type);
		}
	}
}
