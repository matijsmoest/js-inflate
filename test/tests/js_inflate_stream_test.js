/*
  This test exercises JSInflate.inflateStream using node and writestreams. While the compressed data needs to be kept in memory, the uncompressed data is streamed out to a file.
*/

var fs = require('fs');
var JSInflate = require('./../../js-inflate')
  , assert = require('assert');

console.log(JSInflate);

testInflateStream = function() {
  var uncompressed = [76,111,114,101,109,32,105,112,115,117,109,32,100,111,108,111,114,32,115,105,116,32,97,109,101,116,44,32,99,111,110,115,101,99,116,101,116,117,114,32,97,100,105,112,105,115,99,105,110,103,32,101,108,105,116,46,32,80,114,111,105,110,32,116,111,114,116,111,114,32,116,117,114,112,105,115,44,32,99,111,110,100,105,109,101,110,116,117,109,32,97,116,32,115,99,101,108,101,114,105,115,113,117,101,32,110,111,110,44,32,116,101,109,112,117,115,32,97,108,105,113,117,101,116,32,112,117,114,117,115,46,32,78,97,109,32,118,101,104,105,99,117,108,97,32,118,101,104,105,99,117,108,97,32,110,105,115,108,32,115,105,116,32,97,109,101,116,32,116,105,110,99,105,100,117,110,116,46,32,70,117,115,99,101,32,97,32,109,97,117,114,105,115,32,111,114,99,105,44,32,113,117,105,115,32,97,117,99,116,111,114,32,110,117,110,99,46,32,77,97,101,99,101,110,97,115,32,101,103,101,115,116,97,115,44,32,110,105,115,105,32,118,101,108,32,98,108,97,110,100,105,116,32,109,97,108,101,115,117,97,100,97,44,32,113,117,97,109,32,109,97,115,115,97,32,109,97,108,101,115,117,97,100,97,32,110,117,110,99,44,32,97,32,97,100,105,112,105,115,99,105,110,103,32,101,114,97,116,32,115,97,112,105,101,110,32,101,116,32,109,101,116,117,115,46,32,68,111,110,101,99,32,117,108,116,114,105,99,105,101,115,32,111,114,99,105,32,112,111,114,116,116,105,116,111,114,32,102,101,108,105,115,32,99,111,110,100,105,109,101,110,116,117,109,32,111,114,110,97,114,101,46,32,80,101,108,108,101,110,116,101,115,113,117,101,32,117,116,32,115,97,112,105,101,110,32,100,111,108,111,114,46,32,76,111,114,101,109,32,105,112,115,117,109,32,100,111,108,111,114,32,115,105,116,32,97,109,101,116,44,32,99,111,110,115,101,99,116,101,116,117,114,32,97,100,105,112,105,115,99,105,110,103,32,101,108,105,116,46,32,80,114,97,101,115,101,110,116,32,97,108,105,113,117,97,109,32,110,117,108,108,97,32,97,32,114,105,115,117,115,32,104,101,110,100,114,101,114,105,116,32,113,117,105,115,32,109,97,116,116,105,115,32,116,111,114,116,111,114,32,112,108,97,99,101,114,97,116,46,32,78,117,108,108,97,109,32,115,111,108,108,105,99,105,116,117,100,105,110,44,32,116,117,114,112,105,115,32,101,103,101,116,32,102,101,117,103,105,97,116,32,118,105,118,101,114,114,97,44,32,108,105,98,101,114,111,32,110,105,98,104,32,102,101,117,103,105,97,116,32,110,101,113,117,101,44,32,105,100,32,116,105,110,99,105,100,117,110,116,32,110,117,110,99,32,112,117,114,117,115,32,101,117,32,100,105,97,109,46,32,65,101,110,101,97,110,32,108,97,111,114,101,101,116,32,101,114,97,116,32,101,116,32,101,114,111,115,32,116,101,109,112,111,114,32,97,117,99,116,111,114,46,32,73,110,116,101,103,101,114,32,113,117,105,115,32,108,101,111,32,108,101,111,46,32,76,111,114,101,109,32,105,112,115,117,109,32,100,111,108,111,114,32,115,105,116,32,97,109,101,116,44,32,99,111,110,115,101,99,116,101,116,117,114,32,97,100,105,112,105,115,99,105,110,103,32,101,108,105,116,46,32,77,97,101,99,101,110,97,115,32,112,104,97,114,101,116,114,97,32,112,111,115,117,101,114,101,32,100,117,105,44,32,115,105,116,32,97,109,101,116,32,102,101,117,103,105,97,116,32,117,114,110,97,32,100,105,99,116,117,109,32,118,101,108,46,32,73,110,116,101,103,101,114,32,110,101,99,32,98,108,97,110,100,105,116,32,117,114,110,97,46,32,78,117,108,108,97,109,32,97,108,105,113,117,101,116,32,111,114,99,105,32,118,101,108,32,111,100,105,111,32,99,111,110,100,105,109,101,110,116,117,109,32,118,111,108,117,116,112,97,116,46,32,69,116,105,97,109,32,118,105,116,97,101,32,97,114,99,117,32,105,112,115,117,109,46,32,80,101,108,108,101,110,116,101,115,113,117,101,32,108,101,111,32,108,105,103,117,108,97,44,32,101,117,105,115,109,111,100,32,110,101,99,32,115,99,101,108,101,114,105,115,113,117,101,32,118,101,108,44,32,115,111,108,108,105,99,105,116,117,100,105,110,32,118,101,108,32,100,117,105,46,32,77,97,101,99,101,110,97,115,32,115,117,115,99,105,112,105,116,44,32,108,105,103,117,108,97,32,115,105,116,32,97,109,101,116,32,103,114,97,118,105,100,97,32,101,103,101,115,116,97,115,44,32,112,117,114,117,115,32,110,105,98,104,32,118,105,118,101,114,114,97,32,101,108,105,116,44,32,110,101,99,32,108,97,111,114,101,101,116,32,100,117,105,32,108,105,98,101,114,111,32,97,32,108,105,98,101,114,111,46,32,68,117,105,115,32,108,111,98,111,114,116,105,115,32,99,111,110,100,105,109,101,110,116,117,109,32,112,101,108,108,101,110,116,101,115,113,117,101,46,10,10,83,101,100,32,117,108,108,97,109,99,111,114,112,101,114,32,108,97,99,105,110,105,97,32,109,97,117,114,105,115,32,97,32,115,97,103,105,116,116,105,115,46,32,78,117,108,108,97,32,101,103,101,115,116,97,115,32,101,115,116,32,110,111,110,32,110,117,108,108,97,32,112,101,108,108,101,110,116,101,115,113,117,101,32,97,108,105,113,117,97,109,32,115,99,101,108,101,114,105,115,113,117,101,32,108,111,114,101,109,32,108,117,99,116,117,115,46,32,86,101,115,116,105,98,117,108,117,109,32,99,111,110,115,101,99,116,101,116,117,114,44,32,109,97,117,114,105,115,32,100,105,99,116,117,109,32,102,101,117,103,105,97,116,32,118,105,118,101,114,114,97,44,32,108,101,99,116,117,115,32,111,114,99,105,32,108,111,98,111,114,116,105,115,32,113,117,97,109,44,32,105,100,32,99,111,110,115,101,113,117,97,116,32,117,114,110,97,32,110,105,98,104,32,97,32,105,112,115,117,109,46,32,78,117,110,99,32,110,101,99,32,110,117,110,99,32,101,116,32,115,101,109,32,118,111,108,117,116,112,97,116,32,101,108,101,109,101,110,116,117,109,32,109,111,108,101,115,116,105,101,32,105,110,32,108,105,98,101,114,111,46,32,80,101,108,108,101,110,116,101,115,113,117,101,32,117,108,116,114,105,99,105,101,115,32,108,97,99,105,110,105,97,32,101,108,105,116,32,105,100,32,112,108,97,99,101,114,97,116,46,32,83,117,115,112,101,110,100,105,115,115,101,32,118,97,114,105,117,115,32,100,117,105,32,105,100,32,97,114,99,117,32,99,111,110,115,101,113,117,97,116,32,117,108,116,114,105,99,105,101,115,32,118,101,108,32,115,105,116,32,97,109,101,116,32,108,97,99,117,115,46,32,83,101,100,32,118,117,108,112,117,116,97,116,101,32,117,108,108,97,109,99,111,114,112,101,114,32,101,108,101,105,102,101,110,100,46,32,65,108,105,113,117,97,109,32,101,114,97,116,32,118,111,108,117,116,112,97,116,46,32,80,114,97,101,115,101,110,116,32,97,32,101,110,105,109,32,111,100,105,111,44,32,108,97,111,114,101,101,116,32,99,117,114,115,117,115,32,110,105,115,108,46,32,67,117,114,97,98,105,116,117,114,32,117,108,108,97,109,99,111,114,112,101,114,32,115,101,109,32,110,101,99,32,100,111,108,111,114,32,115,101,109,112,101,114,32,105,109,112,101,114,100,105,101,116,46,32,78,117,110,99,32,108,97,111,114,101,101,116,32,114,117,116,114,117,109,32,118,97,114,105,117,115,46,32,67,108,97,115,115,32,97,112,116,101,110,116,32,116,97,99,105,116,105,32,115,111,99,105,111,115,113,117,32,97,100,32,108,105,116,111,114,97,32,116,111,114,113,117,101,110,116,32,112,101,114,32,99,111,110,117,98,105,97,32,110,111,115,116,114,97,44,32,112,101,114,32,105,110,99,101,112,116,111,115,32,104,105,109,101,110,97,101,111,115,46,32,73,110,116,101,103,101,114,32,109,97,116,116,105,115,32,109,97,108,101,115,117,97,100,97,32,115,99,101,108,101,114,105,115,113,117,101,46,32,77,111,114,98,105,32,105,97,99,117,108,105,115,32,116,101,108,108,117,115,32,103,114,97,118,105,100,97,32,100,117,105,32,109,111,108,101,115,116,105,101,32,115,101,100,32,116,101,109,112,117,115,32,112,117,114,117,115,32,102,97,99,105,108,105,115,105,115,46,32,86,101,115,116,105,98,117,108,117,109,32,97,110,116,101,32,105,112,115,117,109,32,112,114,105,109,105,115,32,105,110,32,102,97,117,99,105,98,117,115,32,111,114,99,105,32,108,117,99,116,117,115,32,101,116,32,117,108,116,114,105,99,101,115,32,112,111,115,117,101,114,101,32,99,117,98,105,108,105,97,32,67,117,114,97,101,59,32,80,101,108,108,101,110,116,101,115,113,117,101,32,104,97,98,105,116,97,110,116,32,109,111,114,98,105,32,116,114,105,115,116,105,113,117,101,32,115,101,110,101,99,116,117,115,32,101,116,32,110,101,116,117,115,32,101,116,32,109,97,108,101,115,117,97,100,97,32,102,97,109,101,115,32,97,99,32,116,117,114,112,105,115,32,101,103,101,115,116,97,115,46,32,80,104,97,115,101,108,108,117,115,32,101,116,32,101,114,97,116,32,110,101,99,32,110,117,110,99,32,99,111,109,109,111,100,111,32,101,103,101,115,116,97,115,32,110,111,110,32,110,111,110,32,110,105,98,104,46,32,77,97,117,114,105,115,32,110,111,110,32,109,111,108,108,105,115,32,100,111,108,111,114,46,32,78,97,109,32,110,101,99,32,110,101,113,117,101,32,108,111,114,101,109,46,32,68,111,110,101,99,32,113,117,105,115,32,101,108,105,116,32,110,105,115,108,44,32,101,116,32,118,101,115,116,105,98,117,108,117,109,32,117,114,110,97,46,10,10,67,114,97,115,32,97,116,32,97,114,99,117,32,110,105,115,108,44,32,101,103,101,116,32,112,111,115,117,101,114,101,32,108,101,99,116,117,115,46,32,83,117,115,112,101,110,100,105,115,115,101,32,112,111,116,101,110,116,105,46,32,68,117,105,115,32,116,105,110,99,105,100,117,110,116,32,108,111,98,111,114,116,105,115,32,111,114,99,105,46,32,83,101,100,32,101,116,32,115,101,109,32,110,117,110,99,46,32,80,114,111,105,110,32,102,101,114,109,101,110,116,117,109,32,102,101,108,105,115,32,101,117,32,108,105,98,101,114,111,32,102,101,117,103,105,97,116,32,102,101,117,103,105,97,116,46,32,77,97,117,114,105,115,32,118,105,116,97,101,32,108,105,103,117,108,97,32,106,117,115,116,111,46,32,73,110,116,101,103,101,114,32,101,116,32,115,97,112,105,101,110,32,115,101,100,32,109,97,115,115,97,32,109,111,108,108,105,115,32,114,117,116,114,117,109,32,97,32,118,105,116,97,101,32,110,117,110,99,46,32,70,117,115,99,101,32,116,114,105,115,116,105,113,117,101,32,109,97,103,110,97,32,110,111,110,32,111,114,99,105,32,114,104,111,110,99,117,115,32,101,103,101,116,32,111,114,110,97,114,101,32,110,117,108,108,97,32,109,97,116,116,105,115,46,32,78,117,108,108,97,32,97,116,32,110,105,115,108,32,101,110,105,109,44,32,118,105,116,97,101,32,99,111,110,115,101,99,116,101,116,117,114,32,111,114,99,105,46,32,77,97,117,114,105,115,32,98,105,98,101,110,100,117,109,32,115,97,112,105,101,110,32,117,116,32,110,105,98,104,32,108,97,99,105,110,105,97,32,118,105,116,97,101,32,99,111,110,115,101,99,116,101,116,117,114,32,97,110,116,101,32,115,117,115,99,105,112,105,116,46,32,86,105,118,97,109,117,115,32,108,105,103,117,108,97,32,97,110,116,101,44,32,101,103,101,115,116,97,115,32,97,99,32,116,101,109,112,117,115,32,105,100,44,32,112,104,97,114,101,116,114,97,32,110,101,99,32,106,117,115,116,111,46,10,10,80,114,111,105,110,32,105,110,32,112,111,114,116,97,32,109,97,103,110,97,46,32,67,117,114,97,98,105,116,117,114,32,102,114,105,110,103,105,108,108,97,32,109,105,32,105,100,32,102,101,108,105,115,32,109,111,108,101,115,116,105,101,32,97,116,32,112,117,108,118,105,110,97,114,32,115,97,112,105,101,110,32,102,101,117,103,105,97,116,46,32,68,111,110,101,99,32,115,105,116,32,97,109,101,116,32,115,117,115,99,105,112,105,116,32,109,97,103,110,97,46,32,68,117,105,115,32,102,101,114,109,101,110,116,117,109,44,32,105,112,115,117,109,32,105,100,32,100,105,99,116,117,109,32,115,99,101,108,101,114,105,115,113,117,101,44,32,112,117,114,117,115,32,116,111,114,116,111,114,32,115,111,100,97,108,101,115,32,116,117,114,112,105,115,44,32,97,99,32,101,103,101,115,116,97,115,32,109,97,103,110,97,32,109,105,32,97,99,32,110,105,115,105,46,32,83,117,115,112,101,110,100,105,115,115,101,32,112,108,97,99,101,114,97,116,32,97,114,99,117,32,114,117,116,114,117,109,32,110,105,115,108,32,97,117,99,116,111,114,32,112,111,115,117,101,114,101,46,32,69,116,105,97,109,32,105,100,32,110,117,110,99,32,100,111,108,111,114,46,32,77,97,117,114,105,115,32,116,101,109,112,111,114,32,101,114,111,115,32,105,100,32,116,101,108,108,117,115,32,103,114,97,118,105,100,97,32,97,99,32,108,117,99,116,117,115,32,115,101,109,32,117,108,116,114,105,99,105,101,115,46,32,78,117,110,99,32,102,97,117,99,105,98,117,115,32,109,105,32,110,101,99,32,115,101,109,32,101,117,105,115,109,111,100,32,108,117,99,116,117,115,32,112,108,97,99,101,114,97,116,32,110,117,110,99,32,112,117,108,118,105,110,97,114,46,32,80,104,97,115,101,108,108,117,115,32,97,108,105,113,117,101,116,44,32,109,105,32,118,101,108,32,116,101,109,112,117,115,32,114,117,116,114,117,109,44,32,109,97,115,115,97,32,105,112,115,117,109,32,97,99,99,117,109,115,97,110,32,100,105,97,109,44,32,118,101,108,32,118,117,108,112,117,116,97,116,101,32,114,105,115,117,115,32,100,117,105,32,97,116,32,108,105,98,101,114,111,46,32,73,110,116,101,103,101,114,32,101,103,101,115,116,97,115,32,110,117,110,99,32,101,103,101,115,116,97,115,32,101,114,111,115,32,115,111,108,108,105,99,105,116,117,100,105,110,32,118,97,114,105,117,115,46,32,67,114,97,115,32,112,108,97,99,101,114,97,116,32,101,117,105,115,109,111,100,32,105,97,99,117,108,105,115,46,10,10,69,116,105,97,109,32,117,108,108,97,109,99,111,114,112,101,114,32,109,101,116,117,115,32,97,99,32,112,117,114,117,115,32,98,108,97,110,100,105,116,32,102,114,105,110,103,105,108,108,97,46,32,86,105,118,97,109,117,115,32,113,117,105,115,32,116,117,114,112,105,115,32,105,100,32,101,115,116,32,115,99,101,108,101,114,105,115,113,117,101,32,109,97,108,101,115,117,97,100,97,46,32,85,116,32,101,117,32,97,117,103,117,101,32,105,110,32,109,97,115,115,97,32,117,108,108,97,109,99,111,114,112,101,114,32,112,101,108,108,101,110,116,101,115,113,117,101,32,117,116,32,110,101,99,32,110,117,110,99,46,32,77,111,114,98,105,32,117,108,116,114,105,99,101,115,32,101,103,101,115,116,97,115,32,108,111,114,101,109,32,117,116,32,109,111,108,108,105,115,46,32,67,114,97,115,32,101,103,101,116,32,109,97,116,116,105,115,32,100,105,97,109,46,32,78,117,108,108,97,109,32,113,117,105,115,32,97,117,103,117,101,32,117,114,110,97,44,32,108,97,99,105,110,105,97,32,111,114,110,97,114,101,32,113,117,97,109,46,32,83,101,100,32,97,117,99,116,111,114,32,101,110,105,109,32,102,97,117,99,105,98,117,115,32,108,101,111,32,112,108,97,99,101,114,97,116,32,115,99,101,108,101,114,105,115,113,117,101,46,32,73,110,32,108,101,111,32,110,117,108,108,97,44,32,112,108,97,99,101,114,97,116,32,115,101,100,32,118,117,108,112,117,116,97,116,101,32,118,101,108,44,32,117,108,108,97,109,99,111,114,112,101,114,32,113,117,105,115,32,110,117,110,99,46,32,68,111,110,101,99,32,109,101,116,117,115,32,101,110,105,109,44,32,116,105,110,99,105,100,117,110,116,32,118,105,116,97,101,32,102,97,117,99,105,98,117,115,32,110,111,110,44,32,109,97,108,101,115,117,97,100,97,32,97,32,102,101,108,105,115,46,32,83,101,100,32,110,111,110,32,110,105,115,105,32,108,101,111,46,32,78,117,110,99,32,118,105,116,97,101,32,109,105,32,110,111,110,32,100,117,105,32,118,101,110,101,110,97,116,105,115,32,97,100,105,112,105,115,99,105,110,103,32,113,117,105,115,32,118,101,108,32,100,111,108,111,114,46,32,83,117,115,112,101,110,100,105,115,115,101,32,105,112,115,117,109,32,106,117,115,116,111,44,32,112,104,97,114,101,116,114,97,32,110,101,99,32,109,111,108,101,115,116,105,101,32,105,100,44,32,103,114,97,118,105,100,97,32,105,100,32,101,114,111,115,46,32,78,117,108,108,97,109,32,118,101,104,105,99,117,108,97,44,32,108,101,111,32,110,101,99,32,97,108,105,113,117,101,116,32,114,104,111,110,99,117,115,44,32,101,110,105,109,32,109,97,117,114,105,115,32,112,114,101,116,105,117,109,32,111,100,105,111,44,32,110,111,110,32,115,117,115,99,105,112,105,116,32,117,114,110,97,32,115,101,109,32,115,105,116,32,97,109,101,116,32,108,101,99,116,117,115,46,32,85,116,32,99,111,110,115,101,113,117,97,116,32,99,117,114,115,117,115,32,100,111,108,111,114,32,115,105,116,32,97,109,101,116,32,98,105,98,101,110,100,117,109,46,32,67,117,114,97,98,105,116,117,114,32,99,111,110,100,105,109,101,110,116,117,109,44,32,108,111,114,101,109,32,110,111,110,32,115,117,115,99,105,112,105,116,32,104,101,110,100,114,101,114,105,116,44,32,116,101,108,108,117,115,32,97,114,99,117,32,99,111,110,103,117,101,32,100,105,97,109,44,32,110,111,110,32,100,105,99,116,117,109,32,97,110,116,101,32,114,105,115,117,115,32,113,117,105,115,32,101,114,97,116,46,32,65,101,110,101,97,110,32,118,101,115,116,105,98,117,108,117,109,32,109,97,103,110,97,32,97,99,32,113,117,97,109,32,112,111,115,117,101,114,101,32,101,108,101,105,102,101,110,100,46];
  var compressed = [165,87,203,142,220,54,16,188,239,87,240,3,132,249,129,156,2,39,1,12,56,70,0,195,185,115,40,238,12,3,138,148,249,152,239,79,245,131,148,180,190,37,128,119,119,60,18,201,238,234,170,234,230,151,92,252,102,194,94,251,102,214,28,115,49,53,52,99,55,223,22,227,114,170,222,53,223,122,49,118,13,123,168,46,164,135,241,49,180,155,249,171,228,144,76,203,5,255,12,222,192,83,94,177,134,205,167,134,221,108,51,213,249,232,75,168,63,186,55,41,167,197,52,191,237,189,26,27,3,190,106,102,239,165,215,155,249,106,55,243,242,207,224,122,180,199,135,20,106,156,193,152,22,146,11,107,79,56,249,143,142,125,141,53,155,237,216,219,228,226,194,98,126,116,124,180,221,81,52,169,39,119,51,127,90,239,124,178,213,248,135,175,205,34,58,236,24,176,127,52,247,104,17,103,195,14,209,215,110,87,75,235,17,196,102,107,181,199,183,188,209,130,147,206,201,23,202,203,238,193,39,131,176,16,26,101,240,91,78,222,153,30,91,9,46,120,137,201,236,192,166,5,10,232,29,144,213,11,56,185,36,91,60,80,244,49,226,27,207,16,245,185,51,87,226,102,190,252,247,226,88,95,177,175,32,141,204,82,143,128,212,26,0,6,252,159,62,173,5,133,105,2,219,102,17,103,29,181,220,163,117,148,37,234,66,139,54,83,115,140,72,171,245,53,80,9,185,212,4,106,67,94,253,17,128,199,43,188,124,41,64,49,134,187,47,25,64,223,159,243,97,242,200,109,49,97,61,106,200,192,74,245,141,239,102,13,118,187,153,95,125,242,54,153,104,145,52,246,102,160,249,111,174,204,27,132,38,245,189,153,207,64,236,225,139,68,31,125,166,159,255,129,214,100,202,254,68,81,90,177,40,93,237,190,120,179,118,80,107,114,112,100,212,81,60,4,237,168,144,160,211,17,15,145,96,112,139,94,154,16,14,194,51,47,136,129,121,13,249,66,136,87,142,189,237,132,250,239,45,144,30,66,179,32,121,113,93,50,250,64,21,78,58,60,160,147,5,8,134,186,229,149,79,63,43,14,231,44,151,226,241,201,72,233,148,49,216,224,128,70,91,116,183,35,217,71,177,175,0,13,76,245,72,185,184,180,90,111,134,111,225,115,71,213,176,251,32,129,213,15,80,7,151,41,223,193,175,15,50,216,79,57,221,222,222,190,249,213,48,96,46,151,29,120,130,137,33,133,169,116,68,103,31,129,184,170,192,142,224,12,126,147,193,40,205,207,187,78,5,156,145,137,204,148,8,54,145,120,255,198,234,112,239,17,241,156,104,178,140,83,181,208,63,115,221,211,114,41,233,76,142,142,98,174,243,78,248,159,178,133,97,179,163,148,95,137,254,4,27,235,0,176,85,127,48,0,168,122,133,103,203,145,98,243,6,181,27,96,94,29,99,58,206,128,138,74,66,231,31,42,254,214,235,14,189,135,90,65,9,91,2,98,166,42,225,29,102,215,41,208,185,25,241,100,18,1,27,17,74,84,155,87,143,123,111,182,249,75,149,16,111,120,199,9,144,176,98,205,218,61,24,125,184,145,241,41,108,76,254,101,82,198,245,82,153,88,21,74,250,212,139,189,7,82,233,249,4,130,135,224,82,85,195,12,240,101,160,223,107,240,77,241,28,251,149,222,10,9,138,83,197,142,17,166,110,236,222,40,128,6,148,90,128,40,92,200,0,16,86,0,92,97,41,150,204,15,128,226,21,218,26,152,244,59,192,76,185,54,42,53,31,151,156,223,27,188,232,73,228,181,62,215,67,247,106,160,71,227,56,145,13,98,203,229,14,188,1,35,117,129,134,250,33,221,33,47,42,197,44,115,5,198,218,34,69,109,239,136,23,139,194,149,165,22,199,170,207,237,37,108,216,20,252,120,135,57,226,249,32,36,115,155,168,37,85,69,81,135,167,57,164,22,145,28,65,237,127,185,242,233,73,224,99,123,132,68,49,99,37,14,165,7,40,159,31,59,38,175,31,142,124,223,193,20,128,236,78,221,129,116,137,210,63,109,149,132,135,165,79,218,187,188,193,181,242,212,48,235,151,126,32,21,114,40,22,31,125,177,145,133,213,209,19,105,88,224,61,252,84,242,232,191,220,14,88,0,68,166,133,142,124,29,168,177,33,191,189,125,42,56,11,113,48,249,245,61,234,101,3,30,145,245,85,54,123,38,246,4,117,178,163,141,77,217,19,230,34,17,21,179,140,32,50,35,189,251,162,122,150,57,0,29,79,45,114,120,138,254,157,89,139,249,171,35,255,211,107,203,7,215,252,28,18,136,45,58,177,8,66,202,124,171,235,37,6,153,150,142,74,110,246,65,126,4,92,153,40,229,153,147,235,218,207,101,42,81,23,21,82,15,167,181,2,42,11,120,209,3,206,77,85,16,208,248,239,72,47,173,8,69,35,237,77,12,112,152,212,207,203,153,210,163,25,129,236,225,101,55,68,165,16,208,211,101,18,133,104,38,34,9,235,114,244,108,98,128,96,245,246,38,192,227,31,205,96,86,114,62,155,203,123,65,247,15,156,37,59,161,20,102,234,208,210,104,26,95,1,104,140,20,102,137,132,106,211,29,71,204,227,12,102,200,172,248,162,50,197,17,218,70,78,206,48,90,170,206,93,53,175,164,167,57,75,35,205,145,177,212,12,161,226,59,26,98,63,176,83,173,94,40,173,36,224,98,233,60,172,212,30,163,5,130,97,1,170,160,180,102,58,98,241,184,69,179,218,213,166,112,176,90,10,177,123,118,10,181,222,233,61,8,145,209,193,59,99,42,209,101,51,72,29,253,4,221,179,65,232,140,180,208,38,212,128,180,198,146,207,162,76,23,56,173,115,125,171,24,22,105,114,92,248,237,163,53,201,136,75,190,138,211,70,215,156,234,25,102,195,141,119,76,15,148,243,117,80,26,205,131,204,98,134,62,82,82,43,7,207,4,208,115,171,226,11,1,193,37,181,29,211,224,36,220,193,109,118,43,245,75,0,78,35,204,121,70,153,230,122,51,223,233,104,20,243,209,121,18,16,36,206,135,238,31,110,17,195,99,71,239,153,61,96,100,44,3,80,111,234,28,154,40,123,128,246,50,153,201,117,124,213,203,21,157,79,46,186,76,33,171,97,80,211,23,251,83,198,113,155,159,172,160,97,117,130,120,105,141,159,19,63,100,195,89,78,239,92,102,13,158,99,207,233,114,56,146,159,168,81,64,23,107,58,220,89,92,102,70,193,23,208,163,101,89,17,189,132,45,125,7,183,67,190,72,48,167,101,53,17,26,207,136,77,47,180,192,100,9,155,211,5,130,67,225,177,90,196,116,214,165,112,149,45,233,131,77,29,115,29,12,108,72,140,56,80,114,157,160,143,139,240,34,16,97,217,184,69,168,103,47,2,179,142,169,59,182,15,125,12,87,20,244,180,38,158,64,73,147,199,76,167,77,14,204,58,230,63,29,196,174,87,167,233,229,103,251,60,141,240,139,114,233,114,224,188,95,46,195,71,198,168,73,20,18,209,50,172,226,137,108,254,34,91,105,225,60,183,234,125,240,212,193,197,6,173,147,203,250,104,216,115,252,252,23];

  var charCodesToBlob = function (charCodes) {
    var chars = [];
    for (var i = 0; i < charCodes.length; i++) {
      chars.push(String.fromCharCode(charCodes[i]))
    }

    return chars.join("");
  }

  uncompressedBlob = charCodesToBlob(uncompressed);
  compressedBlob = charCodesToBlob(compressed);

  var outputFile = '/tmp/test_data';

  JSInflate.inflateStream(compressedBlob, outputFile, fs, function(bytesWritten) {
    assert.equal(bytesWritten, 4299);
    fs.readFile(outputFile, function (err, data) {
      if (err) throw err;
      assert.equal(data, uncompressedBlob);
      fs.unlink(outputFile, function(ulErr) {
         if (ulErr) throw ulErr;
         console.log("test complete");
      })
    });
  });
}

testInflateStream();