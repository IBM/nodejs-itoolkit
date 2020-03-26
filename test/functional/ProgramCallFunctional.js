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
const { readFileSync } = require('fs');
const { parseString } = require('xml2js');
const { ProgramCall } = require('../../lib/itoolkit');
const { returnTransports } = require('../../lib/utils');

// Set Env variables or set values here.
let privateKey;
if (process.env.TKPK) {
  privateKey = readFileSync(process.env.TKPK, 'utf-8');
}
const opt = {
  database: process.env.TKDB || '*LOCAL',
  username: process.env.TKUSER || '',
  password: process.env.TKPASS || '',
  host: process.env.TKHOST || 'localhost',
  port: process.env.TKPORT,
  path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
  privateKey,
  passphrase: process.env.TKPHRASE,
  verbose: !!process.env.TKVERBOSE,
  dsn: process.env.TKDSN,
};

const transports = returnTransports(opt);

describe('ProgramCall Functional Tests', () => {
  describe('Test ProgramCall()', () => {
    transports.forEach((transport) => {
      it(`calls QWCRSVAL program checks if it ran successfully using ${transport.name} transport`, (done) => {
        const connection = transport.me;

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
          parseString(xmlOut, (parseError, result) => {
            expect(parseError).to.equal(null);
            expect(result.myscript.pgm[0].success[0]).to.include('+++ success QSYS QWCRSVAL');
            done();
          });
        });
      });
    });
  });


  describe('Test ProgramCall()', () => {
    transports.forEach((transport) => {
      it(`calls QWCRSVAL program and returns arbitrarily named parameter using ${transport.name} transport`, (done) => {
        const connection = transport.me;

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
          name: 'errno',
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
          parseString(xmlOut, (parseError, result) => {
            expect(parseError).to.equal(null);
            expect(result.myscript.pgm[0].success[0]).to.include('+++ success QSYS QWCRSVAL');
            done();
          });
        });
      });
    });
  });

  describe.skip('Test ProgramCall()', () => {
    // ZZSRV6 program requires XMLSERVICE built with tests
    // Skip for now, we need to add before hook to check ZZSRV6 is available
    transports.forEach((transport) => {
      it.skip(`Should be successful with addReturn arbitrary attribute specified using using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const program = new ProgramCall('ZZSRV6', { lib: 'XMLSERVICE', func: 'ZZVARY4' });

        program.addParam({ type: '10A', varying: '4', value: 'Gill' });
        const testValue = 'NEW_NAME';
        program.addReturn('0', '20A', { varying: '4', name: testValue });
        connection.add(program);
        connection.run((error, xmlOut) => {
          expect(error).to.equal(null);
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
});
