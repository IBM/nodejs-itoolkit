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
/* eslint-disable new-cap */

const { expect } = require('chai');
const sinon = require('sinon');
const { Connection } = require('../../lib/Connection');
const { iConn, iSh } = require('../../lib/itoolkit');

const opt = {
  database: process.env.TKDB || '*LOCAL',
  username: process.env.TKUSER || '',
  password: process.env.TKPASS || '',
  host: process.env.TKHOST || 'localhost',
  port: process.env.TKPORT || 80,
  path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
};


describe('iConn Class Unit Tests', () => {
  describe('constructor', () => {
    it('creates and returns an instance of Connection with idb transport', () => {
      const connection = new Connection(opt);

      expect(connection).to.be.instanceOf(Connection);
      expect(connection.conn).to.be.an('Object');
      expect(connection.conn.database).to.equal(opt.database);
      expect(connection.conn.username).to.equal(opt.username);
      expect(connection.conn.password).to.equal(opt.password);
      expect(connection.conn.transport).to.equal('idb');
      expect(connection.conn.ctl).to.equal('*here');
      expect(connection.conn.ipc).to.equal('*NA');
      expect(connection.conn.xslib).to.equal('QXMLSERV');
      expect(connection.cmds).to.be.an('Array');
      expect(connection.cmds.length).to.equal(0);
      expect(connection.conn.verbose).to.equal(false);
    });

    it('creates and returns an instance of Connection with rest transport', () => {
      const config = {
        database: process.env.TKDB || '*LOCAL',
        username: process.env.TKUSER || '',
        password: process.env.TKPASS || '',
        host: process.env.TKHOST || 'localhost',
        port: process.env.TKPORT || 80,
        path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
        transport: 'rest',
      };

      const connection = new Connection(config);

      expect(connection).to.be.instanceOf(Connection);
      expect(connection.conn).to.be.an('Object');
      expect(connection.conn.database).to.equal(config.database);
      expect(connection.conn.username).to.equal(config.username);
      expect(connection.conn.password).to.equal(config.password);
      expect(connection.conn.transport).to.equal('rest');
      expect(connection.conn.ctl).to.equal('*here');
      expect(connection.conn.ipc).to.equal('*NA');
      expect(connection.conn.xslib).to.equal('QXMLSERV');
      expect(connection.conn.outputBuffer).to.equal(500000);
      expect(connection.cmds).to.be.an('Array');
      expect(connection.cmds.length).to.equal(0);
      expect(connection.conn.verbose).to.equal(false);
    });

    it('creates and returns an instance of iConn with idb transport', () => {
      const connection = new iConn(opt.database, opt.username, opt.password);

      expect(connection).to.be.instanceOf(iConn);
      expect(connection.connection.conn).to.be.an('Object');
      expect(connection.connection.conn.database).to.equal(opt.database);
      expect(connection.connection.conn.username).to.equal(opt.username);
      expect(connection.connection.conn.password).to.equal(opt.password);
      expect(connection.connection.conn.transport).to.equal('idb');
      expect(connection.connection.conn.ctl).to.equal('*here');
      expect(connection.connection.conn.ipc).to.equal('*NA');
      expect(connection.connection.conn.xslib).to.equal('QXMLSERV');
      expect(connection.connection.cmds).to.be.an('Array');
      expect(connection.connection.cmds.length).to.equal(0);
      expect(connection.connection.conn.verbose).to.equal(false);
    });

    it('creates and returns an instance of iConn with rest transport', () => {
      const connection = new iConn(opt.database, opt.username, opt.password, opt);

      expect(connection).to.be.instanceOf(iConn);
      expect(connection.connection.conn).to.be.an('Object');
      expect(connection.connection.conn.database).to.equal(opt.database);
      expect(connection.connection.conn.username).to.equal(opt.username);
      expect(connection.connection.conn.password).to.equal(opt.password);
      expect(connection.connection.conn.transport).to.equal('rest');
      expect(connection.connection.conn.ctl).to.equal('*here');
      expect(connection.connection.conn.ipc).to.equal('*NA');
      expect(connection.connection.conn.xslib).to.equal('QXMLSERV');
      expect(connection.connection.conn.outputBuffer).to.equal(500000);
      expect(connection.connection.cmds).to.be.an('Array');
      expect(connection.connection.cmds.length).to.equal(0);
      expect(connection.connection.conn.verbose).to.equal(false);
    });
  });

  describe('add', () => {
    it('appends to xml service request to the command list using Connection class', () => {
      const connection = new Connection(opt);

      connection.add(iSh('ls -lah'));
      expect(connection.cmds.length).to.equal(1);
      expect(connection.cmds[0]).to.equal('<sh error=\'fast\'>ls -lah</sh>');
    });

    it('appends to xml service request to the command list using iConn class', () => {
      const connection = new iConn(opt.database, opt.username, opt.password);

      connection.add(iSh('ls -lah'));
      expect(connection.connection.cmds.length).to.equal(1);
      expect(connection.connection.cmds[0]).to.equal('<sh error=\'fast\'>ls -lah</sh>');
    });
  });


  describe('debug', () => {
    it('turns verbose mode on/off using Connection class', () => {
      const connection = new Connection(opt);

      connection.debug(true);
      expect(connection.debug()).to.equal(true);
      connection.debug(false);
      expect(connection.debug()).to.equal(false);
    });

    it('turns verbose mode on/off using iConn class', () => {
      const connection = new iConn(opt.database, opt.username, opt.password);

      connection.debug(true);
      expect(connection.debug()).to.equal(true);
      connection.debug(false);
      expect(connection.debug()).to.equal(false);
    });
  });


  describe('getConnection', () => {
    it('returns conn (object) property from Connection instance', () => {
      const connection = new Connection(opt);

      const returned = connection.getConnection();

      expect(returned).to.be.an('Object');
      expect(returned.database).to.equal(opt.database);
      expect(returned.username).to.equal(opt.username);
      expect(returned.password).to.equal(opt.password);
      expect(returned.transport).to.equal('idb');
      expect(returned.ctl).to.equal('*here');
      expect(returned.ipc).to.equal('*NA');
      expect(returned.xslib).to.equal('QXMLSERV');
    });

    it('returns conn (object) property from iConn instance', () => {
      const connection = new iConn(opt.database, opt.username, opt.password);

      const returned = connection.getConnection();
      console.log(returned);

      expect(returned).to.be.an('Object');
      expect(returned.database).to.equal(opt.database);
      expect(returned.username).to.equal(opt.username);
      expect(returned.password).to.equal(opt.password);
      expect(returned.transport).to.equal('idb');
      expect(returned.ctl).to.equal('*here');
      expect(returned.ipc).to.equal('*NA');
      expect(returned.xslib).to.equal('QXMLSERV');
    });
  });


  describe('run', () => {
    it('(Connection) invokes transport to execute xml input and returns xml output in callback', () => {
      const connection = new Connection(opt.database, opt.username, opt.password);
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

    it('(iConn) invokes transport to execute xml input and returns xml output in callback', () => {
      const connection = new iConn(opt.database, opt.username, opt.password);
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
