# Unicode v9.0.0 data

JavaScript-compatible Unicode data for use in Node.js. Included: arrays of code points, arrays of symbols, and regular expressions for Unicode v9.0.0’s categories, scripts, script extensions, blocks, and properties, as well as bidi mirroring and case folding data.

The data files in this module are generated as part of the [node-unicode-data](https://mths.be/node-unicode-data) project. **Please report any bugs or requests [in the appropriate issue tracker](https://github.com/mathiasbynens/node-unicode-data/issues).**

## Installation

```bash
npm install unicode-9.0.0 --save-dev
```

**Note:** _unicode-9.0.0_ is supposed to be used in build scripts (i.e. as a `devDependency`), and not at runtime (i.e. as a regular `dependency`).

## Regular expressions

The Unicode data modules ship with pre-compiled regular expressions for categories, scripts, script extensions, blocks, and properties. But maybe you want to create a single regular expression that combines several categories, scripts, etc. In that case, [***you should use Regenerate***](https://mths.be/regenerate). For example, to construct a regex that matches all symbols in the Arabic and Greek scripts as per Unicode v6.3.0:

```js
const regenerate = require('regenerate');
const set = regenerate()
  .add(require('unicode-6.3.0/Script_Extensions/Arabic/code-points')) // or `…/symbols`, doesn’t matter
  .add(require('unicode-6.3.0/Script_Extensions/Greek/code-points')); // or `…/symbols`, doesn’t matter
console.log(set.toString());
// Then you might want to use a template like this to write the result to a file, along with any regex flags you might need:
// const regex = /<%= set.toString() %>/gim;
```

## Usage

```js
// Get an array of code points in a given Unicode category:
const codePoints = require('unicode-9.0.0/General_Category/Uppercase_Letter/code-points');
// Get an array of symbols (strings) in a given Unicode category:
const symbols = require('unicode-9.0.0/General_Category/Uppercase_Letter/symbols');
// Get a regular expression that matches any symbol in a given Unicode category:
const regex = require('unicode-9.0.0/General_Category/Uppercase_Letter/regex');
// Get the canonical category a given code point belongs to:
// (Note: U+0041 is LATIN CAPITAL LETTER A)
const category = require('unicode-9.0.0/General_Category').get(0x41);
// Get an array of all code points with a given bidi class:
const on = require('unicode-9.0.0/Bidi_Class/Other_Neutral/code-points');
// Get a map from code points to bidi classes:
const bidiClassMap = require('unicode-9.0.0/Bidi_Class');
// Get the directionality of a given code point:
const directionality = require('unicode-9.0.0/Bidi_Class').get(0x41);

// What glyph is the mirror image of `«` (U+00AB)?
const mirrored = require('unicode-9.0.0/Bidi_Mirroring_Glyph').get(0xAB);

// Get a regular expression that matches all opening brackets:
const openingBrackets = require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/regex');

// …you get the idea.
```

Other than categories, data on Unicode properties, blocks, scripts, and script extensions is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v9.0.0:

```js
// `Binary_Property`:

require('unicode-9.0.0/Binary_Property/ASCII/code-points');
require('unicode-9.0.0/Binary_Property/ASCII/symbols');
require('unicode-9.0.0/Binary_Property/ASCII/regex');

require('unicode-9.0.0/Binary_Property/ASCII_Hex_Digit/code-points');
require('unicode-9.0.0/Binary_Property/ASCII_Hex_Digit/symbols');
require('unicode-9.0.0/Binary_Property/ASCII_Hex_Digit/regex');

require('unicode-9.0.0/Binary_Property/Alphabetic/code-points');
require('unicode-9.0.0/Binary_Property/Alphabetic/symbols');
require('unicode-9.0.0/Binary_Property/Alphabetic/regex');

require('unicode-9.0.0/Binary_Property/Any/code-points');
require('unicode-9.0.0/Binary_Property/Any/symbols');
require('unicode-9.0.0/Binary_Property/Any/regex');

require('unicode-9.0.0/Binary_Property/Assigned/code-points');
require('unicode-9.0.0/Binary_Property/Assigned/symbols');
require('unicode-9.0.0/Binary_Property/Assigned/regex');

require('unicode-9.0.0/Binary_Property/Bidi_Control/code-points');
require('unicode-9.0.0/Binary_Property/Bidi_Control/symbols');
require('unicode-9.0.0/Binary_Property/Bidi_Control/regex');

require('unicode-9.0.0/Binary_Property/Bidi_Mirrored/code-points');
require('unicode-9.0.0/Binary_Property/Bidi_Mirrored/symbols');
require('unicode-9.0.0/Binary_Property/Bidi_Mirrored/regex');

require('unicode-9.0.0/Binary_Property/Case_Ignorable/code-points');
require('unicode-9.0.0/Binary_Property/Case_Ignorable/symbols');
require('unicode-9.0.0/Binary_Property/Case_Ignorable/regex');

require('unicode-9.0.0/Binary_Property/Cased/code-points');
require('unicode-9.0.0/Binary_Property/Cased/symbols');
require('unicode-9.0.0/Binary_Property/Cased/regex');

require('unicode-9.0.0/Binary_Property/Changes_When_Casefolded/code-points');
require('unicode-9.0.0/Binary_Property/Changes_When_Casefolded/symbols');
require('unicode-9.0.0/Binary_Property/Changes_When_Casefolded/regex');

require('unicode-9.0.0/Binary_Property/Changes_When_Casemapped/code-points');
require('unicode-9.0.0/Binary_Property/Changes_When_Casemapped/symbols');
require('unicode-9.0.0/Binary_Property/Changes_When_Casemapped/regex');

require('unicode-9.0.0/Binary_Property/Changes_When_Lowercased/code-points');
require('unicode-9.0.0/Binary_Property/Changes_When_Lowercased/symbols');
require('unicode-9.0.0/Binary_Property/Changes_When_Lowercased/regex');

require('unicode-9.0.0/Binary_Property/Changes_When_NFKC_Casefolded/code-points');
require('unicode-9.0.0/Binary_Property/Changes_When_NFKC_Casefolded/symbols');
require('unicode-9.0.0/Binary_Property/Changes_When_NFKC_Casefolded/regex');

require('unicode-9.0.0/Binary_Property/Changes_When_Titlecased/code-points');
require('unicode-9.0.0/Binary_Property/Changes_When_Titlecased/symbols');
require('unicode-9.0.0/Binary_Property/Changes_When_Titlecased/regex');

require('unicode-9.0.0/Binary_Property/Changes_When_Uppercased/code-points');
require('unicode-9.0.0/Binary_Property/Changes_When_Uppercased/symbols');
require('unicode-9.0.0/Binary_Property/Changes_When_Uppercased/regex');

require('unicode-9.0.0/Binary_Property/Composition_Exclusion/code-points');
require('unicode-9.0.0/Binary_Property/Composition_Exclusion/symbols');
require('unicode-9.0.0/Binary_Property/Composition_Exclusion/regex');

require('unicode-9.0.0/Binary_Property/Dash/code-points');
require('unicode-9.0.0/Binary_Property/Dash/symbols');
require('unicode-9.0.0/Binary_Property/Dash/regex');

require('unicode-9.0.0/Binary_Property/Default_Ignorable_Code_Point/code-points');
require('unicode-9.0.0/Binary_Property/Default_Ignorable_Code_Point/symbols');
require('unicode-9.0.0/Binary_Property/Default_Ignorable_Code_Point/regex');

require('unicode-9.0.0/Binary_Property/Deprecated/code-points');
require('unicode-9.0.0/Binary_Property/Deprecated/symbols');
require('unicode-9.0.0/Binary_Property/Deprecated/regex');

require('unicode-9.0.0/Binary_Property/Diacritic/code-points');
require('unicode-9.0.0/Binary_Property/Diacritic/symbols');
require('unicode-9.0.0/Binary_Property/Diacritic/regex');

require('unicode-9.0.0/Binary_Property/Expands_On_NFC/code-points');
require('unicode-9.0.0/Binary_Property/Expands_On_NFC/symbols');
require('unicode-9.0.0/Binary_Property/Expands_On_NFC/regex');

require('unicode-9.0.0/Binary_Property/Expands_On_NFD/code-points');
require('unicode-9.0.0/Binary_Property/Expands_On_NFD/symbols');
require('unicode-9.0.0/Binary_Property/Expands_On_NFD/regex');

require('unicode-9.0.0/Binary_Property/Expands_On_NFKC/code-points');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKC/symbols');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKC/regex');

require('unicode-9.0.0/Binary_Property/Expands_On_NFKD/code-points');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKD/symbols');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKD/regex');

require('unicode-9.0.0/Binary_Property/Extender/code-points');
require('unicode-9.0.0/Binary_Property/Extender/symbols');
require('unicode-9.0.0/Binary_Property/Extender/regex');

require('unicode-9.0.0/Binary_Property/FC_NFKC_Closure/code-points');
require('unicode-9.0.0/Binary_Property/FC_NFKC_Closure/symbols');
require('unicode-9.0.0/Binary_Property/FC_NFKC_Closure/regex');

require('unicode-9.0.0/Binary_Property/Full_Composition_Exclusion/code-points');
require('unicode-9.0.0/Binary_Property/Full_Composition_Exclusion/symbols');
require('unicode-9.0.0/Binary_Property/Full_Composition_Exclusion/regex');

require('unicode-9.0.0/Binary_Property/Grapheme_Base/code-points');
require('unicode-9.0.0/Binary_Property/Grapheme_Base/symbols');
require('unicode-9.0.0/Binary_Property/Grapheme_Base/regex');

require('unicode-9.0.0/Binary_Property/Grapheme_Extend/code-points');
require('unicode-9.0.0/Binary_Property/Grapheme_Extend/symbols');
require('unicode-9.0.0/Binary_Property/Grapheme_Extend/regex');

require('unicode-9.0.0/Binary_Property/Grapheme_Link/code-points');
require('unicode-9.0.0/Binary_Property/Grapheme_Link/symbols');
require('unicode-9.0.0/Binary_Property/Grapheme_Link/regex');

require('unicode-9.0.0/Binary_Property/Hex_Digit/code-points');
require('unicode-9.0.0/Binary_Property/Hex_Digit/symbols');
require('unicode-9.0.0/Binary_Property/Hex_Digit/regex');

require('unicode-9.0.0/Binary_Property/Hyphen/code-points');
require('unicode-9.0.0/Binary_Property/Hyphen/symbols');
require('unicode-9.0.0/Binary_Property/Hyphen/regex');

require('unicode-9.0.0/Binary_Property/IDS_Binary_Operator/code-points');
require('unicode-9.0.0/Binary_Property/IDS_Binary_Operator/symbols');
require('unicode-9.0.0/Binary_Property/IDS_Binary_Operator/regex');

require('unicode-9.0.0/Binary_Property/IDS_Trinary_Operator/code-points');
require('unicode-9.0.0/Binary_Property/IDS_Trinary_Operator/symbols');
require('unicode-9.0.0/Binary_Property/IDS_Trinary_Operator/regex');

require('unicode-9.0.0/Binary_Property/ID_Continue/code-points');
require('unicode-9.0.0/Binary_Property/ID_Continue/symbols');
require('unicode-9.0.0/Binary_Property/ID_Continue/regex');

require('unicode-9.0.0/Binary_Property/ID_Start/code-points');
require('unicode-9.0.0/Binary_Property/ID_Start/symbols');
require('unicode-9.0.0/Binary_Property/ID_Start/regex');

require('unicode-9.0.0/Binary_Property/Ideographic/code-points');
require('unicode-9.0.0/Binary_Property/Ideographic/symbols');
require('unicode-9.0.0/Binary_Property/Ideographic/regex');

require('unicode-9.0.0/Binary_Property/Join_Control/code-points');
require('unicode-9.0.0/Binary_Property/Join_Control/symbols');
require('unicode-9.0.0/Binary_Property/Join_Control/regex');

require('unicode-9.0.0/Binary_Property/Logical_Order_Exception/code-points');
require('unicode-9.0.0/Binary_Property/Logical_Order_Exception/symbols');
require('unicode-9.0.0/Binary_Property/Logical_Order_Exception/regex');

require('unicode-9.0.0/Binary_Property/Lowercase/code-points');
require('unicode-9.0.0/Binary_Property/Lowercase/symbols');
require('unicode-9.0.0/Binary_Property/Lowercase/regex');

require('unicode-9.0.0/Binary_Property/Math/code-points');
require('unicode-9.0.0/Binary_Property/Math/symbols');
require('unicode-9.0.0/Binary_Property/Math/regex');

require('unicode-9.0.0/Binary_Property/Noncharacter_Code_Point/code-points');
require('unicode-9.0.0/Binary_Property/Noncharacter_Code_Point/symbols');
require('unicode-9.0.0/Binary_Property/Noncharacter_Code_Point/regex');

require('unicode-9.0.0/Binary_Property/Other_Alphabetic/code-points');
require('unicode-9.0.0/Binary_Property/Other_Alphabetic/symbols');
require('unicode-9.0.0/Binary_Property/Other_Alphabetic/regex');

require('unicode-9.0.0/Binary_Property/Other_Default_Ignorable_Code_Point/code-points');
require('unicode-9.0.0/Binary_Property/Other_Default_Ignorable_Code_Point/symbols');
require('unicode-9.0.0/Binary_Property/Other_Default_Ignorable_Code_Point/regex');

require('unicode-9.0.0/Binary_Property/Other_Grapheme_Extend/code-points');
require('unicode-9.0.0/Binary_Property/Other_Grapheme_Extend/symbols');
require('unicode-9.0.0/Binary_Property/Other_Grapheme_Extend/regex');

require('unicode-9.0.0/Binary_Property/Other_ID_Continue/code-points');
require('unicode-9.0.0/Binary_Property/Other_ID_Continue/symbols');
require('unicode-9.0.0/Binary_Property/Other_ID_Continue/regex');

require('unicode-9.0.0/Binary_Property/Other_ID_Start/code-points');
require('unicode-9.0.0/Binary_Property/Other_ID_Start/symbols');
require('unicode-9.0.0/Binary_Property/Other_ID_Start/regex');

require('unicode-9.0.0/Binary_Property/Other_Lowercase/code-points');
require('unicode-9.0.0/Binary_Property/Other_Lowercase/symbols');
require('unicode-9.0.0/Binary_Property/Other_Lowercase/regex');

require('unicode-9.0.0/Binary_Property/Other_Math/code-points');
require('unicode-9.0.0/Binary_Property/Other_Math/symbols');
require('unicode-9.0.0/Binary_Property/Other_Math/regex');

require('unicode-9.0.0/Binary_Property/Other_Uppercase/code-points');
require('unicode-9.0.0/Binary_Property/Other_Uppercase/symbols');
require('unicode-9.0.0/Binary_Property/Other_Uppercase/regex');

require('unicode-9.0.0/Binary_Property/Pattern_Syntax/code-points');
require('unicode-9.0.0/Binary_Property/Pattern_Syntax/symbols');
require('unicode-9.0.0/Binary_Property/Pattern_Syntax/regex');

require('unicode-9.0.0/Binary_Property/Pattern_White_Space/code-points');
require('unicode-9.0.0/Binary_Property/Pattern_White_Space/symbols');
require('unicode-9.0.0/Binary_Property/Pattern_White_Space/regex');

require('unicode-9.0.0/Binary_Property/Prepended_Concatenation_Mark/code-points');
require('unicode-9.0.0/Binary_Property/Prepended_Concatenation_Mark/symbols');
require('unicode-9.0.0/Binary_Property/Prepended_Concatenation_Mark/regex');

require('unicode-9.0.0/Binary_Property/Quotation_Mark/code-points');
require('unicode-9.0.0/Binary_Property/Quotation_Mark/symbols');
require('unicode-9.0.0/Binary_Property/Quotation_Mark/regex');

require('unicode-9.0.0/Binary_Property/Radical/code-points');
require('unicode-9.0.0/Binary_Property/Radical/symbols');
require('unicode-9.0.0/Binary_Property/Radical/regex');

require('unicode-9.0.0/Binary_Property/Sentence_Terminal/code-points');
require('unicode-9.0.0/Binary_Property/Sentence_Terminal/symbols');
require('unicode-9.0.0/Binary_Property/Sentence_Terminal/regex');

require('unicode-9.0.0/Binary_Property/Soft_Dotted/code-points');
require('unicode-9.0.0/Binary_Property/Soft_Dotted/symbols');
require('unicode-9.0.0/Binary_Property/Soft_Dotted/regex');

require('unicode-9.0.0/Binary_Property/Terminal_Punctuation/code-points');
require('unicode-9.0.0/Binary_Property/Terminal_Punctuation/symbols');
require('unicode-9.0.0/Binary_Property/Terminal_Punctuation/regex');

require('unicode-9.0.0/Binary_Property/Unified_Ideograph/code-points');
require('unicode-9.0.0/Binary_Property/Unified_Ideograph/symbols');
require('unicode-9.0.0/Binary_Property/Unified_Ideograph/regex');

require('unicode-9.0.0/Binary_Property/Uppercase/code-points');
require('unicode-9.0.0/Binary_Property/Uppercase/symbols');
require('unicode-9.0.0/Binary_Property/Uppercase/regex');

require('unicode-9.0.0/Binary_Property/Variation_Selector/code-points');
require('unicode-9.0.0/Binary_Property/Variation_Selector/symbols');
require('unicode-9.0.0/Binary_Property/Variation_Selector/regex');

require('unicode-9.0.0/Binary_Property/White_Space/code-points');
require('unicode-9.0.0/Binary_Property/White_Space/symbols');
require('unicode-9.0.0/Binary_Property/White_Space/regex');

require('unicode-9.0.0/Binary_Property/XID_Continue/code-points');
require('unicode-9.0.0/Binary_Property/XID_Continue/symbols');
require('unicode-9.0.0/Binary_Property/XID_Continue/regex');

require('unicode-9.0.0/Binary_Property/XID_Start/code-points');
require('unicode-9.0.0/Binary_Property/XID_Start/symbols');
require('unicode-9.0.0/Binary_Property/XID_Start/regex');

// `General_Category`:

require('unicode-9.0.0/General_Category').get(codePoint); // lookup map

require('unicode-9.0.0/General_Category/Cased_Letter/code-points');
require('unicode-9.0.0/General_Category/Cased_Letter/symbols');
require('unicode-9.0.0/General_Category/Cased_Letter/regex');

require('unicode-9.0.0/General_Category/Close_Punctuation/code-points');
require('unicode-9.0.0/General_Category/Close_Punctuation/symbols');
require('unicode-9.0.0/General_Category/Close_Punctuation/regex');

require('unicode-9.0.0/General_Category/Connector_Punctuation/code-points');
require('unicode-9.0.0/General_Category/Connector_Punctuation/symbols');
require('unicode-9.0.0/General_Category/Connector_Punctuation/regex');

require('unicode-9.0.0/General_Category/Control/code-points');
require('unicode-9.0.0/General_Category/Control/symbols');
require('unicode-9.0.0/General_Category/Control/regex');

require('unicode-9.0.0/General_Category/Currency_Symbol/code-points');
require('unicode-9.0.0/General_Category/Currency_Symbol/symbols');
require('unicode-9.0.0/General_Category/Currency_Symbol/regex');

require('unicode-9.0.0/General_Category/Dash_Punctuation/code-points');
require('unicode-9.0.0/General_Category/Dash_Punctuation/symbols');
require('unicode-9.0.0/General_Category/Dash_Punctuation/regex');

require('unicode-9.0.0/General_Category/Decimal_Number/code-points');
require('unicode-9.0.0/General_Category/Decimal_Number/symbols');
require('unicode-9.0.0/General_Category/Decimal_Number/regex');

require('unicode-9.0.0/General_Category/Enclosing_Mark/code-points');
require('unicode-9.0.0/General_Category/Enclosing_Mark/symbols');
require('unicode-9.0.0/General_Category/Enclosing_Mark/regex');

require('unicode-9.0.0/General_Category/Final_Punctuation/code-points');
require('unicode-9.0.0/General_Category/Final_Punctuation/symbols');
require('unicode-9.0.0/General_Category/Final_Punctuation/regex');

require('unicode-9.0.0/General_Category/Format/code-points');
require('unicode-9.0.0/General_Category/Format/symbols');
require('unicode-9.0.0/General_Category/Format/regex');

require('unicode-9.0.0/General_Category/Initial_Punctuation/code-points');
require('unicode-9.0.0/General_Category/Initial_Punctuation/symbols');
require('unicode-9.0.0/General_Category/Initial_Punctuation/regex');

require('unicode-9.0.0/General_Category/Letter/code-points');
require('unicode-9.0.0/General_Category/Letter/symbols');
require('unicode-9.0.0/General_Category/Letter/regex');

require('unicode-9.0.0/General_Category/Letter_Number/code-points');
require('unicode-9.0.0/General_Category/Letter_Number/symbols');
require('unicode-9.0.0/General_Category/Letter_Number/regex');

require('unicode-9.0.0/General_Category/Line_Separator/code-points');
require('unicode-9.0.0/General_Category/Line_Separator/symbols');
require('unicode-9.0.0/General_Category/Line_Separator/regex');

require('unicode-9.0.0/General_Category/Lowercase_Letter/code-points');
require('unicode-9.0.0/General_Category/Lowercase_Letter/symbols');
require('unicode-9.0.0/General_Category/Lowercase_Letter/regex');

require('unicode-9.0.0/General_Category/Mark/code-points');
require('unicode-9.0.0/General_Category/Mark/symbols');
require('unicode-9.0.0/General_Category/Mark/regex');

require('unicode-9.0.0/General_Category/Math_Symbol/code-points');
require('unicode-9.0.0/General_Category/Math_Symbol/symbols');
require('unicode-9.0.0/General_Category/Math_Symbol/regex');

require('unicode-9.0.0/General_Category/Modifier_Letter/code-points');
require('unicode-9.0.0/General_Category/Modifier_Letter/symbols');
require('unicode-9.0.0/General_Category/Modifier_Letter/regex');

require('unicode-9.0.0/General_Category/Modifier_Symbol/code-points');
require('unicode-9.0.0/General_Category/Modifier_Symbol/symbols');
require('unicode-9.0.0/General_Category/Modifier_Symbol/regex');

require('unicode-9.0.0/General_Category/Nonspacing_Mark/code-points');
require('unicode-9.0.0/General_Category/Nonspacing_Mark/symbols');
require('unicode-9.0.0/General_Category/Nonspacing_Mark/regex');

require('unicode-9.0.0/General_Category/Number/code-points');
require('unicode-9.0.0/General_Category/Number/symbols');
require('unicode-9.0.0/General_Category/Number/regex');

require('unicode-9.0.0/General_Category/Open_Punctuation/code-points');
require('unicode-9.0.0/General_Category/Open_Punctuation/symbols');
require('unicode-9.0.0/General_Category/Open_Punctuation/regex');

require('unicode-9.0.0/General_Category/Other/code-points');
require('unicode-9.0.0/General_Category/Other/symbols');
require('unicode-9.0.0/General_Category/Other/regex');

require('unicode-9.0.0/General_Category/Other_Letter/code-points');
require('unicode-9.0.0/General_Category/Other_Letter/symbols');
require('unicode-9.0.0/General_Category/Other_Letter/regex');

require('unicode-9.0.0/General_Category/Other_Number/code-points');
require('unicode-9.0.0/General_Category/Other_Number/symbols');
require('unicode-9.0.0/General_Category/Other_Number/regex');

require('unicode-9.0.0/General_Category/Other_Punctuation/code-points');
require('unicode-9.0.0/General_Category/Other_Punctuation/symbols');
require('unicode-9.0.0/General_Category/Other_Punctuation/regex');

require('unicode-9.0.0/General_Category/Other_Symbol/code-points');
require('unicode-9.0.0/General_Category/Other_Symbol/symbols');
require('unicode-9.0.0/General_Category/Other_Symbol/regex');

require('unicode-9.0.0/General_Category/Paragraph_Separator/code-points');
require('unicode-9.0.0/General_Category/Paragraph_Separator/symbols');
require('unicode-9.0.0/General_Category/Paragraph_Separator/regex');

require('unicode-9.0.0/General_Category/Private_Use/code-points');
require('unicode-9.0.0/General_Category/Private_Use/symbols');
require('unicode-9.0.0/General_Category/Private_Use/regex');

require('unicode-9.0.0/General_Category/Punctuation/code-points');
require('unicode-9.0.0/General_Category/Punctuation/symbols');
require('unicode-9.0.0/General_Category/Punctuation/regex');

require('unicode-9.0.0/General_Category/Separator/code-points');
require('unicode-9.0.0/General_Category/Separator/symbols');
require('unicode-9.0.0/General_Category/Separator/regex');

require('unicode-9.0.0/General_Category/Space_Separator/code-points');
require('unicode-9.0.0/General_Category/Space_Separator/symbols');
require('unicode-9.0.0/General_Category/Space_Separator/regex');

require('unicode-9.0.0/General_Category/Spacing_Mark/code-points');
require('unicode-9.0.0/General_Category/Spacing_Mark/symbols');
require('unicode-9.0.0/General_Category/Spacing_Mark/regex');

require('unicode-9.0.0/General_Category/Surrogate/code-points');
require('unicode-9.0.0/General_Category/Surrogate/symbols');
require('unicode-9.0.0/General_Category/Surrogate/regex');

require('unicode-9.0.0/General_Category/Symbol/code-points');
require('unicode-9.0.0/General_Category/Symbol/symbols');
require('unicode-9.0.0/General_Category/Symbol/regex');

require('unicode-9.0.0/General_Category/Titlecase_Letter/code-points');
require('unicode-9.0.0/General_Category/Titlecase_Letter/symbols');
require('unicode-9.0.0/General_Category/Titlecase_Letter/regex');

require('unicode-9.0.0/General_Category/Unassigned/code-points');
require('unicode-9.0.0/General_Category/Unassigned/symbols');
require('unicode-9.0.0/General_Category/Unassigned/regex');

require('unicode-9.0.0/General_Category/Uppercase_Letter/code-points');
require('unicode-9.0.0/General_Category/Uppercase_Letter/symbols');
require('unicode-9.0.0/General_Category/Uppercase_Letter/regex');

// `Bidi_Class`:

require('unicode-9.0.0/Bidi_Class').get(codePoint); // lookup map

require('unicode-9.0.0/Bidi_Class/Arabic_Letter/code-points');
require('unicode-9.0.0/Bidi_Class/Arabic_Letter/symbols');
require('unicode-9.0.0/Bidi_Class/Arabic_Letter/regex');

require('unicode-9.0.0/Bidi_Class/Arabic_Number/code-points');
require('unicode-9.0.0/Bidi_Class/Arabic_Number/symbols');
require('unicode-9.0.0/Bidi_Class/Arabic_Number/regex');

require('unicode-9.0.0/Bidi_Class/Boundary_Neutral/code-points');
require('unicode-9.0.0/Bidi_Class/Boundary_Neutral/symbols');
require('unicode-9.0.0/Bidi_Class/Boundary_Neutral/regex');

require('unicode-9.0.0/Bidi_Class/Common_Separator/code-points');
require('unicode-9.0.0/Bidi_Class/Common_Separator/symbols');
require('unicode-9.0.0/Bidi_Class/Common_Separator/regex');

require('unicode-9.0.0/Bidi_Class/European_Number/code-points');
require('unicode-9.0.0/Bidi_Class/European_Number/symbols');
require('unicode-9.0.0/Bidi_Class/European_Number/regex');

require('unicode-9.0.0/Bidi_Class/European_Separator/code-points');
require('unicode-9.0.0/Bidi_Class/European_Separator/symbols');
require('unicode-9.0.0/Bidi_Class/European_Separator/regex');

require('unicode-9.0.0/Bidi_Class/European_Terminator/code-points');
require('unicode-9.0.0/Bidi_Class/European_Terminator/symbols');
require('unicode-9.0.0/Bidi_Class/European_Terminator/regex');

require('unicode-9.0.0/Bidi_Class/First_Strong_Isolate/code-points');
require('unicode-9.0.0/Bidi_Class/First_Strong_Isolate/symbols');
require('unicode-9.0.0/Bidi_Class/First_Strong_Isolate/regex');

require('unicode-9.0.0/Bidi_Class/Left_To_Right/code-points');
require('unicode-9.0.0/Bidi_Class/Left_To_Right/symbols');
require('unicode-9.0.0/Bidi_Class/Left_To_Right/regex');

require('unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/code-points');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/symbols');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/regex');

require('unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/code-points');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/symbols');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/regex');

require('unicode-9.0.0/Bidi_Class/Left_To_Right_Override/code-points');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Override/symbols');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Override/regex');

require('unicode-9.0.0/Bidi_Class/Nonspacing_Mark/code-points');
require('unicode-9.0.0/Bidi_Class/Nonspacing_Mark/symbols');
require('unicode-9.0.0/Bidi_Class/Nonspacing_Mark/regex');

require('unicode-9.0.0/Bidi_Class/Other_Neutral/code-points');
require('unicode-9.0.0/Bidi_Class/Other_Neutral/symbols');
require('unicode-9.0.0/Bidi_Class/Other_Neutral/regex');

require('unicode-9.0.0/Bidi_Class/Paragraph_Separator/code-points');
require('unicode-9.0.0/Bidi_Class/Paragraph_Separator/symbols');
require('unicode-9.0.0/Bidi_Class/Paragraph_Separator/regex');

require('unicode-9.0.0/Bidi_Class/Pop_Directional_Format/code-points');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Format/symbols');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Format/regex');

require('unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/code-points');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/symbols');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/regex');

require('unicode-9.0.0/Bidi_Class/Right_To_Left/code-points');
require('unicode-9.0.0/Bidi_Class/Right_To_Left/symbols');
require('unicode-9.0.0/Bidi_Class/Right_To_Left/regex');

require('unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/code-points');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/symbols');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/regex');

require('unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/code-points');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/symbols');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/regex');

require('unicode-9.0.0/Bidi_Class/Right_To_Left_Override/code-points');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Override/symbols');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Override/regex');

require('unicode-9.0.0/Bidi_Class/Segment_Separator/code-points');
require('unicode-9.0.0/Bidi_Class/Segment_Separator/symbols');
require('unicode-9.0.0/Bidi_Class/Segment_Separator/regex');

require('unicode-9.0.0/Bidi_Class/White_Space/code-points');
require('unicode-9.0.0/Bidi_Class/White_Space/symbols');
require('unicode-9.0.0/Bidi_Class/White_Space/regex');

// `Script`:

require('unicode-9.0.0/Script/Adlam/code-points');
require('unicode-9.0.0/Script/Adlam/symbols');
require('unicode-9.0.0/Script/Adlam/regex');

require('unicode-9.0.0/Script/Ahom/code-points');
require('unicode-9.0.0/Script/Ahom/symbols');
require('unicode-9.0.0/Script/Ahom/regex');

require('unicode-9.0.0/Script/Anatolian_Hieroglyphs/code-points');
require('unicode-9.0.0/Script/Anatolian_Hieroglyphs/symbols');
require('unicode-9.0.0/Script/Anatolian_Hieroglyphs/regex');

require('unicode-9.0.0/Script/Arabic/code-points');
require('unicode-9.0.0/Script/Arabic/symbols');
require('unicode-9.0.0/Script/Arabic/regex');

require('unicode-9.0.0/Script/Armenian/code-points');
require('unicode-9.0.0/Script/Armenian/symbols');
require('unicode-9.0.0/Script/Armenian/regex');

require('unicode-9.0.0/Script/Avestan/code-points');
require('unicode-9.0.0/Script/Avestan/symbols');
require('unicode-9.0.0/Script/Avestan/regex');

require('unicode-9.0.0/Script/Balinese/code-points');
require('unicode-9.0.0/Script/Balinese/symbols');
require('unicode-9.0.0/Script/Balinese/regex');

require('unicode-9.0.0/Script/Bamum/code-points');
require('unicode-9.0.0/Script/Bamum/symbols');
require('unicode-9.0.0/Script/Bamum/regex');

require('unicode-9.0.0/Script/Bassa_Vah/code-points');
require('unicode-9.0.0/Script/Bassa_Vah/symbols');
require('unicode-9.0.0/Script/Bassa_Vah/regex');

require('unicode-9.0.0/Script/Batak/code-points');
require('unicode-9.0.0/Script/Batak/symbols');
require('unicode-9.0.0/Script/Batak/regex');

require('unicode-9.0.0/Script/Bengali/code-points');
require('unicode-9.0.0/Script/Bengali/symbols');
require('unicode-9.0.0/Script/Bengali/regex');

require('unicode-9.0.0/Script/Bhaiksuki/code-points');
require('unicode-9.0.0/Script/Bhaiksuki/symbols');
require('unicode-9.0.0/Script/Bhaiksuki/regex');

require('unicode-9.0.0/Script/Bopomofo/code-points');
require('unicode-9.0.0/Script/Bopomofo/symbols');
require('unicode-9.0.0/Script/Bopomofo/regex');

require('unicode-9.0.0/Script/Brahmi/code-points');
require('unicode-9.0.0/Script/Brahmi/symbols');
require('unicode-9.0.0/Script/Brahmi/regex');

require('unicode-9.0.0/Script/Braille/code-points');
require('unicode-9.0.0/Script/Braille/symbols');
require('unicode-9.0.0/Script/Braille/regex');

require('unicode-9.0.0/Script/Buginese/code-points');
require('unicode-9.0.0/Script/Buginese/symbols');
require('unicode-9.0.0/Script/Buginese/regex');

require('unicode-9.0.0/Script/Buhid/code-points');
require('unicode-9.0.0/Script/Buhid/symbols');
require('unicode-9.0.0/Script/Buhid/regex');

require('unicode-9.0.0/Script/Canadian_Aboriginal/code-points');
require('unicode-9.0.0/Script/Canadian_Aboriginal/symbols');
require('unicode-9.0.0/Script/Canadian_Aboriginal/regex');

require('unicode-9.0.0/Script/Carian/code-points');
require('unicode-9.0.0/Script/Carian/symbols');
require('unicode-9.0.0/Script/Carian/regex');

require('unicode-9.0.0/Script/Caucasian_Albanian/code-points');
require('unicode-9.0.0/Script/Caucasian_Albanian/symbols');
require('unicode-9.0.0/Script/Caucasian_Albanian/regex');

require('unicode-9.0.0/Script/Chakma/code-points');
require('unicode-9.0.0/Script/Chakma/symbols');
require('unicode-9.0.0/Script/Chakma/regex');

require('unicode-9.0.0/Script/Cham/code-points');
require('unicode-9.0.0/Script/Cham/symbols');
require('unicode-9.0.0/Script/Cham/regex');

require('unicode-9.0.0/Script/Cherokee/code-points');
require('unicode-9.0.0/Script/Cherokee/symbols');
require('unicode-9.0.0/Script/Cherokee/regex');

require('unicode-9.0.0/Script/Common/code-points');
require('unicode-9.0.0/Script/Common/symbols');
require('unicode-9.0.0/Script/Common/regex');

require('unicode-9.0.0/Script/Coptic/code-points');
require('unicode-9.0.0/Script/Coptic/symbols');
require('unicode-9.0.0/Script/Coptic/regex');

require('unicode-9.0.0/Script/Cuneiform/code-points');
require('unicode-9.0.0/Script/Cuneiform/symbols');
require('unicode-9.0.0/Script/Cuneiform/regex');

require('unicode-9.0.0/Script/Cypriot/code-points');
require('unicode-9.0.0/Script/Cypriot/symbols');
require('unicode-9.0.0/Script/Cypriot/regex');

require('unicode-9.0.0/Script/Cyrillic/code-points');
require('unicode-9.0.0/Script/Cyrillic/symbols');
require('unicode-9.0.0/Script/Cyrillic/regex');

require('unicode-9.0.0/Script/Deseret/code-points');
require('unicode-9.0.0/Script/Deseret/symbols');
require('unicode-9.0.0/Script/Deseret/regex');

require('unicode-9.0.0/Script/Devanagari/code-points');
require('unicode-9.0.0/Script/Devanagari/symbols');
require('unicode-9.0.0/Script/Devanagari/regex');

require('unicode-9.0.0/Script/Duployan/code-points');
require('unicode-9.0.0/Script/Duployan/symbols');
require('unicode-9.0.0/Script/Duployan/regex');

require('unicode-9.0.0/Script/Egyptian_Hieroglyphs/code-points');
require('unicode-9.0.0/Script/Egyptian_Hieroglyphs/symbols');
require('unicode-9.0.0/Script/Egyptian_Hieroglyphs/regex');

require('unicode-9.0.0/Script/Elbasan/code-points');
require('unicode-9.0.0/Script/Elbasan/symbols');
require('unicode-9.0.0/Script/Elbasan/regex');

require('unicode-9.0.0/Script/Ethiopic/code-points');
require('unicode-9.0.0/Script/Ethiopic/symbols');
require('unicode-9.0.0/Script/Ethiopic/regex');

require('unicode-9.0.0/Script/Georgian/code-points');
require('unicode-9.0.0/Script/Georgian/symbols');
require('unicode-9.0.0/Script/Georgian/regex');

require('unicode-9.0.0/Script/Glagolitic/code-points');
require('unicode-9.0.0/Script/Glagolitic/symbols');
require('unicode-9.0.0/Script/Glagolitic/regex');

require('unicode-9.0.0/Script/Gothic/code-points');
require('unicode-9.0.0/Script/Gothic/symbols');
require('unicode-9.0.0/Script/Gothic/regex');

require('unicode-9.0.0/Script/Grantha/code-points');
require('unicode-9.0.0/Script/Grantha/symbols');
require('unicode-9.0.0/Script/Grantha/regex');

require('unicode-9.0.0/Script/Greek/code-points');
require('unicode-9.0.0/Script/Greek/symbols');
require('unicode-9.0.0/Script/Greek/regex');

require('unicode-9.0.0/Script/Gujarati/code-points');
require('unicode-9.0.0/Script/Gujarati/symbols');
require('unicode-9.0.0/Script/Gujarati/regex');

require('unicode-9.0.0/Script/Gurmukhi/code-points');
require('unicode-9.0.0/Script/Gurmukhi/symbols');
require('unicode-9.0.0/Script/Gurmukhi/regex');

require('unicode-9.0.0/Script/Han/code-points');
require('unicode-9.0.0/Script/Han/symbols');
require('unicode-9.0.0/Script/Han/regex');

require('unicode-9.0.0/Script/Hangul/code-points');
require('unicode-9.0.0/Script/Hangul/symbols');
require('unicode-9.0.0/Script/Hangul/regex');

require('unicode-9.0.0/Script/Hanunoo/code-points');
require('unicode-9.0.0/Script/Hanunoo/symbols');
require('unicode-9.0.0/Script/Hanunoo/regex');

require('unicode-9.0.0/Script/Hatran/code-points');
require('unicode-9.0.0/Script/Hatran/symbols');
require('unicode-9.0.0/Script/Hatran/regex');

require('unicode-9.0.0/Script/Hebrew/code-points');
require('unicode-9.0.0/Script/Hebrew/symbols');
require('unicode-9.0.0/Script/Hebrew/regex');

require('unicode-9.0.0/Script/Hiragana/code-points');
require('unicode-9.0.0/Script/Hiragana/symbols');
require('unicode-9.0.0/Script/Hiragana/regex');

require('unicode-9.0.0/Script/Imperial_Aramaic/code-points');
require('unicode-9.0.0/Script/Imperial_Aramaic/symbols');
require('unicode-9.0.0/Script/Imperial_Aramaic/regex');

require('unicode-9.0.0/Script/Inherited/code-points');
require('unicode-9.0.0/Script/Inherited/symbols');
require('unicode-9.0.0/Script/Inherited/regex');

require('unicode-9.0.0/Script/Inscriptional_Pahlavi/code-points');
require('unicode-9.0.0/Script/Inscriptional_Pahlavi/symbols');
require('unicode-9.0.0/Script/Inscriptional_Pahlavi/regex');

require('unicode-9.0.0/Script/Inscriptional_Parthian/code-points');
require('unicode-9.0.0/Script/Inscriptional_Parthian/symbols');
require('unicode-9.0.0/Script/Inscriptional_Parthian/regex');

require('unicode-9.0.0/Script/Javanese/code-points');
require('unicode-9.0.0/Script/Javanese/symbols');
require('unicode-9.0.0/Script/Javanese/regex');

require('unicode-9.0.0/Script/Kaithi/code-points');
require('unicode-9.0.0/Script/Kaithi/symbols');
require('unicode-9.0.0/Script/Kaithi/regex');

require('unicode-9.0.0/Script/Kannada/code-points');
require('unicode-9.0.0/Script/Kannada/symbols');
require('unicode-9.0.0/Script/Kannada/regex');

require('unicode-9.0.0/Script/Katakana/code-points');
require('unicode-9.0.0/Script/Katakana/symbols');
require('unicode-9.0.0/Script/Katakana/regex');

require('unicode-9.0.0/Script/Kayah_Li/code-points');
require('unicode-9.0.0/Script/Kayah_Li/symbols');
require('unicode-9.0.0/Script/Kayah_Li/regex');

require('unicode-9.0.0/Script/Kharoshthi/code-points');
require('unicode-9.0.0/Script/Kharoshthi/symbols');
require('unicode-9.0.0/Script/Kharoshthi/regex');

require('unicode-9.0.0/Script/Khmer/code-points');
require('unicode-9.0.0/Script/Khmer/symbols');
require('unicode-9.0.0/Script/Khmer/regex');

require('unicode-9.0.0/Script/Khojki/code-points');
require('unicode-9.0.0/Script/Khojki/symbols');
require('unicode-9.0.0/Script/Khojki/regex');

require('unicode-9.0.0/Script/Khudawadi/code-points');
require('unicode-9.0.0/Script/Khudawadi/symbols');
require('unicode-9.0.0/Script/Khudawadi/regex');

require('unicode-9.0.0/Script/Lao/code-points');
require('unicode-9.0.0/Script/Lao/symbols');
require('unicode-9.0.0/Script/Lao/regex');

require('unicode-9.0.0/Script/Latin/code-points');
require('unicode-9.0.0/Script/Latin/symbols');
require('unicode-9.0.0/Script/Latin/regex');

require('unicode-9.0.0/Script/Lepcha/code-points');
require('unicode-9.0.0/Script/Lepcha/symbols');
require('unicode-9.0.0/Script/Lepcha/regex');

require('unicode-9.0.0/Script/Limbu/code-points');
require('unicode-9.0.0/Script/Limbu/symbols');
require('unicode-9.0.0/Script/Limbu/regex');

require('unicode-9.0.0/Script/Linear_A/code-points');
require('unicode-9.0.0/Script/Linear_A/symbols');
require('unicode-9.0.0/Script/Linear_A/regex');

require('unicode-9.0.0/Script/Linear_B/code-points');
require('unicode-9.0.0/Script/Linear_B/symbols');
require('unicode-9.0.0/Script/Linear_B/regex');

require('unicode-9.0.0/Script/Lisu/code-points');
require('unicode-9.0.0/Script/Lisu/symbols');
require('unicode-9.0.0/Script/Lisu/regex');

require('unicode-9.0.0/Script/Lycian/code-points');
require('unicode-9.0.0/Script/Lycian/symbols');
require('unicode-9.0.0/Script/Lycian/regex');

require('unicode-9.0.0/Script/Lydian/code-points');
require('unicode-9.0.0/Script/Lydian/symbols');
require('unicode-9.0.0/Script/Lydian/regex');

require('unicode-9.0.0/Script/Mahajani/code-points');
require('unicode-9.0.0/Script/Mahajani/symbols');
require('unicode-9.0.0/Script/Mahajani/regex');

require('unicode-9.0.0/Script/Malayalam/code-points');
require('unicode-9.0.0/Script/Malayalam/symbols');
require('unicode-9.0.0/Script/Malayalam/regex');

require('unicode-9.0.0/Script/Mandaic/code-points');
require('unicode-9.0.0/Script/Mandaic/symbols');
require('unicode-9.0.0/Script/Mandaic/regex');

require('unicode-9.0.0/Script/Manichaean/code-points');
require('unicode-9.0.0/Script/Manichaean/symbols');
require('unicode-9.0.0/Script/Manichaean/regex');

require('unicode-9.0.0/Script/Marchen/code-points');
require('unicode-9.0.0/Script/Marchen/symbols');
require('unicode-9.0.0/Script/Marchen/regex');

require('unicode-9.0.0/Script/Meetei_Mayek/code-points');
require('unicode-9.0.0/Script/Meetei_Mayek/symbols');
require('unicode-9.0.0/Script/Meetei_Mayek/regex');

require('unicode-9.0.0/Script/Mende_Kikakui/code-points');
require('unicode-9.0.0/Script/Mende_Kikakui/symbols');
require('unicode-9.0.0/Script/Mende_Kikakui/regex');

require('unicode-9.0.0/Script/Meroitic_Cursive/code-points');
require('unicode-9.0.0/Script/Meroitic_Cursive/symbols');
require('unicode-9.0.0/Script/Meroitic_Cursive/regex');

require('unicode-9.0.0/Script/Meroitic_Hieroglyphs/code-points');
require('unicode-9.0.0/Script/Meroitic_Hieroglyphs/symbols');
require('unicode-9.0.0/Script/Meroitic_Hieroglyphs/regex');

require('unicode-9.0.0/Script/Miao/code-points');
require('unicode-9.0.0/Script/Miao/symbols');
require('unicode-9.0.0/Script/Miao/regex');

require('unicode-9.0.0/Script/Modi/code-points');
require('unicode-9.0.0/Script/Modi/symbols');
require('unicode-9.0.0/Script/Modi/regex');

require('unicode-9.0.0/Script/Mongolian/code-points');
require('unicode-9.0.0/Script/Mongolian/symbols');
require('unicode-9.0.0/Script/Mongolian/regex');

require('unicode-9.0.0/Script/Mro/code-points');
require('unicode-9.0.0/Script/Mro/symbols');
require('unicode-9.0.0/Script/Mro/regex');

require('unicode-9.0.0/Script/Multani/code-points');
require('unicode-9.0.0/Script/Multani/symbols');
require('unicode-9.0.0/Script/Multani/regex');

require('unicode-9.0.0/Script/Myanmar/code-points');
require('unicode-9.0.0/Script/Myanmar/symbols');
require('unicode-9.0.0/Script/Myanmar/regex');

require('unicode-9.0.0/Script/Nabataean/code-points');
require('unicode-9.0.0/Script/Nabataean/symbols');
require('unicode-9.0.0/Script/Nabataean/regex');

require('unicode-9.0.0/Script/New_Tai_Lue/code-points');
require('unicode-9.0.0/Script/New_Tai_Lue/symbols');
require('unicode-9.0.0/Script/New_Tai_Lue/regex');

require('unicode-9.0.0/Script/Newa/code-points');
require('unicode-9.0.0/Script/Newa/symbols');
require('unicode-9.0.0/Script/Newa/regex');

require('unicode-9.0.0/Script/Nko/code-points');
require('unicode-9.0.0/Script/Nko/symbols');
require('unicode-9.0.0/Script/Nko/regex');

require('unicode-9.0.0/Script/Ogham/code-points');
require('unicode-9.0.0/Script/Ogham/symbols');
require('unicode-9.0.0/Script/Ogham/regex');

require('unicode-9.0.0/Script/Ol_Chiki/code-points');
require('unicode-9.0.0/Script/Ol_Chiki/symbols');
require('unicode-9.0.0/Script/Ol_Chiki/regex');

require('unicode-9.0.0/Script/Old_Hungarian/code-points');
require('unicode-9.0.0/Script/Old_Hungarian/symbols');
require('unicode-9.0.0/Script/Old_Hungarian/regex');

require('unicode-9.0.0/Script/Old_Italic/code-points');
require('unicode-9.0.0/Script/Old_Italic/symbols');
require('unicode-9.0.0/Script/Old_Italic/regex');

require('unicode-9.0.0/Script/Old_North_Arabian/code-points');
require('unicode-9.0.0/Script/Old_North_Arabian/symbols');
require('unicode-9.0.0/Script/Old_North_Arabian/regex');

require('unicode-9.0.0/Script/Old_Permic/code-points');
require('unicode-9.0.0/Script/Old_Permic/symbols');
require('unicode-9.0.0/Script/Old_Permic/regex');

require('unicode-9.0.0/Script/Old_Persian/code-points');
require('unicode-9.0.0/Script/Old_Persian/symbols');
require('unicode-9.0.0/Script/Old_Persian/regex');

require('unicode-9.0.0/Script/Old_South_Arabian/code-points');
require('unicode-9.0.0/Script/Old_South_Arabian/symbols');
require('unicode-9.0.0/Script/Old_South_Arabian/regex');

require('unicode-9.0.0/Script/Old_Turkic/code-points');
require('unicode-9.0.0/Script/Old_Turkic/symbols');
require('unicode-9.0.0/Script/Old_Turkic/regex');

require('unicode-9.0.0/Script/Oriya/code-points');
require('unicode-9.0.0/Script/Oriya/symbols');
require('unicode-9.0.0/Script/Oriya/regex');

require('unicode-9.0.0/Script/Osage/code-points');
require('unicode-9.0.0/Script/Osage/symbols');
require('unicode-9.0.0/Script/Osage/regex');

require('unicode-9.0.0/Script/Osmanya/code-points');
require('unicode-9.0.0/Script/Osmanya/symbols');
require('unicode-9.0.0/Script/Osmanya/regex');

require('unicode-9.0.0/Script/Pahawh_Hmong/code-points');
require('unicode-9.0.0/Script/Pahawh_Hmong/symbols');
require('unicode-9.0.0/Script/Pahawh_Hmong/regex');

require('unicode-9.0.0/Script/Palmyrene/code-points');
require('unicode-9.0.0/Script/Palmyrene/symbols');
require('unicode-9.0.0/Script/Palmyrene/regex');

require('unicode-9.0.0/Script/Pau_Cin_Hau/code-points');
require('unicode-9.0.0/Script/Pau_Cin_Hau/symbols');
require('unicode-9.0.0/Script/Pau_Cin_Hau/regex');

require('unicode-9.0.0/Script/Phags_Pa/code-points');
require('unicode-9.0.0/Script/Phags_Pa/symbols');
require('unicode-9.0.0/Script/Phags_Pa/regex');

require('unicode-9.0.0/Script/Phoenician/code-points');
require('unicode-9.0.0/Script/Phoenician/symbols');
require('unicode-9.0.0/Script/Phoenician/regex');

require('unicode-9.0.0/Script/Psalter_Pahlavi/code-points');
require('unicode-9.0.0/Script/Psalter_Pahlavi/symbols');
require('unicode-9.0.0/Script/Psalter_Pahlavi/regex');

require('unicode-9.0.0/Script/Rejang/code-points');
require('unicode-9.0.0/Script/Rejang/symbols');
require('unicode-9.0.0/Script/Rejang/regex');

require('unicode-9.0.0/Script/Runic/code-points');
require('unicode-9.0.0/Script/Runic/symbols');
require('unicode-9.0.0/Script/Runic/regex');

require('unicode-9.0.0/Script/Samaritan/code-points');
require('unicode-9.0.0/Script/Samaritan/symbols');
require('unicode-9.0.0/Script/Samaritan/regex');

require('unicode-9.0.0/Script/Saurashtra/code-points');
require('unicode-9.0.0/Script/Saurashtra/symbols');
require('unicode-9.0.0/Script/Saurashtra/regex');

require('unicode-9.0.0/Script/Sharada/code-points');
require('unicode-9.0.0/Script/Sharada/symbols');
require('unicode-9.0.0/Script/Sharada/regex');

require('unicode-9.0.0/Script/Shavian/code-points');
require('unicode-9.0.0/Script/Shavian/symbols');
require('unicode-9.0.0/Script/Shavian/regex');

require('unicode-9.0.0/Script/Siddham/code-points');
require('unicode-9.0.0/Script/Siddham/symbols');
require('unicode-9.0.0/Script/Siddham/regex');

require('unicode-9.0.0/Script/SignWriting/code-points');
require('unicode-9.0.0/Script/SignWriting/symbols');
require('unicode-9.0.0/Script/SignWriting/regex');

require('unicode-9.0.0/Script/Sinhala/code-points');
require('unicode-9.0.0/Script/Sinhala/symbols');
require('unicode-9.0.0/Script/Sinhala/regex');

require('unicode-9.0.0/Script/Sora_Sompeng/code-points');
require('unicode-9.0.0/Script/Sora_Sompeng/symbols');
require('unicode-9.0.0/Script/Sora_Sompeng/regex');

require('unicode-9.0.0/Script/Sundanese/code-points');
require('unicode-9.0.0/Script/Sundanese/symbols');
require('unicode-9.0.0/Script/Sundanese/regex');

require('unicode-9.0.0/Script/Syloti_Nagri/code-points');
require('unicode-9.0.0/Script/Syloti_Nagri/symbols');
require('unicode-9.0.0/Script/Syloti_Nagri/regex');

require('unicode-9.0.0/Script/Syriac/code-points');
require('unicode-9.0.0/Script/Syriac/symbols');
require('unicode-9.0.0/Script/Syriac/regex');

require('unicode-9.0.0/Script/Tagalog/code-points');
require('unicode-9.0.0/Script/Tagalog/symbols');
require('unicode-9.0.0/Script/Tagalog/regex');

require('unicode-9.0.0/Script/Tagbanwa/code-points');
require('unicode-9.0.0/Script/Tagbanwa/symbols');
require('unicode-9.0.0/Script/Tagbanwa/regex');

require('unicode-9.0.0/Script/Tai_Le/code-points');
require('unicode-9.0.0/Script/Tai_Le/symbols');
require('unicode-9.0.0/Script/Tai_Le/regex');

require('unicode-9.0.0/Script/Tai_Tham/code-points');
require('unicode-9.0.0/Script/Tai_Tham/symbols');
require('unicode-9.0.0/Script/Tai_Tham/regex');

require('unicode-9.0.0/Script/Tai_Viet/code-points');
require('unicode-9.0.0/Script/Tai_Viet/symbols');
require('unicode-9.0.0/Script/Tai_Viet/regex');

require('unicode-9.0.0/Script/Takri/code-points');
require('unicode-9.0.0/Script/Takri/symbols');
require('unicode-9.0.0/Script/Takri/regex');

require('unicode-9.0.0/Script/Tamil/code-points');
require('unicode-9.0.0/Script/Tamil/symbols');
require('unicode-9.0.0/Script/Tamil/regex');

require('unicode-9.0.0/Script/Tangut/code-points');
require('unicode-9.0.0/Script/Tangut/symbols');
require('unicode-9.0.0/Script/Tangut/regex');

require('unicode-9.0.0/Script/Telugu/code-points');
require('unicode-9.0.0/Script/Telugu/symbols');
require('unicode-9.0.0/Script/Telugu/regex');

require('unicode-9.0.0/Script/Thaana/code-points');
require('unicode-9.0.0/Script/Thaana/symbols');
require('unicode-9.0.0/Script/Thaana/regex');

require('unicode-9.0.0/Script/Thai/code-points');
require('unicode-9.0.0/Script/Thai/symbols');
require('unicode-9.0.0/Script/Thai/regex');

require('unicode-9.0.0/Script/Tibetan/code-points');
require('unicode-9.0.0/Script/Tibetan/symbols');
require('unicode-9.0.0/Script/Tibetan/regex');

require('unicode-9.0.0/Script/Tifinagh/code-points');
require('unicode-9.0.0/Script/Tifinagh/symbols');
require('unicode-9.0.0/Script/Tifinagh/regex');

require('unicode-9.0.0/Script/Tirhuta/code-points');
require('unicode-9.0.0/Script/Tirhuta/symbols');
require('unicode-9.0.0/Script/Tirhuta/regex');

require('unicode-9.0.0/Script/Ugaritic/code-points');
require('unicode-9.0.0/Script/Ugaritic/symbols');
require('unicode-9.0.0/Script/Ugaritic/regex');

require('unicode-9.0.0/Script/Vai/code-points');
require('unicode-9.0.0/Script/Vai/symbols');
require('unicode-9.0.0/Script/Vai/regex');

require('unicode-9.0.0/Script/Warang_Citi/code-points');
require('unicode-9.0.0/Script/Warang_Citi/symbols');
require('unicode-9.0.0/Script/Warang_Citi/regex');

require('unicode-9.0.0/Script/Yi/code-points');
require('unicode-9.0.0/Script/Yi/symbols');
require('unicode-9.0.0/Script/Yi/regex');

// `Script_Extensions`:

require('unicode-9.0.0/Script_Extensions/Adlam/code-points');
require('unicode-9.0.0/Script_Extensions/Adlam/symbols');
require('unicode-9.0.0/Script_Extensions/Adlam/regex');

require('unicode-9.0.0/Script_Extensions/Ahom/code-points');
require('unicode-9.0.0/Script_Extensions/Ahom/symbols');
require('unicode-9.0.0/Script_Extensions/Ahom/regex');

require('unicode-9.0.0/Script_Extensions/Anatolian_Hieroglyphs/code-points');
require('unicode-9.0.0/Script_Extensions/Anatolian_Hieroglyphs/symbols');
require('unicode-9.0.0/Script_Extensions/Anatolian_Hieroglyphs/regex');

require('unicode-9.0.0/Script_Extensions/Arabic/code-points');
require('unicode-9.0.0/Script_Extensions/Arabic/symbols');
require('unicode-9.0.0/Script_Extensions/Arabic/regex');

require('unicode-9.0.0/Script_Extensions/Armenian/code-points');
require('unicode-9.0.0/Script_Extensions/Armenian/symbols');
require('unicode-9.0.0/Script_Extensions/Armenian/regex');

require('unicode-9.0.0/Script_Extensions/Avestan/code-points');
require('unicode-9.0.0/Script_Extensions/Avestan/symbols');
require('unicode-9.0.0/Script_Extensions/Avestan/regex');

require('unicode-9.0.0/Script_Extensions/Balinese/code-points');
require('unicode-9.0.0/Script_Extensions/Balinese/symbols');
require('unicode-9.0.0/Script_Extensions/Balinese/regex');

require('unicode-9.0.0/Script_Extensions/Bamum/code-points');
require('unicode-9.0.0/Script_Extensions/Bamum/symbols');
require('unicode-9.0.0/Script_Extensions/Bamum/regex');

require('unicode-9.0.0/Script_Extensions/Bassa_Vah/code-points');
require('unicode-9.0.0/Script_Extensions/Bassa_Vah/symbols');
require('unicode-9.0.0/Script_Extensions/Bassa_Vah/regex');

require('unicode-9.0.0/Script_Extensions/Batak/code-points');
require('unicode-9.0.0/Script_Extensions/Batak/symbols');
require('unicode-9.0.0/Script_Extensions/Batak/regex');

require('unicode-9.0.0/Script_Extensions/Bengali/code-points');
require('unicode-9.0.0/Script_Extensions/Bengali/symbols');
require('unicode-9.0.0/Script_Extensions/Bengali/regex');

require('unicode-9.0.0/Script_Extensions/Bhaiksuki/code-points');
require('unicode-9.0.0/Script_Extensions/Bhaiksuki/symbols');
require('unicode-9.0.0/Script_Extensions/Bhaiksuki/regex');

require('unicode-9.0.0/Script_Extensions/Bopomofo/code-points');
require('unicode-9.0.0/Script_Extensions/Bopomofo/symbols');
require('unicode-9.0.0/Script_Extensions/Bopomofo/regex');

require('unicode-9.0.0/Script_Extensions/Brahmi/code-points');
require('unicode-9.0.0/Script_Extensions/Brahmi/symbols');
require('unicode-9.0.0/Script_Extensions/Brahmi/regex');

require('unicode-9.0.0/Script_Extensions/Braille/code-points');
require('unicode-9.0.0/Script_Extensions/Braille/symbols');
require('unicode-9.0.0/Script_Extensions/Braille/regex');

require('unicode-9.0.0/Script_Extensions/Buginese/code-points');
require('unicode-9.0.0/Script_Extensions/Buginese/symbols');
require('unicode-9.0.0/Script_Extensions/Buginese/regex');

require('unicode-9.0.0/Script_Extensions/Buhid/code-points');
require('unicode-9.0.0/Script_Extensions/Buhid/symbols');
require('unicode-9.0.0/Script_Extensions/Buhid/regex');

require('unicode-9.0.0/Script_Extensions/Canadian_Aboriginal/code-points');
require('unicode-9.0.0/Script_Extensions/Canadian_Aboriginal/symbols');
require('unicode-9.0.0/Script_Extensions/Canadian_Aboriginal/regex');

require('unicode-9.0.0/Script_Extensions/Carian/code-points');
require('unicode-9.0.0/Script_Extensions/Carian/symbols');
require('unicode-9.0.0/Script_Extensions/Carian/regex');

require('unicode-9.0.0/Script_Extensions/Caucasian_Albanian/code-points');
require('unicode-9.0.0/Script_Extensions/Caucasian_Albanian/symbols');
require('unicode-9.0.0/Script_Extensions/Caucasian_Albanian/regex');

require('unicode-9.0.0/Script_Extensions/Chakma/code-points');
require('unicode-9.0.0/Script_Extensions/Chakma/symbols');
require('unicode-9.0.0/Script_Extensions/Chakma/regex');

require('unicode-9.0.0/Script_Extensions/Cham/code-points');
require('unicode-9.0.0/Script_Extensions/Cham/symbols');
require('unicode-9.0.0/Script_Extensions/Cham/regex');

require('unicode-9.0.0/Script_Extensions/Cherokee/code-points');
require('unicode-9.0.0/Script_Extensions/Cherokee/symbols');
require('unicode-9.0.0/Script_Extensions/Cherokee/regex');

require('unicode-9.0.0/Script_Extensions/Common/code-points');
require('unicode-9.0.0/Script_Extensions/Common/symbols');
require('unicode-9.0.0/Script_Extensions/Common/regex');

require('unicode-9.0.0/Script_Extensions/Coptic/code-points');
require('unicode-9.0.0/Script_Extensions/Coptic/symbols');
require('unicode-9.0.0/Script_Extensions/Coptic/regex');

require('unicode-9.0.0/Script_Extensions/Cuneiform/code-points');
require('unicode-9.0.0/Script_Extensions/Cuneiform/symbols');
require('unicode-9.0.0/Script_Extensions/Cuneiform/regex');

require('unicode-9.0.0/Script_Extensions/Cypriot/code-points');
require('unicode-9.0.0/Script_Extensions/Cypriot/symbols');
require('unicode-9.0.0/Script_Extensions/Cypriot/regex');

require('unicode-9.0.0/Script_Extensions/Cyrillic/code-points');
require('unicode-9.0.0/Script_Extensions/Cyrillic/symbols');
require('unicode-9.0.0/Script_Extensions/Cyrillic/regex');

require('unicode-9.0.0/Script_Extensions/Deseret/code-points');
require('unicode-9.0.0/Script_Extensions/Deseret/symbols');
require('unicode-9.0.0/Script_Extensions/Deseret/regex');

require('unicode-9.0.0/Script_Extensions/Devanagari/code-points');
require('unicode-9.0.0/Script_Extensions/Devanagari/symbols');
require('unicode-9.0.0/Script_Extensions/Devanagari/regex');

require('unicode-9.0.0/Script_Extensions/Duployan/code-points');
require('unicode-9.0.0/Script_Extensions/Duployan/symbols');
require('unicode-9.0.0/Script_Extensions/Duployan/regex');

require('unicode-9.0.0/Script_Extensions/Egyptian_Hieroglyphs/code-points');
require('unicode-9.0.0/Script_Extensions/Egyptian_Hieroglyphs/symbols');
require('unicode-9.0.0/Script_Extensions/Egyptian_Hieroglyphs/regex');

require('unicode-9.0.0/Script_Extensions/Elbasan/code-points');
require('unicode-9.0.0/Script_Extensions/Elbasan/symbols');
require('unicode-9.0.0/Script_Extensions/Elbasan/regex');

require('unicode-9.0.0/Script_Extensions/Ethiopic/code-points');
require('unicode-9.0.0/Script_Extensions/Ethiopic/symbols');
require('unicode-9.0.0/Script_Extensions/Ethiopic/regex');

require('unicode-9.0.0/Script_Extensions/Georgian/code-points');
require('unicode-9.0.0/Script_Extensions/Georgian/symbols');
require('unicode-9.0.0/Script_Extensions/Georgian/regex');

require('unicode-9.0.0/Script_Extensions/Glagolitic/code-points');
require('unicode-9.0.0/Script_Extensions/Glagolitic/symbols');
require('unicode-9.0.0/Script_Extensions/Glagolitic/regex');

require('unicode-9.0.0/Script_Extensions/Gothic/code-points');
require('unicode-9.0.0/Script_Extensions/Gothic/symbols');
require('unicode-9.0.0/Script_Extensions/Gothic/regex');

require('unicode-9.0.0/Script_Extensions/Grantha/code-points');
require('unicode-9.0.0/Script_Extensions/Grantha/symbols');
require('unicode-9.0.0/Script_Extensions/Grantha/regex');

require('unicode-9.0.0/Script_Extensions/Greek/code-points');
require('unicode-9.0.0/Script_Extensions/Greek/symbols');
require('unicode-9.0.0/Script_Extensions/Greek/regex');

require('unicode-9.0.0/Script_Extensions/Gujarati/code-points');
require('unicode-9.0.0/Script_Extensions/Gujarati/symbols');
require('unicode-9.0.0/Script_Extensions/Gujarati/regex');

require('unicode-9.0.0/Script_Extensions/Gurmukhi/code-points');
require('unicode-9.0.0/Script_Extensions/Gurmukhi/symbols');
require('unicode-9.0.0/Script_Extensions/Gurmukhi/regex');

require('unicode-9.0.0/Script_Extensions/Han/code-points');
require('unicode-9.0.0/Script_Extensions/Han/symbols');
require('unicode-9.0.0/Script_Extensions/Han/regex');

require('unicode-9.0.0/Script_Extensions/Hangul/code-points');
require('unicode-9.0.0/Script_Extensions/Hangul/symbols');
require('unicode-9.0.0/Script_Extensions/Hangul/regex');

require('unicode-9.0.0/Script_Extensions/Hanunoo/code-points');
require('unicode-9.0.0/Script_Extensions/Hanunoo/symbols');
require('unicode-9.0.0/Script_Extensions/Hanunoo/regex');

require('unicode-9.0.0/Script_Extensions/Hatran/code-points');
require('unicode-9.0.0/Script_Extensions/Hatran/symbols');
require('unicode-9.0.0/Script_Extensions/Hatran/regex');

require('unicode-9.0.0/Script_Extensions/Hebrew/code-points');
require('unicode-9.0.0/Script_Extensions/Hebrew/symbols');
require('unicode-9.0.0/Script_Extensions/Hebrew/regex');

require('unicode-9.0.0/Script_Extensions/Hiragana/code-points');
require('unicode-9.0.0/Script_Extensions/Hiragana/symbols');
require('unicode-9.0.0/Script_Extensions/Hiragana/regex');

require('unicode-9.0.0/Script_Extensions/Imperial_Aramaic/code-points');
require('unicode-9.0.0/Script_Extensions/Imperial_Aramaic/symbols');
require('unicode-9.0.0/Script_Extensions/Imperial_Aramaic/regex');

require('unicode-9.0.0/Script_Extensions/Inherited/code-points');
require('unicode-9.0.0/Script_Extensions/Inherited/symbols');
require('unicode-9.0.0/Script_Extensions/Inherited/regex');

require('unicode-9.0.0/Script_Extensions/Inscriptional_Pahlavi/code-points');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Pahlavi/symbols');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Pahlavi/regex');

require('unicode-9.0.0/Script_Extensions/Inscriptional_Parthian/code-points');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Parthian/symbols');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Parthian/regex');

require('unicode-9.0.0/Script_Extensions/Javanese/code-points');
require('unicode-9.0.0/Script_Extensions/Javanese/symbols');
require('unicode-9.0.0/Script_Extensions/Javanese/regex');

require('unicode-9.0.0/Script_Extensions/Kaithi/code-points');
require('unicode-9.0.0/Script_Extensions/Kaithi/symbols');
require('unicode-9.0.0/Script_Extensions/Kaithi/regex');

require('unicode-9.0.0/Script_Extensions/Kannada/code-points');
require('unicode-9.0.0/Script_Extensions/Kannada/symbols');
require('unicode-9.0.0/Script_Extensions/Kannada/regex');

require('unicode-9.0.0/Script_Extensions/Katakana/code-points');
require('unicode-9.0.0/Script_Extensions/Katakana/symbols');
require('unicode-9.0.0/Script_Extensions/Katakana/regex');

require('unicode-9.0.0/Script_Extensions/Kayah_Li/code-points');
require('unicode-9.0.0/Script_Extensions/Kayah_Li/symbols');
require('unicode-9.0.0/Script_Extensions/Kayah_Li/regex');

require('unicode-9.0.0/Script_Extensions/Kharoshthi/code-points');
require('unicode-9.0.0/Script_Extensions/Kharoshthi/symbols');
require('unicode-9.0.0/Script_Extensions/Kharoshthi/regex');

require('unicode-9.0.0/Script_Extensions/Khmer/code-points');
require('unicode-9.0.0/Script_Extensions/Khmer/symbols');
require('unicode-9.0.0/Script_Extensions/Khmer/regex');

require('unicode-9.0.0/Script_Extensions/Khojki/code-points');
require('unicode-9.0.0/Script_Extensions/Khojki/symbols');
require('unicode-9.0.0/Script_Extensions/Khojki/regex');

require('unicode-9.0.0/Script_Extensions/Khudawadi/code-points');
require('unicode-9.0.0/Script_Extensions/Khudawadi/symbols');
require('unicode-9.0.0/Script_Extensions/Khudawadi/regex');

require('unicode-9.0.0/Script_Extensions/Lao/code-points');
require('unicode-9.0.0/Script_Extensions/Lao/symbols');
require('unicode-9.0.0/Script_Extensions/Lao/regex');

require('unicode-9.0.0/Script_Extensions/Latin/code-points');
require('unicode-9.0.0/Script_Extensions/Latin/symbols');
require('unicode-9.0.0/Script_Extensions/Latin/regex');

require('unicode-9.0.0/Script_Extensions/Lepcha/code-points');
require('unicode-9.0.0/Script_Extensions/Lepcha/symbols');
require('unicode-9.0.0/Script_Extensions/Lepcha/regex');

require('unicode-9.0.0/Script_Extensions/Limbu/code-points');
require('unicode-9.0.0/Script_Extensions/Limbu/symbols');
require('unicode-9.0.0/Script_Extensions/Limbu/regex');

require('unicode-9.0.0/Script_Extensions/Linear_A/code-points');
require('unicode-9.0.0/Script_Extensions/Linear_A/symbols');
require('unicode-9.0.0/Script_Extensions/Linear_A/regex');

require('unicode-9.0.0/Script_Extensions/Linear_B/code-points');
require('unicode-9.0.0/Script_Extensions/Linear_B/symbols');
require('unicode-9.0.0/Script_Extensions/Linear_B/regex');

require('unicode-9.0.0/Script_Extensions/Lisu/code-points');
require('unicode-9.0.0/Script_Extensions/Lisu/symbols');
require('unicode-9.0.0/Script_Extensions/Lisu/regex');

require('unicode-9.0.0/Script_Extensions/Lycian/code-points');
require('unicode-9.0.0/Script_Extensions/Lycian/symbols');
require('unicode-9.0.0/Script_Extensions/Lycian/regex');

require('unicode-9.0.0/Script_Extensions/Lydian/code-points');
require('unicode-9.0.0/Script_Extensions/Lydian/symbols');
require('unicode-9.0.0/Script_Extensions/Lydian/regex');

require('unicode-9.0.0/Script_Extensions/Mahajani/code-points');
require('unicode-9.0.0/Script_Extensions/Mahajani/symbols');
require('unicode-9.0.0/Script_Extensions/Mahajani/regex');

require('unicode-9.0.0/Script_Extensions/Malayalam/code-points');
require('unicode-9.0.0/Script_Extensions/Malayalam/symbols');
require('unicode-9.0.0/Script_Extensions/Malayalam/regex');

require('unicode-9.0.0/Script_Extensions/Mandaic/code-points');
require('unicode-9.0.0/Script_Extensions/Mandaic/symbols');
require('unicode-9.0.0/Script_Extensions/Mandaic/regex');

require('unicode-9.0.0/Script_Extensions/Manichaean/code-points');
require('unicode-9.0.0/Script_Extensions/Manichaean/symbols');
require('unicode-9.0.0/Script_Extensions/Manichaean/regex');

require('unicode-9.0.0/Script_Extensions/Marchen/code-points');
require('unicode-9.0.0/Script_Extensions/Marchen/symbols');
require('unicode-9.0.0/Script_Extensions/Marchen/regex');

require('unicode-9.0.0/Script_Extensions/Meetei_Mayek/code-points');
require('unicode-9.0.0/Script_Extensions/Meetei_Mayek/symbols');
require('unicode-9.0.0/Script_Extensions/Meetei_Mayek/regex');

require('unicode-9.0.0/Script_Extensions/Mende_Kikakui/code-points');
require('unicode-9.0.0/Script_Extensions/Mende_Kikakui/symbols');
require('unicode-9.0.0/Script_Extensions/Mende_Kikakui/regex');

require('unicode-9.0.0/Script_Extensions/Meroitic_Cursive/code-points');
require('unicode-9.0.0/Script_Extensions/Meroitic_Cursive/symbols');
require('unicode-9.0.0/Script_Extensions/Meroitic_Cursive/regex');

require('unicode-9.0.0/Script_Extensions/Meroitic_Hieroglyphs/code-points');
require('unicode-9.0.0/Script_Extensions/Meroitic_Hieroglyphs/symbols');
require('unicode-9.0.0/Script_Extensions/Meroitic_Hieroglyphs/regex');

require('unicode-9.0.0/Script_Extensions/Miao/code-points');
require('unicode-9.0.0/Script_Extensions/Miao/symbols');
require('unicode-9.0.0/Script_Extensions/Miao/regex');

require('unicode-9.0.0/Script_Extensions/Modi/code-points');
require('unicode-9.0.0/Script_Extensions/Modi/symbols');
require('unicode-9.0.0/Script_Extensions/Modi/regex');

require('unicode-9.0.0/Script_Extensions/Mongolian/code-points');
require('unicode-9.0.0/Script_Extensions/Mongolian/symbols');
require('unicode-9.0.0/Script_Extensions/Mongolian/regex');

require('unicode-9.0.0/Script_Extensions/Mro/code-points');
require('unicode-9.0.0/Script_Extensions/Mro/symbols');
require('unicode-9.0.0/Script_Extensions/Mro/regex');

require('unicode-9.0.0/Script_Extensions/Multani/code-points');
require('unicode-9.0.0/Script_Extensions/Multani/symbols');
require('unicode-9.0.0/Script_Extensions/Multani/regex');

require('unicode-9.0.0/Script_Extensions/Myanmar/code-points');
require('unicode-9.0.0/Script_Extensions/Myanmar/symbols');
require('unicode-9.0.0/Script_Extensions/Myanmar/regex');

require('unicode-9.0.0/Script_Extensions/Nabataean/code-points');
require('unicode-9.0.0/Script_Extensions/Nabataean/symbols');
require('unicode-9.0.0/Script_Extensions/Nabataean/regex');

require('unicode-9.0.0/Script_Extensions/New_Tai_Lue/code-points');
require('unicode-9.0.0/Script_Extensions/New_Tai_Lue/symbols');
require('unicode-9.0.0/Script_Extensions/New_Tai_Lue/regex');

require('unicode-9.0.0/Script_Extensions/Newa/code-points');
require('unicode-9.0.0/Script_Extensions/Newa/symbols');
require('unicode-9.0.0/Script_Extensions/Newa/regex');

require('unicode-9.0.0/Script_Extensions/Nko/code-points');
require('unicode-9.0.0/Script_Extensions/Nko/symbols');
require('unicode-9.0.0/Script_Extensions/Nko/regex');

require('unicode-9.0.0/Script_Extensions/Ogham/code-points');
require('unicode-9.0.0/Script_Extensions/Ogham/symbols');
require('unicode-9.0.0/Script_Extensions/Ogham/regex');

require('unicode-9.0.0/Script_Extensions/Ol_Chiki/code-points');
require('unicode-9.0.0/Script_Extensions/Ol_Chiki/symbols');
require('unicode-9.0.0/Script_Extensions/Ol_Chiki/regex');

require('unicode-9.0.0/Script_Extensions/Old_Hungarian/code-points');
require('unicode-9.0.0/Script_Extensions/Old_Hungarian/symbols');
require('unicode-9.0.0/Script_Extensions/Old_Hungarian/regex');

require('unicode-9.0.0/Script_Extensions/Old_Italic/code-points');
require('unicode-9.0.0/Script_Extensions/Old_Italic/symbols');
require('unicode-9.0.0/Script_Extensions/Old_Italic/regex');

require('unicode-9.0.0/Script_Extensions/Old_North_Arabian/code-points');
require('unicode-9.0.0/Script_Extensions/Old_North_Arabian/symbols');
require('unicode-9.0.0/Script_Extensions/Old_North_Arabian/regex');

require('unicode-9.0.0/Script_Extensions/Old_Permic/code-points');
require('unicode-9.0.0/Script_Extensions/Old_Permic/symbols');
require('unicode-9.0.0/Script_Extensions/Old_Permic/regex');

require('unicode-9.0.0/Script_Extensions/Old_Persian/code-points');
require('unicode-9.0.0/Script_Extensions/Old_Persian/symbols');
require('unicode-9.0.0/Script_Extensions/Old_Persian/regex');

require('unicode-9.0.0/Script_Extensions/Old_South_Arabian/code-points');
require('unicode-9.0.0/Script_Extensions/Old_South_Arabian/symbols');
require('unicode-9.0.0/Script_Extensions/Old_South_Arabian/regex');

require('unicode-9.0.0/Script_Extensions/Old_Turkic/code-points');
require('unicode-9.0.0/Script_Extensions/Old_Turkic/symbols');
require('unicode-9.0.0/Script_Extensions/Old_Turkic/regex');

require('unicode-9.0.0/Script_Extensions/Oriya/code-points');
require('unicode-9.0.0/Script_Extensions/Oriya/symbols');
require('unicode-9.0.0/Script_Extensions/Oriya/regex');

require('unicode-9.0.0/Script_Extensions/Osage/code-points');
require('unicode-9.0.0/Script_Extensions/Osage/symbols');
require('unicode-9.0.0/Script_Extensions/Osage/regex');

require('unicode-9.0.0/Script_Extensions/Osmanya/code-points');
require('unicode-9.0.0/Script_Extensions/Osmanya/symbols');
require('unicode-9.0.0/Script_Extensions/Osmanya/regex');

require('unicode-9.0.0/Script_Extensions/Pahawh_Hmong/code-points');
require('unicode-9.0.0/Script_Extensions/Pahawh_Hmong/symbols');
require('unicode-9.0.0/Script_Extensions/Pahawh_Hmong/regex');

require('unicode-9.0.0/Script_Extensions/Palmyrene/code-points');
require('unicode-9.0.0/Script_Extensions/Palmyrene/symbols');
require('unicode-9.0.0/Script_Extensions/Palmyrene/regex');

require('unicode-9.0.0/Script_Extensions/Pau_Cin_Hau/code-points');
require('unicode-9.0.0/Script_Extensions/Pau_Cin_Hau/symbols');
require('unicode-9.0.0/Script_Extensions/Pau_Cin_Hau/regex');

require('unicode-9.0.0/Script_Extensions/Phags_Pa/code-points');
require('unicode-9.0.0/Script_Extensions/Phags_Pa/symbols');
require('unicode-9.0.0/Script_Extensions/Phags_Pa/regex');

require('unicode-9.0.0/Script_Extensions/Phoenician/code-points');
require('unicode-9.0.0/Script_Extensions/Phoenician/symbols');
require('unicode-9.0.0/Script_Extensions/Phoenician/regex');

require('unicode-9.0.0/Script_Extensions/Psalter_Pahlavi/code-points');
require('unicode-9.0.0/Script_Extensions/Psalter_Pahlavi/symbols');
require('unicode-9.0.0/Script_Extensions/Psalter_Pahlavi/regex');

require('unicode-9.0.0/Script_Extensions/Rejang/code-points');
require('unicode-9.0.0/Script_Extensions/Rejang/symbols');
require('unicode-9.0.0/Script_Extensions/Rejang/regex');

require('unicode-9.0.0/Script_Extensions/Runic/code-points');
require('unicode-9.0.0/Script_Extensions/Runic/symbols');
require('unicode-9.0.0/Script_Extensions/Runic/regex');

require('unicode-9.0.0/Script_Extensions/Samaritan/code-points');
require('unicode-9.0.0/Script_Extensions/Samaritan/symbols');
require('unicode-9.0.0/Script_Extensions/Samaritan/regex');

require('unicode-9.0.0/Script_Extensions/Saurashtra/code-points');
require('unicode-9.0.0/Script_Extensions/Saurashtra/symbols');
require('unicode-9.0.0/Script_Extensions/Saurashtra/regex');

require('unicode-9.0.0/Script_Extensions/Sharada/code-points');
require('unicode-9.0.0/Script_Extensions/Sharada/symbols');
require('unicode-9.0.0/Script_Extensions/Sharada/regex');

require('unicode-9.0.0/Script_Extensions/Shavian/code-points');
require('unicode-9.0.0/Script_Extensions/Shavian/symbols');
require('unicode-9.0.0/Script_Extensions/Shavian/regex');

require('unicode-9.0.0/Script_Extensions/Siddham/code-points');
require('unicode-9.0.0/Script_Extensions/Siddham/symbols');
require('unicode-9.0.0/Script_Extensions/Siddham/regex');

require('unicode-9.0.0/Script_Extensions/SignWriting/code-points');
require('unicode-9.0.0/Script_Extensions/SignWriting/symbols');
require('unicode-9.0.0/Script_Extensions/SignWriting/regex');

require('unicode-9.0.0/Script_Extensions/Sinhala/code-points');
require('unicode-9.0.0/Script_Extensions/Sinhala/symbols');
require('unicode-9.0.0/Script_Extensions/Sinhala/regex');

require('unicode-9.0.0/Script_Extensions/Sora_Sompeng/code-points');
require('unicode-9.0.0/Script_Extensions/Sora_Sompeng/symbols');
require('unicode-9.0.0/Script_Extensions/Sora_Sompeng/regex');

require('unicode-9.0.0/Script_Extensions/Sundanese/code-points');
require('unicode-9.0.0/Script_Extensions/Sundanese/symbols');
require('unicode-9.0.0/Script_Extensions/Sundanese/regex');

require('unicode-9.0.0/Script_Extensions/Syloti_Nagri/code-points');
require('unicode-9.0.0/Script_Extensions/Syloti_Nagri/symbols');
require('unicode-9.0.0/Script_Extensions/Syloti_Nagri/regex');

require('unicode-9.0.0/Script_Extensions/Syriac/code-points');
require('unicode-9.0.0/Script_Extensions/Syriac/symbols');
require('unicode-9.0.0/Script_Extensions/Syriac/regex');

require('unicode-9.0.0/Script_Extensions/Tagalog/code-points');
require('unicode-9.0.0/Script_Extensions/Tagalog/symbols');
require('unicode-9.0.0/Script_Extensions/Tagalog/regex');

require('unicode-9.0.0/Script_Extensions/Tagbanwa/code-points');
require('unicode-9.0.0/Script_Extensions/Tagbanwa/symbols');
require('unicode-9.0.0/Script_Extensions/Tagbanwa/regex');

require('unicode-9.0.0/Script_Extensions/Tai_Le/code-points');
require('unicode-9.0.0/Script_Extensions/Tai_Le/symbols');
require('unicode-9.0.0/Script_Extensions/Tai_Le/regex');

require('unicode-9.0.0/Script_Extensions/Tai_Tham/code-points');
require('unicode-9.0.0/Script_Extensions/Tai_Tham/symbols');
require('unicode-9.0.0/Script_Extensions/Tai_Tham/regex');

require('unicode-9.0.0/Script_Extensions/Tai_Viet/code-points');
require('unicode-9.0.0/Script_Extensions/Tai_Viet/symbols');
require('unicode-9.0.0/Script_Extensions/Tai_Viet/regex');

require('unicode-9.0.0/Script_Extensions/Takri/code-points');
require('unicode-9.0.0/Script_Extensions/Takri/symbols');
require('unicode-9.0.0/Script_Extensions/Takri/regex');

require('unicode-9.0.0/Script_Extensions/Tamil/code-points');
require('unicode-9.0.0/Script_Extensions/Tamil/symbols');
require('unicode-9.0.0/Script_Extensions/Tamil/regex');

require('unicode-9.0.0/Script_Extensions/Tangut/code-points');
require('unicode-9.0.0/Script_Extensions/Tangut/symbols');
require('unicode-9.0.0/Script_Extensions/Tangut/regex');

require('unicode-9.0.0/Script_Extensions/Telugu/code-points');
require('unicode-9.0.0/Script_Extensions/Telugu/symbols');
require('unicode-9.0.0/Script_Extensions/Telugu/regex');

require('unicode-9.0.0/Script_Extensions/Thaana/code-points');
require('unicode-9.0.0/Script_Extensions/Thaana/symbols');
require('unicode-9.0.0/Script_Extensions/Thaana/regex');

require('unicode-9.0.0/Script_Extensions/Thai/code-points');
require('unicode-9.0.0/Script_Extensions/Thai/symbols');
require('unicode-9.0.0/Script_Extensions/Thai/regex');

require('unicode-9.0.0/Script_Extensions/Tibetan/code-points');
require('unicode-9.0.0/Script_Extensions/Tibetan/symbols');
require('unicode-9.0.0/Script_Extensions/Tibetan/regex');

require('unicode-9.0.0/Script_Extensions/Tifinagh/code-points');
require('unicode-9.0.0/Script_Extensions/Tifinagh/symbols');
require('unicode-9.0.0/Script_Extensions/Tifinagh/regex');

require('unicode-9.0.0/Script_Extensions/Tirhuta/code-points');
require('unicode-9.0.0/Script_Extensions/Tirhuta/symbols');
require('unicode-9.0.0/Script_Extensions/Tirhuta/regex');

require('unicode-9.0.0/Script_Extensions/Ugaritic/code-points');
require('unicode-9.0.0/Script_Extensions/Ugaritic/symbols');
require('unicode-9.0.0/Script_Extensions/Ugaritic/regex');

require('unicode-9.0.0/Script_Extensions/Vai/code-points');
require('unicode-9.0.0/Script_Extensions/Vai/symbols');
require('unicode-9.0.0/Script_Extensions/Vai/regex');

require('unicode-9.0.0/Script_Extensions/Warang_Citi/code-points');
require('unicode-9.0.0/Script_Extensions/Warang_Citi/symbols');
require('unicode-9.0.0/Script_Extensions/Warang_Citi/regex');

require('unicode-9.0.0/Script_Extensions/Yi/code-points');
require('unicode-9.0.0/Script_Extensions/Yi/symbols');
require('unicode-9.0.0/Script_Extensions/Yi/regex');

// `Case_Folding`:

require('unicode-9.0.0/Case_Folding/C/code-points'); // lookup map from code point to code point
require('unicode-9.0.0/Case_Folding/C/code-points').get(codePoint);
require('unicode-9.0.0/Case_Folding/C/symbols'); // lookup map from symbol to symbol
require('unicode-9.0.0/Case_Folding/C/symbols').get(symbol);

require('unicode-9.0.0/Case_Folding/F/code-points'); // lookup map from code point to code point
require('unicode-9.0.0/Case_Folding/F/code-points').get(codePoint);
require('unicode-9.0.0/Case_Folding/F/symbols'); // lookup map from symbol to symbol
require('unicode-9.0.0/Case_Folding/F/symbols').get(symbol);

require('unicode-9.0.0/Case_Folding/S/code-points'); // lookup map from code point to code point
require('unicode-9.0.0/Case_Folding/S/code-points').get(codePoint);
require('unicode-9.0.0/Case_Folding/S/symbols'); // lookup map from symbol to symbol
require('unicode-9.0.0/Case_Folding/S/symbols').get(symbol);

require('unicode-9.0.0/Case_Folding/T/code-points'); // lookup map from code point to code point
require('unicode-9.0.0/Case_Folding/T/code-points').get(codePoint);
require('unicode-9.0.0/Case_Folding/T/symbols'); // lookup map from symbol to symbol
require('unicode-9.0.0/Case_Folding/T/symbols').get(symbol);

// `Block`:

require('unicode-9.0.0/Block/Adlam/code-points');
require('unicode-9.0.0/Block/Adlam/symbols');
require('unicode-9.0.0/Block/Adlam/regex');

require('unicode-9.0.0/Block/Aegean_Numbers/code-points');
require('unicode-9.0.0/Block/Aegean_Numbers/symbols');
require('unicode-9.0.0/Block/Aegean_Numbers/regex');

require('unicode-9.0.0/Block/Ahom/code-points');
require('unicode-9.0.0/Block/Ahom/symbols');
require('unicode-9.0.0/Block/Ahom/regex');

require('unicode-9.0.0/Block/Alchemical_Symbols/code-points');
require('unicode-9.0.0/Block/Alchemical_Symbols/symbols');
require('unicode-9.0.0/Block/Alchemical_Symbols/regex');

require('unicode-9.0.0/Block/Alphabetic_Presentation_Forms/code-points');
require('unicode-9.0.0/Block/Alphabetic_Presentation_Forms/symbols');
require('unicode-9.0.0/Block/Alphabetic_Presentation_Forms/regex');

require('unicode-9.0.0/Block/Anatolian_Hieroglyphs/code-points');
require('unicode-9.0.0/Block/Anatolian_Hieroglyphs/symbols');
require('unicode-9.0.0/Block/Anatolian_Hieroglyphs/regex');

require('unicode-9.0.0/Block/Ancient_Greek_Musical_Notation/code-points');
require('unicode-9.0.0/Block/Ancient_Greek_Musical_Notation/symbols');
require('unicode-9.0.0/Block/Ancient_Greek_Musical_Notation/regex');

require('unicode-9.0.0/Block/Ancient_Greek_Numbers/code-points');
require('unicode-9.0.0/Block/Ancient_Greek_Numbers/symbols');
require('unicode-9.0.0/Block/Ancient_Greek_Numbers/regex');

require('unicode-9.0.0/Block/Ancient_Symbols/code-points');
require('unicode-9.0.0/Block/Ancient_Symbols/symbols');
require('unicode-9.0.0/Block/Ancient_Symbols/regex');

require('unicode-9.0.0/Block/Arabic/code-points');
require('unicode-9.0.0/Block/Arabic/symbols');
require('unicode-9.0.0/Block/Arabic/regex');

require('unicode-9.0.0/Block/Arabic_Extended_A/code-points');
require('unicode-9.0.0/Block/Arabic_Extended_A/symbols');
require('unicode-9.0.0/Block/Arabic_Extended_A/regex');

require('unicode-9.0.0/Block/Arabic_Mathematical_Alphabetic_Symbols/code-points');
require('unicode-9.0.0/Block/Arabic_Mathematical_Alphabetic_Symbols/symbols');
require('unicode-9.0.0/Block/Arabic_Mathematical_Alphabetic_Symbols/regex');

require('unicode-9.0.0/Block/Arabic_Presentation_Forms_A/code-points');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_A/symbols');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_A/regex');

require('unicode-9.0.0/Block/Arabic_Presentation_Forms_B/code-points');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_B/symbols');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_B/regex');

require('unicode-9.0.0/Block/Arabic_Supplement/code-points');
require('unicode-9.0.0/Block/Arabic_Supplement/symbols');
require('unicode-9.0.0/Block/Arabic_Supplement/regex');

require('unicode-9.0.0/Block/Armenian/code-points');
require('unicode-9.0.0/Block/Armenian/symbols');
require('unicode-9.0.0/Block/Armenian/regex');

require('unicode-9.0.0/Block/Arrows/code-points');
require('unicode-9.0.0/Block/Arrows/symbols');
require('unicode-9.0.0/Block/Arrows/regex');

require('unicode-9.0.0/Block/Avestan/code-points');
require('unicode-9.0.0/Block/Avestan/symbols');
require('unicode-9.0.0/Block/Avestan/regex');

require('unicode-9.0.0/Block/Balinese/code-points');
require('unicode-9.0.0/Block/Balinese/symbols');
require('unicode-9.0.0/Block/Balinese/regex');

require('unicode-9.0.0/Block/Bamum/code-points');
require('unicode-9.0.0/Block/Bamum/symbols');
require('unicode-9.0.0/Block/Bamum/regex');

require('unicode-9.0.0/Block/Bamum_Supplement/code-points');
require('unicode-9.0.0/Block/Bamum_Supplement/symbols');
require('unicode-9.0.0/Block/Bamum_Supplement/regex');

require('unicode-9.0.0/Block/Basic_Latin/code-points');
require('unicode-9.0.0/Block/Basic_Latin/symbols');
require('unicode-9.0.0/Block/Basic_Latin/regex');

require('unicode-9.0.0/Block/Bassa_Vah/code-points');
require('unicode-9.0.0/Block/Bassa_Vah/symbols');
require('unicode-9.0.0/Block/Bassa_Vah/regex');

require('unicode-9.0.0/Block/Batak/code-points');
require('unicode-9.0.0/Block/Batak/symbols');
require('unicode-9.0.0/Block/Batak/regex');

require('unicode-9.0.0/Block/Bengali/code-points');
require('unicode-9.0.0/Block/Bengali/symbols');
require('unicode-9.0.0/Block/Bengali/regex');

require('unicode-9.0.0/Block/Bhaiksuki/code-points');
require('unicode-9.0.0/Block/Bhaiksuki/symbols');
require('unicode-9.0.0/Block/Bhaiksuki/regex');

require('unicode-9.0.0/Block/Block_Elements/code-points');
require('unicode-9.0.0/Block/Block_Elements/symbols');
require('unicode-9.0.0/Block/Block_Elements/regex');

require('unicode-9.0.0/Block/Bopomofo/code-points');
require('unicode-9.0.0/Block/Bopomofo/symbols');
require('unicode-9.0.0/Block/Bopomofo/regex');

require('unicode-9.0.0/Block/Bopomofo_Extended/code-points');
require('unicode-9.0.0/Block/Bopomofo_Extended/symbols');
require('unicode-9.0.0/Block/Bopomofo_Extended/regex');

require('unicode-9.0.0/Block/Box_Drawing/code-points');
require('unicode-9.0.0/Block/Box_Drawing/symbols');
require('unicode-9.0.0/Block/Box_Drawing/regex');

require('unicode-9.0.0/Block/Brahmi/code-points');
require('unicode-9.0.0/Block/Brahmi/symbols');
require('unicode-9.0.0/Block/Brahmi/regex');

require('unicode-9.0.0/Block/Braille_Patterns/code-points');
require('unicode-9.0.0/Block/Braille_Patterns/symbols');
require('unicode-9.0.0/Block/Braille_Patterns/regex');

require('unicode-9.0.0/Block/Buginese/code-points');
require('unicode-9.0.0/Block/Buginese/symbols');
require('unicode-9.0.0/Block/Buginese/regex');

require('unicode-9.0.0/Block/Buhid/code-points');
require('unicode-9.0.0/Block/Buhid/symbols');
require('unicode-9.0.0/Block/Buhid/regex');

require('unicode-9.0.0/Block/Byzantine_Musical_Symbols/code-points');
require('unicode-9.0.0/Block/Byzantine_Musical_Symbols/symbols');
require('unicode-9.0.0/Block/Byzantine_Musical_Symbols/regex');

require('unicode-9.0.0/Block/CJK_Compatibility/code-points');
require('unicode-9.0.0/Block/CJK_Compatibility/symbols');
require('unicode-9.0.0/Block/CJK_Compatibility/regex');

require('unicode-9.0.0/Block/CJK_Compatibility_Forms/code-points');
require('unicode-9.0.0/Block/CJK_Compatibility_Forms/symbols');
require('unicode-9.0.0/Block/CJK_Compatibility_Forms/regex');

require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs/code-points');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs/symbols');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs/regex');

require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs_Supplement/code-points');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs_Supplement/symbols');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs_Supplement/regex');

require('unicode-9.0.0/Block/CJK_Radicals_Supplement/code-points');
require('unicode-9.0.0/Block/CJK_Radicals_Supplement/symbols');
require('unicode-9.0.0/Block/CJK_Radicals_Supplement/regex');

require('unicode-9.0.0/Block/CJK_Strokes/code-points');
require('unicode-9.0.0/Block/CJK_Strokes/symbols');
require('unicode-9.0.0/Block/CJK_Strokes/regex');

require('unicode-9.0.0/Block/CJK_Symbols_And_Punctuation/code-points');
require('unicode-9.0.0/Block/CJK_Symbols_And_Punctuation/symbols');
require('unicode-9.0.0/Block/CJK_Symbols_And_Punctuation/regex');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs/code-points');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs/symbols');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs/regex');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_A/code-points');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_A/symbols');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_A/regex');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_B/code-points');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_B/symbols');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_B/regex');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_C/code-points');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_C/symbols');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_C/regex');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_D/code-points');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_D/symbols');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_D/regex');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_E/code-points');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_E/symbols');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_E/regex');

require('unicode-9.0.0/Block/Carian/code-points');
require('unicode-9.0.0/Block/Carian/symbols');
require('unicode-9.0.0/Block/Carian/regex');

require('unicode-9.0.0/Block/Caucasian_Albanian/code-points');
require('unicode-9.0.0/Block/Caucasian_Albanian/symbols');
require('unicode-9.0.0/Block/Caucasian_Albanian/regex');

require('unicode-9.0.0/Block/Chakma/code-points');
require('unicode-9.0.0/Block/Chakma/symbols');
require('unicode-9.0.0/Block/Chakma/regex');

require('unicode-9.0.0/Block/Cham/code-points');
require('unicode-9.0.0/Block/Cham/symbols');
require('unicode-9.0.0/Block/Cham/regex');

require('unicode-9.0.0/Block/Cherokee/code-points');
require('unicode-9.0.0/Block/Cherokee/symbols');
require('unicode-9.0.0/Block/Cherokee/regex');

require('unicode-9.0.0/Block/Cherokee_Supplement/code-points');
require('unicode-9.0.0/Block/Cherokee_Supplement/symbols');
require('unicode-9.0.0/Block/Cherokee_Supplement/regex');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks/code-points');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks/symbols');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks/regex');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Extended/code-points');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Extended/symbols');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Extended/regex');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks_For_Symbols/code-points');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_For_Symbols/symbols');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_For_Symbols/regex');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Supplement/code-points');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Supplement/symbols');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Supplement/regex');

require('unicode-9.0.0/Block/Combining_Half_Marks/code-points');
require('unicode-9.0.0/Block/Combining_Half_Marks/symbols');
require('unicode-9.0.0/Block/Combining_Half_Marks/regex');

require('unicode-9.0.0/Block/Common_Indic_Number_Forms/code-points');
require('unicode-9.0.0/Block/Common_Indic_Number_Forms/symbols');
require('unicode-9.0.0/Block/Common_Indic_Number_Forms/regex');

require('unicode-9.0.0/Block/Control_Pictures/code-points');
require('unicode-9.0.0/Block/Control_Pictures/symbols');
require('unicode-9.0.0/Block/Control_Pictures/regex');

require('unicode-9.0.0/Block/Coptic/code-points');
require('unicode-9.0.0/Block/Coptic/symbols');
require('unicode-9.0.0/Block/Coptic/regex');

require('unicode-9.0.0/Block/Coptic_Epact_Numbers/code-points');
require('unicode-9.0.0/Block/Coptic_Epact_Numbers/symbols');
require('unicode-9.0.0/Block/Coptic_Epact_Numbers/regex');

require('unicode-9.0.0/Block/Counting_Rod_Numerals/code-points');
require('unicode-9.0.0/Block/Counting_Rod_Numerals/symbols');
require('unicode-9.0.0/Block/Counting_Rod_Numerals/regex');

require('unicode-9.0.0/Block/Cuneiform/code-points');
require('unicode-9.0.0/Block/Cuneiform/symbols');
require('unicode-9.0.0/Block/Cuneiform/regex');

require('unicode-9.0.0/Block/Cuneiform_Numbers_And_Punctuation/code-points');
require('unicode-9.0.0/Block/Cuneiform_Numbers_And_Punctuation/symbols');
require('unicode-9.0.0/Block/Cuneiform_Numbers_And_Punctuation/regex');

require('unicode-9.0.0/Block/Currency_Symbols/code-points');
require('unicode-9.0.0/Block/Currency_Symbols/symbols');
require('unicode-9.0.0/Block/Currency_Symbols/regex');

require('unicode-9.0.0/Block/Cypriot_Syllabary/code-points');
require('unicode-9.0.0/Block/Cypriot_Syllabary/symbols');
require('unicode-9.0.0/Block/Cypriot_Syllabary/regex');

require('unicode-9.0.0/Block/Cyrillic/code-points');
require('unicode-9.0.0/Block/Cyrillic/symbols');
require('unicode-9.0.0/Block/Cyrillic/regex');

require('unicode-9.0.0/Block/Cyrillic_Extended_A/code-points');
require('unicode-9.0.0/Block/Cyrillic_Extended_A/symbols');
require('unicode-9.0.0/Block/Cyrillic_Extended_A/regex');

require('unicode-9.0.0/Block/Cyrillic_Extended_B/code-points');
require('unicode-9.0.0/Block/Cyrillic_Extended_B/symbols');
require('unicode-9.0.0/Block/Cyrillic_Extended_B/regex');

require('unicode-9.0.0/Block/Cyrillic_Extended_C/code-points');
require('unicode-9.0.0/Block/Cyrillic_Extended_C/symbols');
require('unicode-9.0.0/Block/Cyrillic_Extended_C/regex');

require('unicode-9.0.0/Block/Cyrillic_Supplement/code-points');
require('unicode-9.0.0/Block/Cyrillic_Supplement/symbols');
require('unicode-9.0.0/Block/Cyrillic_Supplement/regex');

require('unicode-9.0.0/Block/Deseret/code-points');
require('unicode-9.0.0/Block/Deseret/symbols');
require('unicode-9.0.0/Block/Deseret/regex');

require('unicode-9.0.0/Block/Devanagari/code-points');
require('unicode-9.0.0/Block/Devanagari/symbols');
require('unicode-9.0.0/Block/Devanagari/regex');

require('unicode-9.0.0/Block/Devanagari_Extended/code-points');
require('unicode-9.0.0/Block/Devanagari_Extended/symbols');
require('unicode-9.0.0/Block/Devanagari_Extended/regex');

require('unicode-9.0.0/Block/Dingbats/code-points');
require('unicode-9.0.0/Block/Dingbats/symbols');
require('unicode-9.0.0/Block/Dingbats/regex');

require('unicode-9.0.0/Block/Domino_Tiles/code-points');
require('unicode-9.0.0/Block/Domino_Tiles/symbols');
require('unicode-9.0.0/Block/Domino_Tiles/regex');

require('unicode-9.0.0/Block/Duployan/code-points');
require('unicode-9.0.0/Block/Duployan/symbols');
require('unicode-9.0.0/Block/Duployan/regex');

require('unicode-9.0.0/Block/Early_Dynastic_Cuneiform/code-points');
require('unicode-9.0.0/Block/Early_Dynastic_Cuneiform/symbols');
require('unicode-9.0.0/Block/Early_Dynastic_Cuneiform/regex');

require('unicode-9.0.0/Block/Egyptian_Hieroglyphs/code-points');
require('unicode-9.0.0/Block/Egyptian_Hieroglyphs/symbols');
require('unicode-9.0.0/Block/Egyptian_Hieroglyphs/regex');

require('unicode-9.0.0/Block/Elbasan/code-points');
require('unicode-9.0.0/Block/Elbasan/symbols');
require('unicode-9.0.0/Block/Elbasan/regex');

require('unicode-9.0.0/Block/Emoticons/code-points');
require('unicode-9.0.0/Block/Emoticons/symbols');
require('unicode-9.0.0/Block/Emoticons/regex');

require('unicode-9.0.0/Block/Enclosed_Alphanumeric_Supplement/code-points');
require('unicode-9.0.0/Block/Enclosed_Alphanumeric_Supplement/symbols');
require('unicode-9.0.0/Block/Enclosed_Alphanumeric_Supplement/regex');

require('unicode-9.0.0/Block/Enclosed_Alphanumerics/code-points');
require('unicode-9.0.0/Block/Enclosed_Alphanumerics/symbols');
require('unicode-9.0.0/Block/Enclosed_Alphanumerics/regex');

require('unicode-9.0.0/Block/Enclosed_CJK_Letters_And_Months/code-points');
require('unicode-9.0.0/Block/Enclosed_CJK_Letters_And_Months/symbols');
require('unicode-9.0.0/Block/Enclosed_CJK_Letters_And_Months/regex');

require('unicode-9.0.0/Block/Enclosed_Ideographic_Supplement/code-points');
require('unicode-9.0.0/Block/Enclosed_Ideographic_Supplement/symbols');
require('unicode-9.0.0/Block/Enclosed_Ideographic_Supplement/regex');

require('unicode-9.0.0/Block/Ethiopic/code-points');
require('unicode-9.0.0/Block/Ethiopic/symbols');
require('unicode-9.0.0/Block/Ethiopic/regex');

require('unicode-9.0.0/Block/Ethiopic_Extended/code-points');
require('unicode-9.0.0/Block/Ethiopic_Extended/symbols');
require('unicode-9.0.0/Block/Ethiopic_Extended/regex');

require('unicode-9.0.0/Block/Ethiopic_Extended_A/code-points');
require('unicode-9.0.0/Block/Ethiopic_Extended_A/symbols');
require('unicode-9.0.0/Block/Ethiopic_Extended_A/regex');

require('unicode-9.0.0/Block/Ethiopic_Supplement/code-points');
require('unicode-9.0.0/Block/Ethiopic_Supplement/symbols');
require('unicode-9.0.0/Block/Ethiopic_Supplement/regex');

require('unicode-9.0.0/Block/General_Punctuation/code-points');
require('unicode-9.0.0/Block/General_Punctuation/symbols');
require('unicode-9.0.0/Block/General_Punctuation/regex');

require('unicode-9.0.0/Block/Geometric_Shapes/code-points');
require('unicode-9.0.0/Block/Geometric_Shapes/symbols');
require('unicode-9.0.0/Block/Geometric_Shapes/regex');

require('unicode-9.0.0/Block/Geometric_Shapes_Extended/code-points');
require('unicode-9.0.0/Block/Geometric_Shapes_Extended/symbols');
require('unicode-9.0.0/Block/Geometric_Shapes_Extended/regex');

require('unicode-9.0.0/Block/Georgian/code-points');
require('unicode-9.0.0/Block/Georgian/symbols');
require('unicode-9.0.0/Block/Georgian/regex');

require('unicode-9.0.0/Block/Georgian_Supplement/code-points');
require('unicode-9.0.0/Block/Georgian_Supplement/symbols');
require('unicode-9.0.0/Block/Georgian_Supplement/regex');

require('unicode-9.0.0/Block/Glagolitic/code-points');
require('unicode-9.0.0/Block/Glagolitic/symbols');
require('unicode-9.0.0/Block/Glagolitic/regex');

require('unicode-9.0.0/Block/Glagolitic_Supplement/code-points');
require('unicode-9.0.0/Block/Glagolitic_Supplement/symbols');
require('unicode-9.0.0/Block/Glagolitic_Supplement/regex');

require('unicode-9.0.0/Block/Gothic/code-points');
require('unicode-9.0.0/Block/Gothic/symbols');
require('unicode-9.0.0/Block/Gothic/regex');

require('unicode-9.0.0/Block/Grantha/code-points');
require('unicode-9.0.0/Block/Grantha/symbols');
require('unicode-9.0.0/Block/Grantha/regex');

require('unicode-9.0.0/Block/Greek_And_Coptic/code-points');
require('unicode-9.0.0/Block/Greek_And_Coptic/symbols');
require('unicode-9.0.0/Block/Greek_And_Coptic/regex');

require('unicode-9.0.0/Block/Greek_Extended/code-points');
require('unicode-9.0.0/Block/Greek_Extended/symbols');
require('unicode-9.0.0/Block/Greek_Extended/regex');

require('unicode-9.0.0/Block/Gujarati/code-points');
require('unicode-9.0.0/Block/Gujarati/symbols');
require('unicode-9.0.0/Block/Gujarati/regex');

require('unicode-9.0.0/Block/Gurmukhi/code-points');
require('unicode-9.0.0/Block/Gurmukhi/symbols');
require('unicode-9.0.0/Block/Gurmukhi/regex');

require('unicode-9.0.0/Block/Halfwidth_And_Fullwidth_Forms/code-points');
require('unicode-9.0.0/Block/Halfwidth_And_Fullwidth_Forms/symbols');
require('unicode-9.0.0/Block/Halfwidth_And_Fullwidth_Forms/regex');

require('unicode-9.0.0/Block/Hangul_Compatibility_Jamo/code-points');
require('unicode-9.0.0/Block/Hangul_Compatibility_Jamo/symbols');
require('unicode-9.0.0/Block/Hangul_Compatibility_Jamo/regex');

require('unicode-9.0.0/Block/Hangul_Jamo/code-points');
require('unicode-9.0.0/Block/Hangul_Jamo/symbols');
require('unicode-9.0.0/Block/Hangul_Jamo/regex');

require('unicode-9.0.0/Block/Hangul_Jamo_Extended_A/code-points');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_A/symbols');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_A/regex');

require('unicode-9.0.0/Block/Hangul_Jamo_Extended_B/code-points');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_B/symbols');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_B/regex');

require('unicode-9.0.0/Block/Hangul_Syllables/code-points');
require('unicode-9.0.0/Block/Hangul_Syllables/symbols');
require('unicode-9.0.0/Block/Hangul_Syllables/regex');

require('unicode-9.0.0/Block/Hanunoo/code-points');
require('unicode-9.0.0/Block/Hanunoo/symbols');
require('unicode-9.0.0/Block/Hanunoo/regex');

require('unicode-9.0.0/Block/Hatran/code-points');
require('unicode-9.0.0/Block/Hatran/symbols');
require('unicode-9.0.0/Block/Hatran/regex');

require('unicode-9.0.0/Block/Hebrew/code-points');
require('unicode-9.0.0/Block/Hebrew/symbols');
require('unicode-9.0.0/Block/Hebrew/regex');

require('unicode-9.0.0/Block/High_Private_Use_Surrogates/code-points');
require('unicode-9.0.0/Block/High_Private_Use_Surrogates/symbols');
require('unicode-9.0.0/Block/High_Private_Use_Surrogates/regex');

require('unicode-9.0.0/Block/High_Surrogates/code-points');
require('unicode-9.0.0/Block/High_Surrogates/symbols');
require('unicode-9.0.0/Block/High_Surrogates/regex');

require('unicode-9.0.0/Block/Hiragana/code-points');
require('unicode-9.0.0/Block/Hiragana/symbols');
require('unicode-9.0.0/Block/Hiragana/regex');

require('unicode-9.0.0/Block/IPA_Extensions/code-points');
require('unicode-9.0.0/Block/IPA_Extensions/symbols');
require('unicode-9.0.0/Block/IPA_Extensions/regex');

require('unicode-9.0.0/Block/Ideographic_Description_Characters/code-points');
require('unicode-9.0.0/Block/Ideographic_Description_Characters/symbols');
require('unicode-9.0.0/Block/Ideographic_Description_Characters/regex');

require('unicode-9.0.0/Block/Ideographic_Symbols_And_Punctuation/code-points');
require('unicode-9.0.0/Block/Ideographic_Symbols_And_Punctuation/symbols');
require('unicode-9.0.0/Block/Ideographic_Symbols_And_Punctuation/regex');

require('unicode-9.0.0/Block/Imperial_Aramaic/code-points');
require('unicode-9.0.0/Block/Imperial_Aramaic/symbols');
require('unicode-9.0.0/Block/Imperial_Aramaic/regex');

require('unicode-9.0.0/Block/Inscriptional_Pahlavi/code-points');
require('unicode-9.0.0/Block/Inscriptional_Pahlavi/symbols');
require('unicode-9.0.0/Block/Inscriptional_Pahlavi/regex');

require('unicode-9.0.0/Block/Inscriptional_Parthian/code-points');
require('unicode-9.0.0/Block/Inscriptional_Parthian/symbols');
require('unicode-9.0.0/Block/Inscriptional_Parthian/regex');

require('unicode-9.0.0/Block/Javanese/code-points');
require('unicode-9.0.0/Block/Javanese/symbols');
require('unicode-9.0.0/Block/Javanese/regex');

require('unicode-9.0.0/Block/Kaithi/code-points');
require('unicode-9.0.0/Block/Kaithi/symbols');
require('unicode-9.0.0/Block/Kaithi/regex');

require('unicode-9.0.0/Block/Kana_Supplement/code-points');
require('unicode-9.0.0/Block/Kana_Supplement/symbols');
require('unicode-9.0.0/Block/Kana_Supplement/regex');

require('unicode-9.0.0/Block/Kanbun/code-points');
require('unicode-9.0.0/Block/Kanbun/symbols');
require('unicode-9.0.0/Block/Kanbun/regex');

require('unicode-9.0.0/Block/Kangxi_Radicals/code-points');
require('unicode-9.0.0/Block/Kangxi_Radicals/symbols');
require('unicode-9.0.0/Block/Kangxi_Radicals/regex');

require('unicode-9.0.0/Block/Kannada/code-points');
require('unicode-9.0.0/Block/Kannada/symbols');
require('unicode-9.0.0/Block/Kannada/regex');

require('unicode-9.0.0/Block/Katakana/code-points');
require('unicode-9.0.0/Block/Katakana/symbols');
require('unicode-9.0.0/Block/Katakana/regex');

require('unicode-9.0.0/Block/Katakana_Phonetic_Extensions/code-points');
require('unicode-9.0.0/Block/Katakana_Phonetic_Extensions/symbols');
require('unicode-9.0.0/Block/Katakana_Phonetic_Extensions/regex');

require('unicode-9.0.0/Block/Kayah_Li/code-points');
require('unicode-9.0.0/Block/Kayah_Li/symbols');
require('unicode-9.0.0/Block/Kayah_Li/regex');

require('unicode-9.0.0/Block/Kharoshthi/code-points');
require('unicode-9.0.0/Block/Kharoshthi/symbols');
require('unicode-9.0.0/Block/Kharoshthi/regex');

require('unicode-9.0.0/Block/Khmer/code-points');
require('unicode-9.0.0/Block/Khmer/symbols');
require('unicode-9.0.0/Block/Khmer/regex');

require('unicode-9.0.0/Block/Khmer_Symbols/code-points');
require('unicode-9.0.0/Block/Khmer_Symbols/symbols');
require('unicode-9.0.0/Block/Khmer_Symbols/regex');

require('unicode-9.0.0/Block/Khojki/code-points');
require('unicode-9.0.0/Block/Khojki/symbols');
require('unicode-9.0.0/Block/Khojki/regex');

require('unicode-9.0.0/Block/Khudawadi/code-points');
require('unicode-9.0.0/Block/Khudawadi/symbols');
require('unicode-9.0.0/Block/Khudawadi/regex');

require('unicode-9.0.0/Block/Lao/code-points');
require('unicode-9.0.0/Block/Lao/symbols');
require('unicode-9.0.0/Block/Lao/regex');

require('unicode-9.0.0/Block/Latin_1_Supplement/code-points');
require('unicode-9.0.0/Block/Latin_1_Supplement/symbols');
require('unicode-9.0.0/Block/Latin_1_Supplement/regex');

require('unicode-9.0.0/Block/Latin_Extended_A/code-points');
require('unicode-9.0.0/Block/Latin_Extended_A/symbols');
require('unicode-9.0.0/Block/Latin_Extended_A/regex');

require('unicode-9.0.0/Block/Latin_Extended_Additional/code-points');
require('unicode-9.0.0/Block/Latin_Extended_Additional/symbols');
require('unicode-9.0.0/Block/Latin_Extended_Additional/regex');

require('unicode-9.0.0/Block/Latin_Extended_B/code-points');
require('unicode-9.0.0/Block/Latin_Extended_B/symbols');
require('unicode-9.0.0/Block/Latin_Extended_B/regex');

require('unicode-9.0.0/Block/Latin_Extended_C/code-points');
require('unicode-9.0.0/Block/Latin_Extended_C/symbols');
require('unicode-9.0.0/Block/Latin_Extended_C/regex');

require('unicode-9.0.0/Block/Latin_Extended_D/code-points');
require('unicode-9.0.0/Block/Latin_Extended_D/symbols');
require('unicode-9.0.0/Block/Latin_Extended_D/regex');

require('unicode-9.0.0/Block/Latin_Extended_E/code-points');
require('unicode-9.0.0/Block/Latin_Extended_E/symbols');
require('unicode-9.0.0/Block/Latin_Extended_E/regex');

require('unicode-9.0.0/Block/Lepcha/code-points');
require('unicode-9.0.0/Block/Lepcha/symbols');
require('unicode-9.0.0/Block/Lepcha/regex');

require('unicode-9.0.0/Block/Letterlike_Symbols/code-points');
require('unicode-9.0.0/Block/Letterlike_Symbols/symbols');
require('unicode-9.0.0/Block/Letterlike_Symbols/regex');

require('unicode-9.0.0/Block/Limbu/code-points');
require('unicode-9.0.0/Block/Limbu/symbols');
require('unicode-9.0.0/Block/Limbu/regex');

require('unicode-9.0.0/Block/Linear_A/code-points');
require('unicode-9.0.0/Block/Linear_A/symbols');
require('unicode-9.0.0/Block/Linear_A/regex');

require('unicode-9.0.0/Block/Linear_B_Ideograms/code-points');
require('unicode-9.0.0/Block/Linear_B_Ideograms/symbols');
require('unicode-9.0.0/Block/Linear_B_Ideograms/regex');

require('unicode-9.0.0/Block/Linear_B_Syllabary/code-points');
require('unicode-9.0.0/Block/Linear_B_Syllabary/symbols');
require('unicode-9.0.0/Block/Linear_B_Syllabary/regex');

require('unicode-9.0.0/Block/Lisu/code-points');
require('unicode-9.0.0/Block/Lisu/symbols');
require('unicode-9.0.0/Block/Lisu/regex');

require('unicode-9.0.0/Block/Low_Surrogates/code-points');
require('unicode-9.0.0/Block/Low_Surrogates/symbols');
require('unicode-9.0.0/Block/Low_Surrogates/regex');

require('unicode-9.0.0/Block/Lycian/code-points');
require('unicode-9.0.0/Block/Lycian/symbols');
require('unicode-9.0.0/Block/Lycian/regex');

require('unicode-9.0.0/Block/Lydian/code-points');
require('unicode-9.0.0/Block/Lydian/symbols');
require('unicode-9.0.0/Block/Lydian/regex');

require('unicode-9.0.0/Block/Mahajani/code-points');
require('unicode-9.0.0/Block/Mahajani/symbols');
require('unicode-9.0.0/Block/Mahajani/regex');

require('unicode-9.0.0/Block/Mahjong_Tiles/code-points');
require('unicode-9.0.0/Block/Mahjong_Tiles/symbols');
require('unicode-9.0.0/Block/Mahjong_Tiles/regex');

require('unicode-9.0.0/Block/Malayalam/code-points');
require('unicode-9.0.0/Block/Malayalam/symbols');
require('unicode-9.0.0/Block/Malayalam/regex');

require('unicode-9.0.0/Block/Mandaic/code-points');
require('unicode-9.0.0/Block/Mandaic/symbols');
require('unicode-9.0.0/Block/Mandaic/regex');

require('unicode-9.0.0/Block/Manichaean/code-points');
require('unicode-9.0.0/Block/Manichaean/symbols');
require('unicode-9.0.0/Block/Manichaean/regex');

require('unicode-9.0.0/Block/Marchen/code-points');
require('unicode-9.0.0/Block/Marchen/symbols');
require('unicode-9.0.0/Block/Marchen/regex');

require('unicode-9.0.0/Block/Mathematical_Alphanumeric_Symbols/code-points');
require('unicode-9.0.0/Block/Mathematical_Alphanumeric_Symbols/symbols');
require('unicode-9.0.0/Block/Mathematical_Alphanumeric_Symbols/regex');

require('unicode-9.0.0/Block/Mathematical_Operators/code-points');
require('unicode-9.0.0/Block/Mathematical_Operators/symbols');
require('unicode-9.0.0/Block/Mathematical_Operators/regex');

require('unicode-9.0.0/Block/Meetei_Mayek/code-points');
require('unicode-9.0.0/Block/Meetei_Mayek/symbols');
require('unicode-9.0.0/Block/Meetei_Mayek/regex');

require('unicode-9.0.0/Block/Meetei_Mayek_Extensions/code-points');
require('unicode-9.0.0/Block/Meetei_Mayek_Extensions/symbols');
require('unicode-9.0.0/Block/Meetei_Mayek_Extensions/regex');

require('unicode-9.0.0/Block/Mende_Kikakui/code-points');
require('unicode-9.0.0/Block/Mende_Kikakui/symbols');
require('unicode-9.0.0/Block/Mende_Kikakui/regex');

require('unicode-9.0.0/Block/Meroitic_Cursive/code-points');
require('unicode-9.0.0/Block/Meroitic_Cursive/symbols');
require('unicode-9.0.0/Block/Meroitic_Cursive/regex');

require('unicode-9.0.0/Block/Meroitic_Hieroglyphs/code-points');
require('unicode-9.0.0/Block/Meroitic_Hieroglyphs/symbols');
require('unicode-9.0.0/Block/Meroitic_Hieroglyphs/regex');

require('unicode-9.0.0/Block/Miao/code-points');
require('unicode-9.0.0/Block/Miao/symbols');
require('unicode-9.0.0/Block/Miao/regex');

require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_A/code-points');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_A/symbols');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_A/regex');

require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_B/code-points');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_B/symbols');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_B/regex');

require('unicode-9.0.0/Block/Miscellaneous_Symbols/code-points');
require('unicode-9.0.0/Block/Miscellaneous_Symbols/symbols');
require('unicode-9.0.0/Block/Miscellaneous_Symbols/regex');

require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Arrows/code-points');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Arrows/symbols');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Arrows/regex');

require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Pictographs/code-points');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Pictographs/symbols');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Pictographs/regex');

require('unicode-9.0.0/Block/Miscellaneous_Technical/code-points');
require('unicode-9.0.0/Block/Miscellaneous_Technical/symbols');
require('unicode-9.0.0/Block/Miscellaneous_Technical/regex');

require('unicode-9.0.0/Block/Modi/code-points');
require('unicode-9.0.0/Block/Modi/symbols');
require('unicode-9.0.0/Block/Modi/regex');

require('unicode-9.0.0/Block/Modifier_Tone_Letters/code-points');
require('unicode-9.0.0/Block/Modifier_Tone_Letters/symbols');
require('unicode-9.0.0/Block/Modifier_Tone_Letters/regex');

require('unicode-9.0.0/Block/Mongolian/code-points');
require('unicode-9.0.0/Block/Mongolian/symbols');
require('unicode-9.0.0/Block/Mongolian/regex');

require('unicode-9.0.0/Block/Mongolian_Supplement/code-points');
require('unicode-9.0.0/Block/Mongolian_Supplement/symbols');
require('unicode-9.0.0/Block/Mongolian_Supplement/regex');

require('unicode-9.0.0/Block/Mro/code-points');
require('unicode-9.0.0/Block/Mro/symbols');
require('unicode-9.0.0/Block/Mro/regex');

require('unicode-9.0.0/Block/Multani/code-points');
require('unicode-9.0.0/Block/Multani/symbols');
require('unicode-9.0.0/Block/Multani/regex');

require('unicode-9.0.0/Block/Musical_Symbols/code-points');
require('unicode-9.0.0/Block/Musical_Symbols/symbols');
require('unicode-9.0.0/Block/Musical_Symbols/regex');

require('unicode-9.0.0/Block/Myanmar/code-points');
require('unicode-9.0.0/Block/Myanmar/symbols');
require('unicode-9.0.0/Block/Myanmar/regex');

require('unicode-9.0.0/Block/Myanmar_Extended_A/code-points');
require('unicode-9.0.0/Block/Myanmar_Extended_A/symbols');
require('unicode-9.0.0/Block/Myanmar_Extended_A/regex');

require('unicode-9.0.0/Block/Myanmar_Extended_B/code-points');
require('unicode-9.0.0/Block/Myanmar_Extended_B/symbols');
require('unicode-9.0.0/Block/Myanmar_Extended_B/regex');

require('unicode-9.0.0/Block/NKo/code-points');
require('unicode-9.0.0/Block/NKo/symbols');
require('unicode-9.0.0/Block/NKo/regex');

require('unicode-9.0.0/Block/Nabataean/code-points');
require('unicode-9.0.0/Block/Nabataean/symbols');
require('unicode-9.0.0/Block/Nabataean/regex');

require('unicode-9.0.0/Block/New_Tai_Lue/code-points');
require('unicode-9.0.0/Block/New_Tai_Lue/symbols');
require('unicode-9.0.0/Block/New_Tai_Lue/regex');

require('unicode-9.0.0/Block/Newa/code-points');
require('unicode-9.0.0/Block/Newa/symbols');
require('unicode-9.0.0/Block/Newa/regex');

require('unicode-9.0.0/Block/Number_Forms/code-points');
require('unicode-9.0.0/Block/Number_Forms/symbols');
require('unicode-9.0.0/Block/Number_Forms/regex');

require('unicode-9.0.0/Block/Ogham/code-points');
require('unicode-9.0.0/Block/Ogham/symbols');
require('unicode-9.0.0/Block/Ogham/regex');

require('unicode-9.0.0/Block/Ol_Chiki/code-points');
require('unicode-9.0.0/Block/Ol_Chiki/symbols');
require('unicode-9.0.0/Block/Ol_Chiki/regex');

require('unicode-9.0.0/Block/Old_Hungarian/code-points');
require('unicode-9.0.0/Block/Old_Hungarian/symbols');
require('unicode-9.0.0/Block/Old_Hungarian/regex');

require('unicode-9.0.0/Block/Old_Italic/code-points');
require('unicode-9.0.0/Block/Old_Italic/symbols');
require('unicode-9.0.0/Block/Old_Italic/regex');

require('unicode-9.0.0/Block/Old_North_Arabian/code-points');
require('unicode-9.0.0/Block/Old_North_Arabian/symbols');
require('unicode-9.0.0/Block/Old_North_Arabian/regex');

require('unicode-9.0.0/Block/Old_Permic/code-points');
require('unicode-9.0.0/Block/Old_Permic/symbols');
require('unicode-9.0.0/Block/Old_Permic/regex');

require('unicode-9.0.0/Block/Old_Persian/code-points');
require('unicode-9.0.0/Block/Old_Persian/symbols');
require('unicode-9.0.0/Block/Old_Persian/regex');

require('unicode-9.0.0/Block/Old_South_Arabian/code-points');
require('unicode-9.0.0/Block/Old_South_Arabian/symbols');
require('unicode-9.0.0/Block/Old_South_Arabian/regex');

require('unicode-9.0.0/Block/Old_Turkic/code-points');
require('unicode-9.0.0/Block/Old_Turkic/symbols');
require('unicode-9.0.0/Block/Old_Turkic/regex');

require('unicode-9.0.0/Block/Optical_Character_Recognition/code-points');
require('unicode-9.0.0/Block/Optical_Character_Recognition/symbols');
require('unicode-9.0.0/Block/Optical_Character_Recognition/regex');

require('unicode-9.0.0/Block/Oriya/code-points');
require('unicode-9.0.0/Block/Oriya/symbols');
require('unicode-9.0.0/Block/Oriya/regex');

require('unicode-9.0.0/Block/Ornamental_Dingbats/code-points');
require('unicode-9.0.0/Block/Ornamental_Dingbats/symbols');
require('unicode-9.0.0/Block/Ornamental_Dingbats/regex');

require('unicode-9.0.0/Block/Osage/code-points');
require('unicode-9.0.0/Block/Osage/symbols');
require('unicode-9.0.0/Block/Osage/regex');

require('unicode-9.0.0/Block/Osmanya/code-points');
require('unicode-9.0.0/Block/Osmanya/symbols');
require('unicode-9.0.0/Block/Osmanya/regex');

require('unicode-9.0.0/Block/Pahawh_Hmong/code-points');
require('unicode-9.0.0/Block/Pahawh_Hmong/symbols');
require('unicode-9.0.0/Block/Pahawh_Hmong/regex');

require('unicode-9.0.0/Block/Palmyrene/code-points');
require('unicode-9.0.0/Block/Palmyrene/symbols');
require('unicode-9.0.0/Block/Palmyrene/regex');

require('unicode-9.0.0/Block/Pau_Cin_Hau/code-points');
require('unicode-9.0.0/Block/Pau_Cin_Hau/symbols');
require('unicode-9.0.0/Block/Pau_Cin_Hau/regex');

require('unicode-9.0.0/Block/Phags_Pa/code-points');
require('unicode-9.0.0/Block/Phags_Pa/symbols');
require('unicode-9.0.0/Block/Phags_Pa/regex');

require('unicode-9.0.0/Block/Phaistos_Disc/code-points');
require('unicode-9.0.0/Block/Phaistos_Disc/symbols');
require('unicode-9.0.0/Block/Phaistos_Disc/regex');

require('unicode-9.0.0/Block/Phoenician/code-points');
require('unicode-9.0.0/Block/Phoenician/symbols');
require('unicode-9.0.0/Block/Phoenician/regex');

require('unicode-9.0.0/Block/Phonetic_Extensions/code-points');
require('unicode-9.0.0/Block/Phonetic_Extensions/symbols');
require('unicode-9.0.0/Block/Phonetic_Extensions/regex');

require('unicode-9.0.0/Block/Phonetic_Extensions_Supplement/code-points');
require('unicode-9.0.0/Block/Phonetic_Extensions_Supplement/symbols');
require('unicode-9.0.0/Block/Phonetic_Extensions_Supplement/regex');

require('unicode-9.0.0/Block/Playing_Cards/code-points');
require('unicode-9.0.0/Block/Playing_Cards/symbols');
require('unicode-9.0.0/Block/Playing_Cards/regex');

require('unicode-9.0.0/Block/Private_Use_Area/code-points');
require('unicode-9.0.0/Block/Private_Use_Area/symbols');
require('unicode-9.0.0/Block/Private_Use_Area/regex');

require('unicode-9.0.0/Block/Psalter_Pahlavi/code-points');
require('unicode-9.0.0/Block/Psalter_Pahlavi/symbols');
require('unicode-9.0.0/Block/Psalter_Pahlavi/regex');

require('unicode-9.0.0/Block/Rejang/code-points');
require('unicode-9.0.0/Block/Rejang/symbols');
require('unicode-9.0.0/Block/Rejang/regex');

require('unicode-9.0.0/Block/Rumi_Numeral_Symbols/code-points');
require('unicode-9.0.0/Block/Rumi_Numeral_Symbols/symbols');
require('unicode-9.0.0/Block/Rumi_Numeral_Symbols/regex');

require('unicode-9.0.0/Block/Runic/code-points');
require('unicode-9.0.0/Block/Runic/symbols');
require('unicode-9.0.0/Block/Runic/regex');

require('unicode-9.0.0/Block/Samaritan/code-points');
require('unicode-9.0.0/Block/Samaritan/symbols');
require('unicode-9.0.0/Block/Samaritan/regex');

require('unicode-9.0.0/Block/Saurashtra/code-points');
require('unicode-9.0.0/Block/Saurashtra/symbols');
require('unicode-9.0.0/Block/Saurashtra/regex');

require('unicode-9.0.0/Block/Sharada/code-points');
require('unicode-9.0.0/Block/Sharada/symbols');
require('unicode-9.0.0/Block/Sharada/regex');

require('unicode-9.0.0/Block/Shavian/code-points');
require('unicode-9.0.0/Block/Shavian/symbols');
require('unicode-9.0.0/Block/Shavian/regex');

require('unicode-9.0.0/Block/Shorthand_Format_Controls/code-points');
require('unicode-9.0.0/Block/Shorthand_Format_Controls/symbols');
require('unicode-9.0.0/Block/Shorthand_Format_Controls/regex');

require('unicode-9.0.0/Block/Siddham/code-points');
require('unicode-9.0.0/Block/Siddham/symbols');
require('unicode-9.0.0/Block/Siddham/regex');

require('unicode-9.0.0/Block/Sinhala/code-points');
require('unicode-9.0.0/Block/Sinhala/symbols');
require('unicode-9.0.0/Block/Sinhala/regex');

require('unicode-9.0.0/Block/Sinhala_Archaic_Numbers/code-points');
require('unicode-9.0.0/Block/Sinhala_Archaic_Numbers/symbols');
require('unicode-9.0.0/Block/Sinhala_Archaic_Numbers/regex');

require('unicode-9.0.0/Block/Small_Form_Variants/code-points');
require('unicode-9.0.0/Block/Small_Form_Variants/symbols');
require('unicode-9.0.0/Block/Small_Form_Variants/regex');

require('unicode-9.0.0/Block/Sora_Sompeng/code-points');
require('unicode-9.0.0/Block/Sora_Sompeng/symbols');
require('unicode-9.0.0/Block/Sora_Sompeng/regex');

require('unicode-9.0.0/Block/Spacing_Modifier_Letters/code-points');
require('unicode-9.0.0/Block/Spacing_Modifier_Letters/symbols');
require('unicode-9.0.0/Block/Spacing_Modifier_Letters/regex');

require('unicode-9.0.0/Block/Specials/code-points');
require('unicode-9.0.0/Block/Specials/symbols');
require('unicode-9.0.0/Block/Specials/regex');

require('unicode-9.0.0/Block/Sundanese/code-points');
require('unicode-9.0.0/Block/Sundanese/symbols');
require('unicode-9.0.0/Block/Sundanese/regex');

require('unicode-9.0.0/Block/Sundanese_Supplement/code-points');
require('unicode-9.0.0/Block/Sundanese_Supplement/symbols');
require('unicode-9.0.0/Block/Sundanese_Supplement/regex');

require('unicode-9.0.0/Block/Superscripts_And_Subscripts/code-points');
require('unicode-9.0.0/Block/Superscripts_And_Subscripts/symbols');
require('unicode-9.0.0/Block/Superscripts_And_Subscripts/regex');

require('unicode-9.0.0/Block/Supplemental_Arrows_A/code-points');
require('unicode-9.0.0/Block/Supplemental_Arrows_A/symbols');
require('unicode-9.0.0/Block/Supplemental_Arrows_A/regex');

require('unicode-9.0.0/Block/Supplemental_Arrows_B/code-points');
require('unicode-9.0.0/Block/Supplemental_Arrows_B/symbols');
require('unicode-9.0.0/Block/Supplemental_Arrows_B/regex');

require('unicode-9.0.0/Block/Supplemental_Arrows_C/code-points');
require('unicode-9.0.0/Block/Supplemental_Arrows_C/symbols');
require('unicode-9.0.0/Block/Supplemental_Arrows_C/regex');

require('unicode-9.0.0/Block/Supplemental_Mathematical_Operators/code-points');
require('unicode-9.0.0/Block/Supplemental_Mathematical_Operators/symbols');
require('unicode-9.0.0/Block/Supplemental_Mathematical_Operators/regex');

require('unicode-9.0.0/Block/Supplemental_Punctuation/code-points');
require('unicode-9.0.0/Block/Supplemental_Punctuation/symbols');
require('unicode-9.0.0/Block/Supplemental_Punctuation/regex');

require('unicode-9.0.0/Block/Supplemental_Symbols_And_Pictographs/code-points');
require('unicode-9.0.0/Block/Supplemental_Symbols_And_Pictographs/symbols');
require('unicode-9.0.0/Block/Supplemental_Symbols_And_Pictographs/regex');

require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_A/code-points');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_A/symbols');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_A/regex');

require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_B/code-points');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_B/symbols');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_B/regex');

require('unicode-9.0.0/Block/Sutton_SignWriting/code-points');
require('unicode-9.0.0/Block/Sutton_SignWriting/symbols');
require('unicode-9.0.0/Block/Sutton_SignWriting/regex');

require('unicode-9.0.0/Block/Syloti_Nagri/code-points');
require('unicode-9.0.0/Block/Syloti_Nagri/symbols');
require('unicode-9.0.0/Block/Syloti_Nagri/regex');

require('unicode-9.0.0/Block/Syriac/code-points');
require('unicode-9.0.0/Block/Syriac/symbols');
require('unicode-9.0.0/Block/Syriac/regex');

require('unicode-9.0.0/Block/Tagalog/code-points');
require('unicode-9.0.0/Block/Tagalog/symbols');
require('unicode-9.0.0/Block/Tagalog/regex');

require('unicode-9.0.0/Block/Tagbanwa/code-points');
require('unicode-9.0.0/Block/Tagbanwa/symbols');
require('unicode-9.0.0/Block/Tagbanwa/regex');

require('unicode-9.0.0/Block/Tags/code-points');
require('unicode-9.0.0/Block/Tags/symbols');
require('unicode-9.0.0/Block/Tags/regex');

require('unicode-9.0.0/Block/Tai_Le/code-points');
require('unicode-9.0.0/Block/Tai_Le/symbols');
require('unicode-9.0.0/Block/Tai_Le/regex');

require('unicode-9.0.0/Block/Tai_Tham/code-points');
require('unicode-9.0.0/Block/Tai_Tham/symbols');
require('unicode-9.0.0/Block/Tai_Tham/regex');

require('unicode-9.0.0/Block/Tai_Viet/code-points');
require('unicode-9.0.0/Block/Tai_Viet/symbols');
require('unicode-9.0.0/Block/Tai_Viet/regex');

require('unicode-9.0.0/Block/Tai_Xuan_Jing_Symbols/code-points');
require('unicode-9.0.0/Block/Tai_Xuan_Jing_Symbols/symbols');
require('unicode-9.0.0/Block/Tai_Xuan_Jing_Symbols/regex');

require('unicode-9.0.0/Block/Takri/code-points');
require('unicode-9.0.0/Block/Takri/symbols');
require('unicode-9.0.0/Block/Takri/regex');

require('unicode-9.0.0/Block/Tamil/code-points');
require('unicode-9.0.0/Block/Tamil/symbols');
require('unicode-9.0.0/Block/Tamil/regex');

require('unicode-9.0.0/Block/Tangut/code-points');
require('unicode-9.0.0/Block/Tangut/symbols');
require('unicode-9.0.0/Block/Tangut/regex');

require('unicode-9.0.0/Block/Tangut_Components/code-points');
require('unicode-9.0.0/Block/Tangut_Components/symbols');
require('unicode-9.0.0/Block/Tangut_Components/regex');

require('unicode-9.0.0/Block/Telugu/code-points');
require('unicode-9.0.0/Block/Telugu/symbols');
require('unicode-9.0.0/Block/Telugu/regex');

require('unicode-9.0.0/Block/Thaana/code-points');
require('unicode-9.0.0/Block/Thaana/symbols');
require('unicode-9.0.0/Block/Thaana/regex');

require('unicode-9.0.0/Block/Thai/code-points');
require('unicode-9.0.0/Block/Thai/symbols');
require('unicode-9.0.0/Block/Thai/regex');

require('unicode-9.0.0/Block/Tibetan/code-points');
require('unicode-9.0.0/Block/Tibetan/symbols');
require('unicode-9.0.0/Block/Tibetan/regex');

require('unicode-9.0.0/Block/Tifinagh/code-points');
require('unicode-9.0.0/Block/Tifinagh/symbols');
require('unicode-9.0.0/Block/Tifinagh/regex');

require('unicode-9.0.0/Block/Tirhuta/code-points');
require('unicode-9.0.0/Block/Tirhuta/symbols');
require('unicode-9.0.0/Block/Tirhuta/regex');

require('unicode-9.0.0/Block/Transport_And_Map_Symbols/code-points');
require('unicode-9.0.0/Block/Transport_And_Map_Symbols/symbols');
require('unicode-9.0.0/Block/Transport_And_Map_Symbols/regex');

require('unicode-9.0.0/Block/Ugaritic/code-points');
require('unicode-9.0.0/Block/Ugaritic/symbols');
require('unicode-9.0.0/Block/Ugaritic/regex');

require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics/code-points');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics/symbols');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics/regex');

require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/code-points');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/symbols');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/regex');

require('unicode-9.0.0/Block/Vai/code-points');
require('unicode-9.0.0/Block/Vai/symbols');
require('unicode-9.0.0/Block/Vai/regex');

require('unicode-9.0.0/Block/Variation_Selectors/code-points');
require('unicode-9.0.0/Block/Variation_Selectors/symbols');
require('unicode-9.0.0/Block/Variation_Selectors/regex');

require('unicode-9.0.0/Block/Variation_Selectors_Supplement/code-points');
require('unicode-9.0.0/Block/Variation_Selectors_Supplement/symbols');
require('unicode-9.0.0/Block/Variation_Selectors_Supplement/regex');

require('unicode-9.0.0/Block/Vedic_Extensions/code-points');
require('unicode-9.0.0/Block/Vedic_Extensions/symbols');
require('unicode-9.0.0/Block/Vedic_Extensions/regex');

require('unicode-9.0.0/Block/Vertical_Forms/code-points');
require('unicode-9.0.0/Block/Vertical_Forms/symbols');
require('unicode-9.0.0/Block/Vertical_Forms/regex');

require('unicode-9.0.0/Block/Warang_Citi/code-points');
require('unicode-9.0.0/Block/Warang_Citi/symbols');
require('unicode-9.0.0/Block/Warang_Citi/regex');

require('unicode-9.0.0/Block/Yi_Radicals/code-points');
require('unicode-9.0.0/Block/Yi_Radicals/symbols');
require('unicode-9.0.0/Block/Yi_Radicals/regex');

require('unicode-9.0.0/Block/Yi_Syllables/code-points');
require('unicode-9.0.0/Block/Yi_Syllables/symbols');
require('unicode-9.0.0/Block/Yi_Syllables/regex');

require('unicode-9.0.0/Block/Yijing_Hexagram_Symbols/code-points');
require('unicode-9.0.0/Block/Yijing_Hexagram_Symbols/symbols');
require('unicode-9.0.0/Block/Yijing_Hexagram_Symbols/regex');

// `Bidi_Mirroring_Glyph`:

require('unicode-9.0.0/Bidi_Mirroring_Glyph').get(codePoint); // lookup map

// `Bidi_Paired_Bracket_Type`:

require('unicode-9.0.0/Bidi_Paired_Bracket_Type').get(codePoint); // lookup map

require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Close/code-points');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Close/symbols');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Close/regex');

require('unicode-9.0.0/Bidi_Paired_Bracket_Type/None/code-points');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/None/symbols');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/None/regex');

require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/code-points');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/symbols');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/regex');

// `Line_Break`:

require('unicode-9.0.0/Line_Break/Alphabetic/code-points');
require('unicode-9.0.0/Line_Break/Alphabetic/symbols');
require('unicode-9.0.0/Line_Break/Alphabetic/regex');

require('unicode-9.0.0/Line_Break/Ambiguous/code-points');
require('unicode-9.0.0/Line_Break/Ambiguous/symbols');
require('unicode-9.0.0/Line_Break/Ambiguous/regex');

require('unicode-9.0.0/Line_Break/Break_After/code-points');
require('unicode-9.0.0/Line_Break/Break_After/symbols');
require('unicode-9.0.0/Line_Break/Break_After/regex');

require('unicode-9.0.0/Line_Break/Break_Before/code-points');
require('unicode-9.0.0/Line_Break/Break_Before/symbols');
require('unicode-9.0.0/Line_Break/Break_Before/regex');

require('unicode-9.0.0/Line_Break/Break_Both/code-points');
require('unicode-9.0.0/Line_Break/Break_Both/symbols');
require('unicode-9.0.0/Line_Break/Break_Both/regex');

require('unicode-9.0.0/Line_Break/Break_Symbols/code-points');
require('unicode-9.0.0/Line_Break/Break_Symbols/symbols');
require('unicode-9.0.0/Line_Break/Break_Symbols/regex');

require('unicode-9.0.0/Line_Break/Carriage_Return/code-points');
require('unicode-9.0.0/Line_Break/Carriage_Return/symbols');
require('unicode-9.0.0/Line_Break/Carriage_Return/regex');

require('unicode-9.0.0/Line_Break/Close_Parenthesis/code-points');
require('unicode-9.0.0/Line_Break/Close_Parenthesis/symbols');
require('unicode-9.0.0/Line_Break/Close_Parenthesis/regex');

require('unicode-9.0.0/Line_Break/Close_Punctuation/code-points');
require('unicode-9.0.0/Line_Break/Close_Punctuation/symbols');
require('unicode-9.0.0/Line_Break/Close_Punctuation/regex');

require('unicode-9.0.0/Line_Break/Combining_Mark/code-points');
require('unicode-9.0.0/Line_Break/Combining_Mark/symbols');
require('unicode-9.0.0/Line_Break/Combining_Mark/regex');

require('unicode-9.0.0/Line_Break/Complex_Context/code-points');
require('unicode-9.0.0/Line_Break/Complex_Context/symbols');
require('unicode-9.0.0/Line_Break/Complex_Context/regex');

require('unicode-9.0.0/Line_Break/Conditional_Japanese_Starter/code-points');
require('unicode-9.0.0/Line_Break/Conditional_Japanese_Starter/symbols');
require('unicode-9.0.0/Line_Break/Conditional_Japanese_Starter/regex');

require('unicode-9.0.0/Line_Break/Contingent_Break/code-points');
require('unicode-9.0.0/Line_Break/Contingent_Break/symbols');
require('unicode-9.0.0/Line_Break/Contingent_Break/regex');

require('unicode-9.0.0/Line_Break/E_Base/code-points');
require('unicode-9.0.0/Line_Break/E_Base/symbols');
require('unicode-9.0.0/Line_Break/E_Base/regex');

require('unicode-9.0.0/Line_Break/E_Modifier/code-points');
require('unicode-9.0.0/Line_Break/E_Modifier/symbols');
require('unicode-9.0.0/Line_Break/E_Modifier/regex');

require('unicode-9.0.0/Line_Break/Exclamation/code-points');
require('unicode-9.0.0/Line_Break/Exclamation/symbols');
require('unicode-9.0.0/Line_Break/Exclamation/regex');

require('unicode-9.0.0/Line_Break/Glue/code-points');
require('unicode-9.0.0/Line_Break/Glue/symbols');
require('unicode-9.0.0/Line_Break/Glue/regex');

require('unicode-9.0.0/Line_Break/H2/code-points');
require('unicode-9.0.0/Line_Break/H2/symbols');
require('unicode-9.0.0/Line_Break/H2/regex');

require('unicode-9.0.0/Line_Break/H3/code-points');
require('unicode-9.0.0/Line_Break/H3/symbols');
require('unicode-9.0.0/Line_Break/H3/regex');

require('unicode-9.0.0/Line_Break/Hebrew_Letter/code-points');
require('unicode-9.0.0/Line_Break/Hebrew_Letter/symbols');
require('unicode-9.0.0/Line_Break/Hebrew_Letter/regex');

require('unicode-9.0.0/Line_Break/Hyphen/code-points');
require('unicode-9.0.0/Line_Break/Hyphen/symbols');
require('unicode-9.0.0/Line_Break/Hyphen/regex');

require('unicode-9.0.0/Line_Break/Ideographic/code-points');
require('unicode-9.0.0/Line_Break/Ideographic/symbols');
require('unicode-9.0.0/Line_Break/Ideographic/regex');

require('unicode-9.0.0/Line_Break/Infix_Numeric/code-points');
require('unicode-9.0.0/Line_Break/Infix_Numeric/symbols');
require('unicode-9.0.0/Line_Break/Infix_Numeric/regex');

require('unicode-9.0.0/Line_Break/Inseparable/code-points');
require('unicode-9.0.0/Line_Break/Inseparable/symbols');
require('unicode-9.0.0/Line_Break/Inseparable/regex');

require('unicode-9.0.0/Line_Break/JL/code-points');
require('unicode-9.0.0/Line_Break/JL/symbols');
require('unicode-9.0.0/Line_Break/JL/regex');

require('unicode-9.0.0/Line_Break/JT/code-points');
require('unicode-9.0.0/Line_Break/JT/symbols');
require('unicode-9.0.0/Line_Break/JT/regex');

require('unicode-9.0.0/Line_Break/JV/code-points');
require('unicode-9.0.0/Line_Break/JV/symbols');
require('unicode-9.0.0/Line_Break/JV/regex');

require('unicode-9.0.0/Line_Break/Line_Feed/code-points');
require('unicode-9.0.0/Line_Break/Line_Feed/symbols');
require('unicode-9.0.0/Line_Break/Line_Feed/regex');

require('unicode-9.0.0/Line_Break/Mandatory_Break/code-points');
require('unicode-9.0.0/Line_Break/Mandatory_Break/symbols');
require('unicode-9.0.0/Line_Break/Mandatory_Break/regex');

require('unicode-9.0.0/Line_Break/Next_Line/code-points');
require('unicode-9.0.0/Line_Break/Next_Line/symbols');
require('unicode-9.0.0/Line_Break/Next_Line/regex');

require('unicode-9.0.0/Line_Break/Nonstarter/code-points');
require('unicode-9.0.0/Line_Break/Nonstarter/symbols');
require('unicode-9.0.0/Line_Break/Nonstarter/regex');

require('unicode-9.0.0/Line_Break/Numeric/code-points');
require('unicode-9.0.0/Line_Break/Numeric/symbols');
require('unicode-9.0.0/Line_Break/Numeric/regex');

require('unicode-9.0.0/Line_Break/Open_Punctuation/code-points');
require('unicode-9.0.0/Line_Break/Open_Punctuation/symbols');
require('unicode-9.0.0/Line_Break/Open_Punctuation/regex');

require('unicode-9.0.0/Line_Break/Postfix_Numeric/code-points');
require('unicode-9.0.0/Line_Break/Postfix_Numeric/symbols');
require('unicode-9.0.0/Line_Break/Postfix_Numeric/regex');

require('unicode-9.0.0/Line_Break/Prefix_Numeric/code-points');
require('unicode-9.0.0/Line_Break/Prefix_Numeric/symbols');
require('unicode-9.0.0/Line_Break/Prefix_Numeric/regex');

require('unicode-9.0.0/Line_Break/Quotation/code-points');
require('unicode-9.0.0/Line_Break/Quotation/symbols');
require('unicode-9.0.0/Line_Break/Quotation/regex');

require('unicode-9.0.0/Line_Break/Regional_Indicator/code-points');
require('unicode-9.0.0/Line_Break/Regional_Indicator/symbols');
require('unicode-9.0.0/Line_Break/Regional_Indicator/regex');

require('unicode-9.0.0/Line_Break/Space/code-points');
require('unicode-9.0.0/Line_Break/Space/symbols');
require('unicode-9.0.0/Line_Break/Space/regex');

require('unicode-9.0.0/Line_Break/Surrogate/code-points');
require('unicode-9.0.0/Line_Break/Surrogate/symbols');
require('unicode-9.0.0/Line_Break/Surrogate/regex');

require('unicode-9.0.0/Line_Break/Unknown/code-points');
require('unicode-9.0.0/Line_Break/Unknown/symbols');
require('unicode-9.0.0/Line_Break/Unknown/regex');

require('unicode-9.0.0/Line_Break/Word_Joiner/code-points');
require('unicode-9.0.0/Line_Break/Word_Joiner/symbols');
require('unicode-9.0.0/Line_Break/Word_Joiner/regex');

require('unicode-9.0.0/Line_Break/ZWJ/code-points');
require('unicode-9.0.0/Line_Break/ZWJ/symbols');
require('unicode-9.0.0/Line_Break/ZWJ/regex');

require('unicode-9.0.0/Line_Break/ZWSpace/code-points');
require('unicode-9.0.0/Line_Break/ZWSpace/symbols');
require('unicode-9.0.0/Line_Break/ZWSpace/regex');

// `Word_Break`:

require('unicode-9.0.0/Word_Break/ALetter/code-points');
require('unicode-9.0.0/Word_Break/ALetter/symbols');
require('unicode-9.0.0/Word_Break/ALetter/regex');

require('unicode-9.0.0/Word_Break/CR/code-points');
require('unicode-9.0.0/Word_Break/CR/symbols');
require('unicode-9.0.0/Word_Break/CR/regex');

require('unicode-9.0.0/Word_Break/Double_Quote/code-points');
require('unicode-9.0.0/Word_Break/Double_Quote/symbols');
require('unicode-9.0.0/Word_Break/Double_Quote/regex');

require('unicode-9.0.0/Word_Break/E_Base/code-points');
require('unicode-9.0.0/Word_Break/E_Base/symbols');
require('unicode-9.0.0/Word_Break/E_Base/regex');

require('unicode-9.0.0/Word_Break/E_Base_GAZ/code-points');
require('unicode-9.0.0/Word_Break/E_Base_GAZ/symbols');
require('unicode-9.0.0/Word_Break/E_Base_GAZ/regex');

require('unicode-9.0.0/Word_Break/E_Modifier/code-points');
require('unicode-9.0.0/Word_Break/E_Modifier/symbols');
require('unicode-9.0.0/Word_Break/E_Modifier/regex');

require('unicode-9.0.0/Word_Break/Extend/code-points');
require('unicode-9.0.0/Word_Break/Extend/symbols');
require('unicode-9.0.0/Word_Break/Extend/regex');

require('unicode-9.0.0/Word_Break/ExtendNumLet/code-points');
require('unicode-9.0.0/Word_Break/ExtendNumLet/symbols');
require('unicode-9.0.0/Word_Break/ExtendNumLet/regex');

require('unicode-9.0.0/Word_Break/Format/code-points');
require('unicode-9.0.0/Word_Break/Format/symbols');
require('unicode-9.0.0/Word_Break/Format/regex');

require('unicode-9.0.0/Word_Break/Glue_After_Zwj/code-points');
require('unicode-9.0.0/Word_Break/Glue_After_Zwj/symbols');
require('unicode-9.0.0/Word_Break/Glue_After_Zwj/regex');

require('unicode-9.0.0/Word_Break/Hebrew_Letter/code-points');
require('unicode-9.0.0/Word_Break/Hebrew_Letter/symbols');
require('unicode-9.0.0/Word_Break/Hebrew_Letter/regex');

require('unicode-9.0.0/Word_Break/Katakana/code-points');
require('unicode-9.0.0/Word_Break/Katakana/symbols');
require('unicode-9.0.0/Word_Break/Katakana/regex');

require('unicode-9.0.0/Word_Break/LF/code-points');
require('unicode-9.0.0/Word_Break/LF/symbols');
require('unicode-9.0.0/Word_Break/LF/regex');

require('unicode-9.0.0/Word_Break/MidLetter/code-points');
require('unicode-9.0.0/Word_Break/MidLetter/symbols');
require('unicode-9.0.0/Word_Break/MidLetter/regex');

require('unicode-9.0.0/Word_Break/MidNum/code-points');
require('unicode-9.0.0/Word_Break/MidNum/symbols');
require('unicode-9.0.0/Word_Break/MidNum/regex');

require('unicode-9.0.0/Word_Break/MidNumLet/code-points');
require('unicode-9.0.0/Word_Break/MidNumLet/symbols');
require('unicode-9.0.0/Word_Break/MidNumLet/regex');

require('unicode-9.0.0/Word_Break/Newline/code-points');
require('unicode-9.0.0/Word_Break/Newline/symbols');
require('unicode-9.0.0/Word_Break/Newline/regex');

require('unicode-9.0.0/Word_Break/Numeric/code-points');
require('unicode-9.0.0/Word_Break/Numeric/symbols');
require('unicode-9.0.0/Word_Break/Numeric/regex');

require('unicode-9.0.0/Word_Break/Other/code-points');
require('unicode-9.0.0/Word_Break/Other/symbols');
require('unicode-9.0.0/Word_Break/Other/regex');

require('unicode-9.0.0/Word_Break/Regional_Indicator/code-points');
require('unicode-9.0.0/Word_Break/Regional_Indicator/symbols');
require('unicode-9.0.0/Word_Break/Regional_Indicator/regex');

require('unicode-9.0.0/Word_Break/Single_Quote/code-points');
require('unicode-9.0.0/Word_Break/Single_Quote/symbols');
require('unicode-9.0.0/Word_Break/Single_Quote/regex');

require('unicode-9.0.0/Word_Break/ZWJ/code-points');
require('unicode-9.0.0/Word_Break/ZWJ/symbols');
require('unicode-9.0.0/Word_Break/ZWJ/regex');
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This module is available under the [MIT](https://mths.be/mit) license.
