# Unicode v<%= version %> data [![@unicode/unicode-<%= version %> on npm](https://img.shields.io/npm/v/@unicode/unicode-<%= version %>)](https://www.npmjs.com/package/@unicode/unicode-<%= version %>)

JavaScript-compatible Unicode data for use in Node.js. Included: arrays of code points, arrays of symbols, and regular expressions for Unicode v<%= version %>’s categories, scripts, script extensions, blocks, and properties, as well as bidi mirroring and case folding data.

The data files in this module are generated as part of the [node-unicode-data](https://mths.be/node-unicode-data) project. **Please report any bugs or requests [in the appropriate issue tracker](https://github.com/node-unicode/node-unicode-data/issues).**

## Installation

```bash
npm install @unicode/unicode-<%= version %> --save-dev
```

**Note:** _@unicode/unicode-<%= version %>_ is supposed to be used in build scripts (i.e. as a `devDependency`), and not at runtime (i.e. as a regular `dependency`).

## Regular expressions

The Unicode data modules ship with pre-compiled regular expressions for categories, scripts, script extensions, blocks, and properties. But maybe you want to create a single regular expression that combines several categories, scripts, etc. In that case, [***you should use Regenerate***](https://mths.be/regenerate). For example, to construct a regex that matches all symbols in the Arabic and Greek scripts as per Unicode v6.3.0:

```js
import regenerate from 'regenerate';
import arabic from '@unicode/unicode-6.3.0/Script_Extensions/Arabic/code-points.mjs'; // Or `…/symbols`, doesn’t matter.
import greek from '@unicode/unicode-6.3.0/Script_Extensions/Greek/code-points.mjs'; // Or `…/symbols`, doesn’t matter.
const set = regenerate()
  .add(arabic)
  .add(greek);
console.log(set.toString());
// Then you might want to use a template like this to write the result to a file, along with any regex flags you might need:
// const regex = /<%= regenerateExample %>/gim;
```

## Usage

```js
// Get an array of code points in a given Unicode category:
import uppercaseLetterCodePoints from '@unicode/unicode-<%= version %>/General_Category/Uppercase_Letter/code-points.mjs';
// Get an array of symbols (strings) in a given Unicode category:
import uppercaseLetterSymbols from '@unicode/unicode-<%= version %>/General_Category/Uppercase_Letter/symbols.mjs';
// Get a regular expression that matches any symbol in a given Unicode category:
import uppercaseLetterRegex from '@unicode/unicode-<%= version %>/General_Category/Uppercase_Letter/regex.mjs';
// Get the canonical category a given code point belongs to:
// (Note: U+0041 is LATIN CAPITAL LETTER A)
import generalCategory from '@unicode/unicode-<%= version %>/General_Category/index.mjs';
const category = generalCategory.get(0x41);
// Get an array of all code points with a given bidi class:
import otherNeutralCodePoints from '@unicode/unicode-<%= version %>/Bidi_Class/Other_Neutral/code-points.mjs';
// Get a map from code points to bidi classes:
import bidiClassMap from '@unicode/unicode-<%= version %>/Bidi_Class/index.mjs';
// Get the directionality of a given code point:
const directionality = bidiClassMap.get(0x41);
<% if (Object.hasOwn(dirs, 'Bidi_Mirroring_Glyph')) { %>
// What glyph is the mirror image of `«` (U+00AB)?
import bidiMirroringGlyph from '@unicode/unicode-<%= version %>/Bidi_Mirroring_Glyph/index.mjs';
const mirrored = bidiMirroringGlyph.get(0xAB);
<% } if (Object.hasOwn(dirs, 'Bidi_Paired_Bracket_Type')) { %>
// Get a regular expression that matches all opening brackets:
import openingBrackets from '@unicode/unicode-<%= version %>/Bidi_Paired_Bracket_Type/Open/regex.mjs';
<% } %>
// …you get the idea.
```

Other than categories, data on Unicode properties, blocks, scripts, and script extensions is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v<%= version %>:

```js
// `Names`:

import names from '@unicode/unicode-<%= version %>/Names/index.mjs'; // Array of canonical names.
<% dirs.Names.forEach(function(subdir) { %>import <%= subdir %> from '@unicode/unicode-<%= version %>/Names/<%= subdir %>/index.mjs'; // Lookup map from code point to aliases.
<% }); %>
<% Object.keys(dirs).forEach(function(type) {
    if (type == 'Names' && !dirs[type].subType) { return; }
%>
// `<%= type %>`:
<%
	if (/^(?:Bidi_Class|Bidi_Paired_Bracket_Type|Bidi_Mirroring_Glyph|General_Category)$/.test(type)) {
%>
import <%= type %> from '@unicode/unicode-<%= version %>/<%= type %>/index.mjs'; // Lookup map.
<%
	}
	dirs[type].forEach(function(dir) {
		if ('Case_Folding' == type || 'Simple_Case_Mapping' == type || 'Special_Casing' == type) {
%>
import <%= dir %>CodePoints from '@unicode/unicode-<%= version %>/<%= type %>/<%= dir %>/code-points.mjs'; // Lookup map from code point to code point or array of code points.
import <%= dir %>Symbols from '@unicode/unicode-<%= version %>/<%= type %>/<%= dir %>/symbols.mjs'; // Lookup map from symbol to symbol(s).
<%
		} else if ('Sequence_Property' == type) {
%>
import <%= dir %> from '@unicode/unicode-<%= version %>/<%= type %>/<%= dir %>/index.mjs'; // Array containing a string for each sequence.
<%
		} else {
%>
import <%= dir %>CodePoints from '@unicode/unicode-<%= version %>/<%= type %>/<%= dir %>/code-points.mjs';
import <%= dir %>Symbols from '@unicode/unicode-<%= version %>/<%= type %>/<%= dir %>/symbols.mjs';
import <%= dir %>Regex from '@unicode/unicode-<%= version %>/<%= type %>/<%= dir %>/regex.mjs';
<%
		}
	});
});
%>```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This module is available under the [MIT](https://mths.be/mit) license.
