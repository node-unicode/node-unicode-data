'use strict';

const resources = require('../data/resources.js');
const generateData = require('../index.js');

// Generate the data for the newest available Unicode version
const newest = resources.pop().version;
generateData(newest);
