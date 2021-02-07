jStat-es - JavaScript Statistical Library
===============================================================

This is an ES Version of [jStat](https://github.com/jstat/jstat). 
Support tree-shaking to minimize bundle size.
```sh
npm install jstat-es
# OR
yarn add jstat-es
```
### Bundle size
 Tree-shakable; Whole module: ~50KB Minified, ~18KB Gzipped + Minified.
 
### [Usage](http://jstat.github.io/index.html)
Same as the original [jStat](https://github.com/jstat/jstat).

### Using ES6
```js
// Static functions are exported.
// Only import the function you use!
import {gamma, lognormal, tscore} from 'jstat-es';

// Import jStat constructor, usage is same as before
// keep in mind that importing the consructor means importing everyhing,
// the budle size for this whole module will be ~50KB without GZIP
import {jStat} from 'jstat-es';
// or 
import jStat from 'jstat-es';
```

### Using CommonJS
```js
// Tree shaking on commonjs is limited on webpack. Using ES6 is recommanded.
const {jStat} = require('jstat-es');
const {gamma, lognormal, tscore} = require('jstat-es');
```

### Using UMD build in a Browser
```html
<script src="node_modules/jstat-es/dist/jstat.min.js"></script>

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
