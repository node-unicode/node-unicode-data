# Unicode v<%= version %> data

JavaScript-compatible Unicode data for use in Node.js. Included: arrays of code points, arrays of symbols, and regular expressions for Unicode v<%= version %>’s categories, scripts, blocks, and properties, as well as bidi mirroring and case folding data.

The data files in this module are generated as part of the [node-unicode-data](https://mths.be/node-unicode-data) project. Please report any bugs or requests [in the appropriate issue tracker](https://github.com/mathiasbynens/node-unicode-data/issues).

## Installation

```bash
npm install unicode-<%= version %> --save
```

## Regular expressions

The Unicode data modules ship with pre-compiled regular expressions for categories, scripts, blocks, and properties. But maybe you want to create a single regular expression that combines several categories, scripts, etc. In that case, [***you should use Regenerate***](https://mths.be/regenerate). For example, to construct a regex that matches all symbols in the Arabic and Greek scripts as per Unicode v6.3.0:

```js
var regenerate = require('regenerate');
var set = regenerate()
  .add(require('unicode-6.3.0/scripts/Arabic/code-points')) // or `…/symbols`, doesn’t matter
  .add(require('unicode-6.3.0/scripts/Greek/code-points')); // or `…/symbols`, doesn’t matter
console.log(set.toString());
// Then you might want to use a template like this to write the result to a file, along with any regex flags you might need:
// var regex = /<%= regenerateExample %>/gim;
```

## Usage

```js
// Get an array of code points in a given Unicode category:
var codePoints = require('unicode-<%= version %>/categories/Lu/code-points');
// Get an array of symbols (strings) in a given Unicode category:
var symbols = require('unicode-<%= version %>/categories/Lu/symbols');
// Get a regular expression that matches any symbol in a given Unicode category:
var regex = require('unicode-<%= version %>/categories/Lu/regex');
// Get the canonical category a given code point belongs to:
// (Note: U+0041 is LATIN CAPITAL LETTER A)
var category = require('unicode-<%= version %>/categories')[ 0x41 ];
// Get an array of all code points with the `Bidi_ON` bidi property:
var on = require('unicode-<%= version %>/bidi/ON/code-points');
// Get the directionality of a given code point:
var directionality = require('unicode-<%= version %>/bidi')[ 0x41 ];
<% if (dirs.hasOwnProperty('bidi-mirroring')) { %>
// What glyph is the mirror image of `«` (U+00AB)?
var mirrored = require('unicode-<%= version %>/bidi-mirroring')[ 0xAB ];
<% } if (dirs.hasOwnProperty('bidi-brackets')) { %>
// Get a regular expression that matches all opening brackets:
var openingBrackets = require('unicode-<%= version %>/bidi-brackets/Open/regex');
<% } %>
// …you get the idea.
```

Other than categories, data on Unicode properties, blocks, and scripts is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v<%= version %>:

```js<% Object.keys(dirs).forEach(function(type) { %>
// <%= type.replace(/-/g, ' ') %>:
<%
  if (/^(?:bidi|bidi-brackets|bidi-mirroring|categories)$/.test(type)) {
%>
require('unicode-<%= version %>/<%= type %>')[ codePoint ]; // lookup array
<%
  } else if ('emoji' == type) {
%>
require('unicode-<%= version %>/<%= type %>/code-points');
require('unicode-<%= version %>/<%= type %>/symbols');
<%
  }
	dirs[type].forEach(function(dir) {
		if ('case-folding' == type) {
%>
require('unicode-<%= version %>/<%= type %>/<%= dir %>/code-points'); // lookup table with code point to code point mappings
require('unicode-<%= version %>/<%= type %>/<%= dir %>/code-points')[ codePoint ]; // lookup table
require('unicode-<%= version %>/<%= type %>/<%= dir %>/symbols'); // lookup table with symbol to symbol mappings
require('unicode-<%= version %>/<%= type %>/<%= dir %>/symbols')[ symbol ]; // lookup table
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
