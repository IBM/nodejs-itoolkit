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
const { parseString } = require('xml2js');
const {
  iConn, iDataQueue, CommandCall, Connection,
} = require('../../../lib/itoolkit');


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
  before('setup library for tests and create DQ', (done) => {
    const connection = new Connection({
      transport: 'ssh',
      transportOptions: {
        host: process.env.TKHOST,
        username: process.env.TKUSER,
        password: process.env.TKPASS,
      },
    });
    const checkLib = new CommandCall({ command: `CHKOBJ OBJ(QSYS/${lib}) OBJTYPE(*LIB)`, type: 'cl' });
    const createLib = new CommandCall({ command: `CRTLIB LIB(${lib}) TYPE(*TEST) TEXT('Used to test Node.js toolkit')`, type: 'cl' });
    const checkDataQueue = new CommandCall({ command: `CHKOBJ OBJ(${lib}/${dqName}) OBJTYPE(*DTAQ)`, type: 'cl' });
    const createDataQueue = new CommandCall({ command: `CRTDTAQ DTAQ(${lib}/${dqName}) MAXLEN(100) AUT(*EXCLUDE) TEXT('TEST DQ FOR NODE TOOLKIT TESTS')`, type: 'cl' });

    connection.add(checkLib);
    connection.run((checkLibError, checkLibOutput) => { // check if LIB exists
      if (checkLibError) { throw checkLibError; }
      parseString(checkLibOutput, (parseCheckLibError, checkLibResult) => {
        if (parseCheckLibError) { throw parseCheckLibError; }
        if (checkLibResult.myscript.cmd[0].success) { // LIB already exists
          connection.add(checkDataQueue);
          connection.run((checkDataQueueError, checkDataQueueOutput) => { // check if DTAQ exists
            if (checkDataQueueError) { throw checkDataQueueError; }
            parseString(checkDataQueueOutput, (parseCheckDataQueueError, checkDataQueueResult) => {
              if (parseCheckDataQueueError) { throw parseCheckDataQueueError; }
              if (!checkDataQueueResult.myscript.cmd[0].success) {
                connection.add(createDataQueue);
                connection.run((createDataQueueError, createDataQueueOutput) => {
                  if (createDataQueueError) { throw createDataQueueError; }
                  // eslint-disable-next-line max-len
                  parseString(createDataQueueOutput, (parseCreateDataQueueError, createDataQueueResult) => {
                    if (parseCreateDataQueueError) { throw parseCreateDataQueueError; }
                    if (!createDataQueueResult.myscript.cmd[0].success) {
                      throw new Error('Unable to create DTAQ');
                    }
                    done();
                  });
                });
              }
              done();
            });
          });
        } else { // LIB does not exist
          connection.add(createLib);
          connection.add(createDataQueue);
          connection.run((createBothError, createBothOutput) => { // add LIB and DTAQ
            if (createBothError) { throw createBothError; }
            parseString(createBothOutput, (parseCreateBothError, createBothResult) => {
              if (parseCreateBothError) { throw parseCreateBothError; }
              if (!createBothResult.myscript.cmd[0].success) { throw new Error('Unable to create LIB'); }
              if (!createBothResult.myscript.cmd[1].success) { throw new Error('Unable to create DTAQ'); }
              done();
            });
          });
        }
      });
    });
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
