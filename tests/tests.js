var resources = require('../data/resources.js');
var generateData = require('../index.js');
// Generate the data for the oldest and newest available Unicode version
var oldest = resources[0].version;
generateData(oldest);
var newest = resources.pop().version;
generateData(newest);
