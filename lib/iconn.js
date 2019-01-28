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


const iXml = require('./ixml');
const { iRestHttp } = require('./irest');
const { db2Call } = require('./istoredp');

const I_TRANSPORT_REST = 'REST';
const I_TRANSPORT_DB2 = 'DB2';

class iConn {
  /**
   * @description Creates a new iConn object
   * @constructor
   * @param {string} db
   * @param {string} user
   * @param {string} pwd
   * @param {object} [option]
   */
  constructor(db, user, pwd, option) {
    this.conn = {};
    this.cmds = [];
    this.timeout = 5000; // Default timeout is 5 seconds for sync mode.
    this.I_DEBUG_VERBOSE = false;
    this.conn.I_TRANSPORT_DB2_DATABASE = db; // Required Field
    this.conn.I_TRANSPORT_DB2_USER = user; // Required Field
    this.conn.I_TRANSPORT_DB2_PASSWORD = pwd; // Required Field
    this.conn.iXml_SERVICE_LIB = 'QXMLSERV'; // Default XML Service library
    this.conn.I_TRANSPORT_CTL = '*here';
    this.conn.I_TRANSPORT_IPC = '*NA';

    if (typeof db === 'object') {
      this.conn.I_TRANSPORT = I_TRANSPORT_DB2;
      return;
    }

    if (option && typeof option === 'object') {
      if (option.host) {
        this.conn.I_TRANSPORT = I_TRANSPORT_REST;
        this.conn.I_TRANSPORT_REST_HOST = option.host;
        if (option.port) {
          this.conn.I_TRANSPORT_REST_PORT = option.port;
        } else {
          this.conn.I_TRANSPORT_REST_PORT = 80;
        }
        if (option.path) {
          this.conn.I_TRANSPORT_REST_PATH = option.path;
        } else {
          this.conn.I_TRANSPORT_REST_PATH = '/';
        }
      } else {
        this.conn.I_TRANSPORT = I_TRANSPORT_DB2;
        if (option.xslib && option.xslib.length > 0) { this.conn.iXml_SERVICE_LIB = option.xslib; }
      }

      if (option.ctl && option.ctl.length > 0) {
        this.conn.I_TRANSPORT_CTL = option.ctl;
      }
      if (option.ipc && option.ipc.length > 0) {
        this.conn.I_TRANSPORT_IPC = option.ipc;
      }
      if (Number.isNaN(option.buf)) {
        this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = '500000';
      } else {
        this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = option.buf.toString();
      }
    } else { this.conn.I_TRANSPORT = I_TRANSPORT_DB2; }
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
      this.I_DEBUG_VERBOSE = flag;
    }
    return this.I_DEBUG_VERBOSE;
  }


  /**
   * @description returns conn property from iConn object.
   * @returns {object} the conn property from iConn object.
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
   * @param {boolean} sync
   */
  run(callback, sync) {
    // Build the XML document.
    let xml = iXml.iXmlNodeHead() + iXml.iXmlNodeScriptOpen();
    for (let i = 0; i < this.cmds.length; i += 1) { xml += this.cmds[i]; }
    xml += iXml.iXmlNodeScriptClose();
    this.cmds = [];
    // Print the XML document if in debug mode.
    if (this.I_DEBUG_VERBOSE) {
      console.log('============\nINPUT XML\n============');
      console.log(xml);
      console.log('============\nOUTPUT XML\n============');
    }
    // Post the XML document to XML service program.
    if (this.conn.I_TRANSPORT === I_TRANSPORT_REST) {
      // const iCall = require('./irest'); // TODO: Moved to top level, make sure it doesnt break
      iRestHttp(callback,
        this.conn.I_TRANSPORT_REST_HOST,
        this.conn.I_TRANSPORT_REST_PORT,
        this.conn.I_TRANSPORT_REST_PATH,
        this.conn.I_TRANSPORT_DB2_DATABASE,
        this.conn.I_TRANSPORT_DB2_USER,
        this.conn.I_TRANSPORT_DB2_PASSWORD,
        this.conn.I_TRANSPORT_IPC,
        this.conn.I_TRANSPORT_CTL,
        xml,
        this.conn.I_TRANSPORT_REST_XML_OUT_SIZE);
    } else if (this.conn.I_TRANSPORT === I_TRANSPORT_DB2) {
      // const db = require('./istoredp'); // TODO: Moved to top level, make sure it doesnt break
      db2Call(callback,
        this.conn.iXml_SERVICE_LIB,
        this.conn.I_TRANSPORT_DB2_DATABASE,
        this.conn.I_TRANSPORT_DB2_USER,
        this.conn.I_TRANSPORT_DB2_PASSWORD,
        this.conn.I_TRANSPORT_IPC,
        this.conn.I_TRANSPORT_CTL,
        xml,
        this.conn.I_TRANSPORT_REST_XML_OUT_SIZE,
        this.I_DEBUG_VERBOSE,
        sync);
    } else {
      callback(iXml.iXmlNodeHead() + iXml.iXmlNodeScriptOpen() + iXml.iXmlNodeError('***Transport error no data***') + iXml.iXmlNodeScriptClose());
    }
  }
}

module.exports = iConn;
