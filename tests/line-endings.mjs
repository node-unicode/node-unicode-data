import fs from 'node:fs';
import { test } from 'node:test';
import resources from '../data/resources.mjs';
import * as properties from '../scripts/parse-blocks-scripts-properties.mjs';

const parsers = Object.entries(properties);
for (const file of fs.readdirSync(new URL('../scripts/', import.meta.url))) {
	if (
		!/^parse-.*\.mjs$/.test(file) ||
		file === 'parse-blocks-scripts-properties.mjs'
	) {
		continue;
	}
	const { default: parse } = await import(`../scripts/${file}`);
	parsers.push([file, parse]);
}

test('Every parser preserves results with CRLF input', async (t) => {
	const read = fs.readFileSync;
	let useCRLF = false;
	t.mock.method(fs, 'readFileSync', (...args) => {
		const result = read(...args);
		return useCRLF && typeof result === 'string'
			? result.replace(/\r?\n/g, '\r\n')
			: result;
	});
	for (const { version } of resources) {
		for (const [name, parse] of parsers) {
			const kinds =
				name === 'parse-grapheme-word-sentence-break.mjs'
					? ['grapheme-cluster-break', 'word-break', 'sentence-break']
					: [undefined];
			for (const kind of kinds) {
				const run = async () =>
					parse(
						version,
						name === 'parse-script-extensions.mjs'
							? await properties.parseScripts(version)
							: kind,
					);
				useCRLF = false;
				const expected = await run();
				useCRLF = true;
				t.assert.deepEqual(
					await run(),
					expected,
					`${version}: ${name} ${kind ?? ''}`,
				);
			}
		}
	}
});
