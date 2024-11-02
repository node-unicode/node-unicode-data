'use strict';

const resources = require('../data/resources.js');
const generateData = require('../index.js');

// Generate the data for the oldest and newest available Unicode version
const oldest = resources[0].version;
generateData(oldest);
const newest = resources.pop().version;
generateData(newest);

const { suite, test } = require("node:test");

suite(`The generated Unicode ${oldest} js`, () => {
	test("General_Category/Modifier_Letter should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + oldest + '/General_Category/Modifier_Letter/ranges.js')
		);
	});
	test("Binary_Property/ASCII should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + oldest + '/Binary_Property/ASCII/ranges.js')
		);
	});
	test("Bidi_Class/Right_To_Left should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + oldest + '/Bidi_Class/Right_To_Left/ranges.js')
		);
	});
});


suite(`The generated latest Unicode js`, () => {
	test("Block/Bopomofo should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + newest + '/Block/Bopomofo/ranges.js')
		);
	});
	test("General_Category/Modifier_Letter should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + newest + '/General_Category/Modifier_Letter/ranges.js')
		);
	});
	test("Binary_Property/Sentence_Terminal should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + newest + '/Binary_Property/Sentence_Terminal/ranges.js')
		);
	});
	test("Binary_Property/Hex_Digit should match the snapshot", (t) => {
		t.assert.snapshot( // Note: `Hex_Digit` is a derived core property.
			require('../output/unicode-' + newest + '/Binary_Property/Hex_Digit/ranges.js')
		);
	});
	test("Bidi_Class/Pop_Directional_Isolate should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + newest + '/Bidi_Class/Pop_Directional_Isolate/ranges.js')
		);
	});
	test("Script/Canadian_Aboriginal should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + newest + '/Script/Canadian_Aboriginal/ranges.js')
		)
	});
	test("Bidi_Mirroring_Glyph should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + newest + '/Bidi_Mirroring_Glyph/index.js')
		);
	});
	test("Bidi_Paired_Bracket_Type/Open should match the snapshot", (t) => {
		t.assert.snapshot(
			require('../output/unicode-' + newest + '/Bidi_Paired_Bracket_Type/Open/ranges.js')
		);
	});
	test("Case_Folding/S should match the snapshot", (t) => {
		const map = require('../output/unicode-' + newest + '/Case_Folding/S/code-points.js');
		t.assert.snapshot(
			[...map.entries()]
		);
	});
});
