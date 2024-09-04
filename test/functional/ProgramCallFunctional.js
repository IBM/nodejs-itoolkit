// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

const { expect } = require('chai');
const { XMLParser } = require('fast-xml-parser');
const { ProgramCall, Connection } = require('../../lib/itoolkit');
const { config, printConfig } = require('./config');

describe('ProgramCall Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('addParam', function () {
    it('calls QWCRSVAL program checks if it ran successfully', function (done) {
      const connection = new Connection(config);

      const program = new ProgramCall('QWCRSVAL', { lib: 'QSYS' });

      const outBuf = {
        type: 'ds',
        io: 'out',
        fields: [
          { type: '10i0', value: 0 },
          { type: '10i0', value: 0 },
          { type: '36h', value: '' },
          { type: '10A', value: '' },
          { type: '1A', value: '' },
          { type: '1A', value: '' },
          { type: '10i0', value: 0 },
          { type: '10i0', value: 0 },
        ],
      };

      const errno = {
        type: 'ds',
        io: 'both',
        len: 'rec2',
        fields: [
          {
            name: 'bytes_provided',
            type: '10i0',
            value: 0,
            setlen: 'rec2',
          },
          { name: 'bytes_available', type: '10i0', value: 0 },
          { name: 'msgid', type: '7A', value: '' },
          { type: '1A', value: '' },
        ],
      };

      program.addParam(outBuf);
      program.addParam({ type: '10i0', value: 66 });
      program.addParam({ type: '10i0', value: 1 });
      program.addParam({ type: '10A', value: 'QCCSID' });
      program.addParam(errno);
      connection.add(program);
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);

        const parser = new XMLParser();
        let result = parser.parse(xmlOut);
        expect(Object.keys(result).length).gt(0);
        expect(result.myscript.pgm.success).to.include('+++ success QSYS QWCRSVAL');
        done();
      });
    });
  });

  describe.skip('addReturn', function () {
    // ZZSRV6 program requires XMLSERVICE built with tests
    // Skip for now, we need to add before hook to check ZZSRV6 is available
    it.skip('calls ZZVARY4 and checks the return value', function (done) {
      const connection = new Connection(config);

      const program = new ProgramCall('ZZSRV6', { lib: 'XMLSERVICE', func: 'ZZVARY4' });

      program.addParam({ type: '10A', varying: '4', value: 'Gill' });
      const testValue = 'NEW_NAME';
      // program.addReturn('0', '20A', { varying: '4', name: testValue });
      program.addReturn({
        varying: '4', name: testValue, value: '0', type: '20A',
      });
      connection.add(program);
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        const parser = new XMLParser();
        let result = parser.parse(xmlOut);
        expect(Object.keys(result).length).gt(0);
        expect(result.myscript.pgm.success).to.include('+++ success');
        expect(result.myscript.pgm.return.data).to.equal('my name is Gill');
        done();
      });
    });
  });
});
