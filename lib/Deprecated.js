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


// This file contains the classes that are deprecated in v1.0. The implementations for all of the
// functions in these classes prior to v1.0 are moved into the other classes. The classes contained
// in this file are now wrappers for those calls to enable backward compatability with
// previous versions, but will throw a warning message. When we no longer want to support calling
// these methods through these deprecated class names, we can simple disable this file.

/* eslint-disable max-classes-per-file */

const deprecate = require('depd');
const { parseString } = require('xml2js');

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
const xmlToJsonDeprecate = deprecate('xmlToJson');

const { ProgramCall } = require('./ProgramCall');
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
    */
  addParam(data, type, options) {
    const parameter = {};

    if (Array.isArray(data)) { // DS parameter
      parameter.type = 'ds';
      parameter.fields = [];

      if (typeof type === 'object') { // <ds> options
        Object.keys(type).forEach((key) => {
          parameter[key] = type[key];
        });
      }
      // convert 2D Array into fields [] of data objects
      for (let i = 0; i < data.length; i += 1) {
        const field = { type: data[i][1], value: data[i][0] };
        if (typeof data[i][2] === 'object') {
          Object.keys(data[i][2]).forEach((key) => { // <data> options
            field[key] = data[i][2][key];
          });
        }
        parameter.fields.push(field);
      }
    } else {
      parameter.type = type;
      parameter.value = data;
      if (!type) {
        iPgmDeprecate('defaulting parameter type to 1024a has been deprecated. You should specify a type instead.');
        parameter.type = '1024a';
      }

      if (typeof options === 'object') { // <data> options
        Object.keys(options).forEach((key) => {
          parameter[key] = options[key];
        });
      }
    }

    iPgmDeprecate('As of v1.0, \'iPgm.addParam()\' is deprecated. Please use \'ProgramCall.addParam()\' instead.');
    return this.ProgramCall.addParam(parameter);
  }

  /**
   * @description adds a return element to the program XML
   * @param {string} data
   * @param {string} type
   * @param {object} [options]
   */
  addReturn(data, type = '1024a', options) {
    if (!type) {
      iPgmDeprecate('defaulting return type to 1024a has been deprecated. You should specify a type instead.');
      // eslint-disable-next-line no-param-reassign
      type = '1024a';
    }
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

// DEPRECATED: will be removed at a later time.
class iSql {
  /**
   * @description Creates a new iSql object
   * @constructor
   */
  constructor() {
    iSqlDeprecate('As of v1.0, class \'iSql\' is deprecated. Use odbc, idb-connector, or idb-pconnector npm package instead.');
    this.xml = '<sql>';
  }

  /**
   * @description adds sql connect XML
   * @param {object} [options]
   */
  // eslint-disable-next-line class-methods-use-this
  connect() {
    throw new Error('As of v1.0, \'iSql.connect()\' has been removed');
  }

  /**
   * @description adds sql options XML
   * @param {object} options
   */
  // eslint-disable-next-line class-methods-use-this
  setOptions() {
    throw new Error('As of v1.0, \'iSql.setOptions()\' has been removed');
  }

  /**
   * @description adds sql query XML
   * @param {string} stmt
   * @param {object} [options]
   */
  addQuery(stmt, options = {}) {
    this.xml += `<query error='${options.error || 'fast'}'>${stmt}</query>`;
  }

  /**
   * @description adds sql prepare XML
   * @param {string} stmt
   * @param {object} [options]
   */
  prepare(stmt, options = {}) {
    this.xml += `<prepare error='${options.error || 'fast'}'>${stmt}</prepare>`;
  }

  /**
   * @description adds sql execute XML
   * @param {array} params
   * @param {object} [options]
   */
  execute(params, options = {}) {
    this.xml += `<execute error='${options.error || 'fast'}'>`;

    if (params && params.length) {
      for (let i = 0; i < params.length; i += 1) {
        const io = params[i].length ? `io='${params[i][1]}'` : '';
        this.xml += `<parm ${io}>${params[i][0]}</parm>`;
      }
    }
    this.xml += '</execute>';
  }

  /**
   * @description adds sql table XML
   * @param {array} params
   * @param {object} [options]
   */
  tables(params, options = {}) {
    this.xml += `<tables error='${options.error || 'fast'}'>`;
    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</tables>';
  }

  /**
   * @description adds sql table priv XML
   * @param {array} params
   * @param {object} [options]
   */
  tablePriv(params, options = {}) {
    this.xml += `<tablepriv error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }

    this.xml += '</tablepriv>';
  }

  /**
   * @description adds sql columns XML
   * @param {array} params
   * @param {object} [options]
   */
  columns(params, options = {}) {
    this.xml += `<columns error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</columns>';
  }

  /**
   * @description adds sql special XML
   * @param {array} params
   * @param {object} [options]
   */
  special(params, options = {}) {
    this.xml += `<special error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</special>';
  }

  /**
   * @description adds sql column priv XML
   * @param {array} params
   * @param {object} [options]
   */
  columnPriv(params, options = {}) {
    this.xml += `<columnpriv error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</columnpriv>';
  }

  /**
   * @description adds sql procedures XML
   * @param {*} params
   * @param {*} [options]
   */
  procedures(params, options = {}) {
    this.xml += `<procedures error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</procedures>';
  }

  /**
   * @description adds sql pcolumns XML
   * @param {array} params
   * @param {object} [options]
   */
  pColumns(params, options = {}) {
    this.xml += `<pcolumns error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</pcolumns>';
  }

  /**
   * @description adds sql primary keys XML
   * @param {array} params
   * @param {object} [options]
   */
  primaryKeys(params, options = {}) {
    this.xml += `<primarykeys error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</primarykeys>';
  }

  /**
   * @description adds sql foriegn keys XML
   * @param {array} params
   * @param {object} [options]
   */
  foreignKeys(params, options = {}) {
    this.xml += `<foreignkeys error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</foreignkeys>';
  }

  /**
   * @description adds sql stats XML
   * @param {array} params
   * @param {object} [options]
   */
  statistics(params, options = {}) {
    this.xml += `<statistics error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</statistics>';
  }

  /**
   * @description adds sql commit XML
   * @param {object} options
   */
  commit(options = {}) {
    this.xml += `<commit action='${options.action || 'commit'}' error='${options.error || 'fast'}'></commit>`;
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  rowCount(options = {}) {
    this.xml += `<rowcount error='${options.error || 'fast'}'></rowcount>`;
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  count(options = {}) {
    this.xml += `<count desc='${options.desc || 'both'}' error='${options.error || 'fast'}'></count>`;
  }

  /**
   * @description adds sql describe XML
   * @param {object} options
   */
  describe(options = {}) {
    this.xml += `<describe desc='${options.desc || 'both'}' error='${options.error || 'fast'}'></describe>`;
  }

  /**
   * @description adds sql fetch XML
   * @param {object} options
   */
  fetch(options = {}) {
    this.xml += `<fetch block='${options.block || 'all'}' desc='${options.desc || 'on'}' error='${options.error || 'fast'}'></fetch>`;
  }

  /**
   * @description adds sql free XML
   */
  free() {
    this.xml += '<free></free>';
  }

  /**
   * @description returns the current sql XML
   * @returns {string} - the generted sql XML
   */
  toXML() {
    return `${this.xml}</sql>`;
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
  /**
   * @constructor
   * @param {Connection} conn
   */
  constructor(conn) {
    iWorkDeprecate('As of v1.0, class \'iWork\' is deprecated and will be removed at a later time.');
    if (conn.constructor.name === 'Connection') {
      this.conn = conn;
      this.reportError = conn.returnError;
    } else if (conn.constructor.name === 'iConn') {
      this.conn = conn.connection;
      this.reportError = this.conn.returnError;
    } else {
      throw new Error('Expected a Connection object');
    }

    /* when returnError is false connection.run((xmloutput))
     * we create a new Connection object so connection.run((error, xmloutput))
     * this.reportError is checked within the callback to notify the user or not
    */
    if (!this.reportError) {
      this.conn = new Connection({
        transport: this.conn.transport,
        transportOptions: this.conn.transportOptions,
      });
    }

    this.errno = {
      type: 'ds',
      io: 'both',
      len: 'rec2',
      fields: [
        {
          name: 'bytes_provided',
          type: '10i0',
          value: 0,
          setlen: 'rec2',
        },
        { name: 'bytes_available', type: '10i0', value: 0 },
        { name: 'msgid', type: '7A', value: '' },
        { type: '1A', value: '' },
      ],
    };
  }

  /**
   * @param {string} sysValue
   * @param {function} cb
   */
  getSysValue(sysValue, cb) {
    iWorkDeprecate('As of v1.0, \'iWork.getSysValue()\' is deprecated and will be removed at a later time.');
    let keyValid = false;
    let type = '10i0';

    const sysvalArray = [
      { type: '100A', key: ['QSSLPCL'] },
      { type: '152A', key: ['QALWOBJRST', 'QSYSLIBL'] },
      { type: '160A', key: ['QAUDLVL', 'QSETJOBATR'] },
      { type: '200A', key: ['QSCANFS', 'QSCANFSCTL'] },
      { type: '252A', key: ['QUSRLIBL'] },
      { type: '1280A', key: ['QSSLCSL'] },
      { type: '52A', key: ['QAUDCTL'] },
      { type: '316A', key: ['QBOOKPATH'] },
      { type: '500A', key: ['QALWUSRDMN'] },
      { type: '752A', key: ['QPWDRULES'] },
      { type: '80A', key: ['QACGLVL'] },
      { type: '992A', key: ['QAUDLVL2'] },
      { type: '10i0', key: ['QACTJOB', 'QADLACTJ', 'QADLSPLA', 'QADLTOTJ', 'QAUDFRCLVL', 'QAUTOVRT', 'QBASACTLVL', 'QBASPOOL', 'QCCSID', 'QENDJOBLMT', 'QHSTLOGSIZ', 'QIGCFNTSIZ', 'QJOBMSGQMX', 'QJOBMSGQSZ', 'QJOBMSGQTL', 'QJOBSPLA', 'QLEAPADJ', 'QMAXACTLVL', 'QMAXJOB', 'QMAXSPLF', 'QMCHPOOL', 'QPRBHLDITV', 'QPWDEXPWRN', 'QPWDLVL', 'QPWDMAXLEN', 'QPWDMINLEN', 'QPWRDWNLMT', 'QSTGLOWLMT', 'QSVRAUTITV', 'QTOTJOB'] },
      { type: '4A', key: ['QABNORMSW', 'QALWJOBITP', 'QAUTOCFG', 'QAUTORMT', 'QAUTOSPRPT', 'QCENTURY', 'QCURSYM', 'QDATSEP', 'QDBRCVYWT', 'QDECFMT', 'QDSPSGNINF', 'QDYNPTYADJ', 'QDYNPTYSCD', 'QFRCCVNRST', 'QIGC', 'QIPLSTS', 'QIPLTYPE', 'QLIBLCKLVL', 'QLMTDEVSSN', 'QLMTSECOFR', 'QMAXSGNACN', 'QMLTTHDACN', 'QPFRADJ', 'QPRCMLTTSK', 'QPWDLMTAJC', 'QPWDLMTREP', 'QPWDPOSDIF', 'QPWDRQDDGT', 'QPWDRQDDIF', 'QPWRRSTIPL', 'QRETSVRSEC', 'QRMTIPL', 'QRMTSRVATR', 'QSAVACCPTH', 'QSCPFCONS', 'QSHRMEMCTL', 'QSTRPRTWTR', 'QTHDRSCADJ', 'QTIMSEP', 'QVFYOBJRST'] },
      { type: '12A', key: ['QASTLVL', 'QAUDENDACN', 'QCHRIDCTL', 'QCMNARB', 'QCONSOLE', 'QCRTAUT', 'QCRTOBJAUD', 'QDBFSTCCOL', 'QDEVNAMING', 'QDSCJOBITV', 'QINACTITV', 'QJOBMSGQFL', 'QKBDBUF', 'QLOGOUTPUT', 'QPASTHRSVR', 'QPRTDEV', 'QPRTKEYFMT', 'QPWDCHGBLK', 'QPWDLMTCHR', 'QQRYDEGREE', 'QQRYTIMLMT', 'QRCLSPLSTG', 'QSFWERRLOG', 'QSPCENV', 'QSPLFACN', 'QSRVDMP', 'QSSLCSLCTL', 'QSTGLOWACN', 'QSTSMSG', 'QTIMZON', 'QTSEPOOL', 'QUSEADPAUT'] },
      { type: '16A', key: ['QIPLDATTIM'] },
      { type: '4A', key: ['QCNTRYID', 'QHOUR', 'QMINUTE', 'QMONTH', 'QSECOND', 'QSECURITY', 'QYEAR'] },
      { type: '20A', key: ['QATNPGM', 'QCFGMSGQ', 'QCHRID', 'QCMNRCYLMT', 'QCTLSBSD', 'QDATETIME', 'QDEVRCYACN', 'QIGCCDEFNT', 'QINACTMSGQ', 'QPRBFTR', 'QPWDVLDPGM', 'QRMTSIGN', 'QSRTSEQ', 'QSTRUPPGM', 'QTHDRSCAFN', 'QUPSDLYTIM', 'QUPSMSGQ'] },
      { type: '2076A', key: ['QLOCALE'] },
      { type: '4A', key: ['QDATFMT', 'QDAY', 'QKBDTYPE', 'QLANGID'] },
      { type: '32A', key: ['QPRTTXT', 'QTIMADJ'] },
      { type: '4A', key: ['QDAYOFWEEK', 'QMODEL', 'QPRCFEAT'] },
      { type: '8A', key: ['QUTCOFFSET'] },
      { type: '8A', key: ['QMAXSIGN', 'QPWDEXPITV'] },
      { type: '8A', key: ['QDATE'] },
      { type: '8A', key: ['QSRLNBR'] },
      { type: '12A', key: ['QTIME'] },
    ];

    sysvalArray.some((value) => value.key.some((key) => {
      if (sysValue === key) {
        keyValid = true;
        ({ type } = value);
        return true;
      }
      return false;
    }));

    // TODO: Throw error
    if (keyValid === false) { return; }

    let item;
    if (type === '10i0') { item = { type: '10i0', value: 0 }; } else { item = { type, value: '' }; }

    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Number of system values returned
        { type: '10i0', value: 0 }, // Offset to system value information table
        { type: '10A', value: '' }, // System value
        { type: '1A', value: '' }, // Type of data(C--character / B--binary / blank--not available.)
        { type: '1A', value: '' }, // Information status(blank--The information was available.)
        { type: '10i0', value: 0 }, // Length of data
        item,
      ],
    };

    const pgm = new ProgramCall('QWCRSVAL', { lib: 'QSYS' });
    pgm.addParam(outBuf); // Receiver buffer
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 }); // Length of the receiver buffer
    pgm.addParam({ type: '10i0', value: 1 }); // Number of system values to retrieve
    pgm.addParam({ type: '10A', value: sysValue }); // System value name
    pgm.addParam(this.errno); // Error code

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = data[6]._; // Get the returned value from the output array.
        } else {
          rtValue = str;
        }
        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML
  }

  /**
   * @param {function} cb
   */
  getSysStatus(cb) {
    iWorkDeprecate('As of v1.0, \'iWork.getSysStatus()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '20u0', value: '' }, // Current date and time
        { type: '8A', value: '' }, // System name
        { type: '10i0', value: 0 }, // Users currently signed on
        { type: '10i0', value: 0 }, // Users temporarily signed off (disconnected)
        { type: '10i0', value: 0 }, // Users suspended by system request
        { type: '10i0', value: 0 }, // Users suspended by group jobs
        { type: '10i0', value: 0 }, // Users signed off with printer output waiting to print
        { type: '10i0', value: 0 }, // Batch jobs waiting for messages
        { type: '10i0', value: 0 }, // Batch jobs running
        { type: '10i0', value: 0 }, // Batch jobs held while running
        { type: '10i0', value: 0 }, // Batch jobs ending
        { type: '10i0', value: 0 }, // Batch jobs waiting to run or already scheduled
        { type: '10i0', value: 0 }, // Batch jobs held on a job queue
        { type: '10i0', value: 0 }, // Batch jobs on a held job queue
        { type: '10i0', value: 0 }, // Batch jobs on an unassigned job queue
        { type: '10i0', value: 0 }, // Batch jobs ended with printer output waiting to print
      ],
    };
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'SSTS0100' });
    pgm.addParam({ type: '10A', value: '*NO' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Current_date_and_time: data[2]._,
            System_name: data[3]._,
            Users_currently_signed_on: data[4]._,
            'Users_temporarily_signed_off_(disconnected)': data[5]._,
            Users_suspended_by_system_request: data[6]._,
            Users_suspended_by_group_jobs: data[7]._,
            Users_signed_off_with_printer_output_waiting_to_print: data[8]._,
            Batch_jobs_waiting_for_messages: data[9]._,
            Batch_jobs_running: data[10]._,
            Batch_jobs_held_while_running: data[11]._,
            Batch_jobs_ending: data[12]._,
            Batch_jobs_waiting_to_run_or_already_scheduled: data[13]._,
            Batch_jobs_held_on_a_job_queue: data[14]._,
            Batch_jobs_on_a_held_job_queue: data[15]._,
            Batch_jobs_on_an_unassigned_job_queue: data[16]._,
            Batch_jobs_ended_with_printer_output_waiting_to_print: data[17]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson);
  }

  /**
   * @param {function} cb
   */
  getSysStatusExt(cb) {
    iWorkDeprecate('As of v1.0, \'iWork.getSysStatusExt()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '20u0', value: '' }, // Current date and time
        { type: '8A', value: '' }, // System name
        { type: '6A', value: '' }, // Elapsed time
        { type: '1A', value: '' }, // Restricted state flag
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // % processing unit used
        { type: '10i0', value: 0 }, // Jobs in system
        { type: '10i0', value: 0 }, // % permanent addresses
        { type: '10i0', value: 0 }, // % temporary addresses
        { type: '10i0', value: 0 }, // System ASP
        { type: '10i0', value: 0 }, // % system ASP used
        { type: '10i0', value: 0 }, // Total auxiliary storage
        { type: '10i0', value: 0 }, // Current unprotected storage used
        { type: '10i0', value: 0 }, // Maximum unprotected storage used
        { type: '10i0', value: 0 }, // % DB capability
        { type: '10i0', value: 0 }, // Main storage size
        { type: '10i0', value: 0 }, // Number of partitions
        { type: '10i0', value: 0 }, // Partition identifier
        { type: '10i0', value: 0 }, // Reserved
        { type: '10i0', value: 0 }, // Current processing capacity
        { type: '1A', value: '' }, // Processor sharing attribute
        { type: '3A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Number of processors
        { type: '10i0', value: 0 }, // Active jobs in system
        { type: '10i0', value: 0 }, // Active threads in system
        { type: '10i0', value: 0 }, // Maximum jobs in system
        { type: '10i0', value: 0 }, // % temporary 256MB segments used
        { type: '10i0', value: 0 }, // % temporary 4GB segments used
        { type: '10i0', value: 0 }, // % permanent 256MB segments used
        { type: '10i0', value: 0 }, // % permanent 4GB segments used
        { type: '10i0', value: 0 }, // % current interactive performance
        { type: '10i0', value: 0 }, // % uncapped CPU capacity used
        { type: '10i0', value: 0 }, // % shared processor pool used
        { type: '20u0', value: 0 }, // Main storage size (long)
      ],
    };
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'SSTS0200' });
    pgm.addParam({ type: '10A', value: '*NO' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }

        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Current_date_and_time: data[2]._,
            System_name: data[3]._,
            Elapsed_time: data[4]._,
            Restricted_state_flag: data[5]._,
            '%_processing_unit_used': data[7]._,
            Jobs_in_system: data[8]._,
            '%_permanent_addresses': data[9]._,
            '%_temporary_addresses': data[10]._,
            System_ASP: data[11]._,
            '%_system_ASP_used': data[12]._,
            Total_auxiliary_storage: data[13]._,
            Current_unprotected_storage_used: data[14]._,
            Maximum_unprotected_storage_used: data[15]._,
            '%_DB_capability': data[16]._,
            Main_storage_size: data[17]._,
            Number_of_partitions: data[18]._,
            Partition_identifier: data[19]._,
            Current_processing_capacity: data[21]._,
            Processor_sharing_attribute: data[22]._,
            Number_of_processors: data[24]._,
            Active_jobs_in_system: data[25]._,
            Active_threads_in_system: data[26]._,
            Maximum_jobs_in_system: data[27]._,
            '%_temporary_256MB_segments_used': data[28]._,
            '%_temporary_4GB_segments_used': data[29]._,
            '%_permanent_256MB_segments_used': data[30]._,
            '%_permanent_4GB_segments_used': data[31]._,
            '%_current_interactive_performance': data[32]._,
            '%_uncapped_CPU_capacity_used': data[33]._,
            '%_shared_processor_pool_used': data[34]._,
            'Main_storage_size_(long)': data[35]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson);
  }

  /**
   * @param {string} jobId
   * @param {function} cb
   */
  getJobStatus(jobId, cb) {
    iWorkDeprecate('As of v1.0, \'iWork.getJobStatus()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Job status
        { type: '16h', value: '' }, // Internal job identifier
        { type: '26A', value: '' }, // Fully qualified job name
      ],
    };
    const pgm = new ProgramCall('QWCRJBST', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '6A', value: jobId });
    pgm.addParam({ type: '8A', value: 'JOBS0100' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }

        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Job_status: data[2]._,
            Fully_qualified_job_name: data[4]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson);
  }

  /**
   * @param {string} jobName
   * @param {string} userName
   * @param {string} jobNumber
   * @param {function} cb
   */
  getJobInfo(jobName, userName, jobNumber, cb) {
    iWorkDeprecate('As of v1.0, \'iWork.getJobInfo()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Number of bytes returned
        { type: '10i0', value: 0 }, // Number of bytes available
        { type: '10A', value: '' }, // Job name
        { type: '10A', value: '' }, // User name
        { type: '6A', value: '' }, // Job number
        { type: '16h', value: '' }, // Internal job identifier
        { type: '10A', value: '' }, // Job status
        { type: '1A', value: '' }, // Job type
        { type: '1A', value: '' }, // Job subtype
        { type: '10A', value: '' }, // Subsystem description name
        { type: '10i0', value: 0 }, // Run priority (job)
        { type: '10i0', value: 0 }, // System pool identifier
        { type: '10i0', value: 0 }, // Processing unit time used, if less than 2,147,483,647 milliseconds
        { type: '10i0', value: 0 }, // Number of auxiliary I/O requests, if less than 2,147,483,647
        { type: '10i0', value: 0 }, // Number of interactive transactions
        { type: '10i0', value: 0 }, // Response time total
        { type: '1A', value: '' }, // Function type
        { type: '10A', value: '' }, // Function name
        { type: '4A', value: '' }, // Active job status
        { type: '10i0', value: 0 }, // Number of database lock waits
        { type: '10i0', value: 0 }, // Number of internal machine lock waits
        { type: '10i0', value: 0 }, // Number of nondatabase lock waits
        { type: '10i0', value: 0 }, // Time spent on database lock waits
        { type: '10i0', value: 0 }, // Time spent on internal machine lock waits
        { type: '10i0', value: 0 }, // Time spent on nondatabase lock waits
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Current system pool identifier
        { type: '10i0', value: 0 }, // Thread count
        { type: '20u0', value: 0 }, // Processing unit time used - total for the job
        { type: '20u0', value: 0 }, // Number of auxiliary I/O requests
        { type: '20u0', value: 0 }, // Processing unit time used for database - total for the job
        { type: '20u0', value: 0 }, // Page faults
        { type: '4A', value: '' }, // Active job status for jobs ending
        { type: '10A', value: '' }, // Memory pool name
        { type: '1A', value: '' }, // Message reply
        { type: '4A', value: '' }, // Message key, when active job waiting for a message
        { type: '10A', value: '' }, // Message queue name, when active job waiting for a message
        { type: '10A', value: '' }, // Message queue library name, when active job waiting for a message
        { type: '10A', value: '' }, // Message queue library ASP device name, when active job waiting for a message
      ],
    };
    const JobId = {
      type: 'ds',
      fields: [
        { type: '10A', value: jobName },
        { type: '10A', value: userName },
        { type: '6A', value: jobNumber },
      ],
    };
    const pgm = new ProgramCall('QUSRJOBI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'JOBI0200' });
    pgm.addParam(JobId);
    pgm.addParam({ type: '16A', value: '' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }

        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];

          rtValue = {
            Job_name: data[2]._,
            User_name: data[3]._,
            Job_number: data[4]._,
            Job_status: data[6]._,
            Job_type: data[7]._,
            Job_subtype: data[8]._,
            Subsystem_description_name: data[9]._,
            'Run_priority_(job)': data[10]._,
            System_pool_identifier: data[11]._,
            'Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds': data[12]._,
            'Number_of_auxiliary_I/O_requests,_if_less_than_2,147,483,647': data[13]._,
            Number_of_interactive_transactions: data[14]._,
            Response_time_total: data[15]._,
            Function_type: data[16]._,
            Function_name: data[17]._,
            Active_job_status: data[18]._,
            Number_of_database_lock_waits: data[19]._,
            Number_of_internal_machine_lock_waits: data[20]._,
            Number_of_nondatabase_lock_waits: data[21]._,
            Time_spent_on_database_lock_waits: data[22]._,
            Time_spent_on_internal_machine_lock_waits: data[23]._,
            Time_spent_on_nondatabase_lock_waits: data[24]._,
            Current_system_pool_identifier: data[26]._,
            Thread_count: data[27]._,
            'Processing_unit_time_used_-_total_for_the_job': data[28]._,
            'Number_of_auxiliary_I/O_requests': data[29]._,
            'Processing_unit_time_used_for_database_-_total_for_the_job': data[30]._,
            Page_faults: data[31]._,
            Active_job_status_for_jobs_ending: data[32]._,
            Memory_pool_name: data[33]._,
            Message_reply: data[34]._,
            'Message_key,_when_active_job_waiting_for_a_message': data[35]._,
            'Message_queue_name,_when_active_job_waiting_for_a_message': data[36]._,
            'Message_queue_library_name,_when_active_job_waiting_for_a_message': data[37]._,
            'Message_queue_library_ASP_device_name,_when_active_job_waiting_for_a_message': data[38]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson);
  }

  /**
   * @param {string} lib
   * @param {string} area
   * @param {string} length
   * @param {function} cb
   */
  getDataArea(lib, area, length, cb) {
    iWorkDeprecate('As of v1.0, \'iWork.getDataArea()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      fields: [
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10A', value: '' }, // Type of value returned
        { type: '10A', value: '' }, // Library name
        { type: '10i0', value: 0 }, // Length of value returned
        { type: '10i0', value: 0 }, // Number of decimal positions
        { type: `${length}A`, value: '' }, // Value
      ],
    };
    const areaPath = {
      type: 'ds',
      fields: [
        { type: '10A', value: area },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QWCRDTAA', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', value: length + 36 });
    pgm.addParam(areaPath);
    pgm.addParam({ type: '10i0', value: 1 });
    pgm.addParam({ type: '10i0', value: length });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Type_of_value_returned: data[2]._,
            Library_name: data[3]._,
            Length_of_value_returned: data[4]._,
            Number_of_decimal_positions: data[5]._,
            Value: data[6]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson);
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

const xmlToJson = (xml) => {
  xmlToJsonDeprecate('As of v1.0, \'xmlToJson\' is deprecated. Use xml2js npm package instead.');

  const cmdRegG = /<cmd.*?>[\s\S]+?<\/cmd>/g;
  const shRegG = /<sh.*?>[\s\S]+?<\/sh>/g;
  const qshRegG = /<qsh.*?>[\s\S]+?<\/qsh>/g;
  const pgmRegG = /<pgm.*?>[\s\S]+?<\/pgm>/g;
  const sqlRegG = /<sql.*?>[\s\S]+?<\/sql>/g;

  const shReg = /<sh.*?>([\s\S]+?)<\/sh>/;
  const qshReg = /<qsh.*?>([\s\S]+?)<\/qsh>/;
  const pgmReg = /<pgm name='(.*?)' lib='(.*?)'.*?>/;

  const successReg = /<success>.*?\+\+\+ success (.*?)<\/success>/;
  const errorReg = /<error>.*?\*\*\* error (.*?)<\/error>.*?<error>(.*?)<\/error>/;
  const rtDataRegG = /<data desc='.*?'>[\s\S]*?<\/data>/g;
  const rtDataReg = /<data desc='(.*?)'>([\s\S]*?)<\/data>/;

  // const dsRegG = /<ds.*?>[\s\S]+?<\/ds>/g; // TODO: Not used
  // const dsReg = /<ds.*?>([\s\S]+?)<\/ds>/; // TODO: Not used
  const dataRegG = /<data[\s\S]*?<\/data>/g;
  const dataReg = /<data.*?type='(.*?)'.*?>([\s\S]*?)<\/data>/;
  const sqlResultG = /<row>[\s\S]+?<\/row>/g;
  const sqlRowG = /<data desc='[\s\S]+?'>[\s\S]*?<\/data>/g;
  const sqlRow = /<data desc='([\s\S]+?)'>([\s\S]*?)<\/data>/;

  const cmdData = xml.match(cmdRegG);
  const shData = xml.match(shRegG);
  const qshData = xml.match(qshRegG);
  const pgmData = xml.match(pgmRegG);
  const sqlData = xml.match(sqlRegG);

  const ResultArr = [];

  // parse cmd matches
  if (cmdData && cmdData.length > 0) {
    cmdData.forEach((cmd) => {
      const rs = { type: 'cmd' };
      const sucFlag = cmd.match(successReg);

      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) {
          [, rs.cmd] = sucFlag;
        }
      } else {
        rs.success = false;
        const errFlag = cmd.match(errorReg);
        if (errFlag && errFlag.length > 1) {
          [, rs.cmd] = errFlag;
        }
        if (errFlag && errFlag.length > 2) {
          [, , rs.error] = errFlag;
        }
      }
      const rowArray = cmd.match(rtDataRegG);

      if (rowArray && rowArray.length > 0) {
        const arr = [];

        rowArray.forEach((row) => {
          const eachRow = row.match(rtDataReg);
          if (eachRow && eachRow.length > 1) {
            arr.push({ name: eachRow[1], value: eachRow[2] ? eachRow[2] : '' });
          }
        });

        rs.data = arr;
      }
      ResultArr.push(rs);
    });
  }

  // parse sh matches
  if (shData && shData.length > 0) {
    shData.forEach((sh) => {
      const rs = { type: 'sh' };
      const shOutput = sh.match(shReg);

      if (shOutput && shOutput.length > 0) {
        [, rs.data] = shOutput;
      }
      ResultArr.push(rs);
    });
  }

  // parse qsh matches
  if (qshData && qshData.length > 0) {
    qshData.forEach((qsh) => {
      const rs = { type: 'qsh' };
      const qshOutput = qsh.match(qshReg);
      if (qshOutput && qshOutput.length > 0) {
        [, rs.data] = qshOutput;
      }
      ResultArr.push(rs);
    });
  }

  // parse pgm matches
  if (pgmData && pgmData.length > 0) {
    pgmData.forEach((pgm) => {
      const rs = { type: 'pgm' };
      const sucFlag = pgm.match(successReg);

      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
      } else {
        rs.success = false;
      }

      const pgmLib = pgm.match(pgmReg);

      if (pgmLib && pgmLib.length > 2) {
        [, rs.pgm, rs.lib] = pgmLib;
      }

      const paramData = pgm.match(dataRegG);

      if (paramData && paramData.length > 0) {
        const arr = [];
        paramData.forEach((param) => {
          const obj = {};
          const rx = / \b(.*?)\s*=\s*'([^']*)'/g;
          const eachRow = param.match(dataReg);
          let attr;

          if (eachRow && eachRow.length > 1) {
            obj.value = (eachRow[2] ? eachRow[2] : '');
          }

          // eslint-disable-next-line no-cond-assign
          while (attr = rx.exec(param)) {
            // eslint-disable-next-line prefer-destructuring
            obj[attr[1]] = attr[2];
          }

          arr.push(obj);
        });

        rs.data = arr;
      }
      ResultArr.push(rs);
    });
  }

  // parse sql matches
  if (sqlData && sqlData.length > 0) {
    sqlData.forEach((sql) => {
      const rs = { type: 'sql' };
      const sucFlag = sql.match(successReg);

      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) {
          if (sucFlag[0].includes('![CDATA')) {
            const fixed = sucFlag[1].replace(/]]>/, '');
            rs.stmt = fixed;
          } else {
            [, rs.stmt] = sucFlag;
          }
        }
      } else {
        rs.success = false;
        const errFlag = sql.match(errorReg);

        if (errFlag && errFlag.length > 1) {
          [, rs.stmt] = errFlag;
        }
        if (errFlag && errFlag.length > 2) {
          [, , rs.error] = errFlag;
        }
      }

      const sqlResult = sql.match(sqlResultG);

      if (sqlResult && sqlResult.length > 0) {
        const arr = [];

        sqlResult.forEach((result) => {
          const eachRow = result.match(sqlRowG);

          if (eachRow) {
            const theRow = [];

            eachRow.forEach((row) => {
              const perField = row.match(sqlRow);

              if (perField && perField.length > 2) {
                theRow.push({ desc: perField[1], value: perField[2] });
              }
            });

            arr.push(theRow);
          }
        });

        rs.result = arr;
      }
      ResultArr.push(rs);
    });
  }
  return ResultArr;
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
module.exports.xmlToJson = xmlToJson;
