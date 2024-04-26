import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import {fileURLToPath} from 'url';  
import {dirname} from 'path';

var window = window || global || {};
var global = global || window;

try {
  global.fileURLToPath = global.fileURLToPath || fileURLToPath;
  global.dirname = global.dirname || dirname;
  var __filename = fileURLToPath(import.meta.url);
  var __dirname = dirname(__filename);
  global.__filename = __filename;
  global.__dirname = __dirname;
} catch (e001) {
}
console.log('url', __filename);

var lib = require("../jsfuck.js");
export default lib;
