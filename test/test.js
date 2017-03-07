// Copyright (c) International Business Machines Corp. 2017
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
// IN THE SOFTWARE.

var assert = require('assert');
var NodeVer = process.version.slice(1,2);
assert.notEqual(NodeVer, '0', 'Unsupported version of Node.js!');
var xt = require('/QOpenSys/QIBM/ProdData/OPS/Node'+NodeVer+'/os400/xstoolkit/lib/itoolkit');
var hint = 'check the "success" property in return value'
//Need change based on your server configurations
var opt = {
  db   : '*LOCAL',
  user : 'YOURNAME',
  pwd  : 'PASSWORD',
	host : '8.8.8.8',
	port : 8080,
	path : '/cgi-bin/xmlcgi.pgm'
};

describe('Basic Function Test', function() {
  this.timeout(5000)
  describe('Test iCmd()', function() {
    it(hint, function(done) {
      var conn = new xt.iConn(opt.db);
      conn.add(xt.iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)'));
      conn.run(function(str){
        var results = xt.xmlToJson(str);
        var success = true;
        results.every(function(result, i){
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
  
  describe('Test iSh()', function() {
    it(hint, function(done) {
      var conn = new xt.iConn(opt.db);
      conn.add(xt.iSh('system -i wrksyssts'));
      conn.run(function(str){
        var results = xt.xmlToJson(str);
        var success = true;
        results.every(function(result, i){
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
  
  describe('Test iQsh()', function() {
    it(hint, function(done) {
      var conn = new xt.iConn(opt.db);
      conn.add(xt.iQsh('system wrksyssts'));
      conn.run(function(str){
        var results = xt.xmlToJson(str);
        var success = true;
        results.every(function(result, i){
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
  
  describe('Test iPgm()', function() {
    it(hint, function(done) {
      var conn = new xt.iConn(opt.db);
      var pgm = new xt.iPgm('QWCRSVAL', {'lib':'QSYS'});
      var outBuf = [
          [0, '10i0'],
          [0, '10i0'],
          ['', '36h'],
          ['', '10A'],
          ['', '1A'],
          ['', '1A'],
          [0, '10i0'],
          [0, '10i0']
        ];
      pgm.addParam(outBuf, {'io':'out'});
      pgm.addParam(66, '10i0');
      pgm.addParam(1, '10i0');
      pgm.addParam('QCCSID', '10A');
      pgm.addParam(this.errno, {'io':'both', 'len' : 'rec2'});
      conn.add(pgm);
      conn.run(function(str){
        var results = xt.xmlToJson(str);
        var success = true;
        results.every(function(result, i){
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
  
  describe('Test iSql()', function() {
    it(hint, function(done) {
      var conn = new xt.iConn(opt.db);
      var sql = new xt.iSql();  /* Test iSql Class */
      sql.prepare('call qsys2.tcpip_info()');
      sql.execute();
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run(function(str){
        var results = xt.xmlToJson(str);
        var success = true;
        results.every(function(result, i){
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
    
    it('should return SQL result set', function(done) {
      var conn = new xt.iConn(opt.db);
      var sql = new xt.iSql();
      sql.addQuery("SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT");
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run(function(str){
        var results = xt.xmlToJson(str);
        var success1 = false;
        var success2 = false;
        results.every(function(result, i){
          if(result.hasOwnProperty('success'))
            success1 = result.success == true;
          result.result.every(function(row, i){
            success2 = row[0].hasOwnProperty('desc');
          })
        });
        if(success1 && success2) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
});