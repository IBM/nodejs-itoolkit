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
    dbconn, dbstmt, IN, OUT, CLOB, CHAR, SQL_ATTR_DBC_SYS_NAMING, SQL_FALSE,
  } = require('idb-connector');

  const {
    database,
    username,
    password,
    ipc = '',
    ctl = '',
    xslib,
    debug,
  } = config;

  const xmlOut = 'NULL';
  const sql = `call ${xslib}.iPLUG512K(?,?,?,?)`;

  const conn = new dbconn(); // eslint-disable-line new-cap
  conn.setConnAttr(SQL_ATTR_DBC_SYS_NAMING, SQL_FALSE);
  if (typeof debug === 'boolean') {
    conn.debug(debug);
  }
  if (username && username.length > 0 && password && password.length > 0) {
    conn.conn(database, username, password);
  } else {
    conn.conn(database);
  }

  const stmt = new dbstmt(conn); // eslint-disable-line new-cap

  const bindParams = [
    [ipc, IN, CHAR],
    [ctl, IN, CHAR],
    [xmlInput, IN, CLOB],
    [xmlOut, OUT, CLOB],
  ];

  stmt.prepare(sql, (prepareError) => {
    if (prepareError) {
      done(prepareError, null);
    }
    stmt.bindParam(bindParams, (bindError) => {
      if (bindError) {
        done(bindError, null);
      }
      stmt.execute((outArray, executeError) => { // out is an array of the output parameters.
        if (executeError) {
          done(executeError, null);
        }
        if (outArray.length === 1) {
          // For XML service, there is always only one return XML output. So handle it directly.
          done(null, outArray[0]);
          // For multiple return result, caller should handle it as an array.
        } else {
          done(null, outArray);
        }
        conn.disconn();
        conn.close();
      });
    });
  });
};

exports.db2Call = db2Call;
