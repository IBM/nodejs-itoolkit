// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

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

const { expect } = require('chai');
const { readFileSync } = require('fs');
const { CommandCall } = require('../../lib/itoolkit');
const { xmlToJs, returnTransports } = require('../../lib/utils');

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
};

const transports = returnTransports(opt);

describe('CommandCall Functional Tests', () => {
  describe('CL command tests', () => {
    transports.forEach((transport) => {
      it(`calls CL command using ${transport.name} transport`, (done) => {
        const connection = transport.me;
        connection.add(new CommandCall({ command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)', type: 'cl' }));
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);
          results.forEach((result) => {
            expect(result.success).to.equal(true);
          });
          done();
        });
      });
    });
  });

  describe('SH command tests', () => {
    transports.forEach((transport) => {
      it(`calls PASE shell command using ${transport.name} transport`, (done) => {
        const connection = transport.me;
        connection.add(new CommandCall({ command: 'system -i wrksyssts', type: 'sh' }));
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);
          // xs does not return success property for iSh or iQsh
          // but on error data property = '\n'
          // so lets base success on contents of data.
          results.forEach((result) => {
            expect(result.data).not.to.equal('\n');
            expect(result.data).to.match(/(System\sStatus\sInformation)/);
          });
          done();
        });
      });
    });
  });

  describe('QSH command tests', () => {
    transports.forEach((transport) => {
      it(`calls QSH command using ${transport.name} transport`, (done) => {
        const connection = transport.me;
        connection.add(new CommandCall({ command: 'system wrksyssts', type: 'qsh' }));
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);
          // xs does not return success property for iSh or iQsh
          // but on error data property = '\n'
          // so lets base success on contents of data.
          results.forEach((result) => {
            expect(result.data).not.to.equal('\n');
            expect(result.data).to.match(/(System\sStatus\sInformation)/);
          });
          done();
        });
      });
    });
  });
});
