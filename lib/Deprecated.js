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


// This file contains the classes that are deprecated in v1.0. The implementations for all of the
// functions in these classes prior to v1.0 are moved into the other classes. The classes contained
// in this file are now wrappers for those calls to enable backward compatability with
// previous versions, but will throw a warning message. When we no longer want to support calling
// these methods through these deprecated class names, we can simple disable this file.

const { ProgramCall } = require('./ProgramCall');
const { SqlCall } = require('./SqlCall');
const { Connection } = require('./Connection');
const { Toolkit } = require('./Toolkit');
const {
  iXmlNodeCmdOpen,
  iXmlNodeCmdClose,
  iXmlNodeQshOpen,
  iXmlNodeQshClose,
  iXmlNodeShOpen,
  iXmlNodeShClose,
} = require('./ixml');

// DEPRECATED: For now, routes call to ProgramCall, but will be removed at a later time.
class iPgm {
  /**
   * @description Creates a new iPgm object
   * @constructor
   * @param {string} pgm
   * @param {object} [options]
   */
  constructor(pgm, options) {
    console.warn('As of v1.0, class \'iPgm\' is deprecated. Please use \'ProgramCall\' instead.');
    this.ProgramCall = new ProgramCall(pgm, options);
  }

  /**
    * @description adds a parameter to the program XML
    * @param {string | array} data
    * @param {string} [type]
    * @param {object} options
    * @param {*} inDs
    */
  addParam(data, type, options, inDs) {
    console.warn('As of v1.0, \'iPgm.addParam(data, type, options, inDs)\' is deprecated. Please use \'ProgramCall.addParam(data, type, options, inDs)\' instead.');
    return this.ProgramCall.addParam(data, type, options, inDs);
  }

  /**
   * @description adds a return element to the program XML
   * @param {string} data
   * @param {string} type
   * @param {object} [options]
   */
  addReturn(data, type, options) {
    console.warn('As of v1.0, \'iPgm.addReturn(data, type, options)\' is deprecated. Please use \'ProgramCall.addParam(data, type, options)\' instead.');
    return this.ProgramCall.addReturn(data, type, options);
  }

  /**
   * @description returns the current program XML
   * @returns {string} the generated program XML
   */
  toXML() {
    console.warn('As of v1.0, \'iPgm.toXML()\' is deprecated. Please use \'ProgramCall.toXML()\' instead.');
    return this.ProgramCall.toXML();
  }
}

// DEPRECATED: For now, routes call to SqlCall, but will be removed at a later time.
class iSql {
  /**
   * @description Creates a new iSql object
   * @constructor
   */
  constructor() {
    this.sqlCall = new SqlCall();
  }

  /**
   * @description adds sql connect XML
   * @param {object} [options]
   */
  connect(options) {
    this.sqlCall.connect(options);
  }

  /**
   * @description adds sql options XML
   * @param {object} options
   */
  setOptions(options) {
    this.sqlCall.setOptions(options);
  }

  /**
   * @description adds sql query XML
   * @param {string} stmt
   * @param {object} [options]
   */
  addQuery(stmt, options) {
    this.sqlCall.addQuery(stmt, options);
  }

  /**
   * @description adds sql prepare XML
   * @param {string} stmt
   * @param {object} [options]
   */
  prepare(stmt, options) {
    this.sqlCall.prepare(stmt, options);
  }

  /**
   * @description adds sql execute XML
   * @param {array} params
   * @param {object} [options]
   */
  execute(params, options) {
    this.sqlCall.execute(params, options);
  }

  /**
   * @description adds sql table XML
   * @param {array} params
   * @param {object} [options]
   */
  tables(params, options) {
    this.sqlCall.tables(params, options);
  }

  /**
   * @description adds sql table priv XML
   * @param {array} params
   * @param {object} [options]
   */
  tablePriv(params, options) {
    this.sqlCall.tablePriv(params, options);
  }

  /**
   * @description adds sql columns XML
   * @param {array} params
   * @param {object} [options]
   */
  columns(params, options) {
    this.sqlCall.columns(params, options);
  }

  /**
   * @description adds sql special XML
   * @param {array} params
   * @param {object} [options]
   */
  special(params, options) {
    this.sqlCall.special(params, options);
  }

  /**
   * @description adds sql column priv XML
   * @param {array} params
   * @param {object} [options]
   */
  columnPriv(params, options) {
    this.sqlCall.columnPriv(params, options);
  }

  /**
   * @description adds sql procedures XML
   * @param {*} params
   * @param {*} [options]
   */
  procedures(params, options) {
    this.sqlCall.procedures(params, options);
  }

  /**
   * @description adds sql pcolumns XML
   * @param {array} params
   * @param {object} [options]
   */
  pColumns(params, options) {
    this.sqlCall.pColumns(params, options);
  }

  /**
   * @description adds sql primary keys XML
   * @param {array} params
   * @param {object} [options]
   */
  primaryKeys(params, options) {
    this.sqlCall.primaryKeys(params, options);
  }

  /**
   * @description adds sql foriegn keys XML
   * @param {array} params
   * @param {object} [options]
   */
  foreignKeys(params, options) {
    this.sqlCall.foreignKeys(params, options);
  }

  /**
   * @description adds sql stats XML
   * @param {array} params
   * @param {object} [options]
   */
  statistics(params, options) {
    this.sqlCall.statistics(params, options);
  }

  /**
   * @description adds sql commit XML
   * @param {object} options
   */
  commit(options) {
    this.sqlCall.commit(options);
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  rowCount(options) {
    this.sqlCall.rowCount(options);
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  count(options) {
    this.sqlCall.count(options);
  }

  /**
   * @description adds sql describe XML
   * @param {object} options
   */
  describe(options) {
    this.sqlCall.describe(options);
  }

  /**
   * @description adds sql fetch XML
   * @param {object} options
   */
  fetch(options) {
    this.sqlCall.fetch(options);
  }

  /**
   * @description adds sql free XML
   */
  free() {
    this.sqlCall.free();
  }

  /**
   * @description returns the current sql XML
   * @returns {string} - the generted sql XML
   */
  toXML() {
    return this.sqlCall.toXML();
  }
}

// DEPRECATED: For now, routes call to Connection, but will be removed at a later time.
class iConn {
  constructor(db, user, pwd, option) {
    this.connection = new Connection(db, user, pwd, option);
  }

  /**
   * @description override the default timeout value for sync mode.
   * @param {number} seconds
   */
  setTimeout(seconds) {
    this.connection.setTimeout(seconds);
  }

  /**
   * @description
   * enables or disables the verbose mode for debugging
   * returns the current state of debug flag
   * @param {boolean} [flag]
   * @returns {boolean} the current state of the debug flag
   */
  debug(flag) {
    return this.connection.debug(flag);
  }


  /**
   * @description returns conn property from iConn object.
   * @returns {object} the conn property from iConn object.
   */
  getConnection() {
    return this.connection.getConnection();
  }

  /**
   * @description adds XML request to command list
   * @param {string | object} xml
   */
  add(xml) {
    this.connection.add(xml);
  }

  /**
   * @description
   * Invokes transport with XML input from command list
   * Calls user provided callback with the XML output
   * @param {fuction} callback
   * @param {boolean} sync
   */
  run(callback) {
    this.connection.run(callback);
  }
}

class iDataQueue {
  constructor(conn) {
    console.warn('As of v1.0, class \'iDataQueue\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  sendToDataQueue(name, lib, data, cb) {
    console.warn('As of v1.0, \'iDataQueue\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.sendToDataQueue(name, lib, data, cb);
  }

  receiveFromDataQueue(name, lib, length, cb) {
    console.warn('As of v1.0, \'iDataQueue\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.receiveFromDataQueue(name, lib, length, cb);
  }

  clearDataQueue(name, lib, cb) {
    console.warn('As of v1.0, \'iDataQueue\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.clearDataQueue(name, lib, cb);
  }
}

class iNetwork {
  constructor(conn) {
    console.warn('As of v1.0, class \'iNetwork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  getTCPIPAttr(cb) {
    console.warn('As of v1.0, \'iNetwork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getTCPIPAttr(cb);
  }

  getNetInterfaceData(ipaddr, cb) {
    console.warn('As of v1.0, \'iNetwork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getNetInterfaceData(ipaddr, cb);
  }
}

class iObj {
  constructor(conn) {
    console.warn('As of v1.0, class \'iObj\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  retrUsrAuth(usr, type, obj, lib = '*LIBL', cb) {
    console.warn('As of v1.0, \'iObj\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.retrUsrAuth(usr, type, obj, lib, cb);
  }

  retrCmdInfo(cmd, lib = '*LIBL', cb) {
    console.warn('As of v1.0, \'iObj\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.retrCmdInfo(cmd, lib, cb);
  }

  retrPgmInfo(pgm, lib = '*LIBL', cb) {
    console.warn('As of v1.0, \'iObj\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.retrPgmInfo(pgm, lib, cb);
  }

  retrSrvPgmInfo(srvpgm, lib = '*LIB', cb) {
    console.warn('As of v1.0, \'iObj\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.retrSrvPgmIfno(srvpgm, lib, cb);
  }

  retrUserInfo(user, cb) {
    console.warn('As of v1.0, \'iObj\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.retrUserIfno(user, cb);
  }

  retrUserAuthToObj(path, cb) {
    console.warn('As of v1.0, \'iObj\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.retrUserAuthToObj(path, cb);
  }
}

class iProd {
  constructor(conn) {
    console.warn('As of v1.0, class \'iProd\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  getPTFInfo(PTFID, cb) {
    console.warn('As of v1.0, \'iProd\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getPTFInfo(PTFID, cb);
  }

  getProductInfo(prodID, option, cb) {
    console.warn('As of v1.0, \'iProd\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getProductInfo(prodID, option, cb);
  }

  getInstalledProducts(cb) {
    console.warn('As of v1.0, \'iProd\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getInstalledProducts(cb);
  }
}

class iUserSpace {
  constructor(conn) {
    console.warn('As of v1.0, class \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  createUserSpace(name, lib, attr, size, auth, desc, cb) {
    console.warn('As of v1.0, \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.createUserSpace(name, lib, attr, size, auth, desc, cb);
  }

  setUserSpaceData(name, lib, length, msg, cb) {
    console.warn('As of v1.0, \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.setUserSpaceData(name, lib, length, msg, cb);
  }

  getUserSpaceData(name, lib, length, cb) {
    console.warn('As of v1.0, \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getUserSpaceData(name, lib, length, cb);
  }

  deleteUserSpace(name, lib, cb) {
    console.warn('As of v1.0, \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.deleteUserSpace(name, lib, cb);
  }
}

class iWork {
  constructor(conn) {
    console.warn('As of v1.0, class \'iWork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  getSysValue(sysValue, cb) {
    console.warn('As of v1.0, \'iWork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getSysValue(sysValue, cb);
  }

  getSysStatus(cb) {
    console.warn('As of v1.0, \'iWork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getSysStatus(cb);
  }

  getSysStatusExt(cb) {
    console.warn('As of v1.0, \'iWork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getSysStatysExt(cb);
  }

  getJobStatus(jobId, cb) {
    console.warn('As of v1.0, \'iWork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getJobStatus(jobId, cb);
  }

  getDataArea(lib, area, length, cb) {
    console.warn('As of v1.0, \'iWork\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getDataArea(lib, area, length, cb);
  }
}

// DEPRECATED FUNCTIONS BELOW. WILL BE REMOVED SOMETIME AFTER v1.0

/**
 * @description creates cmd XML
 * @param {string} cmd
 * @param {object} [options]
 * @returns {string} - the generated XML for the CL command
 */
const iCmd = (cmd, options) => {
  let xexec = 'cmd';
  let xml;

  if (cmd.indexOf('?') > 0) { // If need return value
    xexec = 'rexx';
  }

  if (options) {
    xml = iXmlNodeCmdOpen(options.exec, options.hex, options.before, options.after, options.error)
          + cmd + iXmlNodeCmdClose();
  } else {
    xml = iXmlNodeCmdOpen(xexec, '', '', '', '', '') + cmd + iXmlNodeCmdClose();
  }

  return xml;
};

/**
 * @description creates qsh XML
 * @param {string} qsh
 * @param {object} [options]
 * @returns {string} - the generated XML for the qsh command
 */
const iQsh = (qsh, options) => {
  let xml;
  if (options) {
    xml = iXmlNodeQshOpen(options.rows, options.hex, options.before, options.after, options.error)
          + qsh + iXmlNodeQshClose();
  } else {
    xml = iXmlNodeQshOpen('', '', '', '', '') + qsh + iXmlNodeQshClose();
  }
  return xml;
};

/**
 * @description creates sh XML
 * @param {string} sh
 * @param {object} [options]
 * @returns {string} - the generated XML for the sh command
 */
const iSh = (sh, options) => {
  let xml;
  if (options) {
    xml = iXmlNodeShOpen(options.rows, options.hex, options.before, options.after, options.error)
          + sh + iXmlNodeShClose();
  } else {
    xml = iXmlNodeShOpen('', '', '', '', '') + sh + iXmlNodeShClose();
  }
  return xml;
};

module.exports.iPgm = iPgm;
module.exports.iSql = iSql;
module.exports.iConn = iConn;
module.exports.iDataQueue = iDataQueue;
module.exports.iNetwork = iNetwork;
module.exports.iObj = iObj;
module.exports.iProd = iProd;
module.exports.iUserSpace = iUserSpace;
module.exports.iWork = iWork;
module.exports.iCmd = iCmd;
module.exports.iQsh = iQsh;
module.exports.iSh = iSh;
