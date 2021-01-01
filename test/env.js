// Bug fixes in newer node
util = require('util')
util.print = console.log
util.puts = console.log


// Hack to make jStat global for all tests.
const {default: main} = require('../lib/index');
jStat = main;
