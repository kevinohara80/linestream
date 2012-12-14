var test       = require('tap').test
var linestream = require('../');

test('test creation of stream object', function(t) {
  var ls = linestream.create();
  t.equal(ls.writable, true, 'stream should be writable');
  t.equal(ls.readable, true, 'stream should be readable');
  t.equal(typeof ls.pipe, 'function', 'stream should have pipe function');
  t.equal(typeof ls.write, 'function', 'stream should have write function');
  t.equal(typeof ls.end, 'function', 'stream should have end function');
  t.equal(typeof ls.destroy, 'function', 'stream should have destroy function');
  t.end();
});

test('test end function', function(t) {
  var ls = linestream.create();
  ls.end('data test');
  t.equal(ls.writable, false, 'stream should not be writable');
  t.end();
});

test('test destroy function', function(t) {
  var ls = linestream.create();
  ls.destroy();
  t.equal(ls.writable, false, 'stream should not be writable');
  t.end();
});