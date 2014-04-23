var resources = require('../data/resources.js');
var generateData = require('../index.js');

// Generate the data for the oldest and newest available Unicode version
var oldest = resources[0].version;
generateData(oldest);
var newest = resources.pop().version;
generateData(newest);

var assert = require('assert');

assert.deepEqual(
	require('./expected/' + oldest + '-category-Lm.js'),
	require('../' + oldest + '/categories/Lm/code-points.js')
);
assert.deepEqual(
	require('./expected/' + oldest + '-property-ASCII.js'),
	require('../' + oldest + '/properties/ASCII/code-points.js')
);
assert.deepEqual(
	require('./expected/' + oldest + '-bidi-R.js'),
	require('../' + oldest + '/bidi/R/code-points.js')
);

assert.deepEqual(
	require('./expected/' + newest + '-block-Bopomofo.js'),
	require('../' + newest + '/blocks/Bopomofo/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-category-Lm.js'),
	require('../' + newest + '/categories/Lm/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-property-STerm.js'),
	require('../' + newest + '/properties/STerm/code-points.js')
);
assert.deepEqual( // Note: `Hex_Digit` is a derived core property.
	require('./expected/' + newest + '-property-Hex_Digit.js'),
	require('../' + newest + '/properties/Hex_Digit/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-PDI.js'),
	require('../' + newest + '/bidi/PDI/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-script-Canadian_Aboriginal.js'),
	require('../' + newest + '/scripts/Canadian_Aboriginal/code-points.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-mirroring.js'),
	require('../' + newest + '/bidi-mirroring/index.js')
);
assert.deepEqual(
	require('./expected/' + newest + '-bidi-brackets-Open.js'),
	require('../' + newest + '/bidi-brackets/Open/code-points.js')
);
