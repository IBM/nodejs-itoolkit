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
  iCmd, iSh, iQsh, iConn,
} = require('../../../lib/itoolkit');

const { config } = require('../config');

if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}
const { database, username, password } = config.transportOptions;

let restOptions = null;
if (config.transport === 'rest') {
  restOptions = config.restOptions;
}

describe('iSh, iCmd, iQsh, Functional Tests', () => {
  describe('iCmd()', () => {
    it(`calls CL command using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);
      connection.add(iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)'));
      connection.run((xmlOut) => {
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.cmd[0].success[0]).to.include('+++ success RTVJOBA USRLIBL(?) SYSLIBL(?)');
          done();
        });
      });
    });
  });

  describe('iSh()', () => {
    it(`calls PASE shell command using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);
      connection.add(iSh('system -i wrksyssts'));
      connection.run((xmlOut) => {
        // xs does not return success property for sh or qsh command calls
        // but on error sh or qsh node will not have any inner data
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sh[0]._).to.match(/(System\sStatus\sInformation)/);
          done();
        });
      });
    });
  });

  describe('iQsh()', () => {
    it(`calls QSH command using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);
      connection.add(iQsh('system wrksyssts'));
      connection.run((xmlOut) => {
        // xs does not return success property for sh or qsh command calls
        // but on error sh or qsh node will not have any inner data
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.qsh[0]._).to.match(/(System\sStatus\sInformation)/);
          done();
        });
      });
    });
  });
});
