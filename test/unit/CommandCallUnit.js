// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

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
