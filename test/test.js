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

const assert = require('assert');
const xt = require('../lib/itoolkit');
const hint = 'check the "success" property in return value'
//Need change based on your server configurations
const opt = {
  db   : '*LOCAL',
  user : 'YOURNAME',
  pwd  : 'PASSWORD',
	host : '0.0.0.0',
	port : 8080,
	path : '/cgi-bin/xmlcgi.pgm'
};

describe('Basic Function Test', () => {
  describe('Test iCmd()', () => {
    it(hint, (done) => {
      let conn = new xt.iConn(opt.db);
      conn.add(xt.iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)'));
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success = true;
        results.every((result, i) => {
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
  
  describe('Test iSh()', () => {
    it(hint, (done) => {
      let conn = new xt.iConn(opt.db);
      conn.add(xt.iSh('system -i wrksyssts'));
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success = true;
        results.every((result, i) => {
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
  
  describe('Test iQsh()', () => {
    it(hint, (done) => {
      let conn = new xt.iConn(opt.db);
      conn.add(xt.iQsh('system wrksyssts'));
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success = true;
        results.every((result, i) => {
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
  
  describe('Test iPgm()', () => {
    it(hint, (done) => {
      let conn = new xt.iConn(opt.db);
      let pgm = new xt.iPgm('QWCRSVAL', {'lib':'QSYS'});
      let outBuf = [
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
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success = false;
        results.every((result, i) => {
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
    it('Should return arbitrarily named parameter', (done) => {
      let conn = new xt.iConn(opt.db);
      let pgm = new xt.iPgm('QWCRSVAL', {'lib':'QSYS'});
      let outBuf = [
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
      let paramValue = 'errno';
      pgm.addParam(this.errno, {'io':'both', 'len' : 'rec2', 'name' : paramValue });
      conn.add(pgm);
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success = false;
        results.every((result, i) => {
          if(result.data[11].hasOwnProperty('name'))
            success = result.data[11].name == paramValue;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
    /*** Refer to test/rpg/zzsrv6.rpgle
    it('Should return success with addReturn arbitrary attribute specified', (done) => {
      let conn = new xt.iConn(opt.db);
      let pgm = new xt.iPgm("ZZSRV6", {"lib":"XMLSERVICE", "func":"ZZVARY4"});
      pgm.addParam("Gill", "10A", {"letying":"4"});
      let test_value = "NEW_NAME";
      pgm.addReturn("0", "20A", {"letying":"4","name":test_value});
      conn.add(pgm);
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        if(results[0].data[1].name == test_value) done();
        else done(new Error(JSON.stringify(results)));
      });      
    });
    ***/
  });
  
  describe('Test iSql()', () => {
    it(hint, (done) => {
      let conn = new xt.iConn(opt.db);
      let sql = new xt.iSql();  /* Test iSql Class */
      sql.prepare('call qsys2.tcpip_info()');
      sql.execute();
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success = true;
        results.every((result, i) => {
          if(result.hasOwnProperty('success'))
            success = result.success == true;
        });
        if(success) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
    
    it('should return SQL result set', (done) => {
      let conn = new xt.iConn(opt.db);
      let sql = new xt.iSql();
      sql.addQuery("SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT");
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success1 = false;
        let success2 = false;
        results.every((result, i) => {
          if(result.hasOwnProperty('success'))
            success1 = result.success == true;
          result.result.every((row, i) => {
            success2 = row[0].hasOwnProperty('desc');
          })
        });
        if(success1 && success2) done();
        else done(new Error(JSON.stringify(results)));
      });
    });

    it('should parse SQL result set empty data tags correctly', (done) => {
      let conn = new xt.iConn(opt.db);
      let sql = new xt.iSql();
      sql.addQuery("SELECT '' AS BLANK, STATE FROM QIWS.QCUSTCDT");
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        let success1 = false;
        let success2 = false;
        results.every((result, i) => {
          if(result.hasOwnProperty('success'))
            success1 = result.success == true;
          result.result.every((row, i) => {
            success2 = row[0].value === '';
          })
        });
        if(success1 && success2) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
  });
});