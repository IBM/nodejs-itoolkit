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

  odbc.connect(connectionString, (connectError, connection) => {
    if (connectError) {
      done(connectError, null);
      return;
    }
    connection.query(sql, [ipc, ctl, xmlInput], (queryError, results) => {
      if (queryError) {
        done(queryError, null);
        return;
      }
      connection.close((closeError) => {
        if (closeError) {
          done(closeError, null);
          return;
        }

        if (!results) {
          done('Empty result set was returned', null);
          return;
        }

        let xmlOutput = '';

        results.forEach((chunk) => {
          xmlOutput += chunk.OUT151;
        });
        done(null, xmlOutput);
      });
    });
  });
}

exports.odbcCall = odbcCall;
