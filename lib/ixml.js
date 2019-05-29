/* eslint-disable prefer-template */
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

const iXmlNodeOpen = x => x.slice(0, -1);

const iXmlAttrDefault = (z, x, y) => {
  if (typeof x === 'undefined' || x === '') {
    if (y === '') {
      return y;
    }
    return ` ${z}='${y}'`;
  }
  return ` ${z}='${x}'`;
};

const iXmlNodeError = msg => '<error>' + msg + '</error>';

const iXmlNodeHead = () => "<?xml version='1.0'?>";

const iXmlNodeScriptOpen = () => '<myscript>';

const iXmlNodeScriptClose = () => '</myscript>';

const iXmlNodePgmOpen = (xname, xlib, xfunc, xerror) => iXmlNodeOpen('<pgm>')
          + iXmlAttrDefault('name', xname, 'undefined')
          + iXmlAttrDefault('lib', xlib, '')
          + iXmlAttrDefault('func', xfunc, '')
          + iXmlAttrDefault('error', xerror, 'fast')
          + '>';

const iXmlNodePgmClose = () => '</pgm>';

const iXmlNodeParmOpen = (opt) => {
  if (!(opt && typeof opt === 'object')) {
    return iXmlNodeOpen('<parm>')
    + '>';
  }

  const io = (opt.io) ? iXmlAttrDefault('io', opt.io, '') : '';
  const by = (opt.by) ? iXmlAttrDefault('by', opt.by, '') : '';

  return iXmlNodeOpen('<parm>')
        + io
        + by
        + '>';
};

const iXmlNodeParmClose = () => '</parm>';

const iXmlNodeReturnOpen = () => '<return>';

const iXmlNodeReturnClose = () => '</return>';

const iXmlNodeOverlayOpen = (xio, xoffset, xtop) => iXmlNodeOpen('<overlay>')
          + iXmlAttrDefault('io', xio, 'both')
          + iXmlAttrDefault('offset', xoffset, '')
          + iXmlAttrDefault('top', xtop, '')
          + '>';

const iXmlNodeOverlayClose = () => '</overlay>';

const iXmlNodeDsOpen = (xdim, xdou, xlen, xdata) => iXmlNodeOpen('<ds>')
          + iXmlAttrDefault('dim', xdim, '')
          + iXmlAttrDefault('dou', xdou, '')
          + iXmlAttrDefault('len', xlen, '')
          + iXmlAttrDefault('data', xdata, '')
          + '>';

const iXmlNodeDsClose = () => '</ds>';

const iXmlNodeDataOpen = (xtype, options) => {
  let result = iXmlNodeOpen('<data>')
  + iXmlAttrDefault('type', xtype, '1024a');

  if (options && typeof options === 'object') {
    Object.keys(options).forEach((key) => {
      result += iXmlAttrDefault(key, options[key], '1024a');
    });
  }

  result += '>';
  return result;
};

const iXmlNodeDataClose = () => '</data>';

const iXmlNodeCmdOpen = (xexec, xhex, xbefore, xafter, xerror) => iXmlNodeOpen('<cmd>')
          + iXmlAttrDefault('exec', xexec, 'system')
          + iXmlAttrDefault('hex', xhex, '')
          + iXmlAttrDefault('before', xbefore, '')
          + iXmlAttrDefault('after', xafter, '')
          + iXmlAttrDefault('error', xerror, 'fast')
          + '>';

const iXmlNodeCmdClose = () => '</cmd>';

const iXmlNodeShOpen = (xrows, xhex, xbefore, xafter, xerror) => iXmlNodeOpen('<sh>')
          + iXmlAttrDefault('rows', xrows, '')
          + iXmlAttrDefault('hex', xhex, '')
          + iXmlAttrDefault('before', xbefore, '')
          + iXmlAttrDefault('after', xafter, '')
          + iXmlAttrDefault('error', xerror, 'fast')
          + '>';

const iXmlNodeShClose = () => '</sh>';

const iXmlNodeQshOpen = (xrows, xhex, xbefore, xafter, xerror) => iXmlNodeOpen('<qsh>')
          + iXmlAttrDefault('rows', xrows, '')
          + iXmlAttrDefault('hex', xhex, '')
          + iXmlAttrDefault('before', xbefore, '')
          + iXmlAttrDefault('after', xafter, '')
          + iXmlAttrDefault('error', xerror, 'fast')
          + '>';

const iXmlNodeQshClose = () => '</qsh>';

const iXmlNodeSqlOpen = () => '<sql>';

const iXmlNodeSqlClose = () => '</sql>';

const iXmlNodeSqlConnect = (db, uid, pwd, optionLabel) => iXmlNodeOpen('<connect>')
      + iXmlAttrDefault('db', db, '')
      + iXmlAttrDefault('uid', uid, '')
      + iXmlAttrDefault('pwd', pwd, '')
      + iXmlAttrDefault('options', optionLabel, '')
      + '>'
      + '</connect>';

const iXmlNodeSqlOptions = (options) => {
  let iXml = iXmlNodeOpen('<options>');

  Object.keys(options).forEach((key) => {
    iXml += iXmlAttrDefault(options[key].desc, options[key].value, '');
  });

  // eslint-disable-next-line no-useless-concat
  return iXml + '>' + '</options>';
};

const iXmlNodeSqlQueryOpen = xerror => iXmlNodeOpen('<query>')
          + iXmlAttrDefault('error', xerror, 'fast')
          + '>';

const iXmlNodeSqlQueryClose = () => '</query>';

const iXmlNodeSqlPrepareOpen = xerror => iXmlNodeOpen('<prepare>')
          + iXmlAttrDefault('error', xerror, 'fast')
          + '>';

const iXmlNodeSqlPrepareClose = () => '</prepare>';

// TODO: Never used
// const iXmlNodeSqlExecute = xerror => iXmlNodeOpen(I_XML_NODE_SQL_EXECUTE_OPEN)
//           + iXmlAttrDefault(I_XML_ATTR_KEY_ERROR, xerror, I_XML_ATTR_VALUE_ERROR)
//           + I_XML_NODE_SQL_EXECUTE_CLOSE;

const iXmlNodeSqlExecuteOpen = xerror => iXmlNodeOpen('<execute>')
          + iXmlAttrDefault('error', xerror, 'fast')
          + '>';

const iXmlNodeSqlExecuteClose = () => '</execute>';

const iXmlNodeSqlParmOpen = xio => iXmlNodeOpen('<parm>')
          + iXmlAttrDefault('io', xio, '')
          + '>';

const iXmlNodeSqlParmClose = () => '</parm>';

const iXmlNodeSqlFetch = (xblock, xdesc, xerror) => iXmlNodeOpen('<fetch>')
          + iXmlAttrDefault('block', xblock, 'all')
          + iXmlAttrDefault('desc', xdesc, 'on')
          + iXmlAttrDefault('error', xerror, '')
          + '>'
          + '</fetch>';

const iXmlNodeSqlCommit = (xaction, xerror) => iXmlNodeOpen('<commit>')
          + iXmlAttrDefault('action', xaction, 'rollback')
          + iXmlAttrDefault('error', xerror, '')
          + '>'
          + '</commit>';

const iXmlNodeSqlRowCount = xerror => iXmlNodeOpen('<rowcount>')
          + iXmlAttrDefault('error', xerror, '')
          + '>'
          + '</rowcount>';

const iXmlNodeSqlCount = (xdesc, xerror) => iXmlNodeOpen('<count>')
          + iXmlAttrDefault('desc', xdesc, 'both')
          + iXmlAttrDefault('error', xerror, '')
          + '>'
          + '</count>';

const iXmlNodeSqlDescribe = (xdesc, xerror) => iXmlNodeOpen('<describe>')
          + iXmlAttrDefault('desc', xdesc, 'both')
          + iXmlAttrDefault('error', xerror, '')
          + '>'
          + '</describe>';

const iXmlNodeSqlTablesOpen = xerror => iXmlNodeOpen('<tables>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlTablesClose = () => '</tables>';

const iXmlNodeSqlTableprivOpen = xerror => iXmlNodeOpen('<tablepriv>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlTableprivClose = () => '</tablepriv>';

const iXmlNodeSqlColumnsOpen = xerror => iXmlNodeOpen('<columns>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlColumnsClose = () => '</columns>';

const iXmlNodeSqlSpecialOpen = xerror => iXmlNodeOpen('<special>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlSpecialClose = () => '</special>';

const iXmlNodeSqlColumnprivOpen = xerror => iXmlNodeOpen('<columnpriv>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlColumnprivClose = () => '</columnpriv>';

const iXmlNodeSqlProceduresOpen = xerror => iXmlNodeOpen('<procedures>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlProceduresClose = () => '</procedures>';

const iXmlNodeSqlPcolumnsOpen = xerror => iXmlNodeOpen('<pcolumns>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlPcolumnsClose = () => '</pcolumns>';

const iXmlNodeSqlPrimarykeysOpen = xerror => iXmlNodeOpen('<primarykeys>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlPrimarykeysClose = () => '</primarykeys>';

const iXmlNodeSqlForeignkeysOpen = xerror => iXmlNodeOpen('<foreignkeys>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlForeignkeysClose = () => '</foreignkeys>';

const iXmlNodeSqlStatisticsOpen = xerror => iXmlNodeOpen('<statistics>')
          + iXmlAttrDefault('error', xerror, '')
          + '>';

const iXmlNodeSqlStatisticsClose = () => '</statistics>';

const iXmlNodeSqlFree = () => '<free></free>';

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
