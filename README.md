# Unicode v6.2.0 data

JavaScript-compatible Unicode data for use in Node.js. Included: arrays of code points, arrays of symbols, and regular expressions for Unicode v6.2.0’s categories, scripts, script extensions, blocks, and properties, as well as bidi mirroring and case folding data.

The data files in this module are generated as part of the [node-unicode-data](https://mths.be/node-unicode-data) project. **Please report any bugs or requests [in the appropriate issue tracker](https://github.com/mathiasbynens/node-unicode-data/issues).**

## Installation

```bash
npm install unicode-6.2.0 --save-dev
```

**Note:** _unicode-6.2.0_ is supposed to be used in build scripts (i.e. as a `devDependency`), and not at runtime (i.e. as a regular `dependency`).

## Regular expressions

The Unicode data modules ship with pre-compiled regular expressions for categories, scripts, script extensions, blocks, and properties. But maybe you want to create a single regular expression that combines several categories, scripts, etc. In that case, [***you should use Regenerate***](https://mths.be/regenerate). For example, to construct a regex that matches all symbols in the Arabic and Greek scripts as per Unicode v6.3.0:

```js
const regenerate = require('regenerate');
const set = regenerate()
	.add(require('unicode-6.3.0/script-extensions/Arabic/code-points')) // or `…/symbols`, doesn’t matter
	.add(require('unicode-6.3.0/script-extensions/Greek/code-points')); // or `…/symbols`, doesn’t matter
console.log(set.toString());
// Then you might want to use a template like this to write the result to a file, along with any regex flags you might need:
// const regex = /<%= set.toString() %>/gim;
```

## Usage

```js
// Get an array of code points in a given Unicode category:
const codePoints = require('unicode-6.2.0/categories/Lu/code-points');
// Get an array of symbols (strings) in a given Unicode category:
const symbols = require('unicode-6.2.0/categories/Lu/symbols');
// Get a regular expression that matches any symbol in a given Unicode category:
const regex = require('unicode-6.2.0/categories/Lu/regex');
// Get the canonical category a given code point belongs to:
// (Note: U+0041 is LATIN CAPITAL LETTER A)
const category = require('unicode-6.2.0/categories')[ 0x41 ];
// Get an array of all code points with `Bidi_Class=Other_Neutral`:
const on = require('unicode-6.2.0/bidi-classes/Other_Neutral/code-points');
// Get a map from code points to bidi classes:
const bidiClassMap = require('unicode-6.2.0/bidi-classes');
// Get the directionality of a given code point:
const directionality = require('unicode-6.2.0/bidi-classes').get(0x41);

// What glyph is the mirror image of `«` (U+00AB)?
const mirrored = require('unicode-6.2.0/bidi-mirroring').get(0xAB);

// …you get the idea.
```

Other than categories, data on Unicode properties, blocks, scripts, and script extensions is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v6.2.0:

```js
// properties:

require('unicode-6.2.0/properties/ASCII/code-points');
require('unicode-6.2.0/properties/ASCII/symbols');
require('unicode-6.2.0/properties/ASCII/regex');

require('unicode-6.2.0/properties/ASCII_Hex_Digit/code-points');
require('unicode-6.2.0/properties/ASCII_Hex_Digit/symbols');
require('unicode-6.2.0/properties/ASCII_Hex_Digit/regex');

require('unicode-6.2.0/properties/Alphabetic/code-points');
require('unicode-6.2.0/properties/Alphabetic/symbols');
require('unicode-6.2.0/properties/Alphabetic/regex');

require('unicode-6.2.0/properties/Any/code-points');
require('unicode-6.2.0/properties/Any/symbols');
require('unicode-6.2.0/properties/Any/regex');

require('unicode-6.2.0/properties/Assigned/code-points');
require('unicode-6.2.0/properties/Assigned/symbols');
require('unicode-6.2.0/properties/Assigned/regex');

require('unicode-6.2.0/properties/Bidi_Control/code-points');
require('unicode-6.2.0/properties/Bidi_Control/symbols');
require('unicode-6.2.0/properties/Bidi_Control/regex');

require('unicode-6.2.0/properties/Bidi_Mirrored/code-points');
require('unicode-6.2.0/properties/Bidi_Mirrored/symbols');
require('unicode-6.2.0/properties/Bidi_Mirrored/regex');

require('unicode-6.2.0/properties/Case_Ignorable/code-points');
require('unicode-6.2.0/properties/Case_Ignorable/symbols');
require('unicode-6.2.0/properties/Case_Ignorable/regex');

require('unicode-6.2.0/properties/Cased/code-points');
require('unicode-6.2.0/properties/Cased/symbols');
require('unicode-6.2.0/properties/Cased/regex');

require('unicode-6.2.0/properties/Changes_When_Casefolded/code-points');
require('unicode-6.2.0/properties/Changes_When_Casefolded/symbols');
require('unicode-6.2.0/properties/Changes_When_Casefolded/regex');

require('unicode-6.2.0/properties/Changes_When_Casemapped/code-points');
require('unicode-6.2.0/properties/Changes_When_Casemapped/symbols');
require('unicode-6.2.0/properties/Changes_When_Casemapped/regex');

require('unicode-6.2.0/properties/Changes_When_Lowercased/code-points');
require('unicode-6.2.0/properties/Changes_When_Lowercased/symbols');
require('unicode-6.2.0/properties/Changes_When_Lowercased/regex');

require('unicode-6.2.0/properties/Changes_When_NFKC_Casefolded/code-points');
require('unicode-6.2.0/properties/Changes_When_NFKC_Casefolded/symbols');
require('unicode-6.2.0/properties/Changes_When_NFKC_Casefolded/regex');

require('unicode-6.2.0/properties/Changes_When_Titlecased/code-points');
require('unicode-6.2.0/properties/Changes_When_Titlecased/symbols');
require('unicode-6.2.0/properties/Changes_When_Titlecased/regex');

require('unicode-6.2.0/properties/Changes_When_Uppercased/code-points');
require('unicode-6.2.0/properties/Changes_When_Uppercased/symbols');
require('unicode-6.2.0/properties/Changes_When_Uppercased/regex');

require('unicode-6.2.0/properties/Composition_Exclusion/code-points');
require('unicode-6.2.0/properties/Composition_Exclusion/symbols');
require('unicode-6.2.0/properties/Composition_Exclusion/regex');

require('unicode-6.2.0/properties/Dash/code-points');
require('unicode-6.2.0/properties/Dash/symbols');
require('unicode-6.2.0/properties/Dash/regex');

require('unicode-6.2.0/properties/Default_Ignorable_Code_Point/code-points');
require('unicode-6.2.0/properties/Default_Ignorable_Code_Point/symbols');
require('unicode-6.2.0/properties/Default_Ignorable_Code_Point/regex');

require('unicode-6.2.0/properties/Deprecated/code-points');
require('unicode-6.2.0/properties/Deprecated/symbols');
require('unicode-6.2.0/properties/Deprecated/regex');

require('unicode-6.2.0/properties/Diacritic/code-points');
require('unicode-6.2.0/properties/Diacritic/symbols');
require('unicode-6.2.0/properties/Diacritic/regex');

require('unicode-6.2.0/properties/Expands_On_NFC/code-points');
require('unicode-6.2.0/properties/Expands_On_NFC/symbols');
require('unicode-6.2.0/properties/Expands_On_NFC/regex');

require('unicode-6.2.0/properties/Expands_On_NFD/code-points');
require('unicode-6.2.0/properties/Expands_On_NFD/symbols');
require('unicode-6.2.0/properties/Expands_On_NFD/regex');

require('unicode-6.2.0/properties/Expands_On_NFKC/code-points');
require('unicode-6.2.0/properties/Expands_On_NFKC/symbols');
require('unicode-6.2.0/properties/Expands_On_NFKC/regex');

require('unicode-6.2.0/properties/Expands_On_NFKD/code-points');
require('unicode-6.2.0/properties/Expands_On_NFKD/symbols');
require('unicode-6.2.0/properties/Expands_On_NFKD/regex');

require('unicode-6.2.0/properties/Extender/code-points');
require('unicode-6.2.0/properties/Extender/symbols');
require('unicode-6.2.0/properties/Extender/regex');

require('unicode-6.2.0/properties/FC_NFKC_Closure/code-points');
require('unicode-6.2.0/properties/FC_NFKC_Closure/symbols');
require('unicode-6.2.0/properties/FC_NFKC_Closure/regex');

require('unicode-6.2.0/properties/Full_Composition_Exclusion/code-points');
require('unicode-6.2.0/properties/Full_Composition_Exclusion/symbols');
require('unicode-6.2.0/properties/Full_Composition_Exclusion/regex');

require('unicode-6.2.0/properties/Grapheme_Base/code-points');
require('unicode-6.2.0/properties/Grapheme_Base/symbols');
require('unicode-6.2.0/properties/Grapheme_Base/regex');

require('unicode-6.2.0/properties/Grapheme_Extend/code-points');
require('unicode-6.2.0/properties/Grapheme_Extend/symbols');
require('unicode-6.2.0/properties/Grapheme_Extend/regex');

require('unicode-6.2.0/properties/Grapheme_Link/code-points');
require('unicode-6.2.0/properties/Grapheme_Link/symbols');
require('unicode-6.2.0/properties/Grapheme_Link/regex');

require('unicode-6.2.0/properties/Hex_Digit/code-points');
require('unicode-6.2.0/properties/Hex_Digit/symbols');
require('unicode-6.2.0/properties/Hex_Digit/regex');

require('unicode-6.2.0/properties/Hyphen/code-points');
require('unicode-6.2.0/properties/Hyphen/symbols');
require('unicode-6.2.0/properties/Hyphen/regex');

require('unicode-6.2.0/properties/IDS_Binary_Operator/code-points');
require('unicode-6.2.0/properties/IDS_Binary_Operator/symbols');
require('unicode-6.2.0/properties/IDS_Binary_Operator/regex');

require('unicode-6.2.0/properties/IDS_Trinary_Operator/code-points');
require('unicode-6.2.0/properties/IDS_Trinary_Operator/symbols');
require('unicode-6.2.0/properties/IDS_Trinary_Operator/regex');

require('unicode-6.2.0/properties/ID_Continue/code-points');
require('unicode-6.2.0/properties/ID_Continue/symbols');
require('unicode-6.2.0/properties/ID_Continue/regex');

require('unicode-6.2.0/properties/ID_Start/code-points');
require('unicode-6.2.0/properties/ID_Start/symbols');
require('unicode-6.2.0/properties/ID_Start/regex');

require('unicode-6.2.0/properties/Ideographic/code-points');
require('unicode-6.2.0/properties/Ideographic/symbols');
require('unicode-6.2.0/properties/Ideographic/regex');

require('unicode-6.2.0/properties/Join_Control/code-points');
require('unicode-6.2.0/properties/Join_Control/symbols');
require('unicode-6.2.0/properties/Join_Control/regex');

require('unicode-6.2.0/properties/Logical_Order_Exception/code-points');
require('unicode-6.2.0/properties/Logical_Order_Exception/symbols');
require('unicode-6.2.0/properties/Logical_Order_Exception/regex');

require('unicode-6.2.0/properties/Lowercase/code-points');
require('unicode-6.2.0/properties/Lowercase/symbols');
require('unicode-6.2.0/properties/Lowercase/regex');

require('unicode-6.2.0/properties/Math/code-points');
require('unicode-6.2.0/properties/Math/symbols');
require('unicode-6.2.0/properties/Math/regex');

require('unicode-6.2.0/properties/Noncharacter_Code_Point/code-points');
require('unicode-6.2.0/properties/Noncharacter_Code_Point/symbols');
require('unicode-6.2.0/properties/Noncharacter_Code_Point/regex');

require('unicode-6.2.0/properties/Other_Alphabetic/code-points');
require('unicode-6.2.0/properties/Other_Alphabetic/symbols');
require('unicode-6.2.0/properties/Other_Alphabetic/regex');

require('unicode-6.2.0/properties/Other_Default_Ignorable_Code_Point/code-points');
require('unicode-6.2.0/properties/Other_Default_Ignorable_Code_Point/symbols');
require('unicode-6.2.0/properties/Other_Default_Ignorable_Code_Point/regex');

require('unicode-6.2.0/properties/Other_Grapheme_Extend/code-points');
require('unicode-6.2.0/properties/Other_Grapheme_Extend/symbols');
require('unicode-6.2.0/properties/Other_Grapheme_Extend/regex');

require('unicode-6.2.0/properties/Other_ID_Continue/code-points');
require('unicode-6.2.0/properties/Other_ID_Continue/symbols');
require('unicode-6.2.0/properties/Other_ID_Continue/regex');

require('unicode-6.2.0/properties/Other_ID_Start/code-points');
require('unicode-6.2.0/properties/Other_ID_Start/symbols');
require('unicode-6.2.0/properties/Other_ID_Start/regex');

require('unicode-6.2.0/properties/Other_Lowercase/code-points');
require('unicode-6.2.0/properties/Other_Lowercase/symbols');
require('unicode-6.2.0/properties/Other_Lowercase/regex');

require('unicode-6.2.0/properties/Other_Math/code-points');
require('unicode-6.2.0/properties/Other_Math/symbols');
require('unicode-6.2.0/properties/Other_Math/regex');

require('unicode-6.2.0/properties/Other_Uppercase/code-points');
require('unicode-6.2.0/properties/Other_Uppercase/symbols');
require('unicode-6.2.0/properties/Other_Uppercase/regex');

require('unicode-6.2.0/properties/Pattern_Syntax/code-points');
require('unicode-6.2.0/properties/Pattern_Syntax/symbols');
require('unicode-6.2.0/properties/Pattern_Syntax/regex');

require('unicode-6.2.0/properties/Pattern_White_Space/code-points');
require('unicode-6.2.0/properties/Pattern_White_Space/symbols');
require('unicode-6.2.0/properties/Pattern_White_Space/regex');

require('unicode-6.2.0/properties/Quotation_Mark/code-points');
require('unicode-6.2.0/properties/Quotation_Mark/symbols');
require('unicode-6.2.0/properties/Quotation_Mark/regex');

require('unicode-6.2.0/properties/Radical/code-points');
require('unicode-6.2.0/properties/Radical/symbols');
require('unicode-6.2.0/properties/Radical/regex');

require('unicode-6.2.0/properties/STerm/code-points');
require('unicode-6.2.0/properties/STerm/symbols');
require('unicode-6.2.0/properties/STerm/regex');

require('unicode-6.2.0/properties/Soft_Dotted/code-points');
require('unicode-6.2.0/properties/Soft_Dotted/symbols');
require('unicode-6.2.0/properties/Soft_Dotted/regex');

require('unicode-6.2.0/properties/Terminal_Punctuation/code-points');
require('unicode-6.2.0/properties/Terminal_Punctuation/symbols');
require('unicode-6.2.0/properties/Terminal_Punctuation/regex');

require('unicode-6.2.0/properties/Unified_Ideograph/code-points');
require('unicode-6.2.0/properties/Unified_Ideograph/symbols');
require('unicode-6.2.0/properties/Unified_Ideograph/regex');

require('unicode-6.2.0/properties/Uppercase/code-points');
require('unicode-6.2.0/properties/Uppercase/symbols');
require('unicode-6.2.0/properties/Uppercase/regex');

require('unicode-6.2.0/properties/Variation_Selector/code-points');
require('unicode-6.2.0/properties/Variation_Selector/symbols');
require('unicode-6.2.0/properties/Variation_Selector/regex');

require('unicode-6.2.0/properties/White_Space/code-points');
require('unicode-6.2.0/properties/White_Space/symbols');
require('unicode-6.2.0/properties/White_Space/regex');

require('unicode-6.2.0/properties/XID_Continue/code-points');
require('unicode-6.2.0/properties/XID_Continue/symbols');
require('unicode-6.2.0/properties/XID_Continue/regex');

require('unicode-6.2.0/properties/XID_Start/code-points');
require('unicode-6.2.0/properties/XID_Start/symbols');
require('unicode-6.2.0/properties/XID_Start/regex');

// categories:

require('unicode-6.2.0/categories').get(codePoint); // lookup map

require('unicode-6.2.0/categories/Cased_Letter/code-points');
require('unicode-6.2.0/categories/Cased_Letter/symbols');
require('unicode-6.2.0/categories/Cased_Letter/regex');

require('unicode-6.2.0/categories/Close_Punctuation/code-points');
require('unicode-6.2.0/categories/Close_Punctuation/symbols');
require('unicode-6.2.0/categories/Close_Punctuation/regex');

require('unicode-6.2.0/categories/Connector_Punctuation/code-points');
require('unicode-6.2.0/categories/Connector_Punctuation/symbols');
require('unicode-6.2.0/categories/Connector_Punctuation/regex');

require('unicode-6.2.0/categories/Control/code-points');
require('unicode-6.2.0/categories/Control/symbols');
require('unicode-6.2.0/categories/Control/regex');

require('unicode-6.2.0/categories/Currency_Symbol/code-points');
require('unicode-6.2.0/categories/Currency_Symbol/symbols');
require('unicode-6.2.0/categories/Currency_Symbol/regex');

require('unicode-6.2.0/categories/Dash_Punctuation/code-points');
require('unicode-6.2.0/categories/Dash_Punctuation/symbols');
require('unicode-6.2.0/categories/Dash_Punctuation/regex');

require('unicode-6.2.0/categories/Decimal_Number/code-points');
require('unicode-6.2.0/categories/Decimal_Number/symbols');
require('unicode-6.2.0/categories/Decimal_Number/regex');

require('unicode-6.2.0/categories/Enclosing_Mark/code-points');
require('unicode-6.2.0/categories/Enclosing_Mark/symbols');
require('unicode-6.2.0/categories/Enclosing_Mark/regex');

require('unicode-6.2.0/categories/Final_Punctuation/code-points');
require('unicode-6.2.0/categories/Final_Punctuation/symbols');
require('unicode-6.2.0/categories/Final_Punctuation/regex');

require('unicode-6.2.0/categories/Format/code-points');
require('unicode-6.2.0/categories/Format/symbols');
require('unicode-6.2.0/categories/Format/regex');

require('unicode-6.2.0/categories/Initial_Punctuation/code-points');
require('unicode-6.2.0/categories/Initial_Punctuation/symbols');
require('unicode-6.2.0/categories/Initial_Punctuation/regex');

require('unicode-6.2.0/categories/Letter/code-points');
require('unicode-6.2.0/categories/Letter/symbols');
require('unicode-6.2.0/categories/Letter/regex');

require('unicode-6.2.0/categories/Letter_Number/code-points');
require('unicode-6.2.0/categories/Letter_Number/symbols');
require('unicode-6.2.0/categories/Letter_Number/regex');

require('unicode-6.2.0/categories/Line_Separator/code-points');
require('unicode-6.2.0/categories/Line_Separator/symbols');
require('unicode-6.2.0/categories/Line_Separator/regex');

require('unicode-6.2.0/categories/Lowercase_Letter/code-points');
require('unicode-6.2.0/categories/Lowercase_Letter/symbols');
require('unicode-6.2.0/categories/Lowercase_Letter/regex');

require('unicode-6.2.0/categories/Mark/code-points');
require('unicode-6.2.0/categories/Mark/symbols');
require('unicode-6.2.0/categories/Mark/regex');

require('unicode-6.2.0/categories/Math_Symbol/code-points');
require('unicode-6.2.0/categories/Math_Symbol/symbols');
require('unicode-6.2.0/categories/Math_Symbol/regex');

require('unicode-6.2.0/categories/Modifier_Letter/code-points');
require('unicode-6.2.0/categories/Modifier_Letter/symbols');
require('unicode-6.2.0/categories/Modifier_Letter/regex');

require('unicode-6.2.0/categories/Modifier_Symbol/code-points');
require('unicode-6.2.0/categories/Modifier_Symbol/symbols');
require('unicode-6.2.0/categories/Modifier_Symbol/regex');

require('unicode-6.2.0/categories/Nonspacing_Mark/code-points');
require('unicode-6.2.0/categories/Nonspacing_Mark/symbols');
require('unicode-6.2.0/categories/Nonspacing_Mark/regex');

require('unicode-6.2.0/categories/Number/code-points');
require('unicode-6.2.0/categories/Number/symbols');
require('unicode-6.2.0/categories/Number/regex');

require('unicode-6.2.0/categories/Open_Punctuation/code-points');
require('unicode-6.2.0/categories/Open_Punctuation/symbols');
require('unicode-6.2.0/categories/Open_Punctuation/regex');

require('unicode-6.2.0/categories/Other/code-points');
require('unicode-6.2.0/categories/Other/symbols');
require('unicode-6.2.0/categories/Other/regex');

require('unicode-6.2.0/categories/Other_Letter/code-points');
require('unicode-6.2.0/categories/Other_Letter/symbols');
require('unicode-6.2.0/categories/Other_Letter/regex');

require('unicode-6.2.0/categories/Other_Number/code-points');
require('unicode-6.2.0/categories/Other_Number/symbols');
require('unicode-6.2.0/categories/Other_Number/regex');

require('unicode-6.2.0/categories/Other_Punctuation/code-points');
require('unicode-6.2.0/categories/Other_Punctuation/symbols');
require('unicode-6.2.0/categories/Other_Punctuation/regex');

require('unicode-6.2.0/categories/Other_Symbol/code-points');
require('unicode-6.2.0/categories/Other_Symbol/symbols');
require('unicode-6.2.0/categories/Other_Symbol/regex');

require('unicode-6.2.0/categories/Paragraph_Separator/code-points');
require('unicode-6.2.0/categories/Paragraph_Separator/symbols');
require('unicode-6.2.0/categories/Paragraph_Separator/regex');

require('unicode-6.2.0/categories/Private_Use/code-points');
require('unicode-6.2.0/categories/Private_Use/symbols');
require('unicode-6.2.0/categories/Private_Use/regex');

require('unicode-6.2.0/categories/Punctuation/code-points');
require('unicode-6.2.0/categories/Punctuation/symbols');
require('unicode-6.2.0/categories/Punctuation/regex');

require('unicode-6.2.0/categories/Separator/code-points');
require('unicode-6.2.0/categories/Separator/symbols');
require('unicode-6.2.0/categories/Separator/regex');

require('unicode-6.2.0/categories/Space_Separator/code-points');
require('unicode-6.2.0/categories/Space_Separator/symbols');
require('unicode-6.2.0/categories/Space_Separator/regex');

require('unicode-6.2.0/categories/Spacing_Mark/code-points');
require('unicode-6.2.0/categories/Spacing_Mark/symbols');
require('unicode-6.2.0/categories/Spacing_Mark/regex');

require('unicode-6.2.0/categories/Surrogate/code-points');
require('unicode-6.2.0/categories/Surrogate/symbols');
require('unicode-6.2.0/categories/Surrogate/regex');

require('unicode-6.2.0/categories/Symbol/code-points');
require('unicode-6.2.0/categories/Symbol/symbols');
require('unicode-6.2.0/categories/Symbol/regex');

require('unicode-6.2.0/categories/Titlecase_Letter/code-points');
require('unicode-6.2.0/categories/Titlecase_Letter/symbols');
require('unicode-6.2.0/categories/Titlecase_Letter/regex');

require('unicode-6.2.0/categories/Unassigned/code-points');
require('unicode-6.2.0/categories/Unassigned/symbols');
require('unicode-6.2.0/categories/Unassigned/regex');

require('unicode-6.2.0/categories/Uppercase_Letter/code-points');
require('unicode-6.2.0/categories/Uppercase_Letter/symbols');
require('unicode-6.2.0/categories/Uppercase_Letter/regex');

// bidi classes:

require('unicode-6.2.0/bidi-classes').get(codePoint); // lookup map

require('unicode-6.2.0/bidi-classes/Arabic_Letter/code-points');
require('unicode-6.2.0/bidi-classes/Arabic_Letter/symbols');
require('unicode-6.2.0/bidi-classes/Arabic_Letter/regex');

require('unicode-6.2.0/bidi-classes/Arabic_Number/code-points');
require('unicode-6.2.0/bidi-classes/Arabic_Number/symbols');
require('unicode-6.2.0/bidi-classes/Arabic_Number/regex');

require('unicode-6.2.0/bidi-classes/Boundary_Neutral/code-points');
require('unicode-6.2.0/bidi-classes/Boundary_Neutral/symbols');
require('unicode-6.2.0/bidi-classes/Boundary_Neutral/regex');

require('unicode-6.2.0/bidi-classes/Common_Separator/code-points');
require('unicode-6.2.0/bidi-classes/Common_Separator/symbols');
require('unicode-6.2.0/bidi-classes/Common_Separator/regex');

require('unicode-6.2.0/bidi-classes/European_Number/code-points');
require('unicode-6.2.0/bidi-classes/European_Number/symbols');
require('unicode-6.2.0/bidi-classes/European_Number/regex');

require('unicode-6.2.0/bidi-classes/European_Separator/code-points');
require('unicode-6.2.0/bidi-classes/European_Separator/symbols');
require('unicode-6.2.0/bidi-classes/European_Separator/regex');

require('unicode-6.2.0/bidi-classes/European_Terminator/code-points');
require('unicode-6.2.0/bidi-classes/European_Terminator/symbols');
require('unicode-6.2.0/bidi-classes/European_Terminator/regex');

require('unicode-6.2.0/bidi-classes/Left_To_Right/code-points');
require('unicode-6.2.0/bidi-classes/Left_To_Right/symbols');
require('unicode-6.2.0/bidi-classes/Left_To_Right/regex');

require('unicode-6.2.0/bidi-classes/Left_To_Right_Embedding/code-points');
require('unicode-6.2.0/bidi-classes/Left_To_Right_Embedding/symbols');
require('unicode-6.2.0/bidi-classes/Left_To_Right_Embedding/regex');

require('unicode-6.2.0/bidi-classes/Left_To_Right_Override/code-points');
require('unicode-6.2.0/bidi-classes/Left_To_Right_Override/symbols');
require('unicode-6.2.0/bidi-classes/Left_To_Right_Override/regex');

require('unicode-6.2.0/bidi-classes/Nonspacing_Mark/code-points');
require('unicode-6.2.0/bidi-classes/Nonspacing_Mark/symbols');
require('unicode-6.2.0/bidi-classes/Nonspacing_Mark/regex');

require('unicode-6.2.0/bidi-classes/Other_Neutral/code-points');
require('unicode-6.2.0/bidi-classes/Other_Neutral/symbols');
require('unicode-6.2.0/bidi-classes/Other_Neutral/regex');

require('unicode-6.2.0/bidi-classes/Paragraph_Separator/code-points');
require('unicode-6.2.0/bidi-classes/Paragraph_Separator/symbols');
require('unicode-6.2.0/bidi-classes/Paragraph_Separator/regex');

require('unicode-6.2.0/bidi-classes/Pop_Directional_Format/code-points');
require('unicode-6.2.0/bidi-classes/Pop_Directional_Format/symbols');
require('unicode-6.2.0/bidi-classes/Pop_Directional_Format/regex');

require('unicode-6.2.0/bidi-classes/Right_To_Left/code-points');
require('unicode-6.2.0/bidi-classes/Right_To_Left/symbols');
require('unicode-6.2.0/bidi-classes/Right_To_Left/regex');

require('unicode-6.2.0/bidi-classes/Right_To_Left_Embedding/code-points');
require('unicode-6.2.0/bidi-classes/Right_To_Left_Embedding/symbols');
require('unicode-6.2.0/bidi-classes/Right_To_Left_Embedding/regex');

require('unicode-6.2.0/bidi-classes/Right_To_Left_Override/code-points');
require('unicode-6.2.0/bidi-classes/Right_To_Left_Override/symbols');
require('unicode-6.2.0/bidi-classes/Right_To_Left_Override/regex');

require('unicode-6.2.0/bidi-classes/Segment_Separator/code-points');
require('unicode-6.2.0/bidi-classes/Segment_Separator/symbols');
require('unicode-6.2.0/bidi-classes/Segment_Separator/regex');

require('unicode-6.2.0/bidi-classes/White_Space/code-points');
require('unicode-6.2.0/bidi-classes/White_Space/symbols');
require('unicode-6.2.0/bidi-classes/White_Space/regex');

// scripts:

require('unicode-6.2.0/scripts/Arabic/code-points');
require('unicode-6.2.0/scripts/Arabic/symbols');
require('unicode-6.2.0/scripts/Arabic/regex');

require('unicode-6.2.0/scripts/Armenian/code-points');
require('unicode-6.2.0/scripts/Armenian/symbols');
require('unicode-6.2.0/scripts/Armenian/regex');

require('unicode-6.2.0/scripts/Avestan/code-points');
require('unicode-6.2.0/scripts/Avestan/symbols');
require('unicode-6.2.0/scripts/Avestan/regex');

require('unicode-6.2.0/scripts/Balinese/code-points');
require('unicode-6.2.0/scripts/Balinese/symbols');
require('unicode-6.2.0/scripts/Balinese/regex');

require('unicode-6.2.0/scripts/Bamum/code-points');
require('unicode-6.2.0/scripts/Bamum/symbols');
require('unicode-6.2.0/scripts/Bamum/regex');

require('unicode-6.2.0/scripts/Batak/code-points');
require('unicode-6.2.0/scripts/Batak/symbols');
require('unicode-6.2.0/scripts/Batak/regex');

require('unicode-6.2.0/scripts/Bengali/code-points');
require('unicode-6.2.0/scripts/Bengali/symbols');
require('unicode-6.2.0/scripts/Bengali/regex');

require('unicode-6.2.0/scripts/Bopomofo/code-points');
require('unicode-6.2.0/scripts/Bopomofo/symbols');
require('unicode-6.2.0/scripts/Bopomofo/regex');

require('unicode-6.2.0/scripts/Brahmi/code-points');
require('unicode-6.2.0/scripts/Brahmi/symbols');
require('unicode-6.2.0/scripts/Brahmi/regex');

require('unicode-6.2.0/scripts/Braille/code-points');
require('unicode-6.2.0/scripts/Braille/symbols');
require('unicode-6.2.0/scripts/Braille/regex');

require('unicode-6.2.0/scripts/Buginese/code-points');
require('unicode-6.2.0/scripts/Buginese/symbols');
require('unicode-6.2.0/scripts/Buginese/regex');

require('unicode-6.2.0/scripts/Buhid/code-points');
require('unicode-6.2.0/scripts/Buhid/symbols');
require('unicode-6.2.0/scripts/Buhid/regex');

require('unicode-6.2.0/scripts/Canadian_Aboriginal/code-points');
require('unicode-6.2.0/scripts/Canadian_Aboriginal/symbols');
require('unicode-6.2.0/scripts/Canadian_Aboriginal/regex');

require('unicode-6.2.0/scripts/Carian/code-points');
require('unicode-6.2.0/scripts/Carian/symbols');
require('unicode-6.2.0/scripts/Carian/regex');

require('unicode-6.2.0/scripts/Chakma/code-points');
require('unicode-6.2.0/scripts/Chakma/symbols');
require('unicode-6.2.0/scripts/Chakma/regex');

require('unicode-6.2.0/scripts/Cham/code-points');
require('unicode-6.2.0/scripts/Cham/symbols');
require('unicode-6.2.0/scripts/Cham/regex');

require('unicode-6.2.0/scripts/Cherokee/code-points');
require('unicode-6.2.0/scripts/Cherokee/symbols');
require('unicode-6.2.0/scripts/Cherokee/regex');

require('unicode-6.2.0/scripts/Common/code-points');
require('unicode-6.2.0/scripts/Common/symbols');
require('unicode-6.2.0/scripts/Common/regex');

require('unicode-6.2.0/scripts/Coptic/code-points');
require('unicode-6.2.0/scripts/Coptic/symbols');
require('unicode-6.2.0/scripts/Coptic/regex');

require('unicode-6.2.0/scripts/Cuneiform/code-points');
require('unicode-6.2.0/scripts/Cuneiform/symbols');
require('unicode-6.2.0/scripts/Cuneiform/regex');

require('unicode-6.2.0/scripts/Cypriot/code-points');
require('unicode-6.2.0/scripts/Cypriot/symbols');
require('unicode-6.2.0/scripts/Cypriot/regex');

require('unicode-6.2.0/scripts/Cyrillic/code-points');
require('unicode-6.2.0/scripts/Cyrillic/symbols');
require('unicode-6.2.0/scripts/Cyrillic/regex');

require('unicode-6.2.0/scripts/Deseret/code-points');
require('unicode-6.2.0/scripts/Deseret/symbols');
require('unicode-6.2.0/scripts/Deseret/regex');

require('unicode-6.2.0/scripts/Devanagari/code-points');
require('unicode-6.2.0/scripts/Devanagari/symbols');
require('unicode-6.2.0/scripts/Devanagari/regex');

require('unicode-6.2.0/scripts/Egyptian_Hieroglyphs/code-points');
require('unicode-6.2.0/scripts/Egyptian_Hieroglyphs/symbols');
require('unicode-6.2.0/scripts/Egyptian_Hieroglyphs/regex');

require('unicode-6.2.0/scripts/Ethiopic/code-points');
require('unicode-6.2.0/scripts/Ethiopic/symbols');
require('unicode-6.2.0/scripts/Ethiopic/regex');

require('unicode-6.2.0/scripts/Georgian/code-points');
require('unicode-6.2.0/scripts/Georgian/symbols');
require('unicode-6.2.0/scripts/Georgian/regex');

require('unicode-6.2.0/scripts/Glagolitic/code-points');
require('unicode-6.2.0/scripts/Glagolitic/symbols');
require('unicode-6.2.0/scripts/Glagolitic/regex');

require('unicode-6.2.0/scripts/Gothic/code-points');
require('unicode-6.2.0/scripts/Gothic/symbols');
require('unicode-6.2.0/scripts/Gothic/regex');

require('unicode-6.2.0/scripts/Greek/code-points');
require('unicode-6.2.0/scripts/Greek/symbols');
require('unicode-6.2.0/scripts/Greek/regex');

require('unicode-6.2.0/scripts/Gujarati/code-points');
require('unicode-6.2.0/scripts/Gujarati/symbols');
require('unicode-6.2.0/scripts/Gujarati/regex');

require('unicode-6.2.0/scripts/Gurmukhi/code-points');
require('unicode-6.2.0/scripts/Gurmukhi/symbols');
require('unicode-6.2.0/scripts/Gurmukhi/regex');

require('unicode-6.2.0/scripts/Han/code-points');
require('unicode-6.2.0/scripts/Han/symbols');
require('unicode-6.2.0/scripts/Han/regex');

require('unicode-6.2.0/scripts/Hangul/code-points');
require('unicode-6.2.0/scripts/Hangul/symbols');
require('unicode-6.2.0/scripts/Hangul/regex');

require('unicode-6.2.0/scripts/Hanunoo/code-points');
require('unicode-6.2.0/scripts/Hanunoo/symbols');
require('unicode-6.2.0/scripts/Hanunoo/regex');

require('unicode-6.2.0/scripts/Hebrew/code-points');
require('unicode-6.2.0/scripts/Hebrew/symbols');
require('unicode-6.2.0/scripts/Hebrew/regex');

require('unicode-6.2.0/scripts/Hiragana/code-points');
require('unicode-6.2.0/scripts/Hiragana/symbols');
require('unicode-6.2.0/scripts/Hiragana/regex');

require('unicode-6.2.0/scripts/Imperial_Aramaic/code-points');
require('unicode-6.2.0/scripts/Imperial_Aramaic/symbols');
require('unicode-6.2.0/scripts/Imperial_Aramaic/regex');

require('unicode-6.2.0/scripts/Inherited/code-points');
require('unicode-6.2.0/scripts/Inherited/symbols');
require('unicode-6.2.0/scripts/Inherited/regex');

require('unicode-6.2.0/scripts/Inscriptional_Pahlavi/code-points');
require('unicode-6.2.0/scripts/Inscriptional_Pahlavi/symbols');
require('unicode-6.2.0/scripts/Inscriptional_Pahlavi/regex');

require('unicode-6.2.0/scripts/Inscriptional_Parthian/code-points');
require('unicode-6.2.0/scripts/Inscriptional_Parthian/symbols');
require('unicode-6.2.0/scripts/Inscriptional_Parthian/regex');

require('unicode-6.2.0/scripts/Javanese/code-points');
require('unicode-6.2.0/scripts/Javanese/symbols');
require('unicode-6.2.0/scripts/Javanese/regex');

require('unicode-6.2.0/scripts/Kaithi/code-points');
require('unicode-6.2.0/scripts/Kaithi/symbols');
require('unicode-6.2.0/scripts/Kaithi/regex');

require('unicode-6.2.0/scripts/Kannada/code-points');
require('unicode-6.2.0/scripts/Kannada/symbols');
require('unicode-6.2.0/scripts/Kannada/regex');

require('unicode-6.2.0/scripts/Katakana/code-points');
require('unicode-6.2.0/scripts/Katakana/symbols');
require('unicode-6.2.0/scripts/Katakana/regex');

require('unicode-6.2.0/scripts/Kayah_Li/code-points');
require('unicode-6.2.0/scripts/Kayah_Li/symbols');
require('unicode-6.2.0/scripts/Kayah_Li/regex');

require('unicode-6.2.0/scripts/Kharoshthi/code-points');
require('unicode-6.2.0/scripts/Kharoshthi/symbols');
require('unicode-6.2.0/scripts/Kharoshthi/regex');

require('unicode-6.2.0/scripts/Khmer/code-points');
require('unicode-6.2.0/scripts/Khmer/symbols');
require('unicode-6.2.0/scripts/Khmer/regex');

require('unicode-6.2.0/scripts/Lao/code-points');
require('unicode-6.2.0/scripts/Lao/symbols');
require('unicode-6.2.0/scripts/Lao/regex');

require('unicode-6.2.0/scripts/Latin/code-points');
require('unicode-6.2.0/scripts/Latin/symbols');
require('unicode-6.2.0/scripts/Latin/regex');

require('unicode-6.2.0/scripts/Lepcha/code-points');
require('unicode-6.2.0/scripts/Lepcha/symbols');
require('unicode-6.2.0/scripts/Lepcha/regex');

require('unicode-6.2.0/scripts/Limbu/code-points');
require('unicode-6.2.0/scripts/Limbu/symbols');
require('unicode-6.2.0/scripts/Limbu/regex');

require('unicode-6.2.0/scripts/Linear_B/code-points');
require('unicode-6.2.0/scripts/Linear_B/symbols');
require('unicode-6.2.0/scripts/Linear_B/regex');

require('unicode-6.2.0/scripts/Lisu/code-points');
require('unicode-6.2.0/scripts/Lisu/symbols');
require('unicode-6.2.0/scripts/Lisu/regex');

require('unicode-6.2.0/scripts/Lycian/code-points');
require('unicode-6.2.0/scripts/Lycian/symbols');
require('unicode-6.2.0/scripts/Lycian/regex');

require('unicode-6.2.0/scripts/Lydian/code-points');
require('unicode-6.2.0/scripts/Lydian/symbols');
require('unicode-6.2.0/scripts/Lydian/regex');

require('unicode-6.2.0/scripts/Malayalam/code-points');
require('unicode-6.2.0/scripts/Malayalam/symbols');
require('unicode-6.2.0/scripts/Malayalam/regex');

require('unicode-6.2.0/scripts/Mandaic/code-points');
require('unicode-6.2.0/scripts/Mandaic/symbols');
require('unicode-6.2.0/scripts/Mandaic/regex');

require('unicode-6.2.0/scripts/Meetei_Mayek/code-points');
require('unicode-6.2.0/scripts/Meetei_Mayek/symbols');
require('unicode-6.2.0/scripts/Meetei_Mayek/regex');

require('unicode-6.2.0/scripts/Meroitic_Cursive/code-points');
require('unicode-6.2.0/scripts/Meroitic_Cursive/symbols');
require('unicode-6.2.0/scripts/Meroitic_Cursive/regex');

require('unicode-6.2.0/scripts/Meroitic_Hieroglyphs/code-points');
require('unicode-6.2.0/scripts/Meroitic_Hieroglyphs/symbols');
require('unicode-6.2.0/scripts/Meroitic_Hieroglyphs/regex');

require('unicode-6.2.0/scripts/Miao/code-points');
require('unicode-6.2.0/scripts/Miao/symbols');
require('unicode-6.2.0/scripts/Miao/regex');

require('unicode-6.2.0/scripts/Mongolian/code-points');
require('unicode-6.2.0/scripts/Mongolian/symbols');
require('unicode-6.2.0/scripts/Mongolian/regex');

require('unicode-6.2.0/scripts/Myanmar/code-points');
require('unicode-6.2.0/scripts/Myanmar/symbols');
require('unicode-6.2.0/scripts/Myanmar/regex');

require('unicode-6.2.0/scripts/New_Tai_Lue/code-points');
require('unicode-6.2.0/scripts/New_Tai_Lue/symbols');
require('unicode-6.2.0/scripts/New_Tai_Lue/regex');

require('unicode-6.2.0/scripts/Nko/code-points');
require('unicode-6.2.0/scripts/Nko/symbols');
require('unicode-6.2.0/scripts/Nko/regex');

require('unicode-6.2.0/scripts/Ogham/code-points');
require('unicode-6.2.0/scripts/Ogham/symbols');
require('unicode-6.2.0/scripts/Ogham/regex');

require('unicode-6.2.0/scripts/Ol_Chiki/code-points');
require('unicode-6.2.0/scripts/Ol_Chiki/symbols');
require('unicode-6.2.0/scripts/Ol_Chiki/regex');

require('unicode-6.2.0/scripts/Old_Italic/code-points');
require('unicode-6.2.0/scripts/Old_Italic/symbols');
require('unicode-6.2.0/scripts/Old_Italic/regex');

require('unicode-6.2.0/scripts/Old_Persian/code-points');
require('unicode-6.2.0/scripts/Old_Persian/symbols');
require('unicode-6.2.0/scripts/Old_Persian/regex');

require('unicode-6.2.0/scripts/Old_South_Arabian/code-points');
require('unicode-6.2.0/scripts/Old_South_Arabian/symbols');
require('unicode-6.2.0/scripts/Old_South_Arabian/regex');

require('unicode-6.2.0/scripts/Old_Turkic/code-points');
require('unicode-6.2.0/scripts/Old_Turkic/symbols');
require('unicode-6.2.0/scripts/Old_Turkic/regex');

require('unicode-6.2.0/scripts/Oriya/code-points');
require('unicode-6.2.0/scripts/Oriya/symbols');
require('unicode-6.2.0/scripts/Oriya/regex');

require('unicode-6.2.0/scripts/Osmanya/code-points');
require('unicode-6.2.0/scripts/Osmanya/symbols');
require('unicode-6.2.0/scripts/Osmanya/regex');

require('unicode-6.2.0/scripts/Phags_Pa/code-points');
require('unicode-6.2.0/scripts/Phags_Pa/symbols');
require('unicode-6.2.0/scripts/Phags_Pa/regex');

require('unicode-6.2.0/scripts/Phoenician/code-points');
require('unicode-6.2.0/scripts/Phoenician/symbols');
require('unicode-6.2.0/scripts/Phoenician/regex');

require('unicode-6.2.0/scripts/Rejang/code-points');
require('unicode-6.2.0/scripts/Rejang/symbols');
require('unicode-6.2.0/scripts/Rejang/regex');

require('unicode-6.2.0/scripts/Runic/code-points');
require('unicode-6.2.0/scripts/Runic/symbols');
require('unicode-6.2.0/scripts/Runic/regex');

require('unicode-6.2.0/scripts/Samaritan/code-points');
require('unicode-6.2.0/scripts/Samaritan/symbols');
require('unicode-6.2.0/scripts/Samaritan/regex');

require('unicode-6.2.0/scripts/Saurashtra/code-points');
require('unicode-6.2.0/scripts/Saurashtra/symbols');
require('unicode-6.2.0/scripts/Saurashtra/regex');

require('unicode-6.2.0/scripts/Sharada/code-points');
require('unicode-6.2.0/scripts/Sharada/symbols');
require('unicode-6.2.0/scripts/Sharada/regex');

require('unicode-6.2.0/scripts/Shavian/code-points');
require('unicode-6.2.0/scripts/Shavian/symbols');
require('unicode-6.2.0/scripts/Shavian/regex');

require('unicode-6.2.0/scripts/Sinhala/code-points');
require('unicode-6.2.0/scripts/Sinhala/symbols');
require('unicode-6.2.0/scripts/Sinhala/regex');

require('unicode-6.2.0/scripts/Sora_Sompeng/code-points');
require('unicode-6.2.0/scripts/Sora_Sompeng/symbols');
require('unicode-6.2.0/scripts/Sora_Sompeng/regex');

require('unicode-6.2.0/scripts/Sundanese/code-points');
require('unicode-6.2.0/scripts/Sundanese/symbols');
require('unicode-6.2.0/scripts/Sundanese/regex');

require('unicode-6.2.0/scripts/Syloti_Nagri/code-points');
require('unicode-6.2.0/scripts/Syloti_Nagri/symbols');
require('unicode-6.2.0/scripts/Syloti_Nagri/regex');

require('unicode-6.2.0/scripts/Syriac/code-points');
require('unicode-6.2.0/scripts/Syriac/symbols');
require('unicode-6.2.0/scripts/Syriac/regex');

require('unicode-6.2.0/scripts/Tagalog/code-points');
require('unicode-6.2.0/scripts/Tagalog/symbols');
require('unicode-6.2.0/scripts/Tagalog/regex');

require('unicode-6.2.0/scripts/Tagbanwa/code-points');
require('unicode-6.2.0/scripts/Tagbanwa/symbols');
require('unicode-6.2.0/scripts/Tagbanwa/regex');

require('unicode-6.2.0/scripts/Tai_Le/code-points');
require('unicode-6.2.0/scripts/Tai_Le/symbols');
require('unicode-6.2.0/scripts/Tai_Le/regex');

require('unicode-6.2.0/scripts/Tai_Tham/code-points');
require('unicode-6.2.0/scripts/Tai_Tham/symbols');
require('unicode-6.2.0/scripts/Tai_Tham/regex');

require('unicode-6.2.0/scripts/Tai_Viet/code-points');
require('unicode-6.2.0/scripts/Tai_Viet/symbols');
require('unicode-6.2.0/scripts/Tai_Viet/regex');

require('unicode-6.2.0/scripts/Takri/code-points');
require('unicode-6.2.0/scripts/Takri/symbols');
require('unicode-6.2.0/scripts/Takri/regex');

require('unicode-6.2.0/scripts/Tamil/code-points');
require('unicode-6.2.0/scripts/Tamil/symbols');
require('unicode-6.2.0/scripts/Tamil/regex');

require('unicode-6.2.0/scripts/Telugu/code-points');
require('unicode-6.2.0/scripts/Telugu/symbols');
require('unicode-6.2.0/scripts/Telugu/regex');

require('unicode-6.2.0/scripts/Thaana/code-points');
require('unicode-6.2.0/scripts/Thaana/symbols');
require('unicode-6.2.0/scripts/Thaana/regex');

require('unicode-6.2.0/scripts/Thai/code-points');
require('unicode-6.2.0/scripts/Thai/symbols');
require('unicode-6.2.0/scripts/Thai/regex');

require('unicode-6.2.0/scripts/Tibetan/code-points');
require('unicode-6.2.0/scripts/Tibetan/symbols');
require('unicode-6.2.0/scripts/Tibetan/regex');

require('unicode-6.2.0/scripts/Tifinagh/code-points');
require('unicode-6.2.0/scripts/Tifinagh/symbols');
require('unicode-6.2.0/scripts/Tifinagh/regex');

require('unicode-6.2.0/scripts/Ugaritic/code-points');
require('unicode-6.2.0/scripts/Ugaritic/symbols');
require('unicode-6.2.0/scripts/Ugaritic/regex');

require('unicode-6.2.0/scripts/Vai/code-points');
require('unicode-6.2.0/scripts/Vai/symbols');
require('unicode-6.2.0/scripts/Vai/regex');

require('unicode-6.2.0/scripts/Yi/code-points');
require('unicode-6.2.0/scripts/Yi/symbols');
require('unicode-6.2.0/scripts/Yi/regex');

// script extensions:

require('unicode-6.2.0/script-extensions/Arabic/code-points');
require('unicode-6.2.0/script-extensions/Arabic/symbols');
require('unicode-6.2.0/script-extensions/Arabic/regex');

require('unicode-6.2.0/script-extensions/Armenian/code-points');
require('unicode-6.2.0/script-extensions/Armenian/symbols');
require('unicode-6.2.0/script-extensions/Armenian/regex');

require('unicode-6.2.0/script-extensions/Avestan/code-points');
require('unicode-6.2.0/script-extensions/Avestan/symbols');
require('unicode-6.2.0/script-extensions/Avestan/regex');

require('unicode-6.2.0/script-extensions/Balinese/code-points');
require('unicode-6.2.0/script-extensions/Balinese/symbols');
require('unicode-6.2.0/script-extensions/Balinese/regex');

require('unicode-6.2.0/script-extensions/Bamum/code-points');
require('unicode-6.2.0/script-extensions/Bamum/symbols');
require('unicode-6.2.0/script-extensions/Bamum/regex');

require('unicode-6.2.0/script-extensions/Batak/code-points');
require('unicode-6.2.0/script-extensions/Batak/symbols');
require('unicode-6.2.0/script-extensions/Batak/regex');

require('unicode-6.2.0/script-extensions/Bengali/code-points');
require('unicode-6.2.0/script-extensions/Bengali/symbols');
require('unicode-6.2.0/script-extensions/Bengali/regex');

require('unicode-6.2.0/script-extensions/Bopomofo/code-points');
require('unicode-6.2.0/script-extensions/Bopomofo/symbols');
require('unicode-6.2.0/script-extensions/Bopomofo/regex');

require('unicode-6.2.0/script-extensions/Brahmi/code-points');
require('unicode-6.2.0/script-extensions/Brahmi/symbols');
require('unicode-6.2.0/script-extensions/Brahmi/regex');

require('unicode-6.2.0/script-extensions/Braille/code-points');
require('unicode-6.2.0/script-extensions/Braille/symbols');
require('unicode-6.2.0/script-extensions/Braille/regex');

require('unicode-6.2.0/script-extensions/Buginese/code-points');
require('unicode-6.2.0/script-extensions/Buginese/symbols');
require('unicode-6.2.0/script-extensions/Buginese/regex');

require('unicode-6.2.0/script-extensions/Buhid/code-points');
require('unicode-6.2.0/script-extensions/Buhid/symbols');
require('unicode-6.2.0/script-extensions/Buhid/regex');

require('unicode-6.2.0/script-extensions/Canadian_Aboriginal/code-points');
require('unicode-6.2.0/script-extensions/Canadian_Aboriginal/symbols');
require('unicode-6.2.0/script-extensions/Canadian_Aboriginal/regex');

require('unicode-6.2.0/script-extensions/Carian/code-points');
require('unicode-6.2.0/script-extensions/Carian/symbols');
require('unicode-6.2.0/script-extensions/Carian/regex');

require('unicode-6.2.0/script-extensions/Chakma/code-points');
require('unicode-6.2.0/script-extensions/Chakma/symbols');
require('unicode-6.2.0/script-extensions/Chakma/regex');

require('unicode-6.2.0/script-extensions/Cham/code-points');
require('unicode-6.2.0/script-extensions/Cham/symbols');
require('unicode-6.2.0/script-extensions/Cham/regex');

require('unicode-6.2.0/script-extensions/Cherokee/code-points');
require('unicode-6.2.0/script-extensions/Cherokee/symbols');
require('unicode-6.2.0/script-extensions/Cherokee/regex');

require('unicode-6.2.0/script-extensions/Common/code-points');
require('unicode-6.2.0/script-extensions/Common/symbols');
require('unicode-6.2.0/script-extensions/Common/regex');

require('unicode-6.2.0/script-extensions/Coptic/code-points');
require('unicode-6.2.0/script-extensions/Coptic/symbols');
require('unicode-6.2.0/script-extensions/Coptic/regex');

require('unicode-6.2.0/script-extensions/Cuneiform/code-points');
require('unicode-6.2.0/script-extensions/Cuneiform/symbols');
require('unicode-6.2.0/script-extensions/Cuneiform/regex');

require('unicode-6.2.0/script-extensions/Cypriot/code-points');
require('unicode-6.2.0/script-extensions/Cypriot/symbols');
require('unicode-6.2.0/script-extensions/Cypriot/regex');

require('unicode-6.2.0/script-extensions/Cyrillic/code-points');
require('unicode-6.2.0/script-extensions/Cyrillic/symbols');
require('unicode-6.2.0/script-extensions/Cyrillic/regex');

require('unicode-6.2.0/script-extensions/Deseret/code-points');
require('unicode-6.2.0/script-extensions/Deseret/symbols');
require('unicode-6.2.0/script-extensions/Deseret/regex');

require('unicode-6.2.0/script-extensions/Devanagari/code-points');
require('unicode-6.2.0/script-extensions/Devanagari/symbols');
require('unicode-6.2.0/script-extensions/Devanagari/regex');

require('unicode-6.2.0/script-extensions/Egyptian_Hieroglyphs/code-points');
require('unicode-6.2.0/script-extensions/Egyptian_Hieroglyphs/symbols');
require('unicode-6.2.0/script-extensions/Egyptian_Hieroglyphs/regex');

require('unicode-6.2.0/script-extensions/Ethiopic/code-points');
require('unicode-6.2.0/script-extensions/Ethiopic/symbols');
require('unicode-6.2.0/script-extensions/Ethiopic/regex');

require('unicode-6.2.0/script-extensions/Georgian/code-points');
require('unicode-6.2.0/script-extensions/Georgian/symbols');
require('unicode-6.2.0/script-extensions/Georgian/regex');

require('unicode-6.2.0/script-extensions/Glagolitic/code-points');
require('unicode-6.2.0/script-extensions/Glagolitic/symbols');
require('unicode-6.2.0/script-extensions/Glagolitic/regex');

require('unicode-6.2.0/script-extensions/Gothic/code-points');
require('unicode-6.2.0/script-extensions/Gothic/symbols');
require('unicode-6.2.0/script-extensions/Gothic/regex');

require('unicode-6.2.0/script-extensions/Greek/code-points');
require('unicode-6.2.0/script-extensions/Greek/symbols');
require('unicode-6.2.0/script-extensions/Greek/regex');

require('unicode-6.2.0/script-extensions/Gujarati/code-points');
require('unicode-6.2.0/script-extensions/Gujarati/symbols');
require('unicode-6.2.0/script-extensions/Gujarati/regex');

require('unicode-6.2.0/script-extensions/Gurmukhi/code-points');
require('unicode-6.2.0/script-extensions/Gurmukhi/symbols');
require('unicode-6.2.0/script-extensions/Gurmukhi/regex');

require('unicode-6.2.0/script-extensions/Han/code-points');
require('unicode-6.2.0/script-extensions/Han/symbols');
require('unicode-6.2.0/script-extensions/Han/regex');

require('unicode-6.2.0/script-extensions/Hangul/code-points');
require('unicode-6.2.0/script-extensions/Hangul/symbols');
require('unicode-6.2.0/script-extensions/Hangul/regex');

require('unicode-6.2.0/script-extensions/Hanunoo/code-points');
require('unicode-6.2.0/script-extensions/Hanunoo/symbols');
require('unicode-6.2.0/script-extensions/Hanunoo/regex');

require('unicode-6.2.0/script-extensions/Hebrew/code-points');
require('unicode-6.2.0/script-extensions/Hebrew/symbols');
require('unicode-6.2.0/script-extensions/Hebrew/regex');

require('unicode-6.2.0/script-extensions/Hiragana/code-points');
require('unicode-6.2.0/script-extensions/Hiragana/symbols');
require('unicode-6.2.0/script-extensions/Hiragana/regex');

require('unicode-6.2.0/script-extensions/Imperial_Aramaic/code-points');
require('unicode-6.2.0/script-extensions/Imperial_Aramaic/symbols');
require('unicode-6.2.0/script-extensions/Imperial_Aramaic/regex');

require('unicode-6.2.0/script-extensions/Inherited/code-points');
require('unicode-6.2.0/script-extensions/Inherited/symbols');
require('unicode-6.2.0/script-extensions/Inherited/regex');

require('unicode-6.2.0/script-extensions/Inscriptional_Pahlavi/code-points');
require('unicode-6.2.0/script-extensions/Inscriptional_Pahlavi/symbols');
require('unicode-6.2.0/script-extensions/Inscriptional_Pahlavi/regex');

require('unicode-6.2.0/script-extensions/Inscriptional_Parthian/code-points');
require('unicode-6.2.0/script-extensions/Inscriptional_Parthian/symbols');
require('unicode-6.2.0/script-extensions/Inscriptional_Parthian/regex');

require('unicode-6.2.0/script-extensions/Javanese/code-points');
require('unicode-6.2.0/script-extensions/Javanese/symbols');
require('unicode-6.2.0/script-extensions/Javanese/regex');

require('unicode-6.2.0/script-extensions/Kaithi/code-points');
require('unicode-6.2.0/script-extensions/Kaithi/symbols');
require('unicode-6.2.0/script-extensions/Kaithi/regex');

require('unicode-6.2.0/script-extensions/Kannada/code-points');
require('unicode-6.2.0/script-extensions/Kannada/symbols');
require('unicode-6.2.0/script-extensions/Kannada/regex');

require('unicode-6.2.0/script-extensions/Katakana/code-points');
require('unicode-6.2.0/script-extensions/Katakana/symbols');
require('unicode-6.2.0/script-extensions/Katakana/regex');

require('unicode-6.2.0/script-extensions/Kayah_Li/code-points');
require('unicode-6.2.0/script-extensions/Kayah_Li/symbols');
require('unicode-6.2.0/script-extensions/Kayah_Li/regex');

require('unicode-6.2.0/script-extensions/Kharoshthi/code-points');
require('unicode-6.2.0/script-extensions/Kharoshthi/symbols');
require('unicode-6.2.0/script-extensions/Kharoshthi/regex');

require('unicode-6.2.0/script-extensions/Khmer/code-points');
require('unicode-6.2.0/script-extensions/Khmer/symbols');
require('unicode-6.2.0/script-extensions/Khmer/regex');

require('unicode-6.2.0/script-extensions/Lao/code-points');
require('unicode-6.2.0/script-extensions/Lao/symbols');
require('unicode-6.2.0/script-extensions/Lao/regex');

require('unicode-6.2.0/script-extensions/Latin/code-points');
require('unicode-6.2.0/script-extensions/Latin/symbols');
require('unicode-6.2.0/script-extensions/Latin/regex');

require('unicode-6.2.0/script-extensions/Lepcha/code-points');
require('unicode-6.2.0/script-extensions/Lepcha/symbols');
require('unicode-6.2.0/script-extensions/Lepcha/regex');

require('unicode-6.2.0/script-extensions/Limbu/code-points');
require('unicode-6.2.0/script-extensions/Limbu/symbols');
require('unicode-6.2.0/script-extensions/Limbu/regex');

require('unicode-6.2.0/script-extensions/Linear_B/code-points');
require('unicode-6.2.0/script-extensions/Linear_B/symbols');
require('unicode-6.2.0/script-extensions/Linear_B/regex');

require('unicode-6.2.0/script-extensions/Lisu/code-points');
require('unicode-6.2.0/script-extensions/Lisu/symbols');
require('unicode-6.2.0/script-extensions/Lisu/regex');

require('unicode-6.2.0/script-extensions/Lycian/code-points');
require('unicode-6.2.0/script-extensions/Lycian/symbols');
require('unicode-6.2.0/script-extensions/Lycian/regex');

require('unicode-6.2.0/script-extensions/Lydian/code-points');
require('unicode-6.2.0/script-extensions/Lydian/symbols');
require('unicode-6.2.0/script-extensions/Lydian/regex');

require('unicode-6.2.0/script-extensions/Malayalam/code-points');
require('unicode-6.2.0/script-extensions/Malayalam/symbols');
require('unicode-6.2.0/script-extensions/Malayalam/regex');

require('unicode-6.2.0/script-extensions/Mandaic/code-points');
require('unicode-6.2.0/script-extensions/Mandaic/symbols');
require('unicode-6.2.0/script-extensions/Mandaic/regex');

require('unicode-6.2.0/script-extensions/Meetei_Mayek/code-points');
require('unicode-6.2.0/script-extensions/Meetei_Mayek/symbols');
require('unicode-6.2.0/script-extensions/Meetei_Mayek/regex');

require('unicode-6.2.0/script-extensions/Meroitic_Cursive/code-points');
require('unicode-6.2.0/script-extensions/Meroitic_Cursive/symbols');
require('unicode-6.2.0/script-extensions/Meroitic_Cursive/regex');

require('unicode-6.2.0/script-extensions/Meroitic_Hieroglyphs/code-points');
require('unicode-6.2.0/script-extensions/Meroitic_Hieroglyphs/symbols');
require('unicode-6.2.0/script-extensions/Meroitic_Hieroglyphs/regex');

require('unicode-6.2.0/script-extensions/Miao/code-points');
require('unicode-6.2.0/script-extensions/Miao/symbols');
require('unicode-6.2.0/script-extensions/Miao/regex');

require('unicode-6.2.0/script-extensions/Mongolian/code-points');
require('unicode-6.2.0/script-extensions/Mongolian/symbols');
require('unicode-6.2.0/script-extensions/Mongolian/regex');

require('unicode-6.2.0/script-extensions/Myanmar/code-points');
require('unicode-6.2.0/script-extensions/Myanmar/symbols');
require('unicode-6.2.0/script-extensions/Myanmar/regex');

require('unicode-6.2.0/script-extensions/New_Tai_Lue/code-points');
require('unicode-6.2.0/script-extensions/New_Tai_Lue/symbols');
require('unicode-6.2.0/script-extensions/New_Tai_Lue/regex');

require('unicode-6.2.0/script-extensions/Nko/code-points');
require('unicode-6.2.0/script-extensions/Nko/symbols');
require('unicode-6.2.0/script-extensions/Nko/regex');

require('unicode-6.2.0/script-extensions/Ogham/code-points');
require('unicode-6.2.0/script-extensions/Ogham/symbols');
require('unicode-6.2.0/script-extensions/Ogham/regex');

require('unicode-6.2.0/script-extensions/Ol_Chiki/code-points');
require('unicode-6.2.0/script-extensions/Ol_Chiki/symbols');
require('unicode-6.2.0/script-extensions/Ol_Chiki/regex');

require('unicode-6.2.0/script-extensions/Old_Italic/code-points');
require('unicode-6.2.0/script-extensions/Old_Italic/symbols');
require('unicode-6.2.0/script-extensions/Old_Italic/regex');

require('unicode-6.2.0/script-extensions/Old_Persian/code-points');
require('unicode-6.2.0/script-extensions/Old_Persian/symbols');
require('unicode-6.2.0/script-extensions/Old_Persian/regex');

require('unicode-6.2.0/script-extensions/Old_South_Arabian/code-points');
require('unicode-6.2.0/script-extensions/Old_South_Arabian/symbols');
require('unicode-6.2.0/script-extensions/Old_South_Arabian/regex');

require('unicode-6.2.0/script-extensions/Old_Turkic/code-points');
require('unicode-6.2.0/script-extensions/Old_Turkic/symbols');
require('unicode-6.2.0/script-extensions/Old_Turkic/regex');

require('unicode-6.2.0/script-extensions/Oriya/code-points');
require('unicode-6.2.0/script-extensions/Oriya/symbols');
require('unicode-6.2.0/script-extensions/Oriya/regex');

require('unicode-6.2.0/script-extensions/Osmanya/code-points');
require('unicode-6.2.0/script-extensions/Osmanya/symbols');
require('unicode-6.2.0/script-extensions/Osmanya/regex');

require('unicode-6.2.0/script-extensions/Phags_Pa/code-points');
require('unicode-6.2.0/script-extensions/Phags_Pa/symbols');
require('unicode-6.2.0/script-extensions/Phags_Pa/regex');

require('unicode-6.2.0/script-extensions/Phoenician/code-points');
require('unicode-6.2.0/script-extensions/Phoenician/symbols');
require('unicode-6.2.0/script-extensions/Phoenician/regex');

require('unicode-6.2.0/script-extensions/Rejang/code-points');
require('unicode-6.2.0/script-extensions/Rejang/symbols');
require('unicode-6.2.0/script-extensions/Rejang/regex');

require('unicode-6.2.0/script-extensions/Runic/code-points');
require('unicode-6.2.0/script-extensions/Runic/symbols');
require('unicode-6.2.0/script-extensions/Runic/regex');

require('unicode-6.2.0/script-extensions/Samaritan/code-points');
require('unicode-6.2.0/script-extensions/Samaritan/symbols');
require('unicode-6.2.0/script-extensions/Samaritan/regex');

require('unicode-6.2.0/script-extensions/Saurashtra/code-points');
require('unicode-6.2.0/script-extensions/Saurashtra/symbols');
require('unicode-6.2.0/script-extensions/Saurashtra/regex');

require('unicode-6.2.0/script-extensions/Sharada/code-points');
require('unicode-6.2.0/script-extensions/Sharada/symbols');
require('unicode-6.2.0/script-extensions/Sharada/regex');

require('unicode-6.2.0/script-extensions/Shavian/code-points');
require('unicode-6.2.0/script-extensions/Shavian/symbols');
require('unicode-6.2.0/script-extensions/Shavian/regex');

require('unicode-6.2.0/script-extensions/Sinhala/code-points');
require('unicode-6.2.0/script-extensions/Sinhala/symbols');
require('unicode-6.2.0/script-extensions/Sinhala/regex');

require('unicode-6.2.0/script-extensions/Sora_Sompeng/code-points');
require('unicode-6.2.0/script-extensions/Sora_Sompeng/symbols');
require('unicode-6.2.0/script-extensions/Sora_Sompeng/regex');

require('unicode-6.2.0/script-extensions/Sundanese/code-points');
require('unicode-6.2.0/script-extensions/Sundanese/symbols');
require('unicode-6.2.0/script-extensions/Sundanese/regex');

require('unicode-6.2.0/script-extensions/Syloti_Nagri/code-points');
require('unicode-6.2.0/script-extensions/Syloti_Nagri/symbols');
require('unicode-6.2.0/script-extensions/Syloti_Nagri/regex');

require('unicode-6.2.0/script-extensions/Syriac/code-points');
require('unicode-6.2.0/script-extensions/Syriac/symbols');
require('unicode-6.2.0/script-extensions/Syriac/regex');

require('unicode-6.2.0/script-extensions/Tagalog/code-points');
require('unicode-6.2.0/script-extensions/Tagalog/symbols');
require('unicode-6.2.0/script-extensions/Tagalog/regex');

require('unicode-6.2.0/script-extensions/Tagbanwa/code-points');
require('unicode-6.2.0/script-extensions/Tagbanwa/symbols');
require('unicode-6.2.0/script-extensions/Tagbanwa/regex');

require('unicode-6.2.0/script-extensions/Tai_Le/code-points');
require('unicode-6.2.0/script-extensions/Tai_Le/symbols');
require('unicode-6.2.0/script-extensions/Tai_Le/regex');

require('unicode-6.2.0/script-extensions/Tai_Tham/code-points');
require('unicode-6.2.0/script-extensions/Tai_Tham/symbols');
require('unicode-6.2.0/script-extensions/Tai_Tham/regex');

require('unicode-6.2.0/script-extensions/Tai_Viet/code-points');
require('unicode-6.2.0/script-extensions/Tai_Viet/symbols');
require('unicode-6.2.0/script-extensions/Tai_Viet/regex');

require('unicode-6.2.0/script-extensions/Takri/code-points');
require('unicode-6.2.0/script-extensions/Takri/symbols');
require('unicode-6.2.0/script-extensions/Takri/regex');

require('unicode-6.2.0/script-extensions/Tamil/code-points');
require('unicode-6.2.0/script-extensions/Tamil/symbols');
require('unicode-6.2.0/script-extensions/Tamil/regex');

require('unicode-6.2.0/script-extensions/Telugu/code-points');
require('unicode-6.2.0/script-extensions/Telugu/symbols');
require('unicode-6.2.0/script-extensions/Telugu/regex');

require('unicode-6.2.0/script-extensions/Thaana/code-points');
require('unicode-6.2.0/script-extensions/Thaana/symbols');
require('unicode-6.2.0/script-extensions/Thaana/regex');

require('unicode-6.2.0/script-extensions/Thai/code-points');
require('unicode-6.2.0/script-extensions/Thai/symbols');
require('unicode-6.2.0/script-extensions/Thai/regex');

require('unicode-6.2.0/script-extensions/Tibetan/code-points');
require('unicode-6.2.0/script-extensions/Tibetan/symbols');
require('unicode-6.2.0/script-extensions/Tibetan/regex');

require('unicode-6.2.0/script-extensions/Tifinagh/code-points');
require('unicode-6.2.0/script-extensions/Tifinagh/symbols');
require('unicode-6.2.0/script-extensions/Tifinagh/regex');

require('unicode-6.2.0/script-extensions/Ugaritic/code-points');
require('unicode-6.2.0/script-extensions/Ugaritic/symbols');
require('unicode-6.2.0/script-extensions/Ugaritic/regex');

require('unicode-6.2.0/script-extensions/Vai/code-points');
require('unicode-6.2.0/script-extensions/Vai/symbols');
require('unicode-6.2.0/script-extensions/Vai/regex');

require('unicode-6.2.0/script-extensions/Yi/code-points');
require('unicode-6.2.0/script-extensions/Yi/symbols');
require('unicode-6.2.0/script-extensions/Yi/regex');

// case folding:

require('unicode-6.2.0/case-folding/C/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/case-folding/C/code-points').get(codePoint);
require('unicode-6.2.0/case-folding/C/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/case-folding/C/symbols').get(symbol);

require('unicode-6.2.0/case-folding/F/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/case-folding/F/code-points').get(codePoint);
require('unicode-6.2.0/case-folding/F/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/case-folding/F/symbols').get(symbol);

require('unicode-6.2.0/case-folding/S/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/case-folding/S/code-points').get(codePoint);
require('unicode-6.2.0/case-folding/S/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/case-folding/S/symbols').get(symbol);

require('unicode-6.2.0/case-folding/T/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/case-folding/T/code-points').get(codePoint);
require('unicode-6.2.0/case-folding/T/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/case-folding/T/symbols').get(symbol);

// blocks:

require('unicode-6.2.0/blocks/Aegean_Numbers/code-points');
require('unicode-6.2.0/blocks/Aegean_Numbers/symbols');
require('unicode-6.2.0/blocks/Aegean_Numbers/regex');

require('unicode-6.2.0/blocks/Alchemical_Symbols/code-points');
require('unicode-6.2.0/blocks/Alchemical_Symbols/symbols');
require('unicode-6.2.0/blocks/Alchemical_Symbols/regex');

require('unicode-6.2.0/blocks/Alphabetic_Presentation_Forms/code-points');
require('unicode-6.2.0/blocks/Alphabetic_Presentation_Forms/symbols');
require('unicode-6.2.0/blocks/Alphabetic_Presentation_Forms/regex');

require('unicode-6.2.0/blocks/Ancient_Greek_Musical_Notation/code-points');
require('unicode-6.2.0/blocks/Ancient_Greek_Musical_Notation/symbols');
require('unicode-6.2.0/blocks/Ancient_Greek_Musical_Notation/regex');

require('unicode-6.2.0/blocks/Ancient_Greek_Numbers/code-points');
require('unicode-6.2.0/blocks/Ancient_Greek_Numbers/symbols');
require('unicode-6.2.0/blocks/Ancient_Greek_Numbers/regex');

require('unicode-6.2.0/blocks/Ancient_Symbols/code-points');
require('unicode-6.2.0/blocks/Ancient_Symbols/symbols');
require('unicode-6.2.0/blocks/Ancient_Symbols/regex');

require('unicode-6.2.0/blocks/Arabic/code-points');
require('unicode-6.2.0/blocks/Arabic/symbols');
require('unicode-6.2.0/blocks/Arabic/regex');

require('unicode-6.2.0/blocks/Arabic_Extended-A/code-points');
require('unicode-6.2.0/blocks/Arabic_Extended-A/symbols');
require('unicode-6.2.0/blocks/Arabic_Extended-A/regex');

require('unicode-6.2.0/blocks/Arabic_Mathematical_Alphabetic_Symbols/code-points');
require('unicode-6.2.0/blocks/Arabic_Mathematical_Alphabetic_Symbols/symbols');
require('unicode-6.2.0/blocks/Arabic_Mathematical_Alphabetic_Symbols/regex');

require('unicode-6.2.0/blocks/Arabic_Presentation_Forms-A/code-points');
require('unicode-6.2.0/blocks/Arabic_Presentation_Forms-A/symbols');
require('unicode-6.2.0/blocks/Arabic_Presentation_Forms-A/regex');

require('unicode-6.2.0/blocks/Arabic_Presentation_Forms-B/code-points');
require('unicode-6.2.0/blocks/Arabic_Presentation_Forms-B/symbols');
require('unicode-6.2.0/blocks/Arabic_Presentation_Forms-B/regex');

require('unicode-6.2.0/blocks/Arabic_Supplement/code-points');
require('unicode-6.2.0/blocks/Arabic_Supplement/symbols');
require('unicode-6.2.0/blocks/Arabic_Supplement/regex');

require('unicode-6.2.0/blocks/Armenian/code-points');
require('unicode-6.2.0/blocks/Armenian/symbols');
require('unicode-6.2.0/blocks/Armenian/regex');

require('unicode-6.2.0/blocks/Arrows/code-points');
require('unicode-6.2.0/blocks/Arrows/symbols');
require('unicode-6.2.0/blocks/Arrows/regex');

require('unicode-6.2.0/blocks/Avestan/code-points');
require('unicode-6.2.0/blocks/Avestan/symbols');
require('unicode-6.2.0/blocks/Avestan/regex');

require('unicode-6.2.0/blocks/Balinese/code-points');
require('unicode-6.2.0/blocks/Balinese/symbols');
require('unicode-6.2.0/blocks/Balinese/regex');

require('unicode-6.2.0/blocks/Bamum/code-points');
require('unicode-6.2.0/blocks/Bamum/symbols');
require('unicode-6.2.0/blocks/Bamum/regex');

require('unicode-6.2.0/blocks/Bamum_Supplement/code-points');
require('unicode-6.2.0/blocks/Bamum_Supplement/symbols');
require('unicode-6.2.0/blocks/Bamum_Supplement/regex');

require('unicode-6.2.0/blocks/Basic_Latin/code-points');
require('unicode-6.2.0/blocks/Basic_Latin/symbols');
require('unicode-6.2.0/blocks/Basic_Latin/regex');

require('unicode-6.2.0/blocks/Batak/code-points');
require('unicode-6.2.0/blocks/Batak/symbols');
require('unicode-6.2.0/blocks/Batak/regex');

require('unicode-6.2.0/blocks/Bengali/code-points');
require('unicode-6.2.0/blocks/Bengali/symbols');
require('unicode-6.2.0/blocks/Bengali/regex');

require('unicode-6.2.0/blocks/Block_Elements/code-points');
require('unicode-6.2.0/blocks/Block_Elements/symbols');
require('unicode-6.2.0/blocks/Block_Elements/regex');

require('unicode-6.2.0/blocks/Bopomofo/code-points');
require('unicode-6.2.0/blocks/Bopomofo/symbols');
require('unicode-6.2.0/blocks/Bopomofo/regex');

require('unicode-6.2.0/blocks/Bopomofo_Extended/code-points');
require('unicode-6.2.0/blocks/Bopomofo_Extended/symbols');
require('unicode-6.2.0/blocks/Bopomofo_Extended/regex');

require('unicode-6.2.0/blocks/Box_Drawing/code-points');
require('unicode-6.2.0/blocks/Box_Drawing/symbols');
require('unicode-6.2.0/blocks/Box_Drawing/regex');

require('unicode-6.2.0/blocks/Brahmi/code-points');
require('unicode-6.2.0/blocks/Brahmi/symbols');
require('unicode-6.2.0/blocks/Brahmi/regex');

require('unicode-6.2.0/blocks/Braille_Patterns/code-points');
require('unicode-6.2.0/blocks/Braille_Patterns/symbols');
require('unicode-6.2.0/blocks/Braille_Patterns/regex');

require('unicode-6.2.0/blocks/Buginese/code-points');
require('unicode-6.2.0/blocks/Buginese/symbols');
require('unicode-6.2.0/blocks/Buginese/regex');

require('unicode-6.2.0/blocks/Buhid/code-points');
require('unicode-6.2.0/blocks/Buhid/symbols');
require('unicode-6.2.0/blocks/Buhid/regex');

require('unicode-6.2.0/blocks/Byzantine_Musical_Symbols/code-points');
require('unicode-6.2.0/blocks/Byzantine_Musical_Symbols/symbols');
require('unicode-6.2.0/blocks/Byzantine_Musical_Symbols/regex');

require('unicode-6.2.0/blocks/CJK_Compatibility/code-points');
require('unicode-6.2.0/blocks/CJK_Compatibility/symbols');
require('unicode-6.2.0/blocks/CJK_Compatibility/regex');

require('unicode-6.2.0/blocks/CJK_Compatibility_Forms/code-points');
require('unicode-6.2.0/blocks/CJK_Compatibility_Forms/symbols');
require('unicode-6.2.0/blocks/CJK_Compatibility_Forms/regex');

require('unicode-6.2.0/blocks/CJK_Compatibility_Ideographs/code-points');
require('unicode-6.2.0/blocks/CJK_Compatibility_Ideographs/symbols');
require('unicode-6.2.0/blocks/CJK_Compatibility_Ideographs/regex');

require('unicode-6.2.0/blocks/CJK_Compatibility_Ideographs_Supplement/code-points');
require('unicode-6.2.0/blocks/CJK_Compatibility_Ideographs_Supplement/symbols');
require('unicode-6.2.0/blocks/CJK_Compatibility_Ideographs_Supplement/regex');

require('unicode-6.2.0/blocks/CJK_Radicals_Supplement/code-points');
require('unicode-6.2.0/blocks/CJK_Radicals_Supplement/symbols');
require('unicode-6.2.0/blocks/CJK_Radicals_Supplement/regex');

require('unicode-6.2.0/blocks/CJK_Strokes/code-points');
require('unicode-6.2.0/blocks/CJK_Strokes/symbols');
require('unicode-6.2.0/blocks/CJK_Strokes/regex');

require('unicode-6.2.0/blocks/CJK_Symbols_and_Punctuation/code-points');
require('unicode-6.2.0/blocks/CJK_Symbols_and_Punctuation/symbols');
require('unicode-6.2.0/blocks/CJK_Symbols_and_Punctuation/regex');

require('unicode-6.2.0/blocks/CJK_Unified_Ideographs/code-points');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs/symbols');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs/regex');

require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_A/code-points');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_A/symbols');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_A/regex');

require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_B/code-points');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_B/symbols');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_B/regex');

require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_C/code-points');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_C/symbols');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_C/regex');

require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_D/code-points');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_D/symbols');
require('unicode-6.2.0/blocks/CJK_Unified_Ideographs_Extension_D/regex');

require('unicode-6.2.0/blocks/Carian/code-points');
require('unicode-6.2.0/blocks/Carian/symbols');
require('unicode-6.2.0/blocks/Carian/regex');

require('unicode-6.2.0/blocks/Chakma/code-points');
require('unicode-6.2.0/blocks/Chakma/symbols');
require('unicode-6.2.0/blocks/Chakma/regex');

require('unicode-6.2.0/blocks/Cham/code-points');
require('unicode-6.2.0/blocks/Cham/symbols');
require('unicode-6.2.0/blocks/Cham/regex');

require('unicode-6.2.0/blocks/Cherokee/code-points');
require('unicode-6.2.0/blocks/Cherokee/symbols');
require('unicode-6.2.0/blocks/Cherokee/regex');

require('unicode-6.2.0/blocks/Combining_Diacritical_Marks/code-points');
require('unicode-6.2.0/blocks/Combining_Diacritical_Marks/symbols');
require('unicode-6.2.0/blocks/Combining_Diacritical_Marks/regex');

require('unicode-6.2.0/blocks/Combining_Diacritical_Marks_Supplement/code-points');
require('unicode-6.2.0/blocks/Combining_Diacritical_Marks_Supplement/symbols');
require('unicode-6.2.0/blocks/Combining_Diacritical_Marks_Supplement/regex');

require('unicode-6.2.0/blocks/Combining_Diacritical_Marks_for_Symbols/code-points');
require('unicode-6.2.0/blocks/Combining_Diacritical_Marks_for_Symbols/symbols');
require('unicode-6.2.0/blocks/Combining_Diacritical_Marks_for_Symbols/regex');

require('unicode-6.2.0/blocks/Combining_Half_Marks/code-points');
require('unicode-6.2.0/blocks/Combining_Half_Marks/symbols');
require('unicode-6.2.0/blocks/Combining_Half_Marks/regex');

require('unicode-6.2.0/blocks/Common_Indic_Number_Forms/code-points');
require('unicode-6.2.0/blocks/Common_Indic_Number_Forms/symbols');
require('unicode-6.2.0/blocks/Common_Indic_Number_Forms/regex');

require('unicode-6.2.0/blocks/Control_Pictures/code-points');
require('unicode-6.2.0/blocks/Control_Pictures/symbols');
require('unicode-6.2.0/blocks/Control_Pictures/regex');

require('unicode-6.2.0/blocks/Coptic/code-points');
require('unicode-6.2.0/blocks/Coptic/symbols');
require('unicode-6.2.0/blocks/Coptic/regex');

require('unicode-6.2.0/blocks/Counting_Rod_Numerals/code-points');
require('unicode-6.2.0/blocks/Counting_Rod_Numerals/symbols');
require('unicode-6.2.0/blocks/Counting_Rod_Numerals/regex');

require('unicode-6.2.0/blocks/Cuneiform/code-points');
require('unicode-6.2.0/blocks/Cuneiform/symbols');
require('unicode-6.2.0/blocks/Cuneiform/regex');

require('unicode-6.2.0/blocks/Cuneiform_Numbers_and_Punctuation/code-points');
require('unicode-6.2.0/blocks/Cuneiform_Numbers_and_Punctuation/symbols');
require('unicode-6.2.0/blocks/Cuneiform_Numbers_and_Punctuation/regex');

require('unicode-6.2.0/blocks/Currency_Symbols/code-points');
require('unicode-6.2.0/blocks/Currency_Symbols/symbols');
require('unicode-6.2.0/blocks/Currency_Symbols/regex');

require('unicode-6.2.0/blocks/Cypriot_Syllabary/code-points');
require('unicode-6.2.0/blocks/Cypriot_Syllabary/symbols');
require('unicode-6.2.0/blocks/Cypriot_Syllabary/regex');

require('unicode-6.2.0/blocks/Cyrillic/code-points');
require('unicode-6.2.0/blocks/Cyrillic/symbols');
require('unicode-6.2.0/blocks/Cyrillic/regex');

require('unicode-6.2.0/blocks/Cyrillic_Extended-A/code-points');
require('unicode-6.2.0/blocks/Cyrillic_Extended-A/symbols');
require('unicode-6.2.0/blocks/Cyrillic_Extended-A/regex');

require('unicode-6.2.0/blocks/Cyrillic_Extended-B/code-points');
require('unicode-6.2.0/blocks/Cyrillic_Extended-B/symbols');
require('unicode-6.2.0/blocks/Cyrillic_Extended-B/regex');

require('unicode-6.2.0/blocks/Cyrillic_Supplement/code-points');
require('unicode-6.2.0/blocks/Cyrillic_Supplement/symbols');
require('unicode-6.2.0/blocks/Cyrillic_Supplement/regex');

require('unicode-6.2.0/blocks/Deseret/code-points');
require('unicode-6.2.0/blocks/Deseret/symbols');
require('unicode-6.2.0/blocks/Deseret/regex');

require('unicode-6.2.0/blocks/Devanagari/code-points');
require('unicode-6.2.0/blocks/Devanagari/symbols');
require('unicode-6.2.0/blocks/Devanagari/regex');

require('unicode-6.2.0/blocks/Devanagari_Extended/code-points');
require('unicode-6.2.0/blocks/Devanagari_Extended/symbols');
require('unicode-6.2.0/blocks/Devanagari_Extended/regex');

require('unicode-6.2.0/blocks/Dingbats/code-points');
require('unicode-6.2.0/blocks/Dingbats/symbols');
require('unicode-6.2.0/blocks/Dingbats/regex');

require('unicode-6.2.0/blocks/Domino_Tiles/code-points');
require('unicode-6.2.0/blocks/Domino_Tiles/symbols');
require('unicode-6.2.0/blocks/Domino_Tiles/regex');

require('unicode-6.2.0/blocks/Egyptian_Hieroglyphs/code-points');
require('unicode-6.2.0/blocks/Egyptian_Hieroglyphs/symbols');
require('unicode-6.2.0/blocks/Egyptian_Hieroglyphs/regex');

require('unicode-6.2.0/blocks/Emoticons/code-points');
require('unicode-6.2.0/blocks/Emoticons/symbols');
require('unicode-6.2.0/blocks/Emoticons/regex');

require('unicode-6.2.0/blocks/Enclosed_Alphanumeric_Supplement/code-points');
require('unicode-6.2.0/blocks/Enclosed_Alphanumeric_Supplement/symbols');
require('unicode-6.2.0/blocks/Enclosed_Alphanumeric_Supplement/regex');

require('unicode-6.2.0/blocks/Enclosed_Alphanumerics/code-points');
require('unicode-6.2.0/blocks/Enclosed_Alphanumerics/symbols');
require('unicode-6.2.0/blocks/Enclosed_Alphanumerics/regex');

require('unicode-6.2.0/blocks/Enclosed_CJK_Letters_and_Months/code-points');
require('unicode-6.2.0/blocks/Enclosed_CJK_Letters_and_Months/symbols');
require('unicode-6.2.0/blocks/Enclosed_CJK_Letters_and_Months/regex');

require('unicode-6.2.0/blocks/Enclosed_Ideographic_Supplement/code-points');
require('unicode-6.2.0/blocks/Enclosed_Ideographic_Supplement/symbols');
require('unicode-6.2.0/blocks/Enclosed_Ideographic_Supplement/regex');

require('unicode-6.2.0/blocks/Ethiopic/code-points');
require('unicode-6.2.0/blocks/Ethiopic/symbols');
require('unicode-6.2.0/blocks/Ethiopic/regex');

require('unicode-6.2.0/blocks/Ethiopic_Extended/code-points');
require('unicode-6.2.0/blocks/Ethiopic_Extended/symbols');
require('unicode-6.2.0/blocks/Ethiopic_Extended/regex');

require('unicode-6.2.0/blocks/Ethiopic_Extended-A/code-points');
require('unicode-6.2.0/blocks/Ethiopic_Extended-A/symbols');
require('unicode-6.2.0/blocks/Ethiopic_Extended-A/regex');

require('unicode-6.2.0/blocks/Ethiopic_Supplement/code-points');
require('unicode-6.2.0/blocks/Ethiopic_Supplement/symbols');
require('unicode-6.2.0/blocks/Ethiopic_Supplement/regex');

require('unicode-6.2.0/blocks/General_Punctuation/code-points');
require('unicode-6.2.0/blocks/General_Punctuation/symbols');
require('unicode-6.2.0/blocks/General_Punctuation/regex');

require('unicode-6.2.0/blocks/Geometric_Shapes/code-points');
require('unicode-6.2.0/blocks/Geometric_Shapes/symbols');
require('unicode-6.2.0/blocks/Geometric_Shapes/regex');

require('unicode-6.2.0/blocks/Georgian/code-points');
require('unicode-6.2.0/blocks/Georgian/symbols');
require('unicode-6.2.0/blocks/Georgian/regex');

require('unicode-6.2.0/blocks/Georgian_Supplement/code-points');
require('unicode-6.2.0/blocks/Georgian_Supplement/symbols');
require('unicode-6.2.0/blocks/Georgian_Supplement/regex');

require('unicode-6.2.0/blocks/Glagolitic/code-points');
require('unicode-6.2.0/blocks/Glagolitic/symbols');
require('unicode-6.2.0/blocks/Glagolitic/regex');

require('unicode-6.2.0/blocks/Gothic/code-points');
require('unicode-6.2.0/blocks/Gothic/symbols');
require('unicode-6.2.0/blocks/Gothic/regex');

require('unicode-6.2.0/blocks/Greek_Extended/code-points');
require('unicode-6.2.0/blocks/Greek_Extended/symbols');
require('unicode-6.2.0/blocks/Greek_Extended/regex');

require('unicode-6.2.0/blocks/Greek_and_Coptic/code-points');
require('unicode-6.2.0/blocks/Greek_and_Coptic/symbols');
require('unicode-6.2.0/blocks/Greek_and_Coptic/regex');

require('unicode-6.2.0/blocks/Gujarati/code-points');
require('unicode-6.2.0/blocks/Gujarati/symbols');
require('unicode-6.2.0/blocks/Gujarati/regex');

require('unicode-6.2.0/blocks/Gurmukhi/code-points');
require('unicode-6.2.0/blocks/Gurmukhi/symbols');
require('unicode-6.2.0/blocks/Gurmukhi/regex');

require('unicode-6.2.0/blocks/Halfwidth_and_Fullwidth_Forms/code-points');
require('unicode-6.2.0/blocks/Halfwidth_and_Fullwidth_Forms/symbols');
require('unicode-6.2.0/blocks/Halfwidth_and_Fullwidth_Forms/regex');

require('unicode-6.2.0/blocks/Hangul_Compatibility_Jamo/code-points');
require('unicode-6.2.0/blocks/Hangul_Compatibility_Jamo/symbols');
require('unicode-6.2.0/blocks/Hangul_Compatibility_Jamo/regex');

require('unicode-6.2.0/blocks/Hangul_Jamo/code-points');
require('unicode-6.2.0/blocks/Hangul_Jamo/symbols');
require('unicode-6.2.0/blocks/Hangul_Jamo/regex');

require('unicode-6.2.0/blocks/Hangul_Jamo_Extended-A/code-points');
require('unicode-6.2.0/blocks/Hangul_Jamo_Extended-A/symbols');
require('unicode-6.2.0/blocks/Hangul_Jamo_Extended-A/regex');

require('unicode-6.2.0/blocks/Hangul_Jamo_Extended-B/code-points');
require('unicode-6.2.0/blocks/Hangul_Jamo_Extended-B/symbols');
require('unicode-6.2.0/blocks/Hangul_Jamo_Extended-B/regex');

require('unicode-6.2.0/blocks/Hangul_Syllables/code-points');
require('unicode-6.2.0/blocks/Hangul_Syllables/symbols');
require('unicode-6.2.0/blocks/Hangul_Syllables/regex');

require('unicode-6.2.0/blocks/Hanunoo/code-points');
require('unicode-6.2.0/blocks/Hanunoo/symbols');
require('unicode-6.2.0/blocks/Hanunoo/regex');

require('unicode-6.2.0/blocks/Hebrew/code-points');
require('unicode-6.2.0/blocks/Hebrew/symbols');
require('unicode-6.2.0/blocks/Hebrew/regex');

require('unicode-6.2.0/blocks/High_Private_Use_Surrogates/code-points');
require('unicode-6.2.0/blocks/High_Private_Use_Surrogates/symbols');
require('unicode-6.2.0/blocks/High_Private_Use_Surrogates/regex');

require('unicode-6.2.0/blocks/High_Surrogates/code-points');
require('unicode-6.2.0/blocks/High_Surrogates/symbols');
require('unicode-6.2.0/blocks/High_Surrogates/regex');

require('unicode-6.2.0/blocks/Hiragana/code-points');
require('unicode-6.2.0/blocks/Hiragana/symbols');
require('unicode-6.2.0/blocks/Hiragana/regex');

require('unicode-6.2.0/blocks/IPA_Extensions/code-points');
require('unicode-6.2.0/blocks/IPA_Extensions/symbols');
require('unicode-6.2.0/blocks/IPA_Extensions/regex');

require('unicode-6.2.0/blocks/Ideographic_Description_Characters/code-points');
require('unicode-6.2.0/blocks/Ideographic_Description_Characters/symbols');
require('unicode-6.2.0/blocks/Ideographic_Description_Characters/regex');

require('unicode-6.2.0/blocks/Imperial_Aramaic/code-points');
require('unicode-6.2.0/blocks/Imperial_Aramaic/symbols');
require('unicode-6.2.0/blocks/Imperial_Aramaic/regex');

require('unicode-6.2.0/blocks/Inscriptional_Pahlavi/code-points');
require('unicode-6.2.0/blocks/Inscriptional_Pahlavi/symbols');
require('unicode-6.2.0/blocks/Inscriptional_Pahlavi/regex');

require('unicode-6.2.0/blocks/Inscriptional_Parthian/code-points');
require('unicode-6.2.0/blocks/Inscriptional_Parthian/symbols');
require('unicode-6.2.0/blocks/Inscriptional_Parthian/regex');

require('unicode-6.2.0/blocks/Javanese/code-points');
require('unicode-6.2.0/blocks/Javanese/symbols');
require('unicode-6.2.0/blocks/Javanese/regex');

require('unicode-6.2.0/blocks/Kaithi/code-points');
require('unicode-6.2.0/blocks/Kaithi/symbols');
require('unicode-6.2.0/blocks/Kaithi/regex');

require('unicode-6.2.0/blocks/Kana_Supplement/code-points');
require('unicode-6.2.0/blocks/Kana_Supplement/symbols');
require('unicode-6.2.0/blocks/Kana_Supplement/regex');

require('unicode-6.2.0/blocks/Kanbun/code-points');
require('unicode-6.2.0/blocks/Kanbun/symbols');
require('unicode-6.2.0/blocks/Kanbun/regex');

require('unicode-6.2.0/blocks/Kangxi_Radicals/code-points');
require('unicode-6.2.0/blocks/Kangxi_Radicals/symbols');
require('unicode-6.2.0/blocks/Kangxi_Radicals/regex');

require('unicode-6.2.0/blocks/Kannada/code-points');
require('unicode-6.2.0/blocks/Kannada/symbols');
require('unicode-6.2.0/blocks/Kannada/regex');

require('unicode-6.2.0/blocks/Katakana/code-points');
require('unicode-6.2.0/blocks/Katakana/symbols');
require('unicode-6.2.0/blocks/Katakana/regex');

require('unicode-6.2.0/blocks/Katakana_Phonetic_Extensions/code-points');
require('unicode-6.2.0/blocks/Katakana_Phonetic_Extensions/symbols');
require('unicode-6.2.0/blocks/Katakana_Phonetic_Extensions/regex');

require('unicode-6.2.0/blocks/Kayah_Li/code-points');
require('unicode-6.2.0/blocks/Kayah_Li/symbols');
require('unicode-6.2.0/blocks/Kayah_Li/regex');

require('unicode-6.2.0/blocks/Kharoshthi/code-points');
require('unicode-6.2.0/blocks/Kharoshthi/symbols');
require('unicode-6.2.0/blocks/Kharoshthi/regex');

require('unicode-6.2.0/blocks/Khmer/code-points');
require('unicode-6.2.0/blocks/Khmer/symbols');
require('unicode-6.2.0/blocks/Khmer/regex');

require('unicode-6.2.0/blocks/Khmer_Symbols/code-points');
require('unicode-6.2.0/blocks/Khmer_Symbols/symbols');
require('unicode-6.2.0/blocks/Khmer_Symbols/regex');

require('unicode-6.2.0/blocks/Lao/code-points');
require('unicode-6.2.0/blocks/Lao/symbols');
require('unicode-6.2.0/blocks/Lao/regex');

require('unicode-6.2.0/blocks/Latin-1_Supplement/code-points');
require('unicode-6.2.0/blocks/Latin-1_Supplement/symbols');
require('unicode-6.2.0/blocks/Latin-1_Supplement/regex');

require('unicode-6.2.0/blocks/Latin_Extended-A/code-points');
require('unicode-6.2.0/blocks/Latin_Extended-A/symbols');
require('unicode-6.2.0/blocks/Latin_Extended-A/regex');

require('unicode-6.2.0/blocks/Latin_Extended-B/code-points');
require('unicode-6.2.0/blocks/Latin_Extended-B/symbols');
require('unicode-6.2.0/blocks/Latin_Extended-B/regex');

require('unicode-6.2.0/blocks/Latin_Extended-C/code-points');
require('unicode-6.2.0/blocks/Latin_Extended-C/symbols');
require('unicode-6.2.0/blocks/Latin_Extended-C/regex');

require('unicode-6.2.0/blocks/Latin_Extended-D/code-points');
require('unicode-6.2.0/blocks/Latin_Extended-D/symbols');
require('unicode-6.2.0/blocks/Latin_Extended-D/regex');

require('unicode-6.2.0/blocks/Latin_Extended_Additional/code-points');
require('unicode-6.2.0/blocks/Latin_Extended_Additional/symbols');
require('unicode-6.2.0/blocks/Latin_Extended_Additional/regex');

require('unicode-6.2.0/blocks/Lepcha/code-points');
require('unicode-6.2.0/blocks/Lepcha/symbols');
require('unicode-6.2.0/blocks/Lepcha/regex');

require('unicode-6.2.0/blocks/Letterlike_Symbols/code-points');
require('unicode-6.2.0/blocks/Letterlike_Symbols/symbols');
require('unicode-6.2.0/blocks/Letterlike_Symbols/regex');

require('unicode-6.2.0/blocks/Limbu/code-points');
require('unicode-6.2.0/blocks/Limbu/symbols');
require('unicode-6.2.0/blocks/Limbu/regex');

require('unicode-6.2.0/blocks/Linear_B_Ideograms/code-points');
require('unicode-6.2.0/blocks/Linear_B_Ideograms/symbols');
require('unicode-6.2.0/blocks/Linear_B_Ideograms/regex');

require('unicode-6.2.0/blocks/Linear_B_Syllabary/code-points');
require('unicode-6.2.0/blocks/Linear_B_Syllabary/symbols');
require('unicode-6.2.0/blocks/Linear_B_Syllabary/regex');

require('unicode-6.2.0/blocks/Lisu/code-points');
require('unicode-6.2.0/blocks/Lisu/symbols');
require('unicode-6.2.0/blocks/Lisu/regex');

require('unicode-6.2.0/blocks/Low_Surrogates/code-points');
require('unicode-6.2.0/blocks/Low_Surrogates/symbols');
require('unicode-6.2.0/blocks/Low_Surrogates/regex');

require('unicode-6.2.0/blocks/Lycian/code-points');
require('unicode-6.2.0/blocks/Lycian/symbols');
require('unicode-6.2.0/blocks/Lycian/regex');

require('unicode-6.2.0/blocks/Lydian/code-points');
require('unicode-6.2.0/blocks/Lydian/symbols');
require('unicode-6.2.0/blocks/Lydian/regex');

require('unicode-6.2.0/blocks/Mahjong_Tiles/code-points');
require('unicode-6.2.0/blocks/Mahjong_Tiles/symbols');
require('unicode-6.2.0/blocks/Mahjong_Tiles/regex');

require('unicode-6.2.0/blocks/Malayalam/code-points');
require('unicode-6.2.0/blocks/Malayalam/symbols');
require('unicode-6.2.0/blocks/Malayalam/regex');

require('unicode-6.2.0/blocks/Mandaic/code-points');
require('unicode-6.2.0/blocks/Mandaic/symbols');
require('unicode-6.2.0/blocks/Mandaic/regex');

require('unicode-6.2.0/blocks/Mathematical_Alphanumeric_Symbols/code-points');
require('unicode-6.2.0/blocks/Mathematical_Alphanumeric_Symbols/symbols');
require('unicode-6.2.0/blocks/Mathematical_Alphanumeric_Symbols/regex');

require('unicode-6.2.0/blocks/Mathematical_Operators/code-points');
require('unicode-6.2.0/blocks/Mathematical_Operators/symbols');
require('unicode-6.2.0/blocks/Mathematical_Operators/regex');

require('unicode-6.2.0/blocks/Meetei_Mayek/code-points');
require('unicode-6.2.0/blocks/Meetei_Mayek/symbols');
require('unicode-6.2.0/blocks/Meetei_Mayek/regex');

require('unicode-6.2.0/blocks/Meetei_Mayek_Extensions/code-points');
require('unicode-6.2.0/blocks/Meetei_Mayek_Extensions/symbols');
require('unicode-6.2.0/blocks/Meetei_Mayek_Extensions/regex');

require('unicode-6.2.0/blocks/Meroitic_Cursive/code-points');
require('unicode-6.2.0/blocks/Meroitic_Cursive/symbols');
require('unicode-6.2.0/blocks/Meroitic_Cursive/regex');

require('unicode-6.2.0/blocks/Meroitic_Hieroglyphs/code-points');
require('unicode-6.2.0/blocks/Meroitic_Hieroglyphs/symbols');
require('unicode-6.2.0/blocks/Meroitic_Hieroglyphs/regex');

require('unicode-6.2.0/blocks/Miao/code-points');
require('unicode-6.2.0/blocks/Miao/symbols');
require('unicode-6.2.0/blocks/Miao/regex');

require('unicode-6.2.0/blocks/Miscellaneous_Mathematical_Symbols-A/code-points');
require('unicode-6.2.0/blocks/Miscellaneous_Mathematical_Symbols-A/symbols');
require('unicode-6.2.0/blocks/Miscellaneous_Mathematical_Symbols-A/regex');

require('unicode-6.2.0/blocks/Miscellaneous_Mathematical_Symbols-B/code-points');
require('unicode-6.2.0/blocks/Miscellaneous_Mathematical_Symbols-B/symbols');
require('unicode-6.2.0/blocks/Miscellaneous_Mathematical_Symbols-B/regex');

require('unicode-6.2.0/blocks/Miscellaneous_Symbols/code-points');
require('unicode-6.2.0/blocks/Miscellaneous_Symbols/symbols');
require('unicode-6.2.0/blocks/Miscellaneous_Symbols/regex');

require('unicode-6.2.0/blocks/Miscellaneous_Symbols_And_Pictographs/code-points');
require('unicode-6.2.0/blocks/Miscellaneous_Symbols_And_Pictographs/symbols');
require('unicode-6.2.0/blocks/Miscellaneous_Symbols_And_Pictographs/regex');

require('unicode-6.2.0/blocks/Miscellaneous_Symbols_and_Arrows/code-points');
require('unicode-6.2.0/blocks/Miscellaneous_Symbols_and_Arrows/symbols');
require('unicode-6.2.0/blocks/Miscellaneous_Symbols_and_Arrows/regex');

require('unicode-6.2.0/blocks/Miscellaneous_Technical/code-points');
require('unicode-6.2.0/blocks/Miscellaneous_Technical/symbols');
require('unicode-6.2.0/blocks/Miscellaneous_Technical/regex');

require('unicode-6.2.0/blocks/Modifier_Tone_Letters/code-points');
require('unicode-6.2.0/blocks/Modifier_Tone_Letters/symbols');
require('unicode-6.2.0/blocks/Modifier_Tone_Letters/regex');

require('unicode-6.2.0/blocks/Mongolian/code-points');
require('unicode-6.2.0/blocks/Mongolian/symbols');
require('unicode-6.2.0/blocks/Mongolian/regex');

require('unicode-6.2.0/blocks/Musical_Symbols/code-points');
require('unicode-6.2.0/blocks/Musical_Symbols/symbols');
require('unicode-6.2.0/blocks/Musical_Symbols/regex');

require('unicode-6.2.0/blocks/Myanmar/code-points');
require('unicode-6.2.0/blocks/Myanmar/symbols');
require('unicode-6.2.0/blocks/Myanmar/regex');

require('unicode-6.2.0/blocks/Myanmar_Extended-A/code-points');
require('unicode-6.2.0/blocks/Myanmar_Extended-A/symbols');
require('unicode-6.2.0/blocks/Myanmar_Extended-A/regex');

require('unicode-6.2.0/blocks/NKo/code-points');
require('unicode-6.2.0/blocks/NKo/symbols');
require('unicode-6.2.0/blocks/NKo/regex');

require('unicode-6.2.0/blocks/New_Tai_Lue/code-points');
require('unicode-6.2.0/blocks/New_Tai_Lue/symbols');
require('unicode-6.2.0/blocks/New_Tai_Lue/regex');

require('unicode-6.2.0/blocks/Number_Forms/code-points');
require('unicode-6.2.0/blocks/Number_Forms/symbols');
require('unicode-6.2.0/blocks/Number_Forms/regex');

require('unicode-6.2.0/blocks/Ogham/code-points');
require('unicode-6.2.0/blocks/Ogham/symbols');
require('unicode-6.2.0/blocks/Ogham/regex');

require('unicode-6.2.0/blocks/Ol_Chiki/code-points');
require('unicode-6.2.0/blocks/Ol_Chiki/symbols');
require('unicode-6.2.0/blocks/Ol_Chiki/regex');

require('unicode-6.2.0/blocks/Old_Italic/code-points');
require('unicode-6.2.0/blocks/Old_Italic/symbols');
require('unicode-6.2.0/blocks/Old_Italic/regex');

require('unicode-6.2.0/blocks/Old_Persian/code-points');
require('unicode-6.2.0/blocks/Old_Persian/symbols');
require('unicode-6.2.0/blocks/Old_Persian/regex');

require('unicode-6.2.0/blocks/Old_South_Arabian/code-points');
require('unicode-6.2.0/blocks/Old_South_Arabian/symbols');
require('unicode-6.2.0/blocks/Old_South_Arabian/regex');

require('unicode-6.2.0/blocks/Old_Turkic/code-points');
require('unicode-6.2.0/blocks/Old_Turkic/symbols');
require('unicode-6.2.0/blocks/Old_Turkic/regex');

require('unicode-6.2.0/blocks/Optical_Character_Recognition/code-points');
require('unicode-6.2.0/blocks/Optical_Character_Recognition/symbols');
require('unicode-6.2.0/blocks/Optical_Character_Recognition/regex');

require('unicode-6.2.0/blocks/Oriya/code-points');
require('unicode-6.2.0/blocks/Oriya/symbols');
require('unicode-6.2.0/blocks/Oriya/regex');

require('unicode-6.2.0/blocks/Osmanya/code-points');
require('unicode-6.2.0/blocks/Osmanya/symbols');
require('unicode-6.2.0/blocks/Osmanya/regex');

require('unicode-6.2.0/blocks/Phags-pa/code-points');
require('unicode-6.2.0/blocks/Phags-pa/symbols');
require('unicode-6.2.0/blocks/Phags-pa/regex');

require('unicode-6.2.0/blocks/Phaistos_Disc/code-points');
require('unicode-6.2.0/blocks/Phaistos_Disc/symbols');
require('unicode-6.2.0/blocks/Phaistos_Disc/regex');

require('unicode-6.2.0/blocks/Phoenician/code-points');
require('unicode-6.2.0/blocks/Phoenician/symbols');
require('unicode-6.2.0/blocks/Phoenician/regex');

require('unicode-6.2.0/blocks/Phonetic_Extensions/code-points');
require('unicode-6.2.0/blocks/Phonetic_Extensions/symbols');
require('unicode-6.2.0/blocks/Phonetic_Extensions/regex');

require('unicode-6.2.0/blocks/Phonetic_Extensions_Supplement/code-points');
require('unicode-6.2.0/blocks/Phonetic_Extensions_Supplement/symbols');
require('unicode-6.2.0/blocks/Phonetic_Extensions_Supplement/regex');

require('unicode-6.2.0/blocks/Playing_Cards/code-points');
require('unicode-6.2.0/blocks/Playing_Cards/symbols');
require('unicode-6.2.0/blocks/Playing_Cards/regex');

require('unicode-6.2.0/blocks/Private_Use_Area/code-points');
require('unicode-6.2.0/blocks/Private_Use_Area/symbols');
require('unicode-6.2.0/blocks/Private_Use_Area/regex');

require('unicode-6.2.0/blocks/Rejang/code-points');
require('unicode-6.2.0/blocks/Rejang/symbols');
require('unicode-6.2.0/blocks/Rejang/regex');

require('unicode-6.2.0/blocks/Rumi_Numeral_Symbols/code-points');
require('unicode-6.2.0/blocks/Rumi_Numeral_Symbols/symbols');
require('unicode-6.2.0/blocks/Rumi_Numeral_Symbols/regex');

require('unicode-6.2.0/blocks/Runic/code-points');
require('unicode-6.2.0/blocks/Runic/symbols');
require('unicode-6.2.0/blocks/Runic/regex');

require('unicode-6.2.0/blocks/Samaritan/code-points');
require('unicode-6.2.0/blocks/Samaritan/symbols');
require('unicode-6.2.0/blocks/Samaritan/regex');

require('unicode-6.2.0/blocks/Saurashtra/code-points');
require('unicode-6.2.0/blocks/Saurashtra/symbols');
require('unicode-6.2.0/blocks/Saurashtra/regex');

require('unicode-6.2.0/blocks/Sharada/code-points');
require('unicode-6.2.0/blocks/Sharada/symbols');
require('unicode-6.2.0/blocks/Sharada/regex');

require('unicode-6.2.0/blocks/Shavian/code-points');
require('unicode-6.2.0/blocks/Shavian/symbols');
require('unicode-6.2.0/blocks/Shavian/regex');

require('unicode-6.2.0/blocks/Sinhala/code-points');
require('unicode-6.2.0/blocks/Sinhala/symbols');
require('unicode-6.2.0/blocks/Sinhala/regex');

require('unicode-6.2.0/blocks/Small_Form_Variants/code-points');
require('unicode-6.2.0/blocks/Small_Form_Variants/symbols');
require('unicode-6.2.0/blocks/Small_Form_Variants/regex');

require('unicode-6.2.0/blocks/Sora_Sompeng/code-points');
require('unicode-6.2.0/blocks/Sora_Sompeng/symbols');
require('unicode-6.2.0/blocks/Sora_Sompeng/regex');

require('unicode-6.2.0/blocks/Spacing_Modifier_Letters/code-points');
require('unicode-6.2.0/blocks/Spacing_Modifier_Letters/symbols');
require('unicode-6.2.0/blocks/Spacing_Modifier_Letters/regex');

require('unicode-6.2.0/blocks/Specials/code-points');
require('unicode-6.2.0/blocks/Specials/symbols');
require('unicode-6.2.0/blocks/Specials/regex');

require('unicode-6.2.0/blocks/Sundanese/code-points');
require('unicode-6.2.0/blocks/Sundanese/symbols');
require('unicode-6.2.0/blocks/Sundanese/regex');

require('unicode-6.2.0/blocks/Sundanese_Supplement/code-points');
require('unicode-6.2.0/blocks/Sundanese_Supplement/symbols');
require('unicode-6.2.0/blocks/Sundanese_Supplement/regex');

require('unicode-6.2.0/blocks/Superscripts_and_Subscripts/code-points');
require('unicode-6.2.0/blocks/Superscripts_and_Subscripts/symbols');
require('unicode-6.2.0/blocks/Superscripts_and_Subscripts/regex');

require('unicode-6.2.0/blocks/Supplemental_Arrows-A/code-points');
require('unicode-6.2.0/blocks/Supplemental_Arrows-A/symbols');
require('unicode-6.2.0/blocks/Supplemental_Arrows-A/regex');

require('unicode-6.2.0/blocks/Supplemental_Arrows-B/code-points');
require('unicode-6.2.0/blocks/Supplemental_Arrows-B/symbols');
require('unicode-6.2.0/blocks/Supplemental_Arrows-B/regex');

require('unicode-6.2.0/blocks/Supplemental_Mathematical_Operators/code-points');
require('unicode-6.2.0/blocks/Supplemental_Mathematical_Operators/symbols');
require('unicode-6.2.0/blocks/Supplemental_Mathematical_Operators/regex');

require('unicode-6.2.0/blocks/Supplemental_Punctuation/code-points');
require('unicode-6.2.0/blocks/Supplemental_Punctuation/symbols');
require('unicode-6.2.0/blocks/Supplemental_Punctuation/regex');

require('unicode-6.2.0/blocks/Supplementary_Private_Use_Area-A/code-points');
require('unicode-6.2.0/blocks/Supplementary_Private_Use_Area-A/symbols');
require('unicode-6.2.0/blocks/Supplementary_Private_Use_Area-A/regex');

require('unicode-6.2.0/blocks/Supplementary_Private_Use_Area-B/code-points');
require('unicode-6.2.0/blocks/Supplementary_Private_Use_Area-B/symbols');
require('unicode-6.2.0/blocks/Supplementary_Private_Use_Area-B/regex');

require('unicode-6.2.0/blocks/Syloti_Nagri/code-points');
require('unicode-6.2.0/blocks/Syloti_Nagri/symbols');
require('unicode-6.2.0/blocks/Syloti_Nagri/regex');

require('unicode-6.2.0/blocks/Syriac/code-points');
require('unicode-6.2.0/blocks/Syriac/symbols');
require('unicode-6.2.0/blocks/Syriac/regex');

require('unicode-6.2.0/blocks/Tagalog/code-points');
require('unicode-6.2.0/blocks/Tagalog/symbols');
require('unicode-6.2.0/blocks/Tagalog/regex');

require('unicode-6.2.0/blocks/Tagbanwa/code-points');
require('unicode-6.2.0/blocks/Tagbanwa/symbols');
require('unicode-6.2.0/blocks/Tagbanwa/regex');

require('unicode-6.2.0/blocks/Tags/code-points');
require('unicode-6.2.0/blocks/Tags/symbols');
require('unicode-6.2.0/blocks/Tags/regex');

require('unicode-6.2.0/blocks/Tai_Le/code-points');
require('unicode-6.2.0/blocks/Tai_Le/symbols');
require('unicode-6.2.0/blocks/Tai_Le/regex');

require('unicode-6.2.0/blocks/Tai_Tham/code-points');
require('unicode-6.2.0/blocks/Tai_Tham/symbols');
require('unicode-6.2.0/blocks/Tai_Tham/regex');

require('unicode-6.2.0/blocks/Tai_Viet/code-points');
require('unicode-6.2.0/blocks/Tai_Viet/symbols');
require('unicode-6.2.0/blocks/Tai_Viet/regex');

require('unicode-6.2.0/blocks/Tai_Xuan_Jing_Symbols/code-points');
require('unicode-6.2.0/blocks/Tai_Xuan_Jing_Symbols/symbols');
require('unicode-6.2.0/blocks/Tai_Xuan_Jing_Symbols/regex');

require('unicode-6.2.0/blocks/Takri/code-points');
require('unicode-6.2.0/blocks/Takri/symbols');
require('unicode-6.2.0/blocks/Takri/regex');

require('unicode-6.2.0/blocks/Tamil/code-points');
require('unicode-6.2.0/blocks/Tamil/symbols');
require('unicode-6.2.0/blocks/Tamil/regex');

require('unicode-6.2.0/blocks/Telugu/code-points');
require('unicode-6.2.0/blocks/Telugu/symbols');
require('unicode-6.2.0/blocks/Telugu/regex');

require('unicode-6.2.0/blocks/Thaana/code-points');
require('unicode-6.2.0/blocks/Thaana/symbols');
require('unicode-6.2.0/blocks/Thaana/regex');

require('unicode-6.2.0/blocks/Thai/code-points');
require('unicode-6.2.0/blocks/Thai/symbols');
require('unicode-6.2.0/blocks/Thai/regex');

require('unicode-6.2.0/blocks/Tibetan/code-points');
require('unicode-6.2.0/blocks/Tibetan/symbols');
require('unicode-6.2.0/blocks/Tibetan/regex');

require('unicode-6.2.0/blocks/Tifinagh/code-points');
require('unicode-6.2.0/blocks/Tifinagh/symbols');
require('unicode-6.2.0/blocks/Tifinagh/regex');

require('unicode-6.2.0/blocks/Transport_And_Map_Symbols/code-points');
require('unicode-6.2.0/blocks/Transport_And_Map_Symbols/symbols');
require('unicode-6.2.0/blocks/Transport_And_Map_Symbols/regex');

require('unicode-6.2.0/blocks/Ugaritic/code-points');
require('unicode-6.2.0/blocks/Ugaritic/symbols');
require('unicode-6.2.0/blocks/Ugaritic/regex');

require('unicode-6.2.0/blocks/Unified_Canadian_Aboriginal_Syllabics/code-points');
require('unicode-6.2.0/blocks/Unified_Canadian_Aboriginal_Syllabics/symbols');
require('unicode-6.2.0/blocks/Unified_Canadian_Aboriginal_Syllabics/regex');

require('unicode-6.2.0/blocks/Unified_Canadian_Aboriginal_Syllabics_Extended/code-points');
require('unicode-6.2.0/blocks/Unified_Canadian_Aboriginal_Syllabics_Extended/symbols');
require('unicode-6.2.0/blocks/Unified_Canadian_Aboriginal_Syllabics_Extended/regex');

require('unicode-6.2.0/blocks/Vai/code-points');
require('unicode-6.2.0/blocks/Vai/symbols');
require('unicode-6.2.0/blocks/Vai/regex');

require('unicode-6.2.0/blocks/Variation_Selectors/code-points');
require('unicode-6.2.0/blocks/Variation_Selectors/symbols');
require('unicode-6.2.0/blocks/Variation_Selectors/regex');

require('unicode-6.2.0/blocks/Variation_Selectors_Supplement/code-points');
require('unicode-6.2.0/blocks/Variation_Selectors_Supplement/symbols');
require('unicode-6.2.0/blocks/Variation_Selectors_Supplement/regex');

require('unicode-6.2.0/blocks/Vedic_Extensions/code-points');
require('unicode-6.2.0/blocks/Vedic_Extensions/symbols');
require('unicode-6.2.0/blocks/Vedic_Extensions/regex');

require('unicode-6.2.0/blocks/Vertical_Forms/code-points');
require('unicode-6.2.0/blocks/Vertical_Forms/symbols');
require('unicode-6.2.0/blocks/Vertical_Forms/regex');

require('unicode-6.2.0/blocks/Yi_Radicals/code-points');
require('unicode-6.2.0/blocks/Yi_Radicals/symbols');
require('unicode-6.2.0/blocks/Yi_Radicals/regex');

require('unicode-6.2.0/blocks/Yi_Syllables/code-points');
require('unicode-6.2.0/blocks/Yi_Syllables/symbols');
require('unicode-6.2.0/blocks/Yi_Syllables/regex');

require('unicode-6.2.0/blocks/Yijing_Hexagram_Symbols/code-points');
require('unicode-6.2.0/blocks/Yijing_Hexagram_Symbols/symbols');
require('unicode-6.2.0/blocks/Yijing_Hexagram_Symbols/regex');

// bidi mirroring:

require('unicode-6.2.0/bidi-mirroring').get(codePoint); // lookup map
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This module is available under the [MIT](https://mths.be/mit) license.
