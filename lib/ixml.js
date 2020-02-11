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

const iXmlAttrDefault = (z, x, y) => {
  if (typeof x === 'undefined' || x === '') {
    if (y === '') {
      return y;
    }
    return ` ${z}='${y}'`;
  }
  return ` ${z}='${x}'`;
};

module.exports.iXmlNodeError = msg => `<error>${msg}</error>`;

module.exports.iXmlNodeHead = () => "<?xml version='1.0'?>";

module.exports.iXmlNodeScriptOpen = () => '<myscript>';

module.exports.iXmlNodeScriptClose = () => '</myscript>';








module.exports.iXmlNodeOverlayOpen = (xio, xoffset, xtop) => `<overlay${iXmlAttrDefault('io', xio, 'both')}${iXmlAttrDefault('offset', xoffset, '')}${iXmlAttrDefault('top', xtop, '')}>`;

module.exports.iXmlNodeOverlayClose = () => '</overlay>';





module.exports.iXmlNodeCmdOpen = (xexec, xhex, xbefore, xafter, xerror) => `<cmd${iXmlAttrDefault('exec', xexec, 'system')}${iXmlAttrDefault('hex', xhex, '')}${iXmlAttrDefault('before', xbefore, '')}${iXmlAttrDefault('after', xafter, '')}${iXmlAttrDefault('error', xerror, 'fast')}>`;

module.exports.iXmlNodeCmdClose = () => '</cmd>';

module.exports.iXmlNodeShOpen = (xrows, xhex, xbefore, xafter, xerror) => `<sh${iXmlAttrDefault('rows', xrows, '')}${iXmlAttrDefault('hex', xhex, '')}${iXmlAttrDefault('before', xbefore, '')}${iXmlAttrDefault('after', xafter, '')}${iXmlAttrDefault('error', xerror, 'fast')}>`;

module.exports.iXmlNodeShClose = () => '</sh>';

module.exports.iXmlNodeQshOpen = (xrows, xhex, xbefore, xafter, xerror) => `<qsh${iXmlAttrDefault('rows', xrows, '')}${iXmlAttrDefault('hex', xhex, '')}${iXmlAttrDefault('before', xbefore, '')}${iXmlAttrDefault('after', xafter, '')}${iXmlAttrDefault('error', xerror, 'fast')}>`;

module.exports.iXmlNodeQshClose = () => '</qsh>';

module.exports.iXmlNodeSqlOpen = () => '<sql>';

module.exports.iXmlNodeSqlClose = () => '</sql>';

module.exports.iXmlNodeSqlConnect = (db, uid, pwd, optionLabel) => `<connect${iXmlAttrDefault('db', db, '')}${iXmlAttrDefault('uid', uid, '')}${iXmlAttrDefault('pwd', pwd, '')}${iXmlAttrDefault('options', optionLabel, '')}></connect>`;

module.exports.iXmlNodeSqlOptions = (options) => {
  let xml = '<options';

  Object.keys(options).forEach((key) => {
    xml += iXmlAttrDefault(options[key].desc, options[key].value, '');
  });

  return `${xml}></options>`;
};

module.exports.iXmlNodeSqlQueryOpen = xerror => `<query${iXmlAttrDefault('error', xerror, 'fast')}>`;

module.exports.iXmlNodeSqlQueryClose = () => '</query>';

module.exports.iXmlNodeSqlPrepareOpen = xerror => `<prepare${iXmlAttrDefault('error', xerror, 'fast')}>`;

module.exports.iXmlNodeSqlPrepareClose = () => '</prepare>';

module.exports.iXmlNodeSqlExecuteOpen = xerror => `<execute${iXmlAttrDefault('error', xerror, 'fast')}>`;

module.exports.iXmlNodeSqlExecuteClose = () => '</execute>';

module.exports.iXmlNodeSqlParmOpen = xio => `<parm${iXmlAttrDefault('io', xio, '')}>`;

module.exports.iXmlNodeSqlParmClose = () => '</parm>';

module.exports.iXmlNodeSqlFetch = (xblock, xdesc, xerror) => `<fetch${iXmlAttrDefault('block', xblock, 'all')}${iXmlAttrDefault('desc', xdesc, 'on')}${iXmlAttrDefault('error', xerror, '')}></fetch>`;

module.exports.iXmlNodeSqlCommit = (xaction, xerror) => `<commit${iXmlAttrDefault('action', xaction, 'rollback')}${iXmlAttrDefault('error', xerror, '')}></commit>`;

module.exports.iXmlNodeSqlRowCount = xerror => `<rowcount${iXmlAttrDefault('error', xerror, '')}></rowcount>`;

module.exports.iXmlNodeSqlCount = (xdesc, xerror) => `<count${iXmlAttrDefault('desc', xdesc, 'both')}${iXmlAttrDefault('error', xerror, '')}></count>`;

module.exports.iXmlNodeSqlDescribe = (xdesc, xerror) => `<describe${iXmlAttrDefault('desc', xdesc, 'both')}${iXmlAttrDefault('error', xerror, '')}></describe>`;

module.exports.iXmlNodeSqlTablesOpen = xerror => `<tables${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlTablesClose = () => '</tables>';

module.exports.iXmlNodeSqlTableprivOpen = xerror => `<tablepriv${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlTableprivClose = () => '</tablepriv>';

module.exports.iXmlNodeSqlColumnsOpen = xerror => `<columns${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlColumnsClose = () => '</columns>';

module.exports.iXmlNodeSqlSpecialOpen = xerror => `<special${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlSpecialClose = () => '</special>';

module.exports.iXmlNodeSqlColumnprivOpen = xerror => `<columnpriv${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlColumnprivClose = () => '</columnpriv>';

module.exports.iXmlNodeSqlProceduresOpen = xerror => `<procedures${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlProceduresClose = () => '</procedures>';

module.exports.iXmlNodeSqlPcolumnsOpen = xerror => `<pcolumns${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlPcolumnsClose = () => '</pcolumns>';

module.exports.iXmlNodeSqlPrimarykeysOpen = xerror => `<primarykeys${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlPrimarykeysClose = () => '</primarykeys>';

module.exports.iXmlNodeSqlForeignkeysOpen = xerror => `<foreignkeys${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlForeignkeysClose = () => '</foreignkeys>';

module.exports.iXmlNodeSqlStatisticsOpen = xerror => `<statistics${iXmlAttrDefault('error', xerror, '')}>`;

module.exports.iXmlNodeSqlStatisticsClose = () => '</statistics>';

module.exports.iXmlNodeSqlFree = () => '<free></free>';
