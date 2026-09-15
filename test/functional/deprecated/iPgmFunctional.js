// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/* eslint-disable new-cap */

const { expect } = require('chai');
const { XMLParser, XMLValidator } = require('fast-xml-parser');
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

  describe('addParam', function () {
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
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser();
        const result = parser.parse(xmlOut);
        expect(result.myscript.pgm.success).to.include('+++ success QSYS QWCRSVAL');
        done();
      });
    });
  });

  describe.skip('addReturn', function () {
    // ZZSRV6 program requires XMLSERVICE built with tests
    // Skip for now, we need to add before hook to check if ZZSRV6 is available
    it.skip('calls ZZVARY4 and checks the return value', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const program = new iPgm('ZZSRV6', { lib: 'XMLSERVICE', func: 'ZZVARY4' });

      program.addParam('Gill', '10A', { varying: '4' });
      const testValue = 'NEW_NAME';
      program.addReturn('0', '20A', { varying: '4', name: testValue });
      connection.add(program);
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser();
        const result = parser.parse(xmlOut);
        expect(result.myscript.pgm.success).to.include('+++ success');
        expect(result.myscript.pgm.return.data).to.equal('my name is Gill');
        done();
      });
    });
  });
});
