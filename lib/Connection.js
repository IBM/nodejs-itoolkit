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

const { httpCall } = require('./transports/httpTransport');
const { idbCall } = require('./transports/idbTransport');
const { sshCall } = require('./transports/sshTransport');
const { odbcCall } = require('./transports/odbcTransport');

const availableTransports = {
  idb: idbCall,
  rest: httpCall,
  ssh: sshCall,
  odbc: odbcCall,
};

/**
 * ODBC Transport Options Object
 * @typedef {object} odbcOptions
 * @property {string} [dsn] - The dsn to use.
 * @property {string} [host=localhost] - The hostname of the server. Default is ``localhost``.
 * @property {string} username - The user to connect as.
 * @property {string} password - The user's password.
 * @property {string} [ipc=*NA] - The key name/security route to XMLSERVICE job. Default is ``*NA``.
 * @property {string} [ctl=*here] - The control options for XMLSERVICE jobs. Default is ``*here``.
 * @property {string} [xslib=QXMLSERV] - The XMLSERVICE library. Default is ``QXMLSERV``.
 * @property {object} [odbcConnection] - An existing odbc connection already connected to the db.
 */

/**
 * idb Transport Options Object
 * @typedef {object} idbOptions
 * @property {string} [database=*LOCAL] - The database to connect to. Default is ``*LOCAL``.
 * @property {string} username - The user to connect as.
 * @property {string} password - The user's password.
 * @property {string} [ipc=*NA] - The key name/security route to XMLSERVICE job. Default is ``*NA``.
 * @property {string} [ctl=*here] - The control options for XMLSERVICE jobs. Default is ``*here``.
 * @property {string} [xslib=QXMLSERV] - The XMLSERVICE library. Default is ``QXMLSERV``.
 */

/**
 * SSH Transport Options Object
 * @typedef {object} sshOptions
 * @property {string} host - The hostname of the server.
 * @property {string} username - The user to connect as.
 * @property {string} [password] - The user's password.
 * @property {string} [privateKey] - The user's privateKey.
 * @property {string} [passphrase] - The user's passphrase to decrypt the private key.
 */

/**
 * REST Transport Options Object
 * @typedef {object} restOptions
 * @property {string} [database=*LOCAL] - The database to connect to. Default is ``*LOCAL``.
 * @property {string} username - The user to connect as.
 * @property {string} password - The user's password.
 * @property {string} [ipc=*NA] - The key name/security route to XMLSERVICE job. Default is ``*NA``.
 * @property {string} [ctl=*here] - The control options for XMLSERVICE jobs. Default is ``*here``.
 * @property {string} url - The url to the xmlcgi endpoint. E.g. ``http://localhost:80/cgi-bin/xmlcgi.pgm``
 */

/**
 * Connection Config Object
 * @typedef {object} connectionConfig
 * @property {string} transport - The transport to use.
 * @property {odbcOptions|sshOptions|idbOptions|restOptions} transportOptions -
 *  The transport options.
 * @property {boolean} [verbose=false] - The flag for verbose output.
 * @property {boolean} [returnError=true] - The flag to disable error first callback
 * for Connection.run().
 */

class Connection {
  /**
   * @description Creates a new Connection object.
   * @constructor
   * @param {connectionConfig} options
   * @throws Will throw an error when the first parameter is not an object.
   * @throws Will throw an error when an invalid transport is set.
   */
  constructor(options) {
    this.commandList = [];
    this.returnError = true;
    this.verbose = false;

    if (typeof options !== 'object') {
      throw new Error('options must be an object');
    }

    this.transport = options.transport;

    if (!(this.transport in availableTransports)) {
      throw new Error(`${this.transport} is not a valid transport`);
    }

    this.transportCall = availableTransports[this.transport];
    this.transportOptions = options.transportOptions || {};

    if (typeof options.returnError === 'boolean') {
      this.returnError = options.returnError;
    }

    if (typeof options.verbose === 'boolean') {
      this.verbose = options.verbose;
    }
  }

  /**
   * @description Enables or disables the verbose output for debugging.
   * @param {boolean} [flag] - Whether to enable verbose output.
   * @returns {boolean} The current state of the debug flag.
   */
  debug(flag) {
    if (typeof flag === 'boolean') {
      this.verbose = flag;
    }
    return this.verbose;
  }


  /**
   * @returns {object} The ``transportOptions`` property from the ``Connection`` object.
   */
  getTransportOptions() {
    return this.transportOptions;
  }

  /**
   * @description Adds xml to the command list. When an instance of ``CommandCall``,
   * ``ProgramCall``, or ``iSql`` is passed ``.toXML()`` is invoked to return the underlying xml.
   * @param {string|object} xml - The xml to add to the command list.
   */
  add(xml) {
    if (typeof xml === 'object') {
      this.commandList.push(xml.toXML());
    } else if (xml && typeof xml === 'string') {
      this.commandList.push(xml);
    }
  }

  /**
   * @callback runCallback
   * @param {Error|null} transportError - The error object if a transport error occured or null.
   * @param {string|null} xmlOutput - The xml output or null if an error occured.
   */

  /**
   * @description Invokes transport with xml generated from joining the command list.
   * Note the command list is cleared after calling this function.
   * Once the transport is complete the user provided callback function is called.
   * Note If ``returnError`` is ``false`` the first callback paramter will be the xml output.
   * This is a compatabilty feature with the deprecated ``iConn`` Class which did not return errors.
   * @param {runCallback} callback - the callback function.
   */
  run(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Passing a callback function is required');
    }
    if (!this.commandList.length) {
      throw new Error('Command list is empty. Make sure you add commands first');
    }

    // Build the XML document.
    const xmlInput = `<?xml version='1.0'?><myscript>${this.commandList.join()}</myscript>`;
    // reset the command list
    this.commandList = [];
    this.transportOptions.verbose = this.verbose;

    // Print the XML document if in debug mode.
    if (this.verbose) {
      console.log('============\nINPUT XML\n============');
      console.log(xmlInput);
    }

    this.transportCall(this.transportOptions, xmlInput, (error, xmlOutput) => {
      if (this.verbose) {
        console.log('============\nOUTPUT XML\n============');
        console.log(xmlOutput);
      }
      // create an Error object if error returned from transport is not one already
      let transportError = error;
      if (error && !(error instanceof Error)) {
        transportError = new Error(error);
      }
      if (this.returnError) {
        callback(transportError, xmlOutput);
      } else {
        callback(xmlOutput);
      }
    });
  }
}

module.exports.Connection = Connection;
