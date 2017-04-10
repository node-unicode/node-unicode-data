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
  .add(require('unicode-6.3.0/Script_Extensions/Arabic/code-points.js')) // or `…/symbols`, doesn’t matter
  .add(require('unicode-6.3.0/Script_Extensions/Greek/code-points.js')); // or `…/symbols`, doesn’t matter
console.log(set.toString());
// Then you might want to use a template like this to write the result to a file, along with any regex flags you might need:
// const regex = /<%= set.toString() %>/gim;
```

## Usage

```js
// Get an array of code points in a given Unicode category:
const codePoints = require('unicode-9.0.0/General_Category/Uppercase_Letter/code-points.js');
// Get an array of symbols (strings) in a given Unicode category:
const symbols = require('unicode-9.0.0/General_Category/Uppercase_Letter/symbols.js');
// Get a regular expression that matches any symbol in a given Unicode category:
const regex = require('unicode-9.0.0/General_Category/Uppercase_Letter/regex.js');
// Get the canonical category a given code point belongs to:
// (Note: U+0041 is LATIN CAPITAL LETTER A)
const category = require('unicode-9.0.0/General_Category').get(0x41);
// Get an array of all code points with a given bidi class:
const on = require('unicode-9.0.0/Bidi_Class/Other_Neutral/code-points.js');
// Get a map from code points to bidi classes:
const bidiClassMap = require('unicode-9.0.0/Bidi_Class');
// Get the directionality of a given code point:
const directionality = require('unicode-9.0.0/Bidi_Class').get(0x41);

// What glyph is the mirror image of `«` (U+00AB)?
const mirrored = require('unicode-9.0.0/Bidi_Mirroring_Glyph').get(0xAB);

// Get a regular expression that matches all opening brackets:
const openingBrackets = require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/regex.js');

// …you get the idea.
```

Other than categories, data on Unicode properties, blocks, scripts, and script extensions is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v9.0.0:

```js
// `Binary_Property`:

require('unicode-9.0.0/Binary_Property/ASCII/code-points.js');
require('unicode-9.0.0/Binary_Property/ASCII/symbols.js');
require('unicode-9.0.0/Binary_Property/ASCII/regex.js');

require('unicode-9.0.0/Binary_Property/ASCII_Hex_Digit/code-points.js');
require('unicode-9.0.0/Binary_Property/ASCII_Hex_Digit/symbols.js');
require('unicode-9.0.0/Binary_Property/ASCII_Hex_Digit/regex.js');

require('unicode-9.0.0/Binary_Property/Alphabetic/code-points.js');
require('unicode-9.0.0/Binary_Property/Alphabetic/symbols.js');
require('unicode-9.0.0/Binary_Property/Alphabetic/regex.js');

require('unicode-9.0.0/Binary_Property/Any/code-points.js');
require('unicode-9.0.0/Binary_Property/Any/symbols.js');
require('unicode-9.0.0/Binary_Property/Any/regex.js');

require('unicode-9.0.0/Binary_Property/Assigned/code-points.js');
require('unicode-9.0.0/Binary_Property/Assigned/symbols.js');
require('unicode-9.0.0/Binary_Property/Assigned/regex.js');

require('unicode-9.0.0/Binary_Property/Bidi_Control/code-points.js');
require('unicode-9.0.0/Binary_Property/Bidi_Control/symbols.js');
require('unicode-9.0.0/Binary_Property/Bidi_Control/regex.js');

require('unicode-9.0.0/Binary_Property/Bidi_Mirrored/code-points.js');
require('unicode-9.0.0/Binary_Property/Bidi_Mirrored/symbols.js');
require('unicode-9.0.0/Binary_Property/Bidi_Mirrored/regex.js');

require('unicode-9.0.0/Binary_Property/Case_Ignorable/code-points.js');
require('unicode-9.0.0/Binary_Property/Case_Ignorable/symbols.js');
require('unicode-9.0.0/Binary_Property/Case_Ignorable/regex.js');

require('unicode-9.0.0/Binary_Property/Cased/code-points.js');
require('unicode-9.0.0/Binary_Property/Cased/symbols.js');
require('unicode-9.0.0/Binary_Property/Cased/regex.js');

require('unicode-9.0.0/Binary_Property/Changes_When_Casefolded/code-points.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Casefolded/symbols.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Casefolded/regex.js');

require('unicode-9.0.0/Binary_Property/Changes_When_Casemapped/code-points.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Casemapped/symbols.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Casemapped/regex.js');

require('unicode-9.0.0/Binary_Property/Changes_When_Lowercased/code-points.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Lowercased/symbols.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Lowercased/regex.js');

require('unicode-9.0.0/Binary_Property/Changes_When_NFKC_Casefolded/code-points.js');
require('unicode-9.0.0/Binary_Property/Changes_When_NFKC_Casefolded/symbols.js');
require('unicode-9.0.0/Binary_Property/Changes_When_NFKC_Casefolded/regex.js');

require('unicode-9.0.0/Binary_Property/Changes_When_Titlecased/code-points.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Titlecased/symbols.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Titlecased/regex.js');

require('unicode-9.0.0/Binary_Property/Changes_When_Uppercased/code-points.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Uppercased/symbols.js');
require('unicode-9.0.0/Binary_Property/Changes_When_Uppercased/regex.js');

require('unicode-9.0.0/Binary_Property/Composition_Exclusion/code-points.js');
require('unicode-9.0.0/Binary_Property/Composition_Exclusion/symbols.js');
require('unicode-9.0.0/Binary_Property/Composition_Exclusion/regex.js');

require('unicode-9.0.0/Binary_Property/Dash/code-points.js');
require('unicode-9.0.0/Binary_Property/Dash/symbols.js');
require('unicode-9.0.0/Binary_Property/Dash/regex.js');

require('unicode-9.0.0/Binary_Property/Default_Ignorable_Code_Point/code-points.js');
require('unicode-9.0.0/Binary_Property/Default_Ignorable_Code_Point/symbols.js');
require('unicode-9.0.0/Binary_Property/Default_Ignorable_Code_Point/regex.js');

require('unicode-9.0.0/Binary_Property/Deprecated/code-points.js');
require('unicode-9.0.0/Binary_Property/Deprecated/symbols.js');
require('unicode-9.0.0/Binary_Property/Deprecated/regex.js');

require('unicode-9.0.0/Binary_Property/Diacritic/code-points.js');
require('unicode-9.0.0/Binary_Property/Diacritic/symbols.js');
require('unicode-9.0.0/Binary_Property/Diacritic/regex.js');

require('unicode-9.0.0/Binary_Property/Expands_On_NFC/code-points.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFC/symbols.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFC/regex.js');

require('unicode-9.0.0/Binary_Property/Expands_On_NFD/code-points.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFD/symbols.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFD/regex.js');

require('unicode-9.0.0/Binary_Property/Expands_On_NFKC/code-points.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKC/symbols.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKC/regex.js');

require('unicode-9.0.0/Binary_Property/Expands_On_NFKD/code-points.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKD/symbols.js');
require('unicode-9.0.0/Binary_Property/Expands_On_NFKD/regex.js');

require('unicode-9.0.0/Binary_Property/Extender/code-points.js');
require('unicode-9.0.0/Binary_Property/Extender/symbols.js');
require('unicode-9.0.0/Binary_Property/Extender/regex.js');

require('unicode-9.0.0/Binary_Property/Full_Composition_Exclusion/code-points.js');
require('unicode-9.0.0/Binary_Property/Full_Composition_Exclusion/symbols.js');
require('unicode-9.0.0/Binary_Property/Full_Composition_Exclusion/regex.js');

require('unicode-9.0.0/Binary_Property/Grapheme_Base/code-points.js');
require('unicode-9.0.0/Binary_Property/Grapheme_Base/symbols.js');
require('unicode-9.0.0/Binary_Property/Grapheme_Base/regex.js');

require('unicode-9.0.0/Binary_Property/Grapheme_Extend/code-points.js');
require('unicode-9.0.0/Binary_Property/Grapheme_Extend/symbols.js');
require('unicode-9.0.0/Binary_Property/Grapheme_Extend/regex.js');

require('unicode-9.0.0/Binary_Property/Grapheme_Link/code-points.js');
require('unicode-9.0.0/Binary_Property/Grapheme_Link/symbols.js');
require('unicode-9.0.0/Binary_Property/Grapheme_Link/regex.js');

require('unicode-9.0.0/Binary_Property/Hex_Digit/code-points.js');
require('unicode-9.0.0/Binary_Property/Hex_Digit/symbols.js');
require('unicode-9.0.0/Binary_Property/Hex_Digit/regex.js');

require('unicode-9.0.0/Binary_Property/Hyphen/code-points.js');
require('unicode-9.0.0/Binary_Property/Hyphen/symbols.js');
require('unicode-9.0.0/Binary_Property/Hyphen/regex.js');

require('unicode-9.0.0/Binary_Property/IDS_Binary_Operator/code-points.js');
require('unicode-9.0.0/Binary_Property/IDS_Binary_Operator/symbols.js');
require('unicode-9.0.0/Binary_Property/IDS_Binary_Operator/regex.js');

require('unicode-9.0.0/Binary_Property/IDS_Trinary_Operator/code-points.js');
require('unicode-9.0.0/Binary_Property/IDS_Trinary_Operator/symbols.js');
require('unicode-9.0.0/Binary_Property/IDS_Trinary_Operator/regex.js');

require('unicode-9.0.0/Binary_Property/ID_Continue/code-points.js');
require('unicode-9.0.0/Binary_Property/ID_Continue/symbols.js');
require('unicode-9.0.0/Binary_Property/ID_Continue/regex.js');

require('unicode-9.0.0/Binary_Property/ID_Start/code-points.js');
require('unicode-9.0.0/Binary_Property/ID_Start/symbols.js');
require('unicode-9.0.0/Binary_Property/ID_Start/regex.js');

require('unicode-9.0.0/Binary_Property/Ideographic/code-points.js');
require('unicode-9.0.0/Binary_Property/Ideographic/symbols.js');
require('unicode-9.0.0/Binary_Property/Ideographic/regex.js');

require('unicode-9.0.0/Binary_Property/Join_Control/code-points.js');
require('unicode-9.0.0/Binary_Property/Join_Control/symbols.js');
require('unicode-9.0.0/Binary_Property/Join_Control/regex.js');

require('unicode-9.0.0/Binary_Property/Logical_Order_Exception/code-points.js');
require('unicode-9.0.0/Binary_Property/Logical_Order_Exception/symbols.js');
require('unicode-9.0.0/Binary_Property/Logical_Order_Exception/regex.js');

require('unicode-9.0.0/Binary_Property/Lowercase/code-points.js');
require('unicode-9.0.0/Binary_Property/Lowercase/symbols.js');
require('unicode-9.0.0/Binary_Property/Lowercase/regex.js');

require('unicode-9.0.0/Binary_Property/Math/code-points.js');
require('unicode-9.0.0/Binary_Property/Math/symbols.js');
require('unicode-9.0.0/Binary_Property/Math/regex.js');

require('unicode-9.0.0/Binary_Property/Noncharacter_Code_Point/code-points.js');
require('unicode-9.0.0/Binary_Property/Noncharacter_Code_Point/symbols.js');
require('unicode-9.0.0/Binary_Property/Noncharacter_Code_Point/regex.js');

require('unicode-9.0.0/Binary_Property/Other_Alphabetic/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_Alphabetic/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_Alphabetic/regex.js');

require('unicode-9.0.0/Binary_Property/Other_Default_Ignorable_Code_Point/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_Default_Ignorable_Code_Point/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_Default_Ignorable_Code_Point/regex.js');

require('unicode-9.0.0/Binary_Property/Other_Grapheme_Extend/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_Grapheme_Extend/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_Grapheme_Extend/regex.js');

require('unicode-9.0.0/Binary_Property/Other_ID_Continue/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_ID_Continue/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_ID_Continue/regex.js');

require('unicode-9.0.0/Binary_Property/Other_ID_Start/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_ID_Start/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_ID_Start/regex.js');

require('unicode-9.0.0/Binary_Property/Other_Lowercase/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_Lowercase/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_Lowercase/regex.js');

require('unicode-9.0.0/Binary_Property/Other_Math/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_Math/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_Math/regex.js');

require('unicode-9.0.0/Binary_Property/Other_Uppercase/code-points.js');
require('unicode-9.0.0/Binary_Property/Other_Uppercase/symbols.js');
require('unicode-9.0.0/Binary_Property/Other_Uppercase/regex.js');

require('unicode-9.0.0/Binary_Property/Pattern_Syntax/code-points.js');
require('unicode-9.0.0/Binary_Property/Pattern_Syntax/symbols.js');
require('unicode-9.0.0/Binary_Property/Pattern_Syntax/regex.js');

require('unicode-9.0.0/Binary_Property/Pattern_White_Space/code-points.js');
require('unicode-9.0.0/Binary_Property/Pattern_White_Space/symbols.js');
require('unicode-9.0.0/Binary_Property/Pattern_White_Space/regex.js');

require('unicode-9.0.0/Binary_Property/Prepended_Concatenation_Mark/code-points.js');
require('unicode-9.0.0/Binary_Property/Prepended_Concatenation_Mark/symbols.js');
require('unicode-9.0.0/Binary_Property/Prepended_Concatenation_Mark/regex.js');

require('unicode-9.0.0/Binary_Property/Quotation_Mark/code-points.js');
require('unicode-9.0.0/Binary_Property/Quotation_Mark/symbols.js');
require('unicode-9.0.0/Binary_Property/Quotation_Mark/regex.js');

require('unicode-9.0.0/Binary_Property/Radical/code-points.js');
require('unicode-9.0.0/Binary_Property/Radical/symbols.js');
require('unicode-9.0.0/Binary_Property/Radical/regex.js');

require('unicode-9.0.0/Binary_Property/Sentence_Terminal/code-points.js');
require('unicode-9.0.0/Binary_Property/Sentence_Terminal/symbols.js');
require('unicode-9.0.0/Binary_Property/Sentence_Terminal/regex.js');

require('unicode-9.0.0/Binary_Property/Soft_Dotted/code-points.js');
require('unicode-9.0.0/Binary_Property/Soft_Dotted/symbols.js');
require('unicode-9.0.0/Binary_Property/Soft_Dotted/regex.js');

require('unicode-9.0.0/Binary_Property/Terminal_Punctuation/code-points.js');
require('unicode-9.0.0/Binary_Property/Terminal_Punctuation/symbols.js');
require('unicode-9.0.0/Binary_Property/Terminal_Punctuation/regex.js');

require('unicode-9.0.0/Binary_Property/Unified_Ideograph/code-points.js');
require('unicode-9.0.0/Binary_Property/Unified_Ideograph/symbols.js');
require('unicode-9.0.0/Binary_Property/Unified_Ideograph/regex.js');

require('unicode-9.0.0/Binary_Property/Uppercase/code-points.js');
require('unicode-9.0.0/Binary_Property/Uppercase/symbols.js');
require('unicode-9.0.0/Binary_Property/Uppercase/regex.js');

require('unicode-9.0.0/Binary_Property/Variation_Selector/code-points.js');
require('unicode-9.0.0/Binary_Property/Variation_Selector/symbols.js');
require('unicode-9.0.0/Binary_Property/Variation_Selector/regex.js');

require('unicode-9.0.0/Binary_Property/White_Space/code-points.js');
require('unicode-9.0.0/Binary_Property/White_Space/symbols.js');
require('unicode-9.0.0/Binary_Property/White_Space/regex.js');

require('unicode-9.0.0/Binary_Property/XID_Continue/code-points.js');
require('unicode-9.0.0/Binary_Property/XID_Continue/symbols.js');
require('unicode-9.0.0/Binary_Property/XID_Continue/regex.js');

require('unicode-9.0.0/Binary_Property/XID_Start/code-points.js');
require('unicode-9.0.0/Binary_Property/XID_Start/symbols.js');
require('unicode-9.0.0/Binary_Property/XID_Start/regex.js');

// `General_Category`:

require('unicode-9.0.0/General_Category').get(codePoint); // lookup map

require('unicode-9.0.0/General_Category/Cased_Letter/code-points.js');
require('unicode-9.0.0/General_Category/Cased_Letter/symbols.js');
require('unicode-9.0.0/General_Category/Cased_Letter/regex.js');

require('unicode-9.0.0/General_Category/Close_Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Close_Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Close_Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Connector_Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Connector_Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Connector_Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Control/code-points.js');
require('unicode-9.0.0/General_Category/Control/symbols.js');
require('unicode-9.0.0/General_Category/Control/regex.js');

require('unicode-9.0.0/General_Category/Currency_Symbol/code-points.js');
require('unicode-9.0.0/General_Category/Currency_Symbol/symbols.js');
require('unicode-9.0.0/General_Category/Currency_Symbol/regex.js');

require('unicode-9.0.0/General_Category/Dash_Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Dash_Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Dash_Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Decimal_Number/code-points.js');
require('unicode-9.0.0/General_Category/Decimal_Number/symbols.js');
require('unicode-9.0.0/General_Category/Decimal_Number/regex.js');

require('unicode-9.0.0/General_Category/Enclosing_Mark/code-points.js');
require('unicode-9.0.0/General_Category/Enclosing_Mark/symbols.js');
require('unicode-9.0.0/General_Category/Enclosing_Mark/regex.js');

require('unicode-9.0.0/General_Category/Final_Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Final_Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Final_Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Format/code-points.js');
require('unicode-9.0.0/General_Category/Format/symbols.js');
require('unicode-9.0.0/General_Category/Format/regex.js');

require('unicode-9.0.0/General_Category/Initial_Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Initial_Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Initial_Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Letter/code-points.js');
require('unicode-9.0.0/General_Category/Letter/symbols.js');
require('unicode-9.0.0/General_Category/Letter/regex.js');

require('unicode-9.0.0/General_Category/Letter_Number/code-points.js');
require('unicode-9.0.0/General_Category/Letter_Number/symbols.js');
require('unicode-9.0.0/General_Category/Letter_Number/regex.js');

require('unicode-9.0.0/General_Category/Line_Separator/code-points.js');
require('unicode-9.0.0/General_Category/Line_Separator/symbols.js');
require('unicode-9.0.0/General_Category/Line_Separator/regex.js');

require('unicode-9.0.0/General_Category/Lowercase_Letter/code-points.js');
require('unicode-9.0.0/General_Category/Lowercase_Letter/symbols.js');
require('unicode-9.0.0/General_Category/Lowercase_Letter/regex.js');

require('unicode-9.0.0/General_Category/Mark/code-points.js');
require('unicode-9.0.0/General_Category/Mark/symbols.js');
require('unicode-9.0.0/General_Category/Mark/regex.js');

require('unicode-9.0.0/General_Category/Math_Symbol/code-points.js');
require('unicode-9.0.0/General_Category/Math_Symbol/symbols.js');
require('unicode-9.0.0/General_Category/Math_Symbol/regex.js');

require('unicode-9.0.0/General_Category/Modifier_Letter/code-points.js');
require('unicode-9.0.0/General_Category/Modifier_Letter/symbols.js');
require('unicode-9.0.0/General_Category/Modifier_Letter/regex.js');

require('unicode-9.0.0/General_Category/Modifier_Symbol/code-points.js');
require('unicode-9.0.0/General_Category/Modifier_Symbol/symbols.js');
require('unicode-9.0.0/General_Category/Modifier_Symbol/regex.js');

require('unicode-9.0.0/General_Category/Nonspacing_Mark/code-points.js');
require('unicode-9.0.0/General_Category/Nonspacing_Mark/symbols.js');
require('unicode-9.0.0/General_Category/Nonspacing_Mark/regex.js');

require('unicode-9.0.0/General_Category/Number/code-points.js');
require('unicode-9.0.0/General_Category/Number/symbols.js');
require('unicode-9.0.0/General_Category/Number/regex.js');

require('unicode-9.0.0/General_Category/Open_Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Open_Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Open_Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Other/code-points.js');
require('unicode-9.0.0/General_Category/Other/symbols.js');
require('unicode-9.0.0/General_Category/Other/regex.js');

require('unicode-9.0.0/General_Category/Other_Letter/code-points.js');
require('unicode-9.0.0/General_Category/Other_Letter/symbols.js');
require('unicode-9.0.0/General_Category/Other_Letter/regex.js');

require('unicode-9.0.0/General_Category/Other_Number/code-points.js');
require('unicode-9.0.0/General_Category/Other_Number/symbols.js');
require('unicode-9.0.0/General_Category/Other_Number/regex.js');

require('unicode-9.0.0/General_Category/Other_Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Other_Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Other_Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Other_Symbol/code-points.js');
require('unicode-9.0.0/General_Category/Other_Symbol/symbols.js');
require('unicode-9.0.0/General_Category/Other_Symbol/regex.js');

require('unicode-9.0.0/General_Category/Paragraph_Separator/code-points.js');
require('unicode-9.0.0/General_Category/Paragraph_Separator/symbols.js');
require('unicode-9.0.0/General_Category/Paragraph_Separator/regex.js');

require('unicode-9.0.0/General_Category/Private_Use/code-points.js');
require('unicode-9.0.0/General_Category/Private_Use/symbols.js');
require('unicode-9.0.0/General_Category/Private_Use/regex.js');

require('unicode-9.0.0/General_Category/Punctuation/code-points.js');
require('unicode-9.0.0/General_Category/Punctuation/symbols.js');
require('unicode-9.0.0/General_Category/Punctuation/regex.js');

require('unicode-9.0.0/General_Category/Separator/code-points.js');
require('unicode-9.0.0/General_Category/Separator/symbols.js');
require('unicode-9.0.0/General_Category/Separator/regex.js');

require('unicode-9.0.0/General_Category/Space_Separator/code-points.js');
require('unicode-9.0.0/General_Category/Space_Separator/symbols.js');
require('unicode-9.0.0/General_Category/Space_Separator/regex.js');

require('unicode-9.0.0/General_Category/Spacing_Mark/code-points.js');
require('unicode-9.0.0/General_Category/Spacing_Mark/symbols.js');
require('unicode-9.0.0/General_Category/Spacing_Mark/regex.js');

require('unicode-9.0.0/General_Category/Surrogate/code-points.js');
require('unicode-9.0.0/General_Category/Surrogate/symbols.js');
require('unicode-9.0.0/General_Category/Surrogate/regex.js');

require('unicode-9.0.0/General_Category/Symbol/code-points.js');
require('unicode-9.0.0/General_Category/Symbol/symbols.js');
require('unicode-9.0.0/General_Category/Symbol/regex.js');

require('unicode-9.0.0/General_Category/Titlecase_Letter/code-points.js');
require('unicode-9.0.0/General_Category/Titlecase_Letter/symbols.js');
require('unicode-9.0.0/General_Category/Titlecase_Letter/regex.js');

require('unicode-9.0.0/General_Category/Unassigned/code-points.js');
require('unicode-9.0.0/General_Category/Unassigned/symbols.js');
require('unicode-9.0.0/General_Category/Unassigned/regex.js');

require('unicode-9.0.0/General_Category/Uppercase_Letter/code-points.js');
require('unicode-9.0.0/General_Category/Uppercase_Letter/symbols.js');
require('unicode-9.0.0/General_Category/Uppercase_Letter/regex.js');

// `Bidi_Class`:

require('unicode-9.0.0/Bidi_Class').get(codePoint); // lookup map

require('unicode-9.0.0/Bidi_Class/Arabic_Letter/code-points.js');
require('unicode-9.0.0/Bidi_Class/Arabic_Letter/symbols.js');
require('unicode-9.0.0/Bidi_Class/Arabic_Letter/regex.js');

require('unicode-9.0.0/Bidi_Class/Arabic_Number/code-points.js');
require('unicode-9.0.0/Bidi_Class/Arabic_Number/symbols.js');
require('unicode-9.0.0/Bidi_Class/Arabic_Number/regex.js');

require('unicode-9.0.0/Bidi_Class/Boundary_Neutral/code-points.js');
require('unicode-9.0.0/Bidi_Class/Boundary_Neutral/symbols.js');
require('unicode-9.0.0/Bidi_Class/Boundary_Neutral/regex.js');

require('unicode-9.0.0/Bidi_Class/Common_Separator/code-points.js');
require('unicode-9.0.0/Bidi_Class/Common_Separator/symbols.js');
require('unicode-9.0.0/Bidi_Class/Common_Separator/regex.js');

require('unicode-9.0.0/Bidi_Class/European_Number/code-points.js');
require('unicode-9.0.0/Bidi_Class/European_Number/symbols.js');
require('unicode-9.0.0/Bidi_Class/European_Number/regex.js');

require('unicode-9.0.0/Bidi_Class/European_Separator/code-points.js');
require('unicode-9.0.0/Bidi_Class/European_Separator/symbols.js');
require('unicode-9.0.0/Bidi_Class/European_Separator/regex.js');

require('unicode-9.0.0/Bidi_Class/European_Terminator/code-points.js');
require('unicode-9.0.0/Bidi_Class/European_Terminator/symbols.js');
require('unicode-9.0.0/Bidi_Class/European_Terminator/regex.js');

require('unicode-9.0.0/Bidi_Class/First_Strong_Isolate/code-points.js');
require('unicode-9.0.0/Bidi_Class/First_Strong_Isolate/symbols.js');
require('unicode-9.0.0/Bidi_Class/First_Strong_Isolate/regex.js');

require('unicode-9.0.0/Bidi_Class/Left_To_Right/code-points.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right/symbols.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right/regex.js');

require('unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/code-points.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/symbols.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Embedding/regex.js');

require('unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/code-points.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/symbols.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Isolate/regex.js');

require('unicode-9.0.0/Bidi_Class/Left_To_Right_Override/code-points.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Override/symbols.js');
require('unicode-9.0.0/Bidi_Class/Left_To_Right_Override/regex.js');

require('unicode-9.0.0/Bidi_Class/Nonspacing_Mark/code-points.js');
require('unicode-9.0.0/Bidi_Class/Nonspacing_Mark/symbols.js');
require('unicode-9.0.0/Bidi_Class/Nonspacing_Mark/regex.js');

require('unicode-9.0.0/Bidi_Class/Other_Neutral/code-points.js');
require('unicode-9.0.0/Bidi_Class/Other_Neutral/symbols.js');
require('unicode-9.0.0/Bidi_Class/Other_Neutral/regex.js');

require('unicode-9.0.0/Bidi_Class/Paragraph_Separator/code-points.js');
require('unicode-9.0.0/Bidi_Class/Paragraph_Separator/symbols.js');
require('unicode-9.0.0/Bidi_Class/Paragraph_Separator/regex.js');

require('unicode-9.0.0/Bidi_Class/Pop_Directional_Format/code-points.js');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Format/symbols.js');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Format/regex.js');

require('unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/code-points.js');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/symbols.js');
require('unicode-9.0.0/Bidi_Class/Pop_Directional_Isolate/regex.js');

require('unicode-9.0.0/Bidi_Class/Right_To_Left/code-points.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left/symbols.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left/regex.js');

require('unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/code-points.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/symbols.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Embedding/regex.js');

require('unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/code-points.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/symbols.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Isolate/regex.js');

require('unicode-9.0.0/Bidi_Class/Right_To_Left_Override/code-points.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Override/symbols.js');
require('unicode-9.0.0/Bidi_Class/Right_To_Left_Override/regex.js');

require('unicode-9.0.0/Bidi_Class/Segment_Separator/code-points.js');
require('unicode-9.0.0/Bidi_Class/Segment_Separator/symbols.js');
require('unicode-9.0.0/Bidi_Class/Segment_Separator/regex.js');

require('unicode-9.0.0/Bidi_Class/White_Space/code-points.js');
require('unicode-9.0.0/Bidi_Class/White_Space/symbols.js');
require('unicode-9.0.0/Bidi_Class/White_Space/regex.js');

// `Script`:

require('unicode-9.0.0/Script/Adlam/code-points.js');
require('unicode-9.0.0/Script/Adlam/symbols.js');
require('unicode-9.0.0/Script/Adlam/regex.js');

require('unicode-9.0.0/Script/Ahom/code-points.js');
require('unicode-9.0.0/Script/Ahom/symbols.js');
require('unicode-9.0.0/Script/Ahom/regex.js');

require('unicode-9.0.0/Script/Anatolian_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Script/Anatolian_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Script/Anatolian_Hieroglyphs/regex.js');

require('unicode-9.0.0/Script/Arabic/code-points.js');
require('unicode-9.0.0/Script/Arabic/symbols.js');
require('unicode-9.0.0/Script/Arabic/regex.js');

require('unicode-9.0.0/Script/Armenian/code-points.js');
require('unicode-9.0.0/Script/Armenian/symbols.js');
require('unicode-9.0.0/Script/Armenian/regex.js');

require('unicode-9.0.0/Script/Avestan/code-points.js');
require('unicode-9.0.0/Script/Avestan/symbols.js');
require('unicode-9.0.0/Script/Avestan/regex.js');

require('unicode-9.0.0/Script/Balinese/code-points.js');
require('unicode-9.0.0/Script/Balinese/symbols.js');
require('unicode-9.0.0/Script/Balinese/regex.js');

require('unicode-9.0.0/Script/Bamum/code-points.js');
require('unicode-9.0.0/Script/Bamum/symbols.js');
require('unicode-9.0.0/Script/Bamum/regex.js');

require('unicode-9.0.0/Script/Bassa_Vah/code-points.js');
require('unicode-9.0.0/Script/Bassa_Vah/symbols.js');
require('unicode-9.0.0/Script/Bassa_Vah/regex.js');

require('unicode-9.0.0/Script/Batak/code-points.js');
require('unicode-9.0.0/Script/Batak/symbols.js');
require('unicode-9.0.0/Script/Batak/regex.js');

require('unicode-9.0.0/Script/Bengali/code-points.js');
require('unicode-9.0.0/Script/Bengali/symbols.js');
require('unicode-9.0.0/Script/Bengali/regex.js');

require('unicode-9.0.0/Script/Bhaiksuki/code-points.js');
require('unicode-9.0.0/Script/Bhaiksuki/symbols.js');
require('unicode-9.0.0/Script/Bhaiksuki/regex.js');

require('unicode-9.0.0/Script/Bopomofo/code-points.js');
require('unicode-9.0.0/Script/Bopomofo/symbols.js');
require('unicode-9.0.0/Script/Bopomofo/regex.js');

require('unicode-9.0.0/Script/Brahmi/code-points.js');
require('unicode-9.0.0/Script/Brahmi/symbols.js');
require('unicode-9.0.0/Script/Brahmi/regex.js');

require('unicode-9.0.0/Script/Braille/code-points.js');
require('unicode-9.0.0/Script/Braille/symbols.js');
require('unicode-9.0.0/Script/Braille/regex.js');

require('unicode-9.0.0/Script/Buginese/code-points.js');
require('unicode-9.0.0/Script/Buginese/symbols.js');
require('unicode-9.0.0/Script/Buginese/regex.js');

require('unicode-9.0.0/Script/Buhid/code-points.js');
require('unicode-9.0.0/Script/Buhid/symbols.js');
require('unicode-9.0.0/Script/Buhid/regex.js');

require('unicode-9.0.0/Script/Canadian_Aboriginal/code-points.js');
require('unicode-9.0.0/Script/Canadian_Aboriginal/symbols.js');
require('unicode-9.0.0/Script/Canadian_Aboriginal/regex.js');

require('unicode-9.0.0/Script/Carian/code-points.js');
require('unicode-9.0.0/Script/Carian/symbols.js');
require('unicode-9.0.0/Script/Carian/regex.js');

require('unicode-9.0.0/Script/Caucasian_Albanian/code-points.js');
require('unicode-9.0.0/Script/Caucasian_Albanian/symbols.js');
require('unicode-9.0.0/Script/Caucasian_Albanian/regex.js');

require('unicode-9.0.0/Script/Chakma/code-points.js');
require('unicode-9.0.0/Script/Chakma/symbols.js');
require('unicode-9.0.0/Script/Chakma/regex.js');

require('unicode-9.0.0/Script/Cham/code-points.js');
require('unicode-9.0.0/Script/Cham/symbols.js');
require('unicode-9.0.0/Script/Cham/regex.js');

require('unicode-9.0.0/Script/Cherokee/code-points.js');
require('unicode-9.0.0/Script/Cherokee/symbols.js');
require('unicode-9.0.0/Script/Cherokee/regex.js');

require('unicode-9.0.0/Script/Common/code-points.js');
require('unicode-9.0.0/Script/Common/symbols.js');
require('unicode-9.0.0/Script/Common/regex.js');

require('unicode-9.0.0/Script/Coptic/code-points.js');
require('unicode-9.0.0/Script/Coptic/symbols.js');
require('unicode-9.0.0/Script/Coptic/regex.js');

require('unicode-9.0.0/Script/Cuneiform/code-points.js');
require('unicode-9.0.0/Script/Cuneiform/symbols.js');
require('unicode-9.0.0/Script/Cuneiform/regex.js');

require('unicode-9.0.0/Script/Cypriot/code-points.js');
require('unicode-9.0.0/Script/Cypriot/symbols.js');
require('unicode-9.0.0/Script/Cypriot/regex.js');

require('unicode-9.0.0/Script/Cyrillic/code-points.js');
require('unicode-9.0.0/Script/Cyrillic/symbols.js');
require('unicode-9.0.0/Script/Cyrillic/regex.js');

require('unicode-9.0.0/Script/Deseret/code-points.js');
require('unicode-9.0.0/Script/Deseret/symbols.js');
require('unicode-9.0.0/Script/Deseret/regex.js');

require('unicode-9.0.0/Script/Devanagari/code-points.js');
require('unicode-9.0.0/Script/Devanagari/symbols.js');
require('unicode-9.0.0/Script/Devanagari/regex.js');

require('unicode-9.0.0/Script/Duployan/code-points.js');
require('unicode-9.0.0/Script/Duployan/symbols.js');
require('unicode-9.0.0/Script/Duployan/regex.js');

require('unicode-9.0.0/Script/Egyptian_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Script/Egyptian_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Script/Egyptian_Hieroglyphs/regex.js');

require('unicode-9.0.0/Script/Elbasan/code-points.js');
require('unicode-9.0.0/Script/Elbasan/symbols.js');
require('unicode-9.0.0/Script/Elbasan/regex.js');

require('unicode-9.0.0/Script/Ethiopic/code-points.js');
require('unicode-9.0.0/Script/Ethiopic/symbols.js');
require('unicode-9.0.0/Script/Ethiopic/regex.js');

require('unicode-9.0.0/Script/Georgian/code-points.js');
require('unicode-9.0.0/Script/Georgian/symbols.js');
require('unicode-9.0.0/Script/Georgian/regex.js');

require('unicode-9.0.0/Script/Glagolitic/code-points.js');
require('unicode-9.0.0/Script/Glagolitic/symbols.js');
require('unicode-9.0.0/Script/Glagolitic/regex.js');

require('unicode-9.0.0/Script/Gothic/code-points.js');
require('unicode-9.0.0/Script/Gothic/symbols.js');
require('unicode-9.0.0/Script/Gothic/regex.js');

require('unicode-9.0.0/Script/Grantha/code-points.js');
require('unicode-9.0.0/Script/Grantha/symbols.js');
require('unicode-9.0.0/Script/Grantha/regex.js');

require('unicode-9.0.0/Script/Greek/code-points.js');
require('unicode-9.0.0/Script/Greek/symbols.js');
require('unicode-9.0.0/Script/Greek/regex.js');

require('unicode-9.0.0/Script/Gujarati/code-points.js');
require('unicode-9.0.0/Script/Gujarati/symbols.js');
require('unicode-9.0.0/Script/Gujarati/regex.js');

require('unicode-9.0.0/Script/Gurmukhi/code-points.js');
require('unicode-9.0.0/Script/Gurmukhi/symbols.js');
require('unicode-9.0.0/Script/Gurmukhi/regex.js');

require('unicode-9.0.0/Script/Han/code-points.js');
require('unicode-9.0.0/Script/Han/symbols.js');
require('unicode-9.0.0/Script/Han/regex.js');

require('unicode-9.0.0/Script/Hangul/code-points.js');
require('unicode-9.0.0/Script/Hangul/symbols.js');
require('unicode-9.0.0/Script/Hangul/regex.js');

require('unicode-9.0.0/Script/Hanunoo/code-points.js');
require('unicode-9.0.0/Script/Hanunoo/symbols.js');
require('unicode-9.0.0/Script/Hanunoo/regex.js');

require('unicode-9.0.0/Script/Hatran/code-points.js');
require('unicode-9.0.0/Script/Hatran/symbols.js');
require('unicode-9.0.0/Script/Hatran/regex.js');

require('unicode-9.0.0/Script/Hebrew/code-points.js');
require('unicode-9.0.0/Script/Hebrew/symbols.js');
require('unicode-9.0.0/Script/Hebrew/regex.js');

require('unicode-9.0.0/Script/Hiragana/code-points.js');
require('unicode-9.0.0/Script/Hiragana/symbols.js');
require('unicode-9.0.0/Script/Hiragana/regex.js');

require('unicode-9.0.0/Script/Imperial_Aramaic/code-points.js');
require('unicode-9.0.0/Script/Imperial_Aramaic/symbols.js');
require('unicode-9.0.0/Script/Imperial_Aramaic/regex.js');

require('unicode-9.0.0/Script/Inherited/code-points.js');
require('unicode-9.0.0/Script/Inherited/symbols.js');
require('unicode-9.0.0/Script/Inherited/regex.js');

require('unicode-9.0.0/Script/Inscriptional_Pahlavi/code-points.js');
require('unicode-9.0.0/Script/Inscriptional_Pahlavi/symbols.js');
require('unicode-9.0.0/Script/Inscriptional_Pahlavi/regex.js');

require('unicode-9.0.0/Script/Inscriptional_Parthian/code-points.js');
require('unicode-9.0.0/Script/Inscriptional_Parthian/symbols.js');
require('unicode-9.0.0/Script/Inscriptional_Parthian/regex.js');

require('unicode-9.0.0/Script/Javanese/code-points.js');
require('unicode-9.0.0/Script/Javanese/symbols.js');
require('unicode-9.0.0/Script/Javanese/regex.js');

require('unicode-9.0.0/Script/Kaithi/code-points.js');
require('unicode-9.0.0/Script/Kaithi/symbols.js');
require('unicode-9.0.0/Script/Kaithi/regex.js');

require('unicode-9.0.0/Script/Kannada/code-points.js');
require('unicode-9.0.0/Script/Kannada/symbols.js');
require('unicode-9.0.0/Script/Kannada/regex.js');

require('unicode-9.0.0/Script/Katakana/code-points.js');
require('unicode-9.0.0/Script/Katakana/symbols.js');
require('unicode-9.0.0/Script/Katakana/regex.js');

require('unicode-9.0.0/Script/Kayah_Li/code-points.js');
require('unicode-9.0.0/Script/Kayah_Li/symbols.js');
require('unicode-9.0.0/Script/Kayah_Li/regex.js');

require('unicode-9.0.0/Script/Kharoshthi/code-points.js');
require('unicode-9.0.0/Script/Kharoshthi/symbols.js');
require('unicode-9.0.0/Script/Kharoshthi/regex.js');

require('unicode-9.0.0/Script/Khmer/code-points.js');
require('unicode-9.0.0/Script/Khmer/symbols.js');
require('unicode-9.0.0/Script/Khmer/regex.js');

require('unicode-9.0.0/Script/Khojki/code-points.js');
require('unicode-9.0.0/Script/Khojki/symbols.js');
require('unicode-9.0.0/Script/Khojki/regex.js');

require('unicode-9.0.0/Script/Khudawadi/code-points.js');
require('unicode-9.0.0/Script/Khudawadi/symbols.js');
require('unicode-9.0.0/Script/Khudawadi/regex.js');

require('unicode-9.0.0/Script/Lao/code-points.js');
require('unicode-9.0.0/Script/Lao/symbols.js');
require('unicode-9.0.0/Script/Lao/regex.js');

require('unicode-9.0.0/Script/Latin/code-points.js');
require('unicode-9.0.0/Script/Latin/symbols.js');
require('unicode-9.0.0/Script/Latin/regex.js');

require('unicode-9.0.0/Script/Lepcha/code-points.js');
require('unicode-9.0.0/Script/Lepcha/symbols.js');
require('unicode-9.0.0/Script/Lepcha/regex.js');

require('unicode-9.0.0/Script/Limbu/code-points.js');
require('unicode-9.0.0/Script/Limbu/symbols.js');
require('unicode-9.0.0/Script/Limbu/regex.js');

require('unicode-9.0.0/Script/Linear_A/code-points.js');
require('unicode-9.0.0/Script/Linear_A/symbols.js');
require('unicode-9.0.0/Script/Linear_A/regex.js');

require('unicode-9.0.0/Script/Linear_B/code-points.js');
require('unicode-9.0.0/Script/Linear_B/symbols.js');
require('unicode-9.0.0/Script/Linear_B/regex.js');

require('unicode-9.0.0/Script/Lisu/code-points.js');
require('unicode-9.0.0/Script/Lisu/symbols.js');
require('unicode-9.0.0/Script/Lisu/regex.js');

require('unicode-9.0.0/Script/Lycian/code-points.js');
require('unicode-9.0.0/Script/Lycian/symbols.js');
require('unicode-9.0.0/Script/Lycian/regex.js');

require('unicode-9.0.0/Script/Lydian/code-points.js');
require('unicode-9.0.0/Script/Lydian/symbols.js');
require('unicode-9.0.0/Script/Lydian/regex.js');

require('unicode-9.0.0/Script/Mahajani/code-points.js');
require('unicode-9.0.0/Script/Mahajani/symbols.js');
require('unicode-9.0.0/Script/Mahajani/regex.js');

require('unicode-9.0.0/Script/Malayalam/code-points.js');
require('unicode-9.0.0/Script/Malayalam/symbols.js');
require('unicode-9.0.0/Script/Malayalam/regex.js');

require('unicode-9.0.0/Script/Mandaic/code-points.js');
require('unicode-9.0.0/Script/Mandaic/symbols.js');
require('unicode-9.0.0/Script/Mandaic/regex.js');

require('unicode-9.0.0/Script/Manichaean/code-points.js');
require('unicode-9.0.0/Script/Manichaean/symbols.js');
require('unicode-9.0.0/Script/Manichaean/regex.js');

require('unicode-9.0.0/Script/Marchen/code-points.js');
require('unicode-9.0.0/Script/Marchen/symbols.js');
require('unicode-9.0.0/Script/Marchen/regex.js');

require('unicode-9.0.0/Script/Meetei_Mayek/code-points.js');
require('unicode-9.0.0/Script/Meetei_Mayek/symbols.js');
require('unicode-9.0.0/Script/Meetei_Mayek/regex.js');

require('unicode-9.0.0/Script/Mende_Kikakui/code-points.js');
require('unicode-9.0.0/Script/Mende_Kikakui/symbols.js');
require('unicode-9.0.0/Script/Mende_Kikakui/regex.js');

require('unicode-9.0.0/Script/Meroitic_Cursive/code-points.js');
require('unicode-9.0.0/Script/Meroitic_Cursive/symbols.js');
require('unicode-9.0.0/Script/Meroitic_Cursive/regex.js');

require('unicode-9.0.0/Script/Meroitic_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Script/Meroitic_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Script/Meroitic_Hieroglyphs/regex.js');

require('unicode-9.0.0/Script/Miao/code-points.js');
require('unicode-9.0.0/Script/Miao/symbols.js');
require('unicode-9.0.0/Script/Miao/regex.js');

require('unicode-9.0.0/Script/Modi/code-points.js');
require('unicode-9.0.0/Script/Modi/symbols.js');
require('unicode-9.0.0/Script/Modi/regex.js');

require('unicode-9.0.0/Script/Mongolian/code-points.js');
require('unicode-9.0.0/Script/Mongolian/symbols.js');
require('unicode-9.0.0/Script/Mongolian/regex.js');

require('unicode-9.0.0/Script/Mro/code-points.js');
require('unicode-9.0.0/Script/Mro/symbols.js');
require('unicode-9.0.0/Script/Mro/regex.js');

require('unicode-9.0.0/Script/Multani/code-points.js');
require('unicode-9.0.0/Script/Multani/symbols.js');
require('unicode-9.0.0/Script/Multani/regex.js');

require('unicode-9.0.0/Script/Myanmar/code-points.js');
require('unicode-9.0.0/Script/Myanmar/symbols.js');
require('unicode-9.0.0/Script/Myanmar/regex.js');

require('unicode-9.0.0/Script/Nabataean/code-points.js');
require('unicode-9.0.0/Script/Nabataean/symbols.js');
require('unicode-9.0.0/Script/Nabataean/regex.js');

require('unicode-9.0.0/Script/New_Tai_Lue/code-points.js');
require('unicode-9.0.0/Script/New_Tai_Lue/symbols.js');
require('unicode-9.0.0/Script/New_Tai_Lue/regex.js');

require('unicode-9.0.0/Script/Newa/code-points.js');
require('unicode-9.0.0/Script/Newa/symbols.js');
require('unicode-9.0.0/Script/Newa/regex.js');

require('unicode-9.0.0/Script/Nko/code-points.js');
require('unicode-9.0.0/Script/Nko/symbols.js');
require('unicode-9.0.0/Script/Nko/regex.js');

require('unicode-9.0.0/Script/Ogham/code-points.js');
require('unicode-9.0.0/Script/Ogham/symbols.js');
require('unicode-9.0.0/Script/Ogham/regex.js');

require('unicode-9.0.0/Script/Ol_Chiki/code-points.js');
require('unicode-9.0.0/Script/Ol_Chiki/symbols.js');
require('unicode-9.0.0/Script/Ol_Chiki/regex.js');

require('unicode-9.0.0/Script/Old_Hungarian/code-points.js');
require('unicode-9.0.0/Script/Old_Hungarian/symbols.js');
require('unicode-9.0.0/Script/Old_Hungarian/regex.js');

require('unicode-9.0.0/Script/Old_Italic/code-points.js');
require('unicode-9.0.0/Script/Old_Italic/symbols.js');
require('unicode-9.0.0/Script/Old_Italic/regex.js');

require('unicode-9.0.0/Script/Old_North_Arabian/code-points.js');
require('unicode-9.0.0/Script/Old_North_Arabian/symbols.js');
require('unicode-9.0.0/Script/Old_North_Arabian/regex.js');

require('unicode-9.0.0/Script/Old_Permic/code-points.js');
require('unicode-9.0.0/Script/Old_Permic/symbols.js');
require('unicode-9.0.0/Script/Old_Permic/regex.js');

require('unicode-9.0.0/Script/Old_Persian/code-points.js');
require('unicode-9.0.0/Script/Old_Persian/symbols.js');
require('unicode-9.0.0/Script/Old_Persian/regex.js');

require('unicode-9.0.0/Script/Old_South_Arabian/code-points.js');
require('unicode-9.0.0/Script/Old_South_Arabian/symbols.js');
require('unicode-9.0.0/Script/Old_South_Arabian/regex.js');

require('unicode-9.0.0/Script/Old_Turkic/code-points.js');
require('unicode-9.0.0/Script/Old_Turkic/symbols.js');
require('unicode-9.0.0/Script/Old_Turkic/regex.js');

require('unicode-9.0.0/Script/Oriya/code-points.js');
require('unicode-9.0.0/Script/Oriya/symbols.js');
require('unicode-9.0.0/Script/Oriya/regex.js');

require('unicode-9.0.0/Script/Osage/code-points.js');
require('unicode-9.0.0/Script/Osage/symbols.js');
require('unicode-9.0.0/Script/Osage/regex.js');

require('unicode-9.0.0/Script/Osmanya/code-points.js');
require('unicode-9.0.0/Script/Osmanya/symbols.js');
require('unicode-9.0.0/Script/Osmanya/regex.js');

require('unicode-9.0.0/Script/Pahawh_Hmong/code-points.js');
require('unicode-9.0.0/Script/Pahawh_Hmong/symbols.js');
require('unicode-9.0.0/Script/Pahawh_Hmong/regex.js');

require('unicode-9.0.0/Script/Palmyrene/code-points.js');
require('unicode-9.0.0/Script/Palmyrene/symbols.js');
require('unicode-9.0.0/Script/Palmyrene/regex.js');

require('unicode-9.0.0/Script/Pau_Cin_Hau/code-points.js');
require('unicode-9.0.0/Script/Pau_Cin_Hau/symbols.js');
require('unicode-9.0.0/Script/Pau_Cin_Hau/regex.js');

require('unicode-9.0.0/Script/Phags_Pa/code-points.js');
require('unicode-9.0.0/Script/Phags_Pa/symbols.js');
require('unicode-9.0.0/Script/Phags_Pa/regex.js');

require('unicode-9.0.0/Script/Phoenician/code-points.js');
require('unicode-9.0.0/Script/Phoenician/symbols.js');
require('unicode-9.0.0/Script/Phoenician/regex.js');

require('unicode-9.0.0/Script/Psalter_Pahlavi/code-points.js');
require('unicode-9.0.0/Script/Psalter_Pahlavi/symbols.js');
require('unicode-9.0.0/Script/Psalter_Pahlavi/regex.js');

require('unicode-9.0.0/Script/Rejang/code-points.js');
require('unicode-9.0.0/Script/Rejang/symbols.js');
require('unicode-9.0.0/Script/Rejang/regex.js');

require('unicode-9.0.0/Script/Runic/code-points.js');
require('unicode-9.0.0/Script/Runic/symbols.js');
require('unicode-9.0.0/Script/Runic/regex.js');

require('unicode-9.0.0/Script/Samaritan/code-points.js');
require('unicode-9.0.0/Script/Samaritan/symbols.js');
require('unicode-9.0.0/Script/Samaritan/regex.js');

require('unicode-9.0.0/Script/Saurashtra/code-points.js');
require('unicode-9.0.0/Script/Saurashtra/symbols.js');
require('unicode-9.0.0/Script/Saurashtra/regex.js');

require('unicode-9.0.0/Script/Sharada/code-points.js');
require('unicode-9.0.0/Script/Sharada/symbols.js');
require('unicode-9.0.0/Script/Sharada/regex.js');

require('unicode-9.0.0/Script/Shavian/code-points.js');
require('unicode-9.0.0/Script/Shavian/symbols.js');
require('unicode-9.0.0/Script/Shavian/regex.js');

require('unicode-9.0.0/Script/Siddham/code-points.js');
require('unicode-9.0.0/Script/Siddham/symbols.js');
require('unicode-9.0.0/Script/Siddham/regex.js');

require('unicode-9.0.0/Script/SignWriting/code-points.js');
require('unicode-9.0.0/Script/SignWriting/symbols.js');
require('unicode-9.0.0/Script/SignWriting/regex.js');

require('unicode-9.0.0/Script/Sinhala/code-points.js');
require('unicode-9.0.0/Script/Sinhala/symbols.js');
require('unicode-9.0.0/Script/Sinhala/regex.js');

require('unicode-9.0.0/Script/Sora_Sompeng/code-points.js');
require('unicode-9.0.0/Script/Sora_Sompeng/symbols.js');
require('unicode-9.0.0/Script/Sora_Sompeng/regex.js');

require('unicode-9.0.0/Script/Sundanese/code-points.js');
require('unicode-9.0.0/Script/Sundanese/symbols.js');
require('unicode-9.0.0/Script/Sundanese/regex.js');

require('unicode-9.0.0/Script/Syloti_Nagri/code-points.js');
require('unicode-9.0.0/Script/Syloti_Nagri/symbols.js');
require('unicode-9.0.0/Script/Syloti_Nagri/regex.js');

require('unicode-9.0.0/Script/Syriac/code-points.js');
require('unicode-9.0.0/Script/Syriac/symbols.js');
require('unicode-9.0.0/Script/Syriac/regex.js');

require('unicode-9.0.0/Script/Tagalog/code-points.js');
require('unicode-9.0.0/Script/Tagalog/symbols.js');
require('unicode-9.0.0/Script/Tagalog/regex.js');

require('unicode-9.0.0/Script/Tagbanwa/code-points.js');
require('unicode-9.0.0/Script/Tagbanwa/symbols.js');
require('unicode-9.0.0/Script/Tagbanwa/regex.js');

require('unicode-9.0.0/Script/Tai_Le/code-points.js');
require('unicode-9.0.0/Script/Tai_Le/symbols.js');
require('unicode-9.0.0/Script/Tai_Le/regex.js');

require('unicode-9.0.0/Script/Tai_Tham/code-points.js');
require('unicode-9.0.0/Script/Tai_Tham/symbols.js');
require('unicode-9.0.0/Script/Tai_Tham/regex.js');

require('unicode-9.0.0/Script/Tai_Viet/code-points.js');
require('unicode-9.0.0/Script/Tai_Viet/symbols.js');
require('unicode-9.0.0/Script/Tai_Viet/regex.js');

require('unicode-9.0.0/Script/Takri/code-points.js');
require('unicode-9.0.0/Script/Takri/symbols.js');
require('unicode-9.0.0/Script/Takri/regex.js');

require('unicode-9.0.0/Script/Tamil/code-points.js');
require('unicode-9.0.0/Script/Tamil/symbols.js');
require('unicode-9.0.0/Script/Tamil/regex.js');

require('unicode-9.0.0/Script/Tangut/code-points.js');
require('unicode-9.0.0/Script/Tangut/symbols.js');
require('unicode-9.0.0/Script/Tangut/regex.js');

require('unicode-9.0.0/Script/Telugu/code-points.js');
require('unicode-9.0.0/Script/Telugu/symbols.js');
require('unicode-9.0.0/Script/Telugu/regex.js');

require('unicode-9.0.0/Script/Thaana/code-points.js');
require('unicode-9.0.0/Script/Thaana/symbols.js');
require('unicode-9.0.0/Script/Thaana/regex.js');

require('unicode-9.0.0/Script/Thai/code-points.js');
require('unicode-9.0.0/Script/Thai/symbols.js');
require('unicode-9.0.0/Script/Thai/regex.js');

require('unicode-9.0.0/Script/Tibetan/code-points.js');
require('unicode-9.0.0/Script/Tibetan/symbols.js');
require('unicode-9.0.0/Script/Tibetan/regex.js');

require('unicode-9.0.0/Script/Tifinagh/code-points.js');
require('unicode-9.0.0/Script/Tifinagh/symbols.js');
require('unicode-9.0.0/Script/Tifinagh/regex.js');

require('unicode-9.0.0/Script/Tirhuta/code-points.js');
require('unicode-9.0.0/Script/Tirhuta/symbols.js');
require('unicode-9.0.0/Script/Tirhuta/regex.js');

require('unicode-9.0.0/Script/Ugaritic/code-points.js');
require('unicode-9.0.0/Script/Ugaritic/symbols.js');
require('unicode-9.0.0/Script/Ugaritic/regex.js');

require('unicode-9.0.0/Script/Vai/code-points.js');
require('unicode-9.0.0/Script/Vai/symbols.js');
require('unicode-9.0.0/Script/Vai/regex.js');

require('unicode-9.0.0/Script/Warang_Citi/code-points.js');
require('unicode-9.0.0/Script/Warang_Citi/symbols.js');
require('unicode-9.0.0/Script/Warang_Citi/regex.js');

require('unicode-9.0.0/Script/Yi/code-points.js');
require('unicode-9.0.0/Script/Yi/symbols.js');
require('unicode-9.0.0/Script/Yi/regex.js');

// `Script_Extensions`:

require('unicode-9.0.0/Script_Extensions/Adlam/code-points.js');
require('unicode-9.0.0/Script_Extensions/Adlam/symbols.js');
require('unicode-9.0.0/Script_Extensions/Adlam/regex.js');

require('unicode-9.0.0/Script_Extensions/Ahom/code-points.js');
require('unicode-9.0.0/Script_Extensions/Ahom/symbols.js');
require('unicode-9.0.0/Script_Extensions/Ahom/regex.js');

require('unicode-9.0.0/Script_Extensions/Anatolian_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Script_Extensions/Anatolian_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Script_Extensions/Anatolian_Hieroglyphs/regex.js');

require('unicode-9.0.0/Script_Extensions/Arabic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Arabic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Arabic/regex.js');

require('unicode-9.0.0/Script_Extensions/Armenian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Armenian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Armenian/regex.js');

require('unicode-9.0.0/Script_Extensions/Avestan/code-points.js');
require('unicode-9.0.0/Script_Extensions/Avestan/symbols.js');
require('unicode-9.0.0/Script_Extensions/Avestan/regex.js');

require('unicode-9.0.0/Script_Extensions/Balinese/code-points.js');
require('unicode-9.0.0/Script_Extensions/Balinese/symbols.js');
require('unicode-9.0.0/Script_Extensions/Balinese/regex.js');

require('unicode-9.0.0/Script_Extensions/Bamum/code-points.js');
require('unicode-9.0.0/Script_Extensions/Bamum/symbols.js');
require('unicode-9.0.0/Script_Extensions/Bamum/regex.js');

require('unicode-9.0.0/Script_Extensions/Bassa_Vah/code-points.js');
require('unicode-9.0.0/Script_Extensions/Bassa_Vah/symbols.js');
require('unicode-9.0.0/Script_Extensions/Bassa_Vah/regex.js');

require('unicode-9.0.0/Script_Extensions/Batak/code-points.js');
require('unicode-9.0.0/Script_Extensions/Batak/symbols.js');
require('unicode-9.0.0/Script_Extensions/Batak/regex.js');

require('unicode-9.0.0/Script_Extensions/Bengali/code-points.js');
require('unicode-9.0.0/Script_Extensions/Bengali/symbols.js');
require('unicode-9.0.0/Script_Extensions/Bengali/regex.js');

require('unicode-9.0.0/Script_Extensions/Bhaiksuki/code-points.js');
require('unicode-9.0.0/Script_Extensions/Bhaiksuki/symbols.js');
require('unicode-9.0.0/Script_Extensions/Bhaiksuki/regex.js');

require('unicode-9.0.0/Script_Extensions/Bopomofo/code-points.js');
require('unicode-9.0.0/Script_Extensions/Bopomofo/symbols.js');
require('unicode-9.0.0/Script_Extensions/Bopomofo/regex.js');

require('unicode-9.0.0/Script_Extensions/Brahmi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Brahmi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Brahmi/regex.js');

require('unicode-9.0.0/Script_Extensions/Braille/code-points.js');
require('unicode-9.0.0/Script_Extensions/Braille/symbols.js');
require('unicode-9.0.0/Script_Extensions/Braille/regex.js');

require('unicode-9.0.0/Script_Extensions/Buginese/code-points.js');
require('unicode-9.0.0/Script_Extensions/Buginese/symbols.js');
require('unicode-9.0.0/Script_Extensions/Buginese/regex.js');

require('unicode-9.0.0/Script_Extensions/Buhid/code-points.js');
require('unicode-9.0.0/Script_Extensions/Buhid/symbols.js');
require('unicode-9.0.0/Script_Extensions/Buhid/regex.js');

require('unicode-9.0.0/Script_Extensions/Canadian_Aboriginal/code-points.js');
require('unicode-9.0.0/Script_Extensions/Canadian_Aboriginal/symbols.js');
require('unicode-9.0.0/Script_Extensions/Canadian_Aboriginal/regex.js');

require('unicode-9.0.0/Script_Extensions/Carian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Carian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Carian/regex.js');

require('unicode-9.0.0/Script_Extensions/Caucasian_Albanian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Caucasian_Albanian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Caucasian_Albanian/regex.js');

require('unicode-9.0.0/Script_Extensions/Chakma/code-points.js');
require('unicode-9.0.0/Script_Extensions/Chakma/symbols.js');
require('unicode-9.0.0/Script_Extensions/Chakma/regex.js');

require('unicode-9.0.0/Script_Extensions/Cham/code-points.js');
require('unicode-9.0.0/Script_Extensions/Cham/symbols.js');
require('unicode-9.0.0/Script_Extensions/Cham/regex.js');

require('unicode-9.0.0/Script_Extensions/Cherokee/code-points.js');
require('unicode-9.0.0/Script_Extensions/Cherokee/symbols.js');
require('unicode-9.0.0/Script_Extensions/Cherokee/regex.js');

require('unicode-9.0.0/Script_Extensions/Common/code-points.js');
require('unicode-9.0.0/Script_Extensions/Common/symbols.js');
require('unicode-9.0.0/Script_Extensions/Common/regex.js');

require('unicode-9.0.0/Script_Extensions/Coptic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Coptic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Coptic/regex.js');

require('unicode-9.0.0/Script_Extensions/Cuneiform/code-points.js');
require('unicode-9.0.0/Script_Extensions/Cuneiform/symbols.js');
require('unicode-9.0.0/Script_Extensions/Cuneiform/regex.js');

require('unicode-9.0.0/Script_Extensions/Cypriot/code-points.js');
require('unicode-9.0.0/Script_Extensions/Cypriot/symbols.js');
require('unicode-9.0.0/Script_Extensions/Cypriot/regex.js');

require('unicode-9.0.0/Script_Extensions/Cyrillic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Cyrillic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Cyrillic/regex.js');

require('unicode-9.0.0/Script_Extensions/Deseret/code-points.js');
require('unicode-9.0.0/Script_Extensions/Deseret/symbols.js');
require('unicode-9.0.0/Script_Extensions/Deseret/regex.js');

require('unicode-9.0.0/Script_Extensions/Devanagari/code-points.js');
require('unicode-9.0.0/Script_Extensions/Devanagari/symbols.js');
require('unicode-9.0.0/Script_Extensions/Devanagari/regex.js');

require('unicode-9.0.0/Script_Extensions/Duployan/code-points.js');
require('unicode-9.0.0/Script_Extensions/Duployan/symbols.js');
require('unicode-9.0.0/Script_Extensions/Duployan/regex.js');

require('unicode-9.0.0/Script_Extensions/Egyptian_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Script_Extensions/Egyptian_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Script_Extensions/Egyptian_Hieroglyphs/regex.js');

require('unicode-9.0.0/Script_Extensions/Elbasan/code-points.js');
require('unicode-9.0.0/Script_Extensions/Elbasan/symbols.js');
require('unicode-9.0.0/Script_Extensions/Elbasan/regex.js');

require('unicode-9.0.0/Script_Extensions/Ethiopic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Ethiopic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Ethiopic/regex.js');

require('unicode-9.0.0/Script_Extensions/Georgian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Georgian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Georgian/regex.js');

require('unicode-9.0.0/Script_Extensions/Glagolitic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Glagolitic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Glagolitic/regex.js');

require('unicode-9.0.0/Script_Extensions/Gothic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Gothic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Gothic/regex.js');

require('unicode-9.0.0/Script_Extensions/Grantha/code-points.js');
require('unicode-9.0.0/Script_Extensions/Grantha/symbols.js');
require('unicode-9.0.0/Script_Extensions/Grantha/regex.js');

require('unicode-9.0.0/Script_Extensions/Greek/code-points.js');
require('unicode-9.0.0/Script_Extensions/Greek/symbols.js');
require('unicode-9.0.0/Script_Extensions/Greek/regex.js');

require('unicode-9.0.0/Script_Extensions/Gujarati/code-points.js');
require('unicode-9.0.0/Script_Extensions/Gujarati/symbols.js');
require('unicode-9.0.0/Script_Extensions/Gujarati/regex.js');

require('unicode-9.0.0/Script_Extensions/Gurmukhi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Gurmukhi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Gurmukhi/regex.js');

require('unicode-9.0.0/Script_Extensions/Han/code-points.js');
require('unicode-9.0.0/Script_Extensions/Han/symbols.js');
require('unicode-9.0.0/Script_Extensions/Han/regex.js');

require('unicode-9.0.0/Script_Extensions/Hangul/code-points.js');
require('unicode-9.0.0/Script_Extensions/Hangul/symbols.js');
require('unicode-9.0.0/Script_Extensions/Hangul/regex.js');

require('unicode-9.0.0/Script_Extensions/Hanunoo/code-points.js');
require('unicode-9.0.0/Script_Extensions/Hanunoo/symbols.js');
require('unicode-9.0.0/Script_Extensions/Hanunoo/regex.js');

require('unicode-9.0.0/Script_Extensions/Hatran/code-points.js');
require('unicode-9.0.0/Script_Extensions/Hatran/symbols.js');
require('unicode-9.0.0/Script_Extensions/Hatran/regex.js');

require('unicode-9.0.0/Script_Extensions/Hebrew/code-points.js');
require('unicode-9.0.0/Script_Extensions/Hebrew/symbols.js');
require('unicode-9.0.0/Script_Extensions/Hebrew/regex.js');

require('unicode-9.0.0/Script_Extensions/Hiragana/code-points.js');
require('unicode-9.0.0/Script_Extensions/Hiragana/symbols.js');
require('unicode-9.0.0/Script_Extensions/Hiragana/regex.js');

require('unicode-9.0.0/Script_Extensions/Imperial_Aramaic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Imperial_Aramaic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Imperial_Aramaic/regex.js');

require('unicode-9.0.0/Script_Extensions/Inherited/code-points.js');
require('unicode-9.0.0/Script_Extensions/Inherited/symbols.js');
require('unicode-9.0.0/Script_Extensions/Inherited/regex.js');

require('unicode-9.0.0/Script_Extensions/Inscriptional_Pahlavi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Pahlavi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Pahlavi/regex.js');

require('unicode-9.0.0/Script_Extensions/Inscriptional_Parthian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Parthian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Inscriptional_Parthian/regex.js');

require('unicode-9.0.0/Script_Extensions/Javanese/code-points.js');
require('unicode-9.0.0/Script_Extensions/Javanese/symbols.js');
require('unicode-9.0.0/Script_Extensions/Javanese/regex.js');

require('unicode-9.0.0/Script_Extensions/Kaithi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Kaithi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Kaithi/regex.js');

require('unicode-9.0.0/Script_Extensions/Kannada/code-points.js');
require('unicode-9.0.0/Script_Extensions/Kannada/symbols.js');
require('unicode-9.0.0/Script_Extensions/Kannada/regex.js');

require('unicode-9.0.0/Script_Extensions/Katakana/code-points.js');
require('unicode-9.0.0/Script_Extensions/Katakana/symbols.js');
require('unicode-9.0.0/Script_Extensions/Katakana/regex.js');

require('unicode-9.0.0/Script_Extensions/Kayah_Li/code-points.js');
require('unicode-9.0.0/Script_Extensions/Kayah_Li/symbols.js');
require('unicode-9.0.0/Script_Extensions/Kayah_Li/regex.js');

require('unicode-9.0.0/Script_Extensions/Kharoshthi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Kharoshthi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Kharoshthi/regex.js');

require('unicode-9.0.0/Script_Extensions/Khmer/code-points.js');
require('unicode-9.0.0/Script_Extensions/Khmer/symbols.js');
require('unicode-9.0.0/Script_Extensions/Khmer/regex.js');

require('unicode-9.0.0/Script_Extensions/Khojki/code-points.js');
require('unicode-9.0.0/Script_Extensions/Khojki/symbols.js');
require('unicode-9.0.0/Script_Extensions/Khojki/regex.js');

require('unicode-9.0.0/Script_Extensions/Khudawadi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Khudawadi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Khudawadi/regex.js');

require('unicode-9.0.0/Script_Extensions/Lao/code-points.js');
require('unicode-9.0.0/Script_Extensions/Lao/symbols.js');
require('unicode-9.0.0/Script_Extensions/Lao/regex.js');

require('unicode-9.0.0/Script_Extensions/Latin/code-points.js');
require('unicode-9.0.0/Script_Extensions/Latin/symbols.js');
require('unicode-9.0.0/Script_Extensions/Latin/regex.js');

require('unicode-9.0.0/Script_Extensions/Lepcha/code-points.js');
require('unicode-9.0.0/Script_Extensions/Lepcha/symbols.js');
require('unicode-9.0.0/Script_Extensions/Lepcha/regex.js');

require('unicode-9.0.0/Script_Extensions/Limbu/code-points.js');
require('unicode-9.0.0/Script_Extensions/Limbu/symbols.js');
require('unicode-9.0.0/Script_Extensions/Limbu/regex.js');

require('unicode-9.0.0/Script_Extensions/Linear_A/code-points.js');
require('unicode-9.0.0/Script_Extensions/Linear_A/symbols.js');
require('unicode-9.0.0/Script_Extensions/Linear_A/regex.js');

require('unicode-9.0.0/Script_Extensions/Linear_B/code-points.js');
require('unicode-9.0.0/Script_Extensions/Linear_B/symbols.js');
require('unicode-9.0.0/Script_Extensions/Linear_B/regex.js');

require('unicode-9.0.0/Script_Extensions/Lisu/code-points.js');
require('unicode-9.0.0/Script_Extensions/Lisu/symbols.js');
require('unicode-9.0.0/Script_Extensions/Lisu/regex.js');

require('unicode-9.0.0/Script_Extensions/Lycian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Lycian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Lycian/regex.js');

require('unicode-9.0.0/Script_Extensions/Lydian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Lydian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Lydian/regex.js');

require('unicode-9.0.0/Script_Extensions/Mahajani/code-points.js');
require('unicode-9.0.0/Script_Extensions/Mahajani/symbols.js');
require('unicode-9.0.0/Script_Extensions/Mahajani/regex.js');

require('unicode-9.0.0/Script_Extensions/Malayalam/code-points.js');
require('unicode-9.0.0/Script_Extensions/Malayalam/symbols.js');
require('unicode-9.0.0/Script_Extensions/Malayalam/regex.js');

require('unicode-9.0.0/Script_Extensions/Mandaic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Mandaic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Mandaic/regex.js');

require('unicode-9.0.0/Script_Extensions/Manichaean/code-points.js');
require('unicode-9.0.0/Script_Extensions/Manichaean/symbols.js');
require('unicode-9.0.0/Script_Extensions/Manichaean/regex.js');

require('unicode-9.0.0/Script_Extensions/Marchen/code-points.js');
require('unicode-9.0.0/Script_Extensions/Marchen/symbols.js');
require('unicode-9.0.0/Script_Extensions/Marchen/regex.js');

require('unicode-9.0.0/Script_Extensions/Meetei_Mayek/code-points.js');
require('unicode-9.0.0/Script_Extensions/Meetei_Mayek/symbols.js');
require('unicode-9.0.0/Script_Extensions/Meetei_Mayek/regex.js');

require('unicode-9.0.0/Script_Extensions/Mende_Kikakui/code-points.js');
require('unicode-9.0.0/Script_Extensions/Mende_Kikakui/symbols.js');
require('unicode-9.0.0/Script_Extensions/Mende_Kikakui/regex.js');

require('unicode-9.0.0/Script_Extensions/Meroitic_Cursive/code-points.js');
require('unicode-9.0.0/Script_Extensions/Meroitic_Cursive/symbols.js');
require('unicode-9.0.0/Script_Extensions/Meroitic_Cursive/regex.js');

require('unicode-9.0.0/Script_Extensions/Meroitic_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Script_Extensions/Meroitic_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Script_Extensions/Meroitic_Hieroglyphs/regex.js');

require('unicode-9.0.0/Script_Extensions/Miao/code-points.js');
require('unicode-9.0.0/Script_Extensions/Miao/symbols.js');
require('unicode-9.0.0/Script_Extensions/Miao/regex.js');

require('unicode-9.0.0/Script_Extensions/Modi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Modi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Modi/regex.js');

require('unicode-9.0.0/Script_Extensions/Mongolian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Mongolian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Mongolian/regex.js');

require('unicode-9.0.0/Script_Extensions/Mro/code-points.js');
require('unicode-9.0.0/Script_Extensions/Mro/symbols.js');
require('unicode-9.0.0/Script_Extensions/Mro/regex.js');

require('unicode-9.0.0/Script_Extensions/Multani/code-points.js');
require('unicode-9.0.0/Script_Extensions/Multani/symbols.js');
require('unicode-9.0.0/Script_Extensions/Multani/regex.js');

require('unicode-9.0.0/Script_Extensions/Myanmar/code-points.js');
require('unicode-9.0.0/Script_Extensions/Myanmar/symbols.js');
require('unicode-9.0.0/Script_Extensions/Myanmar/regex.js');

require('unicode-9.0.0/Script_Extensions/Nabataean/code-points.js');
require('unicode-9.0.0/Script_Extensions/Nabataean/symbols.js');
require('unicode-9.0.0/Script_Extensions/Nabataean/regex.js');

require('unicode-9.0.0/Script_Extensions/New_Tai_Lue/code-points.js');
require('unicode-9.0.0/Script_Extensions/New_Tai_Lue/symbols.js');
require('unicode-9.0.0/Script_Extensions/New_Tai_Lue/regex.js');

require('unicode-9.0.0/Script_Extensions/Newa/code-points.js');
require('unicode-9.0.0/Script_Extensions/Newa/symbols.js');
require('unicode-9.0.0/Script_Extensions/Newa/regex.js');

require('unicode-9.0.0/Script_Extensions/Nko/code-points.js');
require('unicode-9.0.0/Script_Extensions/Nko/symbols.js');
require('unicode-9.0.0/Script_Extensions/Nko/regex.js');

require('unicode-9.0.0/Script_Extensions/Ogham/code-points.js');
require('unicode-9.0.0/Script_Extensions/Ogham/symbols.js');
require('unicode-9.0.0/Script_Extensions/Ogham/regex.js');

require('unicode-9.0.0/Script_Extensions/Ol_Chiki/code-points.js');
require('unicode-9.0.0/Script_Extensions/Ol_Chiki/symbols.js');
require('unicode-9.0.0/Script_Extensions/Ol_Chiki/regex.js');

require('unicode-9.0.0/Script_Extensions/Old_Hungarian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Old_Hungarian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Old_Hungarian/regex.js');

require('unicode-9.0.0/Script_Extensions/Old_Italic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Old_Italic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Old_Italic/regex.js');

require('unicode-9.0.0/Script_Extensions/Old_North_Arabian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Old_North_Arabian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Old_North_Arabian/regex.js');

require('unicode-9.0.0/Script_Extensions/Old_Permic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Old_Permic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Old_Permic/regex.js');

require('unicode-9.0.0/Script_Extensions/Old_Persian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Old_Persian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Old_Persian/regex.js');

require('unicode-9.0.0/Script_Extensions/Old_South_Arabian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Old_South_Arabian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Old_South_Arabian/regex.js');

require('unicode-9.0.0/Script_Extensions/Old_Turkic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Old_Turkic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Old_Turkic/regex.js');

require('unicode-9.0.0/Script_Extensions/Oriya/code-points.js');
require('unicode-9.0.0/Script_Extensions/Oriya/symbols.js');
require('unicode-9.0.0/Script_Extensions/Oriya/regex.js');

require('unicode-9.0.0/Script_Extensions/Osage/code-points.js');
require('unicode-9.0.0/Script_Extensions/Osage/symbols.js');
require('unicode-9.0.0/Script_Extensions/Osage/regex.js');

require('unicode-9.0.0/Script_Extensions/Osmanya/code-points.js');
require('unicode-9.0.0/Script_Extensions/Osmanya/symbols.js');
require('unicode-9.0.0/Script_Extensions/Osmanya/regex.js');

require('unicode-9.0.0/Script_Extensions/Pahawh_Hmong/code-points.js');
require('unicode-9.0.0/Script_Extensions/Pahawh_Hmong/symbols.js');
require('unicode-9.0.0/Script_Extensions/Pahawh_Hmong/regex.js');

require('unicode-9.0.0/Script_Extensions/Palmyrene/code-points.js');
require('unicode-9.0.0/Script_Extensions/Palmyrene/symbols.js');
require('unicode-9.0.0/Script_Extensions/Palmyrene/regex.js');

require('unicode-9.0.0/Script_Extensions/Pau_Cin_Hau/code-points.js');
require('unicode-9.0.0/Script_Extensions/Pau_Cin_Hau/symbols.js');
require('unicode-9.0.0/Script_Extensions/Pau_Cin_Hau/regex.js');

require('unicode-9.0.0/Script_Extensions/Phags_Pa/code-points.js');
require('unicode-9.0.0/Script_Extensions/Phags_Pa/symbols.js');
require('unicode-9.0.0/Script_Extensions/Phags_Pa/regex.js');

require('unicode-9.0.0/Script_Extensions/Phoenician/code-points.js');
require('unicode-9.0.0/Script_Extensions/Phoenician/symbols.js');
require('unicode-9.0.0/Script_Extensions/Phoenician/regex.js');

require('unicode-9.0.0/Script_Extensions/Psalter_Pahlavi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Psalter_Pahlavi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Psalter_Pahlavi/regex.js');

require('unicode-9.0.0/Script_Extensions/Rejang/code-points.js');
require('unicode-9.0.0/Script_Extensions/Rejang/symbols.js');
require('unicode-9.0.0/Script_Extensions/Rejang/regex.js');

require('unicode-9.0.0/Script_Extensions/Runic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Runic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Runic/regex.js');

require('unicode-9.0.0/Script_Extensions/Samaritan/code-points.js');
require('unicode-9.0.0/Script_Extensions/Samaritan/symbols.js');
require('unicode-9.0.0/Script_Extensions/Samaritan/regex.js');

require('unicode-9.0.0/Script_Extensions/Saurashtra/code-points.js');
require('unicode-9.0.0/Script_Extensions/Saurashtra/symbols.js');
require('unicode-9.0.0/Script_Extensions/Saurashtra/regex.js');

require('unicode-9.0.0/Script_Extensions/Sharada/code-points.js');
require('unicode-9.0.0/Script_Extensions/Sharada/symbols.js');
require('unicode-9.0.0/Script_Extensions/Sharada/regex.js');

require('unicode-9.0.0/Script_Extensions/Shavian/code-points.js');
require('unicode-9.0.0/Script_Extensions/Shavian/symbols.js');
require('unicode-9.0.0/Script_Extensions/Shavian/regex.js');

require('unicode-9.0.0/Script_Extensions/Siddham/code-points.js');
require('unicode-9.0.0/Script_Extensions/Siddham/symbols.js');
require('unicode-9.0.0/Script_Extensions/Siddham/regex.js');

require('unicode-9.0.0/Script_Extensions/SignWriting/code-points.js');
require('unicode-9.0.0/Script_Extensions/SignWriting/symbols.js');
require('unicode-9.0.0/Script_Extensions/SignWriting/regex.js');

require('unicode-9.0.0/Script_Extensions/Sinhala/code-points.js');
require('unicode-9.0.0/Script_Extensions/Sinhala/symbols.js');
require('unicode-9.0.0/Script_Extensions/Sinhala/regex.js');

require('unicode-9.0.0/Script_Extensions/Sora_Sompeng/code-points.js');
require('unicode-9.0.0/Script_Extensions/Sora_Sompeng/symbols.js');
require('unicode-9.0.0/Script_Extensions/Sora_Sompeng/regex.js');

require('unicode-9.0.0/Script_Extensions/Sundanese/code-points.js');
require('unicode-9.0.0/Script_Extensions/Sundanese/symbols.js');
require('unicode-9.0.0/Script_Extensions/Sundanese/regex.js');

require('unicode-9.0.0/Script_Extensions/Syloti_Nagri/code-points.js');
require('unicode-9.0.0/Script_Extensions/Syloti_Nagri/symbols.js');
require('unicode-9.0.0/Script_Extensions/Syloti_Nagri/regex.js');

require('unicode-9.0.0/Script_Extensions/Syriac/code-points.js');
require('unicode-9.0.0/Script_Extensions/Syriac/symbols.js');
require('unicode-9.0.0/Script_Extensions/Syriac/regex.js');

require('unicode-9.0.0/Script_Extensions/Tagalog/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tagalog/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tagalog/regex.js');

require('unicode-9.0.0/Script_Extensions/Tagbanwa/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tagbanwa/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tagbanwa/regex.js');

require('unicode-9.0.0/Script_Extensions/Tai_Le/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tai_Le/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tai_Le/regex.js');

require('unicode-9.0.0/Script_Extensions/Tai_Tham/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tai_Tham/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tai_Tham/regex.js');

require('unicode-9.0.0/Script_Extensions/Tai_Viet/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tai_Viet/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tai_Viet/regex.js');

require('unicode-9.0.0/Script_Extensions/Takri/code-points.js');
require('unicode-9.0.0/Script_Extensions/Takri/symbols.js');
require('unicode-9.0.0/Script_Extensions/Takri/regex.js');

require('unicode-9.0.0/Script_Extensions/Tamil/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tamil/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tamil/regex.js');

require('unicode-9.0.0/Script_Extensions/Tangut/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tangut/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tangut/regex.js');

require('unicode-9.0.0/Script_Extensions/Telugu/code-points.js');
require('unicode-9.0.0/Script_Extensions/Telugu/symbols.js');
require('unicode-9.0.0/Script_Extensions/Telugu/regex.js');

require('unicode-9.0.0/Script_Extensions/Thaana/code-points.js');
require('unicode-9.0.0/Script_Extensions/Thaana/symbols.js');
require('unicode-9.0.0/Script_Extensions/Thaana/regex.js');

require('unicode-9.0.0/Script_Extensions/Thai/code-points.js');
require('unicode-9.0.0/Script_Extensions/Thai/symbols.js');
require('unicode-9.0.0/Script_Extensions/Thai/regex.js');

require('unicode-9.0.0/Script_Extensions/Tibetan/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tibetan/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tibetan/regex.js');

require('unicode-9.0.0/Script_Extensions/Tifinagh/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tifinagh/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tifinagh/regex.js');

require('unicode-9.0.0/Script_Extensions/Tirhuta/code-points.js');
require('unicode-9.0.0/Script_Extensions/Tirhuta/symbols.js');
require('unicode-9.0.0/Script_Extensions/Tirhuta/regex.js');

require('unicode-9.0.0/Script_Extensions/Ugaritic/code-points.js');
require('unicode-9.0.0/Script_Extensions/Ugaritic/symbols.js');
require('unicode-9.0.0/Script_Extensions/Ugaritic/regex.js');

require('unicode-9.0.0/Script_Extensions/Vai/code-points.js');
require('unicode-9.0.0/Script_Extensions/Vai/symbols.js');
require('unicode-9.0.0/Script_Extensions/Vai/regex.js');

require('unicode-9.0.0/Script_Extensions/Warang_Citi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Warang_Citi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Warang_Citi/regex.js');

require('unicode-9.0.0/Script_Extensions/Yi/code-points.js');
require('unicode-9.0.0/Script_Extensions/Yi/symbols.js');
require('unicode-9.0.0/Script_Extensions/Yi/regex.js');

// `Case_Folding`:

require('unicode-9.0.0/Case_Folding/C/code-points.js'); // lookup map from code point to code point or array of code points
require('unicode-9.0.0/Case_Folding/C/code-points.js').get(codePoint);
require('unicode-9.0.0/Case_Folding/C/symbols.js'); // lookup map from symbol to symbol(s)
require('unicode-9.0.0/Case_Folding/C/symbols.js').get(symbol);

require('unicode-9.0.0/Case_Folding/F/code-points.js'); // lookup map from code point to code point or array of code points
require('unicode-9.0.0/Case_Folding/F/code-points.js').get(codePoint);
require('unicode-9.0.0/Case_Folding/F/symbols.js'); // lookup map from symbol to symbol(s)
require('unicode-9.0.0/Case_Folding/F/symbols.js').get(symbol);

require('unicode-9.0.0/Case_Folding/S/code-points.js'); // lookup map from code point to code point or array of code points
require('unicode-9.0.0/Case_Folding/S/code-points.js').get(codePoint);
require('unicode-9.0.0/Case_Folding/S/symbols.js'); // lookup map from symbol to symbol(s)
require('unicode-9.0.0/Case_Folding/S/symbols.js').get(symbol);

require('unicode-9.0.0/Case_Folding/T/code-points.js'); // lookup map from code point to code point or array of code points
require('unicode-9.0.0/Case_Folding/T/code-points.js').get(codePoint);
require('unicode-9.0.0/Case_Folding/T/symbols.js'); // lookup map from symbol to symbol(s)
require('unicode-9.0.0/Case_Folding/T/symbols.js').get(symbol);

// `Block`:

require('unicode-9.0.0/Block/Adlam/code-points.js');
require('unicode-9.0.0/Block/Adlam/symbols.js');
require('unicode-9.0.0/Block/Adlam/regex.js');

require('unicode-9.0.0/Block/Aegean_Numbers/code-points.js');
require('unicode-9.0.0/Block/Aegean_Numbers/symbols.js');
require('unicode-9.0.0/Block/Aegean_Numbers/regex.js');

require('unicode-9.0.0/Block/Ahom/code-points.js');
require('unicode-9.0.0/Block/Ahom/symbols.js');
require('unicode-9.0.0/Block/Ahom/regex.js');

require('unicode-9.0.0/Block/Alchemical_Symbols/code-points.js');
require('unicode-9.0.0/Block/Alchemical_Symbols/symbols.js');
require('unicode-9.0.0/Block/Alchemical_Symbols/regex.js');

require('unicode-9.0.0/Block/Alphabetic_Presentation_Forms/code-points.js');
require('unicode-9.0.0/Block/Alphabetic_Presentation_Forms/symbols.js');
require('unicode-9.0.0/Block/Alphabetic_Presentation_Forms/regex.js');

require('unicode-9.0.0/Block/Anatolian_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Block/Anatolian_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Block/Anatolian_Hieroglyphs/regex.js');

require('unicode-9.0.0/Block/Ancient_Greek_Musical_Notation/code-points.js');
require('unicode-9.0.0/Block/Ancient_Greek_Musical_Notation/symbols.js');
require('unicode-9.0.0/Block/Ancient_Greek_Musical_Notation/regex.js');

require('unicode-9.0.0/Block/Ancient_Greek_Numbers/code-points.js');
require('unicode-9.0.0/Block/Ancient_Greek_Numbers/symbols.js');
require('unicode-9.0.0/Block/Ancient_Greek_Numbers/regex.js');

require('unicode-9.0.0/Block/Ancient_Symbols/code-points.js');
require('unicode-9.0.0/Block/Ancient_Symbols/symbols.js');
require('unicode-9.0.0/Block/Ancient_Symbols/regex.js');

require('unicode-9.0.0/Block/Arabic/code-points.js');
require('unicode-9.0.0/Block/Arabic/symbols.js');
require('unicode-9.0.0/Block/Arabic/regex.js');

require('unicode-9.0.0/Block/Arabic_Extended_A/code-points.js');
require('unicode-9.0.0/Block/Arabic_Extended_A/symbols.js');
require('unicode-9.0.0/Block/Arabic_Extended_A/regex.js');

require('unicode-9.0.0/Block/Arabic_Mathematical_Alphabetic_Symbols/code-points.js');
require('unicode-9.0.0/Block/Arabic_Mathematical_Alphabetic_Symbols/symbols.js');
require('unicode-9.0.0/Block/Arabic_Mathematical_Alphabetic_Symbols/regex.js');

require('unicode-9.0.0/Block/Arabic_Presentation_Forms_A/code-points.js');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_A/symbols.js');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_A/regex.js');

require('unicode-9.0.0/Block/Arabic_Presentation_Forms_B/code-points.js');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_B/symbols.js');
require('unicode-9.0.0/Block/Arabic_Presentation_Forms_B/regex.js');

require('unicode-9.0.0/Block/Arabic_Supplement/code-points.js');
require('unicode-9.0.0/Block/Arabic_Supplement/symbols.js');
require('unicode-9.0.0/Block/Arabic_Supplement/regex.js');

require('unicode-9.0.0/Block/Armenian/code-points.js');
require('unicode-9.0.0/Block/Armenian/symbols.js');
require('unicode-9.0.0/Block/Armenian/regex.js');

require('unicode-9.0.0/Block/Arrows/code-points.js');
require('unicode-9.0.0/Block/Arrows/symbols.js');
require('unicode-9.0.0/Block/Arrows/regex.js');

require('unicode-9.0.0/Block/Avestan/code-points.js');
require('unicode-9.0.0/Block/Avestan/symbols.js');
require('unicode-9.0.0/Block/Avestan/regex.js');

require('unicode-9.0.0/Block/Balinese/code-points.js');
require('unicode-9.0.0/Block/Balinese/symbols.js');
require('unicode-9.0.0/Block/Balinese/regex.js');

require('unicode-9.0.0/Block/Bamum/code-points.js');
require('unicode-9.0.0/Block/Bamum/symbols.js');
require('unicode-9.0.0/Block/Bamum/regex.js');

require('unicode-9.0.0/Block/Bamum_Supplement/code-points.js');
require('unicode-9.0.0/Block/Bamum_Supplement/symbols.js');
require('unicode-9.0.0/Block/Bamum_Supplement/regex.js');

require('unicode-9.0.0/Block/Basic_Latin/code-points.js');
require('unicode-9.0.0/Block/Basic_Latin/symbols.js');
require('unicode-9.0.0/Block/Basic_Latin/regex.js');

require('unicode-9.0.0/Block/Bassa_Vah/code-points.js');
require('unicode-9.0.0/Block/Bassa_Vah/symbols.js');
require('unicode-9.0.0/Block/Bassa_Vah/regex.js');

require('unicode-9.0.0/Block/Batak/code-points.js');
require('unicode-9.0.0/Block/Batak/symbols.js');
require('unicode-9.0.0/Block/Batak/regex.js');

require('unicode-9.0.0/Block/Bengali/code-points.js');
require('unicode-9.0.0/Block/Bengali/symbols.js');
require('unicode-9.0.0/Block/Bengali/regex.js');

require('unicode-9.0.0/Block/Bhaiksuki/code-points.js');
require('unicode-9.0.0/Block/Bhaiksuki/symbols.js');
require('unicode-9.0.0/Block/Bhaiksuki/regex.js');

require('unicode-9.0.0/Block/Block_Elements/code-points.js');
require('unicode-9.0.0/Block/Block_Elements/symbols.js');
require('unicode-9.0.0/Block/Block_Elements/regex.js');

require('unicode-9.0.0/Block/Bopomofo/code-points.js');
require('unicode-9.0.0/Block/Bopomofo/symbols.js');
require('unicode-9.0.0/Block/Bopomofo/regex.js');

require('unicode-9.0.0/Block/Bopomofo_Extended/code-points.js');
require('unicode-9.0.0/Block/Bopomofo_Extended/symbols.js');
require('unicode-9.0.0/Block/Bopomofo_Extended/regex.js');

require('unicode-9.0.0/Block/Box_Drawing/code-points.js');
require('unicode-9.0.0/Block/Box_Drawing/symbols.js');
require('unicode-9.0.0/Block/Box_Drawing/regex.js');

require('unicode-9.0.0/Block/Brahmi/code-points.js');
require('unicode-9.0.0/Block/Brahmi/symbols.js');
require('unicode-9.0.0/Block/Brahmi/regex.js');

require('unicode-9.0.0/Block/Braille_Patterns/code-points.js');
require('unicode-9.0.0/Block/Braille_Patterns/symbols.js');
require('unicode-9.0.0/Block/Braille_Patterns/regex.js');

require('unicode-9.0.0/Block/Buginese/code-points.js');
require('unicode-9.0.0/Block/Buginese/symbols.js');
require('unicode-9.0.0/Block/Buginese/regex.js');

require('unicode-9.0.0/Block/Buhid/code-points.js');
require('unicode-9.0.0/Block/Buhid/symbols.js');
require('unicode-9.0.0/Block/Buhid/regex.js');

require('unicode-9.0.0/Block/Byzantine_Musical_Symbols/code-points.js');
require('unicode-9.0.0/Block/Byzantine_Musical_Symbols/symbols.js');
require('unicode-9.0.0/Block/Byzantine_Musical_Symbols/regex.js');

require('unicode-9.0.0/Block/CJK_Compatibility/code-points.js');
require('unicode-9.0.0/Block/CJK_Compatibility/symbols.js');
require('unicode-9.0.0/Block/CJK_Compatibility/regex.js');

require('unicode-9.0.0/Block/CJK_Compatibility_Forms/code-points.js');
require('unicode-9.0.0/Block/CJK_Compatibility_Forms/symbols.js');
require('unicode-9.0.0/Block/CJK_Compatibility_Forms/regex.js');

require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs/code-points.js');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs/symbols.js');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs/regex.js');

require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs_Supplement/code-points.js');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs_Supplement/symbols.js');
require('unicode-9.0.0/Block/CJK_Compatibility_Ideographs_Supplement/regex.js');

require('unicode-9.0.0/Block/CJK_Radicals_Supplement/code-points.js');
require('unicode-9.0.0/Block/CJK_Radicals_Supplement/symbols.js');
require('unicode-9.0.0/Block/CJK_Radicals_Supplement/regex.js');

require('unicode-9.0.0/Block/CJK_Strokes/code-points.js');
require('unicode-9.0.0/Block/CJK_Strokes/symbols.js');
require('unicode-9.0.0/Block/CJK_Strokes/regex.js');

require('unicode-9.0.0/Block/CJK_Symbols_And_Punctuation/code-points.js');
require('unicode-9.0.0/Block/CJK_Symbols_And_Punctuation/symbols.js');
require('unicode-9.0.0/Block/CJK_Symbols_And_Punctuation/regex.js');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs/code-points.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs/symbols.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs/regex.js');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_A/code-points.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_A/symbols.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_A/regex.js');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_B/code-points.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_B/symbols.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_B/regex.js');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_C/code-points.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_C/symbols.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_C/regex.js');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_D/code-points.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_D/symbols.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_D/regex.js');

require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_E/code-points.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_E/symbols.js');
require('unicode-9.0.0/Block/CJK_Unified_Ideographs_Extension_E/regex.js');

require('unicode-9.0.0/Block/Carian/code-points.js');
require('unicode-9.0.0/Block/Carian/symbols.js');
require('unicode-9.0.0/Block/Carian/regex.js');

require('unicode-9.0.0/Block/Caucasian_Albanian/code-points.js');
require('unicode-9.0.0/Block/Caucasian_Albanian/symbols.js');
require('unicode-9.0.0/Block/Caucasian_Albanian/regex.js');

require('unicode-9.0.0/Block/Chakma/code-points.js');
require('unicode-9.0.0/Block/Chakma/symbols.js');
require('unicode-9.0.0/Block/Chakma/regex.js');

require('unicode-9.0.0/Block/Cham/code-points.js');
require('unicode-9.0.0/Block/Cham/symbols.js');
require('unicode-9.0.0/Block/Cham/regex.js');

require('unicode-9.0.0/Block/Cherokee/code-points.js');
require('unicode-9.0.0/Block/Cherokee/symbols.js');
require('unicode-9.0.0/Block/Cherokee/regex.js');

require('unicode-9.0.0/Block/Cherokee_Supplement/code-points.js');
require('unicode-9.0.0/Block/Cherokee_Supplement/symbols.js');
require('unicode-9.0.0/Block/Cherokee_Supplement/regex.js');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks/code-points.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks/symbols.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks/regex.js');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Extended/code-points.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Extended/symbols.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Extended/regex.js');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks_For_Symbols/code-points.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_For_Symbols/symbols.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_For_Symbols/regex.js');

require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Supplement/code-points.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Supplement/symbols.js');
require('unicode-9.0.0/Block/Combining_Diacritical_Marks_Supplement/regex.js');

require('unicode-9.0.0/Block/Combining_Half_Marks/code-points.js');
require('unicode-9.0.0/Block/Combining_Half_Marks/symbols.js');
require('unicode-9.0.0/Block/Combining_Half_Marks/regex.js');

require('unicode-9.0.0/Block/Common_Indic_Number_Forms/code-points.js');
require('unicode-9.0.0/Block/Common_Indic_Number_Forms/symbols.js');
require('unicode-9.0.0/Block/Common_Indic_Number_Forms/regex.js');

require('unicode-9.0.0/Block/Control_Pictures/code-points.js');
require('unicode-9.0.0/Block/Control_Pictures/symbols.js');
require('unicode-9.0.0/Block/Control_Pictures/regex.js');

require('unicode-9.0.0/Block/Coptic/code-points.js');
require('unicode-9.0.0/Block/Coptic/symbols.js');
require('unicode-9.0.0/Block/Coptic/regex.js');

require('unicode-9.0.0/Block/Coptic_Epact_Numbers/code-points.js');
require('unicode-9.0.0/Block/Coptic_Epact_Numbers/symbols.js');
require('unicode-9.0.0/Block/Coptic_Epact_Numbers/regex.js');

require('unicode-9.0.0/Block/Counting_Rod_Numerals/code-points.js');
require('unicode-9.0.0/Block/Counting_Rod_Numerals/symbols.js');
require('unicode-9.0.0/Block/Counting_Rod_Numerals/regex.js');

require('unicode-9.0.0/Block/Cuneiform/code-points.js');
require('unicode-9.0.0/Block/Cuneiform/symbols.js');
require('unicode-9.0.0/Block/Cuneiform/regex.js');

require('unicode-9.0.0/Block/Cuneiform_Numbers_And_Punctuation/code-points.js');
require('unicode-9.0.0/Block/Cuneiform_Numbers_And_Punctuation/symbols.js');
require('unicode-9.0.0/Block/Cuneiform_Numbers_And_Punctuation/regex.js');

require('unicode-9.0.0/Block/Currency_Symbols/code-points.js');
require('unicode-9.0.0/Block/Currency_Symbols/symbols.js');
require('unicode-9.0.0/Block/Currency_Symbols/regex.js');

require('unicode-9.0.0/Block/Cypriot_Syllabary/code-points.js');
require('unicode-9.0.0/Block/Cypriot_Syllabary/symbols.js');
require('unicode-9.0.0/Block/Cypriot_Syllabary/regex.js');

require('unicode-9.0.0/Block/Cyrillic/code-points.js');
require('unicode-9.0.0/Block/Cyrillic/symbols.js');
require('unicode-9.0.0/Block/Cyrillic/regex.js');

require('unicode-9.0.0/Block/Cyrillic_Extended_A/code-points.js');
require('unicode-9.0.0/Block/Cyrillic_Extended_A/symbols.js');
require('unicode-9.0.0/Block/Cyrillic_Extended_A/regex.js');

require('unicode-9.0.0/Block/Cyrillic_Extended_B/code-points.js');
require('unicode-9.0.0/Block/Cyrillic_Extended_B/symbols.js');
require('unicode-9.0.0/Block/Cyrillic_Extended_B/regex.js');

require('unicode-9.0.0/Block/Cyrillic_Extended_C/code-points.js');
require('unicode-9.0.0/Block/Cyrillic_Extended_C/symbols.js');
require('unicode-9.0.0/Block/Cyrillic_Extended_C/regex.js');

require('unicode-9.0.0/Block/Cyrillic_Supplement/code-points.js');
require('unicode-9.0.0/Block/Cyrillic_Supplement/symbols.js');
require('unicode-9.0.0/Block/Cyrillic_Supplement/regex.js');

require('unicode-9.0.0/Block/Deseret/code-points.js');
require('unicode-9.0.0/Block/Deseret/symbols.js');
require('unicode-9.0.0/Block/Deseret/regex.js');

require('unicode-9.0.0/Block/Devanagari/code-points.js');
require('unicode-9.0.0/Block/Devanagari/symbols.js');
require('unicode-9.0.0/Block/Devanagari/regex.js');

require('unicode-9.0.0/Block/Devanagari_Extended/code-points.js');
require('unicode-9.0.0/Block/Devanagari_Extended/symbols.js');
require('unicode-9.0.0/Block/Devanagari_Extended/regex.js');

require('unicode-9.0.0/Block/Dingbats/code-points.js');
require('unicode-9.0.0/Block/Dingbats/symbols.js');
require('unicode-9.0.0/Block/Dingbats/regex.js');

require('unicode-9.0.0/Block/Domino_Tiles/code-points.js');
require('unicode-9.0.0/Block/Domino_Tiles/symbols.js');
require('unicode-9.0.0/Block/Domino_Tiles/regex.js');

require('unicode-9.0.0/Block/Duployan/code-points.js');
require('unicode-9.0.0/Block/Duployan/symbols.js');
require('unicode-9.0.0/Block/Duployan/regex.js');

require('unicode-9.0.0/Block/Early_Dynastic_Cuneiform/code-points.js');
require('unicode-9.0.0/Block/Early_Dynastic_Cuneiform/symbols.js');
require('unicode-9.0.0/Block/Early_Dynastic_Cuneiform/regex.js');

require('unicode-9.0.0/Block/Egyptian_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Block/Egyptian_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Block/Egyptian_Hieroglyphs/regex.js');

require('unicode-9.0.0/Block/Elbasan/code-points.js');
require('unicode-9.0.0/Block/Elbasan/symbols.js');
require('unicode-9.0.0/Block/Elbasan/regex.js');

require('unicode-9.0.0/Block/Emoticons/code-points.js');
require('unicode-9.0.0/Block/Emoticons/symbols.js');
require('unicode-9.0.0/Block/Emoticons/regex.js');

require('unicode-9.0.0/Block/Enclosed_Alphanumeric_Supplement/code-points.js');
require('unicode-9.0.0/Block/Enclosed_Alphanumeric_Supplement/symbols.js');
require('unicode-9.0.0/Block/Enclosed_Alphanumeric_Supplement/regex.js');

require('unicode-9.0.0/Block/Enclosed_Alphanumerics/code-points.js');
require('unicode-9.0.0/Block/Enclosed_Alphanumerics/symbols.js');
require('unicode-9.0.0/Block/Enclosed_Alphanumerics/regex.js');

require('unicode-9.0.0/Block/Enclosed_CJK_Letters_And_Months/code-points.js');
require('unicode-9.0.0/Block/Enclosed_CJK_Letters_And_Months/symbols.js');
require('unicode-9.0.0/Block/Enclosed_CJK_Letters_And_Months/regex.js');

require('unicode-9.0.0/Block/Enclosed_Ideographic_Supplement/code-points.js');
require('unicode-9.0.0/Block/Enclosed_Ideographic_Supplement/symbols.js');
require('unicode-9.0.0/Block/Enclosed_Ideographic_Supplement/regex.js');

require('unicode-9.0.0/Block/Ethiopic/code-points.js');
require('unicode-9.0.0/Block/Ethiopic/symbols.js');
require('unicode-9.0.0/Block/Ethiopic/regex.js');

require('unicode-9.0.0/Block/Ethiopic_Extended/code-points.js');
require('unicode-9.0.0/Block/Ethiopic_Extended/symbols.js');
require('unicode-9.0.0/Block/Ethiopic_Extended/regex.js');

require('unicode-9.0.0/Block/Ethiopic_Extended_A/code-points.js');
require('unicode-9.0.0/Block/Ethiopic_Extended_A/symbols.js');
require('unicode-9.0.0/Block/Ethiopic_Extended_A/regex.js');

require('unicode-9.0.0/Block/Ethiopic_Supplement/code-points.js');
require('unicode-9.0.0/Block/Ethiopic_Supplement/symbols.js');
require('unicode-9.0.0/Block/Ethiopic_Supplement/regex.js');

require('unicode-9.0.0/Block/General_Punctuation/code-points.js');
require('unicode-9.0.0/Block/General_Punctuation/symbols.js');
require('unicode-9.0.0/Block/General_Punctuation/regex.js');

require('unicode-9.0.0/Block/Geometric_Shapes/code-points.js');
require('unicode-9.0.0/Block/Geometric_Shapes/symbols.js');
require('unicode-9.0.0/Block/Geometric_Shapes/regex.js');

require('unicode-9.0.0/Block/Geometric_Shapes_Extended/code-points.js');
require('unicode-9.0.0/Block/Geometric_Shapes_Extended/symbols.js');
require('unicode-9.0.0/Block/Geometric_Shapes_Extended/regex.js');

require('unicode-9.0.0/Block/Georgian/code-points.js');
require('unicode-9.0.0/Block/Georgian/symbols.js');
require('unicode-9.0.0/Block/Georgian/regex.js');

require('unicode-9.0.0/Block/Georgian_Supplement/code-points.js');
require('unicode-9.0.0/Block/Georgian_Supplement/symbols.js');
require('unicode-9.0.0/Block/Georgian_Supplement/regex.js');

require('unicode-9.0.0/Block/Glagolitic/code-points.js');
require('unicode-9.0.0/Block/Glagolitic/symbols.js');
require('unicode-9.0.0/Block/Glagolitic/regex.js');

require('unicode-9.0.0/Block/Glagolitic_Supplement/code-points.js');
require('unicode-9.0.0/Block/Glagolitic_Supplement/symbols.js');
require('unicode-9.0.0/Block/Glagolitic_Supplement/regex.js');

require('unicode-9.0.0/Block/Gothic/code-points.js');
require('unicode-9.0.0/Block/Gothic/symbols.js');
require('unicode-9.0.0/Block/Gothic/regex.js');

require('unicode-9.0.0/Block/Grantha/code-points.js');
require('unicode-9.0.0/Block/Grantha/symbols.js');
require('unicode-9.0.0/Block/Grantha/regex.js');

require('unicode-9.0.0/Block/Greek_And_Coptic/code-points.js');
require('unicode-9.0.0/Block/Greek_And_Coptic/symbols.js');
require('unicode-9.0.0/Block/Greek_And_Coptic/regex.js');

require('unicode-9.0.0/Block/Greek_Extended/code-points.js');
require('unicode-9.0.0/Block/Greek_Extended/symbols.js');
require('unicode-9.0.0/Block/Greek_Extended/regex.js');

require('unicode-9.0.0/Block/Gujarati/code-points.js');
require('unicode-9.0.0/Block/Gujarati/symbols.js');
require('unicode-9.0.0/Block/Gujarati/regex.js');

require('unicode-9.0.0/Block/Gurmukhi/code-points.js');
require('unicode-9.0.0/Block/Gurmukhi/symbols.js');
require('unicode-9.0.0/Block/Gurmukhi/regex.js');

require('unicode-9.0.0/Block/Halfwidth_And_Fullwidth_Forms/code-points.js');
require('unicode-9.0.0/Block/Halfwidth_And_Fullwidth_Forms/symbols.js');
require('unicode-9.0.0/Block/Halfwidth_And_Fullwidth_Forms/regex.js');

require('unicode-9.0.0/Block/Hangul_Compatibility_Jamo/code-points.js');
require('unicode-9.0.0/Block/Hangul_Compatibility_Jamo/symbols.js');
require('unicode-9.0.0/Block/Hangul_Compatibility_Jamo/regex.js');

require('unicode-9.0.0/Block/Hangul_Jamo/code-points.js');
require('unicode-9.0.0/Block/Hangul_Jamo/symbols.js');
require('unicode-9.0.0/Block/Hangul_Jamo/regex.js');

require('unicode-9.0.0/Block/Hangul_Jamo_Extended_A/code-points.js');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_A/symbols.js');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_A/regex.js');

require('unicode-9.0.0/Block/Hangul_Jamo_Extended_B/code-points.js');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_B/symbols.js');
require('unicode-9.0.0/Block/Hangul_Jamo_Extended_B/regex.js');

require('unicode-9.0.0/Block/Hangul_Syllables/code-points.js');
require('unicode-9.0.0/Block/Hangul_Syllables/symbols.js');
require('unicode-9.0.0/Block/Hangul_Syllables/regex.js');

require('unicode-9.0.0/Block/Hanunoo/code-points.js');
require('unicode-9.0.0/Block/Hanunoo/symbols.js');
require('unicode-9.0.0/Block/Hanunoo/regex.js');

require('unicode-9.0.0/Block/Hatran/code-points.js');
require('unicode-9.0.0/Block/Hatran/symbols.js');
require('unicode-9.0.0/Block/Hatran/regex.js');

require('unicode-9.0.0/Block/Hebrew/code-points.js');
require('unicode-9.0.0/Block/Hebrew/symbols.js');
require('unicode-9.0.0/Block/Hebrew/regex.js');

require('unicode-9.0.0/Block/High_Private_Use_Surrogates/code-points.js');
require('unicode-9.0.0/Block/High_Private_Use_Surrogates/symbols.js');
require('unicode-9.0.0/Block/High_Private_Use_Surrogates/regex.js');

require('unicode-9.0.0/Block/High_Surrogates/code-points.js');
require('unicode-9.0.0/Block/High_Surrogates/symbols.js');
require('unicode-9.0.0/Block/High_Surrogates/regex.js');

require('unicode-9.0.0/Block/Hiragana/code-points.js');
require('unicode-9.0.0/Block/Hiragana/symbols.js');
require('unicode-9.0.0/Block/Hiragana/regex.js');

require('unicode-9.0.0/Block/IPA_Extensions/code-points.js');
require('unicode-9.0.0/Block/IPA_Extensions/symbols.js');
require('unicode-9.0.0/Block/IPA_Extensions/regex.js');

require('unicode-9.0.0/Block/Ideographic_Description_Characters/code-points.js');
require('unicode-9.0.0/Block/Ideographic_Description_Characters/symbols.js');
require('unicode-9.0.0/Block/Ideographic_Description_Characters/regex.js');

require('unicode-9.0.0/Block/Ideographic_Symbols_And_Punctuation/code-points.js');
require('unicode-9.0.0/Block/Ideographic_Symbols_And_Punctuation/symbols.js');
require('unicode-9.0.0/Block/Ideographic_Symbols_And_Punctuation/regex.js');

require('unicode-9.0.0/Block/Imperial_Aramaic/code-points.js');
require('unicode-9.0.0/Block/Imperial_Aramaic/symbols.js');
require('unicode-9.0.0/Block/Imperial_Aramaic/regex.js');

require('unicode-9.0.0/Block/Inscriptional_Pahlavi/code-points.js');
require('unicode-9.0.0/Block/Inscriptional_Pahlavi/symbols.js');
require('unicode-9.0.0/Block/Inscriptional_Pahlavi/regex.js');

require('unicode-9.0.0/Block/Inscriptional_Parthian/code-points.js');
require('unicode-9.0.0/Block/Inscriptional_Parthian/symbols.js');
require('unicode-9.0.0/Block/Inscriptional_Parthian/regex.js');

require('unicode-9.0.0/Block/Javanese/code-points.js');
require('unicode-9.0.0/Block/Javanese/symbols.js');
require('unicode-9.0.0/Block/Javanese/regex.js');

require('unicode-9.0.0/Block/Kaithi/code-points.js');
require('unicode-9.0.0/Block/Kaithi/symbols.js');
require('unicode-9.0.0/Block/Kaithi/regex.js');

require('unicode-9.0.0/Block/Kana_Supplement/code-points.js');
require('unicode-9.0.0/Block/Kana_Supplement/symbols.js');
require('unicode-9.0.0/Block/Kana_Supplement/regex.js');

require('unicode-9.0.0/Block/Kanbun/code-points.js');
require('unicode-9.0.0/Block/Kanbun/symbols.js');
require('unicode-9.0.0/Block/Kanbun/regex.js');

require('unicode-9.0.0/Block/Kangxi_Radicals/code-points.js');
require('unicode-9.0.0/Block/Kangxi_Radicals/symbols.js');
require('unicode-9.0.0/Block/Kangxi_Radicals/regex.js');

require('unicode-9.0.0/Block/Kannada/code-points.js');
require('unicode-9.0.0/Block/Kannada/symbols.js');
require('unicode-9.0.0/Block/Kannada/regex.js');

require('unicode-9.0.0/Block/Katakana/code-points.js');
require('unicode-9.0.0/Block/Katakana/symbols.js');
require('unicode-9.0.0/Block/Katakana/regex.js');

require('unicode-9.0.0/Block/Katakana_Phonetic_Extensions/code-points.js');
require('unicode-9.0.0/Block/Katakana_Phonetic_Extensions/symbols.js');
require('unicode-9.0.0/Block/Katakana_Phonetic_Extensions/regex.js');

require('unicode-9.0.0/Block/Kayah_Li/code-points.js');
require('unicode-9.0.0/Block/Kayah_Li/symbols.js');
require('unicode-9.0.0/Block/Kayah_Li/regex.js');

require('unicode-9.0.0/Block/Kharoshthi/code-points.js');
require('unicode-9.0.0/Block/Kharoshthi/symbols.js');
require('unicode-9.0.0/Block/Kharoshthi/regex.js');

require('unicode-9.0.0/Block/Khmer/code-points.js');
require('unicode-9.0.0/Block/Khmer/symbols.js');
require('unicode-9.0.0/Block/Khmer/regex.js');

require('unicode-9.0.0/Block/Khmer_Symbols/code-points.js');
require('unicode-9.0.0/Block/Khmer_Symbols/symbols.js');
require('unicode-9.0.0/Block/Khmer_Symbols/regex.js');

require('unicode-9.0.0/Block/Khojki/code-points.js');
require('unicode-9.0.0/Block/Khojki/symbols.js');
require('unicode-9.0.0/Block/Khojki/regex.js');

require('unicode-9.0.0/Block/Khudawadi/code-points.js');
require('unicode-9.0.0/Block/Khudawadi/symbols.js');
require('unicode-9.0.0/Block/Khudawadi/regex.js');

require('unicode-9.0.0/Block/Lao/code-points.js');
require('unicode-9.0.0/Block/Lao/symbols.js');
require('unicode-9.0.0/Block/Lao/regex.js');

require('unicode-9.0.0/Block/Latin_1_Supplement/code-points.js');
require('unicode-9.0.0/Block/Latin_1_Supplement/symbols.js');
require('unicode-9.0.0/Block/Latin_1_Supplement/regex.js');

require('unicode-9.0.0/Block/Latin_Extended_A/code-points.js');
require('unicode-9.0.0/Block/Latin_Extended_A/symbols.js');
require('unicode-9.0.0/Block/Latin_Extended_A/regex.js');

require('unicode-9.0.0/Block/Latin_Extended_Additional/code-points.js');
require('unicode-9.0.0/Block/Latin_Extended_Additional/symbols.js');
require('unicode-9.0.0/Block/Latin_Extended_Additional/regex.js');

require('unicode-9.0.0/Block/Latin_Extended_B/code-points.js');
require('unicode-9.0.0/Block/Latin_Extended_B/symbols.js');
require('unicode-9.0.0/Block/Latin_Extended_B/regex.js');

require('unicode-9.0.0/Block/Latin_Extended_C/code-points.js');
require('unicode-9.0.0/Block/Latin_Extended_C/symbols.js');
require('unicode-9.0.0/Block/Latin_Extended_C/regex.js');

require('unicode-9.0.0/Block/Latin_Extended_D/code-points.js');
require('unicode-9.0.0/Block/Latin_Extended_D/symbols.js');
require('unicode-9.0.0/Block/Latin_Extended_D/regex.js');

require('unicode-9.0.0/Block/Latin_Extended_E/code-points.js');
require('unicode-9.0.0/Block/Latin_Extended_E/symbols.js');
require('unicode-9.0.0/Block/Latin_Extended_E/regex.js');

require('unicode-9.0.0/Block/Lepcha/code-points.js');
require('unicode-9.0.0/Block/Lepcha/symbols.js');
require('unicode-9.0.0/Block/Lepcha/regex.js');

require('unicode-9.0.0/Block/Letterlike_Symbols/code-points.js');
require('unicode-9.0.0/Block/Letterlike_Symbols/symbols.js');
require('unicode-9.0.0/Block/Letterlike_Symbols/regex.js');

require('unicode-9.0.0/Block/Limbu/code-points.js');
require('unicode-9.0.0/Block/Limbu/symbols.js');
require('unicode-9.0.0/Block/Limbu/regex.js');

require('unicode-9.0.0/Block/Linear_A/code-points.js');
require('unicode-9.0.0/Block/Linear_A/symbols.js');
require('unicode-9.0.0/Block/Linear_A/regex.js');

require('unicode-9.0.0/Block/Linear_B_Ideograms/code-points.js');
require('unicode-9.0.0/Block/Linear_B_Ideograms/symbols.js');
require('unicode-9.0.0/Block/Linear_B_Ideograms/regex.js');

require('unicode-9.0.0/Block/Linear_B_Syllabary/code-points.js');
require('unicode-9.0.0/Block/Linear_B_Syllabary/symbols.js');
require('unicode-9.0.0/Block/Linear_B_Syllabary/regex.js');

require('unicode-9.0.0/Block/Lisu/code-points.js');
require('unicode-9.0.0/Block/Lisu/symbols.js');
require('unicode-9.0.0/Block/Lisu/regex.js');

require('unicode-9.0.0/Block/Low_Surrogates/code-points.js');
require('unicode-9.0.0/Block/Low_Surrogates/symbols.js');
require('unicode-9.0.0/Block/Low_Surrogates/regex.js');

require('unicode-9.0.0/Block/Lycian/code-points.js');
require('unicode-9.0.0/Block/Lycian/symbols.js');
require('unicode-9.0.0/Block/Lycian/regex.js');

require('unicode-9.0.0/Block/Lydian/code-points.js');
require('unicode-9.0.0/Block/Lydian/symbols.js');
require('unicode-9.0.0/Block/Lydian/regex.js');

require('unicode-9.0.0/Block/Mahajani/code-points.js');
require('unicode-9.0.0/Block/Mahajani/symbols.js');
require('unicode-9.0.0/Block/Mahajani/regex.js');

require('unicode-9.0.0/Block/Mahjong_Tiles/code-points.js');
require('unicode-9.0.0/Block/Mahjong_Tiles/symbols.js');
require('unicode-9.0.0/Block/Mahjong_Tiles/regex.js');

require('unicode-9.0.0/Block/Malayalam/code-points.js');
require('unicode-9.0.0/Block/Malayalam/symbols.js');
require('unicode-9.0.0/Block/Malayalam/regex.js');

require('unicode-9.0.0/Block/Mandaic/code-points.js');
require('unicode-9.0.0/Block/Mandaic/symbols.js');
require('unicode-9.0.0/Block/Mandaic/regex.js');

require('unicode-9.0.0/Block/Manichaean/code-points.js');
require('unicode-9.0.0/Block/Manichaean/symbols.js');
require('unicode-9.0.0/Block/Manichaean/regex.js');

require('unicode-9.0.0/Block/Marchen/code-points.js');
require('unicode-9.0.0/Block/Marchen/symbols.js');
require('unicode-9.0.0/Block/Marchen/regex.js');

require('unicode-9.0.0/Block/Mathematical_Alphanumeric_Symbols/code-points.js');
require('unicode-9.0.0/Block/Mathematical_Alphanumeric_Symbols/symbols.js');
require('unicode-9.0.0/Block/Mathematical_Alphanumeric_Symbols/regex.js');

require('unicode-9.0.0/Block/Mathematical_Operators/code-points.js');
require('unicode-9.0.0/Block/Mathematical_Operators/symbols.js');
require('unicode-9.0.0/Block/Mathematical_Operators/regex.js');

require('unicode-9.0.0/Block/Meetei_Mayek/code-points.js');
require('unicode-9.0.0/Block/Meetei_Mayek/symbols.js');
require('unicode-9.0.0/Block/Meetei_Mayek/regex.js');

require('unicode-9.0.0/Block/Meetei_Mayek_Extensions/code-points.js');
require('unicode-9.0.0/Block/Meetei_Mayek_Extensions/symbols.js');
require('unicode-9.0.0/Block/Meetei_Mayek_Extensions/regex.js');

require('unicode-9.0.0/Block/Mende_Kikakui/code-points.js');
require('unicode-9.0.0/Block/Mende_Kikakui/symbols.js');
require('unicode-9.0.0/Block/Mende_Kikakui/regex.js');

require('unicode-9.0.0/Block/Meroitic_Cursive/code-points.js');
require('unicode-9.0.0/Block/Meroitic_Cursive/symbols.js');
require('unicode-9.0.0/Block/Meroitic_Cursive/regex.js');

require('unicode-9.0.0/Block/Meroitic_Hieroglyphs/code-points.js');
require('unicode-9.0.0/Block/Meroitic_Hieroglyphs/symbols.js');
require('unicode-9.0.0/Block/Meroitic_Hieroglyphs/regex.js');

require('unicode-9.0.0/Block/Miao/code-points.js');
require('unicode-9.0.0/Block/Miao/symbols.js');
require('unicode-9.0.0/Block/Miao/regex.js');

require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_A/code-points.js');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_A/symbols.js');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_A/regex.js');

require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_B/code-points.js');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_B/symbols.js');
require('unicode-9.0.0/Block/Miscellaneous_Mathematical_Symbols_B/regex.js');

require('unicode-9.0.0/Block/Miscellaneous_Symbols/code-points.js');
require('unicode-9.0.0/Block/Miscellaneous_Symbols/symbols.js');
require('unicode-9.0.0/Block/Miscellaneous_Symbols/regex.js');

require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Arrows/code-points.js');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Arrows/symbols.js');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Arrows/regex.js');

require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Pictographs/code-points.js');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Pictographs/symbols.js');
require('unicode-9.0.0/Block/Miscellaneous_Symbols_And_Pictographs/regex.js');

require('unicode-9.0.0/Block/Miscellaneous_Technical/code-points.js');
require('unicode-9.0.0/Block/Miscellaneous_Technical/symbols.js');
require('unicode-9.0.0/Block/Miscellaneous_Technical/regex.js');

require('unicode-9.0.0/Block/Modi/code-points.js');
require('unicode-9.0.0/Block/Modi/symbols.js');
require('unicode-9.0.0/Block/Modi/regex.js');

require('unicode-9.0.0/Block/Modifier_Tone_Letters/code-points.js');
require('unicode-9.0.0/Block/Modifier_Tone_Letters/symbols.js');
require('unicode-9.0.0/Block/Modifier_Tone_Letters/regex.js');

require('unicode-9.0.0/Block/Mongolian/code-points.js');
require('unicode-9.0.0/Block/Mongolian/symbols.js');
require('unicode-9.0.0/Block/Mongolian/regex.js');

require('unicode-9.0.0/Block/Mongolian_Supplement/code-points.js');
require('unicode-9.0.0/Block/Mongolian_Supplement/symbols.js');
require('unicode-9.0.0/Block/Mongolian_Supplement/regex.js');

require('unicode-9.0.0/Block/Mro/code-points.js');
require('unicode-9.0.0/Block/Mro/symbols.js');
require('unicode-9.0.0/Block/Mro/regex.js');

require('unicode-9.0.0/Block/Multani/code-points.js');
require('unicode-9.0.0/Block/Multani/symbols.js');
require('unicode-9.0.0/Block/Multani/regex.js');

require('unicode-9.0.0/Block/Musical_Symbols/code-points.js');
require('unicode-9.0.0/Block/Musical_Symbols/symbols.js');
require('unicode-9.0.0/Block/Musical_Symbols/regex.js');

require('unicode-9.0.0/Block/Myanmar/code-points.js');
require('unicode-9.0.0/Block/Myanmar/symbols.js');
require('unicode-9.0.0/Block/Myanmar/regex.js');

require('unicode-9.0.0/Block/Myanmar_Extended_A/code-points.js');
require('unicode-9.0.0/Block/Myanmar_Extended_A/symbols.js');
require('unicode-9.0.0/Block/Myanmar_Extended_A/regex.js');

require('unicode-9.0.0/Block/Myanmar_Extended_B/code-points.js');
require('unicode-9.0.0/Block/Myanmar_Extended_B/symbols.js');
require('unicode-9.0.0/Block/Myanmar_Extended_B/regex.js');

require('unicode-9.0.0/Block/NKo/code-points.js');
require('unicode-9.0.0/Block/NKo/symbols.js');
require('unicode-9.0.0/Block/NKo/regex.js');

require('unicode-9.0.0/Block/Nabataean/code-points.js');
require('unicode-9.0.0/Block/Nabataean/symbols.js');
require('unicode-9.0.0/Block/Nabataean/regex.js');

require('unicode-9.0.0/Block/New_Tai_Lue/code-points.js');
require('unicode-9.0.0/Block/New_Tai_Lue/symbols.js');
require('unicode-9.0.0/Block/New_Tai_Lue/regex.js');

require('unicode-9.0.0/Block/Newa/code-points.js');
require('unicode-9.0.0/Block/Newa/symbols.js');
require('unicode-9.0.0/Block/Newa/regex.js');

require('unicode-9.0.0/Block/Number_Forms/code-points.js');
require('unicode-9.0.0/Block/Number_Forms/symbols.js');
require('unicode-9.0.0/Block/Number_Forms/regex.js');

require('unicode-9.0.0/Block/Ogham/code-points.js');
require('unicode-9.0.0/Block/Ogham/symbols.js');
require('unicode-9.0.0/Block/Ogham/regex.js');

require('unicode-9.0.0/Block/Ol_Chiki/code-points.js');
require('unicode-9.0.0/Block/Ol_Chiki/symbols.js');
require('unicode-9.0.0/Block/Ol_Chiki/regex.js');

require('unicode-9.0.0/Block/Old_Hungarian/code-points.js');
require('unicode-9.0.0/Block/Old_Hungarian/symbols.js');
require('unicode-9.0.0/Block/Old_Hungarian/regex.js');

require('unicode-9.0.0/Block/Old_Italic/code-points.js');
require('unicode-9.0.0/Block/Old_Italic/symbols.js');
require('unicode-9.0.0/Block/Old_Italic/regex.js');

require('unicode-9.0.0/Block/Old_North_Arabian/code-points.js');
require('unicode-9.0.0/Block/Old_North_Arabian/symbols.js');
require('unicode-9.0.0/Block/Old_North_Arabian/regex.js');

require('unicode-9.0.0/Block/Old_Permic/code-points.js');
require('unicode-9.0.0/Block/Old_Permic/symbols.js');
require('unicode-9.0.0/Block/Old_Permic/regex.js');

require('unicode-9.0.0/Block/Old_Persian/code-points.js');
require('unicode-9.0.0/Block/Old_Persian/symbols.js');
require('unicode-9.0.0/Block/Old_Persian/regex.js');

require('unicode-9.0.0/Block/Old_South_Arabian/code-points.js');
require('unicode-9.0.0/Block/Old_South_Arabian/symbols.js');
require('unicode-9.0.0/Block/Old_South_Arabian/regex.js');

require('unicode-9.0.0/Block/Old_Turkic/code-points.js');
require('unicode-9.0.0/Block/Old_Turkic/symbols.js');
require('unicode-9.0.0/Block/Old_Turkic/regex.js');

require('unicode-9.0.0/Block/Optical_Character_Recognition/code-points.js');
require('unicode-9.0.0/Block/Optical_Character_Recognition/symbols.js');
require('unicode-9.0.0/Block/Optical_Character_Recognition/regex.js');

require('unicode-9.0.0/Block/Oriya/code-points.js');
require('unicode-9.0.0/Block/Oriya/symbols.js');
require('unicode-9.0.0/Block/Oriya/regex.js');

require('unicode-9.0.0/Block/Ornamental_Dingbats/code-points.js');
require('unicode-9.0.0/Block/Ornamental_Dingbats/symbols.js');
require('unicode-9.0.0/Block/Ornamental_Dingbats/regex.js');

require('unicode-9.0.0/Block/Osage/code-points.js');
require('unicode-9.0.0/Block/Osage/symbols.js');
require('unicode-9.0.0/Block/Osage/regex.js');

require('unicode-9.0.0/Block/Osmanya/code-points.js');
require('unicode-9.0.0/Block/Osmanya/symbols.js');
require('unicode-9.0.0/Block/Osmanya/regex.js');

require('unicode-9.0.0/Block/Pahawh_Hmong/code-points.js');
require('unicode-9.0.0/Block/Pahawh_Hmong/symbols.js');
require('unicode-9.0.0/Block/Pahawh_Hmong/regex.js');

require('unicode-9.0.0/Block/Palmyrene/code-points.js');
require('unicode-9.0.0/Block/Palmyrene/symbols.js');
require('unicode-9.0.0/Block/Palmyrene/regex.js');

require('unicode-9.0.0/Block/Pau_Cin_Hau/code-points.js');
require('unicode-9.0.0/Block/Pau_Cin_Hau/symbols.js');
require('unicode-9.0.0/Block/Pau_Cin_Hau/regex.js');

require('unicode-9.0.0/Block/Phags_Pa/code-points.js');
require('unicode-9.0.0/Block/Phags_Pa/symbols.js');
require('unicode-9.0.0/Block/Phags_Pa/regex.js');

require('unicode-9.0.0/Block/Phaistos_Disc/code-points.js');
require('unicode-9.0.0/Block/Phaistos_Disc/symbols.js');
require('unicode-9.0.0/Block/Phaistos_Disc/regex.js');

require('unicode-9.0.0/Block/Phoenician/code-points.js');
require('unicode-9.0.0/Block/Phoenician/symbols.js');
require('unicode-9.0.0/Block/Phoenician/regex.js');

require('unicode-9.0.0/Block/Phonetic_Extensions/code-points.js');
require('unicode-9.0.0/Block/Phonetic_Extensions/symbols.js');
require('unicode-9.0.0/Block/Phonetic_Extensions/regex.js');

require('unicode-9.0.0/Block/Phonetic_Extensions_Supplement/code-points.js');
require('unicode-9.0.0/Block/Phonetic_Extensions_Supplement/symbols.js');
require('unicode-9.0.0/Block/Phonetic_Extensions_Supplement/regex.js');

require('unicode-9.0.0/Block/Playing_Cards/code-points.js');
require('unicode-9.0.0/Block/Playing_Cards/symbols.js');
require('unicode-9.0.0/Block/Playing_Cards/regex.js');

require('unicode-9.0.0/Block/Private_Use_Area/code-points.js');
require('unicode-9.0.0/Block/Private_Use_Area/symbols.js');
require('unicode-9.0.0/Block/Private_Use_Area/regex.js');

require('unicode-9.0.0/Block/Psalter_Pahlavi/code-points.js');
require('unicode-9.0.0/Block/Psalter_Pahlavi/symbols.js');
require('unicode-9.0.0/Block/Psalter_Pahlavi/regex.js');

require('unicode-9.0.0/Block/Rejang/code-points.js');
require('unicode-9.0.0/Block/Rejang/symbols.js');
require('unicode-9.0.0/Block/Rejang/regex.js');

require('unicode-9.0.0/Block/Rumi_Numeral_Symbols/code-points.js');
require('unicode-9.0.0/Block/Rumi_Numeral_Symbols/symbols.js');
require('unicode-9.0.0/Block/Rumi_Numeral_Symbols/regex.js');

require('unicode-9.0.0/Block/Runic/code-points.js');
require('unicode-9.0.0/Block/Runic/symbols.js');
require('unicode-9.0.0/Block/Runic/regex.js');

require('unicode-9.0.0/Block/Samaritan/code-points.js');
require('unicode-9.0.0/Block/Samaritan/symbols.js');
require('unicode-9.0.0/Block/Samaritan/regex.js');

require('unicode-9.0.0/Block/Saurashtra/code-points.js');
require('unicode-9.0.0/Block/Saurashtra/symbols.js');
require('unicode-9.0.0/Block/Saurashtra/regex.js');

require('unicode-9.0.0/Block/Sharada/code-points.js');
require('unicode-9.0.0/Block/Sharada/symbols.js');
require('unicode-9.0.0/Block/Sharada/regex.js');

require('unicode-9.0.0/Block/Shavian/code-points.js');
require('unicode-9.0.0/Block/Shavian/symbols.js');
require('unicode-9.0.0/Block/Shavian/regex.js');

require('unicode-9.0.0/Block/Shorthand_Format_Controls/code-points.js');
require('unicode-9.0.0/Block/Shorthand_Format_Controls/symbols.js');
require('unicode-9.0.0/Block/Shorthand_Format_Controls/regex.js');

require('unicode-9.0.0/Block/Siddham/code-points.js');
require('unicode-9.0.0/Block/Siddham/symbols.js');
require('unicode-9.0.0/Block/Siddham/regex.js');

require('unicode-9.0.0/Block/Sinhala/code-points.js');
require('unicode-9.0.0/Block/Sinhala/symbols.js');
require('unicode-9.0.0/Block/Sinhala/regex.js');

require('unicode-9.0.0/Block/Sinhala_Archaic_Numbers/code-points.js');
require('unicode-9.0.0/Block/Sinhala_Archaic_Numbers/symbols.js');
require('unicode-9.0.0/Block/Sinhala_Archaic_Numbers/regex.js');

require('unicode-9.0.0/Block/Small_Form_Variants/code-points.js');
require('unicode-9.0.0/Block/Small_Form_Variants/symbols.js');
require('unicode-9.0.0/Block/Small_Form_Variants/regex.js');

require('unicode-9.0.0/Block/Sora_Sompeng/code-points.js');
require('unicode-9.0.0/Block/Sora_Sompeng/symbols.js');
require('unicode-9.0.0/Block/Sora_Sompeng/regex.js');

require('unicode-9.0.0/Block/Spacing_Modifier_Letters/code-points.js');
require('unicode-9.0.0/Block/Spacing_Modifier_Letters/symbols.js');
require('unicode-9.0.0/Block/Spacing_Modifier_Letters/regex.js');

require('unicode-9.0.0/Block/Specials/code-points.js');
require('unicode-9.0.0/Block/Specials/symbols.js');
require('unicode-9.0.0/Block/Specials/regex.js');

require('unicode-9.0.0/Block/Sundanese/code-points.js');
require('unicode-9.0.0/Block/Sundanese/symbols.js');
require('unicode-9.0.0/Block/Sundanese/regex.js');

require('unicode-9.0.0/Block/Sundanese_Supplement/code-points.js');
require('unicode-9.0.0/Block/Sundanese_Supplement/symbols.js');
require('unicode-9.0.0/Block/Sundanese_Supplement/regex.js');

require('unicode-9.0.0/Block/Superscripts_And_Subscripts/code-points.js');
require('unicode-9.0.0/Block/Superscripts_And_Subscripts/symbols.js');
require('unicode-9.0.0/Block/Superscripts_And_Subscripts/regex.js');

require('unicode-9.0.0/Block/Supplemental_Arrows_A/code-points.js');
require('unicode-9.0.0/Block/Supplemental_Arrows_A/symbols.js');
require('unicode-9.0.0/Block/Supplemental_Arrows_A/regex.js');

require('unicode-9.0.0/Block/Supplemental_Arrows_B/code-points.js');
require('unicode-9.0.0/Block/Supplemental_Arrows_B/symbols.js');
require('unicode-9.0.0/Block/Supplemental_Arrows_B/regex.js');

require('unicode-9.0.0/Block/Supplemental_Arrows_C/code-points.js');
require('unicode-9.0.0/Block/Supplemental_Arrows_C/symbols.js');
require('unicode-9.0.0/Block/Supplemental_Arrows_C/regex.js');

require('unicode-9.0.0/Block/Supplemental_Mathematical_Operators/code-points.js');
require('unicode-9.0.0/Block/Supplemental_Mathematical_Operators/symbols.js');
require('unicode-9.0.0/Block/Supplemental_Mathematical_Operators/regex.js');

require('unicode-9.0.0/Block/Supplemental_Punctuation/code-points.js');
require('unicode-9.0.0/Block/Supplemental_Punctuation/symbols.js');
require('unicode-9.0.0/Block/Supplemental_Punctuation/regex.js');

require('unicode-9.0.0/Block/Supplemental_Symbols_And_Pictographs/code-points.js');
require('unicode-9.0.0/Block/Supplemental_Symbols_And_Pictographs/symbols.js');
require('unicode-9.0.0/Block/Supplemental_Symbols_And_Pictographs/regex.js');

require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_A/code-points.js');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_A/symbols.js');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_A/regex.js');

require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_B/code-points.js');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_B/symbols.js');
require('unicode-9.0.0/Block/Supplementary_Private_Use_Area_B/regex.js');

require('unicode-9.0.0/Block/Sutton_SignWriting/code-points.js');
require('unicode-9.0.0/Block/Sutton_SignWriting/symbols.js');
require('unicode-9.0.0/Block/Sutton_SignWriting/regex.js');

require('unicode-9.0.0/Block/Syloti_Nagri/code-points.js');
require('unicode-9.0.0/Block/Syloti_Nagri/symbols.js');
require('unicode-9.0.0/Block/Syloti_Nagri/regex.js');

require('unicode-9.0.0/Block/Syriac/code-points.js');
require('unicode-9.0.0/Block/Syriac/symbols.js');
require('unicode-9.0.0/Block/Syriac/regex.js');

require('unicode-9.0.0/Block/Tagalog/code-points.js');
require('unicode-9.0.0/Block/Tagalog/symbols.js');
require('unicode-9.0.0/Block/Tagalog/regex.js');

require('unicode-9.0.0/Block/Tagbanwa/code-points.js');
require('unicode-9.0.0/Block/Tagbanwa/symbols.js');
require('unicode-9.0.0/Block/Tagbanwa/regex.js');

require('unicode-9.0.0/Block/Tags/code-points.js');
require('unicode-9.0.0/Block/Tags/symbols.js');
require('unicode-9.0.0/Block/Tags/regex.js');

require('unicode-9.0.0/Block/Tai_Le/code-points.js');
require('unicode-9.0.0/Block/Tai_Le/symbols.js');
require('unicode-9.0.0/Block/Tai_Le/regex.js');

require('unicode-9.0.0/Block/Tai_Tham/code-points.js');
require('unicode-9.0.0/Block/Tai_Tham/symbols.js');
require('unicode-9.0.0/Block/Tai_Tham/regex.js');

require('unicode-9.0.0/Block/Tai_Viet/code-points.js');
require('unicode-9.0.0/Block/Tai_Viet/symbols.js');
require('unicode-9.0.0/Block/Tai_Viet/regex.js');

require('unicode-9.0.0/Block/Tai_Xuan_Jing_Symbols/code-points.js');
require('unicode-9.0.0/Block/Tai_Xuan_Jing_Symbols/symbols.js');
require('unicode-9.0.0/Block/Tai_Xuan_Jing_Symbols/regex.js');

require('unicode-9.0.0/Block/Takri/code-points.js');
require('unicode-9.0.0/Block/Takri/symbols.js');
require('unicode-9.0.0/Block/Takri/regex.js');

require('unicode-9.0.0/Block/Tamil/code-points.js');
require('unicode-9.0.0/Block/Tamil/symbols.js');
require('unicode-9.0.0/Block/Tamil/regex.js');

require('unicode-9.0.0/Block/Tangut/code-points.js');
require('unicode-9.0.0/Block/Tangut/symbols.js');
require('unicode-9.0.0/Block/Tangut/regex.js');

require('unicode-9.0.0/Block/Tangut_Components/code-points.js');
require('unicode-9.0.0/Block/Tangut_Components/symbols.js');
require('unicode-9.0.0/Block/Tangut_Components/regex.js');

require('unicode-9.0.0/Block/Telugu/code-points.js');
require('unicode-9.0.0/Block/Telugu/symbols.js');
require('unicode-9.0.0/Block/Telugu/regex.js');

require('unicode-9.0.0/Block/Thaana/code-points.js');
require('unicode-9.0.0/Block/Thaana/symbols.js');
require('unicode-9.0.0/Block/Thaana/regex.js');

require('unicode-9.0.0/Block/Thai/code-points.js');
require('unicode-9.0.0/Block/Thai/symbols.js');
require('unicode-9.0.0/Block/Thai/regex.js');

require('unicode-9.0.0/Block/Tibetan/code-points.js');
require('unicode-9.0.0/Block/Tibetan/symbols.js');
require('unicode-9.0.0/Block/Tibetan/regex.js');

require('unicode-9.0.0/Block/Tifinagh/code-points.js');
require('unicode-9.0.0/Block/Tifinagh/symbols.js');
require('unicode-9.0.0/Block/Tifinagh/regex.js');

require('unicode-9.0.0/Block/Tirhuta/code-points.js');
require('unicode-9.0.0/Block/Tirhuta/symbols.js');
require('unicode-9.0.0/Block/Tirhuta/regex.js');

require('unicode-9.0.0/Block/Transport_And_Map_Symbols/code-points.js');
require('unicode-9.0.0/Block/Transport_And_Map_Symbols/symbols.js');
require('unicode-9.0.0/Block/Transport_And_Map_Symbols/regex.js');

require('unicode-9.0.0/Block/Ugaritic/code-points.js');
require('unicode-9.0.0/Block/Ugaritic/symbols.js');
require('unicode-9.0.0/Block/Ugaritic/regex.js');

require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics/code-points.js');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics/symbols.js');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics/regex.js');

require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/code-points.js');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/symbols.js');
require('unicode-9.0.0/Block/Unified_Canadian_Aboriginal_Syllabics_Extended/regex.js');

require('unicode-9.0.0/Block/Vai/code-points.js');
require('unicode-9.0.0/Block/Vai/symbols.js');
require('unicode-9.0.0/Block/Vai/regex.js');

require('unicode-9.0.0/Block/Variation_Selectors/code-points.js');
require('unicode-9.0.0/Block/Variation_Selectors/symbols.js');
require('unicode-9.0.0/Block/Variation_Selectors/regex.js');

require('unicode-9.0.0/Block/Variation_Selectors_Supplement/code-points.js');
require('unicode-9.0.0/Block/Variation_Selectors_Supplement/symbols.js');
require('unicode-9.0.0/Block/Variation_Selectors_Supplement/regex.js');

require('unicode-9.0.0/Block/Vedic_Extensions/code-points.js');
require('unicode-9.0.0/Block/Vedic_Extensions/symbols.js');
require('unicode-9.0.0/Block/Vedic_Extensions/regex.js');

require('unicode-9.0.0/Block/Vertical_Forms/code-points.js');
require('unicode-9.0.0/Block/Vertical_Forms/symbols.js');
require('unicode-9.0.0/Block/Vertical_Forms/regex.js');

require('unicode-9.0.0/Block/Warang_Citi/code-points.js');
require('unicode-9.0.0/Block/Warang_Citi/symbols.js');
require('unicode-9.0.0/Block/Warang_Citi/regex.js');

require('unicode-9.0.0/Block/Yi_Radicals/code-points.js');
require('unicode-9.0.0/Block/Yi_Radicals/symbols.js');
require('unicode-9.0.0/Block/Yi_Radicals/regex.js');

require('unicode-9.0.0/Block/Yi_Syllables/code-points.js');
require('unicode-9.0.0/Block/Yi_Syllables/symbols.js');
require('unicode-9.0.0/Block/Yi_Syllables/regex.js');

require('unicode-9.0.0/Block/Yijing_Hexagram_Symbols/code-points.js');
require('unicode-9.0.0/Block/Yijing_Hexagram_Symbols/symbols.js');
require('unicode-9.0.0/Block/Yijing_Hexagram_Symbols/regex.js');

// `Bidi_Mirroring_Glyph`:

require('unicode-9.0.0/Bidi_Mirroring_Glyph').get(codePoint); // lookup map

// `Bidi_Paired_Bracket_Type`:

require('unicode-9.0.0/Bidi_Paired_Bracket_Type').get(codePoint); // lookup map

require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Close/code-points.js');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Close/symbols.js');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Close/regex.js');

require('unicode-9.0.0/Bidi_Paired_Bracket_Type/None/code-points.js');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/None/symbols.js');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/None/regex.js');

require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/code-points.js');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/symbols.js');
require('unicode-9.0.0/Bidi_Paired_Bracket_Type/Open/regex.js');

// `Line_Break`:

require('unicode-9.0.0/Line_Break/Alphabetic/code-points.js');
require('unicode-9.0.0/Line_Break/Alphabetic/symbols.js');
require('unicode-9.0.0/Line_Break/Alphabetic/regex.js');

require('unicode-9.0.0/Line_Break/Ambiguous/code-points.js');
require('unicode-9.0.0/Line_Break/Ambiguous/symbols.js');
require('unicode-9.0.0/Line_Break/Ambiguous/regex.js');

require('unicode-9.0.0/Line_Break/Break_After/code-points.js');
require('unicode-9.0.0/Line_Break/Break_After/symbols.js');
require('unicode-9.0.0/Line_Break/Break_After/regex.js');

require('unicode-9.0.0/Line_Break/Break_Before/code-points.js');
require('unicode-9.0.0/Line_Break/Break_Before/symbols.js');
require('unicode-9.0.0/Line_Break/Break_Before/regex.js');

require('unicode-9.0.0/Line_Break/Break_Both/code-points.js');
require('unicode-9.0.0/Line_Break/Break_Both/symbols.js');
require('unicode-9.0.0/Line_Break/Break_Both/regex.js');

require('unicode-9.0.0/Line_Break/Break_Symbols/code-points.js');
require('unicode-9.0.0/Line_Break/Break_Symbols/symbols.js');
require('unicode-9.0.0/Line_Break/Break_Symbols/regex.js');

require('unicode-9.0.0/Line_Break/Carriage_Return/code-points.js');
require('unicode-9.0.0/Line_Break/Carriage_Return/symbols.js');
require('unicode-9.0.0/Line_Break/Carriage_Return/regex.js');

require('unicode-9.0.0/Line_Break/Close_Parenthesis/code-points.js');
require('unicode-9.0.0/Line_Break/Close_Parenthesis/symbols.js');
require('unicode-9.0.0/Line_Break/Close_Parenthesis/regex.js');

require('unicode-9.0.0/Line_Break/Close_Punctuation/code-points.js');
require('unicode-9.0.0/Line_Break/Close_Punctuation/symbols.js');
require('unicode-9.0.0/Line_Break/Close_Punctuation/regex.js');

require('unicode-9.0.0/Line_Break/Combining_Mark/code-points.js');
require('unicode-9.0.0/Line_Break/Combining_Mark/symbols.js');
require('unicode-9.0.0/Line_Break/Combining_Mark/regex.js');

require('unicode-9.0.0/Line_Break/Complex_Context/code-points.js');
require('unicode-9.0.0/Line_Break/Complex_Context/symbols.js');
require('unicode-9.0.0/Line_Break/Complex_Context/regex.js');

require('unicode-9.0.0/Line_Break/Conditional_Japanese_Starter/code-points.js');
require('unicode-9.0.0/Line_Break/Conditional_Japanese_Starter/symbols.js');
require('unicode-9.0.0/Line_Break/Conditional_Japanese_Starter/regex.js');

require('unicode-9.0.0/Line_Break/Contingent_Break/code-points.js');
require('unicode-9.0.0/Line_Break/Contingent_Break/symbols.js');
require('unicode-9.0.0/Line_Break/Contingent_Break/regex.js');

require('unicode-9.0.0/Line_Break/E_Base/code-points.js');
require('unicode-9.0.0/Line_Break/E_Base/symbols.js');
require('unicode-9.0.0/Line_Break/E_Base/regex.js');

require('unicode-9.0.0/Line_Break/E_Modifier/code-points.js');
require('unicode-9.0.0/Line_Break/E_Modifier/symbols.js');
require('unicode-9.0.0/Line_Break/E_Modifier/regex.js');

require('unicode-9.0.0/Line_Break/Exclamation/code-points.js');
require('unicode-9.0.0/Line_Break/Exclamation/symbols.js');
require('unicode-9.0.0/Line_Break/Exclamation/regex.js');

require('unicode-9.0.0/Line_Break/Glue/code-points.js');
require('unicode-9.0.0/Line_Break/Glue/symbols.js');
require('unicode-9.0.0/Line_Break/Glue/regex.js');

require('unicode-9.0.0/Line_Break/H2/code-points.js');
require('unicode-9.0.0/Line_Break/H2/symbols.js');
require('unicode-9.0.0/Line_Break/H2/regex.js');

require('unicode-9.0.0/Line_Break/H3/code-points.js');
require('unicode-9.0.0/Line_Break/H3/symbols.js');
require('unicode-9.0.0/Line_Break/H3/regex.js');

require('unicode-9.0.0/Line_Break/Hebrew_Letter/code-points.js');
require('unicode-9.0.0/Line_Break/Hebrew_Letter/symbols.js');
require('unicode-9.0.0/Line_Break/Hebrew_Letter/regex.js');

require('unicode-9.0.0/Line_Break/Hyphen/code-points.js');
require('unicode-9.0.0/Line_Break/Hyphen/symbols.js');
require('unicode-9.0.0/Line_Break/Hyphen/regex.js');

require('unicode-9.0.0/Line_Break/Ideographic/code-points.js');
require('unicode-9.0.0/Line_Break/Ideographic/symbols.js');
require('unicode-9.0.0/Line_Break/Ideographic/regex.js');

require('unicode-9.0.0/Line_Break/Infix_Numeric/code-points.js');
require('unicode-9.0.0/Line_Break/Infix_Numeric/symbols.js');
require('unicode-9.0.0/Line_Break/Infix_Numeric/regex.js');

require('unicode-9.0.0/Line_Break/Inseparable/code-points.js');
require('unicode-9.0.0/Line_Break/Inseparable/symbols.js');
require('unicode-9.0.0/Line_Break/Inseparable/regex.js');

require('unicode-9.0.0/Line_Break/JL/code-points.js');
require('unicode-9.0.0/Line_Break/JL/symbols.js');
require('unicode-9.0.0/Line_Break/JL/regex.js');

require('unicode-9.0.0/Line_Break/JT/code-points.js');
require('unicode-9.0.0/Line_Break/JT/symbols.js');
require('unicode-9.0.0/Line_Break/JT/regex.js');

require('unicode-9.0.0/Line_Break/JV/code-points.js');
require('unicode-9.0.0/Line_Break/JV/symbols.js');
require('unicode-9.0.0/Line_Break/JV/regex.js');

require('unicode-9.0.0/Line_Break/Line_Feed/code-points.js');
require('unicode-9.0.0/Line_Break/Line_Feed/symbols.js');
require('unicode-9.0.0/Line_Break/Line_Feed/regex.js');

require('unicode-9.0.0/Line_Break/Mandatory_Break/code-points.js');
require('unicode-9.0.0/Line_Break/Mandatory_Break/symbols.js');
require('unicode-9.0.0/Line_Break/Mandatory_Break/regex.js');

require('unicode-9.0.0/Line_Break/Next_Line/code-points.js');
require('unicode-9.0.0/Line_Break/Next_Line/symbols.js');
require('unicode-9.0.0/Line_Break/Next_Line/regex.js');

require('unicode-9.0.0/Line_Break/Nonstarter/code-points.js');
require('unicode-9.0.0/Line_Break/Nonstarter/symbols.js');
require('unicode-9.0.0/Line_Break/Nonstarter/regex.js');

require('unicode-9.0.0/Line_Break/Numeric/code-points.js');
require('unicode-9.0.0/Line_Break/Numeric/symbols.js');
require('unicode-9.0.0/Line_Break/Numeric/regex.js');

require('unicode-9.0.0/Line_Break/Open_Punctuation/code-points.js');
require('unicode-9.0.0/Line_Break/Open_Punctuation/symbols.js');
require('unicode-9.0.0/Line_Break/Open_Punctuation/regex.js');

require('unicode-9.0.0/Line_Break/Postfix_Numeric/code-points.js');
require('unicode-9.0.0/Line_Break/Postfix_Numeric/symbols.js');
require('unicode-9.0.0/Line_Break/Postfix_Numeric/regex.js');

require('unicode-9.0.0/Line_Break/Prefix_Numeric/code-points.js');
require('unicode-9.0.0/Line_Break/Prefix_Numeric/symbols.js');
require('unicode-9.0.0/Line_Break/Prefix_Numeric/regex.js');

require('unicode-9.0.0/Line_Break/Quotation/code-points.js');
require('unicode-9.0.0/Line_Break/Quotation/symbols.js');
require('unicode-9.0.0/Line_Break/Quotation/regex.js');

require('unicode-9.0.0/Line_Break/Regional_Indicator/code-points.js');
require('unicode-9.0.0/Line_Break/Regional_Indicator/symbols.js');
require('unicode-9.0.0/Line_Break/Regional_Indicator/regex.js');

require('unicode-9.0.0/Line_Break/Space/code-points.js');
require('unicode-9.0.0/Line_Break/Space/symbols.js');
require('unicode-9.0.0/Line_Break/Space/regex.js');

require('unicode-9.0.0/Line_Break/Surrogate/code-points.js');
require('unicode-9.0.0/Line_Break/Surrogate/symbols.js');
require('unicode-9.0.0/Line_Break/Surrogate/regex.js');

require('unicode-9.0.0/Line_Break/Unknown/code-points.js');
require('unicode-9.0.0/Line_Break/Unknown/symbols.js');
require('unicode-9.0.0/Line_Break/Unknown/regex.js');

require('unicode-9.0.0/Line_Break/Word_Joiner/code-points.js');
require('unicode-9.0.0/Line_Break/Word_Joiner/symbols.js');
require('unicode-9.0.0/Line_Break/Word_Joiner/regex.js');

require('unicode-9.0.0/Line_Break/ZWJ/code-points.js');
require('unicode-9.0.0/Line_Break/ZWJ/symbols.js');
require('unicode-9.0.0/Line_Break/ZWJ/regex.js');

require('unicode-9.0.0/Line_Break/ZWSpace/code-points.js');
require('unicode-9.0.0/Line_Break/ZWSpace/symbols.js');
require('unicode-9.0.0/Line_Break/ZWSpace/regex.js');

// `Word_Break`:

require('unicode-9.0.0/Word_Break/ALetter/code-points.js');
require('unicode-9.0.0/Word_Break/ALetter/symbols.js');
require('unicode-9.0.0/Word_Break/ALetter/regex.js');

require('unicode-9.0.0/Word_Break/CR/code-points.js');
require('unicode-9.0.0/Word_Break/CR/symbols.js');
require('unicode-9.0.0/Word_Break/CR/regex.js');

require('unicode-9.0.0/Word_Break/Double_Quote/code-points.js');
require('unicode-9.0.0/Word_Break/Double_Quote/symbols.js');
require('unicode-9.0.0/Word_Break/Double_Quote/regex.js');

require('unicode-9.0.0/Word_Break/E_Base/code-points.js');
require('unicode-9.0.0/Word_Break/E_Base/symbols.js');
require('unicode-9.0.0/Word_Break/E_Base/regex.js');

require('unicode-9.0.0/Word_Break/E_Base_GAZ/code-points.js');
require('unicode-9.0.0/Word_Break/E_Base_GAZ/symbols.js');
require('unicode-9.0.0/Word_Break/E_Base_GAZ/regex.js');

require('unicode-9.0.0/Word_Break/E_Modifier/code-points.js');
require('unicode-9.0.0/Word_Break/E_Modifier/symbols.js');
require('unicode-9.0.0/Word_Break/E_Modifier/regex.js');

require('unicode-9.0.0/Word_Break/Extend/code-points.js');
require('unicode-9.0.0/Word_Break/Extend/symbols.js');
require('unicode-9.0.0/Word_Break/Extend/regex.js');

require('unicode-9.0.0/Word_Break/ExtendNumLet/code-points.js');
require('unicode-9.0.0/Word_Break/ExtendNumLet/symbols.js');
require('unicode-9.0.0/Word_Break/ExtendNumLet/regex.js');

require('unicode-9.0.0/Word_Break/Format/code-points.js');
require('unicode-9.0.0/Word_Break/Format/symbols.js');
require('unicode-9.0.0/Word_Break/Format/regex.js');

require('unicode-9.0.0/Word_Break/Glue_After_Zwj/code-points.js');
require('unicode-9.0.0/Word_Break/Glue_After_Zwj/symbols.js');
require('unicode-9.0.0/Word_Break/Glue_After_Zwj/regex.js');

require('unicode-9.0.0/Word_Break/Hebrew_Letter/code-points.js');
require('unicode-9.0.0/Word_Break/Hebrew_Letter/symbols.js');
require('unicode-9.0.0/Word_Break/Hebrew_Letter/regex.js');

require('unicode-9.0.0/Word_Break/Katakana/code-points.js');
require('unicode-9.0.0/Word_Break/Katakana/symbols.js');
require('unicode-9.0.0/Word_Break/Katakana/regex.js');

require('unicode-9.0.0/Word_Break/LF/code-points.js');
require('unicode-9.0.0/Word_Break/LF/symbols.js');
require('unicode-9.0.0/Word_Break/LF/regex.js');

require('unicode-9.0.0/Word_Break/MidLetter/code-points.js');
require('unicode-9.0.0/Word_Break/MidLetter/symbols.js');
require('unicode-9.0.0/Word_Break/MidLetter/regex.js');

require('unicode-9.0.0/Word_Break/MidNum/code-points.js');
require('unicode-9.0.0/Word_Break/MidNum/symbols.js');
require('unicode-9.0.0/Word_Break/MidNum/regex.js');

require('unicode-9.0.0/Word_Break/MidNumLet/code-points.js');
require('unicode-9.0.0/Word_Break/MidNumLet/symbols.js');
require('unicode-9.0.0/Word_Break/MidNumLet/regex.js');

require('unicode-9.0.0/Word_Break/Newline/code-points.js');
require('unicode-9.0.0/Word_Break/Newline/symbols.js');
require('unicode-9.0.0/Word_Break/Newline/regex.js');

require('unicode-9.0.0/Word_Break/Numeric/code-points.js');
require('unicode-9.0.0/Word_Break/Numeric/symbols.js');
require('unicode-9.0.0/Word_Break/Numeric/regex.js');

require('unicode-9.0.0/Word_Break/Other/code-points.js');
require('unicode-9.0.0/Word_Break/Other/symbols.js');
require('unicode-9.0.0/Word_Break/Other/regex.js');

require('unicode-9.0.0/Word_Break/Regional_Indicator/code-points.js');
require('unicode-9.0.0/Word_Break/Regional_Indicator/symbols.js');
require('unicode-9.0.0/Word_Break/Regional_Indicator/regex.js');

require('unicode-9.0.0/Word_Break/Single_Quote/code-points.js');
require('unicode-9.0.0/Word_Break/Single_Quote/symbols.js');
require('unicode-9.0.0/Word_Break/Single_Quote/regex.js');

require('unicode-9.0.0/Word_Break/ZWJ/code-points.js');
require('unicode-9.0.0/Word_Break/ZWJ/symbols.js');
require('unicode-9.0.0/Word_Break/ZWJ/regex.js');
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This module is available under the [MIT](https://mths.be/mit) license.
