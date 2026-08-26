import resources from '../data/resources.mjs';
import generateData from '../index.mjs';

// Generate the data for the newest available Unicode version.
const newest = resources.pop().version;
await generateData(newest);

