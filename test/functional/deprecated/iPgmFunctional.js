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

/* eslint-disable new-cap */

const { expect } = require('chai');
const { parseString } = require('xml2js');
const { iPgm, iConn } = require('../../../lib/itoolkit');
const { config, printConfig } = require('../config');

// deprecated tests are in place to test compatability using deprecated classes and functions
// these tests use deprecated iConn Class to create a connnection
// iConn only supported idb and rest transports
if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const {
  database, username, password, host, port = 80, path,
} = config.transportOptions;

let restOptions = null;
if (config.transport === 'rest') {
  restOptions = {
    host,
    port,
    path,
  };
}

describe('iPgm Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('Test iPgm()', function () {
    it('calls QWCRSVAL program checks if it ran successfully', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const program = new iPgm('QWCRSVAL', { lib: 'QSYS' });

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
      program.addParam(outBuf, { io: 'out' });
      program.addParam(66, '10i0');
      program.addParam(1, '10i0');
      program.addParam('QCCSID', '10A');
      program.addParam(this.errno, { io: 'both', len: 'rec2' });
      connection.add(program);
      connection.run((xmlOut) => {
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.pgm[0].success[0]).to.include('+++ success QSYS QWCRSVAL');
          done();
        });
      });
    });
  });

  describe.skip('Test iPgm()', function () {
    // ZZSRV6 program requires XMLSERVICE built with tests
    // Skip for now, we need to add before hook to check if ZZSRV6 is available
    it.skip('Should be successful with addReturn arbitrary attribute specified using', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const program = new iPgm('ZZSRV6', { lib: 'XMLSERVICE', func: 'ZZVARY4' });

      program.addParam('Gill', '10A', { varying: '4' });
      const testValue = 'NEW_NAME';
      program.addReturn('0', '20A', { varying: '4', name: testValue });
      connection.add(program);
      connection.run((xmlOut) => {
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.pgm[0].success[0]).to.include('+++ success');
          expect(result.myscript.pgm[0].return[0].data[0]._).to.equal('my name is Gill');
          done();
        });
      });
    });
  });
});
