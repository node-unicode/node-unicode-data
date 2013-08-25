# Unicode v<%= version %> data

JavaScript-compatible Unicode data for use in Node.js. Included: arrays of code points, arrays of symbols, and regular expressions for Unicode v<%= version %>’s categories, scripts, blocks, and properties.

The data files in this module are generated as part of the [node-unicode-data](http://mths.be/node-unicode-data) project.

## Installation

```bash
npm install unicode-<%= version %> --save
```

## Usage

```js
// Get an array of code points in a given Unicode category:
var codePoints = require('unicode-<%= version %>/categories/Lu/code-points');
// Get an array of symbols (strings) in a given Unicode category:
var symbols = require('unicode-<%= version %>/categories/Lu/symbols');
// Get a regular expression that matches any symbol in a given Unicode category:
var regex = require('unicode-<%= version %>/categories/Lu/regex');
```

Other than categories, data on Unicode properties, blocks, and scripts is available too (for recent versions of the Unicode standard). Here’s the full list of the available data for v<%= version %>:

```js
<% Object.keys(dirs).forEach(function(type) { %>// <%= type %>:
<% dirs[type].forEach(function(dir) { %>
require('unicode-<%= version %>/<%= type %>/<%= dir %>/code-points');
require('unicode-<%= version %>/<%= type %>/<%= dir %>/symbols');
require('unicode-<%= version %>/<%= type %>/<%= dir %>/regex');
<% }); %>
<% }); %>```

## Author

| [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](http://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](http://mathiasbynens.be/) |

## License

This module is available under the [MIT](http://mths.be/mit) license.
