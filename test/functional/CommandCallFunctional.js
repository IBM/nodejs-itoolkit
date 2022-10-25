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

const { expect } = require('chai');
const { parseString } = require('xml2js');
const { CommandCall, Connection, ProgramCall } = require('../../lib/itoolkit');
const { config, printConfig } = require('./config');
const { isQSHSupported } = require('./checkVersion');

describe('CommandCall Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('CL command tests', function () {
    it('calls CL command', function (done) {
      const connection = new Connection(config);
      connection.add(new CommandCall({ command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)', type: 'cl' }));
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.cmd[0].success[0]).to.include('+++ success RTVJOBA USRLIBL(?) SYSLIBL(?)');
          done();
        });
      });
    });
  });

  describe('SH command tests', function () {
    it('calls PASE shell command', function (done) {
      const connection = new Connection(config);
      connection.add(new CommandCall({ command: 'system -i wrksyssts', type: 'sh' }));
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
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

  describe('QSH command tests', function () {
    it('calls QSH command', function (done) {
      const connection = new Connection(config);
      connection.add(new ProgramCall('MYPGMTOOLONG'));
      connection.add(new CommandCall({ command: 'system wrksyssts', type: 'qsh' }));
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        // xs does not return success property for sh or qsh command calls
        // but on error sh or qsh node will not have any inner data
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          const match = result.myscript.pgm[0].version[0].match(/\d\.\d\.\d/);
          if (!match) {
            throw Error('Unable to determine XMLSERVICE version');
          }
          if (!isQSHSupported(match[0])) {
            // skip if QSH is unsupported
            console.log(`XMLSERVICE version ${match[0]} does not support QSH`);
            this.skip();
          }
          expect(result.myscript.qsh[0]._).to.match(/(System\sStatus\sInformation)/);
          done();
        });
      });
    });
  });
});
