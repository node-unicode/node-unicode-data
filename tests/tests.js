'use strict';

const fs = require('fs');

const readFile = (fileName) => {
	fileName = `${__dirname}/${fileName}`;
	return fs.readFileSync(fileName, 'utf8').toString();
};

const resources = require('../data/resources.js');
const generateData = require('../index.js');

// Generate the data for the oldest and newest available Unicode version
const oldest = resources[0].version;
generateData(oldest);
const newest = resources.pop().version;
generateData(newest);

const assert = require('assert');

assert.deepStrictEqual(
	readFile('./expected/' + oldest + '-General_Category-Modifier_Letter.js'),
	readFile('../output/unicode-' + oldest + '/General_Category/Modifier_Letter/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + oldest + '-Binary_Property-ASCII.js'),
	readFile('../output/unicode-' + oldest + '/Binary_Property/ASCII/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + oldest + '-Bidi_Class-Right_To_Left.js'),
	readFile('../output/unicode-' + oldest + '/Bidi_Class/Right_To_Left/ranges.js')
);

assert.deepStrictEqual(
	readFile('./expected/' + newest + '-Block-Bopomofo.js'),
	readFile('../output/unicode-' + newest + '/Block/Bopomofo/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + newest + '-General_Category-Modifier_Letter.js'),
	readFile('../output/unicode-' + newest + '/General_Category/Modifier_Letter/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + newest + '-Binary_Property-Sentence_Terminal.js'),
	readFile('../output/unicode-' + newest + '/Binary_Property/Sentence_Terminal/ranges.js')
);
assert.deepStrictEqual( // Note: `Hex_Digit` is a derived core property.
	readFile('./expected/' + newest + '-Binary_Property-Hex_Digit.js'),
	readFile('../output/unicode-' + newest + '/Binary_Property/Hex_Digit/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + newest + '-Bidi_Class-Pop_Directional_Isolate.js'),
	readFile('../output/unicode-' + newest + '/Bidi_Class/Pop_Directional_Isolate/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + newest + '-Script-Canadian_Aboriginal.js'),
	readFile('../output/unicode-' + newest + '/Script/Canadian_Aboriginal/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + newest + '-Bidi_Mirroring_Glyph.js'),
	readFile('../output/unicode-' + newest + '/Bidi_Mirroring_Glyph/index.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + newest + '-Bidi_Paired_Bracket_Type-Open.js'),
	readFile('../output/unicode-' + newest + '/Bidi_Paired_Bracket_Type/Open/ranges.js')
);
assert.deepStrictEqual(
	readFile('./expected/' + newest + '-Case_Folding-S.js'),
	readFile('../output/unicode-' + newest + '/Case_Folding/S/code-points.js')
);
