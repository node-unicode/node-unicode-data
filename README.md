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
  .add(require('unicode-6.3.0/Script_Extensions/Arabic/code-points')) // or `…/symbols`, doesn’t matter
  .add(require('unicode-6.3.0/Script_Extensions/Greek/code-points')); // or `…/symbols`, doesn’t matter
console.log(set.toString());
// Then you might want to use a template like this to write the result to a file, along with any regex flags you might need:
// const regex = /<%= set.toString() %>/gim;
```

## Usage

```js
// Get an array of code points in a given Unicode category:
const codePoints = require('unicode-6.2.0/General_Category/Uppercase_Letter/code-points');
// Get an array of symbols (strings) in a given Unicode category:
const symbols = require('unicode-6.2.0/General_Category/Uppercase_Letter/symbols');
// Get a regular expression that matches any symbol in a given Unicode category:
const regex = require('unicode-6.2.0/General_Category/Uppercase_Letter/regex');
// Get the canonical category a given code point belongs to:
// (Note: U+0041 is LATIN CAPITAL LETTER A)
const category = require('unicode-6.2.0/General_Category').get(0x41);
// Get an array of all code points with a given bidi class:
const on = require('unicode-6.2.0/Bidi_Class/Other_Neutral/code-points');
// Get a map from code points to bidi classes:
const bidiClassMap = require('unicode-6.2.0/Bidi_Class');
// Get the directionality of a given code point:
const directionality = require('unicode-6.2.0/Bidi_Class').get(0x41);

// What glyph is the mirror image of `«` (U+00AB)?
const mirrored = require('unicode-6.2.0/Bidi_Mirroring_Glyph').get(0xAB);

// …you get the idea.
```

Other than categories, data on Unicode properties, blocks, scripts, and script extensions is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v6.2.0:

```js
// `Binary_Property`:

require('unicode-6.2.0/Binary_Property/ASCII/code-points');
require('unicode-6.2.0/Binary_Property/ASCII/symbols');
require('unicode-6.2.0/Binary_Property/ASCII/regex');

require('unicode-6.2.0/Binary_Property/ASCII_Hex_Digit/code-points');
require('unicode-6.2.0/Binary_Property/ASCII_Hex_Digit/symbols');
require('unicode-6.2.0/Binary_Property/ASCII_Hex_Digit/regex');

require('unicode-6.2.0/Binary_Property/Alphabetic/code-points');
require('unicode-6.2.0/Binary_Property/Alphabetic/symbols');
require('unicode-6.2.0/Binary_Property/Alphabetic/regex');

require('unicode-6.2.0/Binary_Property/Any/code-points');
require('unicode-6.2.0/Binary_Property/Any/symbols');
require('unicode-6.2.0/Binary_Property/Any/regex');

require('unicode-6.2.0/Binary_Property/Assigned/code-points');
require('unicode-6.2.0/Binary_Property/Assigned/symbols');
require('unicode-6.2.0/Binary_Property/Assigned/regex');

require('unicode-6.2.0/Binary_Property/Bidi_Control/code-points');
require('unicode-6.2.0/Binary_Property/Bidi_Control/symbols');
require('unicode-6.2.0/Binary_Property/Bidi_Control/regex');

require('unicode-6.2.0/Binary_Property/Bidi_Mirrored/code-points');
require('unicode-6.2.0/Binary_Property/Bidi_Mirrored/symbols');
require('unicode-6.2.0/Binary_Property/Bidi_Mirrored/regex');

require('unicode-6.2.0/Binary_Property/Case_Ignorable/code-points');
require('unicode-6.2.0/Binary_Property/Case_Ignorable/symbols');
require('unicode-6.2.0/Binary_Property/Case_Ignorable/regex');

require('unicode-6.2.0/Binary_Property/Cased/code-points');
require('unicode-6.2.0/Binary_Property/Cased/symbols');
require('unicode-6.2.0/Binary_Property/Cased/regex');

require('unicode-6.2.0/Binary_Property/Changes_When_Casefolded/code-points');
require('unicode-6.2.0/Binary_Property/Changes_When_Casefolded/symbols');
require('unicode-6.2.0/Binary_Property/Changes_When_Casefolded/regex');

require('unicode-6.2.0/Binary_Property/Changes_When_Casemapped/code-points');
require('unicode-6.2.0/Binary_Property/Changes_When_Casemapped/symbols');
require('unicode-6.2.0/Binary_Property/Changes_When_Casemapped/regex');

require('unicode-6.2.0/Binary_Property/Changes_When_Lowercased/code-points');
require('unicode-6.2.0/Binary_Property/Changes_When_Lowercased/symbols');
require('unicode-6.2.0/Binary_Property/Changes_When_Lowercased/regex');

require('unicode-6.2.0/Binary_Property/Changes_When_NFKC_Casefolded/code-points');
require('unicode-6.2.0/Binary_Property/Changes_When_NFKC_Casefolded/symbols');
require('unicode-6.2.0/Binary_Property/Changes_When_NFKC_Casefolded/regex');

require('unicode-6.2.0/Binary_Property/Changes_When_Titlecased/code-points');
require('unicode-6.2.0/Binary_Property/Changes_When_Titlecased/symbols');
require('unicode-6.2.0/Binary_Property/Changes_When_Titlecased/regex');

require('unicode-6.2.0/Binary_Property/Changes_When_Uppercased/code-points');
require('unicode-6.2.0/Binary_Property/Changes_When_Uppercased/symbols');
require('unicode-6.2.0/Binary_Property/Changes_When_Uppercased/regex');

require('unicode-6.2.0/Binary_Property/Composition_Exclusion/code-points');
require('unicode-6.2.0/Binary_Property/Composition_Exclusion/symbols');
require('unicode-6.2.0/Binary_Property/Composition_Exclusion/regex');

require('unicode-6.2.0/Binary_Property/Dash/code-points');
require('unicode-6.2.0/Binary_Property/Dash/symbols');
require('unicode-6.2.0/Binary_Property/Dash/regex');

require('unicode-6.2.0/Binary_Property/Default_Ignorable_Code_Point/code-points');
require('unicode-6.2.0/Binary_Property/Default_Ignorable_Code_Point/symbols');
require('unicode-6.2.0/Binary_Property/Default_Ignorable_Code_Point/regex');

require('unicode-6.2.0/Binary_Property/Deprecated/code-points');
require('unicode-6.2.0/Binary_Property/Deprecated/symbols');
require('unicode-6.2.0/Binary_Property/Deprecated/regex');

require('unicode-6.2.0/Binary_Property/Diacritic/code-points');
require('unicode-6.2.0/Binary_Property/Diacritic/symbols');
require('unicode-6.2.0/Binary_Property/Diacritic/regex');

require('unicode-6.2.0/Binary_Property/Expands_On_NFC/code-points');
require('unicode-6.2.0/Binary_Property/Expands_On_NFC/symbols');
require('unicode-6.2.0/Binary_Property/Expands_On_NFC/regex');

require('unicode-6.2.0/Binary_Property/Expands_On_NFD/code-points');
require('unicode-6.2.0/Binary_Property/Expands_On_NFD/symbols');
require('unicode-6.2.0/Binary_Property/Expands_On_NFD/regex');

require('unicode-6.2.0/Binary_Property/Expands_On_NFKC/code-points');
require('unicode-6.2.0/Binary_Property/Expands_On_NFKC/symbols');
require('unicode-6.2.0/Binary_Property/Expands_On_NFKC/regex');

require('unicode-6.2.0/Binary_Property/Expands_On_NFKD/code-points');
require('unicode-6.2.0/Binary_Property/Expands_On_NFKD/symbols');
require('unicode-6.2.0/Binary_Property/Expands_On_NFKD/regex');

require('unicode-6.2.0/Binary_Property/Extender/code-points');
require('unicode-6.2.0/Binary_Property/Extender/symbols');
require('unicode-6.2.0/Binary_Property/Extender/regex');

require('unicode-6.2.0/Binary_Property/FC_NFKC_Closure/code-points');
require('unicode-6.2.0/Binary_Property/FC_NFKC_Closure/symbols');
require('unicode-6.2.0/Binary_Property/FC_NFKC_Closure/regex');

require('unicode-6.2.0/Binary_Property/Full_Composition_Exclusion/code-points');
require('unicode-6.2.0/Binary_Property/Full_Composition_Exclusion/symbols');
require('unicode-6.2.0/Binary_Property/Full_Composition_Exclusion/regex');

require('unicode-6.2.0/Binary_Property/Grapheme_Base/code-points');
require('unicode-6.2.0/Binary_Property/Grapheme_Base/symbols');
require('unicode-6.2.0/Binary_Property/Grapheme_Base/regex');

require('unicode-6.2.0/Binary_Property/Grapheme_Extend/code-points');
require('unicode-6.2.0/Binary_Property/Grapheme_Extend/symbols');
require('unicode-6.2.0/Binary_Property/Grapheme_Extend/regex');

require('unicode-6.2.0/Binary_Property/Grapheme_Link/code-points');
require('unicode-6.2.0/Binary_Property/Grapheme_Link/symbols');
require('unicode-6.2.0/Binary_Property/Grapheme_Link/regex');

require('unicode-6.2.0/Binary_Property/Hex_Digit/code-points');
require('unicode-6.2.0/Binary_Property/Hex_Digit/symbols');
require('unicode-6.2.0/Binary_Property/Hex_Digit/regex');

require('unicode-6.2.0/Binary_Property/Hyphen/code-points');
require('unicode-6.2.0/Binary_Property/Hyphen/symbols');
require('unicode-6.2.0/Binary_Property/Hyphen/regex');

require('unicode-6.2.0/Binary_Property/IDS_Binary_Operator/code-points');
require('unicode-6.2.0/Binary_Property/IDS_Binary_Operator/symbols');
require('unicode-6.2.0/Binary_Property/IDS_Binary_Operator/regex');

require('unicode-6.2.0/Binary_Property/IDS_Trinary_Operator/code-points');
require('unicode-6.2.0/Binary_Property/IDS_Trinary_Operator/symbols');
require('unicode-6.2.0/Binary_Property/IDS_Trinary_Operator/regex');

require('unicode-6.2.0/Binary_Property/ID_Continue/code-points');
require('unicode-6.2.0/Binary_Property/ID_Continue/symbols');
require('unicode-6.2.0/Binary_Property/ID_Continue/regex');

require('unicode-6.2.0/Binary_Property/ID_Start/code-points');
require('unicode-6.2.0/Binary_Property/ID_Start/symbols');
require('unicode-6.2.0/Binary_Property/ID_Start/regex');

require('unicode-6.2.0/Binary_Property/Ideographic/code-points');
require('unicode-6.2.0/Binary_Property/Ideographic/symbols');
require('unicode-6.2.0/Binary_Property/Ideographic/regex');

require('unicode-6.2.0/Binary_Property/Join_Control/code-points');
require('unicode-6.2.0/Binary_Property/Join_Control/symbols');
require('unicode-6.2.0/Binary_Property/Join_Control/regex');

require('unicode-6.2.0/Binary_Property/Logical_Order_Exception/code-points');
require('unicode-6.2.0/Binary_Property/Logical_Order_Exception/symbols');
require('unicode-6.2.0/Binary_Property/Logical_Order_Exception/regex');

require('unicode-6.2.0/Binary_Property/Lowercase/code-points');
require('unicode-6.2.0/Binary_Property/Lowercase/symbols');
require('unicode-6.2.0/Binary_Property/Lowercase/regex');

require('unicode-6.2.0/Binary_Property/Math/code-points');
require('unicode-6.2.0/Binary_Property/Math/symbols');
require('unicode-6.2.0/Binary_Property/Math/regex');

require('unicode-6.2.0/Binary_Property/Noncharacter_Code_Point/code-points');
require('unicode-6.2.0/Binary_Property/Noncharacter_Code_Point/symbols');
require('unicode-6.2.0/Binary_Property/Noncharacter_Code_Point/regex');

require('unicode-6.2.0/Binary_Property/Other_Alphabetic/code-points');
require('unicode-6.2.0/Binary_Property/Other_Alphabetic/symbols');
require('unicode-6.2.0/Binary_Property/Other_Alphabetic/regex');

require('unicode-6.2.0/Binary_Property/Other_Default_Ignorable_Code_Point/code-points');
require('unicode-6.2.0/Binary_Property/Other_Default_Ignorable_Code_Point/symbols');
require('unicode-6.2.0/Binary_Property/Other_Default_Ignorable_Code_Point/regex');

require('unicode-6.2.0/Binary_Property/Other_Grapheme_Extend/code-points');
require('unicode-6.2.0/Binary_Property/Other_Grapheme_Extend/symbols');
require('unicode-6.2.0/Binary_Property/Other_Grapheme_Extend/regex');

require('unicode-6.2.0/Binary_Property/Other_ID_Continue/code-points');
require('unicode-6.2.0/Binary_Property/Other_ID_Continue/symbols');
require('unicode-6.2.0/Binary_Property/Other_ID_Continue/regex');

require('unicode-6.2.0/Binary_Property/Other_ID_Start/code-points');
require('unicode-6.2.0/Binary_Property/Other_ID_Start/symbols');
require('unicode-6.2.0/Binary_Property/Other_ID_Start/regex');

require('unicode-6.2.0/Binary_Property/Other_Lowercase/code-points');
require('unicode-6.2.0/Binary_Property/Other_Lowercase/symbols');
require('unicode-6.2.0/Binary_Property/Other_Lowercase/regex');

require('unicode-6.2.0/Binary_Property/Other_Math/code-points');
require('unicode-6.2.0/Binary_Property/Other_Math/symbols');
require('unicode-6.2.0/Binary_Property/Other_Math/regex');

require('unicode-6.2.0/Binary_Property/Other_Uppercase/code-points');
require('unicode-6.2.0/Binary_Property/Other_Uppercase/symbols');
require('unicode-6.2.0/Binary_Property/Other_Uppercase/regex');

require('unicode-6.2.0/Binary_Property/Pattern_Syntax/code-points');
require('unicode-6.2.0/Binary_Property/Pattern_Syntax/symbols');
require('unicode-6.2.0/Binary_Property/Pattern_Syntax/regex');

require('unicode-6.2.0/Binary_Property/Pattern_White_Space/code-points');
require('unicode-6.2.0/Binary_Property/Pattern_White_Space/symbols');
require('unicode-6.2.0/Binary_Property/Pattern_White_Space/regex');

require('unicode-6.2.0/Binary_Property/Quotation_Mark/code-points');
require('unicode-6.2.0/Binary_Property/Quotation_Mark/symbols');
require('unicode-6.2.0/Binary_Property/Quotation_Mark/regex');

require('unicode-6.2.0/Binary_Property/Radical/code-points');
require('unicode-6.2.0/Binary_Property/Radical/symbols');
require('unicode-6.2.0/Binary_Property/Radical/regex');

require('unicode-6.2.0/Binary_Property/STerm/code-points');
require('unicode-6.2.0/Binary_Property/STerm/symbols');
require('unicode-6.2.0/Binary_Property/STerm/regex');

require('unicode-6.2.0/Binary_Property/Soft_Dotted/code-points');
require('unicode-6.2.0/Binary_Property/Soft_Dotted/symbols');
require('unicode-6.2.0/Binary_Property/Soft_Dotted/regex');

require('unicode-6.2.0/Binary_Property/Terminal_Punctuation/code-points');
require('unicode-6.2.0/Binary_Property/Terminal_Punctuation/symbols');
require('unicode-6.2.0/Binary_Property/Terminal_Punctuation/regex');

require('unicode-6.2.0/Binary_Property/Unified_Ideograph/code-points');
require('unicode-6.2.0/Binary_Property/Unified_Ideograph/symbols');
require('unicode-6.2.0/Binary_Property/Unified_Ideograph/regex');

require('unicode-6.2.0/Binary_Property/Uppercase/code-points');
require('unicode-6.2.0/Binary_Property/Uppercase/symbols');
require('unicode-6.2.0/Binary_Property/Uppercase/regex');

require('unicode-6.2.0/Binary_Property/Variation_Selector/code-points');
require('unicode-6.2.0/Binary_Property/Variation_Selector/symbols');
require('unicode-6.2.0/Binary_Property/Variation_Selector/regex');

require('unicode-6.2.0/Binary_Property/White_Space/code-points');
require('unicode-6.2.0/Binary_Property/White_Space/symbols');
require('unicode-6.2.0/Binary_Property/White_Space/regex');

require('unicode-6.2.0/Binary_Property/XID_Continue/code-points');
require('unicode-6.2.0/Binary_Property/XID_Continue/symbols');
require('unicode-6.2.0/Binary_Property/XID_Continue/regex');

require('unicode-6.2.0/Binary_Property/XID_Start/code-points');
require('unicode-6.2.0/Binary_Property/XID_Start/symbols');
require('unicode-6.2.0/Binary_Property/XID_Start/regex');

// `General_Category`:

require('unicode-6.2.0/General_Category').get(codePoint); // lookup map

require('unicode-6.2.0/General_Category/Cased_Letter/code-points');
require('unicode-6.2.0/General_Category/Cased_Letter/symbols');
require('unicode-6.2.0/General_Category/Cased_Letter/regex');

require('unicode-6.2.0/General_Category/Close_Punctuation/code-points');
require('unicode-6.2.0/General_Category/Close_Punctuation/symbols');
require('unicode-6.2.0/General_Category/Close_Punctuation/regex');

require('unicode-6.2.0/General_Category/Connector_Punctuation/code-points');
require('unicode-6.2.0/General_Category/Connector_Punctuation/symbols');
require('unicode-6.2.0/General_Category/Connector_Punctuation/regex');

require('unicode-6.2.0/General_Category/Control/code-points');
require('unicode-6.2.0/General_Category/Control/symbols');
require('unicode-6.2.0/General_Category/Control/regex');

require('unicode-6.2.0/General_Category/Currency_Symbol/code-points');
require('unicode-6.2.0/General_Category/Currency_Symbol/symbols');
require('unicode-6.2.0/General_Category/Currency_Symbol/regex');

require('unicode-6.2.0/General_Category/Dash_Punctuation/code-points');
require('unicode-6.2.0/General_Category/Dash_Punctuation/symbols');
require('unicode-6.2.0/General_Category/Dash_Punctuation/regex');

require('unicode-6.2.0/General_Category/Decimal_Number/code-points');
require('unicode-6.2.0/General_Category/Decimal_Number/symbols');
require('unicode-6.2.0/General_Category/Decimal_Number/regex');

require('unicode-6.2.0/General_Category/Enclosing_Mark/code-points');
require('unicode-6.2.0/General_Category/Enclosing_Mark/symbols');
require('unicode-6.2.0/General_Category/Enclosing_Mark/regex');

require('unicode-6.2.0/General_Category/Final_Punctuation/code-points');
require('unicode-6.2.0/General_Category/Final_Punctuation/symbols');
require('unicode-6.2.0/General_Category/Final_Punctuation/regex');

require('unicode-6.2.0/General_Category/Format/code-points');
require('unicode-6.2.0/General_Category/Format/symbols');
require('unicode-6.2.0/General_Category/Format/regex');

require('unicode-6.2.0/General_Category/Initial_Punctuation/code-points');
require('unicode-6.2.0/General_Category/Initial_Punctuation/symbols');
require('unicode-6.2.0/General_Category/Initial_Punctuation/regex');

require('unicode-6.2.0/General_Category/Letter/code-points');
require('unicode-6.2.0/General_Category/Letter/symbols');
require('unicode-6.2.0/General_Category/Letter/regex');

require('unicode-6.2.0/General_Category/Letter_Number/code-points');
require('unicode-6.2.0/General_Category/Letter_Number/symbols');
require('unicode-6.2.0/General_Category/Letter_Number/regex');

require('unicode-6.2.0/General_Category/Line_Separator/code-points');
require('unicode-6.2.0/General_Category/Line_Separator/symbols');
require('unicode-6.2.0/General_Category/Line_Separator/regex');

require('unicode-6.2.0/General_Category/Lowercase_Letter/code-points');
require('unicode-6.2.0/General_Category/Lowercase_Letter/symbols');
require('unicode-6.2.0/General_Category/Lowercase_Letter/regex');

require('unicode-6.2.0/General_Category/Mark/code-points');
require('unicode-6.2.0/General_Category/Mark/symbols');
require('unicode-6.2.0/General_Category/Mark/regex');

require('unicode-6.2.0/General_Category/Math_Symbol/code-points');
require('unicode-6.2.0/General_Category/Math_Symbol/symbols');
require('unicode-6.2.0/General_Category/Math_Symbol/regex');

require('unicode-6.2.0/General_Category/Modifier_Letter/code-points');
require('unicode-6.2.0/General_Category/Modifier_Letter/symbols');
require('unicode-6.2.0/General_Category/Modifier_Letter/regex');

require('unicode-6.2.0/General_Category/Modifier_Symbol/code-points');
require('unicode-6.2.0/General_Category/Modifier_Symbol/symbols');
require('unicode-6.2.0/General_Category/Modifier_Symbol/regex');

require('unicode-6.2.0/General_Category/Nonspacing_Mark/code-points');
require('unicode-6.2.0/General_Category/Nonspacing_Mark/symbols');
require('unicode-6.2.0/General_Category/Nonspacing_Mark/regex');

require('unicode-6.2.0/General_Category/Number/code-points');
require('unicode-6.2.0/General_Category/Number/symbols');
require('unicode-6.2.0/General_Category/Number/regex');

require('unicode-6.2.0/General_Category/Open_Punctuation/code-points');
require('unicode-6.2.0/General_Category/Open_Punctuation/symbols');
require('unicode-6.2.0/General_Category/Open_Punctuation/regex');

require('unicode-6.2.0/General_Category/Other/code-points');
require('unicode-6.2.0/General_Category/Other/symbols');
require('unicode-6.2.0/General_Category/Other/regex');

require('unicode-6.2.0/General_Category/Other_Letter/code-points');
require('unicode-6.2.0/General_Category/Other_Letter/symbols');
require('unicode-6.2.0/General_Category/Other_Letter/regex');

require('unicode-6.2.0/General_Category/Other_Number/code-points');
require('unicode-6.2.0/General_Category/Other_Number/symbols');
require('unicode-6.2.0/General_Category/Other_Number/regex');

require('unicode-6.2.0/General_Category/Other_Punctuation/code-points');
require('unicode-6.2.0/General_Category/Other_Punctuation/symbols');
require('unicode-6.2.0/General_Category/Other_Punctuation/regex');

require('unicode-6.2.0/General_Category/Other_Symbol/code-points');
require('unicode-6.2.0/General_Category/Other_Symbol/symbols');
require('unicode-6.2.0/General_Category/Other_Symbol/regex');

require('unicode-6.2.0/General_Category/Paragraph_Separator/code-points');
require('unicode-6.2.0/General_Category/Paragraph_Separator/symbols');
require('unicode-6.2.0/General_Category/Paragraph_Separator/regex');

require('unicode-6.2.0/General_Category/Private_Use/code-points');
require('unicode-6.2.0/General_Category/Private_Use/symbols');
require('unicode-6.2.0/General_Category/Private_Use/regex');

require('unicode-6.2.0/General_Category/Punctuation/code-points');
require('unicode-6.2.0/General_Category/Punctuation/symbols');
require('unicode-6.2.0/General_Category/Punctuation/regex');

require('unicode-6.2.0/General_Category/Separator/code-points');
require('unicode-6.2.0/General_Category/Separator/symbols');
require('unicode-6.2.0/General_Category/Separator/regex');

require('unicode-6.2.0/General_Category/Space_Separator/code-points');
require('unicode-6.2.0/General_Category/Space_Separator/symbols');
require('unicode-6.2.0/General_Category/Space_Separator/regex');

require('unicode-6.2.0/General_Category/Spacing_Mark/code-points');
require('unicode-6.2.0/General_Category/Spacing_Mark/symbols');
require('unicode-6.2.0/General_Category/Spacing_Mark/regex');

require('unicode-6.2.0/General_Category/Surrogate/code-points');
require('unicode-6.2.0/General_Category/Surrogate/symbols');
require('unicode-6.2.0/General_Category/Surrogate/regex');

require('unicode-6.2.0/General_Category/Symbol/code-points');
require('unicode-6.2.0/General_Category/Symbol/symbols');
require('unicode-6.2.0/General_Category/Symbol/regex');

require('unicode-6.2.0/General_Category/Titlecase_Letter/code-points');
require('unicode-6.2.0/General_Category/Titlecase_Letter/symbols');
require('unicode-6.2.0/General_Category/Titlecase_Letter/regex');

require('unicode-6.2.0/General_Category/Unassigned/code-points');
require('unicode-6.2.0/General_Category/Unassigned/symbols');
require('unicode-6.2.0/General_Category/Unassigned/regex');

require('unicode-6.2.0/General_Category/Uppercase_Letter/code-points');
require('unicode-6.2.0/General_Category/Uppercase_Letter/symbols');
require('unicode-6.2.0/General_Category/Uppercase_Letter/regex');

// `Bidi_Class`:

require('unicode-6.2.0/Bidi_Class').get(codePoint); // lookup map

require('unicode-6.2.0/Bidi_Class/Arabic_Letter/code-points');
require('unicode-6.2.0/Bidi_Class/Arabic_Letter/symbols');
require('unicode-6.2.0/Bidi_Class/Arabic_Letter/regex');

require('unicode-6.2.0/Bidi_Class/Arabic_Number/code-points');
require('unicode-6.2.0/Bidi_Class/Arabic_Number/symbols');
require('unicode-6.2.0/Bidi_Class/Arabic_Number/regex');

require('unicode-6.2.0/Bidi_Class/Boundary_Neutral/code-points');
require('unicode-6.2.0/Bidi_Class/Boundary_Neutral/symbols');
require('unicode-6.2.0/Bidi_Class/Boundary_Neutral/regex');

require('unicode-6.2.0/Bidi_Class/Common_Separator/code-points');
require('unicode-6.2.0/Bidi_Class/Common_Separator/symbols');
require('unicode-6.2.0/Bidi_Class/Common_Separator/regex');

require('unicode-6.2.0/Bidi_Class/European_Number/code-points');
require('unicode-6.2.0/Bidi_Class/European_Number/symbols');
require('unicode-6.2.0/Bidi_Class/European_Number/regex');

require('unicode-6.2.0/Bidi_Class/European_Separator/code-points');
require('unicode-6.2.0/Bidi_Class/European_Separator/symbols');
require('unicode-6.2.0/Bidi_Class/European_Separator/regex');

require('unicode-6.2.0/Bidi_Class/European_Terminator/code-points');
require('unicode-6.2.0/Bidi_Class/European_Terminator/symbols');
require('unicode-6.2.0/Bidi_Class/European_Terminator/regex');

require('unicode-6.2.0/Bidi_Class/Left_To_Right/code-points');
require('unicode-6.2.0/Bidi_Class/Left_To_Right/symbols');
require('unicode-6.2.0/Bidi_Class/Left_To_Right/regex');

require('unicode-6.2.0/Bidi_Class/Left_To_Right_Embedding/code-points');
require('unicode-6.2.0/Bidi_Class/Left_To_Right_Embedding/symbols');
require('unicode-6.2.0/Bidi_Class/Left_To_Right_Embedding/regex');

require('unicode-6.2.0/Bidi_Class/Left_To_Right_Override/code-points');
require('unicode-6.2.0/Bidi_Class/Left_To_Right_Override/symbols');
require('unicode-6.2.0/Bidi_Class/Left_To_Right_Override/regex');

require('unicode-6.2.0/Bidi_Class/Nonspacing_Mark/code-points');
require('unicode-6.2.0/Bidi_Class/Nonspacing_Mark/symbols');
require('unicode-6.2.0/Bidi_Class/Nonspacing_Mark/regex');

require('unicode-6.2.0/Bidi_Class/Other_Neutral/code-points');
require('unicode-6.2.0/Bidi_Class/Other_Neutral/symbols');
require('unicode-6.2.0/Bidi_Class/Other_Neutral/regex');

require('unicode-6.2.0/Bidi_Class/Paragraph_Separator/code-points');
require('unicode-6.2.0/Bidi_Class/Paragraph_Separator/symbols');
require('unicode-6.2.0/Bidi_Class/Paragraph_Separator/regex');

require('unicode-6.2.0/Bidi_Class/Pop_Directional_Format/code-points');
require('unicode-6.2.0/Bidi_Class/Pop_Directional_Format/symbols');
require('unicode-6.2.0/Bidi_Class/Pop_Directional_Format/regex');

require('unicode-6.2.0/Bidi_Class/Right_To_Left/code-points');
require('unicode-6.2.0/Bidi_Class/Right_To_Left/symbols');
require('unicode-6.2.0/Bidi_Class/Right_To_Left/regex');

require('unicode-6.2.0/Bidi_Class/Right_To_Left_Embedding/code-points');
require('unicode-6.2.0/Bidi_Class/Right_To_Left_Embedding/symbols');
require('unicode-6.2.0/Bidi_Class/Right_To_Left_Embedding/regex');

require('unicode-6.2.0/Bidi_Class/Right_To_Left_Override/code-points');
require('unicode-6.2.0/Bidi_Class/Right_To_Left_Override/symbols');
require('unicode-6.2.0/Bidi_Class/Right_To_Left_Override/regex');

require('unicode-6.2.0/Bidi_Class/Segment_Separator/code-points');
require('unicode-6.2.0/Bidi_Class/Segment_Separator/symbols');
require('unicode-6.2.0/Bidi_Class/Segment_Separator/regex');

require('unicode-6.2.0/Bidi_Class/White_Space/code-points');
require('unicode-6.2.0/Bidi_Class/White_Space/symbols');
require('unicode-6.2.0/Bidi_Class/White_Space/regex');

// `Script`:

require('unicode-6.2.0/Script/Arabic/code-points');
require('unicode-6.2.0/Script/Arabic/symbols');
require('unicode-6.2.0/Script/Arabic/regex');

require('unicode-6.2.0/Script/Armenian/code-points');
require('unicode-6.2.0/Script/Armenian/symbols');
require('unicode-6.2.0/Script/Armenian/regex');

require('unicode-6.2.0/Script/Avestan/code-points');
require('unicode-6.2.0/Script/Avestan/symbols');
require('unicode-6.2.0/Script/Avestan/regex');

require('unicode-6.2.0/Script/Balinese/code-points');
require('unicode-6.2.0/Script/Balinese/symbols');
require('unicode-6.2.0/Script/Balinese/regex');

require('unicode-6.2.0/Script/Bamum/code-points');
require('unicode-6.2.0/Script/Bamum/symbols');
require('unicode-6.2.0/Script/Bamum/regex');

require('unicode-6.2.0/Script/Batak/code-points');
require('unicode-6.2.0/Script/Batak/symbols');
require('unicode-6.2.0/Script/Batak/regex');

require('unicode-6.2.0/Script/Bengali/code-points');
require('unicode-6.2.0/Script/Bengali/symbols');
require('unicode-6.2.0/Script/Bengali/regex');

require('unicode-6.2.0/Script/Bopomofo/code-points');
require('unicode-6.2.0/Script/Bopomofo/symbols');
require('unicode-6.2.0/Script/Bopomofo/regex');

require('unicode-6.2.0/Script/Brahmi/code-points');
require('unicode-6.2.0/Script/Brahmi/symbols');
require('unicode-6.2.0/Script/Brahmi/regex');

require('unicode-6.2.0/Script/Braille/code-points');
require('unicode-6.2.0/Script/Braille/symbols');
require('unicode-6.2.0/Script/Braille/regex');

require('unicode-6.2.0/Script/Buginese/code-points');
require('unicode-6.2.0/Script/Buginese/symbols');
require('unicode-6.2.0/Script/Buginese/regex');

require('unicode-6.2.0/Script/Buhid/code-points');
require('unicode-6.2.0/Script/Buhid/symbols');
require('unicode-6.2.0/Script/Buhid/regex');

require('unicode-6.2.0/Script/Canadian_Aboriginal/code-points');
require('unicode-6.2.0/Script/Canadian_Aboriginal/symbols');
require('unicode-6.2.0/Script/Canadian_Aboriginal/regex');

require('unicode-6.2.0/Script/Carian/code-points');
require('unicode-6.2.0/Script/Carian/symbols');
require('unicode-6.2.0/Script/Carian/regex');

require('unicode-6.2.0/Script/Chakma/code-points');
require('unicode-6.2.0/Script/Chakma/symbols');
require('unicode-6.2.0/Script/Chakma/regex');

require('unicode-6.2.0/Script/Cham/code-points');
require('unicode-6.2.0/Script/Cham/symbols');
require('unicode-6.2.0/Script/Cham/regex');

require('unicode-6.2.0/Script/Cherokee/code-points');
require('unicode-6.2.0/Script/Cherokee/symbols');
require('unicode-6.2.0/Script/Cherokee/regex');

require('unicode-6.2.0/Script/Common/code-points');
require('unicode-6.2.0/Script/Common/symbols');
require('unicode-6.2.0/Script/Common/regex');

require('unicode-6.2.0/Script/Coptic/code-points');
require('unicode-6.2.0/Script/Coptic/symbols');
require('unicode-6.2.0/Script/Coptic/regex');

require('unicode-6.2.0/Script/Cuneiform/code-points');
require('unicode-6.2.0/Script/Cuneiform/symbols');
require('unicode-6.2.0/Script/Cuneiform/regex');

require('unicode-6.2.0/Script/Cypriot/code-points');
require('unicode-6.2.0/Script/Cypriot/symbols');
require('unicode-6.2.0/Script/Cypriot/regex');

require('unicode-6.2.0/Script/Cyrillic/code-points');
require('unicode-6.2.0/Script/Cyrillic/symbols');
require('unicode-6.2.0/Script/Cyrillic/regex');

require('unicode-6.2.0/Script/Deseret/code-points');
require('unicode-6.2.0/Script/Deseret/symbols');
require('unicode-6.2.0/Script/Deseret/regex');

require('unicode-6.2.0/Script/Devanagari/code-points');
require('unicode-6.2.0/Script/Devanagari/symbols');
require('unicode-6.2.0/Script/Devanagari/regex');

require('unicode-6.2.0/Script/Egyptian_Hieroglyphs/code-points');
require('unicode-6.2.0/Script/Egyptian_Hieroglyphs/symbols');
require('unicode-6.2.0/Script/Egyptian_Hieroglyphs/regex');

require('unicode-6.2.0/Script/Ethiopic/code-points');
require('unicode-6.2.0/Script/Ethiopic/symbols');
require('unicode-6.2.0/Script/Ethiopic/regex');

require('unicode-6.2.0/Script/Georgian/code-points');
require('unicode-6.2.0/Script/Georgian/symbols');
require('unicode-6.2.0/Script/Georgian/regex');

require('unicode-6.2.0/Script/Glagolitic/code-points');
require('unicode-6.2.0/Script/Glagolitic/symbols');
require('unicode-6.2.0/Script/Glagolitic/regex');

require('unicode-6.2.0/Script/Gothic/code-points');
require('unicode-6.2.0/Script/Gothic/symbols');
require('unicode-6.2.0/Script/Gothic/regex');

require('unicode-6.2.0/Script/Greek/code-points');
require('unicode-6.2.0/Script/Greek/symbols');
require('unicode-6.2.0/Script/Greek/regex');

require('unicode-6.2.0/Script/Gujarati/code-points');
require('unicode-6.2.0/Script/Gujarati/symbols');
require('unicode-6.2.0/Script/Gujarati/regex');

require('unicode-6.2.0/Script/Gurmukhi/code-points');
require('unicode-6.2.0/Script/Gurmukhi/symbols');
require('unicode-6.2.0/Script/Gurmukhi/regex');

require('unicode-6.2.0/Script/Han/code-points');
require('unicode-6.2.0/Script/Han/symbols');
require('unicode-6.2.0/Script/Han/regex');

require('unicode-6.2.0/Script/Hangul/code-points');
require('unicode-6.2.0/Script/Hangul/symbols');
require('unicode-6.2.0/Script/Hangul/regex');

require('unicode-6.2.0/Script/Hanunoo/code-points');
require('unicode-6.2.0/Script/Hanunoo/symbols');
require('unicode-6.2.0/Script/Hanunoo/regex');

require('unicode-6.2.0/Script/Hebrew/code-points');
require('unicode-6.2.0/Script/Hebrew/symbols');
require('unicode-6.2.0/Script/Hebrew/regex');

require('unicode-6.2.0/Script/Hiragana/code-points');
require('unicode-6.2.0/Script/Hiragana/symbols');
require('unicode-6.2.0/Script/Hiragana/regex');

require('unicode-6.2.0/Script/Imperial_Aramaic/code-points');
require('unicode-6.2.0/Script/Imperial_Aramaic/symbols');
require('unicode-6.2.0/Script/Imperial_Aramaic/regex');

require('unicode-6.2.0/Script/Inherited/code-points');
require('unicode-6.2.0/Script/Inherited/symbols');
require('unicode-6.2.0/Script/Inherited/regex');

require('unicode-6.2.0/Script/Inscriptional_Pahlavi/code-points');
require('unicode-6.2.0/Script/Inscriptional_Pahlavi/symbols');
require('unicode-6.2.0/Script/Inscriptional_Pahlavi/regex');

require('unicode-6.2.0/Script/Inscriptional_Parthian/code-points');
require('unicode-6.2.0/Script/Inscriptional_Parthian/symbols');
require('unicode-6.2.0/Script/Inscriptional_Parthian/regex');

require('unicode-6.2.0/Script/Javanese/code-points');
require('unicode-6.2.0/Script/Javanese/symbols');
require('unicode-6.2.0/Script/Javanese/regex');

require('unicode-6.2.0/Script/Kaithi/code-points');
require('unicode-6.2.0/Script/Kaithi/symbols');
require('unicode-6.2.0/Script/Kaithi/regex');

require('unicode-6.2.0/Script/Kannada/code-points');
require('unicode-6.2.0/Script/Kannada/symbols');
require('unicode-6.2.0/Script/Kannada/regex');

require('unicode-6.2.0/Script/Katakana/code-points');
require('unicode-6.2.0/Script/Katakana/symbols');
require('unicode-6.2.0/Script/Katakana/regex');

require('unicode-6.2.0/Script/Kayah_Li/code-points');
require('unicode-6.2.0/Script/Kayah_Li/symbols');
require('unicode-6.2.0/Script/Kayah_Li/regex');

require('unicode-6.2.0/Script/Kharoshthi/code-points');
require('unicode-6.2.0/Script/Kharoshthi/symbols');
require('unicode-6.2.0/Script/Kharoshthi/regex');

require('unicode-6.2.0/Script/Khmer/code-points');
require('unicode-6.2.0/Script/Khmer/symbols');
require('unicode-6.2.0/Script/Khmer/regex');

require('unicode-6.2.0/Script/Lao/code-points');
require('unicode-6.2.0/Script/Lao/symbols');
require('unicode-6.2.0/Script/Lao/regex');

require('unicode-6.2.0/Script/Latin/code-points');
require('unicode-6.2.0/Script/Latin/symbols');
require('unicode-6.2.0/Script/Latin/regex');

require('unicode-6.2.0/Script/Lepcha/code-points');
require('unicode-6.2.0/Script/Lepcha/symbols');
require('unicode-6.2.0/Script/Lepcha/regex');

require('unicode-6.2.0/Script/Limbu/code-points');
require('unicode-6.2.0/Script/Limbu/symbols');
require('unicode-6.2.0/Script/Limbu/regex');

require('unicode-6.2.0/Script/Linear_B/code-points');
require('unicode-6.2.0/Script/Linear_B/symbols');
require('unicode-6.2.0/Script/Linear_B/regex');

require('unicode-6.2.0/Script/Lisu/code-points');
require('unicode-6.2.0/Script/Lisu/symbols');
require('unicode-6.2.0/Script/Lisu/regex');

require('unicode-6.2.0/Script/Lycian/code-points');
require('unicode-6.2.0/Script/Lycian/symbols');
require('unicode-6.2.0/Script/Lycian/regex');

require('unicode-6.2.0/Script/Lydian/code-points');
require('unicode-6.2.0/Script/Lydian/symbols');
require('unicode-6.2.0/Script/Lydian/regex');

require('unicode-6.2.0/Script/Malayalam/code-points');
require('unicode-6.2.0/Script/Malayalam/symbols');
require('unicode-6.2.0/Script/Malayalam/regex');

require('unicode-6.2.0/Script/Mandaic/code-points');
require('unicode-6.2.0/Script/Mandaic/symbols');
require('unicode-6.2.0/Script/Mandaic/regex');

require('unicode-6.2.0/Script/Meetei_Mayek/code-points');
require('unicode-6.2.0/Script/Meetei_Mayek/symbols');
require('unicode-6.2.0/Script/Meetei_Mayek/regex');

require('unicode-6.2.0/Script/Meroitic_Cursive/code-points');
require('unicode-6.2.0/Script/Meroitic_Cursive/symbols');
require('unicode-6.2.0/Script/Meroitic_Cursive/regex');

require('unicode-6.2.0/Script/Meroitic_Hieroglyphs/code-points');
require('unicode-6.2.0/Script/Meroitic_Hieroglyphs/symbols');
require('unicode-6.2.0/Script/Meroitic_Hieroglyphs/regex');

require('unicode-6.2.0/Script/Miao/code-points');
require('unicode-6.2.0/Script/Miao/symbols');
require('unicode-6.2.0/Script/Miao/regex');

require('unicode-6.2.0/Script/Mongolian/code-points');
require('unicode-6.2.0/Script/Mongolian/symbols');
require('unicode-6.2.0/Script/Mongolian/regex');

require('unicode-6.2.0/Script/Myanmar/code-points');
require('unicode-6.2.0/Script/Myanmar/symbols');
require('unicode-6.2.0/Script/Myanmar/regex');

require('unicode-6.2.0/Script/New_Tai_Lue/code-points');
require('unicode-6.2.0/Script/New_Tai_Lue/symbols');
require('unicode-6.2.0/Script/New_Tai_Lue/regex');

require('unicode-6.2.0/Script/Nko/code-points');
require('unicode-6.2.0/Script/Nko/symbols');
require('unicode-6.2.0/Script/Nko/regex');

require('unicode-6.2.0/Script/Ogham/code-points');
require('unicode-6.2.0/Script/Ogham/symbols');
require('unicode-6.2.0/Script/Ogham/regex');

require('unicode-6.2.0/Script/Ol_Chiki/code-points');
require('unicode-6.2.0/Script/Ol_Chiki/symbols');
require('unicode-6.2.0/Script/Ol_Chiki/regex');

require('unicode-6.2.0/Script/Old_Italic/code-points');
require('unicode-6.2.0/Script/Old_Italic/symbols');
require('unicode-6.2.0/Script/Old_Italic/regex');

require('unicode-6.2.0/Script/Old_Persian/code-points');
require('unicode-6.2.0/Script/Old_Persian/symbols');
require('unicode-6.2.0/Script/Old_Persian/regex');

require('unicode-6.2.0/Script/Old_South_Arabian/code-points');
require('unicode-6.2.0/Script/Old_South_Arabian/symbols');
require('unicode-6.2.0/Script/Old_South_Arabian/regex');

require('unicode-6.2.0/Script/Old_Turkic/code-points');
require('unicode-6.2.0/Script/Old_Turkic/symbols');
require('unicode-6.2.0/Script/Old_Turkic/regex');

require('unicode-6.2.0/Script/Oriya/code-points');
require('unicode-6.2.0/Script/Oriya/symbols');
require('unicode-6.2.0/Script/Oriya/regex');

require('unicode-6.2.0/Script/Osmanya/code-points');
require('unicode-6.2.0/Script/Osmanya/symbols');
require('unicode-6.2.0/Script/Osmanya/regex');

require('unicode-6.2.0/Script/Phags_Pa/code-points');
require('unicode-6.2.0/Script/Phags_Pa/symbols');
require('unicode-6.2.0/Script/Phags_Pa/regex');

require('unicode-6.2.0/Script/Phoenician/code-points');
require('unicode-6.2.0/Script/Phoenician/symbols');
require('unicode-6.2.0/Script/Phoenician/regex');

require('unicode-6.2.0/Script/Rejang/code-points');
require('unicode-6.2.0/Script/Rejang/symbols');
require('unicode-6.2.0/Script/Rejang/regex');

require('unicode-6.2.0/Script/Runic/code-points');
require('unicode-6.2.0/Script/Runic/symbols');
require('unicode-6.2.0/Script/Runic/regex');

require('unicode-6.2.0/Script/Samaritan/code-points');
require('unicode-6.2.0/Script/Samaritan/symbols');
require('unicode-6.2.0/Script/Samaritan/regex');

require('unicode-6.2.0/Script/Saurashtra/code-points');
require('unicode-6.2.0/Script/Saurashtra/symbols');
require('unicode-6.2.0/Script/Saurashtra/regex');

require('unicode-6.2.0/Script/Sharada/code-points');
require('unicode-6.2.0/Script/Sharada/symbols');
require('unicode-6.2.0/Script/Sharada/regex');

require('unicode-6.2.0/Script/Shavian/code-points');
require('unicode-6.2.0/Script/Shavian/symbols');
require('unicode-6.2.0/Script/Shavian/regex');

require('unicode-6.2.0/Script/Sinhala/code-points');
require('unicode-6.2.0/Script/Sinhala/symbols');
require('unicode-6.2.0/Script/Sinhala/regex');

require('unicode-6.2.0/Script/Sora_Sompeng/code-points');
require('unicode-6.2.0/Script/Sora_Sompeng/symbols');
require('unicode-6.2.0/Script/Sora_Sompeng/regex');

require('unicode-6.2.0/Script/Sundanese/code-points');
require('unicode-6.2.0/Script/Sundanese/symbols');
require('unicode-6.2.0/Script/Sundanese/regex');

require('unicode-6.2.0/Script/Syloti_Nagri/code-points');
require('unicode-6.2.0/Script/Syloti_Nagri/symbols');
require('unicode-6.2.0/Script/Syloti_Nagri/regex');

require('unicode-6.2.0/Script/Syriac/code-points');
require('unicode-6.2.0/Script/Syriac/symbols');
require('unicode-6.2.0/Script/Syriac/regex');

require('unicode-6.2.0/Script/Tagalog/code-points');
require('unicode-6.2.0/Script/Tagalog/symbols');
require('unicode-6.2.0/Script/Tagalog/regex');

require('unicode-6.2.0/Script/Tagbanwa/code-points');
require('unicode-6.2.0/Script/Tagbanwa/symbols');
require('unicode-6.2.0/Script/Tagbanwa/regex');

require('unicode-6.2.0/Script/Tai_Le/code-points');
require('unicode-6.2.0/Script/Tai_Le/symbols');
require('unicode-6.2.0/Script/Tai_Le/regex');

require('unicode-6.2.0/Script/Tai_Tham/code-points');
require('unicode-6.2.0/Script/Tai_Tham/symbols');
require('unicode-6.2.0/Script/Tai_Tham/regex');

require('unicode-6.2.0/Script/Tai_Viet/code-points');
require('unicode-6.2.0/Script/Tai_Viet/symbols');
require('unicode-6.2.0/Script/Tai_Viet/regex');

require('unicode-6.2.0/Script/Takri/code-points');
require('unicode-6.2.0/Script/Takri/symbols');
require('unicode-6.2.0/Script/Takri/regex');

require('unicode-6.2.0/Script/Tamil/code-points');
require('unicode-6.2.0/Script/Tamil/symbols');
require('unicode-6.2.0/Script/Tamil/regex');

require('unicode-6.2.0/Script/Telugu/code-points');
require('unicode-6.2.0/Script/Telugu/symbols');
require('unicode-6.2.0/Script/Telugu/regex');

require('unicode-6.2.0/Script/Thaana/code-points');
require('unicode-6.2.0/Script/Thaana/symbols');
require('unicode-6.2.0/Script/Thaana/regex');

require('unicode-6.2.0/Script/Thai/code-points');
require('unicode-6.2.0/Script/Thai/symbols');
require('unicode-6.2.0/Script/Thai/regex');

require('unicode-6.2.0/Script/Tibetan/code-points');
require('unicode-6.2.0/Script/Tibetan/symbols');
require('unicode-6.2.0/Script/Tibetan/regex');

require('unicode-6.2.0/Script/Tifinagh/code-points');
require('unicode-6.2.0/Script/Tifinagh/symbols');
require('unicode-6.2.0/Script/Tifinagh/regex');

require('unicode-6.2.0/Script/Ugaritic/code-points');
require('unicode-6.2.0/Script/Ugaritic/symbols');
require('unicode-6.2.0/Script/Ugaritic/regex');

require('unicode-6.2.0/Script/Vai/code-points');
require('unicode-6.2.0/Script/Vai/symbols');
require('unicode-6.2.0/Script/Vai/regex');

require('unicode-6.2.0/Script/Yi/code-points');
require('unicode-6.2.0/Script/Yi/symbols');
require('unicode-6.2.0/Script/Yi/regex');

// `Script_Extensions`:

require('unicode-6.2.0/Script_Extensions/Arabic/code-points');
require('unicode-6.2.0/Script_Extensions/Arabic/symbols');
require('unicode-6.2.0/Script_Extensions/Arabic/regex');

require('unicode-6.2.0/Script_Extensions/Armenian/code-points');
require('unicode-6.2.0/Script_Extensions/Armenian/symbols');
require('unicode-6.2.0/Script_Extensions/Armenian/regex');

require('unicode-6.2.0/Script_Extensions/Avestan/code-points');
require('unicode-6.2.0/Script_Extensions/Avestan/symbols');
require('unicode-6.2.0/Script_Extensions/Avestan/regex');

require('unicode-6.2.0/Script_Extensions/Balinese/code-points');
require('unicode-6.2.0/Script_Extensions/Balinese/symbols');
require('unicode-6.2.0/Script_Extensions/Balinese/regex');

require('unicode-6.2.0/Script_Extensions/Bamum/code-points');
require('unicode-6.2.0/Script_Extensions/Bamum/symbols');
require('unicode-6.2.0/Script_Extensions/Bamum/regex');

require('unicode-6.2.0/Script_Extensions/Batak/code-points');
require('unicode-6.2.0/Script_Extensions/Batak/symbols');
require('unicode-6.2.0/Script_Extensions/Batak/regex');

require('unicode-6.2.0/Script_Extensions/Bengali/code-points');
require('unicode-6.2.0/Script_Extensions/Bengali/symbols');
require('unicode-6.2.0/Script_Extensions/Bengali/regex');

require('unicode-6.2.0/Script_Extensions/Bopomofo/code-points');
require('unicode-6.2.0/Script_Extensions/Bopomofo/symbols');
require('unicode-6.2.0/Script_Extensions/Bopomofo/regex');

require('unicode-6.2.0/Script_Extensions/Brahmi/code-points');
require('unicode-6.2.0/Script_Extensions/Brahmi/symbols');
require('unicode-6.2.0/Script_Extensions/Brahmi/regex');

require('unicode-6.2.0/Script_Extensions/Braille/code-points');
require('unicode-6.2.0/Script_Extensions/Braille/symbols');
require('unicode-6.2.0/Script_Extensions/Braille/regex');

require('unicode-6.2.0/Script_Extensions/Buginese/code-points');
require('unicode-6.2.0/Script_Extensions/Buginese/symbols');
require('unicode-6.2.0/Script_Extensions/Buginese/regex');

require('unicode-6.2.0/Script_Extensions/Buhid/code-points');
require('unicode-6.2.0/Script_Extensions/Buhid/symbols');
require('unicode-6.2.0/Script_Extensions/Buhid/regex');

require('unicode-6.2.0/Script_Extensions/Canadian_Aboriginal/code-points');
require('unicode-6.2.0/Script_Extensions/Canadian_Aboriginal/symbols');
require('unicode-6.2.0/Script_Extensions/Canadian_Aboriginal/regex');

require('unicode-6.2.0/Script_Extensions/Carian/code-points');
require('unicode-6.2.0/Script_Extensions/Carian/symbols');
require('unicode-6.2.0/Script_Extensions/Carian/regex');

require('unicode-6.2.0/Script_Extensions/Chakma/code-points');
require('unicode-6.2.0/Script_Extensions/Chakma/symbols');
require('unicode-6.2.0/Script_Extensions/Chakma/regex');

require('unicode-6.2.0/Script_Extensions/Cham/code-points');
require('unicode-6.2.0/Script_Extensions/Cham/symbols');
require('unicode-6.2.0/Script_Extensions/Cham/regex');

require('unicode-6.2.0/Script_Extensions/Cherokee/code-points');
require('unicode-6.2.0/Script_Extensions/Cherokee/symbols');
require('unicode-6.2.0/Script_Extensions/Cherokee/regex');

require('unicode-6.2.0/Script_Extensions/Common/code-points');
require('unicode-6.2.0/Script_Extensions/Common/symbols');
require('unicode-6.2.0/Script_Extensions/Common/regex');

require('unicode-6.2.0/Script_Extensions/Coptic/code-points');
require('unicode-6.2.0/Script_Extensions/Coptic/symbols');
require('unicode-6.2.0/Script_Extensions/Coptic/regex');

require('unicode-6.2.0/Script_Extensions/Cuneiform/code-points');
require('unicode-6.2.0/Script_Extensions/Cuneiform/symbols');
require('unicode-6.2.0/Script_Extensions/Cuneiform/regex');

require('unicode-6.2.0/Script_Extensions/Cypriot/code-points');
require('unicode-6.2.0/Script_Extensions/Cypriot/symbols');
require('unicode-6.2.0/Script_Extensions/Cypriot/regex');

require('unicode-6.2.0/Script_Extensions/Cyrillic/code-points');
require('unicode-6.2.0/Script_Extensions/Cyrillic/symbols');
require('unicode-6.2.0/Script_Extensions/Cyrillic/regex');

require('unicode-6.2.0/Script_Extensions/Deseret/code-points');
require('unicode-6.2.0/Script_Extensions/Deseret/symbols');
require('unicode-6.2.0/Script_Extensions/Deseret/regex');

require('unicode-6.2.0/Script_Extensions/Devanagari/code-points');
require('unicode-6.2.0/Script_Extensions/Devanagari/symbols');
require('unicode-6.2.0/Script_Extensions/Devanagari/regex');

require('unicode-6.2.0/Script_Extensions/Egyptian_Hieroglyphs/code-points');
require('unicode-6.2.0/Script_Extensions/Egyptian_Hieroglyphs/symbols');
require('unicode-6.2.0/Script_Extensions/Egyptian_Hieroglyphs/regex');

require('unicode-6.2.0/Script_Extensions/Ethiopic/code-points');
require('unicode-6.2.0/Script_Extensions/Ethiopic/symbols');
require('unicode-6.2.0/Script_Extensions/Ethiopic/regex');

require('unicode-6.2.0/Script_Extensions/Georgian/code-points');
require('unicode-6.2.0/Script_Extensions/Georgian/symbols');
require('unicode-6.2.0/Script_Extensions/Georgian/regex');

require('unicode-6.2.0/Script_Extensions/Glagolitic/code-points');
require('unicode-6.2.0/Script_Extensions/Glagolitic/symbols');
require('unicode-6.2.0/Script_Extensions/Glagolitic/regex');

require('unicode-6.2.0/Script_Extensions/Gothic/code-points');
require('unicode-6.2.0/Script_Extensions/Gothic/symbols');
require('unicode-6.2.0/Script_Extensions/Gothic/regex');

require('unicode-6.2.0/Script_Extensions/Greek/code-points');
require('unicode-6.2.0/Script_Extensions/Greek/symbols');
require('unicode-6.2.0/Script_Extensions/Greek/regex');

require('unicode-6.2.0/Script_Extensions/Gujarati/code-points');
require('unicode-6.2.0/Script_Extensions/Gujarati/symbols');
require('unicode-6.2.0/Script_Extensions/Gujarati/regex');

require('unicode-6.2.0/Script_Extensions/Gurmukhi/code-points');
require('unicode-6.2.0/Script_Extensions/Gurmukhi/symbols');
require('unicode-6.2.0/Script_Extensions/Gurmukhi/regex');

require('unicode-6.2.0/Script_Extensions/Han/code-points');
require('unicode-6.2.0/Script_Extensions/Han/symbols');
require('unicode-6.2.0/Script_Extensions/Han/regex');

require('unicode-6.2.0/Script_Extensions/Hangul/code-points');
require('unicode-6.2.0/Script_Extensions/Hangul/symbols');
require('unicode-6.2.0/Script_Extensions/Hangul/regex');

require('unicode-6.2.0/Script_Extensions/Hanunoo/code-points');
require('unicode-6.2.0/Script_Extensions/Hanunoo/symbols');
require('unicode-6.2.0/Script_Extensions/Hanunoo/regex');

require('unicode-6.2.0/Script_Extensions/Hebrew/code-points');
require('unicode-6.2.0/Script_Extensions/Hebrew/symbols');
require('unicode-6.2.0/Script_Extensions/Hebrew/regex');

require('unicode-6.2.0/Script_Extensions/Hiragana/code-points');
require('unicode-6.2.0/Script_Extensions/Hiragana/symbols');
require('unicode-6.2.0/Script_Extensions/Hiragana/regex');

require('unicode-6.2.0/Script_Extensions/Imperial_Aramaic/code-points');
require('unicode-6.2.0/Script_Extensions/Imperial_Aramaic/symbols');
require('unicode-6.2.0/Script_Extensions/Imperial_Aramaic/regex');

require('unicode-6.2.0/Script_Extensions/Inherited/code-points');
require('unicode-6.2.0/Script_Extensions/Inherited/symbols');
require('unicode-6.2.0/Script_Extensions/Inherited/regex');

require('unicode-6.2.0/Script_Extensions/Inscriptional_Pahlavi/code-points');
require('unicode-6.2.0/Script_Extensions/Inscriptional_Pahlavi/symbols');
require('unicode-6.2.0/Script_Extensions/Inscriptional_Pahlavi/regex');

require('unicode-6.2.0/Script_Extensions/Inscriptional_Parthian/code-points');
require('unicode-6.2.0/Script_Extensions/Inscriptional_Parthian/symbols');
require('unicode-6.2.0/Script_Extensions/Inscriptional_Parthian/regex');

require('unicode-6.2.0/Script_Extensions/Javanese/code-points');
require('unicode-6.2.0/Script_Extensions/Javanese/symbols');
require('unicode-6.2.0/Script_Extensions/Javanese/regex');

require('unicode-6.2.0/Script_Extensions/Kaithi/code-points');
require('unicode-6.2.0/Script_Extensions/Kaithi/symbols');
require('unicode-6.2.0/Script_Extensions/Kaithi/regex');

require('unicode-6.2.0/Script_Extensions/Kannada/code-points');
require('unicode-6.2.0/Script_Extensions/Kannada/symbols');
require('unicode-6.2.0/Script_Extensions/Kannada/regex');

require('unicode-6.2.0/Script_Extensions/Katakana/code-points');
require('unicode-6.2.0/Script_Extensions/Katakana/symbols');
require('unicode-6.2.0/Script_Extensions/Katakana/regex');

require('unicode-6.2.0/Script_Extensions/Kayah_Li/code-points');
require('unicode-6.2.0/Script_Extensions/Kayah_Li/symbols');
require('unicode-6.2.0/Script_Extensions/Kayah_Li/regex');

require('unicode-6.2.0/Script_Extensions/Kharoshthi/code-points');
require('unicode-6.2.0/Script_Extensions/Kharoshthi/symbols');
require('unicode-6.2.0/Script_Extensions/Kharoshthi/regex');

require('unicode-6.2.0/Script_Extensions/Khmer/code-points');
require('unicode-6.2.0/Script_Extensions/Khmer/symbols');
require('unicode-6.2.0/Script_Extensions/Khmer/regex');

require('unicode-6.2.0/Script_Extensions/Lao/code-points');
require('unicode-6.2.0/Script_Extensions/Lao/symbols');
require('unicode-6.2.0/Script_Extensions/Lao/regex');

require('unicode-6.2.0/Script_Extensions/Latin/code-points');
require('unicode-6.2.0/Script_Extensions/Latin/symbols');
require('unicode-6.2.0/Script_Extensions/Latin/regex');

require('unicode-6.2.0/Script_Extensions/Lepcha/code-points');
require('unicode-6.2.0/Script_Extensions/Lepcha/symbols');
require('unicode-6.2.0/Script_Extensions/Lepcha/regex');

require('unicode-6.2.0/Script_Extensions/Limbu/code-points');
require('unicode-6.2.0/Script_Extensions/Limbu/symbols');
require('unicode-6.2.0/Script_Extensions/Limbu/regex');

require('unicode-6.2.0/Script_Extensions/Linear_B/code-points');
require('unicode-6.2.0/Script_Extensions/Linear_B/symbols');
require('unicode-6.2.0/Script_Extensions/Linear_B/regex');

require('unicode-6.2.0/Script_Extensions/Lisu/code-points');
require('unicode-6.2.0/Script_Extensions/Lisu/symbols');
require('unicode-6.2.0/Script_Extensions/Lisu/regex');

require('unicode-6.2.0/Script_Extensions/Lycian/code-points');
require('unicode-6.2.0/Script_Extensions/Lycian/symbols');
require('unicode-6.2.0/Script_Extensions/Lycian/regex');

require('unicode-6.2.0/Script_Extensions/Lydian/code-points');
require('unicode-6.2.0/Script_Extensions/Lydian/symbols');
require('unicode-6.2.0/Script_Extensions/Lydian/regex');

require('unicode-6.2.0/Script_Extensions/Malayalam/code-points');
require('unicode-6.2.0/Script_Extensions/Malayalam/symbols');
require('unicode-6.2.0/Script_Extensions/Malayalam/regex');

require('unicode-6.2.0/Script_Extensions/Mandaic/code-points');
require('unicode-6.2.0/Script_Extensions/Mandaic/symbols');
require('unicode-6.2.0/Script_Extensions/Mandaic/regex');

require('unicode-6.2.0/Script_Extensions/Meetei_Mayek/code-points');
require('unicode-6.2.0/Script_Extensions/Meetei_Mayek/symbols');
require('unicode-6.2.0/Script_Extensions/Meetei_Mayek/regex');

require('unicode-6.2.0/Script_Extensions/Meroitic_Cursive/code-points');
require('unicode-6.2.0/Script_Extensions/Meroitic_Cursive/symbols');
require('unicode-6.2.0/Script_Extensions/Meroitic_Cursive/regex');

require('unicode-6.2.0/Script_Extensions/Meroitic_Hieroglyphs/code-points');
require('unicode-6.2.0/Script_Extensions/Meroitic_Hieroglyphs/symbols');
require('unicode-6.2.0/Script_Extensions/Meroitic_Hieroglyphs/regex');

require('unicode-6.2.0/Script_Extensions/Miao/code-points');
require('unicode-6.2.0/Script_Extensions/Miao/symbols');
require('unicode-6.2.0/Script_Extensions/Miao/regex');

require('unicode-6.2.0/Script_Extensions/Mongolian/code-points');
require('unicode-6.2.0/Script_Extensions/Mongolian/symbols');
require('unicode-6.2.0/Script_Extensions/Mongolian/regex');

require('unicode-6.2.0/Script_Extensions/Myanmar/code-points');
require('unicode-6.2.0/Script_Extensions/Myanmar/symbols');
require('unicode-6.2.0/Script_Extensions/Myanmar/regex');

require('unicode-6.2.0/Script_Extensions/New_Tai_Lue/code-points');
require('unicode-6.2.0/Script_Extensions/New_Tai_Lue/symbols');
require('unicode-6.2.0/Script_Extensions/New_Tai_Lue/regex');

require('unicode-6.2.0/Script_Extensions/Nko/code-points');
require('unicode-6.2.0/Script_Extensions/Nko/symbols');
require('unicode-6.2.0/Script_Extensions/Nko/regex');

require('unicode-6.2.0/Script_Extensions/Ogham/code-points');
require('unicode-6.2.0/Script_Extensions/Ogham/symbols');
require('unicode-6.2.0/Script_Extensions/Ogham/regex');

require('unicode-6.2.0/Script_Extensions/Ol_Chiki/code-points');
require('unicode-6.2.0/Script_Extensions/Ol_Chiki/symbols');
require('unicode-6.2.0/Script_Extensions/Ol_Chiki/regex');

require('unicode-6.2.0/Script_Extensions/Old_Italic/code-points');
require('unicode-6.2.0/Script_Extensions/Old_Italic/symbols');
require('unicode-6.2.0/Script_Extensions/Old_Italic/regex');

require('unicode-6.2.0/Script_Extensions/Old_Persian/code-points');
require('unicode-6.2.0/Script_Extensions/Old_Persian/symbols');
require('unicode-6.2.0/Script_Extensions/Old_Persian/regex');

require('unicode-6.2.0/Script_Extensions/Old_South_Arabian/code-points');
require('unicode-6.2.0/Script_Extensions/Old_South_Arabian/symbols');
require('unicode-6.2.0/Script_Extensions/Old_South_Arabian/regex');

require('unicode-6.2.0/Script_Extensions/Old_Turkic/code-points');
require('unicode-6.2.0/Script_Extensions/Old_Turkic/symbols');
require('unicode-6.2.0/Script_Extensions/Old_Turkic/regex');

require('unicode-6.2.0/Script_Extensions/Oriya/code-points');
require('unicode-6.2.0/Script_Extensions/Oriya/symbols');
require('unicode-6.2.0/Script_Extensions/Oriya/regex');

require('unicode-6.2.0/Script_Extensions/Osmanya/code-points');
require('unicode-6.2.0/Script_Extensions/Osmanya/symbols');
require('unicode-6.2.0/Script_Extensions/Osmanya/regex');

require('unicode-6.2.0/Script_Extensions/Phags_Pa/code-points');
require('unicode-6.2.0/Script_Extensions/Phags_Pa/symbols');
require('unicode-6.2.0/Script_Extensions/Phags_Pa/regex');

require('unicode-6.2.0/Script_Extensions/Phoenician/code-points');
require('unicode-6.2.0/Script_Extensions/Phoenician/symbols');
require('unicode-6.2.0/Script_Extensions/Phoenician/regex');

require('unicode-6.2.0/Script_Extensions/Rejang/code-points');
require('unicode-6.2.0/Script_Extensions/Rejang/symbols');
require('unicode-6.2.0/Script_Extensions/Rejang/regex');

require('unicode-6.2.0/Script_Extensions/Runic/code-points');
require('unicode-6.2.0/Script_Extensions/Runic/symbols');
require('unicode-6.2.0/Script_Extensions/Runic/regex');

require('unicode-6.2.0/Script_Extensions/Samaritan/code-points');
require('unicode-6.2.0/Script_Extensions/Samaritan/symbols');
require('unicode-6.2.0/Script_Extensions/Samaritan/regex');

require('unicode-6.2.0/Script_Extensions/Saurashtra/code-points');
require('unicode-6.2.0/Script_Extensions/Saurashtra/symbols');
require('unicode-6.2.0/Script_Extensions/Saurashtra/regex');

require('unicode-6.2.0/Script_Extensions/Sharada/code-points');
require('unicode-6.2.0/Script_Extensions/Sharada/symbols');
require('unicode-6.2.0/Script_Extensions/Sharada/regex');

require('unicode-6.2.0/Script_Extensions/Shavian/code-points');
require('unicode-6.2.0/Script_Extensions/Shavian/symbols');
require('unicode-6.2.0/Script_Extensions/Shavian/regex');

require('unicode-6.2.0/Script_Extensions/Sinhala/code-points');
require('unicode-6.2.0/Script_Extensions/Sinhala/symbols');
require('unicode-6.2.0/Script_Extensions/Sinhala/regex');

require('unicode-6.2.0/Script_Extensions/Sora_Sompeng/code-points');
require('unicode-6.2.0/Script_Extensions/Sora_Sompeng/symbols');
require('unicode-6.2.0/Script_Extensions/Sora_Sompeng/regex');

require('unicode-6.2.0/Script_Extensions/Sundanese/code-points');
require('unicode-6.2.0/Script_Extensions/Sundanese/symbols');
require('unicode-6.2.0/Script_Extensions/Sundanese/regex');

require('unicode-6.2.0/Script_Extensions/Syloti_Nagri/code-points');
require('unicode-6.2.0/Script_Extensions/Syloti_Nagri/symbols');
require('unicode-6.2.0/Script_Extensions/Syloti_Nagri/regex');

require('unicode-6.2.0/Script_Extensions/Syriac/code-points');
require('unicode-6.2.0/Script_Extensions/Syriac/symbols');
require('unicode-6.2.0/Script_Extensions/Syriac/regex');

require('unicode-6.2.0/Script_Extensions/Tagalog/code-points');
require('unicode-6.2.0/Script_Extensions/Tagalog/symbols');
require('unicode-6.2.0/Script_Extensions/Tagalog/regex');

require('unicode-6.2.0/Script_Extensions/Tagbanwa/code-points');
require('unicode-6.2.0/Script_Extensions/Tagbanwa/symbols');
require('unicode-6.2.0/Script_Extensions/Tagbanwa/regex');

require('unicode-6.2.0/Script_Extensions/Tai_Le/code-points');
require('unicode-6.2.0/Script_Extensions/Tai_Le/symbols');
require('unicode-6.2.0/Script_Extensions/Tai_Le/regex');

require('unicode-6.2.0/Script_Extensions/Tai_Tham/code-points');
require('unicode-6.2.0/Script_Extensions/Tai_Tham/symbols');
require('unicode-6.2.0/Script_Extensions/Tai_Tham/regex');

require('unicode-6.2.0/Script_Extensions/Tai_Viet/code-points');
require('unicode-6.2.0/Script_Extensions/Tai_Viet/symbols');
require('unicode-6.2.0/Script_Extensions/Tai_Viet/regex');

require('unicode-6.2.0/Script_Extensions/Takri/code-points');
require('unicode-6.2.0/Script_Extensions/Takri/symbols');
require('unicode-6.2.0/Script_Extensions/Takri/regex');

require('unicode-6.2.0/Script_Extensions/Tamil/code-points');
require('unicode-6.2.0/Script_Extensions/Tamil/symbols');
require('unicode-6.2.0/Script_Extensions/Tamil/regex');

require('unicode-6.2.0/Script_Extensions/Telugu/code-points');
require('unicode-6.2.0/Script_Extensions/Telugu/symbols');
require('unicode-6.2.0/Script_Extensions/Telugu/regex');

require('unicode-6.2.0/Script_Extensions/Thaana/code-points');
require('unicode-6.2.0/Script_Extensions/Thaana/symbols');
require('unicode-6.2.0/Script_Extensions/Thaana/regex');

require('unicode-6.2.0/Script_Extensions/Thai/code-points');
require('unicode-6.2.0/Script_Extensions/Thai/symbols');
require('unicode-6.2.0/Script_Extensions/Thai/regex');

require('unicode-6.2.0/Script_Extensions/Tibetan/code-points');
require('unicode-6.2.0/Script_Extensions/Tibetan/symbols');
require('unicode-6.2.0/Script_Extensions/Tibetan/regex');

require('unicode-6.2.0/Script_Extensions/Tifinagh/code-points');
require('unicode-6.2.0/Script_Extensions/Tifinagh/symbols');
require('unicode-6.2.0/Script_Extensions/Tifinagh/regex');

require('unicode-6.2.0/Script_Extensions/Ugaritic/code-points');
require('unicode-6.2.0/Script_Extensions/Ugaritic/symbols');
require('unicode-6.2.0/Script_Extensions/Ugaritic/regex');

require('unicode-6.2.0/Script_Extensions/Vai/code-points');
require('unicode-6.2.0/Script_Extensions/Vai/symbols');
require('unicode-6.2.0/Script_Extensions/Vai/regex');

require('unicode-6.2.0/Script_Extensions/Yi/code-points');
require('unicode-6.2.0/Script_Extensions/Yi/symbols');
require('unicode-6.2.0/Script_Extensions/Yi/regex');

// `Case_Folding`:

require('unicode-6.2.0/Case_Folding/C/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/Case_Folding/C/code-points').get(codePoint);
require('unicode-6.2.0/Case_Folding/C/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/Case_Folding/C/symbols').get(symbol);

require('unicode-6.2.0/Case_Folding/F/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/Case_Folding/F/code-points').get(codePoint);
require('unicode-6.2.0/Case_Folding/F/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/Case_Folding/F/symbols').get(symbol);

require('unicode-6.2.0/Case_Folding/S/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/Case_Folding/S/code-points').get(codePoint);
require('unicode-6.2.0/Case_Folding/S/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/Case_Folding/S/symbols').get(symbol);

require('unicode-6.2.0/Case_Folding/T/code-points'); // lookup map from code point to code point
require('unicode-6.2.0/Case_Folding/T/code-points').get(codePoint);
require('unicode-6.2.0/Case_Folding/T/symbols'); // lookup map from symbol to symbol
require('unicode-6.2.0/Case_Folding/T/symbols').get(symbol);

// `Block`:

require('unicode-6.2.0/Block/Aegean_Numbers/code-points');
require('unicode-6.2.0/Block/Aegean_Numbers/symbols');
require('unicode-6.2.0/Block/Aegean_Numbers/regex');

require('unicode-6.2.0/Block/Alchemical_Symbols/code-points');
require('unicode-6.2.0/Block/Alchemical_Symbols/symbols');
require('unicode-6.2.0/Block/Alchemical_Symbols/regex');

require('unicode-6.2.0/Block/Alphabetic_Presentation_Forms/code-points');
require('unicode-6.2.0/Block/Alphabetic_Presentation_Forms/symbols');
require('unicode-6.2.0/Block/Alphabetic_Presentation_Forms/regex');

require('unicode-6.2.0/Block/Ancient_Greek_Musical_Notation/code-points');
require('unicode-6.2.0/Block/Ancient_Greek_Musical_Notation/symbols');
require('unicode-6.2.0/Block/Ancient_Greek_Musical_Notation/regex');

require('unicode-6.2.0/Block/Ancient_Greek_Numbers/code-points');
require('unicode-6.2.0/Block/Ancient_Greek_Numbers/symbols');
require('unicode-6.2.0/Block/Ancient_Greek_Numbers/regex');

require('unicode-6.2.0/Block/Ancient_Symbols/code-points');
require('unicode-6.2.0/Block/Ancient_Symbols/symbols');
require('unicode-6.2.0/Block/Ancient_Symbols/regex');

require('unicode-6.2.0/Block/Arabic/code-points');
require('unicode-6.2.0/Block/Arabic/symbols');
require('unicode-6.2.0/Block/Arabic/regex');

require('unicode-6.2.0/Block/Arabic_Extended_A/code-points');
require('unicode-6.2.0/Block/Arabic_Extended_A/symbols');
require('unicode-6.2.0/Block/Arabic_Extended_A/regex');

require('unicode-6.2.0/Block/Arabic_Mathematical_Alphabetic_Symbols/code-points');
require('unicode-6.2.0/Block/Arabic_Mathematical_Alphabetic_Symbols/symbols');
require('unicode-6.2.0/Block/Arabic_Mathematical_Alphabetic_Symbols/regex');

require('unicode-6.2.0/Block/Arabic_Presentation_Forms_A/code-points');
require('unicode-6.2.0/Block/Arabic_Presentation_Forms_A/symbols');
require('unicode-6.2.0/Block/Arabic_Presentation_Forms_A/regex');

require('unicode-6.2.0/Block/Arabic_Presentation_Forms_B/code-points');
require('unicode-6.2.0/Block/Arabic_Presentation_Forms_B/symbols');
require('unicode-6.2.0/Block/Arabic_Presentation_Forms_B/regex');

require('unicode-6.2.0/Block/Arabic_Supplement/code-points');
require('unicode-6.2.0/Block/Arabic_Supplement/symbols');
require('unicode-6.2.0/Block/Arabic_Supplement/regex');

require('unicode-6.2.0/Block/Armenian/code-points');
require('unicode-6.2.0/Block/Armenian/symbols');
require('unicode-6.2.0/Block/Armenian/regex');

require('unicode-6.2.0/Block/Arrows/code-points');
require('unicode-6.2.0/Block/Arrows/symbols');
require('unicode-6.2.0/Block/Arrows/regex');

require('unicode-6.2.0/Block/Avestan/code-points');
require('unicode-6.2.0/Block/Avestan/symbols');
require('unicode-6.2.0/Block/Avestan/regex');

require('unicode-6.2.0/Block/Balinese/code-points');
require('unicode-6.2.0/Block/Balinese/symbols');
require('unicode-6.2.0/Block/Balinese/regex');

require('unicode-6.2.0/Block/Bamum/code-points');
require('unicode-6.2.0/Block/Bamum/symbols');
require('unicode-6.2.0/Block/Bamum/regex');

require('unicode-6.2.0/Block/Bamum_Supplement/code-points');
require('unicode-6.2.0/Block/Bamum_Supplement/symbols');
require('unicode-6.2.0/Block/Bamum_Supplement/regex');

require('unicode-6.2.0/Block/Basic_Latin/code-points');
require('unicode-6.2.0/Block/Basic_Latin/symbols');
require('unicode-6.2.0/Block/Basic_Latin/regex');

require('unicode-6.2.0/Block/Batak/code-points');
require('unicode-6.2.0/Block/Batak/symbols');
require('unicode-6.2.0/Block/Batak/regex');

require('unicode-6.2.0/Block/Bengali/code-points');
require('unicode-6.2.0/Block/Bengali/symbols');
require('unicode-6.2.0/Block/Bengali/regex');

require('unicode-6.2.0/Block/Block_Elements/code-points');
require('unicode-6.2.0/Block/Block_Elements/symbols');
require('unicode-6.2.0/Block/Block_Elements/regex');

require('unicode-6.2.0/Block/Bopomofo/code-points');
require('unicode-6.2.0/Block/Bopomofo/symbols');
require('unicode-6.2.0/Block/Bopomofo/regex');

require('unicode-6.2.0/Block/Bopomofo_Extended/code-points');
require('unicode-6.2.0/Block/Bopomofo_Extended/symbols');
require('unicode-6.2.0/Block/Bopomofo_Extended/regex');

require('unicode-6.2.0/Block/Box_Drawing/code-points');
require('unicode-6.2.0/Block/Box_Drawing/symbols');
require('unicode-6.2.0/Block/Box_Drawing/regex');

require('unicode-6.2.0/Block/Brahmi/code-points');
require('unicode-6.2.0/Block/Brahmi/symbols');
require('unicode-6.2.0/Block/Brahmi/regex');

require('unicode-6.2.0/Block/Braille_Patterns/code-points');
require('unicode-6.2.0/Block/Braille_Patterns/symbols');
require('unicode-6.2.0/Block/Braille_Patterns/regex');

require('unicode-6.2.0/Block/Buginese/code-points');
require('unicode-6.2.0/Block/Buginese/symbols');
require('unicode-6.2.0/Block/Buginese/regex');

require('unicode-6.2.0/Block/Buhid/code-points');
require('unicode-6.2.0/Block/Buhid/symbols');
require('unicode-6.2.0/Block/Buhid/regex');

require('unicode-6.2.0/Block/Byzantine_Musical_Symbols/code-points');
require('unicode-6.2.0/Block/Byzantine_Musical_Symbols/symbols');
require('unicode-6.2.0/Block/Byzantine_Musical_Symbols/regex');

require('unicode-6.2.0/Block/CJK_Compatibility/code-points');
require('unicode-6.2.0/Block/CJK_Compatibility/symbols');
require('unicode-6.2.0/Block/CJK_Compatibility/regex');

require('unicode-6.2.0/Block/CJK_Compatibility_Forms/code-points');
require('unicode-6.2.0/Block/CJK_Compatibility_Forms/symbols');
require('unicode-6.2.0/Block/CJK_Compatibility_Forms/regex');

require('unicode-6.2.0/Block/CJK_Compatibility_Ideographs/code-points');
require('unicode-6.2.0/Block/CJK_Compatibility_Ideographs/symbols');
require('unicode-6.2.0/Block/CJK_Compatibility_Ideographs/regex');

require('unicode-6.2.0/Block/CJK_Compatibility_Ideographs_Supplement/code-points');
require('unicode-6.2.0/Block/CJK_Compatibility_Ideographs_Supplement/symbols');
require('unicode-6.2.0/Block/CJK_Compatibility_Ideographs_Supplement/regex');

require('unicode-6.2.0/Block/CJK_Radicals_Supplement/code-points');
require('unicode-6.2.0/Block/CJK_Radicals_Supplement/symbols');
require('unicode-6.2.0/Block/CJK_Radicals_Supplement/regex');

require('unicode-6.2.0/Block/CJK_Strokes/code-points');
require('unicode-6.2.0/Block/CJK_Strokes/symbols');
require('unicode-6.2.0/Block/CJK_Strokes/regex');

require('unicode-6.2.0/Block/CJK_Symbols_And_Punctuation/code-points');
require('unicode-6.2.0/Block/CJK_Symbols_And_Punctuation/symbols');
require('unicode-6.2.0/Block/CJK_Symbols_And_Punctuation/regex');

require('unicode-6.2.0/Block/CJK_Unified_Ideographs/code-points');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs/symbols');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs/regex');

require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_A/code-points');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_A/symbols');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_A/regex');

require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_B/code-points');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_B/symbols');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_B/regex');

require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_C/code-points');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_C/symbols');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_C/regex');

require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_D/code-points');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_D/symbols');
require('unicode-6.2.0/Block/CJK_Unified_Ideographs_Extension_D/regex');

require('unicode-6.2.0/Block/Carian/code-points');
require('unicode-6.2.0/Block/Carian/symbols');
require('unicode-6.2.0/Block/Carian/regex');

require('unicode-6.2.0/Block/Chakma/code-points');
require('unicode-6.2.0/Block/Chakma/symbols');
require('unicode-6.2.0/Block/Chakma/regex');

require('unicode-6.2.0/Block/Cham/code-points');
require('unicode-6.2.0/Block/Cham/symbols');
require('unicode-6.2.0/Block/Cham/regex');

require('unicode-6.2.0/Block/Cherokee/code-points');
require('unicode-6.2.0/Block/Cherokee/symbols');
require('unicode-6.2.0/Block/Cherokee/regex');

require('unicode-6.2.0/Block/Combining_Diacritical_Marks/code-points');
require('unicode-6.2.0/Block/Combining_Diacritical_Marks/symbols');
require('unicode-6.2.0/Block/Combining_Diacritical_Marks/regex');

require('unicode-6.2.0/Block/Combining_Diacritical_Marks_For_Symbols/code-points');
require('unicode-6.2.0/Block/Combining_Diacritical_Marks_For_Symbols/symbols');
require('unicode-6.2.0/Block/Combining_Diacritical_Marks_For_Symbols/regex');

require('unicode-6.2.0/Block/Combining_Diacritical_Marks_Supplement/code-points');
require('unicode-6.2.0/Block/Combining_Diacritical_Marks_Supplement/symbols');
require('unicode-6.2.0/Block/Combining_Diacritical_Marks_Supplement/regex');

require('unicode-6.2.0/Block/Combining_Half_Marks/code-points');
require('unicode-6.2.0/Block/Combining_Half_Marks/symbols');
require('unicode-6.2.0/Block/Combining_Half_Marks/regex');

require('unicode-6.2.0/Block/Common_Indic_Number_Forms/code-points');
require('unicode-6.2.0/Block/Common_Indic_Number_Forms/symbols');
require('unicode-6.2.0/Block/Common_Indic_Number_Forms/regex');

require('unicode-6.2.0/Block/Control_Pictures/code-points');
require('unicode-6.2.0/Block/Control_Pictures/symbols');
require('unicode-6.2.0/Block/Control_Pictures/regex');

require('unicode-6.2.0/Block/Coptic/code-points');
require('unicode-6.2.0/Block/Coptic/symbols');
require('unicode-6.2.0/Block/Coptic/regex');

require('unicode-6.2.0/Block/Counting_Rod_Numerals/code-points');
require('unicode-6.2.0/Block/Counting_Rod_Numerals/symbols');
require('unicode-6.2.0/Block/Counting_Rod_Numerals/regex');

require('unicode-6.2.0/Block/Cuneiform/code-points');
require('unicode-6.2.0/Block/Cuneiform/symbols');
require('unicode-6.2.0/Block/Cuneiform/regex');

require('unicode-6.2.0/Block/Cuneiform_Numbers_And_Punctuation/code-points');
require('unicode-6.2.0/Block/Cuneiform_Numbers_And_Punctuation/symbols');
require('unicode-6.2.0/Block/Cuneiform_Numbers_And_Punctuation/regex');

require('unicode-6.2.0/Block/Currency_Symbols/code-points');
require('unicode-6.2.0/Block/Currency_Symbols/symbols');
require('unicode-6.2.0/Block/Currency_Symbols/regex');

require('unicode-6.2.0/Block/Cypriot_Syllabary/code-points');
require('unicode-6.2.0/Block/Cypriot_Syllabary/symbols');
require('unicode-6.2.0/Block/Cypriot_Syllabary/regex');

require('unicode-6.2.0/Block/Cyrillic/code-points');
require('unicode-6.2.0/Block/Cyrillic/symbols');
require('unicode-6.2.0/Block/Cyrillic/regex');

require('unicode-6.2.0/Block/Cyrillic_Extended_A/code-points');
require('unicode-6.2.0/Block/Cyrillic_Extended_A/symbols');
require('unicode-6.2.0/Block/Cyrillic_Extended_A/regex');

require('unicode-6.2.0/Block/Cyrillic_Extended_B/code-points');
require('unicode-6.2.0/Block/Cyrillic_Extended_B/symbols');
require('unicode-6.2.0/Block/Cyrillic_Extended_B/regex');

require('unicode-6.2.0/Block/Cyrillic_Supplement/code-points');
require('unicode-6.2.0/Block/Cyrillic_Supplement/symbols');
require('unicode-6.2.0/Block/Cyrillic_Supplement/regex');

require('unicode-6.2.0/Block/Deseret/code-points');
require('unicode-6.2.0/Block/Deseret/symbols');
require('unicode-6.2.0/Block/Deseret/regex');

require('unicode-6.2.0/Block/Devanagari/code-points');
require('unicode-6.2.0/Block/Devanagari/symbols');
require('unicode-6.2.0/Block/Devanagari/regex');

require('unicode-6.2.0/Block/Devanagari_Extended/code-points');
require('unicode-6.2.0/Block/Devanagari_Extended/symbols');
require('unicode-6.2.0/Block/Devanagari_Extended/regex');

require('unicode-6.2.0/Block/Dingbats/code-points');
require('unicode-6.2.0/Block/Dingbats/symbols');
require('unicode-6.2.0/Block/Dingbats/regex');

require('unicode-6.2.0/Block/Domino_Tiles/code-points');
require('unicode-6.2.0/Block/Domino_Tiles/symbols');
require('unicode-6.2.0/Block/Domino_Tiles/regex');

require('unicode-6.2.0/Block/Egyptian_Hieroglyphs/code-points');
require('unicode-6.2.0/Block/Egyptian_Hieroglyphs/symbols');
require('unicode-6.2.0/Block/Egyptian_Hieroglyphs/regex');

require('unicode-6.2.0/Block/Emoticons/code-points');
require('unicode-6.2.0/Block/Emoticons/symbols');
require('unicode-6.2.0/Block/Emoticons/regex');

require('unicode-6.2.0/Block/Enclosed_Alphanumeric_Supplement/code-points');
require('unicode-6.2.0/Block/Enclosed_Alphanumeric_Supplement/symbols');
require('unicode-6.2.0/Block/Enclosed_Alphanumeric_Supplement/regex');

require('unicode-6.2.0/Block/Enclosed_Alphanumerics/code-points');
require('unicode-6.2.0/Block/Enclosed_Alphanumerics/symbols');
require('unicode-6.2.0/Block/Enclosed_Alphanumerics/regex');

require('unicode-6.2.0/Block/Enclosed_CJK_Letters_And_Months/code-points');
require('unicode-6.2.0/Block/Enclosed_CJK_Letters_And_Months/symbols');
require('unicode-6.2.0/Block/Enclosed_CJK_Letters_And_Months/regex');

require('unicode-6.2.0/Block/Enclosed_Ideographic_Supplement/code-points');
require('unicode-6.2.0/Block/Enclosed_Ideographic_Supplement/symbols');
require('unicode-6.2.0/Block/Enclosed_Ideographic_Supplement/regex');

require('unicode-6.2.0/Block/Ethiopic/code-points');
require('unicode-6.2.0/Block/Ethiopic/symbols');
require('unicode-6.2.0/Block/Ethiopic/regex');

require('unicode-6.2.0/Block/Ethiopic_Extended/code-points');
require('unicode-6.2.0/Block/Ethiopic_Extended/symbols');
require('unicode-6.2.0/Block/Ethiopic_Extended/regex');

require('unicode-6.2.0/Block/Ethiopic_Extended_A/code-points');
require('unicode-6.2.0/Block/Ethiopic_Extended_A/symbols');
require('unicode-6.2.0/Block/Ethiopic_Extended_A/regex');

require('unicode-6.2.0/Block/Ethiopic_Supplement/code-points');
require('unicode-6.2.0/Block/Ethiopic_Supplement/symbols');
require('unicode-6.2.0/Block/Ethiopic_Supplement/regex');

require('unicode-6.2.0/Block/General_Punctuation/code-points');
require('unicode-6.2.0/Block/General_Punctuation/symbols');
require('unicode-6.2.0/Block/General_Punctuation/regex');

require('unicode-6.2.0/Block/Geometric_Shapes/code-points');
require('unicode-6.2.0/Block/Geometric_Shapes/symbols');
require('unicode-6.2.0/Block/Geometric_Shapes/regex');

require('unicode-6.2.0/Block/Georgian/code-points');
require('unicode-6.2.0/Block/Georgian/symbols');
require('unicode-6.2.0/Block/Georgian/regex');

require('unicode-6.2.0/Block/Georgian_Supplement/code-points');
require('unicode-6.2.0/Block/Georgian_Supplement/symbols');
require('unicode-6.2.0/Block/Georgian_Supplement/regex');

require('unicode-6.2.0/Block/Glagolitic/code-points');
require('unicode-6.2.0/Block/Glagolitic/symbols');
require('unicode-6.2.0/Block/Glagolitic/regex');

require('unicode-6.2.0/Block/Gothic/code-points');
require('unicode-6.2.0/Block/Gothic/symbols');
require('unicode-6.2.0/Block/Gothic/regex');

require('unicode-6.2.0/Block/Greek_And_Coptic/code-points');
require('unicode-6.2.0/Block/Greek_And_Coptic/symbols');
require('unicode-6.2.0/Block/Greek_And_Coptic/regex');

require('unicode-6.2.0/Block/Greek_Extended/code-points');
require('unicode-6.2.0/Block/Greek_Extended/symbols');
require('unicode-6.2.0/Block/Greek_Extended/regex');

require('unicode-6.2.0/Block/Gujarati/code-points');
require('unicode-6.2.0/Block/Gujarati/symbols');
require('unicode-6.2.0/Block/Gujarati/regex');

require('unicode-6.2.0/Block/Gurmukhi/code-points');
require('unicode-6.2.0/Block/Gurmukhi/symbols');
require('unicode-6.2.0/Block/Gurmukhi/regex');

require('unicode-6.2.0/Block/Halfwidth_And_Fullwidth_Forms/code-points');
require('unicode-6.2.0/Block/Halfwidth_And_Fullwidth_Forms/symbols');
require('unicode-6.2.0/Block/Halfwidth_And_Fullwidth_Forms/regex');

require('unicode-6.2.0/Block/Hangul_Compatibility_Jamo/code-points');
require('unicode-6.2.0/Block/Hangul_Compatibility_Jamo/symbols');
require('unicode-6.2.0/Block/Hangul_Compatibility_Jamo/regex');

require('unicode-6.2.0/Block/Hangul_Jamo/code-points');
require('unicode-6.2.0/Block/Hangul_Jamo/symbols');
require('unicode-6.2.0/Block/Hangul_Jamo/regex');

require('unicode-6.2.0/Block/Hangul_Jamo_Extended_A/code-points');
require('unicode-6.2.0/Block/Hangul_Jamo_Extended_A/symbols');
require('unicode-6.2.0/Block/Hangul_Jamo_Extended_A/regex');

require('unicode-6.2.0/Block/Hangul_Jamo_Extended_B/code-points');
require('unicode-6.2.0/Block/Hangul_Jamo_Extended_B/symbols');
require('unicode-6.2.0/Block/Hangul_Jamo_Extended_B/regex');

require('unicode-6.2.0/Block/Hangul_Syllables/code-points');
require('unicode-6.2.0/Block/Hangul_Syllables/symbols');
require('unicode-6.2.0/Block/Hangul_Syllables/regex');

require('unicode-6.2.0/Block/Hanunoo/code-points');
require('unicode-6.2.0/Block/Hanunoo/symbols');
require('unicode-6.2.0/Block/Hanunoo/regex');

require('unicode-6.2.0/Block/Hebrew/code-points');
require('unicode-6.2.0/Block/Hebrew/symbols');
require('unicode-6.2.0/Block/Hebrew/regex');

require('unicode-6.2.0/Block/High_Private_Use_Surrogates/code-points');
require('unicode-6.2.0/Block/High_Private_Use_Surrogates/symbols');
require('unicode-6.2.0/Block/High_Private_Use_Surrogates/regex');

require('unicode-6.2.0/Block/High_Surrogates/code-points');
require('unicode-6.2.0/Block/High_Surrogates/symbols');
require('unicode-6.2.0/Block/High_Surrogates/regex');

require('unicode-6.2.0/Block/Hiragana/code-points');
require('unicode-6.2.0/Block/Hiragana/symbols');
require('unicode-6.2.0/Block/Hiragana/regex');

require('unicode-6.2.0/Block/IPA_Extensions/code-points');
require('unicode-6.2.0/Block/IPA_Extensions/symbols');
require('unicode-6.2.0/Block/IPA_Extensions/regex');

require('unicode-6.2.0/Block/Ideographic_Description_Characters/code-points');
require('unicode-6.2.0/Block/Ideographic_Description_Characters/symbols');
require('unicode-6.2.0/Block/Ideographic_Description_Characters/regex');

require('unicode-6.2.0/Block/Imperial_Aramaic/code-points');
require('unicode-6.2.0/Block/Imperial_Aramaic/symbols');
require('unicode-6.2.0/Block/Imperial_Aramaic/regex');

require('unicode-6.2.0/Block/Inscriptional_Pahlavi/code-points');
require('unicode-6.2.0/Block/Inscriptional_Pahlavi/symbols');
require('unicode-6.2.0/Block/Inscriptional_Pahlavi/regex');

require('unicode-6.2.0/Block/Inscriptional_Parthian/code-points');
require('unicode-6.2.0/Block/Inscriptional_Parthian/symbols');
require('unicode-6.2.0/Block/Inscriptional_Parthian/regex');

require('unicode-6.2.0/Block/Javanese/code-points');
require('unicode-6.2.0/Block/Javanese/symbols');
require('unicode-6.2.0/Block/Javanese/regex');

require('unicode-6.2.0/Block/Kaithi/code-points');
require('unicode-6.2.0/Block/Kaithi/symbols');
require('unicode-6.2.0/Block/Kaithi/regex');

require('unicode-6.2.0/Block/Kana_Supplement/code-points');
require('unicode-6.2.0/Block/Kana_Supplement/symbols');
require('unicode-6.2.0/Block/Kana_Supplement/regex');

require('unicode-6.2.0/Block/Kanbun/code-points');
require('unicode-6.2.0/Block/Kanbun/symbols');
require('unicode-6.2.0/Block/Kanbun/regex');

require('unicode-6.2.0/Block/Kangxi_Radicals/code-points');
require('unicode-6.2.0/Block/Kangxi_Radicals/symbols');
require('unicode-6.2.0/Block/Kangxi_Radicals/regex');

require('unicode-6.2.0/Block/Kannada/code-points');
require('unicode-6.2.0/Block/Kannada/symbols');
require('unicode-6.2.0/Block/Kannada/regex');

require('unicode-6.2.0/Block/Katakana/code-points');
require('unicode-6.2.0/Block/Katakana/symbols');
require('unicode-6.2.0/Block/Katakana/regex');

require('unicode-6.2.0/Block/Katakana_Phonetic_Extensions/code-points');
require('unicode-6.2.0/Block/Katakana_Phonetic_Extensions/symbols');
require('unicode-6.2.0/Block/Katakana_Phonetic_Extensions/regex');

require('unicode-6.2.0/Block/Kayah_Li/code-points');
require('unicode-6.2.0/Block/Kayah_Li/symbols');
require('unicode-6.2.0/Block/Kayah_Li/regex');

require('unicode-6.2.0/Block/Kharoshthi/code-points');
require('unicode-6.2.0/Block/Kharoshthi/symbols');
require('unicode-6.2.0/Block/Kharoshthi/regex');

require('unicode-6.2.0/Block/Khmer/code-points');
require('unicode-6.2.0/Block/Khmer/symbols');
require('unicode-6.2.0/Block/Khmer/regex');

require('unicode-6.2.0/Block/Khmer_Symbols/code-points');
require('unicode-6.2.0/Block/Khmer_Symbols/symbols');
require('unicode-6.2.0/Block/Khmer_Symbols/regex');

require('unicode-6.2.0/Block/Lao/code-points');
require('unicode-6.2.0/Block/Lao/symbols');
require('unicode-6.2.0/Block/Lao/regex');

require('unicode-6.2.0/Block/Latin_1_Supplement/code-points');
require('unicode-6.2.0/Block/Latin_1_Supplement/symbols');
require('unicode-6.2.0/Block/Latin_1_Supplement/regex');

require('unicode-6.2.0/Block/Latin_Extended_A/code-points');
require('unicode-6.2.0/Block/Latin_Extended_A/symbols');
require('unicode-6.2.0/Block/Latin_Extended_A/regex');

require('unicode-6.2.0/Block/Latin_Extended_Additional/code-points');
require('unicode-6.2.0/Block/Latin_Extended_Additional/symbols');
require('unicode-6.2.0/Block/Latin_Extended_Additional/regex');

require('unicode-6.2.0/Block/Latin_Extended_B/code-points');
require('unicode-6.2.0/Block/Latin_Extended_B/symbols');
require('unicode-6.2.0/Block/Latin_Extended_B/regex');

require('unicode-6.2.0/Block/Latin_Extended_C/code-points');
require('unicode-6.2.0/Block/Latin_Extended_C/symbols');
require('unicode-6.2.0/Block/Latin_Extended_C/regex');

require('unicode-6.2.0/Block/Latin_Extended_D/code-points');
require('unicode-6.2.0/Block/Latin_Extended_D/symbols');
require('unicode-6.2.0/Block/Latin_Extended_D/regex');

require('unicode-6.2.0/Block/Lepcha/code-points');
require('unicode-6.2.0/Block/Lepcha/symbols');
require('unicode-6.2.0/Block/Lepcha/regex');

require('unicode-6.2.0/Block/Letterlike_Symbols/code-points');
require('unicode-6.2.0/Block/Letterlike_Symbols/symbols');
require('unicode-6.2.0/Block/Letterlike_Symbols/regex');

require('unicode-6.2.0/Block/Limbu/code-points');
require('unicode-6.2.0/Block/Limbu/symbols');
require('unicode-6.2.0/Block/Limbu/regex');

require('unicode-6.2.0/Block/Linear_B_Ideograms/code-points');
require('unicode-6.2.0/Block/Linear_B_Ideograms/symbols');
require('unicode-6.2.0/Block/Linear_B_Ideograms/regex');

require('unicode-6.2.0/Block/Linear_B_Syllabary/code-points');
require('unicode-6.2.0/Block/Linear_B_Syllabary/symbols');
require('unicode-6.2.0/Block/Linear_B_Syllabary/regex');

require('unicode-6.2.0/Block/Lisu/code-points');
require('unicode-6.2.0/Block/Lisu/symbols');
require('unicode-6.2.0/Block/Lisu/regex');

require('unicode-6.2.0/Block/Low_Surrogates/code-points');
require('unicode-6.2.0/Block/Low_Surrogates/symbols');
require('unicode-6.2.0/Block/Low_Surrogates/regex');

require('unicode-6.2.0/Block/Lycian/code-points');
require('unicode-6.2.0/Block/Lycian/symbols');
require('unicode-6.2.0/Block/Lycian/regex');

require('unicode-6.2.0/Block/Lydian/code-points');
require('unicode-6.2.0/Block/Lydian/symbols');
require('unicode-6.2.0/Block/Lydian/regex');

require('unicode-6.2.0/Block/Mahjong_Tiles/code-points');
require('unicode-6.2.0/Block/Mahjong_Tiles/symbols');
require('unicode-6.2.0/Block/Mahjong_Tiles/regex');

require('unicode-6.2.0/Block/Malayalam/code-points');
require('unicode-6.2.0/Block/Malayalam/symbols');
require('unicode-6.2.0/Block/Malayalam/regex');

require('unicode-6.2.0/Block/Mandaic/code-points');
require('unicode-6.2.0/Block/Mandaic/symbols');
require('unicode-6.2.0/Block/Mandaic/regex');

require('unicode-6.2.0/Block/Mathematical_Alphanumeric_Symbols/code-points');
require('unicode-6.2.0/Block/Mathematical_Alphanumeric_Symbols/symbols');
require('unicode-6.2.0/Block/Mathematical_Alphanumeric_Symbols/regex');

require('unicode-6.2.0/Block/Mathematical_Operators/code-points');
require('unicode-6.2.0/Block/Mathematical_Operators/symbols');
require('unicode-6.2.0/Block/Mathematical_Operators/regex');

require('unicode-6.2.0/Block/Meetei_Mayek/code-points');
require('unicode-6.2.0/Block/Meetei_Mayek/symbols');
require('unicode-6.2.0/Block/Meetei_Mayek/regex');

require('unicode-6.2.0/Block/Meetei_Mayek_Extensions/code-points');
require('unicode-6.2.0/Block/Meetei_Mayek_Extensions/symbols');
require('unicode-6.2.0/Block/Meetei_Mayek_Extensions/regex');

require('unicode-6.2.0/Block/Meroitic_Cursive/code-points');
require('unicode-6.2.0/Block/Meroitic_Cursive/symbols');
require('unicode-6.2.0/Block/Meroitic_Cursive/regex');

require('unicode-6.2.0/Block/Meroitic_Hieroglyphs/code-points');
require('unicode-6.2.0/Block/Meroitic_Hieroglyphs/symbols');
require('unicode-6.2.0/Block/Meroitic_Hieroglyphs/regex');

require('unicode-6.2.0/Block/Miao/code-points');
require('unicode-6.2.0/Block/Miao/symbols');
require('unicode-6.2.0/Block/Miao/regex');

require('unicode-6.2.0/Block/Miscellaneous_Mathematical_Symbols_A/code-points');
require('unicode-6.2.0/Block/Miscellaneous_Mathematical_Symbols_A/symbols');
require('unicode-6.2.0/Block/Miscellaneous_Mathematical_Symbols_A/regex');

require('unicode-6.2.0/Block/Miscellaneous_Mathematical_Symbols_B/code-points');
require('unicode-6.2.0/Block/Miscellaneous_Mathematical_Symbols_B/symbols');
require('unicode-6.2.0/Block/Miscellaneous_Mathematical_Symbols_B/regex');

require('unicode-6.2.0/Block/Miscellaneous_Symbols/code-points');
require('unicode-6.2.0/Block/Miscellaneous_Symbols/symbols');
require('unicode-6.2.0/Block/Miscellaneous_Symbols/regex');

require('unicode-6.2.0/Block/Miscellaneous_Symbols_And_Arrows/code-points');
require('unicode-6.2.0/Block/Miscellaneous_Symbols_And_Arrows/symbols');
require('unicode-6.2.0/Block/Miscellaneous_Symbols_And_Arrows/regex');

require('unicode-6.2.0/Block/Miscellaneous_Symbols_And_Pictographs/code-points');
require('unicode-6.2.0/Block/Miscellaneous_Symbols_And_Pictographs/symbols');
require('unicode-6.2.0/Block/Miscellaneous_Symbols_And_Pictographs/regex');

require('unicode-6.2.0/Block/Miscellaneous_Technical/code-points');
require('unicode-6.2.0/Block/Miscellaneous_Technical/symbols');
require('unicode-6.2.0/Block/Miscellaneous_Technical/regex');

require('unicode-6.2.0/Block/Modifier_Tone_Letters/code-points');
require('unicode-6.2.0/Block/Modifier_Tone_Letters/symbols');
require('unicode-6.2.0/Block/Modifier_Tone_Letters/regex');

require('unicode-6.2.0/Block/Mongolian/code-points');
require('unicode-6.2.0/Block/Mongolian/symbols');
require('unicode-6.2.0/Block/Mongolian/regex');

require('unicode-6.2.0/Block/Musical_Symbols/code-points');
require('unicode-6.2.0/Block/Musical_Symbols/symbols');
require('unicode-6.2.0/Block/Musical_Symbols/regex');

require('unicode-6.2.0/Block/Myanmar/code-points');
require('unicode-6.2.0/Block/Myanmar/symbols');
require('unicode-6.2.0/Block/Myanmar/regex');

require('unicode-6.2.0/Block/Myanmar_Extended_A/code-points');
require('unicode-6.2.0/Block/Myanmar_Extended_A/symbols');
require('unicode-6.2.0/Block/Myanmar_Extended_A/regex');

require('unicode-6.2.0/Block/NKo/code-points');
require('unicode-6.2.0/Block/NKo/symbols');
require('unicode-6.2.0/Block/NKo/regex');

require('unicode-6.2.0/Block/New_Tai_Lue/code-points');
require('unicode-6.2.0/Block/New_Tai_Lue/symbols');
require('unicode-6.2.0/Block/New_Tai_Lue/regex');

require('unicode-6.2.0/Block/Number_Forms/code-points');
require('unicode-6.2.0/Block/Number_Forms/symbols');
require('unicode-6.2.0/Block/Number_Forms/regex');

require('unicode-6.2.0/Block/Ogham/code-points');
require('unicode-6.2.0/Block/Ogham/symbols');
require('unicode-6.2.0/Block/Ogham/regex');

require('unicode-6.2.0/Block/Ol_Chiki/code-points');
require('unicode-6.2.0/Block/Ol_Chiki/symbols');
require('unicode-6.2.0/Block/Ol_Chiki/regex');

require('unicode-6.2.0/Block/Old_Italic/code-points');
require('unicode-6.2.0/Block/Old_Italic/symbols');
require('unicode-6.2.0/Block/Old_Italic/regex');

require('unicode-6.2.0/Block/Old_Persian/code-points');
require('unicode-6.2.0/Block/Old_Persian/symbols');
require('unicode-6.2.0/Block/Old_Persian/regex');

require('unicode-6.2.0/Block/Old_South_Arabian/code-points');
require('unicode-6.2.0/Block/Old_South_Arabian/symbols');
require('unicode-6.2.0/Block/Old_South_Arabian/regex');

require('unicode-6.2.0/Block/Old_Turkic/code-points');
require('unicode-6.2.0/Block/Old_Turkic/symbols');
require('unicode-6.2.0/Block/Old_Turkic/regex');

require('unicode-6.2.0/Block/Optical_Character_Recognition/code-points');
require('unicode-6.2.0/Block/Optical_Character_Recognition/symbols');
require('unicode-6.2.0/Block/Optical_Character_Recognition/regex');

require('unicode-6.2.0/Block/Oriya/code-points');
require('unicode-6.2.0/Block/Oriya/symbols');
require('unicode-6.2.0/Block/Oriya/regex');

require('unicode-6.2.0/Block/Osmanya/code-points');
require('unicode-6.2.0/Block/Osmanya/symbols');
require('unicode-6.2.0/Block/Osmanya/regex');

require('unicode-6.2.0/Block/Phags_Pa/code-points');
require('unicode-6.2.0/Block/Phags_Pa/symbols');
require('unicode-6.2.0/Block/Phags_Pa/regex');

require('unicode-6.2.0/Block/Phaistos_Disc/code-points');
require('unicode-6.2.0/Block/Phaistos_Disc/symbols');
require('unicode-6.2.0/Block/Phaistos_Disc/regex');

require('unicode-6.2.0/Block/Phoenician/code-points');
require('unicode-6.2.0/Block/Phoenician/symbols');
require('unicode-6.2.0/Block/Phoenician/regex');

require('unicode-6.2.0/Block/Phonetic_Extensions/code-points');
require('unicode-6.2.0/Block/Phonetic_Extensions/symbols');
require('unicode-6.2.0/Block/Phonetic_Extensions/regex');

require('unicode-6.2.0/Block/Phonetic_Extensions_Supplement/code-points');
require('unicode-6.2.0/Block/Phonetic_Extensions_Supplement/symbols');
require('unicode-6.2.0/Block/Phonetic_Extensions_Supplement/regex');

require('unicode-6.2.0/Block/Playing_Cards/code-points');
require('unicode-6.2.0/Block/Playing_Cards/symbols');
require('unicode-6.2.0/Block/Playing_Cards/regex');

require('unicode-6.2.0/Block/Private_Use_Area/code-points');
require('unicode-6.2.0/Block/Private_Use_Area/symbols');
require('unicode-6.2.0/Block/Private_Use_Area/regex');

require('unicode-6.2.0/Block/Rejang/code-points');
require('unicode-6.2.0/Block/Rejang/symbols');
require('unicode-6.2.0/Block/Rejang/regex');

require('unicode-6.2.0/Block/Rumi_Numeral_Symbols/code-points');
require('unicode-6.2.0/Block/Rumi_Numeral_Symbols/symbols');
require('unicode-6.2.0/Block/Rumi_Numeral_Symbols/regex');

require('unicode-6.2.0/Block/Runic/code-points');
require('unicode-6.2.0/Block/Runic/symbols');
require('unicode-6.2.0/Block/Runic/regex');

require('unicode-6.2.0/Block/Samaritan/code-points');
require('unicode-6.2.0/Block/Samaritan/symbols');
require('unicode-6.2.0/Block/Samaritan/regex');

require('unicode-6.2.0/Block/Saurashtra/code-points');
require('unicode-6.2.0/Block/Saurashtra/symbols');
require('unicode-6.2.0/Block/Saurashtra/regex');

require('unicode-6.2.0/Block/Sharada/code-points');
require('unicode-6.2.0/Block/Sharada/symbols');
require('unicode-6.2.0/Block/Sharada/regex');

require('unicode-6.2.0/Block/Shavian/code-points');
require('unicode-6.2.0/Block/Shavian/symbols');
require('unicode-6.2.0/Block/Shavian/regex');

require('unicode-6.2.0/Block/Sinhala/code-points');
require('unicode-6.2.0/Block/Sinhala/symbols');
require('unicode-6.2.0/Block/Sinhala/regex');

require('unicode-6.2.0/Block/Small_Form_Variants/code-points');
require('unicode-6.2.0/Block/Small_Form_Variants/symbols');
require('unicode-6.2.0/Block/Small_Form_Variants/regex');

require('unicode-6.2.0/Block/Sora_Sompeng/code-points');
require('unicode-6.2.0/Block/Sora_Sompeng/symbols');
require('unicode-6.2.0/Block/Sora_Sompeng/regex');

require('unicode-6.2.0/Block/Spacing_Modifier_Letters/code-points');
require('unicode-6.2.0/Block/Spacing_Modifier_Letters/symbols');
require('unicode-6.2.0/Block/Spacing_Modifier_Letters/regex');

require('unicode-6.2.0/Block/Specials/code-points');
require('unicode-6.2.0/Block/Specials/symbols');
require('unicode-6.2.0/Block/Specials/regex');

require('unicode-6.2.0/Block/Sundanese/code-points');
require('unicode-6.2.0/Block/Sundanese/symbols');
require('unicode-6.2.0/Block/Sundanese/regex');

require('unicode-6.2.0/Block/Sundanese_Supplement/code-points');
require('unicode-6.2.0/Block/Sundanese_Supplement/symbols');
require('unicode-6.2.0/Block/Sundanese_Supplement/regex');

require('unicode-6.2.0/Block/Superscripts_And_Subscripts/code-points');
require('unicode-6.2.0/Block/Superscripts_And_Subscripts/symbols');
require('unicode-6.2.0/Block/Superscripts_And_Subscripts/regex');

require('unicode-6.2.0/Block/Supplemental_Arrows_A/code-points');
require('unicode-6.2.0/Block/Supplemental_Arrows_A/symbols');
require('unicode-6.2.0/Block/Supplemental_Arrows_A/regex');

require('unicode-6.2.0/Block/Supplemental_Arrows_B/code-points');
require('unicode-6.2.0/Block/Supplemental_Arrows_B/symbols');
require('unicode-6.2.0/Block/Supplemental_Arrows_B/regex');

require('unicode-6.2.0/Block/Supplemental_Mathematical_Operators/code-points');
require('unicode-6.2.0/Block/Supplemental_Mathematical_Operators/symbols');
require('unicode-6.2.0/Block/Supplemental_Mathematical_Operators/regex');

require('unicode-6.2.0/Block/Supplemental_Punctuation/code-points');
require('unicode-6.2.0/Block/Supplemental_Punctuation/symbols');
require('unicode-6.2.0/Block/Supplemental_Punctuation/regex');

require('unicode-6.2.0/Block/Supplementary_Private_Use_Area_A/code-points');
require('unicode-6.2.0/Block/Supplementary_Private_Use_Area_A/symbols');
require('unicode-6.2.0/Block/Supplementary_Private_Use_Area_A/regex');

require('unicode-6.2.0/Block/Supplementary_Private_Use_Area_B/code-points');
require('unicode-6.2.0/Block/Supplementary_Private_Use_Area_B/symbols');
require('unicode-6.2.0/Block/Supplementary_Private_Use_Area_B/regex');

require('unicode-6.2.0/Block/Syloti_Nagri/code-points');
require('unicode-6.2.0/Block/Syloti_Nagri/symbols');
require('unicode-6.2.0/Block/Syloti_Nagri/regex');

require('unicode-6.2.0/Block/Syriac/code-points');
require('unicode-6.2.0/Block/Syriac/symbols');
require('unicode-6.2.0/Block/Syriac/regex');

require('unicode-6.2.0/Block/Tagalog/code-points');
require('unicode-6.2.0/Block/Tagalog/symbols');
require('unicode-6.2.0/Block/Tagalog/regex');

require('unicode-6.2.0/Block/Tagbanwa/code-points');
require('unicode-6.2.0/Block/Tagbanwa/symbols');
require('unicode-6.2.0/Block/Tagbanwa/regex');

require('unicode-6.2.0/Block/Tags/code-points');
require('unicode-6.2.0/Block/Tags/symbols');
require('unicode-6.2.0/Block/Tags/regex');

require('unicode-6.2.0/Block/Tai_Le/code-points');
require('unicode-6.2.0/Block/Tai_Le/symbols');
require('unicode-6.2.0/Block/Tai_Le/regex');

require('unicode-6.2.0/Block/Tai_Tham/code-points');
require('unicode-6.2.0/Block/Tai_Tham/symbols');
require('unicode-6.2.0/Block/Tai_Tham/regex');

require('unicode-6.2.0/Block/Tai_Viet/code-points');
require('unicode-6.2.0/Block/Tai_Viet/symbols');
require('unicode-6.2.0/Block/Tai_Viet/regex');

require('unicode-6.2.0/Block/Tai_Xuan_Jing_Symbols/code-points');
require('unicode-6.2.0/Block/Tai_Xuan_Jing_Symbols/symbols');
require('unicode-6.2.0/Block/Tai_Xuan_Jing_Symbols/regex');

require('unicode-6.2.0/Block/Takri/code-points');
require('unicode-6.2.0/Block/Takri/symbols');
require('unicode-6.2.0/Block/Takri/regex');

require('unicode-6.2.0/Block/Tamil/code-points');
require('unicode-6.2.0/Block/Tamil/symbols');
require('unicode-6.2.0/Block/Tamil/regex');

require('unicode-6.2.0/Block/Telugu/code-points');
require('unicode-6.2.0/Block/Telugu/symbols');
require('unicode-6.2.0/Block/Telugu/regex');

require('unicode-6.2.0/Block/Thaana/code-points');
require('unicode-6.2.0/Block/Thaana/symbols');
require('unicode-6.2.0/Block/Thaana/regex');

require('unicode-6.2.0/Block/Thai/code-points');
require('unicode-6.2.0/Block/Thai/symbols');
require('unicode-6.2.0/Block/Thai/regex');

require('unicode-6.2.0/Block/Tibetan/code-points');
require('unicode-6.2.0/Block/Tibetan/symbols');
require('unicode-6.2.0/Block/Tibetan/regex');

require('unicode-6.2.0/Block/Tifinagh/code-points');
require('unicode-6.2.0/Block/Tifinagh/symbols');
require('unicode-6.2.0/Block/Tifinagh/regex');

require('unicode-6.2.0/Block/Transport_And_Map_Symbols/code-points');
require('unicode-6.2.0/Block/Transport_And_Map_Symbols/symbols');
require('unicode-6.2.0/Block/Transport_And_Map_Symbols/regex');

require('unicode-6.2.0/Block/Ugaritic/code-points');
require('unicode-6.2.0/Block/Ugaritic/symbols');
require('unicode-6.2.0/Block/Ugaritic/regex');

require('unicode-6.2.0/Block/Unified_Canadian_Aboriginal_Syllabics/code-points');
require('unicode-6.2.0/Block/Unified_Canadian_Aboriginal_Syllabics/symbols');
require('unicode-6.2.0/Block/Unified_Canadian_Aboriginal_Syllabics/regex');

require('unicode-6.2.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/code-points');
require('unicode-6.2.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/symbols');
require('unicode-6.2.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/regex');

require('unicode-6.2.0/Block/Vai/code-points');
require('unicode-6.2.0/Block/Vai/symbols');
require('unicode-6.2.0/Block/Vai/regex');

require('unicode-6.2.0/Block/Variation_Selectors/code-points');
require('unicode-6.2.0/Block/Variation_Selectors/symbols');
require('unicode-6.2.0/Block/Variation_Selectors/regex');

require('unicode-6.2.0/Block/Variation_Selectors_Supplement/code-points');
require('unicode-6.2.0/Block/Variation_Selectors_Supplement/symbols');
require('unicode-6.2.0/Block/Variation_Selectors_Supplement/regex');

require('unicode-6.2.0/Block/Vedic_Extensions/code-points');
require('unicode-6.2.0/Block/Vedic_Extensions/symbols');
require('unicode-6.2.0/Block/Vedic_Extensions/regex');

require('unicode-6.2.0/Block/Vertical_Forms/code-points');
require('unicode-6.2.0/Block/Vertical_Forms/symbols');
require('unicode-6.2.0/Block/Vertical_Forms/regex');

require('unicode-6.2.0/Block/Yi_Radicals/code-points');
require('unicode-6.2.0/Block/Yi_Radicals/symbols');
require('unicode-6.2.0/Block/Yi_Radicals/regex');

require('unicode-6.2.0/Block/Yi_Syllables/code-points');
require('unicode-6.2.0/Block/Yi_Syllables/symbols');
require('unicode-6.2.0/Block/Yi_Syllables/regex');

require('unicode-6.2.0/Block/Yijing_Hexagram_Symbols/code-points');
require('unicode-6.2.0/Block/Yijing_Hexagram_Symbols/symbols');
require('unicode-6.2.0/Block/Yijing_Hexagram_Symbols/regex');

// `Bidi_Mirroring_Glyph`:

require('unicode-6.2.0/Bidi_Mirroring_Glyph').get(codePoint); // lookup map
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This module is available under the [MIT](https://mths.be/mit) license.
