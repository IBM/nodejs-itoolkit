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

var i_xml = require('./ixml');
// REST or DB2 tranport to XMLSERVICE
var I_TRANSPORT_REST = "REST";
var I_TRANSPORT_DB2 = "DB2";

function __getClass(object) {
  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

function xmlToJson(xml) {
  var cmdRegG = /<cmd.*?>[\s\S]+?<\/cmd>/g;
  var shRegG = /<sh.*?>[\s\S]+?<\/sh>/g;
  var qshRegG = /<qsh.*?>[\s\S]+?<\/qsh>/g;
  var pgmRegG = /<pgm.*?>[\s\S]+?<\/pgm>/g;
  var sqlRegG = /<sql.*?>[\s\S]+?<\/sql>/g;
  
  var shReg = /<sh.*?>([\s\S]+?)<\/sh>/;
  var qshReg = /<qsh.*?>([\s\S]+?)<\/qsh>/;
  var pgmReg = /<pgm name='(.*?)' lib='(.*?)'.*?>/;
  
  var successReg = /<success>.*?\+\+\+ success (.*?)<\/success>/;
  var errorReg = /<error>.*?\*\*\* error (.*?)<\/error>.*?<error>(.*?)<\/error>/;
  var rtDataRegG = /<data desc='.*?'>[\s\S]*?<\/data>/g;
  var rtDataReg = /<data desc='(.*?)'>([\s\S]*?)<\/data>/;
  
  var dsRegG = /<ds.*?>[\s\S]+?<\/ds>/g;
  var dsReg = /<ds.*?>([\s\S]+?)<\/ds>/;
  var dataRegG =  /<data[\s\S]*?<\/data>/g;
  var dataReg =  /<data.*?type='(.*?)'.*?>([\s\S]*?)<\/data>/;
  var sqlResultG = /<row>[\s\S]+?<\/row>/g;
  var sqlRowG = /<data desc='[\s\S]+?'>[\s\S]+?<\/data>/g;
  var sqlRow = /<data desc='([\s\S]+?)'>([\s\S]+?)<\/data>/;
  
  var cmdData = xml.match(cmdRegG);
  var shData = xml.match(shRegG);
  var qshData = xml.match(qshRegG);
  var pgmData = xml.match(pgmRegG);
  var sqlData = xml.match(sqlRegG);
  
  var ResultArr = [];
  if(cmdData && cmdData.length > 0) {
    for(i in cmdData) {
      var rs = { "type" : "cmd" };
      var sucFlag = cmdData[i].match(successReg);
      if(sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if(sucFlag.length > 1)
          rs.cmd = sucFlag[1];
      }
      else {
        rs.success = false;
        var errFlag = cmdData[i].match(errorReg);
        if(errFlag && errFlag.length > 1)
          rs.cmd = errFlag[1];
        if(errFlag && errFlag.length > 2)
          rs.error = errFlag[2];
      }
      var rowArray = cmdData[i].match(rtDataRegG);
      if(rowArray && rowArray.length > 0) {
        var arr = [];
        for(j in rowArray) {
          var eachRow = rowArray[j].match(rtDataReg);
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
      var rs = { "type" : "sh" };
      var shOutput = shData[i].match(shReg);
      if(shOutput && shOutput.length > 0)
        rs.data = shOutput[1];
      ResultArr.push(rs);
    }
  }
  if(qshData && qshData.length > 0) {
    for(i in qshData) {
      var rs = { "type" : "qsh" };
      var qshOutput = qshData[i].match(qshReg);
      if(qshOutput && qshOutput.length > 0)
        rs.data = qshOutput[1];
      ResultArr.push(rs);
    }
  }
  if(pgmData && pgmData.length > 0) {
    for(i in pgmData) {
      var rs = { "type" : "pgm" };
      var sucFlag = pgmData[i].match(successReg);
      if(sucFlag && sucFlag.length > 0)
        rs.success = true;
      else 
        rs.success = false;
      var pgmLib = pgmData[i].match(pgmReg);
      if(pgmLib && pgmLib.length > 2) {
        rs.pgm = pgmLib[1];
        rs.lib = pgmLib[2];
      }
      var paramData = pgmData[i].match(dataRegG);
      if(paramData && paramData.length > 0) {
        var arr = [];
        for(j in paramData) {
          var obj = {}, attr, rx = / \b(.*?)\s*=\s*'([^']*)'/g;
          var eachRow = paramData[j].match(dataReg);
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
      var rs = { "type" : "sql" };
      var sucFlag = sqlData[i].match(successReg);
      if(sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if(sucFlag.length > 1)
          rs.stmt = sucFlag[1];
      }
      else {
        rs.success = false;
        var errFlag = sqlData[i].match(errorReg);
        if(errFlag && errFlag.length > 1)
          rs.stmt = errFlag[1];
        if(errFlag && errFlag.length > 2)
          rs.error = errFlag[2];
      }
      var sqlResult = sqlData[i].match(sqlResultG);
      if(sqlResult && sqlResult.length > 0) {
        var arr = [];
        for(j in sqlResult) {
          var eachRow = sqlResult[j].match(sqlRowG);
          if(eachRow) {
            var theRow = [];
            for(j in eachRow) {
              var perField = eachRow[j].match(sqlRow);
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
function iConn(db, user, pwd, option) {
  this.conn = {};
  this.cmds = [];
  this.timeout = 5000; //Default timeout is 5 seconds for sync mode.
  this.I_DEBUG_VERBOSE = false;
  this.conn.I_TRANSPORT_DB2_DATABASE = db;  //Required Field
  this.conn.I_TRANSPORT_DB2_USER = user;    //Required Field
  this.conn.I_TRANSPORT_DB2_PASSWORD = pwd;  //Required Field
  this.conn.I_XML_SERVICE_LIB = "QXMLSERV";  //Default XML Service library
  
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
    else
      this.conn.I_TRANSPORT_CTL = "*here";
    if(option.ipc && option.ipc.length > 0)
      this.conn.I_TRANSPORT_IPC = option.ipc;
    else
      this.conn.I_TRANSPORT_IPC = "*NA";
    if(isNaN(option.buf))
      this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = "500000";
    else
      this.conn.I_TRANSPORT_REST_XML_OUT_SIZE = option.buf.toString();
  } 
  else 
    this.conn.I_TRANSPORT = I_TRANSPORT_DB2;
}
// setTimeout() override the default timeout value for sync mode.
iConn.prototype.setTimeout = function(seconds) {
  if(__getClass(flag) == "Number")
    this.timeout = seconds * 1000;
}
// debug() get current verbose mode or enable/disable verbose mode for debugging.
iConn.prototype.debug = function(flag) {
  if(__getClass(flag) == "Boolean")
    this.I_DEBUG_VERBOSE = flag;
  else
    return this.I_DEBUG_VERBOSE;
}
// getConnection() returns current attached connection object.
iConn.prototype.getConnection = function() {
  return this.conn;
}
// debug() get current verbose mode or enable/disable verbose mode for debugging.
iConn.prototype.add = function(xml) {
  if(__getClass(xml) == "Object")
    this.cmds.push(xml.toXML());
  else
    this.cmds.push(xml);
}
// run() sends the commands in XML document via REST or DB2 way. And fetch the response.
iConn.prototype.run = function(callback, sync) {
  // Build the XML document.
  var xml = i_xml.iXmlNodeHead() + i_xml.iXmlNodeScriptOpen();
  for(var i = 0; i < this.cmds.length; i++)
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
    var i_call = require('./irest');
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
      var db = require('./istoredp');
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

// iCmd() return a CL command object
function iCmd(cmd, options) {
  var xml;
  var xexec = "cmd"; // The default
  if (cmd.indexOf("?") > 0)
    xexec = "rexx";  // If need return value 
  if(options)
    xml = i_xml.iXmlNodeCmdOpen(options.exec, options.hex, options.before, options.after, options.error) + cmd + i_xml.iXmlNodeCmdClose();
  else
    xml = i_xml.iXmlNodeCmdOpen(xexec, "", "", "", "", "") + cmd + i_xml.iXmlNodeCmdClose();
  return xml;
}

// iSh() return a PASE shell object
function iSh(sh, options) {
  var xml;
  if(options)
    xml = i_xml.iXmlNodeShOpen(options.rows, options.hex, options.before, options.after, options.error) + sh + i_xml.iXmlNodeShClose();
  else
    xml = i_xml.iXmlNodeShOpen("", "", "", "", "") + sh + i_xml.iXmlNodeShClose();
  return xml;
}

// iQsh() return a qsh object
function iQsh(qsh, options) {
  var xml;
  if(options)
    xml = i_xml.iXmlNodeQshOpen(options.rows, options.hex, options.before, options.after, options.error) + qsh + i_xml.iXmlNodeQshClose();
  else
    xml = i_xml.iXmlNodeQshOpen("", "", "", "", "") + qsh + i_xml.iXmlNodeQshClose();
  return xml;
}


// iPgm() returns a Program/Service program call object
function iPgm(pgm, options) {
  if(options)
    this.xml = i_xml.iXmlNodePgmOpen(pgm, options.lib, options.func, options.error);
  else
    this.xml = i_xml.iXmlNodePgmOpen(pgm, "", "", "");
}
iPgm.prototype.addParam = function(data, type, options, inDs) {
  if(__getClass(type) == "Object")  // DS element has no 'type', so if the second param 'type' is an Object, then it is the options.
      opt = type;
    else
      opt = options;
  if(!inDs) {  // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
    if(opt && opt.io)  
      this.xml += i_xml.iXmlNodeParmOpen(opt.io);
    else 
      this.xml += i_xml.iXmlNodeParmOpen();
  }
  if(__getClass(data) == "Array") {  // If it is a struct parameter, recursivly parse its children.
    if(opt)
      this.xml += i_xml.iXmlNodeDsOpen(opt.dim, opt.dou, opt.len, opt.data);
    else
      this.xml += i_xml.iXmlNodeDsOpen("", "", "", "");
    for(var i = 0; i < data.length; i++) {
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
iPgm.prototype.addReturn = function(data, type, options) {
  this.xml += i_xml.iXmlNodeReturnOpen();
  if(options)
    this.xml += i_xml.iXmlNodeDataOpen(type, options);
  else
    this.xml += i_xml.iXmlNodeDataOpen(type);
  this.xml += data + i_xml.iXmlNodeDataClose() + i_xml.iXmlNodeReturnClose();
}
iPgm.prototype.toXML = function() {
  return this.xml + i_xml.iXmlNodePgmClose();
}

// iSql() returns a SQL connection object
function iSql() {
  this.xml = i_xml.iXmlNodeSqlOpen();
}
iSql.prototype.connect = function(options) {
  this.xml += i_xml.iXmlNodeSqlConnect(options.db, options.uid, options.pwd);
}
iSql.prototype.setOptions = function(options) {
  this.xml += i_xml.iXmlNodeSqlOptions(options);
}
iSql.prototype.addQuery = function(stmt, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlQueryOpen(options.error) + stmt + i_xml.iXmlNodeSqlQueryClose();
  else
    this.xml += i_xml.iXmlNodeSqlQueryOpen() + stmt + i_xml.iXmlNodeSqlQueryClose();
}
iSql.prototype.prepare = function(stmt, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlPrepareOpen(options.error) + stmt + i_xml.iXmlNodeSqlPrepareClose();
  else
    this.xml += i_xml.iXmlNodeSqlPrepareOpen() + stmt + i_xml.iXmlNodeSqlPrepareClose();
}
iSql.prototype.execute = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlExecuteOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlExecuteOpen();
  if(params && params.length)
    for(var i = 0; i < params.length; i++) {
      if(params[i].length > 1)
        this.xml += i_xml.iXmlNodeSqlParmOpen(params[i][1]) + params[i][0] + i_xml.iXmlNodeSqlParmClose();
      else
        this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i][0] + i_xml.iXmlNodeSqlParmClose();
    }
  this.xml += i_xml.iXmlNodeSqlExecuteClose();
}
iSql.prototype.tables = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlTablesOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlTablesOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlTablesClose();
}
iSql.prototype.tablePriv = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlTableprivOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlTableprivOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlTableprivClose();
}
iSql.prototype.columns = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlColumnsOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlColumnsOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlColumnsClose();
}
iSql.prototype.special = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlSpecialOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlSpecialOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlSpecialClose();
}
iSql.prototype.columnPriv = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlColumnprivOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlColumnprivOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlColumnprivClose();
}
iSql.prototype.procedures = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlProceduresOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlProceduresOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlProceduresClose();
}
iSql.prototype.pColumns = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlPcolumnsOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlPcolumnsOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlPcolumnsClose();
}
iSql.prototype.primaryKeys = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlPrimarykeysOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlPrimarykeysOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlPrimarykeysClose();
}
iSql.prototype.foreignKeys = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlForeignkeysOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlForeignkeysOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlForeignkeysClose();
}
iSql.prototype.statistics = function(params, options) {
  if(options && options.error)
    this.xml += i_xml.iXmlNodeSqlStatisticsOpen(options.error);
  else
    this.xml += i_xml.iXmlNodeSqlStatisticsOpen();
  for(var i = 0; i < params.length; i++)
    this.xml += i_xml.iXmlNodeSqlParmOpen() + params[i] + i_xml.iXmlNodeSqlParmClose();
  this.xml += i_xml.iXmlNodeSqlStatisticsClose();
}
iSql.prototype.commit = function(options) {
  if(options && options.action && options.error)
    this.xml += i_xml.iXmlNodeSqlCommit(options.action, options.error);
  else if(options && options.action)
    this.xml += i_xml.iXmlNodeSqlCommit(options.action, "");
}
iSql.prototype.rowCount = function(options) {
  this.xml += i_xml.iXmlNodeSqlRowCount(options.action, options.error);
}
iSql.prototype.count = function(options) {
  this.xml += i_xml.iXmlNodeSqlRowCount(options.desc, options.error);
}
iSql.prototype.describe = function(options) {
  this.xml += i_xml.iXmlNodeSqlDescribe(options.desc, options.error);
}
iSql.prototype.fetch = function(options) {
  if(options)
    this.xml += i_xml.iXmlNodeSqlFetch(options.block, options.desc, options.error);
  else
    this.xml += i_xml.iXmlNodeSqlFetch();
}
iSql.prototype.free = function() {
  this.xml += i_xml.iXmlNodeSqlFree();
}
iSql.prototype.toXML = function() {
  return this.xml + i_xml.iXmlNodeSqlClose();
}

exports.iConn = iConn;
exports.iCmd = iCmd;
exports.iSh = iSh;
exports.iQsh = iQsh;
exports.iPgm = iPgm;
exports.iSql = iSql;

exports.xmlToJson = xmlToJson;
exports.getClass = __getClass;
