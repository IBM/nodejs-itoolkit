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

const deprecate = require('depd');

const iPgmDeprecate = deprecate('iPgm');
const iSqlDeprecate = deprecate('iSql');
const iConnDeprecate = deprecate('iConn');
const iDataQueueDeprecate = deprecate('iDataQueue');
const iNetworkDeprecate = deprecate('iNetwork');
const iObjDeprecate = deprecate('iObj');
const iProdDeprecate = deprecate('iProd');
const iUserSpaceDeprecate = deprecate('iUserSpace');
const iWorkDeprecate = deprecate('iWork');
const iCmdDeprecate = deprecate('iCmd');
const iQshDeprecate = deprecate('iQsh');
const iShDeprecate = deprecate('iSh');

const { ProgramCall } = require('./ProgramCall');
const { SqlCall } = require('./SqlCall');
const { CommandCall } = require('./CommandCall');
const { Connection } = require('./Connection');
const { Toolkit } = require('./Toolkit');


// DEPRECATED: For now, routes call to ProgramCall, but will be removed at a later time.
class iPgm {
  /**
   * @description Creates a new iPgm object
   * @constructor
   * @param {string} pgm
   * @param {object} [options]
   */
  constructor(pgm, options) {
    iPgmDeprecate('As of v1.0, class \'iPgm\' is deprecated. Please use \'ProgramCall\' instead.');
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
    iPgmDeprecate('As of v1.0, \'iPgm.addParam()\' is deprecated. Please use \'ProgramCall.addParam()\' instead.');
    return this.ProgramCall.addParam(data, type, options, inDs);
  }

  /**
   * @description adds a return element to the program XML
   * @param {string} data
   * @param {string} type
   * @param {object} [options]
   */
  addReturn(data, type, options) {
    iPgmDeprecate('As of v1.0, \'iPgm.addReturn()\' is deprecated. Please use \'ProgramCall.addParam()\' instead.');
    return this.ProgramCall.addReturn(data, type, options);
  }

  /**
   * @description returns the current program XML
   * @returns {string} the generated program XML
   */
  toXML() {
    iPgmDeprecate('As of v1.0, \'iPgm.toXML()\' is deprecated. Please use \'ProgramCall.toXML()\' instead.');
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
    iSqlDeprecate('As of v1.0, \'iSql.connect()\' is deprecated. Please use \'SqlCall.connect()\' instead.');
    this.sqlCall.connect(options);
  }

  /**
   * @description adds sql options XML
   * @param {object} options
   */
  setOptions(options) {
    iSqlDeprecate('As of v1.0, \'iSql.setOptions()\' is deprecated. Please use \'SqlCall.setOptions()\' instead.');
    this.sqlCall.setOptions(options);
  }

  /**
   * @description adds sql query XML
   * @param {string} stmt
   * @param {object} [options]
   */
  addQuery(stmt, options) {
    iSqlDeprecate('As of v1.0, \'iSql.addQuery()\' is deprecated. Please use \'SqlCall.addQuery()\' instead.');
    this.sqlCall.addQuery(stmt, options);
  }

  /**
   * @description adds sql prepare XML
   * @param {string} stmt
   * @param {object} [options]
   */
  prepare(stmt, options) {
    iSqlDeprecate('As of v1.0, \'iSql.prepare()\' is deprecated. Please use \'SqlCall.prepare()\' instead.');
    this.sqlCall.prepare(stmt, options);
  }

  /**
   * @description adds sql execute XML
   * @param {array} params
   * @param {object} [options]
   */
  execute(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.execute()\' is deprecated. Please use \'SqlCall.execute()\' instead.');
    this.sqlCall.execute(params, options);
  }

  /**
   * @description adds sql table XML
   * @param {array} params
   * @param {object} [options]
   */
  tables(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.tables()\' is deprecated. Please use \'SqlCall.tables()\' instead.');
    this.sqlCall.tables(params, options);
  }

  /**
   * @description adds sql table priv XML
   * @param {array} params
   * @param {object} [options]
   */
  tablePriv(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.tablePriv()\' is deprecated. Please use \'SqlCall.tablePriv()\' instead.');
    this.sqlCall.tablePriv(params, options);
  }

  /**
   * @description adds sql columns XML
   * @param {array} params
   * @param {object} [options]
   */
  columns(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.columns()\' is deprecated. Please use \'SqlCall.columns()\' instead.');
    this.sqlCall.columns(params, options);
  }

  /**
   * @description adds sql special XML
   * @param {array} params
   * @param {object} [options]
   */
  special(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.special()\' is deprecated. Please use \'SqlCall.special()\' instead.');
    this.sqlCall.special(params, options);
  }

  /**
   * @description adds sql column priv XML
   * @param {array} params
   * @param {object} [options]
   */
  columnPriv(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.columnPriv()\' is deprecated. Please use \'SqlCall.columnPriv()\' instead.');
    this.sqlCall.columnPriv(params, options);
  }

  /**
   * @description adds sql procedures XML
   * @param {*} params
   * @param {*} [options]
   */
  procedures(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.procedures()\' is deprecated. Please use \'SqlCall.procedures()\' instead.');
    this.sqlCall.procedures(params, options);
  }

  /**
   * @description adds sql pcolumns XML
   * @param {array} params
   * @param {object} [options]
   */
  pColumns(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.pColumns()\' is deprecated. Please use \'SqlCall.pColumns()\' instead.');
    this.sqlCall.pColumns(params, options);
  }

  /**
   * @description adds sql primary keys XML
   * @param {array} params
   * @param {object} [options]
   */
  primaryKeys(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.primaryKeys()\' is deprecated. Please use \'SqlCall.primaryKeys()\' instead.');
    this.sqlCall.primaryKeys(params, options);
  }

  /**
   * @description adds sql foriegn keys XML
   * @param {array} params
   * @param {object} [options]
   */
  foreignKeys(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.foreignKeys()\' is deprecated. Please use \'SqlCall.foreignKeys()\' instead.');
    this.sqlCall.foreignKeys(params, options);
  }

  /**
   * @description adds sql stats XML
   * @param {array} params
   * @param {object} [options]
   */
  statistics(params, options) {
    iSqlDeprecate('As of v1.0, \'iSql.statistics()\' is deprecated. Please use \'SqlCall.statistics()\' instead.');
    this.sqlCall.statistics(params, options);
  }

  /**
   * @description adds sql commit XML
   * @param {object} options
   */
  commit(options) {
    iSqlDeprecate('As of v1.0, \'iSql.commit()\' is deprecated. Please use \'SqlCall.commit()\' instead.');
    this.sqlCall.commit(options);
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  rowCount(options) {
    iSqlDeprecate('As of v1.0, \'iSql.rowCoint()\' is deprecated. Please use \'SqlCall.rowCount()\' instead.');
    this.sqlCall.rowCount(options);
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  count(options) {
    iSqlDeprecate('As of v1.0, \'iSql.count()\' is deprecated. Please use \'SqlCall.count()\' instead.');
    this.sqlCall.count(options);
  }

  /**
   * @description adds sql describe XML
   * @param {object} options
   */
  describe(options) {
    iSqlDeprecate('As of v1.0, \'iSql.describe()\' is deprecated. Please use \'SqlCall.describe()\' instead.');
    this.sqlCall.describe(options);
  }

  /**
   * @description adds sql fetch XML
   * @param {object} options
   */
  fetch(options) {
    iSqlDeprecate('As of v1.0, \'iSql.fetch()\' is deprecated. Please use \'SqlCall.fetch()\' instead.');
    this.sqlCall.fetch(options);
  }

  /**
   * @description adds sql free XML
   */
  free() {
    iSqlDeprecate('As of v1.0, \'iSql.free()\' is deprecated. Please use \'SqlCall.free()\' instead.');
    this.sqlCall.free();
  }

  /**
   * @description returns the current sql XML
   * @returns {string} - the generted sql XML
   */
  toXML() {
    iSqlDeprecate('As of v1.0, \'iSql.toXML()\' is deprecated. Please use \'SqlCall.toXML()\' instead.');
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

   */
  // eslint-disable-next-line class-methods-use-this
  setTimeout() {
    iConnDeprecate('As of v1.0, \'iConn.setTimeout()\' is deprecated and sync mode is disabled');
  }

  /**
   * @description
   * enables or disables the verbose mode for debugging
   * returns the current state of debug flag
   * @param {boolean} [flag]
   * @returns {boolean} the current state of the debug flag
   */
  debug(flag) {
    iConnDeprecate('As of v1.0, \'iConn.debug()\' is deprecated. Please use \'Connection.debug()\' instead');
    return this.connection.debug(flag);
  }


  /**
   * @description returns conn property from iConn object.
   * @returns {object} the conn property from iConn object.
   */
  getConnection() {
    iConnDeprecate('As of v1.0, \'iConn.getConnection()\' is deprecated. Please use \'Connection.getTransportOptions()\' instead');
    return this.connection.getTransportOptions();
  }

  /**
   * @description adds XML request to command list
   * @param {string | object} xml
   */
  add(xml) {
    iConnDeprecate('As of v1.0, \'iConn.add()\' is deprecated. Please use \'Connection.add()\' instead');
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
    iConnDeprecate('As of v1.0, \'iConn.run()\' is deprecated. Please use \'Connection.run()\' instead');
    this.connection.run(callback);
  }
}

class iDataQueue {
  constructor(conn) {
    iDataQueueDeprecate('As of v1.0, class \'iDataQueue\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  sendToDataQueue(name, lib, data, cb) {
    iDataQueueDeprecate('As of v1.0, \'iDataQueue.sendToDataQueue()\' is deprecated. Please use \'Toolkit.sendToDataQueue()\' instead.');
    this.toolkit.sendToDataQueue(name, lib, data, cb);
  }

  receiveFromDataQueue(name, lib, length, cb) {
    iDataQueueDeprecate('As of v1.0, \'iDataQueue.receiveFromDataQueue()\' is deprecated. Please use \'Toolkit.receiveFromDataQueue()\' instead.');
    this.toolkit.receiveFromDataQueue(name, lib, length, cb);
  }

  clearDataQueue(name, lib, cb) {
    iDataQueueDeprecate('As of v1.0, \'iDataQueue.clearDataQueue()\' is deprecated. Please use \'Toolkit.clearDataQueue()\' instead.');
    this.toolkit.clearDataQueue(name, lib, cb);
  }
}

class iNetwork {
  constructor(conn) {
    iNetworkDeprecate('As of v1.0, \'iNetwork Class\' is deprecated. Please use \'Toolkit Class\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  getTCPIPAttr(cb) {
    iNetworkDeprecate('As of v1.0, \'iNetwork.getTCPIPAttr()\' is deprecated. Please use \'Toolkit.getTCPIPAttr()\' instead.');
    this.toolkit.getTCPIPAttr(cb);
  }

  getNetInterfaceData(ipaddr, cb) {
    iNetworkDeprecate('As of v1.0, \'iNetwork.getNetInterfaceData()\' is deprecated. Please use \'Toolkit.getNetInterfaceData()\' instead.');
    this.toolkit.getNetInterfaceData(ipaddr, cb);
  }
}

class iObj {
  constructor(conn) {
    iObjDeprecate('As of v1.0, class \'iObj Class\' is deprecated. Please use \'Toolkit Class\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  addToLibraryList(lib, cb) {
    iObjDeprecate('As of v1.0, class \'iObj.addToLibraryList()\' is deprecated. Please use \'Toolkit.addToLibraryList()\' instead.');
    this.toolkit.addToLibraryList(lib, cb);
  }

  retrUsrAuth(usr, type, obj, lib = '*LIBL', cb) {
    iObjDeprecate('As of v1.0, class \'iObj.retrUsrAuth()\' is deprecated. Please use \'Toolkit.retrUsrAuth()\' instead.');
    this.toolkit.retrUsrAuth(usr, type, obj, lib, cb);
  }

  retrCmdInfo(cmd, lib = '*LIBL', cb) {
    iObjDeprecate('As of v1.0, class \'iObj.retrCmdInfo()\' is deprecated. Please use \'Toolkit.retrCmdInfo()\' instead.');
    this.toolkit.retrCmdInfo(cmd, lib, cb);
  }

  retrPgmInfo(pgm, lib = '*LIBL', cb) {
    iObjDeprecate('As of v1.0, class \'iObj.retrPgmInfo()\' is deprecated. Please use \'Toolkit.retrPgmInfo()\' instead.');
    this.toolkit.retrPgmInfo(pgm, lib, cb);
  }

  retrSrvPgmInfo(srvpgm, lib = '*LIB', cb) {
    iObjDeprecate('As of v1.0, class \'iObj.retrSrvPgmInfo()\' is deprecated. Please use \'Toolkit.retrSrvPgmInfo()\' instead.');
    this.toolkit.retrSrvPgmInfo(srvpgm, lib, cb);
  }

  retrUserInfo(user, cb) {
    iObjDeprecate('As of v1.0, class \'iObj.retrUserInfo()\' is deprecated. Please use \'Toolkit.retrUserInfo()\' instead.');
    this.toolkit.retrUserInfo(user, cb);
  }

  retrUserAuthToObj(path, cb) {
    iObjDeprecate('As of v1.0, class \'iObj.retrUserAuthToObj()\' is deprecated. Please use \'Toolkit.retrUserAuthToObj()\' instead.');
    this.toolkit.retrUserAuthToObj(path, cb);
  }
}

class iProd {
  constructor(conn) {
    iProdDeprecate('As of v1.0, class \'iProd Class\' is deprecated. Please use \'Toolkit Class\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  getPTFInfo(PTFID, cb) {
    iProdDeprecate('As of v1.0, class \'iProd.getPTFInfo()\' is deprecated. Please use \'Toolkit.getPTFInfo()\' instead.');
    this.toolkit.getPTFInfo(PTFID, cb);
  }

  getProductInfo(prodID, option, cb) {
    iProdDeprecate('As of v1.0, class \'iProd.getProductInfo()\' is deprecated. Please use \'Toolkit.getProductInfo()\' instead.');
    this.toolkit.getProductInfo(prodID, option, cb);
  }

  getInstalledProducts(cb) {
    iProdDeprecate('As of v1.0, class \'iProd.getInstalledProducts()\' is deprecated. Please use \'Toolkit.getInstalledProducts()\' instead.');
    this.toolkit.getInstalledProducts(cb);
  }
}

class iUserSpace {
  constructor(conn) {
    iUserSpaceDeprecate('As of v1.0, class \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  createUserSpace(name, lib, attr, size, auth, desc, cb) {
    iUserSpaceDeprecate('As of v1.0, class \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.createUserSpace(name, lib, attr, size, auth, desc, cb);
  }

  setUserSpaceData(name, lib, length, msg, cb) {
    iUserSpaceDeprecate('As of v1.0, class \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.setUserSpaceData(name, lib, length, msg, cb);
  }

  getUserSpaceData(name, lib, length, cb) {
    iUserSpaceDeprecate('As of v1.0, class \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.getUserSpaceData(name, lib, length, cb);
  }

  deleteUserSpace(name, lib, cb) {
    iUserSpaceDeprecate('As of v1.0, class \'iUserSpace\' is deprecated. Please use \'Toolkit\' instead.');
    this.toolkit.deleteUserSpace(name, lib, cb);
  }
}

class iWork {
  constructor(conn) {
    iWorkDeprecate('As of v1.0, class \'iWork Class\' is deprecated. Please use \'Toolkit Class\' instead.');
    this.toolkit = new Toolkit(conn);
  }

  getSysValue(sysValue, cb) {
    iWorkDeprecate('As of v1.0, class \'iWork.getSysValue()\' is deprecated. Please use \'Toolkit.getSysValue()\' instead.');
    this.toolkit.getSysValue(sysValue, cb);
  }

  getSysStatus(cb) {
    iWorkDeprecate('As of v1.0, class \'iWork.getSysStatus()\' is deprecated. Please use \'Toolkit.getSysStatus()\' instead.');
    this.toolkit.getSysStatus(cb);
  }

  getSysStatusExt(cb) {
    iWorkDeprecate('As of v1.0, class \'iWork.getSysStatusExt()\' is deprecated. Please use \'Toolkit.getSysStatusExt()\' instead.');
    this.toolkit.getSysStatusExt(cb);
  }

  getJobStatus(jobId, cb) {
    iWorkDeprecate('As of v1.0, class \'iWork.getJobStatus()\' is deprecated. Please use \'Toolkit.getJobStatus()\' instead.');
    this.toolkit.getJobStatus(jobId, cb);
  }

  getJobInfo(jobName, userName, jobNumber, cb) {
    iWorkDeprecate('As of v1.0, class \'iWork.getJobInfo()\' is deprecated. Please use \'Toolkit.getJobInfo()\' instead.');
    this.toolkit.getJobInfo(jobName, userName, jobNumber, cb);
  }

  getDataArea(lib, area, length, cb) {
    iWorkDeprecate('As of v1.0, class \'iWork.getDataArea()\' is deprecated. Please use \'Toolkit.getDataArea()\' instead.');
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
  iCmdDeprecate('As of v1.0, class \'iCmd()\' is deprecated. Please use \'CommandCall\' instead.');
  const command = new CommandCall({ command: cmd, type: 'cl', options });
  return command.toXML();
};

/**
 * @description creates qsh XML
 * @param {string} qsh
 * @param {object} [options]
 * @returns {string} - the generated XML for the qsh command
 */
const iQsh = (qsh, options) => {
  iQshDeprecate('As of v1.0, class \'iQsh()\' is deprecated. Please use \'CommandCall\' instead.');
  const command = new CommandCall({ command: qsh, type: 'qsh', options });
  return command.toXML();
};

/**
 * @description creates sh XML
 * @param {string} sh
 * @param {object} [options]
 * @returns {string} - the generated XML for the sh command
 */
const iSh = (sh, options) => {
  iShDeprecate('As of v1.0, class \'iSh()\' is deprecated. Please use \'CommandCall\' instead.');
  const command = new CommandCall({ command: sh, type: 'sh', options });
  return command.toXML();
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
