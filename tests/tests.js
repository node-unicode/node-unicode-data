'use strict';

const resources = require('../data/resources.js');
const generateData = require('../index.js');

// Generate the data for the oldest and newest available Unicode version
// const oldest = resources[0].version;
// generateData(oldest);
const newest = resources.pop().version;
generateData(newest);
process.exit();
const assert = require('assert');

assert.deepEqual(
	require('./expected/' + oldest + '-category-Lm.js'),
	require('../output/unicode-' + oldest + '/categories/Lm/code-points.js')
);
assert.deepEqual(
	require('./expected/' + oldest + '-property-ASCII.js'),
	require('../output/unicode-' + oldest + '/properties/ASCII/code-points.js')
);
assert.deepEqual(
	require('./expected/' + oldest + '-bidi-class-Right_To_Left.js'),
	require('../output/unicode-' + oldest + '/bidi-classes/Right_To_Left/code-points.js')
);

assert.deepEqual(
	require('./expected/' + newest + '-block-Bopomofo.js'),
	require('../output/unicode-' + newest + '/blocks/Bopomofo/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-category-Lm.js'),
	require('../output/unicode-' + newest + '/categories/Lm/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-property-STerm.js'),
	require('../output/unicode-' + newest + '/properties/STerm/code-points.js')
);
assert.deepEqual( // Note: `Hex_Digit` is a derived core property.
	require('./expected/' + newest + '-property-Hex_Digit.js'),
	require('../output/unicode-' + newest + '/properties/Hex_Digit/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-class-Pop_Directional_Isolate.js'),
	require('../output/unicode-' + newest + '/bidi-classes/Pop_Directional_Isolate/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-script-Canadian_Aboriginal.js'),
	require('../output/unicode-' + newest + '/scripts/Canadian_Aboriginal/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-mirroring.js'),
	require('../output/unicode-' + newest + '/bidi-mirroring/index.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-brackets-Open.js'),
	require('../output/unicode-' + newest + '/bidi-brackets/Open/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-case-folding-S.js'),
	require('../output/unicode-' + newest + '/case-folding/S/code-points.js')
);
