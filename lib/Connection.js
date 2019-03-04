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

const {
  iXmlNodeHead, iXmlNodeScriptOpen, iXmlNodeScriptClose,
} = require('./ixml');

const { iRestHttp } = require('./irest');
const { db2Call } = require('./istoredp');

const availableTransports = {
  idb: db2Call,
  rest: iRestHttp,
};

class Connection {
  /**
   * @description Creates a new Connection object
   * @constructor
   * @param {string} db
   * @param {string} user
   * @param {string} pwd
   * @param {object} [restConfig]
   */
  constructor(db, username, password, restConfig) {
    // setup default values
    this.conn = {
      database: '*LOCAL',
      username: '',
      password: '',
      xslib: 'QXMLSERV',
      returnError: true,
      returnXml: false,
      transport: 'idb',
      host: 'localhost',
      port: 80,
      path: '/',
      ctl: '*here',
      ipc: '*NA',
      outputBuffer: 500000,
      verbose: false,
    };

    this.cmds = [];
    this.timeout = 5000; // Default timeout is 5 seconds for sync mode.

    if (db && typeof db === 'object') {
      // use || to fallback to default value when first argument is falsy
      // ie (undefined, null, '', 0, false)
      this.conn.database = db.database || this.conn.database;
      this.conn.username = db.username || this.conn.username;
      this.conn.password = db.password || this.conn.password;
      this.conn.host = db.host || this.conn.host;
      this.conn.port = db.port || this.conn.port;
      this.conn.xslib = db.xslib || this.conn.xslib;

      // allow returnError to be configurable
      if (typeof db.returnError === 'boolean') {
        this.conn.returnError = db.returnError;
      }

      this.conn.transport = db.transport || this.conn.transport;

      if (!(this.conn.transport in availableTransports)) {
        throw new Error(`${this.conn.transport} is not a valid transport`);
      }

      // rest options passed on db object
      if (this.conn.transport === 'rest') {
        this.conn.path = db.path || this.conn.path;
        this.conn.ctl = db.ctl || this.conn.ctl;
        this.conn.ipc = db.ipc || this.conn.ipc;

        if (Number.isInteger(db.outputBuffer)) {
          this.conn.outputBuffer = db.outputBuffer;
        }

        if (!this.conn.host) {
          // host not specified fallback to DB2 transport
          this.conn.transport = 'idb';
        }
      }
    } else { // using old signature with positional arguments
      this.conn.database = db || this.conn.database;
      this.conn.username = username || this.conn.username;
      this.conn.password = password || this.conn.password;
    }

    // using old signature rest options passed on restConfig object
    if (restConfig && typeof restConfig === 'object') {
      this.conn.transport = 'rest';
      this.conn.host = restConfig.host || this.conn.host;
      this.conn.port = restConfig.port || this.conn.port;
      this.conn.path = restConfig.path || this.conn.path;
      this.conn.ctl = restConfig.ctl || this.conn.ctl;
      this.conn.ipc = restConfig.ipc || this.conn.ipc;

      if (!this.conn.host) {
        // host not specified fallback to DB2 transport
        this.conn.transport = 'idb';
      }

      if (restConfig.xslib) {
        this.conn.xslib = restConfig.xslib;
      }

      if (Number.isInteger(restConfig.buf)) {
        this.conn.outputBuffer = restConfig.buf;
      }
    }
    // set the correct transport function to call
    this.conn.transportCall = availableTransports[this.conn.transport];
  }

  /**
   * @description override the default timeout value for sync mode.
   * @param {number} seconds
   */
  setTimeout(seconds) {
    if (typeof seconds === 'number') {
      this.timeout = seconds * 1000;
    }
  }

  /**
   * @description
   * enables or disables the verbose mode for debugging
   * returns the current state of debug flag
   * @param {boolean} [flag]
   * @returns {boolean} the current state of the debug flag
   */
  debug(flag) {
    if (typeof flag === 'boolean') {
      this.conn.verbose = flag;
    }
    return this.conn.verbose;
  }


  /**
   * @description returns conn property from Connection object.
   * @returns {object} the conn property from Connection object.
   */
  getConnection() {
    return this.conn;
  }

  /**
   * @description adds XML request to command list
   * @param {string | object} xml
   */
  add(xml) {
    if (typeof xml === 'object') {
      this.cmds.push(xml.toXML());
    } else if (xml && typeof xml === 'string') {
      this.cmds.push(xml);
    }
  }

  /**
   * @description
   * Invokes transport with XML input from command list
   * Calls user provided callback with the XML output
   * @param {fuction} callback
   */
  run(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Passing a callback function is required');
    }
    // Build the XML document.
    let xmlInput = iXmlNodeHead() + iXmlNodeScriptOpen();

    for (let i = 0; i < this.cmds.length; i += 1) {
      xmlInput += this.cmds[i];
    }

    xmlInput += iXmlNodeScriptClose();
    this.cmds = []; // reset the commands list

    // Print the XML document if in debug mode.
    if (this.conn.verbose) {
      console.log('============\nINPUT XML\n============');
      console.log(xmlInput);
      console.log('============\nOUTPUT XML\n============');
    }

    // Post the XML document to XML service program.
    this.conn.transportCall(this.conn, xmlInput, (error, xmlOut) => {
      // Create an Error object if error returned from transport is not one already
      if (error && !(error instanceof Error)) {
        // eslint-disable-next-line no-param-reassign
        error = new Error(error);
      }

      if (this.conn.returnError) {
        callback(error, xmlOut);
      } else {
        // when return return error is false, let it be known!
        if (error) {
          throw error;
        }
        callback(xmlOut);
      }
    });
  }
}

module.exports.Connection = Connection;
