// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-env mocha */

const assert = require('assert');
const xt = require('../lib/itoolkit');

const hint = 'check the "success" property in return value';
// Need change based on your server configurations
const opt = {
  db: '*LOCAL',
  user: 'YOURNAME',
  pwd: 'PASSWORD',
  host: '0.0.0.0',
  port: 8080,
  path: '/cgi-bin/xmlcgi.pgm',
};

describe('Basic Function Test', () => {
  describe('Test iCmd()', () => {
    it(hint, (done) => {
      const conn = new xt.Connection(opt.db);
      conn.add(xt.iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)'));
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result, 'success')) { 
            assert(result.success === true);
          }
        });
        done();
      });
    });
  });

  describe('Test iSh()', () => {
    it(hint, (done) => {
      const conn = new xt.Connection(opt.db);
      conn.add(xt.iSh('system -i wrksyssts'));
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result, 'success')) {
            assert(result.success === true);
          }
        });
        done();
      });
    });
  });

  describe('Test iQsh()', () => {
    it(hint, (done) => {
      const conn = new xt.Connection(opt.db);
      conn.add(xt.iQsh('system wrksyssts'));
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result, 'success')) {
            assert(result.success === true);
          }
        });
        done();
      });
    });
  });

  describe('Test iPgm()', () => {
    it(hint, (done) => {
      const conn = new xt.Connection(opt.db);
      const pgm = new xt.ProgramCall('QWCRSVAL', { lib: 'QSYS' });
      const outBuf = [
        [0, '10i0'],
        [0, '10i0'],
        ['', '36h'],
        ['', '10A'],
        ['', '1A'],
        ['', '1A'],
        [0, '10i0'],
        [0, '10i0'],
      ];
      pgm.addParam(outBuf, { io: 'out' });
      pgm.addParam(66, '10i0');
      pgm.addParam(1, '10i0');
      pgm.addParam('QCCSID', '10A');
      pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
      conn.add(pgm);
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result, 'success')) {
            assert(result.success === true);
          }
        });
        done();
      });
    });

    it('Should return arbitrarily named parameter', (done) => {
      const conn = new xt.Connection(opt.db);
      const pgm = new xt.ProgramCall('QWCRSVAL', { lib: 'QSYS' });
      const outBuf = [
        [0, '10i0'],
        [0, '10i0'],
        ['', '36h'],
        ['', '10A'],
        ['', '1A'],
        ['', '1A'],
        [0, '10i0'],
        [0, '10i0'],
      ];
      pgm.addParam(outBuf, { io: 'out' });
      pgm.addParam(66, '10i0');
      pgm.addParam(1, '10i0');
      pgm.addParam('QCCSID', '10A');
      const paramValue = 'errno';
      pgm.addParam(this.errno, { io: 'both', len: 'rec2', name: paramValue });
      conn.add(pgm);
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result.data[11], 'name')) {
            assert(result.data[11].name === paramValue);
          }
        });
        done();
      });
    });
    /** * Refer to test/rpg/zzsrv6.rpgle
    it('Should return success with addReturn arbitrary attribute specified', (done) => {
      let conn = new xt.Connection(opt.db);
      let pgm = new xt.iPgm("ZZSRV6", {"lib":"XMLSERVICE", "func":"ZZVARY4"});
      pgm.addParam("Gill", "10A", {"letying":"4"});
      let test_value = "NEW_NAME";
      pgm.addReturn("0", "20A", {"letying":"4","name":test_value});
      conn.add(pgm);
      conn.run((str) => {
        let results = xt.xmlToJson(str);
        if(results[0].data[1].name === test_value) done();
        else done(new Error(JSON.stringify(results)));
      });
    });
    ** */
  });

  describe('Test iSql()', () => {
    it(hint, (done) => {
      const conn = new xt.Connection(opt.db);
      const sql = new xt.SqlCall(); /* Test iSql Class */
      sql.prepare('call qsys2.tcpip_info()');
      sql.execute();
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result, 'success')) {
            assert(result.success === true);
          }
        });
        done();
      });
    });

    it('should return SQL result set', (done) => {
      const conn = new xt.Connection(opt.db);
      const sql = new xt.SqlCall();
      sql.addQuery('SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT');
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result, 'success')) {
            assert(result.success === true);
          }
          result.result.forEach((row) => {
            assert(Object.prototype.hasOwnProperty.call(row[0], 'desc'));
          });
        });
        done();
      });
    });

    it('should parse SQL result set empty data tags correctly', (done) => {
      const conn = new xt.Connection(opt.db);
      const sql = new xt.SqlCall();
      sql.addQuery("SELECT '' AS BLANK, STATE FROM QIWS.QCUSTCDT");
      sql.fetch();
      sql.free();
      conn.add(sql);
      conn.run((str) => {
        const results = xt.xmlToJson(str);
        results.forEach((result) => {
          if (Object.prototype.hasOwnProperty.call(result, 'success')) {
            assert(result.success === true);
          }
          result.result.forEach((row) => {
            assert(row[0].value === '');
          });
        });
        done();
      });
    });
  });
});
