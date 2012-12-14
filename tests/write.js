var test       = require('tap').test
var linestream = require('../');

test('test basic write function', function(t) {
  var ls = linestream.create();
  ls.write('some data');
  t.end();
});

test('test write data events with \\n', function(t) {
  var ls = linestream.create();
  var count = 0;
  ls.on('data', function(data){ count++; }); 
  ls.write('this should \n split');
  ls.end();
  t.equal(count, 2, 'two data events should have been emitted');
  t.end();
});

test('test write data events with \\r\\n', function(t) {
  var ls = linestream.create();
  var count = 0;
  ls.on('data', function(data){ count++; }); 
  ls.write('this should \r\n split');
  ls.end();
  t.equal(count, 2, 'two data events should have been emitted');
  t.end();
});

test('test write data events with data on end', function(t) {
  var ls = linestream.create();
  var count = 0;
  ls.on('data', function(data){ count++; }); 
  ls.write('this should \n split');
  ls.end('\nsome data');
  t.equal(count, 3, 'three data events should have been emitted');
  t.end();
});

test('test write data with newline at end', function(t) {
  var ls = linestream.create();
  var count = 0;
  ls.on('data', function(data){ count++; }); 
  ls.write('this should not split\n');
  ls.end('to two parts');
  t.equal(count, 2, 'two data events should have been emitted');
  t.end();
});

test('test write data with newline at beginning', function(t) {
  var ls = linestream.create();
  var count = 0;
  ls.on('data', function(data){ count++; }); 
  ls.write('\nthis should not split');
  ls.end('at all');
  t.equal(count, 1, 'two data events should have been emitted');
  t.end();
});

