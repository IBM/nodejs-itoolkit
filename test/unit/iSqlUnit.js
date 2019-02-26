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
const { iSql } = require('../../lib/itoolkit');

describe('iSql Class Unit Tests', () => {
  describe('constructor', () => {
    it('creates returns an instance of iSql', () => {
      const sql = new iSql();

      expect(sql).to.be.instanceOf(iSql);
    });
  });
  describe('toXML', () => {
    it('returns current sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql></sql>';

      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('addQuery', () => {
    it('appends query to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><query error=\'on\'>select * from QIWS.QCUSTCDT</query></sql>';

      sql.addQuery('select * from QIWS.QCUSTCDT', { error: 'on' });

      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('fetch', () => {
    it('appends fetch to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><fetch block=\'all\' desc=\'on\'></fetch></sql>';

      sql.fetch();
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('commit', () => {
    it('appends commit to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><commit action=\'commit\'></commit></sql>';

      sql.commit({ action: 'commit' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('prepare', () => {
    it('appends prepare to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><prepare error=\'fast\'>SELECT * FROM QIWS.QCUSTCDT WHERE BALDUE > ?</prepare></sql>';

      sql.prepare('SELECT * FROM QIWS.QCUSTCDT WHERE BALDUE > ?');
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });

  describe('execute', () => {
    it('appends execute to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><execute error=\'fast\'><parm io=\'in\'>30</parm></execute></sql>';

      sql.execute([[30, 'in']]);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('connect', () => {
    it('appends connect to sql XML', () => {
      const sql = new iSql();


      const expectedXML = '<sql><connect db=\'local\' uid=\'me\' pwd=\'mypass\' options=\'opt1\'></connect></sql>';

      sql.connect({ db: 'local', uid: 'me', pwd: 'mypass' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('setOptions', () => {
    it('appends options to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><options autocommit=\'on\' naming=\'system\'></options></sql>';

      sql.setOptions([{ desc: 'autocommit', value: 'on' },
        { desc: 'naming', value: 'system' }]);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('tables', () => {
    it('appends tables to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><tables><parm></parm><parm>QIWS</parm><parm></parm><parm></parm></tables></sql>';
      // catalog, schema, table, table type
      sql.tables(['', 'QIWS', '', '']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('tablePriv', () => {
    it('appends tablepriv to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><tablepriv><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm></tablepriv></sql>';
      // catalog, schema, table
      sql.tablePriv(['', 'QIWS', 'QCUSTCDT']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('columns', () => {
    it('appends columns to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><columns><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm></parm></columns></sql>';
      // catalog, schema, table, column
      sql.columns(['', 'QIWS', 'QCUSTCDT', '']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('columnPriv', () => {
    it('appends columnpriv to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><columnpriv><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm></parm></columnpriv></sql>';
      // catalog, schema, table, column
      sql.columnPriv(['', 'QIWS', 'QCUSTCDT', '']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('procedures', () => {
    it('appends procedures to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><procedures><parm></parm><parm>QSYS2</parm><parm>TCPIP_INFO</parm></procedures></sql>';
      // catalog, schema, procedure
      sql.procedures(['', 'QSYS2', 'TCPIP_INFO']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('pColumns', () => {
    it('appends pColumns to sql XML', () => {
      // procedure columns:

      const sql = new iSql();

      const expectedXML = '<sql><pcolumns><parm></parm><parm>QSYS2</parm><parm>QCMDEXC</parm><parm>COMMAND</parm></pcolumns></sql>';
      // catalog, schema, procedure, column
      sql.pColumns(['', 'QSYS2', 'QCMDEXC', 'COMMAND']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('primaryKeys', () => {
    it('appends primarykeys to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><primarykeys><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRX</parm></primarykeys></sql>';
      // catalog, schema, table
      sql.primaryKeys(['', 'QUSRSYS', 'QASZRAIRX']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('foreignKeys', () => {
    it('appends foreignkeys to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><foreignkeys><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRC</parm><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRX</parm></foreignkeys></sql>';

      // pk: catalog, schema, table
      // fk: catalog, schema, table
      sql.foreignKeys(['', 'QUSRSYS', 'QASZRAIRC', '', 'QUSRSYS', 'QASZRAIRX']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('statistics', () => {
    it('appends statistics to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><statistics><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm>all</parm></statistics></sql>';
      // catalog, schema, table, all | unique
      sql.statistics(['', 'QIWS', 'QCUSTCDT', 'all']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('special', () => {
    it('appends special to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><special><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm>row</parm><parm>no</parm></special></sql>';
      // catalog, schema, table, row | transaction | session, no | unique
      sql.special(['', 'QIWS', 'QCUSTCDT', 'row', 'no']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('count', () => {
    it('appends count to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><count desc=\'both\'></count></sql>';
      // catalog, schema, table, all | unique
      sql.count({ desc: 'both' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('rowCount', () => {
    it('appends rowcount to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><rowcount></rowcount></sql>';
      // catalog, schema, table, all | unique
      sql.rowCount();
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('free', () => {
    it('appends free to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><free></free></sql>';
      // catalog, schema, table, all | unique
      sql.free();
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('describe', () => {
    it('appends describe to sql XML', () => {
      const sql = new iSql();

      const expectedXML = '<sql><describe desc=\'both\'></describe></sql>';

      sql.describe({ desc: 'both' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
});
