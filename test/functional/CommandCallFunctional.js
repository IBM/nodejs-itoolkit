// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

const { expect } = require('chai');
const { XMLParser } = require('fast-xml-parser');
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

        const parser = new XMLParser();
        let result;
        try {
          result = parser.parse(xmlOut);
        } catch (parseError) {
          done(parseError);
          return;
        }
        expect(result.myscript.cmd.success).to.include('+++ success RTVJOBA USRLIBL(?) SYSLIBL(?)');
        done();
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

        const parser = new XMLParser();
        let result;
        try {
          result = parser.parse(xmlOut);
        } catch (parseError) {
          done(parseError);
          return;
        }

        expect(result.myscript.sh).to.match(/(System\sStatus\sInformation)/);
        done();
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

        const parser = new XMLParser();
        let result;
        try {
          result = parser.parse(xmlOut);
        } catch (parseError) {
          done(parseError);
          return;
        }

        const { version } = result.myscript.pgm;
        const match = version.match(/\d\.\d\.\d/);

        if (!match) {
          done(new Error('Unable to determine XMLSERVICE version'));
          return;
        }

        if (!isQSHSupported(match[0])) {
          console.log(`XMLSERVICE version ${match[0]} does not support QSH`);
          this.skip();
          done();
          return;
        }
        const qshContent = result.myscript.qsh;
        expect(qshContent).to.match(/(System\sStatus\sInformation)/);

        done();
      });
    });
  });
});
