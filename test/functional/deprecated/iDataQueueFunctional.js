// Copyright (c) International Business Machines Corp. 2019

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
/* eslint-disable new-cap */

const { expect } = require('chai');
const { iConn, iDataQueue } = require('../../../lib/itoolkit');

// Set Env variables or set values here.
const opt = {
  database: process.env.TKDB || '*LOCAL',
  username: process.env.TKUSER || '',
  password: process.env.TKPASS || '',
  host: process.env.TKHOST || 'localhost',
  port: process.env.TKPORT || 80,
  path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
};

const lib = 'NODETKTEST'; const dqName = 'TESTQ';

const { returnTransportsDeprecated } = require('../../../lib/utils');

const transports = returnTransportsDeprecated(opt);

describe('iDataQueue Functional Tests', () => {
  before('setup library for tests and create DQ', async () => {
    // eslint-disable-next-line global-require
    const { DBPool } = require('idb-pconnector');

    const pool = new DBPool({ url: '*LOCAL' }, { incrementSize: 2 });

    const qcmdexec = 'CALL QSYS2.QCMDEXC(?)';

    const createLib = `CRTLIB LIB(${lib}) TYPE(*TEST) TEXT('Used to test Node.js toolkit')`;

    const createDQ = `CRTDTAQ DTAQ(${lib}/${dqName}) MAXLEN(100) AUT(*EXCLUDE) TEXT('TEST DQ FOR NODE TOOLKIT TESTS')`;

    const findLib = 'SELECT SCHEMA_NAME FROM qsys2.sysschemas WHERE SCHEMA_NAME = \'NODETKTEST\'';

    const findDQ = 'SELECT OBJLONGNAME FROM TABLE (QSYS2.OBJECT_STATISTICS(\'NODETKTEST\', \'*DTAQ\')) AS X';

    const libResult = await pool.runSql(findLib);

    const dqResult = await pool.runSql(findDQ);

    if (!libResult.length) {
      await pool.prepareExecute(qcmdexec, [createLib]).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Unable to Create Lib!');
        throw error;
      });
      // eslint-disable-next-line no-console
      console.log('CREATED LIB!');
    }
    if (!dqResult.length) {
      await pool.prepareExecute(qcmdexec, [createDQ]).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Unable to Create DQ!');
        throw error;
      });
      // eslint-disable-next-line no-console
      console.log('CREATED DQ!');
    }
  });
  describe('constructor', () => {
    it('creates and returns an instance of iDataQueue', () => {
      const connection = new iConn(opt.database, opt.user, opt.password);

      const dq = new iDataQueue(connection);
      expect(dq).to.be.instanceOf(iDataQueue);
    });
  });

  describe('sendToDataQueue', () => {
    transports.forEach((transport) => {
      it(`sends data to specified DQ using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const dq = new iDataQueue(connection);

        dq.sendToDataQueue(dqName, lib, 'Hello from DQ!', (output) => {
          expect(output).to.equal(true);
          done();
        });
      });
    });
  });

  describe('receiveFromDataQueue', () => {
    transports.forEach((transport) => {
      it(`receives data from specfied DQ using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const dq = new iDataQueue(connection);

        dq.receiveFromDataQueue(dqName, lib, 100, (output) => {
          expect(output).to.be.a('string').and.to.equal('Hello from DQ!');
          done();
        });
      });
    });
  });

  describe('clearDataQueue', () => {
    transports.forEach((transport) => {
      it(`clears the specifed DQ using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const dq = new iDataQueue(connection);

        dq.clearDataQueue(dqName, lib, (output) => {
          expect(output).to.equal(true);
          done();
        });
      });
    });
  });
});
