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

const I_XML_NODE_HEAD = "<?xml version='1.0'?>";
const I_XML_NODE_SCRIPT_OPEN = '<myscript>';
const I_XML_NODE_SCRIPT_CLOSE = '</myscript>';
const I_XML_NODE_PGM_OPEN = '<pgm>';
const I_XML_NODE_PGM_CLOSE = '</pgm>';
const I_XML_NODE_PARM_OPEN = '<parm>';
const I_XML_NODE_PARM_CLOSE = '</parm>';
const I_XML_NODE_RETURN_OPEN = '<return>';
const I_XML_NODE_RETURN_CLOSE = '</return>';
const I_XML_NODE_OVERLAY_OPEN = '<overlay>';
const I_XML_NODE_OVERLAY_CLOSE = '</overlay>';
const I_XML_NODE_DS_OPEN = '<ds>';
const I_XML_NODE_DS_CLOSE = '</ds>';
const I_XML_NODE_DATA_OPEN = '<data>';
const I_XML_NODE_DATA_CLOSE = '</data>';
const I_XML_NODE_CMD_OPEN = '<cmd>';
const I_XML_NODE_CMD_CLOSE = '</cmd>';
const I_XML_NODE_SH_OPEN = '<sh>';
const I_XML_NODE_SH_CLOSE = '</sh>';
const I_XML_NODE_QSH_OPEN = '<qsh>';
const I_XML_NODE_QSH_CLOSE = '</qsh>';
const I_XML_NODE_CLOSE = '>';
const I_XML_NODE_ERROR_OPEN = '<error>';
const I_XML_NODE_ERROR_CLOSE = '</error>';

const I_XML_NODE_SQL_OPEN = '<sql>';
const I_XML_NODE_SQL_CLOSE = '</sql>';
const I_XML_NODE_SQL_CONNECT_OPEN = '<connect>';
const I_XML_NODE_SQL_CONNECT_CLOSE = '</connect>';
const I_XML_NODE_SQL_OPTIONS_OPEN = '<options>';
const I_XML_NODE_SQL_OPTIONS_CLOSE = '</options>';
const I_XML_NODE_SQL_QUERY_OPEN = '<query>';
const I_XML_NODE_SQL_QUERY_CLOSE = '</query>';
const I_XML_NODE_SQL_PREPARE_OPEN = '<prepare>';
const I_XML_NODE_SQL_PREPARE_CLOSE = '</prepare>';
const I_XML_NODE_SQL_EXECUTE_OPEN = '<execute>';
const I_XML_NODE_SQL_EXECUTE_CLOSE = '</execute>';
const I_XML_NODE_SQL_FETCH_OPEN = '<fetch>';
const I_XML_NODE_SQL_FETCH_CLOSE = '</fetch>';
const I_XML_NODE_SQL_COMMIT_OPEN = '<commit>';
const I_XML_NODE_SQL_COMMIT_CLOSE = '</commit>';
const I_XML_NODE_SQL_ROWCOUNT_OPEN = '<rowcount>';
const I_XML_NODE_SQL_ROWCOUNT_CLOSE = '</rowcount>';
const I_XML_NODE_SQL_COUNT_OPEN = '<count>';
const I_XML_NODE_SQL_COUNT_CLOSE = '</count>';
const I_XML_NODE_SQL_DESCRIBE_OPEN = '<describe>';
const I_XML_NODE_SQL_DESCRIBE_CLOSE = '</describe>';
// const I_XML_NODE_SQL_IDENTITY_OPEN = '<identity>';
// const I_XML_NODE_SQL_IDENTITY_CLOSE = '</identity>';
const I_XML_NODE_SQL_TABLES_OPEN = '<tables>';
const I_XML_NODE_SQL_TABLES_CLOSE = '</tables>';
const I_XML_NODE_SQL_TABLEPRIV_OPEN = '<tablepriv>';
const I_XML_NODE_SQL_TABLEPRIV_CLOSE = '</tablepriv>';
const I_XML_NODE_SQL_COLUMNS_OPEN = '<columns>';
const I_XML_NODE_SQL_COLUMNS_CLOSE = '</columns>';
const I_XML_NODE_SQL_SPECIAL_OPEN = '<special>';
const I_XML_NODE_SQL_SPECIAL_CLOSE = '</special>';
const I_XML_NODE_SQL_COLUMNPRIV_OPEN = '<columnpriv>';
const I_XML_NODE_SQL_COLUMNPRIV_CLOSE = '</columnpriv>';
const I_XML_NODE_SQL_PROCEDURES_OPEN = '<procedures>';
const I_XML_NODE_SQL_PROCEDURES_CLOSE = '</procedures>';
const I_XML_NODE_SQL_PCOLUMNS_OPEN = '<pcolumns>';
const I_XML_NODE_SQL_PCOLUMNS_CLOSE = '</pcolumns>';
const I_XML_NODE_SQL_PRIMARYKEYS_OPEN = '<primarykeys>';
const I_XML_NODE_SQL_PRIMARYKEYS_CLOSE = '</primarykeys>';
const I_XML_NODE_SQL_FOREIGNKEYS_OPEN = '<foreignkeys>';
const I_XML_NODE_SQL_FOREIGNKEYS_CLOSE = '</foreignkeys>';
const I_XML_NODE_SQL_STATISTICS_OPEN = '<statistics>';
const I_XML_NODE_SQL_STATISTICS_CLOSE = '</statistics>';
const I_XML_NODE_SQL_FREE_OPEN = '<free>';
const I_XML_NODE_SQL_FREE_CLOSE = '</free>';

// const I_XML_ATTR_SQL_KEY_IO = 'io'; // TODO: Never used
const I_XML_ATTR_SQL_VALUE_IO = 'both';
const I_XML_ATTR_SQL_KEY_BLOCK = 'block';
const I_XML_ATTR_SQL_VALUE_BLOCK = 'all';
const I_XML_ATTR_SQL_KEY_ACTION = 'action';
const I_XML_ATTR_SQL_VALUE_ACTION = 'rollback';
const I_XML_ATTR_SQL_KEY_DESC = 'desc';
const I_XML_ATTR_SQL_VALUE_DESC = 'on';

const I_XML_ATTR_KEY_OPTIONS = 'options';

const I_XML_ATTR_VALUE_OPTIONAL = '';
const I_XML_ATTR_KEY_NAME = 'name';
const I_XML_ATTR_VALUE_UNDEFINED = 'undefined';
const I_XML_ATTR_KEY_LIB = 'lib';
const I_XML_ATTR_KEY_FUNC = 'func';
const I_XML_ATTR_KEY_ERROR = 'error';
const I_XML_ATTR_VALUE_ERROR = 'fast';
const I_XML_ATTR_KEY_DB = 'db';
const I_XML_ATTR_KEY_USERID = 'uid';
const I_XML_ATTR_KEY_PASSWORD = 'pwd';
const I_XML_ATTR_KEY_IO = 'io';
const I_XML_ATTR_KEY_BY = "by";
const I_XML_ATTR_VALUE_IO = 'both';
const I_XML_ATTR_KEY_OFFSET = 'offset';
const I_XML_ATTR_KEY_TOP = 'top';
const I_XML_ATTR_KEY_DIM = 'dim';
// const I_XML_ATTR_VALUE_DIM = '1'; // TODO: Never used
const I_XML_ATTR_KEY_DOU = 'dou';
const I_XML_ATTR_KEY_LEN = 'len';
const I_XML_ATTR_KEY_DATA = 'data';
// const I_XML_ATTR_KEY_VARYING = 'constying'; // TODO: Never used
// const I_XML_ATTR_KEY_ENDDO = 'enddo'; // TODO: Never used
// const I_XML_ATTR_KEY_SETLEN = 'setlen'; // TODO: Never used
const I_XML_ATTR_KEY_HEX = 'hex';
const I_XML_ATTR_KEY_BEFORE = 'before';
const I_XML_ATTR_KEY_AFTER = 'after';
// const I_XML_ATTR_KEY_TRIM = 'trim'; // TODO: Never used
const I_XML_ATTR_KEY_EXEC = 'exec';
const I_XML_ATTR_VALUE_EXEC = 'system';
const I_XML_ATTR_KEY_ROWS = 'rows';
const I_XML_ATTR_KEY_TYPE = 'type';
const I_XML_ATTR_VALUE_TYPE = '1024a';

const iXmlNodeOpen = x => x.slice(0, -1);

const iXmlAttrDefault = (z, x, y) => {
  if (typeof x === 'undefined' || x === '') {
    if (y === I_XML_ATTR_VALUE_OPTIONAL) {
      return y;
    }
    return ` ${z}='${y}'`;
  }
  return ` ${z}='${x}'`;
};

const iXmlNodeError = msg => I_XML_NODE_ERROR_OPEN
          + msg
          + I_XML_NODE_ERROR_CLOSE;

const iXmlNodeHead = () => I_XML_NODE_HEAD;

const iXmlNodeScriptOpen = () => I_XML_NODE_SCRIPT_OPEN;

const iXmlNodeScriptClose = () => I_XML_NODE_SCRIPT_CLOSE;

const iXmlNodePgmOpen = (xname, xlib, xfunc, xerror) => iXmlNodeOpen(I_XML_NODE_PGM_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_NAME, xname, I_XML_ATTR_VALUE_UNDEFINED)
          + iXmlAttrDefault(I_XML_ATTR_KEY_LIB, xlib, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_FUNC, xfunc, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;
const iXmlNodePgmClose = () => I_XML_NODE_PGM_CLOSE;

const iXmlNodeParmOpen = (opt) => {
  if (!(opt && typeof opt==='object')){
    return iXmlNodeOpen(I_XML_NODE_PARM_OPEN)
    + I_XML_NODE_CLOSE;
  }

  let opt_io = (opt.io) ? iXmlAttrDefault(I_XML_ATTR_KEY_IO,opt.io,I_XML_ATTR_VALUE_OPTIONAL) : '';
  let opt_by = (opt.by) ? iXmlAttrDefault(I_XML_ATTR_KEY_BY,opt.by,I_XML_ATTR_VALUE_OPTIONAL) : '';

  delete opt.by;
  delete opt.io;

  return iXmlNodeOpen(I_XML_NODE_PARM_OPEN)
        + opt_io
        + opt_by
        + I_XML_NODE_CLOSE;
}

const iXmlNodeParmClose = () => I_XML_NODE_PARM_CLOSE;

const iXmlNodeReturnOpen = () => I_XML_NODE_RETURN_OPEN;

const iXmlNodeReturnClose = () => I_XML_NODE_RETURN_CLOSE;

const iXmlNodeOverlayOpen = (xio, xoffset, xtop) => iXmlNodeOpen(I_XML_NODE_OVERLAY_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_NAME, xio, I_XML_ATTR_VALUE_IO)
          + iXmlAttrDefault(I_XML_ATTR_KEY_OFFSET, xoffset, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_TOP, xtop, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeOverlayClose = () => I_XML_NODE_OVERLAY_CLOSE;

const iXmlNodeDsOpen = (xdim, xdou, xlen, xdata) => iXmlNodeOpen(I_XML_NODE_DS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_DIM, xdim, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_DOU, xdou, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_LEN, xlen, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_DATA, xdata, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeDsClose = () => I_XML_NODE_DS_CLOSE;

const iXmlNodeDataOpen = (xtype, options) => {
  let result = iXmlNodeOpen(I_XML_NODE_DATA_OPEN)
  + iXmlAttrDefault(I_XML_ATTR_KEY_TYPE, xtype, I_XML_ATTR_VALUE_TYPE);

  if (options && typeof options === 'object') {
    Object.keys(options).forEach((key) => {
      result += iXmlAttrDefault(key, options[key], I_XML_ATTR_VALUE_TYPE);
    });
  }

  result += I_XML_NODE_CLOSE;
  return result;
};

const iXmlNodeDataClose = () => I_XML_NODE_DATA_CLOSE;

const iXmlNodeCmdOpen = (xexec, xhex, xbefore, xafter, xerror) => iXmlNodeOpen(I_XML_NODE_CMD_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_EXEC, xexec, I_XML_ATTR_VALUE_EXEC)
          + iXmlAttrDefault(I_XML_ATTR_KEY_HEX, xhex, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_BEFORE, xbefore, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_AFTER, xafter, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;

const iXmlNodeCmdClose = () => I_XML_NODE_CMD_CLOSE;

const iXmlNodeShOpen = (xrows, xhex, xbefore, xafter, xerror) => iXmlNodeOpen(I_XML_NODE_SH_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ROWS, xrows, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_HEX, xhex, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_BEFORE, xbefore, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_AFTER, xafter, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;

const iXmlNodeShClose = () => I_XML_NODE_SH_CLOSE;

const iXmlNodeQshOpen = (xrows, xhex, xbefore, xafter, xerror) => iXmlNodeOpen(I_XML_NODE_QSH_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ROWS, xrows, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_HEX, xhex, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_BEFORE, xbefore, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_AFTER, xafter, I_XML_ATTR_VALUE_OPTIONAL)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;

const iXmlNodeQshClose = () => I_XML_NODE_QSH_CLOSE;

const iXmlNodeSqlOpen = () => I_XML_NODE_SQL_OPEN;

const iXmlNodeSqlClose = () => I_XML_NODE_SQL_CLOSE;

const iXmlNodeSqlConnect = (db, uid, pwd, optionLabel) => iXmlNodeOpen(I_XML_NODE_SQL_CONNECT_OPEN)
      + iXmlAttrDefault(I_XML_ATTR_KEY_DB, db, I_XML_ATTR_VALUE_OPTIONAL)
      + iXmlAttrDefault(I_XML_ATTR_KEY_USERID, uid, I_XML_ATTR_VALUE_OPTIONAL)
      + iXmlAttrDefault(I_XML_ATTR_KEY_PASSWORD, pwd, I_XML_ATTR_VALUE_OPTIONAL)
      + iXmlAttrDefault(I_XML_ATTR_KEY_OPTIONS, optionLabel, I_XML_ATTR_VALUE_OPTIONAL)
      + I_XML_NODE_CLOSE + I_XML_NODE_SQL_CONNECT_CLOSE;

const iXmlNodeSqlOptions = (options) => {
  let iXml = iXmlNodeOpen(I_XML_NODE_SQL_OPTIONS_OPEN);

  Object.keys(options).forEach((key) => {
    iXml += iXmlAttrDefault(options[key].desc, options[key].value, I_XML_ATTR_VALUE_OPTIONAL);
  });

  return iXml + I_XML_NODE_CLOSE + I_XML_NODE_SQL_OPTIONS_CLOSE;
};

const iXmlNodeSqlQueryOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_QUERY_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlQueryClose = () => I_XML_NODE_SQL_QUERY_CLOSE;

const iXmlNodeSqlPrepareOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_PREPARE_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlPrepareClose = () => I_XML_NODE_SQL_PREPARE_CLOSE;

// TODO: Never used
// const iXmlNodeSqlExecute = xerror => iXmlNodeOpen(I_XML_NODE_SQL_EXECUTE_OPEN)
//           + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
//           + I_XML_NODE_SQL_EXECUTE_CLOSE;

const iXmlNodeSqlExecuteOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_EXECUTE_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlExecuteClose = () => I_XML_NODE_SQL_EXECUTE_CLOSE;

const iXmlNodeSqlParmOpen = xio => iXmlNodeOpen(I_XML_NODE_PARM_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_IO, xio, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlParmClose = () => I_XML_NODE_PARM_CLOSE;

const iXmlNodeSqlFetch = (xblock, xdesc, xerror) => iXmlNodeOpen(I_XML_NODE_SQL_FETCH_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_BLOCK, xblock, I_XML_ATTR_SQL_VALUE_BLOCK)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_DESC, xdesc, I_XML_ATTR_SQL_VALUE_DESC)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE
          + I_XML_NODE_SQL_FETCH_CLOSE;

const iXmlNodeSqlCommit = (xaction, xerror) => iXmlNodeOpen(I_XML_NODE_SQL_COMMIT_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_ACTION, xaction, I_XML_ATTR_SQL_VALUE_ACTION)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_COMMIT_CLOSE;

const iXmlNodeSqlRowCount = xerror => iXmlNodeOpen(I_XML_NODE_SQL_ROWCOUNT_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_ROWCOUNT_CLOSE;

const iXmlNodeSqlCount = (xdesc, xerror) => iXmlNodeOpen(I_XML_NODE_SQL_COUNT_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_DESC, xdesc, I_XML_ATTR_SQL_VALUE_IO)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_COUNT_CLOSE;

const iXmlNodeSqlDescribe = (xdesc, xerror) => iXmlNodeOpen(I_XML_NODE_SQL_DESCRIBE_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_SQL_KEY_DESC, xdesc, I_XML_ATTR_SQL_VALUE_IO)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE + I_XML_NODE_SQL_DESCRIBE_CLOSE;

// TODO: Never used
// const iXmlNodeSqlIdentity = xerror => iXmlNodeOpen(I_XML_NODE_SQL_IDENTITY_OPEN)
//           + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
//           + I_XML_NODE_CLOSE + I_XML_NODE_SQL_IDENTITY_CLOSE;

const iXmlNodeSqlTablesOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_TABLES_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlTablesClose = () => I_XML_NODE_SQL_TABLES_CLOSE;

const iXmlNodeSqlTableprivOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_TABLEPRIV_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlTableprivClose = () => I_XML_NODE_SQL_TABLEPRIV_CLOSE;

const iXmlNodeSqlColumnsOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_COLUMNS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlColumnsClose = () => I_XML_NODE_SQL_COLUMNS_CLOSE;

const iXmlNodeSqlSpecialOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_SPECIAL_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlSpecialClose = () => I_XML_NODE_SQL_SPECIAL_CLOSE;

const iXmlNodeSqlColumnprivOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_COLUMNPRIV_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlColumnprivClose = () => I_XML_NODE_SQL_COLUMNPRIV_CLOSE;

const iXmlNodeSqlProceduresOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_PROCEDURES_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlProceduresClose = () => I_XML_NODE_SQL_PROCEDURES_CLOSE;

const iXmlNodeSqlPcolumnsOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_PCOLUMNS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlPcolumnsClose = () => I_XML_NODE_SQL_PCOLUMNS_CLOSE;

const iXmlNodeSqlPrimarykeysOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_PRIMARYKEYS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlPrimarykeysClose = () => I_XML_NODE_SQL_PRIMARYKEYS_CLOSE;

const iXmlNodeSqlForeignkeysOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_FOREIGNKEYS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlForeignkeysClose = () => I_XML_NODE_SQL_FOREIGNKEYS_CLOSE;

const iXmlNodeSqlStatisticsOpen = xerror => iXmlNodeOpen(I_XML_NODE_SQL_STATISTICS_OPEN)
          + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_OPTIONAL)
          + I_XML_NODE_CLOSE;

const iXmlNodeSqlStatisticsClose = () => I_XML_NODE_SQL_STATISTICS_CLOSE;

const iXmlNodeSqlFree = () => I_XML_NODE_SQL_FREE_OPEN
          + I_XML_NODE_SQL_FREE_CLOSE;

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
