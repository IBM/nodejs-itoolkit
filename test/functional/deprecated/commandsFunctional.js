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
const {
  iCmd, iSh, iQsh, xmlToJson,
} = require('../../../lib/itoolkit');

const { returnTransportsDeprecated } = require('../../../lib/utils');

// Set Env variables or set values here.
const opt = {
  database: process.env.TKDB || '*LOCAL',
  username: process.env.TKUSER || '',
  password: process.env.TKPASS || '',
  host: process.env.TKHOST || 'localhost',
  port: process.env.TKPORT || 80,
  path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
};

const transports = returnTransportsDeprecated(opt);

describe('iSh, iCmd, iQsh, Functional Tests', () => {
  describe('iCmd()', () => {
    transports.forEach((transport) => {
      it(`calls CL command using ${transport.name} transport`, (done) => {
        const connection = transport.me;
        connection.add(iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)'));
        connection.run((xmlOut) => {
          const results = xmlToJson(xmlOut);
          results.forEach((result) => {
            expect(result.success).to.equal(true);
          });
          done();
        });
      });
    });
  });

  describe('iSh()', () => {
    transports.forEach((transport) => {
      it(`calls PASE shell command using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        connection.add(iSh('system -i wrksyssts'));
        connection.run((xmlOut) => {
          const results = xmlToJson(xmlOut);
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

  describe('iQsh()', () => {
    transports.forEach((transport) => {
      it(`calls QSH command using ${transport.name} transport`, (done) => {
        const connection = transport.me;
        connection.add(iQsh('system wrksyssts'));
        connection.run((xmlOut) => {
          const results = xmlToJson(xmlOut);
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
