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

var I_XML_NODE_HEAD = "<?xml version='1.0'?>";
var I_XML_NODE_SCRIPT_OPEN = "<myscript>";
var I_XML_NODE_SCRIPT_CLOSE = "</myscript>";
var I_XML_NODE_PGM_OPEN = "<pgm>";
var I_XML_NODE_PGM_CLOSE = "</pgm>";
var I_XML_NODE_PARM_OPEN = "<parm>";
var I_XML_NODE_PARM_CLOSE = "</parm>";
var I_XML_NODE_RETURN_OPEN = "<return>";
var I_XML_NODE_RETURN_CLOSE = "</return>";
var I_XML_NODE_OVERLAY_OPEN = "<overlay>";
var I_XML_NODE_OVERLAY_CLOSE = "</overlay>";
var I_XML_NODE_DS_OPEN = "<ds>";
var I_XML_NODE_DS_CLOSE = "</ds>";
var I_XML_NODE_DATA_OPEN = "<data>";
var I_XML_NODE_DATA_CLOSE = "</data>";
var I_XML_NODE_CMD_OPEN = "<cmd>";
var I_XML_NODE_CMD_CLOSE = "</cmd>";
var I_XML_NODE_SH_OPEN = "<sh>";
var I_XML_NODE_SH_CLOSE = "</sh>";
var I_XML_NODE_QSH_OPEN = "<qsh>";
var I_XML_NODE_QSH_CLOSE = "</qsh>";
var I_XML_NODE_CLOSE = ">";
var I_XML_NODE_ERROR_OPEN = "<error>";
var I_XML_NODE_ERROR_CLOSE = "</error>";

var I_XML_NODE_SQL_OPEN = "<sql>";
var I_XML_NODE_SQL_CLOSE = "</sql>";
var I_XML_NODE_SQL_CONNECT_OPEN = "<connect>";
var I_XML_NODE_SQL_CONNECT_CLOSE = "</connect>";
var I_XML_NODE_SQL_OPTIONS_OPEN = "<options>";
var I_XML_NODE_SQL_OPTIONS_CLOSE = "</options>";
var I_XML_NODE_SQL_QUERY_OPEN = "<query>";
var I_XML_NODE_SQL_QUERY_CLOSE = "</query>";
var I_XML_NODE_SQL_PREPARE_OPEN = "<prepare>";
var I_XML_NODE_SQL_PREPARE_CLOSE = "</prepare>";
var I_XML_NODE_SQL_EXECUTE_OPEN = "<execute>";
var I_XML_NODE_SQL_EXECUTE_CLOSE = "</execute>";
var I_XML_NODE_SQL_FETCH_OPEN = "<fetch>";
var I_XML_NODE_SQL_FETCH_CLOSE = "</fetch>";
var I_XML_NODE_SQL_COMMIT_OPEN = "<commit>";
var I_XML_NODE_SQL_COMMIT_CLOSE = "</commit>";
var I_XML_NODE_SQL_ROWCOUNT_OPEN = "<rowcount>";
var I_XML_NODE_SQL_ROWCOUNT_CLOSE = "</rowcount>";
var I_XML_NODE_SQL_COUNT_OPEN = "<count>";
var I_XML_NODE_SQL_COUNT_CLOSE = "</count>";
var I_XML_NODE_SQL_DESCRIBE_OPEN = "<describe>";
var I_XML_NODE_SQL_DESCRIBE_CLOSE = "</describe>";
var I_XML_NODE_SQL_IDENTITY_OPEN = "<identity>";
var I_XML_NODE_SQL_IDENTITY_CLOSE = "</identity>";
var I_XML_NODE_SQL_TABLES_OPEN = "<tables>";
var I_XML_NODE_SQL_TABLES_CLOSE = "</tables>";
var I_XML_NODE_SQL_TABLEPRIV_OPEN = "<tablepriv>";
var I_XML_NODE_SQL_TABLEPRIV_CLOSE = "</tablepriv>";
var I_XML_NODE_SQL_COLUMNS_OPEN = "<columns>";
var I_XML_NODE_SQL_COLUMNS_CLOSE = "</columns>";
var I_XML_NODE_SQL_SPECIAL_OPEN = "<special>";
var I_XML_NODE_SQL_SPECIAL_CLOSE = "</special>";
var I_XML_NODE_SQL_COLUMNPRIV_OPEN = "<columnpriv>";
var I_XML_NODE_SQL_COLUMNPRIV_CLOSE = "</columnpriv>";
var I_XML_NODE_SQL_PROCEDURES_OPEN = "<procedures>";
var I_XML_NODE_SQL_PROCEDURES_CLOSE = "</procedures>";
var I_XML_NODE_SQL_PCOLUMNS_OPEN = "<pcolumns>";
var I_XML_NODE_SQL_PCOLUMNS_CLOSE = "</pcolumns>";
var I_XML_NODE_SQL_PRIMARYKEYS_OPEN = "<primarykeys>";
var I_XML_NODE_SQL_PRIMARYKEYS_CLOSE = "</primarykeys>";
var I_XML_NODE_SQL_FOREIGNKEYS_OPEN = "<foreignkeys>"; 
var I_XML_NODE_SQL_FOREIGNKEYS_CLOSE = "</foreignkeys>";
var I_XML_NODE_SQL_STATISTICS_OPEN = "<statistics>";
var I_XML_NODE_SQL_STATISTICS_CLOSE = "</statistics>"
var I_XML_NODE_SQL_FREE_OPEN = "<free>";
var I_XML_NODE_SQL_FREE_CLOSE = "</free>";

var I_XML_ATTR_SQL_KEY_IO = "io";
var I_XML_ATTR_SQL_VALUE_IO = "both";
var I_XML_ATTR_SQL_KEY_BLOCK = "block";
var I_XML_ATTR_SQL_VALUE_BLOCK = "all";
var I_XML_ATTR_SQL_KEY_ACTION = "action";
var I_XML_ATTR_SQL_VALUE_ACTION = "rollback";
var I_XML_ATTR_SQL_KEY_DESC = "desc";
var I_XML_ATTR_SQL_VALUE_DESC = "on";

var I_XML_ATTR_KEY_OPTIONS = "options";


var I_XML_ATTR_VALUE_OPTIONAL = "";
var I_XML_ATTR_KEY_NAME = "name";
var I_XML_ATTR_VALUE_UNDEFINED = "undefined";
var I_XML_ATTR_KEY_LIB = "lib";
var I_XML_ATTR_KEY_FUNC = "func";
var I_XML_ATTR_KEY_ERROR = "error";
var I_XML_ATTR_VALUE_ERROR = "fast";
var I_XML_ATTR_KEY_DB = "db";
var I_XML_ATTR_KEY_USERID = "uid";
var I_XML_ATTR_KEY_PASSWORD = "pwd";
var I_XML_ATTR_KEY_IO = "io";
var I_XML_ATTR_VALUE_IO = "both";
var I_XML_ATTR_KEY_OFFSET = "offset";
var I_XML_ATTR_KEY_TOP = "top";
var I_XML_ATTR_KEY_DIM = "dim";
var I_XML_ATTR_VALUE_DIM = "1";
var I_XML_ATTR_KEY_DOU = "dou";
var I_XML_ATTR_KEY_LEN = "len";
var I_XML_ATTR_KEY_DATA = "data";
var I_XML_ATTR_KEY_VARYING = "varying";
var I_XML_ATTR_KEY_ENDDO = "enddo";
var I_XML_ATTR_KEY_SETLEN = "setlen";
var I_XML_ATTR_KEY_HEX = "hex";
var I_XML_ATTR_KEY_BEFORE = "before";
var I_XML_ATTR_KEY_AFTER = "after";
var I_XML_ATTR_KEY_TRIM = "trim";
var I_XML_ATTR_KEY_EXEC = "exec";
var I_XML_ATTR_VALUE_EXEC = "system";
var I_XML_ATTR_KEY_ROWS = "rows";
var I_XML_ATTR_KEY_TYPE = "type";
var I_XML_ATTR_VALUE_TYPE = "1024a";

var iXmlNodeOpen = function(x) {
  return x.slice(0, -1);
}
var iXmlAttrDefault = function(z,x,y) {
  if (typeof x === 'undefined' || x == '') {
    if (y == I_XML_ATTR_VALUE_OPTIONAL) {
      return y;
    } else {
      return " " + z + "='" + y + "'";
    }
  }
  return " " + z + "='" + x + "'";
}

var iXmlNodeError = function(msg) {
  return I_XML_NODE_ERROR_OPEN
          + msg
          + I_XML_NODE_ERROR_CLOSE;
}

var iXmlNodeHead = function() {
  return I_XML_NODE_HEAD;
}
var iXmlNodeScriptOpen = function() {
  return I_XML_NODE_SCRIPT_OPEN;
}
var iXmlNodeScriptClose = function() {
  return I_XML_NODE_SCRIPT_CLOSE;
}
var iXmlNodePgmOpen = function(xname,xlib,xfunc,xerror) {
  return iXmlNodeOpen(I_XML_NODE_PGM_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_NAME,xname,I_XML_ATTR_VALUE_UNDEFINED)
          + iXmlAttrDefault(I_XML_ATTR_KEY_LIB,xlib,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_FUNC,xfunc,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
}
var iXmlNodePgmClose = function() {
  return I_XML_NODE_PGM_CLOSE;
}
var iXmlNodeParmOpen = function(xio) {
  return iXmlNodeOpen(I_XML_NODE_PARM_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_IO,xio,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeParmClose = function() {
  return I_XML_NODE_PARM_CLOSE;
}
var iXmlNodeReturnOpen = function() {
  return I_XML_NODE_RETURN_OPEN;
}
var iXmlNodeReturnClose = function() {
  return I_XML_NODE_RETURN_CLOSE;
}
var iXmlNodeOverlayOpen = function(xio, xoffset, xtop) {
  return iXmlNodeOpen(I_XML_NODE_OVERLAY_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_NAME,xio,I_XML_ATTR_VALUE_IO)
          + iXmlAttrDefault(I_XML_ATTR_KEY_OFFSET,xoffset,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_TOP,xtop,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeOverlayClose = function() {
  return I_XML_NODE_OVERLAY_CLOSE;
}
var iXmlNodeDsOpen = function(xdim, xdou, xlen, xdata) {
  return iXmlNodeOpen(I_XML_NODE_DS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_DIM,xdim,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_DOU,xdou,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_LEN,xlen,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_DATA,xdata,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeDsClose = function() {
  return I_XML_NODE_DS_CLOSE;
}
var iXmlNodeDataOpen = function(xtype, options) {
  var result = iXmlNodeOpen(I_XML_NODE_DATA_OPEN) + iXmlAttrDefault(I_XML_ATTR_KEY_TYPE,xtype,I_XML_ATTR_VALUE_TYPE);
  for (var o in options) {
    result += iXmlAttrDefault(o, options[o], I_XML_ATTR_VALUE_TYPE);
  }
  return result += I_XML_NODE_CLOSE;
}
var iXmlNodeDataClose = function() {
  return I_XML_NODE_DATA_CLOSE;
}
var iXmlNodeCmdOpen = function(xexec, xhex, xbefore, xafter, xerror) {
  return iXmlNodeOpen(I_XML_NODE_CMD_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_EXEC,xexec,I_XML_ATTR_VALUE_EXEC)
          + iXmlAttrDefault(I_XML_ATTR_KEY_HEX,xhex,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_BEFORE,xbefore,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_AFTER,xafter,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeCmdClose = function() {
  return I_XML_NODE_CMD_CLOSE;
}
var iXmlNodeShOpen = function(xrows, xhex, xbefore, xafter, xerror) {
  return iXmlNodeOpen(I_XML_NODE_SH_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ROWS,xrows,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_HEX,xhex,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_BEFORE,xbefore,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_AFTER,xafter,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeShClose = function() {
  return I_XML_NODE_SH_CLOSE;
}
var iXmlNodeQshOpen = function(xrows, xhex, xbefore, xafter, xerror) {
  return iXmlNodeOpen(I_XML_NODE_QSH_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ROWS,xrows,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_HEX,xhex,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_BEFORE,xbefore,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_AFTER,xafter,I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeQshClose = function() {
  return I_XML_NODE_QSH_CLOSE;
}

var iXmlNodeSqlOpen = function() {
  return I_XML_NODE_SQL_OPEN;
}
var iXmlNodeSqlClose = function() {
  return I_XML_NODE_SQL_CLOSE;
}
var iXmlNodeSqlConnect = function(db, uid, pwd, option_label) {
 return iXmlNodeOpen(I_XML_NODE_SQL_CONNECT_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_DB,db,I_XML_ATTR_VALUE_OPTIONAL)
		  + iXmlAttrDefault(I_XML_ATTR_KEY_USERID,uid,I_XML_ATTR_VALUE_OPTIONAL)
		  + iXmlAttrDefault(I_XML_ATTR_KEY_PASSWORD,pwd,I_XML_ATTR_VALUE_OPTIONAL)
		  + iXmlAttrDefault(I_XML_ATTR_KEY_OPTIONS,option_label,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE 
		  + I_XML_NODE_SQL_CONNECT_CLOSE;
}
var iXmlNodeSqlOptions = function(options) {
  var iXml = iXmlNodeOpen(I_XML_NODE_SQL_OPTIONS_OPEN);
  for(var i in options)
	 iXml += iXmlAttrDefault(options[i].desc, options[i].value, I_XML_ATTR_VALUE_OPTIONAL);
  return iXml + I_XML_NODE_CLOSE + I_XML_NODE_SQL_OPTIONS_CLOSE;
}
var iXmlNodeSqlQueryOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_QUERY_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlQueryClose = function() {
  return I_XML_NODE_SQL_QUERY_CLOSE;
}
var iXmlNodeSqlPrepareOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_PREPARE_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlPrepareClose = function() {
  return I_XML_NODE_SQL_PREPARE_CLOSE;
}
var iXmlNodeSqlExecute = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_EXECUTE_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_SQL_EXECUTE_CLOSE;
}
var iXmlNodeSqlExecuteOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_EXECUTE_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlExecuteClose = function() {
  return I_XML_NODE_SQL_EXECUTE_CLOSE;
}
var iXmlNodeSqlParmOpen = function(xio) {
  return iXmlNodeOpen(I_XML_NODE_PARM_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_NAME,xio,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlParmClose = function() {
  return I_XML_NODE_PARM_CLOSE;
}
var iXmlNodeSqlFetch = function(xblock,xdesc,xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_FETCH_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_BLOCK,xblock,I_XML_ATTR_SQL_VALUE_BLOCK)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_DESC,xdesc,I_XML_ATTR_SQL_VALUE_DESC)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
		  + I_XML_NODE_CLOSE
          + I_XML_NODE_SQL_FETCH_CLOSE;
}
var iXmlNodeSqlCommit = function(xaction,xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_COMMIT_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_ACTION,xaction,I_XML_ATTR_SQL_VALUE_ACTION)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_COMMIT_CLOSE;
}
var iXmlNodeSqlRowCount = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_ROWCOUNT_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_ROWCOUNT_CLOSE;
}
var iXmlNodeSqlCount = function(xdesc, xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_COUNT_OPEN)
	      + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_DESC,xdesc,I_XML_ATTR_SQL_VALUE_IO)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_COUNT_CLOSE;
}
var iXmlNodeSqlDescribe = function(xdesc, xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_DESCRIBE_OPEN)
	      + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_DESC,xdesc,I_XML_ATTR_SQL_VALUE_IO)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_DESCRIBE_CLOSE;
}
var iXmlNodeSqlIdentity = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_IDENTITY_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_IDENTITY_CLOSE;
}
var iXmlNodeSqlTablesOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_TABLES_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlTablesClose = function() {
  return I_XML_NODE_SQL_TABLES_CLOSE;
}
var iXmlNodeSqlTableprivOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_TABLEPRIV_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlTableprivClose = function() {
  return I_XML_NODE_SQL_TABLEPRIV_CLOSE;
}
var iXmlNodeSqlColumnsOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_COLUMNS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlColumnsClose = function() {
  return I_XML_NODE_SQL_COLUMNS_CLOSE;
}
var iXmlNodeSqlSpecialOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_SPECIAL_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlSpecialClose = function() {
  return I_XML_NODE_SQL_SPECIAL_CLOSE;
}
var iXmlNodeSqlColumnprivOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_COLUMNPRIV_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlColumnprivClose = function() {
  return I_XML_NODE_SQL_COLUMNPRIV_CLOSE;
}
var iXmlNodeSqlProceduresOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_PROCEDURES_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlProceduresClose = function() {
  return I_XML_NODE_SQL_PROCEDURES_CLOSE;
}
var iXmlNodeSqlPcolumnsOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_PCOLUMNS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlPcolumnsClose = function() {
  return I_XML_NODE_SQL_PCOLUMNS_CLOSE;
}
var iXmlNodeSqlPrimarykeysOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_PRIMARYKEYS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlPrimarykeysClose = function() {
  return I_XML_NODE_SQL_PRIMARYKEYS_CLOSE;
}
var iXmlNodeSqlForeignkeysOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_FOREIGNKEYS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlForeignkeysClose = function() {
  return I_XML_NODE_SQL_FOREIGNKEYS_CLOSE;
}
var iXmlNodeSqlStatisticsOpen = function(xerror) {
  return iXmlNodeOpen(I_XML_NODE_SQL_STATISTICS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR,xerror,I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;
}
var iXmlNodeSqlStatisticsClose = function() {
  return I_XML_NODE_SQL_STATISTICS_CLOSE;
}
var iXmlNodeSqlFree = function() {
  return I_XML_NODE_SQL_FREE_OPEN
          + I_XML_NODE_SQL_FREE_CLOSE;
}


exports.iXmlNodeError = iXmlNodeError;
exports.iXmlNodeHead = iXmlNodeHead;
exports.iXmlNodeScriptOpen = iXmlNodeScriptOpen;
exports.iXmlNodeScriptClose = iXmlNodeScriptClose;
exports.iXmlNodePgmOpen = iXmlNodePgmOpen;
exports.iXmlNodePgmClose = iXmlNodePgmClose;
exports.iXmlNodeParmOpen = iXmlNodeParmOpen;
exports.iXmlNodeParmClose = iXmlNodeParmClose;
exports.iXmlNodeReturnOpen = iXmlNodeReturnOpen;
exports.iXmlNodeReturnClose = iXmlNodeReturnClose;
exports.iXmlNodeOverlayOpen = iXmlNodeOverlayOpen;
exports.iXmlNodeOverlayClose = iXmlNodeOverlayClose;
exports.iXmlNodeDsOpen = iXmlNodeDsOpen;
exports.iXmlNodeDsClose = iXmlNodeDsClose;
exports.iXmlNodeDataOpen = iXmlNodeDataOpen;
exports.iXmlNodeDataClose = iXmlNodeDataClose;
exports.iXmlNodeCmdOpen = iXmlNodeCmdOpen;
exports.iXmlNodeCmdClose = iXmlNodeCmdClose;
exports.iXmlNodeShOpen = iXmlNodeShOpen;
exports.iXmlNodeShClose = iXmlNodeShClose;
exports.iXmlNodeQshOpen = iXmlNodeQshOpen;
exports.iXmlNodeQshClose = iXmlNodeQshClose;

exports.iXmlNodeSqlOpen = iXmlNodeSqlOpen;
exports.iXmlNodeSqlClose = iXmlNodeSqlClose;
exports.iXmlNodeSqlConnect = iXmlNodeSqlConnect;
exports.iXmlNodeSqlOptions = iXmlNodeSqlOptions;
exports.iXmlNodeSqlQueryOpen = iXmlNodeSqlQueryOpen;
exports.iXmlNodeSqlQueryClose = iXmlNodeSqlQueryClose;
exports.iXmlNodeSqlPrepareOpen = iXmlNodeSqlPrepareOpen;
exports.iXmlNodeSqlPrepareClose = iXmlNodeSqlPrepareClose;
exports.iXmlNodeSqlExecuteOpen = iXmlNodeSqlExecuteOpen;
exports.iXmlNodeSqlExecuteClose = iXmlNodeSqlExecuteClose;
exports.iXmlNodeSqlParmOpen = iXmlNodeSqlParmOpen;
exports.iXmlNodeSqlParmClose = iXmlNodeSqlParmClose;
exports.iXmlNodeSqlFetch = iXmlNodeSqlFetch;
exports.iXmlNodeSqlCommit = iXmlNodeSqlCommit;
exports.iXmlNodeSqlRowCount = iXmlNodeSqlRowCount;
exports.iXmlNodeSqlCount = iXmlNodeSqlCount;
exports.iXmlNodeSqlDescribe = iXmlNodeSqlDescribe;
exports.iXmlNodeSqlTablesOpen = iXmlNodeSqlTablesOpen;
exports.iXmlNodeSqlTablesClose = iXmlNodeSqlTablesClose;
exports.iXmlNodeSqlTableprivOpen = iXmlNodeSqlTableprivOpen;
exports.iXmlNodeSqlTableprivClose = iXmlNodeSqlTableprivClose;
exports.iXmlNodeSqlColumnsOpen = iXmlNodeSqlColumnsOpen;
exports.iXmlNodeSqlColumnsClose = iXmlNodeSqlColumnsClose;
exports.iXmlNodeSqlSpecialOpen = iXmlNodeSqlSpecialOpen;
exports.iXmlNodeSqlSpecialClose = iXmlNodeSqlSpecialClose;
exports.iXmlNodeSqlColumnprivOpen = iXmlNodeSqlColumnprivOpen;
exports.iXmlNodeSqlColumnprivClose = iXmlNodeSqlColumnprivClose;
exports.iXmlNodeSqlProceduresOpen = iXmlNodeSqlProceduresOpen;
exports.iXmlNodeSqlProceduresClose = iXmlNodeSqlProceduresClose;
exports.iXmlNodeSqlPcolumnsOpen = iXmlNodeSqlPcolumnsOpen;
exports.iXmlNodeSqlPcolumnsClose = iXmlNodeSqlPcolumnsClose;
exports.iXmlNodeSqlPrimarykeysOpen = iXmlNodeSqlPrimarykeysOpen;
exports.iXmlNodeSqlPrimarykeysClose = iXmlNodeSqlPrimarykeysClose;
exports.iXmlNodeSqlForeignkeysOpen = iXmlNodeSqlForeignkeysOpen;
exports.iXmlNodeSqlForeignkeysClose = iXmlNodeSqlForeignkeysClose;
exports.iXmlNodeSqlStatisticsOpen = iXmlNodeSqlStatisticsOpen;
exports.iXmlNodeSqlStatisticsClose = iXmlNodeSqlStatisticsClose;
exports.iXmlNodeSqlFree = iXmlNodeSqlFree;
