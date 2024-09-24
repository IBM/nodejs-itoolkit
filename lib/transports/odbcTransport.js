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

/**
 * Function to call xmlservice regardless if an existing connection was passed
 * @private
 * @param {Object} parameters - Arguments to call xml service procedure
 */
function callXmlService(parameters) {
  const {
    connection,
    sql,
    queryParameters,
    done,
    shouldCloseConnection,
    verbose,
  } = parameters;

  if (verbose) {
    console.log(`SQL to run is ${sql}`);
  }

  connection.query(sql, queryParameters, (queryError, results) => {
    if (queryError) {
      done(queryError, null);
      return;
    }
    let xmlOutput = '';

    if (!results) {
      done('Empty result set was returned', null);
      return;
    }

    results.forEach((chunk) => {
      xmlOutput += chunk.OUT151;
    });

    if (shouldCloseConnection) {
      connection.close((closeError) => {
        if (closeError) {
          done(closeError, null);
          return;
        }
        done(null, xmlOutput);
      });
    } else {
      done(null, xmlOutput);
    }
  });
}

/**
 * @private
 * @param {object} config - Configuration options for odbc transport
 * @param {string} xmlIn - The xml input to run with xml service
 * @param {function} done - User defined callback to invoke when completed
 */

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
    odbcConnection = null,
  } = config;

  const sql = `call ${xslib}.iPLUGR512K(?,?,?)`;
  const queryParameters = [ipc, ctl, xmlInput];
  const parameters = {
    sql, queryParameters, done, verbose, shouldCloseConnection: !odbcConnection,
  };

  if (!odbcConnection) { // get a connection then call xml service
    // generate connection string
    let connectionString;

    if (dsn && typeof dsn === 'string') {
      connectionString = `DSN=${dsn}`;
    } else {
      connectionString = `DRIVER=IBM i Access ODBC Driver;SYSTEM=${host};`;

      if (username && typeof username === 'string') {
        connectionString += `UID=${username};`;
      }
      if (password && typeof password === 'string') {
        connectionString += `PWD=${password};`;
      }
    }

    // connect and call xmlservice
    odbc.connect(connectionString, (connectError, connection) => {
      if (connectError) {
        done(connectError, null);
        return;
      }
      parameters.connection = connection;
      callXmlService(parameters);
    });
  } else { // passed in connection should already be connected
    parameters.connection = odbcConnection;
    callXmlService(parameters);
  }
}

exports.odbcCall = odbcCall;
