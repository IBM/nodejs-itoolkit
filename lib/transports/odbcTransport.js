// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

let odbc = null;

try {
  /* eslint-disable import/no-unresolved */
  // eslint-disable-next-line global-require
  odbc = require('odbc');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}

function odbcCall(config, xmlInput, done) {
  // odbc transport is not available bail out
  if (odbc === null) {
    done(new Error('odbc transport was not found, ensure odbc is installed properly.'), null);
  }

  const {
    odbcConnection = null,
    host = 'localhost',
    username = null,
    password = null,
    ipc = '*NA',
    ctl = '*here',
    xslib = 'QXMLSERV',
    verbose = false,
    dsn = null,
  } = config;

  const sql = `call ${xslib}.iPLUGR512K(?,?,?)`;
  const driver = 'IBM i Access ODBC Driver';
  let connectionString;

  if (dsn && typeof dsn === 'string') {
    connectionString = `DSN=${dsn}`;
  } else {
    connectionString = `DRIVER=${driver};SYSTEM=${host};`;

    if (username && typeof username === 'string') {
      connectionString += `UID=${username};`;
    }
    if (password && typeof password === 'string') {
      connectionString += `PWD=${password};`;
    }
  }

  if (verbose) {
    console.log(`SQL to run is ${sql}`);
  }

  function processResults(results) {
    if (!results) {
      done('Empty result set was returned', null);
      return;
    }

    let xmlOutput = '';

    results.forEach((chunk) => {
      xmlOutput += chunk.OUT151;
    });
    done(null, xmlOutput);
  }

  function query(connection) {
    connection.query(sql, [ipc, ctl, xmlInput], (queryError, results) => {
      if (queryError) {
        done(queryError, null);
        return;
      }
      if (!odbcConnection) {
        connection.close((closeError) => {
          if (closeError) {
            done(closeError, null);
            return;
          }

          processResults(results);
        });
      } else {
        processResults(results);
      }
    });
  }

  if (!odbcConnection) {
    odbc.connect(connectionString, (connectError, connection) => {
      if (connectError) {
        done(connectError, null);
        return;
      }
      query(connection);
    });
  } else {
    query(odbcConnection);
  }
}

exports.odbcCall = odbcCall;
