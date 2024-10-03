// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/* eslint-disable new-cap */

const { expect } = require('chai');
const { XMLParser, XMLValidator } = require('fast-xml-parser');
const { iSql, iConn } = require('../../../lib/itoolkit');
const { config, printConfig } = require('../config');

// deprecated tests are in place to test compatability using deprecated classes and functions
// these tests use deprecated iConn Class to create a connnection
// iConn only supported idb and rest transports
if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const {
  database, username, password, host, port = 80, path,
} = config.transportOptions;

let restOptions = null;
if (config.transport === 'rest') {
  restOptions = {
    host,
    port,
    path,
  };
}

describe('iSql Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('prepare & execute', function () {
    it('prepares & executes stored procedure then fetch results', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();

      sql.prepare('call qsys2.tcpip_info()');
      sql.execute();
      sql.fetch();
      sql.free();
      connection.add(sql);
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        const sqlNode = result.myscript.sql;
        expect(sqlNode.prepare.success).to.include('+++ success');
        expect(sqlNode.execute.success).to.include('+++ success');
        expect(sqlNode.fetch.success).to.include('+++ success');
        expect(sqlNode.free.success).to.include('+++ success');
        const { data } = result.myscript.sql.fetch.row;
        expect(data[0].desc).to.equal('HOSTNAME');
        expect(data[1].desc).to.equal('VRM');
        expect(data[2].desc).to.equal('DBGROUP');
        expect(data[3].desc).to.equal('IPTYPE');
        expect(data[4].desc).to.equal('IPADDR');
        expect(data[5].desc).to.equal('PORT');
        done();
      });
    });
  });

  describe('addQuery & fetch', function () {
    it('runs a query and fetches results', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();

      sql.addQuery('SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT');
      sql.fetch();
      sql.free();
      connection.add(sql);
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        const sqlNode = result.myscript.sql;
        expect(sqlNode.query.success).to.include('+++ success');
        expect(sqlNode.fetch.success).to.include('+++ success');
        expect(sqlNode.free.success).to.include('+++ success');
        expect(sqlNode.fetch.row[0].data[0].desc).to.equal('LSTNAM');
        expect(sqlNode.fetch.row[0].data[1].desc).to.equal('STATE');
        done();
      });
    });
  });

  describe('added test to ensure issue #11 was resolved', function () {
    it('should parse SQL result set empty data tags correctly', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();

      sql.addQuery('SELECT \'\' AS BLANK, STATE FROM QIWS.QCUSTCDT');
      sql.fetch();
      sql.free();
      connection.add(sql);
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        const sqlNode = result.myscript.sql;
        expect(sqlNode.query.success).to.include('+++ success');
        expect(sqlNode.fetch.success).to.include('+++ success');
        expect(sqlNode.free.success).to.include('+++ success');
        expect(sqlNode.fetch.row[0].data[0].desc).to.equal('BLANK');
        expect(sqlNode.fetch.row[0].data[0]._).to.equal(undefined);
        done();
      });
    });
  });

  describe('tables', function () {
    it('returns meta data for specified table', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();
      // [catalog, schema, table, table type]
      sql.tables(['', 'QIWS', 'QCUSTCDT', '']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.tables.success).to.include('+++ success');
        const { data } = result.myscript.sql.tables.row;
        expect(data[0].desc).to.equal('TABLE_CAT');
        expect(data[1].desc).to.equal('TABLE_SCHEM');
        expect(data[2].desc).to.equal('TABLE_NAME');
        expect(data[3].desc).to.equal('TABLE_TYPE');
        expect(data[4].desc).to.equal('REMARKS');
        done();
      });
    });
  });

  describe('tablePriv', function () {
    it('returns privilege data for a table', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();
      // [catalog, schema, table]
      sql.tablePriv(['', 'QIWS', 'QCUSTCDT']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.tablepriv.success).to.include('+++ success');
        const { data } = result.myscript.sql.tablepriv.row[0];
        expect(data[0].desc).to.equal('TABLE_CAT');
        expect(data[1].desc).to.equal('TABLE_SCHEM');
        expect(data[2].desc).to.equal('TABLE_NAME');
        expect(data[3].desc).to.equal('GRANTOR');
        expect(data[4].desc).to.equal('GRANTEE');
        expect(data[5].desc).to.equal('PRIVILEGE');
        expect(data[6].desc).to.equal('IS_GRANTABLE');
        done();
      });
    });
  });

  describe('columns', function () {
    it('returns meta data for a column', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();
      // catalog, schema, table, column
      sql.columns(['', 'QIWS', 'QCUSTCDT', 'CUSNUM']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.columns.success).to.include('+++ success');
        const { data } = result.myscript.sql.columns.row;
        expect(data[0].desc).to.equal('TABLE_CAT');
        expect(data[1].desc).to.equal('TABLE_SCHEM');
        expect(data[2].desc).to.equal('TABLE_NAME');
        expect(data[3].desc).to.equal('COLUMN_NAME');
        expect(data[4].desc).to.equal('DATA_TYPE');
        expect(data[5].desc).to.equal('TYPE_NAME');
        expect(data[6].desc).to.equal('COLUMN_SIZE');
        expect(data[7].desc).to.equal('BUFFER_LENGTH');
        expect(data[8].desc).to.equal('DECIMAL_DIGITS');
        expect(data[9].desc).to.equal('NUM_PREC_RADIX');
        expect(data[10].desc).to.equal('NULLABLE');
        expect(data[11].desc).to.equal('REMARKS');
        expect(data[12].desc).to.equal('COLUMN_DEF');
        expect(data[13].desc).to.equal('SQL_DATA_TYPE');
        expect(data[14].desc).to.equal('SQL_DATETIME_SUB');
        expect(data[15].desc).to.equal('CHAR_OCTET_LENGTH');
        expect(data[16].desc).to.equal('ORDINAL_POSITION');
        expect(data[17].desc).to.equal('IS_NULLABLE');
        done();
      });
    });
  });

  describe('columnPriv', function () {
    it('returns privilege data for a column', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();

      sql.columnPriv(['', 'QIWS', 'QCUSTCDT', 'BALDUE']);

      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.columnpriv.success).to.include('+++ success');
        const { data } = result.myscript.sql.columnpriv.row[0];
        expect(data[0].desc).to.equal('TABLE_CAT');
        expect(data[1].desc).to.equal('TABLE_SCHEM');
        expect(data[2].desc).to.equal('TABLE_NAME');
        expect(data[3].desc).to.equal('COLUMN_NAME');
        expect(data[4].desc).to.equal('GRANTOR');
        expect(data[5].desc).to.equal('GRANTEE');
        expect(data[6].desc).to.equal('PRIVILEGE');
        expect(data[7].desc).to.equal('IS_GRANTABLE');
        done();
      });
    });
  });

  describe('procedures', function () {
    it('returns meta data on for a procedure', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();
      // [catalog, schema, procedure]
      sql.procedures(['', 'QSYS2', 'TCPIP_INFO']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.procedures.success).to.include('+++ success');
        const { data } = result.myscript.sql.procedures.row;
        expect(data[0].desc).to.equal('PROCEDURE_CAT');
        expect(data[1].desc).to.equal('PROCEDURE_SCHEM');
        expect(data[2].desc).to.equal('PROCEDURE_NAME');
        expect(data[3].desc).to.equal('NUM_INPUT_PARAMS');
        expect(data[4].desc).to.equal('NUM_OUTPUT_PARAMS');
        expect(data[5].desc).to.equal('NUM_RESULT_SETS');
        expect(data[6].desc).to.equal('REMARKS');
        expect(data[7].desc).to.equal('PROCEDURE_TYPE');
        done();
      });
    });
  });

  describe('pColumns', function () {
    it('returns meta data for procedure column', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();
      // [catalog, schema, procedure, column]
      sql.pColumns(['', 'QSYS2', 'QCMDEXC', 'COMMAND']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.pcolumns.success).to.include('+++ success');
        const { data } = result.myscript.sql.pcolumns.row;
        expect(data[0].desc).to.equal('PROCEDURE_CAT');
        expect(data[1].desc).to.equal('PROCEDURE_SCHEM');
        expect(data[2].desc).to.equal('PROCEDURE_NAME');
        expect(data[3].desc).to.equal('COLUMN_NAME');
        expect(data[4].desc).to.equal('COLUMN_TYPE');
        expect(data[5].desc).to.equal('DATA_TYPE');
        expect(data[6].desc).to.equal('TYPE_NAME');
        expect(data[7].desc).to.equal('COLUMN_SIZE');
        expect(data[8].desc).to.equal('BUFFER_LENGTH');
        expect(data[9].desc).to.equal('DECIMAL_DIGITS');
        expect(data[10].desc).to.equal('NUM_PREC_RADIX');
        expect(data[11].desc).to.equal('NULLABLE');
        expect(data[12].desc).to.equal('REMARKS');
        expect(data[13].desc).to.equal('COLUMN_DEF');
        expect(data[14].desc).to.equal('SQL_DATA_TYPE');
        expect(data[15].desc).to.equal('SQL_DATETIME_SUB');
        expect(data[16].desc).to.equal('CHAR_OCTET_LENGTH');
        expect(data[17].desc).to.equal('ORDINAL_POSITION');
        expect(data[18].desc).to.equal('IS_NULLABLE');
        done();
      });
    });
  });

  describe('primaryKeys', function () {
    it('returns meta data for a primary key', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();
      // [catalog, schema, table]
      sql.primaryKeys(['', 'QUSRSYS', 'QASZRAIRX']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.primarykeys.success).to.include('+++ success');
        const { data } = result.myscript.sql.primarykeys.row[0];
        expect(data[0].desc).to.equal('TABLE_CAT');
        expect(data[1].desc).to.equal('TABLE_SCHEM');
        expect(data[2].desc).to.equal('TABLE_NAME');
        expect(data[3].desc).to.equal('COLUMN_NAME');
        expect(data[4].desc).to.equal('KEY_SEQ');
        expect(data[5].desc).to.equal('PK_NAME');
        done();
      });
    });
  });

  describe('foreignKeys', function () {
    it('returns meta data for a foreign key', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();
      // pk: [catalog, schema, table]
      // fk: [catalog, schema, table]
      sql.foreignKeys(['', 'QUSRSYS', 'QASZRAIRC', '', 'QUSRSYS', 'QASZRAIRX']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.foreignkeys.success).to.include('+++ success');
        const { data } = result.myscript.sql.foreignkeys.row;
        expect(data[0].desc).to.equal('PKTABLE_CAT');
        expect(data[1].desc).to.equal('PKTABLE_SCHEM');
        expect(data[2].desc).to.equal('PKTABLE_NAME');
        expect(data[3].desc).to.equal('PKCOLUMN_NAME');
        expect(data[4].desc).to.equal('FKTABLE_CAT');
        expect(data[5].desc).to.equal('FKTABLE_SCHEM');
        expect(data[6].desc).to.equal('FKTABLE_NAME');
        expect(data[7].desc).to.equal('FKCOLUMN_NAME');
        expect(data[8].desc).to.equal('KEY_SEQ');
        expect(data[9].desc).to.equal('UPDATE_RULE');
        expect(data[10].desc).to.equal('DELETE_RULE');
        expect(data[11].desc).to.equal('FK_NAME');
        expect(data[12].desc).to.equal('PK_NAME');
        expect(data[13].desc).to.equal('DEFERRABILITY');
        done();
      });
    });
  });

  describe('statistics', function () {
    it('returns stats info for table', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();

      sql.statistics(['', 'QIWS', 'QCUSTCDT', 'all']);
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        expect(result.myscript.sql.statistics.success).to.include('+++ success');
        const { data } = result.myscript.sql.statistics.row;
        expect(data[0].desc).to.equal('TABLE_CAT');
        expect(data[1].desc).to.equal('TABLE_SCHEM');
        expect(data[2].desc).to.equal('TABLE_NAME');
        expect(data[3].desc).to.equal('NON_UNIQUE');
        expect(data[4].desc).to.equal('INDEX_QUALIFIER');
        expect(data[5].desc).to.equal('INDEX_NAME');
        expect(data[6].desc).to.equal('TYPE');
        expect(data[7].desc).to.equal('ORDINAL_POSITION');
        expect(data[8].desc).to.equal('COLUMN_NAME');
        expect(data[9].desc).to.equal('ASC_OR_DESC');
        expect(data[10].desc).to.equal('CARDINALITY');
        expect(data[11].desc).to.equal('PAGES');
        expect(data[12].desc).to.equal('FILTER_CONDITION');
        done();
      });
    });
  });

  describe.skip('special', function () {
    // TODO: find passing case
    // Below test fails with error code 9- argument value not valid
    it.skip('returns meta data for special columns', function (done) {
      // [catalog, schema, table, row | transaction |session, no | nullable]
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();

      sql.special(['', 'QUSRSYS', 'QASZRAIRX', 'row', 'no'], { error: 'on' });
      connection.add(sql.toXML());
      connection.debug(true);
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        // TODO add more assertions
        expect(result).to.be.an('object');
        done();
      });
    });
  });

  describe.skip('rowCount', function () {
    // Skip for now need to create a table for this test  to insert to.
    it.skip('returns the number of rows affected by statement', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const sql = new iSql();

      const insert = 'INSERT INTO QIWS.QCUSTCDT (CUSNUM,LSTNAM,INIT,STREET,CITY,STATE,ZIPCOD,CDTLMT,CHGCOD,BALDUE,CDTDUE) '
                       + 'VALUES (8798,\'TURNER\',\'TT\',\'MAIN\',\'NYC\',\'NY\',10001, 500, 3, 40.00, 0.00) with NONE';

      sql.addQuery(insert);
      sql.rowCount();
      sql.free();
      connection.add(sql.toXML());
      connection.run((xmlOut) => {
        const validate = XMLValidator.validate(xmlOut, {
          allowBooleanAttributes: true,
        });
        expect(validate).to.equal(true);
        const parser = new XMLParser({
          // Added ignoreAttributes to allow fast-xml-parser to return description.
          ignoreAttributes: false,
          attributeNamePrefix: '',
        });
        const result = parser.parse(xmlOut);
        const sqlNode = result.myscript.sql;
        expect(sqlNode.query.success).to.include('+++ success');
        expect(sqlNode.free.success).to.include('+++ success');
        expect(sqlNode.rowcount['#text']).to.equal(1);
        done();
      });
    });
  });
});
