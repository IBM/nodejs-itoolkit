// Copyright (c) International Business Machines Corp. 2017
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
// IN THE SOFTWARE.

const i_xml = require('./ixml');
// REST or DB2 tranport to XMLSERVICE
const I_TRANSPORT_REST = "REST";
const I_TRANSPORT_DB2 = "DB2";

const __getClass = (object) => {
  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

const xmlToJson = (xml) => {
  const xmloutReg = /<xmloutput>[\s\S]+?<\/xmloutput>/;

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
  
  const dsRegG = /<ds.*?>[\s\S]+?<\/ds>/g;
  const dsReg = /<ds.*?>([\s\S]+?)<\/ds>/;
  const dataRegG =  /<data[\s\S]*?<\/data>/g;
  const dataReg =  /<data.*?type='(.*?)'.*?>([\s\S]*?)<\/data>/;
  const sqlResultG = /<row>[\s\S]+?<\/row>/g;
  const sqlRowG = /<data desc='[\s\S]+?'>[\s\S]*?<\/data>/g;
  const sqlRow = /<data desc='([\s\S]+?)'>([\s\S]*?)<\/data>/;
  
  let xmlData = "";
  let xmloutArr = xml.match(xmloutReg);
  if(xmloutArr && xmloutArr.length > 0) {
    xmlData = xmloutArr[0];
  }
  else {
    xmlData = xml;
  }

  let cmdData = xmlData.match(cmdRegG);
  let shData = xmlData.match(shRegG);
  let qshData = xmlData.match(qshRegG);
  let pgmData = xmlData.match(pgmRegG);
  let sqlData = xmlData.match(sqlRegG);
  
  let ResultArr = [];
  if(cmdData && cmdData.length > 0) {
    for(i in cmdData) {
      let rs = { "type" : "cmd" };
      let sucFlag = cmdData[i].match(successReg);
      if(sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if(sucFlag.length > 1)
          rs.cmd = sucFlag[1];
      }
      else {
        rs.success = false;
        let errFlag = cmdData[i].match(errorReg);
        if(errFlag && errFlag.length > 1)
          rs.cmd = errFlag[1];
        if(errFlag && errFlag.length > 2)
          rs.error = errFlag[2];
      }
      let rowArray = cmdData[i].match(rtDataRegG);
      if(rowArray && rowArray.length > 0) {
        let arr = [];
        for(j in rowArray) {
          let eachRow = rowArray[j].match(rtDataReg);
          if(eachRow && eachRow.length > 1)
            arr.push({"name" : eachRow[1], "value" : eachRow[2] ? eachRow[2] : ""});
        }
        rs.data = arr;
      }
      ResultArr.push(rs);
    }
  }
  if(shData && shData.length > 0) {
    for(i in shData) {
      let rs = { "type" : "sh" };
      let shOutput = shData[i].match(shReg);
      if(shOutput && shOutput.length > 0)
        rs.data = shOutput[1];
      ResultArr.push(rs);
    }
  }
  if(qshData && qshData.length > 0) {
    for(i in qshData) {
      let rs = { "type" : "qsh" };
      let qshOutput = qshData[i].match(qshReg);
      if(qshOutput && qshOutput.length > 0)
        rs.data = qshOutput[1];
      ResultArr.push(rs);
    }
  }
  if(pgmData && pgmData.length > 0) {
    for(i in pgmData) {
      let rs = { "type" : "pgm" };
      let sucFlag = pgmData[i].match(successReg);
      if(sucFlag && sucFlag.length > 0)
        rs.success = true;
      else 
        rs.success = false;
      let pgmLib = pgmData[i].match(pgmReg);
      if(pgmLib && pgmLib.length > 2) {
        rs.pgm = pgmLib[1];
        rs.lib = pgmLib[2];
      }
      let paramData = pgmData[i].match(dataRegG);
      if(paramData && paramData.length > 0) {
        let arr = [];
        for(j in paramData) {
          let obj = {}, attr, rx = / \b(.*?)\s*=\s*'([^']*)'/g;
          let eachRow = paramData[j].match(dataReg);
          if(eachRow && eachRow.length > 1)
            obj["value"] = (eachRow[2] ? eachRow[2] : "");
          while (attr = rx.exec(paramData[j])) {
            obj[ attr[1] ] = attr[2];
          }
          arr.push(obj)
        }
        rs.data = arr;
      }
      ResultArr.push(rs);
    }
  }
  if(sqlData && sqlData.length > 0) {
    for(i in sqlData) {
      let rs = { "type" : "sql" };
      let sucFlag = sqlData[i].match(successReg);
      if(sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if(sucFlag.length > 1){
          if(sucFlag[0].includes('![CDATA')){
            let fixed = sucFlag[1].replace(/]]>/, '');
            rs.stmt = fixed;
          } else{
            rs.stmt = sucFlag[1];
          }
        }
      }
      else {
        rs.success = false;
        let errFlag = sqlData[i].match(errorReg);
        if(errFlag && errFlag.length > 1)
          rs.stmt = errFlag[1];
        if(errFlag && errFlag.length > 2)
          rs.error = errFlag[2];
      }
      let sqlResult = sqlData[i].match(sqlResultG);
      if(sqlResult && sqlResult.length > 0) {
        let arr = [];
        for(j in sqlResult) {
          let eachRow = sqlResult[j].match(sqlRowG);
          if(eachRow) {
            let theRow = [];
            for(j in eachRow) {
              let perField = eachRow[j].match(sqlRow);
              if(perField && perField.length > 2)
                theRow.push({"desc" : perField[1], "value" : perField[2]});
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
}

// iConn() constructs and returns  a connection object containing connection properties which can be used by attach().

class iConn {
  constructor(db, user, pwd, option) {
    this.conn = {};
    this.cmds = [];
    this.timeout = 5000; //Default timeout is 5 seconds for sync mode.
    this.I_DEBUG_VERBOSE = false;
    this.conn.I_TRANSPORT_DB2_DATABASE = db;  //Required Field
    this.conn.I_TRANSPORT_DB2_USER = user;    //Required Field
    this.conn.I_TRANSPORT_DB2_PASSWORD = pwd;  //Required Field
    this.conn.I_XML_SERVICE_LIB = "QXMLSERV";  //Default XML Service library
    this.conn.I_TRANSPORT_CTL = "*here";
    this.conn.I_TRANSPORT_IPC = "*NA";
    
    if(__getClass(db) == "Object") {
      this.conn.I_TRANSPORT = I_TRANSPORT_DB2;
      return;
    }
    
    if(option && (__getClass(option) == "Object"))  {
      if(option.host) {
        this.conn.I_TRANSPORT = I_TRANSPORT_REST;
        this.conn.I_TRANSPORT_REST_HOST = option.host;
        if(option.port)
          this.conn.I_TRANSPORT_REST_PORT = option.port;
        else
          this.conn.I_TRANSPORT_REST_PORT = 80;
        if(option.path)
          this.conn.I_TRANSPORT_REST_PATH = option.path;
        else
          this.conn.I_TRANSPORT_REST_PATH = "/";
      } 
      else {
        this.conn.I_TRANSPORT = I_TRANSPORT_DB2;
        if(option.xslib && option.xslib.length > 0)
          this.conn.I_XML_SERVICE_LIB = option.xslib;
      }
      
      if(option.ctl && option.ctl.length > 0)
        this.conn.I_TRANSPORT_CTL = option.ctl;
      if(option.ipc && option.ipc.length > 0)
        this.conn.I_TRANSPORT_IPC = option.ipc;
      if(isNaN(option.buf))
        this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = "500000";
      else
        this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = option.buf.toString();
    } 
    else 
      this.conn.I_TRANSPORT = I_TRANSPORT_DB2;
  }
  // setTimeout() override the default timeout value for sync mode.
  setTimeout(seconds) {
    if(__getClass(seconds) == "Number")
      this.timeout = seconds * 1000;
  }
  // debug() get current verbose mode or enable/disable verbose mode for debugging.
  debug(flag) {
    if(__getClass(flag) == "Boolean")
      this.I_DEBUG_VERBOSE = flag;
    else
      return this.I_DEBUG_VERBOSE;
  }
  // getConnection() returns current attached connection object.
  getConnection() {
    return this.conn;
  }
  // debug() get current verbose mode or enable/disable verbose mode for debugging.
  add(xml) {
    if(__getClass(xml) == "Object")
      this.cmds.push(xml.toXML());
    else
      this.cmds.push(xml);
  }
  // run() sends the commands in XML document via REST or DB2 way. And fetch the response.
  run(callback, sync) {
    // Build the XML document.
    let xml = i_xml.iXmlNodeHead() + i_xml.iXmlNodeScriptOpen();
    for(let i = 0; i < this.cmds.length; i++)
      xml += this.cmds[i];
    xml += i_xml.iXmlNodeScriptClose();
    this.cmds = [];
    // Print the XML document if in debug mode.
    if (this.I_DEBUG_VERBOSE) {
      console.log("============\nINPUT XML\n============");
      console.log(xml);
      console.log("============\nOUTPUT XML\n============");
    }
    // Post the XML document to XML service program.
    if (this.conn.I_TRANSPORT == I_TRANSPORT_REST) {
      const i_call = require('./irest');
      i_call.iRestHttp(callback,
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
    } else if (this.conn.I_TRANSPORT == I_TRANSPORT_DB2) {
        const db = require('./istoredp');
        db.db2Call(callback, 
        this.conn.I_XML_SERVICE_LIB,
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
        callback(i_xml.iXmlNodeHead() + i_xml.iXmlNodeScriptOpen() + i_xml.iXmlNodeError("***Transport error no data***") + i_xml.iXmlNodeScriptClose());
    }
  }
}

// iCmd() return a CL command object
const iCmd = (cmd, options) => {
  let xexec = "cmd",
      xml; // The default
  if (cmd.indexOf("?") > 0)
    xexec = "rexx";  // If need return value 
  if(options)
    xml = i_xml.iXmlNodeCmdOpen(options.exec, options.hex, options.before, options.after, options.error) + cmd + i_xml.iXmlNodeCmdClose();
  else
    xml = i_xml.iXmlNodeCmdOpen(xexec, "", "", "", "", "") + cmd + i_xml.iXmlNodeCmdClose();
  return xml;
}

// iSh() return a PASE shell object
const iSh = (sh, options) => {
  let xml;
  if(options)
    xml = i_xml.iXmlNodeShOpen(options.rows, options.hex, options.before, options.after, options.error) + sh + i_xml.iXmlNodeShClose();
  else
    xml = i_xml.iXmlNodeShOpen("", "", "", "", "") + sh + i_xml.iXmlNodeShClose();
  return xml;
}

// iQsh() return a qsh object
const iQsh = (qsh, options) => {
  let xml;
  if(options)
    xml = i_xml.iXmlNodeQshOpen(options.rows, options.hex, options.before, options.after, options.error) + qsh + i_xml.iXmlNodeQshClose();
  else
    xml = i_xml.iXmlNodeQshOpen("", "", "", "", "") + qsh + i_xml.iXmlNodeQshClose();
  return xml;
}


// iPgm() returns a Program/Service program call object
class iPgm {
  constructor(pgm, options) {
    if(options)
      this.xml = i_xml.iXmlNodePgmOpen(pgm, options.lib, options.func, options.error);
    else
      this.xml = i_xml.iXmlNodePgmOpen(pgm, "", "", "");
  }
  
  addParam(data, type, options, inDs) {
    let opt;
    if(__getClass(type) == "Object")  // DS element has no 'type', so if the second param 'type' is an Object, then it is the options.
      opt = type;
    else
      opt = options;

    if(!inDs) {  // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      this.xml += i_xml.iXmlNodeParmOpen(opt);
    }
    if(__getClass(data) == "Array") {  // If it is a struct parameter, recursivly parse its children.
      if(opt)
        this.xml += i_xml.iXmlNodeDsOpen(opt.dim, opt.dou, opt.len, opt.data);
      else
        this.xml += i_xml.iXmlNodeDsOpen("", "", "", "");
      for(let i = 0; i < data.length; i++) {
        this.addParam(data[i][0], data[i][1], data[i][2], true);
      }
      this.xml += i_xml.iXmlNodeDsClose();
    }
    else { // A simple parameter
      if(opt)
        this.xml += i_xml.iXmlNodeDataOpen(type, opt) + data + i_xml.iXmlNodeDataClose();
      else
        this.xml += i_xml.iXmlNodeDataOpen(type, opt) + data + i_xml.iXmlNodeDataClose();
    }
    if(!inDs) {  // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      this.xml += i_xml.iXmlNodeParmClose();
    }
  }

  addReturn(data, type, options) {
    this.xml += i_xml.iXmlNodeReturnOpen();
    if(options)
      this.xml += i_xml.iXmlNodeDataOpen(type, options);
    else
      this.xml += i_xml.iXmlNodeDataOpen(type);
    this.xml += data + i_xml.iXmlNodeDataClose() + i_xml.iXmlNodeReturnClose();
  }

  toXML() {
    return this.xml + i_xml.iXmlNodePgmClose();
  }
}

// iSql() returns a SQL connection object
class iSql {
  constructor() {
    this.xml = i_xml.iXmlNodeSqlOpen();
  }
  connect(options) {
    if (options && options.options)
      this.xml += i_xml.iXmlNodeSqlConnect(options.db, options.uid, options.pwd, options.options);
    else
      this.xml += i_xml.iXmlNodeSqlConnect(options.db, options.uid, options.pwd, "opt1");
  }

  setOptions(options) {
    this.xml += i_xml.iXmlNodeSqlOptions(options);
  }

  addQuery(stmt, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlQueryOpen(options.error) + stmt + i_xml.iXmlNodeSqlQueryClose();
    else
      this.xml += i_xml.iXmlNodeSqlQueryOpen() + stmt + i_xml.iXmlNodeSqlQueryClose();
  }

  prepare(stmt, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlPrepareOpen(options.error) + stmt + i_xml.iXmlNodeSqlPrepareClose();
    else
      this.xml += i_xml.iXmlNodeSqlPrepareOpen() + stmt + i_xml.iXmlNodeSqlPrepareClose();
  }

  execute(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlExecuteOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlExecuteOpen();
    if(params && params.length)
      for(let i = 0; i < params.length; i++) {
        if(params[i].length > 1)
          this.xml += i_xml.iXmlNodeSqlParmOpen(params[i][1]) + params[i][0] + i_xml.iXmlNodeSqlParmClose();
        else
          this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i][0] + i_xml.iXmlNodeSqlParmClose();
      }
    this.xml += i_xml.iXmlNodeSqlExecuteClose();
  }

  tables(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlTablesOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlTablesOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlTablesClose();
  }

  tablePriv(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlTableprivOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlTableprivOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlTableprivClose();
  }

  columns(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlColumnsOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlColumnsOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlColumnsClose();
  }

  special(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlSpecialOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlSpecialOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlSpecialClose();
  }

  columnPriv(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlColumnprivOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlColumnprivOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlColumnprivClose();
  }

  procedures(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlProceduresOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlProceduresOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlProceduresClose();
  }

  pColumns(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlPcolumnsOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlPcolumnsOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlPcolumnsClose();
  }

  primaryKeys(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlPrimarykeysOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlPrimarykeysOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlPrimarykeysClose();
  }

  foreignKeys(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlForeignkeysOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlForeignkeysOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlForeignkeysClose();
  }

  statistics(params, options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlStatisticsOpen(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlStatisticsOpen();
    for(let i = 0; i < params.length; i++)
      this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
    this.xml += i_xml.iXmlNodeSqlStatisticsClose();
  }

  commit(options) {
    if(options && options.action && options.error)
      this.xml += i_xml.iXmlNodeSqlCommit(options.action, options.error);
    else if(options && options.action)
      this.xml += i_xml.iXmlNodeSqlCommit(options.action, "");
  }

  rowCount(options) {
    if(options && options.error)
      this.xml += i_xml.iXmlNodeSqlRowCount(options.error);
    else
      this.xml += i_xml.iXmlNodeSqlRowCount();
  }

  count(options) {
    this.xml += i_xml.iXmlNodeSqlCount(options.desc, options.error);
  }

  describe(options) {
    this.xml += i_xml.iXmlNodeSqlDescribe(options.desc, options.error);
  }

  fetch(options) {
    if(options)
      this.xml += i_xml.iXmlNodeSqlFetch(options.block, options.desc, options.error);
    else
      this.xml += i_xml.iXmlNodeSqlFetch();
  }

  free() {
    this.xml += i_xml.iXmlNodeSqlFree();
  }

  toXML() {
    return this.xml + i_xml.iXmlNodeSqlClose();
  }
}



exports.iConn = iConn;
exports.iCmd = iCmd;
exports.iSh = iSh;
exports.iQsh = iQsh;
exports.iPgm = iPgm;
exports.iSql = iSql;

exports.xmlToJson = xmlToJson;
exports.getClass = __getClass;
