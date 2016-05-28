'use strict';

const resources = require('../data/resources.js');
const generateData = require('../index.js');

// Generate the data for the oldest and newest available Unicode version
const oldest = resources[0].version;
generateData(oldest);
const newest = resources.pop().version;
generateData(newest);

const assert = require('assert');

assert.deepEqual(
	require('./expected/' + oldest + '-category-Modifier_Letter.js'),
	require('../output/unicode-' + oldest + '/General_Category/Modifier_Letter/code-points.js')
);
assert.deepEqual(
	require('./expected/' + oldest + '-property-ASCII.js'),
	require('../output/unicode-' + oldest + '/Binary_Property/ASCII/code-points.js')
);
assert.deepEqual(
	require('./expected/' + oldest + '-bidi-class-Right_To_Left.js'),
	require('../output/unicode-' + oldest + '/Bidi_Class/Right_To_Left/code-points.js')
);

assert.deepEqual(
	require('./expected/' + newest + '-block-Bopomofo.js'),
	require('../output/unicode-' + newest + '/Block/Bopomofo/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-category-Modifier_Letter.js'),
	require('../output/unicode-' + newest + '/General_Category/Modifier_Letter/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-property-STerm.js'),
	require('../output/unicode-' + newest + '/Binary_Property/STerm/code-points.js')
);
assert.deepEqual( // Note: `Hex_Digit` is a derived core property.
	require('./expected/' + newest + '-property-Hex_Digit.js'),
	require('../output/unicode-' + newest + '/Binary_Property/Hex_Digit/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-class-Pop_Directional_Isolate.js'),
	require('../output/unicode-' + newest + '/Bidi_Class/Pop_Directional_Isolate/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-script-Canadian_Aboriginal.js'),
	require('../output/unicode-' + newest + '/Script/Canadian_Aboriginal/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-Bidi_Mirroring_Glyph.js'),
	require('../output/unicode-' + newest + '/Bidi_Mirroring_Glyph/index.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-brackets-Open.js'),
	require('../output/unicode-' + newest + '/bidi-brackets/Open/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-case-folding-S.js'),
	require('../output/unicode-' + newest + '/Case_Folding/S/code-points.js')
);
