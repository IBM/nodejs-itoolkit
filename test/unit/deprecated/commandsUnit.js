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
const { iSh, iQsh, iCmd } = require('../../../lib/itoolkit');

describe('iSh, iCmd, iQsh, Unit Tests', function () {
  describe('iSh function', function () {
    it('accepts command input and returns <sh> XML output', function () {
      const sh = iSh('ls -lah');

      const expectedXML = '<sh error=\'fast\'>ls -lah</sh>';

      expect(sh).to.be.a('string').and.to.equal(expectedXML);
    });

    it('accepts command input and options returns <sh> with optional attributes', function () {
      const options = {
        error: 'on', before: '65535', after: '37', rows: 'on',
      };

      const sh = iSh('ls -lah', options);

      const expectedXML = '<sh rows=\'on\' before=\'65535\' after=\'37\' error=\'on\'>ls -lah</sh>';

      expect(sh).to.be.a('string').and.to.equal(expectedXML);
    });
  });

  describe('iCmd function', function () {
    it('accepts command input and returns <cmd> XML output', function () {
      const cmd = iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)');

      const expectedXML = '<cmd exec=\'rexx\' error=\'fast\'>RTVJOBA USRLIBL(?) SYSLIBL(?)</cmd>';

      expect(cmd).to.be.a('string').and.to.equal(expectedXML);
    });

    it('accepts command input and options returns <cmd> with optional attributes', function () {
      const options = {
        exec: 'cmd', error: 'on', before: '65535', after: '37', hex: 'on',
      };

      const cmd = iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)', options);

      const expectedXML = '<cmd exec=\'cmd\' hex=\'on\' before=\'65535\' after=\'37\' error=\'on\''
                          + '>RTVJOBA USRLIBL(?) SYSLIBL(?)</cmd>';

      expect(cmd).to.be.a('string').and.to.equal(expectedXML);
    });
  });

  describe('iQsh function', function () {
    it('accepts command input and returns <qsh> XML output', function () {
      const qsh = iQsh('RTVJOBA USRLIBL(?) SYSLIBL(?)');

      const expectedXML = '<qsh error=\'fast\'>RTVJOBA USRLIBL(?) SYSLIBL(?)</qsh>';

      expect(qsh).to.be.a('string').and.to.equal(expectedXML);
    });

    it('accepts command input and options returns <qsh> with optional attributes', function () {
      const options = {
        error: 'on', before: '65535', after: '37', rows: 'on',
      };
      const qsh = iQsh('ls -lah', options);

      const expectedXML = '<qsh rows=\'on\' before=\'65535\' after=\'37\' error=\'on\'>ls -lah</qsh>';

      expect(qsh).to.be.a('string').and.to.equal(expectedXML);
    });
  });
});
