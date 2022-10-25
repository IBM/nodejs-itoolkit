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

/* eslint-disable new-cap */

const { expect } = require('chai');
const sinon = require('sinon');
const { iConn, iSh } = require('../../../lib/itoolkit');

describe('iConn Class Unit Tests', function () {
  describe('constructor', function () {
    it('creates and returns an instance of iConn with idb transport', function () {
      const database = process.env.TKDB || '*LOCAL';
      const username = process.env.TKUSER || '';
      const password = process.env.TKPASS || '';

      const connection = new iConn(database, username, password);

      expect(connection).to.be.instanceOf(iConn);
      expect(connection.connection.transportOptions).to.be.an('Object');
      expect(connection.connection.transportOptions.database).to.equal(database);
      expect(connection.connection.transportOptions.username).to.equal(username);
      expect(connection.connection.transportOptions.password).to.equal(password);
      expect(connection.connection.transport).to.equal('idb');
      expect(connection.connection.commandList).to.be.an('Array');
      expect(connection.connection.commandList.length).to.equal(0);
      expect(connection.connection.verbose).to.equal(false);
    });

    it('creates and returns an instance of iConn with rest transport', function () {
      const database = process.env.TKDB || '*LOCAL';
      const username = process.env.TKUSER || '';
      const password = process.env.TKPASS || '';

      const options = {
        host: process.env.TKHOST || 'localhost',
        port: process.env.TKPORT || 80,
        path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
        xslib: 'QXMLSERV',
        ipc: '*NA',
        ctl: '*here',
      };

      const connection = new iConn(database, username, password, options);

      expect(connection).to.be.instanceOf(iConn);
      expect(connection.connection.transportOptions).to.be.an('Object');
      expect(connection.connection.transportOptions.database).to.equal(database);
      expect(connection.connection.transportOptions.username).to.equal(username);
      expect(connection.connection.transportOptions.password).to.equal(password);
      expect(connection.connection.transport).to.equal('rest');
      expect(connection.connection.transportOptions.ctl).to.equal('*here');
      expect(connection.connection.transportOptions.ipc).to.equal('*NA');
      expect(connection.connection.transportOptions.xslib).to.equal('QXMLSERV');
      expect(connection.connection.commandList).to.be.an('Array');
      expect(connection.connection.commandList.length).to.equal(0);
      expect(connection.connection.verbose).to.equal(false);
    });
  });

  describe('add', function () {
    it('appends to xml service request to the command list using iConn class', function () {
      const database = process.env.TKDB || '*LOCAL';
      const username = process.env.TKUSER || '';
      const password = process.env.TKPASS || '';
      const connection = new iConn(database, username, password);

      connection.add(iSh('ls -lah'));
      expect(connection.connection.commandList.length).to.equal(1);
      expect(connection.connection.commandList[0]).to.equal('<sh error=\'fast\'>ls -lah</sh>');
    });
  });

  describe('debug', function () {
    it('turns verbose mode on/off using iConn class', function () {
      const database = process.env.TKDB || '*LOCAL';
      const username = process.env.TKUSER || '';
      const password = process.env.TKPASS || '';
      const connection = new iConn(database, username, password);

      connection.debug(true);
      expect(connection.debug()).to.equal(true);
      connection.debug(false);
      expect(connection.debug()).to.equal(false);
    });
  });

  describe('getTransportOptions', function () {
    it('returns conn (object) property from iConn instance', function () {
      const database = process.env.TKDB || '*LOCAL';
      const username = process.env.TKUSER || '';
      const password = process.env.TKPASS || '';

      const connection = new iConn(database, username, password);

      // iConn.getConnection() calls -> Connection.getTransportOptions()
      const options = connection.getConnection();

      expect(options).to.be.an('Object');
      expect(options.database).to.equal(database);
      expect(options.username).to.equal(username);
      expect(options.password).to.equal(password);
    });
  });

  describe('run', function () {
    it('(iConn) invokes transport to execute xml input and returns xml output in callback', function () {
      const database = process.env.TKDB || '*LOCAL';
      const username = process.env.TKUSER || '';
      const password = process.env.TKPASS || '';

      const connection = new iConn(database, username, password);
      const xmlOut = `<?xml version='1.0'?><myscript><sql>
      <query error='fast' conn='conn1' stmt='stmt1'>
      <success><![CDATA[+++ success SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT]]></success>
      </query>
      <fetch block='all' desc='on' stmt='stmt1'>
      <row><data desc='LSTNAM'>Henning</data><data desc='STATE'>TX</data></row>
      <row><data desc='LSTNAM'>Jones</data><data desc='STATE'>NY</data></row>
      <row><data desc='LSTNAM'>Vine</data><data desc='STATE'>VT</data></row>
      <row><data desc='LSTNAM'>Johnson</data><data desc='STATE'>GA</data></row>
      <row><data desc='LSTNAM'>Tyron</data><data desc='STATE'>NY</data></row>
      <row><data desc='LSTNAM'>Stevens</data><data desc='STATE'>CO</data></row>
      <row><data desc='LSTNAM'>Alison</data><data desc='STATE'>MN</data></row>
      <row><data desc='LSTNAM'>Doe</data><data desc='STATE'>CA</data></row>
      <row><data desc='LSTNAM'>Thomas</data><data desc='STATE'>WY</data></row>
      <row><data desc='LSTNAM'>Williams</data><data desc='STATE'>TX</data></row>
      <row><data desc='LSTNAM'>Lee</data><data desc='STATE'>NY</data></row>
      <row><data desc='LSTNAM'>Abraham</data><data desc='STATE'>MN</data></row>
      <success>+++ success stmt1</success>
      </fetch>
      <free><success>+++ success </success>
      </free>
      </sql>
      </myscript>`;

      sinon.stub(connection, 'run').yields(xmlOut);

      connection.run((result) => {
        expect(result).to.equal(xmlOut);
      });
    });
  });
});
