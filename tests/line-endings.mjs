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

const formats = [
	['CRLF', (source) => source.replace(/\r?\n/g, '\r\n')],
	[
		'whitespace-only lines and indented comments',
		(source) =>
			source
				.split('\n')
				.map((line) => {
					if (line.trim() === '') return ' \t ';
					// @missing directives have a prescribed machine-readable syntax.
					if (line.startsWith('#') && !line.includes('@missing:'))
						return ' \t' + line;
					return line;
				})
				.join('\n'),
	],
];

for (const [format, transform] of formats) {
	test(`Every parser preserves results with ${format} input`, async (t) => {
		const read = fs.readFileSync;
		let transformSource = false;
		t.mock.method(fs, 'readFileSync', (...args) => {
			const result = read(...args);
			return transformSource && typeof result === 'string'
				? transform(result)
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
					transformSource = false;
					const expected = await run();
					transformSource = true;
					t.assert.deepEqual(
						await run(),
						expected,
						`${version}: ${name} ${kind ?? ''}`,
					);
				}
			}
		}
	});
}
