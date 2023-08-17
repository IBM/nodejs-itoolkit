// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

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
