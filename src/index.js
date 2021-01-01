export * from './core';
export * from './distribution';
export * from './vector';
import { jStat } from "./core/jStat";

import * as coreFunctions from './core';
import * as distributionFunctions from './distribution';
import * as vectorFunctions from './vector';

Object.assign(jStat, coreFunctions, distributionFunctions, vectorFunctions);

export default jStat;
