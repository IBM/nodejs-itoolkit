// Copyright (c) International Business Machines Corp. 2017
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

const db2Call = (config, xmlInput, done) => {
  const {
    dbconn, dbstmt, IN, CLOB, CHAR, SQL_ATTR_DBC_SYS_NAMING, SQL_FALSE,
  } = require('idb-connector');

  const {
    database = '*LOCAL',
    username = null,
    password = null,
    ipc = '*NA',
    ctl = '*here',
    xslib = 'QXMLSERV',
    verbose = false,
  } = config;

  let xmlOutput = '';
  const sql = `call ${xslib}.iPLUGR512K(?,?,?)`;
  // eslint-disable-next-line new-cap
  const conn = new dbconn();

  conn.setConnAttr(SQL_ATTR_DBC_SYS_NAMING, SQL_FALSE);

  if (typeof verbose === 'boolean') {
    conn.debug(verbose);
  }

  try {
    if (username && password) {
      conn.conn(database, username, password);
    } else {
      conn.conn(database);
    }
  } catch (error) {
    done(error, null);
  }
  // eslint-disable-next-line new-cap
  const stmt = new dbstmt(conn);

  const parameters = [
    [ipc, IN, CHAR],
    [ctl, IN, CHAR],
    [xmlInput, IN, CLOB],
  ];

  function clean(connection, statement) {
    statement.close();
    connection.disconn();
    connection.close();
  }

  stmt.prepare(sql, (prepareError) => {
    if (prepareError) {
      clean(conn, stmt);
      done(prepareError, null);
      return;
    }
    stmt.bindParam(parameters, (bindError) => {
      if (bindError) {
        clean(conn, stmt);
        done(bindError, null);
        return;
      }
      stmt.execute((outArray, executeError) => {
        if (executeError) {
          clean(conn, stmt);
          done(executeError, null);
          return;
        }
        stmt.fetchAll((results, fetchError) => {
          if (fetchError) {
            clean(conn, stmt);
            done(fetchError, null);
            return;
          }
          if (!results.length) {
            clean(conn, stmt);
            done('Empty result set was returned', null);
            return;
          }
          if (results.length === 1) {
            clean(conn, stmt);
            done(null, results[0].OUT151);
            return;
          }
          results.forEach((chunk) => {
            xmlOutput += chunk.OUT151;
          });
          done(null, xmlOutput);
          clean(conn, stmt);
        });
      });
    });
  });
};

exports.db2Call = db2Call;
