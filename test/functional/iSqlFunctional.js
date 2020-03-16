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
const { parseString } = require('xml2js');
const { iSql, Connection } = require('../../lib/itoolkit');
const { config } = require('./config');

describe('iSql Functional Tests', () => {
  describe('prepare & execute', () => {
    it(`prepares & executes stored procedure then fetch results using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();

      sql.prepare('call qsys2.tcpip_info()');
      sql.execute();
      sql.fetch();
      sql.free();
      connection.add(sql);
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);

        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          const sqlNode = result.myscript.sql[0];
          expect(sqlNode.prepare[0].success[0]).to.include('+++ success');
          expect(sqlNode.execute[0].success[0]).to.include('+++ success');
          expect(sqlNode.fetch[0].success[0]).to.include('+++ success');
          expect(sqlNode.free[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].fetch[0].row[0];
          expect(data[0].$.desc).to.equal('HOSTNAME');
          expect(data[1].$.desc).to.equal('VRM');
          expect(data[2].$.desc).to.equal('DBGROUP');
          expect(data[3].$.desc).to.equal('IPTYPE');
          expect(data[4].$.desc).to.equal('IPADDR');
          expect(data[5].$.desc).to.equal('PORT');
          done();
        });
      });
    });
  });

  describe('addQuery & fetch', () => {
    it(`runs a query and fetches results using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();

      sql.addQuery('SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT');
      sql.fetch();
      sql.free();
      connection.add(sql);
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          const sqlNode = result.myscript.sql[0];
          expect(sqlNode.query[0].success[0]).to.include('+++ success');
          expect(sqlNode.fetch[0].success[0]).to.include('+++ success');
          expect(sqlNode.free[0].success[0]).to.include('+++ success');
          expect(sqlNode.fetch[0].row[0].data[0].$.desc).to.equal('LSTNAM');
          expect(sqlNode.fetch[0].row[0].data[1].$.desc).to.equal('STATE');
          done();
        });
      });
    });
  });

  describe('added test to ensure issue #11 was resolved', () => {
    it(`should parse SQL result set empty data tags correctly using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();

      sql.addQuery('SELECT \'\' AS BLANK, STATE FROM QIWS.QCUSTCDT');
      sql.fetch();
      sql.free();
      connection.add(sql);
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          const sqlNode = result.myscript.sql[0];
          expect(sqlNode.query[0].success[0]).to.include('+++ success');
          expect(sqlNode.fetch[0].success[0]).to.include('+++ success');
          expect(sqlNode.free[0].success[0]).to.include('+++ success');
          expect(sqlNode.fetch[0].row[0].data[0].$.desc).to.equal('BLANK');
          // xml2js no inner data gets parsed as undefined.
          expect(sqlNode.fetch[0].row[0].data[0]._).to.equal(undefined);
          done();
        });
      });
    });
  });

  describe('tables', () => {
    it(`returns meta data for specified table using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();
      // [catalog, schema, table, table type]
      sql.tables(['', 'QIWS', 'QCUSTCDT', '']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].tables[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].tables[0].row[0];
          expect(data[0].$.desc).to.equal('TABLE_CAT');
          expect(data[1].$.desc).to.equal('TABLE_SCHEM');
          expect(data[2].$.desc).to.equal('TABLE_NAME');
          expect(data[3].$.desc).to.equal('TABLE_TYPE');
          expect(data[4].$.desc).to.equal('REMARKS');
          done();
        });
      });
    });
  });

  describe('tablePriv', () => {
    it(`returns privilege data for a table using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();
      // [catalog, schema, table]
      sql.tablePriv(['', 'QIWS', 'QCUSTCDT']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].tablepriv[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].tablepriv[0].row[0];
          expect(data[0].$.desc).to.equal('TABLE_CAT');
          expect(data[1].$.desc).to.equal('TABLE_SCHEM');
          expect(data[2].$.desc).to.equal('TABLE_NAME');
          expect(data[3].$.desc).to.equal('GRANTOR');
          expect(data[4].$.desc).to.equal('GRANTEE');
          expect(data[5].$.desc).to.equal('PRIVILEGE');
          expect(data[6].$.desc).to.equal('IS_GRANTABLE');
          done();
        });
      });
    });
  });

  describe('columns', () => {
    it(`returns meta data for a column using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();
      // catalog, schema, table, column
      sql.columns(['', 'QIWS', 'QCUSTCDT', 'CUSNUM']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].columns[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].columns[0].row[0];
          expect(data[0].$.desc).to.equal('TABLE_CAT');
          expect(data[1].$.desc).to.equal('TABLE_SCHEM');
          expect(data[2].$.desc).to.equal('TABLE_NAME');
          expect(data[3].$.desc).to.equal('COLUMN_NAME');
          expect(data[4].$.desc).to.equal('DATA_TYPE');
          expect(data[5].$.desc).to.equal('TYPE_NAME');
          expect(data[6].$.desc).to.equal('COLUMN_SIZE');
          expect(data[7].$.desc).to.equal('BUFFER_LENGTH');
          expect(data[8].$.desc).to.equal('DECIMAL_DIGITS');
          expect(data[9].$.desc).to.equal('NUM_PREC_RADIX');
          expect(data[10].$.desc).to.equal('NULLABLE');
          expect(data[11].$.desc).to.equal('REMARKS');
          expect(data[12].$.desc).to.equal('COLUMN_DEF');
          expect(data[13].$.desc).to.equal('SQL_DATA_TYPE');
          expect(data[14].$.desc).to.equal('SQL_DATETIME_SUB');
          expect(data[15].$.desc).to.equal('CHAR_OCTET_LENGTH');
          expect(data[16].$.desc).to.equal('ORDINAL_POSITION');
          expect(data[17].$.desc).to.equal('IS_NULLABLE');
          done();
        });
      });
    });
  });

  describe('columnPriv', () => {
    it(`returns privilege data for a column using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();

      sql.columnPriv(['', 'QIWS', 'QCUSTCDT', 'BALDUE']);

      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].columnpriv[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].columnpriv[0].row[0];
          expect(data[0].$.desc).to.equal('TABLE_CAT');
          expect(data[1].$.desc).to.equal('TABLE_SCHEM');
          expect(data[2].$.desc).to.equal('TABLE_NAME');
          expect(data[3].$.desc).to.equal('COLUMN_NAME');
          expect(data[4].$.desc).to.equal('GRANTOR');
          expect(data[5].$.desc).to.equal('GRANTEE');
          expect(data[6].$.desc).to.equal('PRIVILEGE');
          expect(data[7].$.desc).to.equal('IS_GRANTABLE');
          done();
        });
      });
    });
  });

  describe('procedures', () => {
    it(`returns meta data on for a procedure using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();
      // [catalog, schema, procedure]
      sql.procedures(['', 'QSYS2', 'TCPIP_INFO']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].procedures[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].procedures[0].row[0];
          expect(data[0].$.desc).to.equal('PROCEDURE_CAT');
          expect(data[1].$.desc).to.equal('PROCEDURE_SCHEM');
          expect(data[2].$.desc).to.equal('PROCEDURE_NAME');
          expect(data[3].$.desc).to.equal('NUM_INPUT_PARAMS');
          expect(data[4].$.desc).to.equal('NUM_OUTPUT_PARAMS');
          expect(data[5].$.desc).to.equal('NUM_RESULT_SETS');
          expect(data[6].$.desc).to.equal('REMARKS');
          expect(data[7].$.desc).to.equal('PROCEDURE_TYPE');
          done();
        });
      });
    });
  });

  describe('pColumns', () => {
    it(`returns meta data for procedure column using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();
      // [catalog, schema, procedure, column]
      sql.pColumns(['', 'QSYS2', 'QCMDEXC', 'COMMAND']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].pcolumns[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].pcolumns[0].row[0];
          expect(data[0].$.desc).to.equal('PROCEDURE_CAT');
          expect(data[1].$.desc).to.equal('PROCEDURE_SCHEM');
          expect(data[2].$.desc).to.equal('PROCEDURE_NAME');
          expect(data[3].$.desc).to.equal('COLUMN_NAME');
          expect(data[4].$.desc).to.equal('COLUMN_TYPE');
          expect(data[5].$.desc).to.equal('DATA_TYPE');
          expect(data[6].$.desc).to.equal('TYPE_NAME');
          expect(data[7].$.desc).to.equal('COLUMN_SIZE');
          expect(data[8].$.desc).to.equal('BUFFER_LENGTH');
          expect(data[9].$.desc).to.equal('DECIMAL_DIGITS');
          expect(data[10].$.desc).to.equal('NUM_PREC_RADIX');
          expect(data[11].$.desc).to.equal('NULLABLE');
          expect(data[12].$.desc).to.equal('REMARKS');
          expect(data[13].$.desc).to.equal('COLUMN_DEF');
          expect(data[14].$.desc).to.equal('SQL_DATA_TYPE');
          expect(data[15].$.desc).to.equal('SQL_DATETIME_SUB');
          expect(data[16].$.desc).to.equal('CHAR_OCTET_LENGTH');
          expect(data[17].$.desc).to.equal('ORDINAL_POSITION');
          expect(data[18].$.desc).to.equal('IS_NULLABLE');
          done();
        });
      });
    });
  });

  describe('primaryKeys', () => {
    it(`returns meta data for a primary key using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();
      // [catalog, schema, table]
      sql.primaryKeys(['', 'QUSRSYS', 'QASZRAIRX']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].primarykeys[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].primarykeys[0].row[0];
          expect(data[0].$.desc).to.equal('TABLE_CAT');
          expect(data[1].$.desc).to.equal('TABLE_SCHEM');
          expect(data[2].$.desc).to.equal('TABLE_NAME');
          expect(data[3].$.desc).to.equal('COLUMN_NAME');
          expect(data[4].$.desc).to.equal('KEY_SEQ');
          expect(data[5].$.desc).to.equal('PK_NAME');
          done();
        });
      });
    });
  });

  describe('foreignKeys', () => {
    it(`returns meta data for a foreign key using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();
      // pk: [catalog, schema, table]
      // fk: [catalog, schema, table]
      sql.foreignKeys(['', 'QUSRSYS', 'QASZRAIRC', '', 'QUSRSYS', 'QASZRAIRX']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].foreignkeys[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].foreignkeys[0].row[0];
          expect(data[0].$.desc).to.equal('PKTABLE_CAT');
          expect(data[1].$.desc).to.equal('PKTABLE_SCHEM');
          expect(data[2].$.desc).to.equal('PKTABLE_NAME');
          expect(data[3].$.desc).to.equal('PKCOLUMN_NAME');
          expect(data[4].$.desc).to.equal('FKTABLE_CAT');
          expect(data[5].$.desc).to.equal('FKTABLE_SCHEM');
          expect(data[6].$.desc).to.equal('FKTABLE_NAME');
          expect(data[7].$.desc).to.equal('FKCOLUMN_NAME');
          expect(data[8].$.desc).to.equal('KEY_SEQ');
          expect(data[9].$.desc).to.equal('UPDATE_RULE');
          expect(data[10].$.desc).to.equal('DELETE_RULE');
          expect(data[11].$.desc).to.equal('FK_NAME');
          expect(data[12].$.desc).to.equal('PK_NAME');
          expect(data[13].$.desc).to.equal('DEFERRABILITY');
          done();
        });
      });
    });
  });

  describe('statistics', () => {
    it(`returns stats info for table using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();

      sql.statistics(['', 'QIWS', 'QCUSTCDT', 'all']);
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          expect(result.myscript.sql[0].statistics[0].success[0]).to.include('+++ success');
          const { data } = result.myscript.sql[0].statistics[0].row[0];
          expect(data[0].$.desc).to.equal('TABLE_CAT');
          expect(data[1].$.desc).to.equal('TABLE_SCHEM');
          expect(data[2].$.desc).to.equal('TABLE_NAME');
          expect(data[3].$.desc).to.equal('NON_UNIQUE');
          expect(data[4].$.desc).to.equal('INDEX_QUALIFIER');
          expect(data[5].$.desc).to.equal('INDEX_NAME');
          expect(data[6].$.desc).to.equal('TYPE');
          expect(data[7].$.desc).to.equal('ORDINAL_POSITION');
          expect(data[8].$.desc).to.equal('COLUMN_NAME');
          expect(data[9].$.desc).to.equal('ASC_OR_DESC');
          expect(data[10].$.desc).to.equal('CARDINALITY');
          expect(data[11].$.desc).to.equal('PAGES');
          expect(data[12].$.desc).to.equal('FILTER_CONDITION');
          done();
        });
      });
    });
  });

  describe.skip('special', () => {
    // TODO: find passing case
    // Below test fails with error code 9- argument value not valid
    it.skip(`returns meta data for special columns using ${config.transport} transport`, (done) => {
      // [catalog, schema, table, row | transaction |session, no | nullable]
      const connection = new Connection(config);

      const sql = new iSql();

      sql.special(['', 'QUSRSYS', 'QASZRAIRX', 'row', 'no'], { error: 'on' });
      connection.add(sql.toXML());
      connection.debug(true);
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          expect(parseError).to.equal(null);
          // TODO add more assertions
          expect(result).to.be.an('object');
          done();
        });
      });
    });
  });

  describe.skip('rowCount', () => {
    // Skip for now need to create a table for this test  to insert to.
    it.skip(`returns the number of rows affected by statement using ${config.transport} transport`, (done) => {
      const connection = new Connection(config);

      const sql = new iSql();

      const insert = 'INSERT INTO QIWS.QCUSTCDT (CUSNUM,LSTNAM,INIT,STREET,CITY,STATE,ZIPCOD,CDTLMT,CHGCOD,BALDUE,CDTDUE) '
                       + 'VALUES (8798,\'TURNER\',\'TT\',\'MAIN\',\'NYC\',\'NY\',10001, 500, 3, 40.00, 0.00) with NONE';

      sql.addQuery(insert);
      sql.rowCount();
      sql.free();
      connection.add(sql.toXML());
      connection.run((error, xmlOut) => {
        expect(error).to.equal(null);
        parseString(xmlOut, (parseError, result) => {
          const sqlNode = result.myscript.sql[0];
          expect(parseError).to.equal(null);
          expect(sqlNode.query[0].success[0]).to.include('+++ success');
          expect(sqlNode.free[0].success[0]).to.include('+++ success');
          expect(sqlNode.rowcount[0]._).to.equal('1');
          done();
        });
      });
    });
  });
});
