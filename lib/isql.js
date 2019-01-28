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

const iXml = require('./ixml');

module.exports = class iSql {
  /**
   * @description Creates a new iSql object
   * @constructor
   */
  constructor() {
    this.xml = iXml.iXmlNodeSqlOpen();
  }

  /**
   * @description adds sql connect XML
   * @param {object} [options]
   */
  connect(options) {
    if (options && options.options) {
      this.xml += iXml.iXmlNodeSqlConnect(options.db, options.uid, options.pwd, options.options);
    } else {
      this.xml += iXml.iXmlNodeSqlConnect(options.db, options.uid, options.pwd, 'opt1');
    }
  }

  /**
   * @description adds sql options XML
   * @param {object} options
   */
  setOptions(options) {
    this.xml += iXml.iXmlNodeSqlOptions(options);
  }

  /**
   * @description adds sql query XML
   * @param {string} stmt
   * @param {object} [options]
   */
  addQuery(stmt, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlQueryOpen(options.error) + stmt + iXml.iXmlNodeSqlQueryClose();
    } else {
      this.xml += iXml.iXmlNodeSqlQueryOpen() + stmt + iXml.iXmlNodeSqlQueryClose();
    }
  }

  /**
   * @description adds sql prepare XML
   * @param {string} stmt
   * @param {object} [options]
   */
  prepare(stmt, options) {
    if (options && options.error) {
      this.xml += iXml.iXmlNodeSqlPrepareOpen(options.error) + stmt
      + iXml.iXmlNodeSqlPrepareClose();
    } else {
      this.xml += iXml.iXmlNodeSqlPrepareOpen() + stmt + iXml.iXmlNodeSqlPrepareClose();
    }
  }

  /**
   * @description adds sql execute XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql table XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql table priv XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql columns XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql special XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql column priv XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql procedures XML
   * @param {*} params
   * @param {*} [options]
   */
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

  /**
   * @description adds sql pcolumns XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql primary keys XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql foriegn keys XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql stats XML
   * @param {array} params
   * @param {object} [options]
   */
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

  /**
   * @description adds sql commit XML
   * @param {object} options
   */
  commit(options) {
    if (options && options.action && options.error) {
      this.xml += iXml.iXmlNodeSqlCommit(options.action, options.error);
    } else if (options && options.action) {
      this.xml += iXml.iXmlNodeSqlCommit(options.action, '');
    }
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  rowCount(options) {
    this.xml += iXml.iXmlNodeSqlRowCount(options.action, options.error);
  }

  /**
   * @description adds sql row count XML
   * @param {object} options
   */
  count(options) {
    this.xml += iXml.iXmlNodeSqlRowCount(options.desc, options.error);
  }

  /**
   * @description adds sql describe XML
   * @param {object} options
   */
  describe(options) {
    this.xml += iXml.iXmlNodeSqlDescribe(options.desc, options.error);
  }

  /**
   * @description adds sql fetch XML
   * @param {object} options
   */
  fetch(options) {
    if (options) {
      this.xml += iXml.iXmlNodeSqlFetch(options.block, options.desc, options.error);
    } else {
      this.xml += iXml.iXmlNodeSqlFetch();
    }
  }

  /**
   * @description adds sql free XML
   */
  free() {
    this.xml += iXml.iXmlNodeSqlFree();
  }

  /**
   * @description returns the current sql XML
   * @returns {string} - the generted sql XML
   */
  toXML() {
    return this.xml + iXml.iXmlNodeSqlClose();
  }
};
