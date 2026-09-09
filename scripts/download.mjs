import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import resources from '../data/resources.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PARALLEL_REQUEST_LIMIT = 5;

const download = async (url, version, type) => {
	const res = await fetch(url);
	const file = path.resolve(
		__dirname,
		'..', 'data', version + '-' + type + '.txt'
	);
	console.log(' ', url, '→', path.basename(file));
	if (!res.ok) {
		throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
	}
	await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
};

const parallelLimit = async (tasks, limit) => {
	const results = new Array(tasks.length);
	const iterator = tasks.entries();

	const worker = async () => {
		for (const [index, task] of iterator) {
			results[index] = await task();
		}
	};

	const workers = new Array(limit).fill(null).map(() => worker());
	await Promise.all(workers);
	return results;
};

const tasks = [];
const addDownloadTask = (url, version, type) => tasks.push(() => download(url, version, type));

const guardedDownload = () => parallelLimit(tasks, PARALLEL_REQUEST_LIMIT);

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
	'indic-positional-category',
	'indic-syllabic-category',
	'line-break',
	'grapheme-cluster-break',
	'word-break',
	'sentence-break',
	'vertical-orientation',
	'arabic-shaping',
	'emoji',
	'emoji-sequences',
	'emoji-test',
	'emoji-zwj-sequences',
];

for (const resource of resources) {
	const version = resource.version;
	addDownloadTask(resource.main, version, 'database');
	for (const type of TYPES) {
		if (resource[type]) {
			addDownloadTask(resource[type], version, type);
		}
	}
}

await guardedDownload();
