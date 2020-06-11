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
const { CommandCall } = require('../../lib/itoolkit');

describe('Command Call Unit Tests', function () {
  describe('SH command tests', function () {
    it('accepts command input and returns <sh> XML output', function () {
      const command = new CommandCall({ command: 'ls -lah', type: 'sh' });

      const expectedXML = '<sh error=\'fast\'>ls -lah</sh>';

      expect(command.toXML()).to.be.a('string').and.to.equal(expectedXML);
    });

    it('accepts command input and options returns <sh> with optional attributes', function () {
      const options = {
        error: 'on', before: '65535', after: '37', rows: 'on',
      };

      const command = new CommandCall({ command: 'ls -lah', type: 'sh', options });

      const expectedXML = '<sh rows=\'on\' before=\'65535\' after=\'37\' error=\'on\'>ls -lah</sh>';

      expect(command.toXML()).to.be.a('string').and.to.equal(expectedXML);
    });
  });

  describe('CL command tests', function () {
    it('accepts command input and returns <cmd> XML output', function () {
      const command = new CommandCall({ command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)', type: 'cl' });

      const expectedXML = '<cmd exec=\'rexx\' error=\'fast\'>RTVJOBA USRLIBL(?) SYSLIBL(?)</cmd>';

      expect(command.toXML()).to.be.a('string').and.to.equal(expectedXML);
    });

    it('accepts command input and options returns <cmd> with optional attributes', function () {
      const options = {
        exec: 'cmd', error: 'on', before: '65535', after: '37', hex: 'on',
      };

      const command = new CommandCall({ command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)', type: 'cl', options });

      const expectedXML = '<cmd exec=\'cmd\' hex=\'on\' before=\'65535\' after=\'37\' error=\'on\''
                          + '>RTVJOBA USRLIBL(?) SYSLIBL(?)</cmd>';

      expect(command.toXML()).to.be.a('string').and.to.equal(expectedXML);
    });
  });

  describe('QSH command tests', function () {
    it('accepts command input and returns <qsh> XML output', function () {
      const command = new CommandCall({ command: 'ls -lah', type: 'qsh' });

      const expectedXML = '<qsh error=\'fast\'>ls -lah</qsh>';

      expect(command.toXML()).to.be.a('string').and.to.equal(expectedXML);
    });

    it('accepts command input and options returns <qsh> with optional attributes', function () {
      const options = {
        error: 'on', before: '65535', after: '37', rows: 'on',
      };
      const command = new CommandCall({ command: 'ls -lah', type: 'qsh', options });

      const expectedXML = '<qsh rows=\'on\' before=\'65535\' after=\'37\' error=\'on\'>ls -lah</qsh>';

      expect(command.toXML()).to.be.a('string').and.to.equal(expectedXML);
    });
  });
});
