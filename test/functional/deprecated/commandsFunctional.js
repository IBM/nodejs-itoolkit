// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/* eslint-disable new-cap */

const { expect } = require('chai');
const { parseString } = require('xml2js');
const {
  iCmd, iSh, iQsh, iConn, iPgm,
} = require('../../../lib/itoolkit');

const { config, printConfig } = require('../config');
const { isQSHSupported } = require('../checkVersion');

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

describe('iSh, iCmd, iQsh, Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('iCmd()', function () {
    it('calls CL command', function (done) {
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

  describe('iSh()', function () {
    it('calls PASE shell command', function (done) {
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

  describe('iQsh()', function () {
    it('calls QSH command', function (done) {
      const connection = new iConn(database, username, password, restOptions);
      connection.add(new iPgm('MYPGMTOOLONG'));
      connection.add(iQsh('system wrksyssts'));
      connection.run((xmlOut) => {
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
