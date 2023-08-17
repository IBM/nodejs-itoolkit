// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

let idb = null;

try {
  /* eslint-disable import/no-unresolved */
  // eslint-disable-next-line global-require
  idb = require('idb-connector');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}

function idbCall(config, xmlInput, cb) {
  // idb transport is not available bail out
  if (idb === null) {
    cb(new Error('idb-connector was not found, ensure idb-connector is installed properly (idb-connector is only available on IBM i).'), null);
  }

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
  const conn = new idb.dbconn();

  conn.setConnAttr(idb.SQL_ATTR_DBC_SYS_NAMING, idb.SQL_FALSE);

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
    cb(error, null);
    return;
  }
  // eslint-disable-next-line new-cap
  const stmt = new idb.dbstmt(conn);

  const parameters = [
    [ipc, idb.IN, idb.CHAR],
    [ctl, idb.IN, idb.CHAR],
    [xmlInput, idb.IN, idb.CLOB],
  ];

  // Before returning to caller, we must clean up
  const done = (err, val) => {
    stmt.close();
    conn.disconn();
    conn.close();

    cb(err, val);
  };

  stmt.prepare(sql, (prepareError) => {
    if (prepareError) {
      done(prepareError, null);
      return;
    }
    stmt.bindParam(parameters, (bindError) => {
      if (bindError) {
        done(bindError, null);
        return;
      }
      stmt.execute((outArray, executeError) => {
        if (executeError) {
          done(executeError, null);
          return;
        }
        stmt.fetchAll((results, fetchError) => {
          if (fetchError) {
            done(fetchError, null);
            return;
          }
          if (!results.length) {
            done('Empty result set was returned', null);
            return;
          }
          if (results.length === 1) {
            done(null, results[0].OUT151);
            return;
          }
          results.forEach((chunk) => {
            xmlOutput += chunk.OUT151;
          });
          done(null, xmlOutput);
        });
      });
    });
  });
}

exports.idbCall = idbCall;
