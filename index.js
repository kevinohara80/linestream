var Stream = require('stream');
var util   = require('util');

var LineStream = function(cb) {
  
  this.writable = true;
  this.readable = true;
  this._cb = cb;
  this._buff = '';

  var that = this;

  this.emitData = function() {
    if(/\r?\n/.test(that._buff)) {
      var sp = (/\r\n/.test(that._buff)) ? '\r\n' : '\n';
      var arr = that._buff.split(sp);
      if(arr.length > 1) {
        for(var i=0; i<arr.length-1; i++) {
          if(arr[i] !== '') that.emit('data', arr.shift(i));
          else arr.shift(i);
        }
      }
      if(arr.length === 1) that._buff = arr[0];
    }
  }

  Stream.call(this);
}

util.inherits(LineStream, Stream);

LineStream.prototype.write = function(chunk) {
  if(chunk) this._buff += chunk;
  this.emitData();
}

LineStream.prototype.end = function(chunk) {
  if(chunk) {
    this._buff += chunk;
    this.emitData();
  }
  if(this._buff && this._buff !== '') {
    this.emit('data', this._buff);
  }
  this.emit('end');
  this.writable = false;
}

LineStream.prototype.destroy = function() {
  this.writable = false;
}

module.exports.create = function(cb) {
  return new LineStream(cb);
}