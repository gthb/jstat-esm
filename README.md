jStat-esm - JavaScript Statistical Library
===============================================================

This is an ES Version of [jStat](https://github.com/jstat/jstat). 
Support tree-shaking to minimize bundle size.
```sh
npm install jstat-esm
# OR
yarn add jstat-esm
```
### Bundle size
 Tree-shakable; Whole module: ~50KB Minified, ~18KB Gzipped + Minified.
 
### [Usage](http://jstat.github.io/index.html)
Same as the original [jStat](https://github.com/jstat/jstat).

### Using ES6
```js
// Static functions are exported.
// Only import the function you use!
import {gamma, lognormal, tscore} from 'jstat-esm';

// Import jStat constructor, usage is same as before
// keep in mind that importing the consructor means importing everyhing,
// the budle size for this whole module will be ~50KB without GZIP
import {jStat} from 'jstat-esm';
// or 
import jStat from 'jstat-esm';
```

### Using CommonJS
```js
// Tree shaking on commonjs is limited on webpack. Using ES6 is recommanded.
const {jStat} = require('jstat-esm');
const {gamma, lognormal, tscore} = require('jstat-esm');
```

### Using UMD build in a Browser
```html
<script src="node_modules/jstat-esm/dist/jstat.min.js"></script>

<script>
// jStat is available globally
jStat.zeros(2);
// returns [[0,0],[0,0]]

jStat().ones(2);
// returns jStat([[0,0],[0,0]])
...
</script>
```

### Internal changes compared to the original [jStat](https://github.com/jstat/jstat)
- `jStat.extend` is removed.
- Reworked tests.
- Reworked build process.
- Documentation breaks now. Rethinking a new way to document.
