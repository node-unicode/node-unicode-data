var resources = require('../data/resources.js');
var generateData = require('../index.js');

// Generate the data for the oldest and newest available Unicode version
var oldest = resources[0].version;
generateData(oldest);
var newest = resources.pop().version;
generateData(newest);

var assert = require('assert');
assert.deepEqual(
	require('./expected/6.2.0-block-Bopomofo.js'),
	require('../6.2.0/blocks/Bopomofo/code-points.js')
);
assert.deepEqual(
	require('./expected/6.2.0-category-Lm.js'),
	require('../6.2.0/categories/Lm/code-points.js')
);
assert.deepEqual(
	require('./expected/6.2.0-property-STerm.js'),
	require('../6.2.0/properties/STerm/code-points.js')
);
assert.deepEqual(
	require('./expected/6.2.0-script-Canadian_Aboriginal.js'),
	require('../6.2.0/scripts/Canadian_Aboriginal/code-points.js')
);
