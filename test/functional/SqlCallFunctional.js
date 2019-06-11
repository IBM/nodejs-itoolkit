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
const { readFileSync } = require('fs');
const { SqlCall } = require('../../lib/itoolkit');
const { xmlToJs, returnTransports } = require('../../lib/utils');

// Set Env variables or set values here.
let privateKey;
if (process.env.TKPK) {
  privateKey = readFileSync(process.env.TKPK, 'utf-8');
}
const opt = {
  database: process.env.TKDB || '*LOCAL',
  username: process.env.TKUSER || '',
  password: process.env.TKPASS || '',
  host: process.env.TKHOST || 'localhost',
  port: process.env.TKPORT,
  path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
  privateKey,
  passphrase: process.env.TKPHRASE,
  verbose: !!process.env.TKVERBOSE,
};

const transports = returnTransports(opt);

describe('SqlCall Functional Tests', () => {
  describe('prepare & execute', () => {
    transports.forEach((transport) => {
      it(`prepares & executes stored procedure then fetch results using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();

        sql.prepare('call qsys2.tcpip_info()');
        sql.execute();
        sql.fetch();
        sql.free();
        connection.add(sql);
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('addQuery & fetch', () => {
    transports.forEach((transport) => {
      it(`runs a query and fetches results using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();

        sql.addQuery('SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT');
        sql.fetch();
        sql.free();
        connection.add(sql);
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);
          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('added test to ensure issue #11 was resolved', () => {
    transports.forEach((transport) => {
      it(`should parse SQL result set empty data tags correctly using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();

        sql.addQuery('SELECT \'\' AS BLANK, STATE FROM QIWS.QCUSTCDT');
        sql.fetch();
        sql.free();
        connection.add(sql);
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);
          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                  expect(row[0].value).to.equal(undefined);
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('tables', () => {
    transports.forEach((transport) => {
      it(`returns meta data for specified table using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();
        // [catalog, schema, table, table type]
        sql.tables(['', 'QIWS', 'QCUSTCDT', '']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('tablePriv', () => {
    transports.forEach((transport) => {
      it(`returns privilege data for a table using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();
        // [catalog, schema, table]
        sql.tablePriv(['', 'QIWS', 'QCUSTCDT']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('columns', () => {
    transports.forEach((transport) => {
      it(`returns meta data for a column using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();
        // catalog, schema, table, column
        sql.columns(['', 'QIWS', 'QCUSTCDT', 'CUSNUM']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('columnPriv', () => {
    transports.forEach((transport) => {
      it(`returns privilege data for a column using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();

        sql.columnPriv(['', 'QIWS', 'QCUSTCDT', 'BALDUE']);

        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('procedures', () => {
    transports.forEach((transport) => {
      it(`returns meta data on for a procedure using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();
        // [catalog, schema, procedure]
        sql.procedures(['', 'QSYS2', 'TCPIP_INFO']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('pColumns', () => {
    transports.forEach((transport) => {
      it(`returns meta data for procedure column using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();
        // [catalog, schema, procedure, column]
        sql.pColumns(['', 'QSYS2', 'QCMDEXC', 'COMMAND']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('primaryKeys', () => {
    transports.forEach((transport) => {
      it(`returns meta data for a primary key using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();
        // [catalog, schema, table]
        sql.primaryKeys(['', 'QUSRSYS', 'QASZRAIRX']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);
          
          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('foreignKeys', () => {
    transports.forEach((transport) => {
      it(`returns meta data for a foreign key using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();
        // pk: [catalog, schema, table]
        // fk: [catalog, schema, table]
        sql.foreignKeys(['', 'QUSRSYS', 'QASZRAIRC', '', 'QUSRSYS', 'QASZRAIRX']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe('statistics', () => {
    transports.forEach((transport) => {
      it(`returns stats info for table using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();

        sql.statistics(['', 'QIWS', 'QCUSTCDT', 'all']);
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          expect(error).to.equal(null);
          const results = await xmlToJs(xmlOut);

          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.result && stmt.result.length > 0) {
                stmt.result.forEach((row) => {
                  expect(row[0]).to.be.an('object');
                  expect(row[0]).haveOwnProperty('desc');
                  expect(row[0]).haveOwnProperty('value');
                });
              }
            });
          });
          done();
        });
      });
    });
  });

  describe.skip('special', () => {
    // TODO: find passing case
    // Below test fails with error code 9- argument value not valid
    transports.forEach((transport) => {
      it.skip(`returns meta data for special columns using ${transport.name} transport`, (done) => {
        // [catalog, schema, table, row | transaction |session, no | nullable]
        const connection = transport.me;

        const sql = new SqlCall();

        sql.special(['', 'QUSRSYS', 'QASZRAIRX', 'row', 'no'], { error: 'on' });
        connection.add(sql.toXML());
        connection.debug(true);
        connection.run(async (error, xmlOut) => {
          // eslint-disable-next-line no-console
          console.log(`xml output: \n ${xmlOut}`);
          const results = await xmlToJs(xmlOut);
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(results));
          done();
        });
      });
    });
  });

  describe('rowCount', () => {
    transports.forEach((transport) => {
      it(`returns the number of rows affected by statement using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const sql = new SqlCall();

        const insert = 'INSERT INTO QIWS.QCUSTCDT (CUSNUM,LSTNAM,INIT,STREET,CITY,STATE,ZIPCOD,CDTLMT,CHGCOD,BALDUE,CDTDUE) '
                       + 'VALUES (8798,\'TURNER\',\'TT\',\'MAIN\',\'NYC\',\'NY\',10001, 500, 3, 40.00, 0.00) with NONE';

        sql.addQuery(insert);
        sql.rowCount();
        sql.free();
        connection.add(sql.toXML());
        connection.run(async (error, xmlOut) => {
          const results = await xmlToJs(xmlOut);
          results.forEach((result) => {         
            expect(result.data).to.be.an('array');
            result.data.forEach((stmt) => {
              expect(stmt).to.be.an('object');
              if(stmt.success) if(stmt.success) expect(stmt.success).to.equal(true);
              expect(stmt).haveOwnProperty('command');
              
              if(stmt.command === 'rowcount') {
                expect(stmt.result).to.equal('1');
              }
            });
          });
          done();
        });
      });
    });
  });
});
