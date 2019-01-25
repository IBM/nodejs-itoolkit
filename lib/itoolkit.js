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

const iCall = require('./irest');
const iDb = require('./istoredp');
const iXml = require('./ixml');
// REST or DB2 tranport to XMLSERVICE
const I_TRANSPORT_REST = 'REST';
const I_TRANSPORT_DB2 = 'DB2';

const xmlToJson = (xml) => {
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
  if (cmdData && cmdData.length > 0) {
    // Object.keys(cmdData).forEach((key) => {
    //   iXml += iXmlAttrDefault(options[key].desc, options[key].value, I_XML_ATTR_VALUE_OPTIONAL);
    // });
    for (i in cmdData) {
      const rs = { type: 'cmd' };
      const sucFlag = cmdData[i].match(successReg);
      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) { rs.cmd = sucFlag[1]; }
      } else {
        rs.success = false;
        const errFlag = cmdData[i].match(errorReg);
        if (errFlag && errFlag.length > 1) { rs.cmd = errFlag[1]; }
        if (errFlag && errFlag.length > 2) { rs.error = errFlag[2]; }
      }
      const rowArray = cmdData[i].match(rtDataRegG);
      if (rowArray && rowArray.length > 0) {
        const arr = [];
        for (j in rowArray) {
          const eachRow = rowArray[j].match(rtDataReg);
          if (eachRow && eachRow.length > 1) { arr.push({ name: eachRow[1], value: eachRow[2] ? eachRow[2] : '' }); }
        }
        rs.data = arr;
      }
      ResultArr.push(rs);
    }
  }
  if (shData && shData.length > 0) {
    for (i in shData) {
      const rs = { type: 'sh' };
      const shOutput = shData[i].match(shReg);
      if (shOutput && shOutput.length > 0) { rs.data = shOutput[1]; }
      ResultArr.push(rs);
    }
  }
  if (qshData && qshData.length > 0) {
    for (i in qshData) {
      const rs = { type: 'qsh' };
      const qshOutput = qshData[i].match(qshReg);
      if (qshOutput && qshOutput.length > 0) { rs.data = qshOutput[1]; }
      ResultArr.push(rs);
    }
  }
  if (pgmData && pgmData.length > 0) {
    for (i in pgmData) {
      const rs = { type: 'pgm' };
      const sucFlag = pgmData[i].match(successReg);
      if (sucFlag && sucFlag.length > 0) { rs.success = true; } else { rs.success = false; }
      const pgmLib = pgmData[i].match(pgmReg);
      if (pgmLib && pgmLib.length > 2) {
        rs.pgm = pgmLib[1];
        rs.lib = pgmLib[2];
      }
      const paramData = pgmData[i].match(dataRegG);
      if (paramData && paramData.length > 0) {
        const arr = [];
        for (j in paramData) {
          const obj = {}; let attr; const
            rx = / \b(.*?)\s*=\s*'([^']*)'/g;
          const eachRow = paramData[j].match(dataReg);
          if (eachRow && eachRow.length > 1) { obj.value = (eachRow[2] ? eachRow[2] : ''); }
          while (attr = rx.exec(paramData[j])) {
            obj[attr[1]] = attr[2];
          }
          arr.push(obj);
        }
        rs.data = arr;
      }
      ResultArr.push(rs);
    }
  }
  if (sqlData && sqlData.length > 0) {
    for (i in sqlData) {
      const rs = { type: 'sql' };
      const sucFlag = sqlData[i].match(successReg);
      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) { rs.stmt = sucFlag[1]; }
      } else {
        rs.success = false;
        const errFlag = sqlData[i].match(errorReg);
        if (errFlag && errFlag.length > 1) { rs.stmt = errFlag[1]; }
        if (errFlag && errFlag.length > 2) { rs.error = errFlag[2]; }
      }
      const sqlResult = sqlData[i].match(sqlResultG);
      if (sqlResult && sqlResult.length > 0) {
        const arr = [];
        for (j in sqlResult) {
          const eachRow = sqlResult[j].match(sqlRowG);
          if (eachRow) {
            const theRow = [];
            for (j in eachRow) {
              const perField = eachRow[j].match(sqlRow);
              if (perField && perField.length > 2) { theRow.push({ desc: perField[1], value: perField[2] }); }
            }
            arr.push(theRow);
          }
        }
        rs.result = arr;
      }
      ResultArr.push(rs);
    }
  }
  return ResultArr;
};

// iConn() constructs and returns  a connection object containing connection properties which can be
// used by attach().
class iConn {
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
        if (option.path) { this.conn.I_TRANSPORT_REST_PATH = option.path; } else { this.conn.I_TRANSPORT_REST_PATH = '/'; }
      } else {
        this.conn.I_TRANSPORT = I_TRANSPORT_DB2;
        if (option.xslib && option.xslib.length > 0) { this.conn.iXml_SERVICE_LIB = option.xslib; }
      }

      if (option.ctl && option.ctl.length > 0) { this.conn.I_TRANSPORT_CTL = option.ctl; }
      if (option.ipc && option.ipc.length > 0) { this.conn.I_TRANSPORT_IPC = option.ipc; }
      if (Number.isNaN(option.buf)) { this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = '500000'; } else { this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = option.buf.toString(); }
    } else { this.conn.I_TRANSPORT = I_TRANSPORT_DB2; }
  }

  // setTimeout() override the default timeout value for sync mode.
  setTimeout(seconds) {
    if (typeof seconds === 'number') { this.timeout = seconds * 1000; }
  }

  // debug() get current verbose mode or enable/disable verbose mode for debugging.
  debug(flag) {
    if (typeof flag === 'boolean') {
      this.I_DEBUG_VERBOSE = flag;
      return null; // TODO: consistent return
    }
    return this.I_DEBUG_VERBOSE;
  }

  // getConnection() returns current attached connection object.
  getConnection() {
    return this.conn;
  }

  // debug() get current verbose mode or enable/disable verbose mode for debugging.
  add(xml) {
    if (typeof xml === 'object') { this.cmds.push(xml.toXML()); } else { this.cmds.push(xml); }
  }

  // run() sends the commands in XML document via REST or DB2 way. And fetch the response.
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
      iCall.iRestHttp(callback,
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
      iDb.db2Call(callback,
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

// iCmd() return a CL command object
const iCmd = (cmd, options) => {
  let xexec = 'cmd';


  let xml; // The default
  if (cmd.indexOf('?') > 0) { xexec = 'rexx'; } // If need return value
  if (options) { xml = iXml.iXmlNodeCmdOpen(options.exec, options.hex, options.before, options.after, options.error) + cmd + iXml.iXmlNodeCmdClose(); } else { xml = iXml.iXmlNodeCmdOpen(xexec, '', '', '', '', '') + cmd + iXml.iXmlNodeCmdClose(); }
  return xml;
};

// iSh() return a PASE shell object
const iSh = (sh, options) => {
  let xml;
  if (options) { xml = iXml.iXmlNodeShOpen(options.rows, options.hex, options.before, options.after, options.error) + sh + iXml.iXmlNodeShClose(); } else { xml = iXml.iXmlNodeShOpen('', '', '', '', '') + sh + iXml.iXmlNodeShClose(); }
  return xml;
};

// iQsh() return a qsh object
const iQsh = (qsh, options) => {
  let xml;
  if (options) { xml = iXml.iXmlNodeQshOpen(options.rows, options.hex, options.before, options.after, options.error) + qsh + iXml.iXmlNodeQshClose(); } else { xml = iXml.iXmlNodeQshOpen('', '', '', '', '') + qsh + iXml.iXmlNodeQshClose(); }
  return xml;
};


class ProgramCaller {
  constructor(program, options) {
    // TODO: what if there are some options but not others? iPgm is all or nothing
    if (options && typeof options === 'object' && options.lib && options.func && options.error) {
      this.xml = iXml.iXmlNodePgmOpen(program, options.lib, options.func, options.error);
    } else {
      this.xml = iXml.iXmlNodePgmOpen(program, '', '', '');
    }
  }

  /**
   * Add a parameter to the called program
   * @param {number} data    - The x value.
   * @param {number} type    - The y value.
   * @param {number} options - The x value.
   * @param {number} inDs    - The y value.
   */
  addParam(data, type, options, inDs = null) {
    let opt;
    // DS element has no 'type', so if the second param 'type' is an Object, then it is the options.
    if (typeof type === 'object') {
      opt = type;
    } else {
      opt = options;
    }

    if (!inDs) { // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      if (opt && opt.io) {
        this.xml += iXml.iXmlNodeParmOpen(opt.io);
      } else {
        this.xml += iXml.iXmlNodeParmOpen();
      }
    }

    if (Array.isArray(data)) { // If it is a struct parameter, recursivly parse its children.
      if (opt) { this.xml += iXml.iXmlNodeDsOpen(opt.dim, opt.dou, opt.len, opt.data); } else { this.xml += iXml.iXmlNodeDsOpen('', '', '', ''); }
      for (let i = 0; i < data.length; i += 1) {
        this.addParam(data[i][0], data[i][1], data[i][2], true);
      }
      this.xml += iXml.iXmlNodeDsClose();
    } else { // A simple parameter
      this.xml += iXml.iXmlNodeDataOpen(type, opt) + data + iXml.iXmlNodeDataClose();
    }

    if (!inDs) { // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      this.xml += iXml.iXmlNodeParmClose();
    }
  }

  addReturn(data, type, options = null) {
    this.xml += iXml.iXmlNodeReturnOpen();
    if (options && typeof options === 'object') {
      this.xml += iXml.iXmlNodeDataOpen(type, options);
    } else {
      this.xml += iXml.iXmlNodeDataOpen(type);
    }
    this.xml += data + iXml.iXmlNodeDataClose() + iXml.iXmlNodeReturnClose();
  }

  toXML() {
    return this.xml + iXml.iXmlNodePgmClose();
  }
}

// iPgm() returns a Program/Service program call object
class iPgm {
  constructor(pgm, options) {
    console.warn('As of v1.0, class \'iPgm\' is deprecated. Please use \'ProgramCaller\' instead.');
    this.programCaller = new ProgramCaller(pgm, options);
  }

  addParam(data, type, options, inDs) {
    console.warn('As of v1.0, class \'iPgm.addParam(data, type, options, inDs)\' is deprecated. Please use \'ProgramCaller.addParam(data, type, options, inDs)\' instead.');
    this.programCaller.addParam(data, type, options, inDs);
  }

  addReturn(data, type, options) {
    console.warn('As of v1.0, class \'iPgm.addReturn(data, type, options)\' is deprecated. Please use \'ProgramCaller.addParam(data, type, options)\' instead.');
    this.programCaller.addReturn(data, type, options);
  }

  toXML() {
    console.warn('As of v1.0, class \'iPgm.toXML()\' is deprecated. Please use \'ProgramCaller.toXML()\' instead.');
    return this.programCaller.toXML();
  }
}

// iSql() returns a SQL connection object
class iSql {
  constructor() {
    this.xml = iXml.iXmlNodeSqlOpen();
  }

  connect(options) {
    if (options && options.options) { this.xml += iXml.iXmlNodeSqlConnect(options.db, options.uid, options.pwd, options.options); } else { this.xml += iXml.iXmlNodeSqlConnect(options.db, options.uid, options.pwd, 'opt1'); }
  }

  setOptions(options) {
    this.xml += iXml.iXmlNodeSqlOptions(options);
  }

  addQuery(stmt, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlQueryOpen(options.error) + stmt + iXml.iXmlNodeSqlQueryClose();
    } else {
      this.xml += iXml.iXmlNodeSqlQueryOpen() + stmt + iXml.iXmlNodeSqlQueryClose();
    }
  }

  prepare(stmt, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlPrepareOpen(options.error) + stmt
      + iXml.iXmlNodeSqlPrepareClose();
    } else {
      this.xml += iXml.iXmlNodeSqlPrepareOpen() + stmt + iXml.iXmlNodeSqlPrepareClose();
    }
  }

  execute(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlExecuteOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlExecuteOpen();
    }

    if (params && params.length) {
      for (let i = 0; i < params.length; i += 1) {
        if (params[i].length > 1) {
          this.xml += iXml.iXmlNodeSqlParmOpen(params[i][1]) + params[i][0]
          + iXml.iXmlNodeSqlParmClose();
        } else {
          this.xml += iXml.iXmlNodeSqlParmOpen() + params[i][0] + iXml.iXmlNodeSqlParmClose();
        }
      }
    }
    this.xml += iXml.iXmlNodeSqlExecuteClose();
  }

  tables(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlTablesOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlTablesOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlTablesClose();
  }

  tablePriv(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlTableprivOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlTableprivOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }

    this.xml += iXml.iXmlNodeSqlTableprivClose();
  }

  columns(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlColumnsOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlColumnsOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlColumnsClose();
  }

  special(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlSpecialOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlSpecialOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlSpecialClose();
  }

  columnPriv(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlColumnprivOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlColumnprivOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlColumnprivClose();
  }

  procedures(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlProceduresOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlProceduresOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlProceduresClose();
  }

  pColumns(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlPcolumnsOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlPcolumnsOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlPcolumnsClose();
  }

  primaryKeys(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlPrimarykeysOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlPrimarykeysOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlPrimarykeysClose();
  }

  foreignKeys(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlForeignkeysOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlForeignkeysOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlForeignkeysClose();
  }

  statistics(params, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlStatisticsOpen(options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlStatisticsOpen();
    }

    for (let i = 0; i < params.length; i += 1) {
      this.xml += iXml.iXmlNodeSqlParmOpen() + params[i] + iXml.iXmlNodeSqlParmClose();
    }
    this.xml += iXml.iXmlNodeSqlStatisticsClose();
  }

  commit(options) {
    if (options && options.action && options.error) { this.xml += iXml.iXmlNodeSqlCommit(options.action, options.error); } else if (options && options.action) { this.xml += iXml.iXmlNodeSqlCommit(options.action, ''); }
  }

  rowCount(options) {
    this.xml += iXml.iXmlNodeSqlRowCount(options.action, options.error);
  }

  count(options) {
    this.xml += iXml.iXmlNodeSqlRowCount(options.desc, options.error);
  }

  describe(options) {
    this.xml += iXml.iXmlNodeSqlDescribe(options.desc, options.error);
  }

  fetch(options) {
    if (options) {
      this.xml += iXml.iXmlNodeSqlFetch(options.block, options.desc, options.error);
    } else { this.xml += iXml.iXmlNodeSqlFetch(); }
  }

  free() {
    this.xml += iXml.iXmlNodeSqlFree();
  }

  toXML() {
    return this.xml + iXml.iXmlNodeSqlClose();
  }
}

exports.iConn = iConn;
exports.iCmd = iCmd;
exports.iSh = iSh;
exports.iQsh = iQsh;
exports.iPgm = iPgm;
exports.ProgramCaller = ProgramCaller;
exports.iSql = iSql;

exports.xmlToJson = xmlToJson;
