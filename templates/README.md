# Unicode v<%= version %> data

JavaScript-compatible Unicode data for use in Node.js. Included: arrays of code points, arrays of symbols, and regular expressions for Unicode v<%= version %>’s categories, scripts, script extensions, blocks, and properties, as well as bidi mirroring and case folding data.

The data files in this module are generated as part of the [node-unicode-data](https://mths.be/node-unicode-data) project. **Please report any bugs or requests [in the appropriate issue tracker](https://github.com/mathiasbynens/node-unicode-data/issues).**

## Installation

```bash
npm install unicode-<%= version %> --save-dev
```

**Note:** _unicode-<%= version %>_ is supposed to be used in build scripts (i.e. as a `devDependency`), and not at runtime (i.e. as a regular `dependency`).

## Regular expressions

The Unicode data modules ship with pre-compiled regular expressions for categories, scripts, script extensions, blocks, and properties. But maybe you want to create a single regular expression that combines several categories, scripts, etc. In that case, [***you should use Regenerate***](https://mths.be/regenerate). For example, to construct a regex that matches all symbols in the Arabic and Greek scripts as per Unicode v6.3.0:

```js
const regenerate = require('regenerate');
const set = regenerate()
  .add(require('unicode-6.3.0/scripts/Arabic/code-points')) // or `…/symbols`, doesn’t matter
  .add(require('unicode-6.3.0/scripts/Greek/code-points')); // or `…/symbols`, doesn’t matter
console.log(set.toString());
// Then you might want to use a template like this to write the result to a file, along with any regex flags you might need:
// const regex = /<%= regenerateExample %>/gim;
```

## Usage

```js
// Get an array of code points in a given Unicode category:
const codePoints = require('unicode-<%= version %>/categories/Lu/code-points');
// Get an array of symbols (strings) in a given Unicode category:
const symbols = require('unicode-<%= version %>/categories/Lu/symbols');
// Get a regular expression that matches any symbol in a given Unicode category:
const regex = require('unicode-<%= version %>/categories/Lu/regex');
// Get the canonical category a given code point belongs to:
// (Note: U+0041 is LATIN CAPITAL LETTER A)
const category = require('unicode-<%= version %>/categories')[ 0x41 ];
// Get an array of all code points with `Bidi_Class=Other_Neutral`:
const on = require('unicode-<%= version %>/bidi-classes/Other_Neutral/code-points');
// Get a map from code points to bidi classes:
const bidiClassMap = require('unicode-<%= version %>/bidi-classes');
// Get the directionality of a given code point:
const directionality = require('unicode-<%= version %>/bidi-classes').get(0x41);
<% if (dirs.hasOwnProperty('bidi-mirroring')) { %>
// What glyph is the mirror image of `«` (U+00AB)?
const mirrored = require('unicode-<%= version %>/bidi-mirroring').get(0xAB);
<% } if (dirs.hasOwnProperty('bidi-brackets')) { %>
// Get a regular expression that matches all opening brackets:
const openingBrackets = require('unicode-<%= version %>/bidi-brackets/Open/regex');
<% } %>
// …you get the idea.
```

Other than categories, data on Unicode properties, blocks, scripts, and script extensions is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v<%= version %>:

```js<% Object.keys(dirs).forEach(function(type) { %>
// <%= type.replace(/-/g, ' ') %>:
<%
	if (/^(?:bidi-classes|bidi-brackets|bidi-mirroring|categories)$/.test(type)) {
%>
require('unicode-<%= version %>/<%= type %>').get(codePoint); // lookup map
<%
	}
	dirs[type].forEach(function(dir) {
		if ('case-folding' == type) {
%>
require('unicode-<%= version %>/<%= type %>/<%= dir %>/code-points'); // lookup map from code point to code point
require('unicode-<%= version %>/<%= type %>/<%= dir %>/code-points').get(codePoint);
require('unicode-<%= version %>/<%= type %>/<%= dir %>/symbols'); // lookup map from symbol to symbol
require('unicode-<%= version %>/<%= type %>/<%= dir %>/symbols').get(symbol);
<%
		} else {
%>
require('unicode-<%= version %>/<%= type %>/<%= dir %>/code-points');
require('unicode-<%= version %>/<%= type %>/<%= dir %>/symbols');
require('unicode-<%= version %>/<%= type %>/<%= dir %>/regex');
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
