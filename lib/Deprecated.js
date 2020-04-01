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
   * iPgm Options
   * @typedef {object} iPgmOptions
   * @property {string} lib - The library where the program exists.
   * @property {string} [error=fast] - Valid options are 'on', 'off', or 'fast'
   * @property {string} [func] - The target function of the service program.
   */

  /**
   * @deprecated Will be removed in the next major version. Use the ProgramCall instead.
   * @description Creates a new iPgm object.
   * @constructor
   * @param {string} pgm - The program or service program name.
   * @param {iPgmOptions} [options]
   */
  constructor(pgm, options) {
    iPgmDeprecate('As of v1.0, class \'iPgm\' is deprecated. Please use \'ProgramCall\' instead.');
    this.ProgramCall = new ProgramCall(pgm, options);
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds a parameter to the program XML.
   * @param {string|array} data - The value of the the data or 2D array.
   * @param {string|object} [type] - The XMLSERVICE data type or ds options.
   * @param {object} [options] - The parm or data options.
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
   * @deprecated Will be removed in the next major version.
   * @description Adds a return element to the program XML.
   * @param {string} data - The value of the data.
   * @param {string} type - The xmlservice data type.
   * @param {object} [options] - The data options.
   */
  addReturn(value, type = '1024a', options) {
    const data = {};
    data.type = type;
    data.value = value;
    if (!data.type) {
      iPgmDeprecate('defaulting return data type to 1024a has been deprecated. You should specify a type instead.');
      data.type = '1024a';
    }

    if (typeof options === 'object') { // <data> options
      Object.keys(options).forEach((key) => {
        data[key] = options[key];
      });
    }
    return this.ProgramCall.addReturn(data);
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @returns {string} The generated program XML.
   */
  toXML() {
    iPgmDeprecate('As of v1.0, \'iPgm.toXML()\' is deprecated. Please use \'ProgramCall.toXML()\' instead.');
    return this.ProgramCall.toXML();
  }
}

// DEPRECATED: will be removed at a later time.
class iSql {
  /**
   * @deprecated Will be removed in the next major version.
   * @description Creates a new iSql object.
   * @constructor
   */
  constructor() {
    iSqlDeprecate('As of v1.0, class \'iSql\' is deprecated. Use odbc, idb-connector, or idb-pconnector npm package instead.');
    this.xml = '<sql>';
  }

  /**
   * iSql Options
   * @typedef {object} iSqlOptions
   * @property {string} [error=fast] - Valid options are 'on', 'off', or 'fast'.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @private
   * @description Adds sql connect XML.
   * @param {object} [options]
   */
  // eslint-disable-next-line class-methods-use-this
  connect() {
    throw new Error('As of v1.0, \'iSql.connect()\' has been removed');
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @private
   * @description Adds sql options XML.
   * @param {object} [options]
   */
  // eslint-disable-next-line class-methods-use-this
  setOptions() {
    throw new Error('As of v1.0, \'iSql.setOptions()\' has been removed');
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql query XML.
   * @param {string} stmt - The sql staetment.
   * @param {iSqlOptions} [options]
   */
  addQuery(stmt, options = {}) {
    this.xml += `<query error='${options.error || 'fast'}'>${stmt}</query>`;
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql prepare XML.
   * @param {string} stmt - The sql statement.
   * @param {iSqlOptions} [options]
   */
  prepare(stmt, options = {}) {
    this.xml += `<prepare error='${options.error || 'fast'}'>${stmt}</prepare>`;
  }

  /**
   * execute parameters
   * @typedef {array} executeParams - 2D array for parameters.
   * @property {string[]} subArray - Each sub element is [value, io] of the parameter.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql execute XML.
   * @param {executeParams} params - 2D array for parameters.
   * @param {iSqlOptions} [options]
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
   * @deprecated Will be removed in the next major version.
   * @description Adds sql tables XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the table. This may be an empty string.
   * The second element is the schema name for the table.
   * The third element is the name of the table.
   * The fourth element is the type of the table. This may be an empty string.
   * @param {iSqlOptions} [options]
   */
  tables(params, options = {}) {
    this.xml += `<tables error='${options.error || 'fast'}'>`;
    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</tables>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql tablepriv XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the table. This may be an empty string.
   * The second element is the schema name for the table.
   * The third element is the name of the table.
   * @param {iSqlOptions} [options]
   */
  tablePriv(params, options = {}) {
    this.xml += `<tablepriv error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }

    this.xml += '</tablepriv>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql columns XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the table. This may be an empty string.
   * The second element is the schema name for the column.
   * The third element is the name of the table.
   * The fourth element is the name of the column.
   * @param {iSqlOptions} [options]
   */
  columns(params, options = {}) {
    this.xml += `<columns error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</columns>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql special XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the table. This may be an empty string.
   * The second element is the schema name for the column.
   * The third element is 'row', 'transaction', or 'session'.
   * The fourth element is 'no' or 'nullable'.
   * @param {iSqlOptions} [options]
   */
  special(params, options = {}) {
    this.xml += `<special error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</special>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql columnpriv XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the table. This may be an empty string.
   * The second element is the schema name for the column.
   * The third element is the name of the table.
   * The fourth element is the name of the column.
   * @param {iSqlOptions} [options]
   */
  columnPriv(params, options = {}) {
    this.xml += `<columnpriv error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</columnpriv>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql procedures XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the procedure.
   * This may be an empty string.
   * The second element is the schema name for the procedure.
   * The third element is the name of the procedure.
   * @param {iSqlOptions} [options]
   */
  procedures(params, options = {}) {
    this.xml += `<procedures error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</procedures>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql pcolumns XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the procedure.
   * This may be an empty string.
   * The second element is the schema name for the procedure.
   * The third element is the name of the procedure.
   * @param {iSqlOptions} [options]
   */
  pColumns(params, options = {}) {
    this.xml += `<pcolumns error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</pcolumns>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql primarykeys XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the table. This may be an empty string.
   * The second element is the schema name for the table.
   * The third element is the name of the table.
   * @param {iSqlOptions} [options]
   */
  primaryKeys(params, options = {}) {
    this.xml += `<primarykeys error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</primarykeys>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql foriegnkeys XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the primary key table.
   * This may be an empty string.
   * The second element is the schema name for the primary key table.
   * The third element is the name of the primary key table.
   * The fourth element is the qualifer or catalog for the foreign key table.
   * This may be an empty string.
   * The fifth element is the schema name for the foreign key table.
   * The sixth element is the name of the foreign key table.
   * @param {iSqlOptions} [options]
   */
  foreignKeys(params, options = {}) {
    this.xml += `<foreignkeys error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</foreignkeys>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql statistics XML.
   * @param {string[]} params -
   * The first element is the qualifer or catalog for the table.
   * This may be an empty string.
   * The second element is the schema name for the table.
   * The third element is the name of the table.
   * The fourth element is 'all' or 'unique' to specify the level of stats returned.
   * @param {iSqlOptions} [options]
   */
  statistics(params, options = {}) {
    this.xml += `<statistics error='${options.error || 'fast'}'>`;

    for (let i = 0; i < params.length; i += 1) {
      this.xml += `<parm>${params[i]}</parm>`;
    }
    this.xml += '</statistics>';
  }

  /**
   * commit options
   * @typedef {object} commitOptions
   * @property {string} [action=commit] - The commit action either 'commit' or 'rollback'.
   * @property {string} [error=fast] -Valid options are 'on', 'off', or 'fast'.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description adds sql commit XML
   * @param {commitOptions} [options]
   */
  commit(options = {}) {
    this.xml += `<commit action='${options.action || 'commit'}' error='${options.error || 'fast'}'></commit>`;
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description adds sql row count XML
   * @param {iSqlOptions} [options]
   */
  rowCount(options = {}) {
    this.xml += `<rowcount error='${options.error || 'fast'}'></rowcount>`;
  }

  /**
   * count options
   * @typedef {object} countOptions
   * @property {string} [desc=both] - The desc can be 'col', 'parm', or 'both'.
   * @property {string} [error=fast] -Valid options are 'on', 'off', or 'fast'.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description adds sql row count XML
   * @param {countOptions} [options]
   */
  count(options = {}) {
    this.xml += `<count desc='${options.desc || 'both'}' error='${options.error || 'fast'}'></count>`;
  }

  /**
   * describe options
   * @typedef {object} describeOptions
   * @property {string} [desc=both] - The desc option can be 'col', 'parm', or 'both'.
   * @property {string} [error=fast] - Valid options are 'on', 'off', or 'fast'.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql describe XML.
   * @param {describeOptions} [options]
   */
  describe(options = {}) {
    this.xml += `<describe desc='${options.desc || 'both'}' error='${options.error || 'fast'}'></describe>`;
  }

  /**
   * fetch options
   * @typedef {object} fetchOptions
   * @property {string} [block=all] - The block option can be 'all' or number of rows to fetch 'n'.
   * @property {string} [desc=on] - The desc option can be 'on' or 'off'.
   * @property {string} [error=fast] - Valid options are 'on', 'off', or fast.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql fetch XML.
   * @param {fetchOptions} [options]
   */
  fetch(options = {}) {
    this.xml += `<fetch block='${options.block || 'all'}' desc='${options.desc || 'on'}' error='${options.error || 'fast'}'></fetch>`;
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds sql free XML.
   */
  free() {
    this.xml += '<free></free>';
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @returns {string} - The generted sql XML.
   */
  toXML() {
    return `${this.xml}</sql>`;
  }
}

// DEPRECATED: For now, routes call to Connection, but will be removed at a later time.
class iConn {
  /**
   * Deprecated rest transport configuration
   * @typedef {object} restConfig
   * @property {string} host=localhost - The hostname of the server. Defaults to 'localhost'.
   * @property {string} [ipc=*NA] - The key name/security route to XMLSERVICE job.
   * Defaults to '*NA'.
   * @property {string} [ctl=*here] - The control options for XMLSERVICE jobs. Defaults to '*here'
   * @property {number} port=80 - The port on the server. Defaults to 80.
   * @property {string} path=/ - The path to xmlcgi endpoint. Defaults to '/'.
   */

  /**
   * @deprecated Will be removed in the next major version. Use the Connection instead.
   * @description Creates a new iConn object.
   * @constructor
   * @param {string} db - The database to connect to.
   * @param {string} user - The user to connect as.
   * @param {string} pwd - The user's password.
   * @param {restConfig} [restConfig] - The rest transport config.
   */
  constructor(db, user, pwd, option) {
    iConnDeprecate('As of v1.0, class \'iConn\' is deprecated. Please use \'Connection\' instead.');

    // Assume using idb as the transport
    const options = {
      returnError: false,
      transport: 'idb',
      transportOptions: {
        database: db,
        username: user,
        password: pwd,
      },
    };

    if (option && typeof option === 'object') {
      // pre v1.0 falls back to idb transport when host is not specified
      if (option.host) {
        options.transport = 'rest';
      }
      options.transportOptions = { ...options.transportOptions, ...option };
    }

    this.connection = new Connection(options);
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @private
   * @description Override the default timeout value for sync mode.
   */
  // eslint-disable-next-line class-methods-use-this
  setTimeout() {
    iConnDeprecate('As of v1.0, \'iConn.setTimeout()\' is deprecated and sync mode is disabled');
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Enables or disables the verbose mode for debugging
   * @param {boolean} [flag] - The debug flag.
   * @returns {boolean} The current state of the debug flag
   */
  debug(flag) {
    iConnDeprecate('As of v1.0, \'iConn.debug()\' is deprecated. Please use \'Connection.debug()\' instead');
    return this.connection.debug(flag);
  }


  /**
   * @deprecated Will be removed in the next major version.
   * @description Returns conn property from iConn object.
   * @returns {object} the conn property from iConn object.
   */
  getConnection() {
    iConnDeprecate('As of v1.0, \'iConn.getConnection()\' is deprecated. Please use \'Connection.getTransportOptions()\' instead');
    return this.connection.getTransportOptions();
  }

  /**
   * @deprecated Will be removed in the next major version.
   * @description Adds XML request to command list.
   * @param {string | object} xml
   */
  add(xml) {
    iConnDeprecate('As of v1.0, \'iConn.add()\' is deprecated. Please use \'Connection.add()\' instead');
    this.connection.add(xml);
  }

  /**
   * @callback runCallbackDeprecated
   * @param {string} xmlOutput - the xml output.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Invokes transport with XML generated from joining the command list.
   * Note the command list is cleared after calling this function.
   * Once the transport is complete the user provided callback function is called.
   * @param {runCallbackDeprecated} callback - The callback function.
   */
  run(callback) {
    iConnDeprecate('As of v1.0, \'iConn.run()\' is deprecated. Please use \'Connection.run()\' instead');
    this.connection.run(callback);
  }
}

class iDataQueue {
  /**
   * @deprecated Will be removed in the next major version.
   * @constructor
   * @param {Connection} conn - The Connection object.
   */
  constructor(conn = {}) {
    iDataQueueDeprecate('As of v1.0, class \'iDataQueue\' is deprecated and will be removed at a later time.');
    if (!conn || !typeof conn === 'object') {
      throw new Error('Expected a Connection object');
    }

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
  }

  /**
   * @callback sendToDataQueueCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {boolean|null} output - This is true if successful or null when an error occurs.
   */

  /**
   * @description
   * Sends data to the specified data queue.
   * IBM i API: QSNDDTAQ
   * @deprecated Will be removed in the next major version.
   * @param {string} name - The data queue name.
   * @param {string} lib - The library containing the data queue.
   * @param {string} data -The data to send to the data queue.
   * @param {sendToDataQueueCallback} cb - The callback function.
   */
  sendToDataQueue(name, lib, data, cb) {
    iDataQueueDeprecate('As of v1.0, \'iDataQueue.sendToDataQueue()\' is deprecated and will be removed at a later time.');
    const pgm = new ProgramCall('QSNDDTAQ', { lib: 'QSYS' });
    pgm.addParam({ type: '10A', value: name });
    pgm.addParam({ type: '10A', value: lib === '' ? '*CURLIB' : lib });
    pgm.addParam({ type: '5p0', value: data.length });
    pgm.addParam({ type: `${data.length}A`, value: data });

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.
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
          rtValue = true;
        } else {
          rtValue = str;
        }
        if (this.reportError) {
          cb(null, rtValue); // Run the call back function against the returned value.
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * @callback receiveFromDataQueueCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {string|null} output - This is the output from the data queue if successful
   *  or null when an error occurs.
   */

  /**
   * @description
   * Receives data from the specified data queue.
   * IBM i API: QRCVDTAQ
   * @deprecated Will be removed in the next major version.
   * @param {string} name - The data queue name.
   * @param {string} lib - The library containing the data queue.
   * @param {string} length - The length of the data to retrieve.
   * @param {receiveFromDataQueueCallback} cb - The callback function.
   */
  receiveFromDataQueue(name, lib, length, cb) {
    iDataQueueDeprecate('As of v1.0, \'iDataQueue.receiveFromDataQueue()\' is deprecated and will be removed at a later time.');
    const pgm = new ProgramCall('QRCVDTAQ', { lib: 'QSYS' });
    pgm.addParam({ type: '10A', value: name });
    pgm.addParam({ type: '10A', value: lib === '' ? '*CURLIB' : lib });
    pgm.addParam({ type: '5p0', value: length });
    pgm.addParam({ type: `${length + 1}A`, value: '' });
    pgm.addParam({ type: '5p0', value: 0 });

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

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
          rtValue = result.myscript.pgm[0].parm[3].data[0]._;
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
    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * @callback clearDataQueueCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {boolean|null} output - This is true if successful or null when an error occurs.
   */

  /**
   * @description
   * Clears the data queue.
   * IBM i API: QCLRDTAQ
   * @deprecated Will be removed in the next major version.
   * @param {string} name - the data queue name.
   * @param {string} lib -  The library containing the data queue.
   * @param {clearDataQueueCallback} cb - The callback function.
   */
  clearDataQueue(name, lib, cb) {
    iDataQueueDeprecate('As of v1.0, \'iDataQueue.clearDataQueue()\' is deprecated and will be removed at a later time.');
    const pgm = new ProgramCall('QCLRDTAQ', { lib: 'QSYS' });
    pgm.addParam({ type: '10A', value: name });
    pgm.addParam({ type: '10A', value: lib === '' ? '*CURLIB' : lib });

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

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
          rtValue = true;
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

    this.conn.run(toJson); // Post the input XML and get the response.
  }
}

class iNetwork {
  /**
   * @deprecated Will be removed in the next major version.
   * @constructor
   * @param {Connection} conn - The Connection object.
   */
  constructor(conn) {
    iNetworkDeprecate('As of v1.0, class \'iNetwork\' is deprecated and will be removed at a later time.');
    if (!conn || !typeof conn === 'object') {
      throw new Error('Expected a Connection object');
    }

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
   * getTCPIPAttr Output Object
   * @typedef {object} getTCPIPAttrOutput
   * @property {string} TCP/IPv4_stack_status
   * @property {string} How_long_active
   * @property {string} When_last_started_-_date
   * @property {string} When_last_started_-_time
   * @property {string} When_last_ended_-_date
   * @property {string} When_last_ended_-_time
   * @property {string} Who_last_started_-_job_name
   * @property {string} Who_last_started_-_job_user_name
   * @property {string} Who_last_started_-_job_number
   * @property {string} Who_last_started_-_internal_job_identifier
   * @property {string} Who_last_ended_-_job_name
   * @property {string} Who_last_ended_-_job_user_name
   * @property {string} Who_last_ended_-_job_number
   * @property {string} Who_last_ended_-_internal_job_identifier
   * @property {string} Offset_to_additional_information
   * @property {string} Length_of_additional_information
   * @property {string} Limited_mode
   * @property {string} Offset_to_list_of_Internet_addresses
   * @property {string} Number_of_Internet_addresses
   * @property {string} Entry_length_for_list_of_Internet_addresses
   * @property {string} DNS_protocol
   * @property {string} Retries
   * @property {string} Time_interval
   * @property {string} Search_order
   * @property {string} Initial_domain_name_server
   * @property {string} DNS_listening_port
   * @property {string} Host_name
   * @property {string} Domain_name
   * @property {string} Reserved
   * @property {string} Domain_search_list
   */

  /**
   * @callback getTCPIPAttrCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getTCPIPAttrOutput|null} output - This is an object if successful
   *  or null when an error occurs.
   */

  /**
   * @description
   * Retrieve TCP/IP Attributes.
   * IBM i API: QTOCNETSTS/QtocRtvTCPA
   * @deprecated Will be removed in the next major version.
   * @param {getTCPIPAttrCallback} cb - The callback function.
   */
  getTCPIPAttr(cb) {
    iNetworkDeprecate('As of v1.0, \'iNetwork.getTCPIPAttr()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // TCP/IPv4 stack status
        { type: '10i0', value: 0 }, // How long active
        { type: '8A', value: '' }, // When last started - date
        { type: '6A', value: '' }, // When last started - time
        { type: '8A', value: '' }, // When last ended - date
        { type: '6A', value: '' }, // When last ended - time
        { type: '10A', value: '' }, // Who last started - job name
        { type: '10A', value: '' }, // Who last started - job user name
        { type: '6A', value: '' }, // Who last started - job number
        { type: '16h', value: '' }, // Who last started - internal job identifier
        { type: '10A', value: '' }, // Who last ended - job name
        { type: '10A', value: '' }, // Who last ended - job user name
        { type: '6A', value: '' }, // Who last ended - job number
        { type: '16h', value: '' }, // Who last ended - internal job identifier
        { type: '10i0', value: 0 }, // Offset to additional information
        { type: '10i0', value: 0 }, // Length of additional information
        { type: '10i0', value: 0 }, // Limited mode
        { type: '10i0', value: 0 }, // Offset to list of Internet addresses
        { type: '10i0', value: 0 }, // Number of Internet addresses
        { type: '10i0', value: 0 }, // Entry length for list of Internet addresses
        { type: '10i0', value: 0 }, // DNS protocol
        { type: '10i0', value: 0 }, // Retries
        { type: '10i0', value: 0 }, // Time interval
        { type: '10i0', value: 0 }, // Search order
        { type: '10i0', value: 0 }, // Initial domain name server
        { type: '10i0', value: 0 }, // DNS listening port
        { type: '64A', value: '' }, // Host name
        { type: '255A', value: '' }, // Domain name
        { type: '1A', value: '' }, // Reserved
        { type: '256A', value: '' }, // ]Domain search list
      ],
    };

    const pgm = new ProgramCall('QTOCNETSTS', { lib: 'QSYS', func: 'QtocRtvTCPA' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'TCPA0300' });
    pgm.addParam(this.errno);
    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
            'TCP/IPv4_stack_status': data[2]._,
            How_long_active: data[3]._,
            'When_last_started_-_date': data[4]._,
            'When_last_started_-_time': data[5]._,
            'When_last_ended_-_date': data[6]._,
            'When_last_ended_-_time': data[7]._,
            'Who_last_started_-_job_name': data[8]._,
            'Who_last_started_-_job_user_name': data[9]._,
            'Who_last_started_-_job_number': data[10]._,
            'Who_last_started_-_internal_job_identifier': data[11]._,
            'Who_last_ended_-_job_name': data[12]._,
            'Who_last_ended_-_job_user_name': data[13]._,
            'Who_last_ended_-_job_number': data[14]._,
            'Who_last_ended_-_internal_job_identifier': data[14]._,
            Offset_to_additional_information: data[16]._,
            Length_of_additional_information: data[17]._,
            Limited_mode: data[18]._,
            Offset_to_list_of_Internet_addresses: data[19]._,
            Number_of_Internet_addresses: data[20]._,
            Entry_length_for_list_of_Internet_addresses: data[21]._,
            DNS_protocol: data[22]._,
            Retries: data[23]._,
            Time_interval: data[24]._,
            Search_order: data[25]._,
            Initial_domain_name_server: data[26]._,
            DNS_listening_port: data[27]._,
            Host_name: data[28]._,
            Domain_name: data[29]._,
            Reserved: data[30]._,
            Domain_search_list: data[31]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * getNetInterfaceData Output Object
   * @typedef {object} getNetInterfaceDataOutput
   * @property {string} Internet_address
   * @property {string} Internet_address_binary
   * @property {string} Network_address
   * @property {string} Network_address_binary
   * @property {string} Line_description
   * @property {string} Interface_status
   * @property {string} Interface_type_of_service
   * @property {string} Interface_MTU
   * @property {string} Interface_line_type
   * @property {string} Host_address
   * @property {string} Host_address_binary
   * @property {string} Interface_subnet_mask
   * @property {string} Interface_subnet_mask_binary
   * @property {string} Directed_broadcast_address
   * @property {string} Directed_broadcast_address_binary
   * @property {string} Change_date
   * @property {string} Change_time
   * @property {string} Associated_local_interface
   * @property {string} Associated_local_interface_binary
   * @property {string} Change_status
   * @property {string} Packet_rules
   * @property {string} Automatic_start
   * @property {string} TRLAN_bit_sequencing
   * @property {string} Interface_type
   * @property {string} Proxy_ARP_allowed
   * @property {string} Proxy_ARP_enabled
   * @property {string} Configured_MTU
   * @property {string} Network_name
   * @property {string} Interface_name
   * @property {string} Alias_name
   * @property {string} Interface_description
   * @property {string} Offset_to_preferred_interface_list
   * @property {string} Number_of_entries_in_preferred_interface_list
   * @property {string} Length_of_one_preferred_interface_list_entry
   * @property {string} DHCP_created
   * @property {string} DHCP_dynamic_DNS_updates
   * @property {string} DHCP_lease_expiration
   * @property {string} DHCP_lease_expiration_-_date
   * @property {string} DHCP_lease_expiration_-_time
   * @property {string} DHCP_lease_obtained
   * @property {string} DHCP_lease_obtained_-_date
   * @property {string} DHCP_lease_obtained_-_time
   * @property {string} Use_DHCP_unique_identifier
   * @property {string} DHCP_server_IP_address
   * @property {string} Preferred_interface_Internet_address
   * @property {string} Preferred_interface_Internet_address_binary
   */

  /**
   * @callback getNetInterfaceDataCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getNetInterfaceDataOutput|null} output - This is an object if successful
   *  or null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Retrieves detailed information about a specified IPv4 network interface.
   * IBM i API: QTOCNETSTS/QtocRtvNetIfcDta
   * @param {string} ipaddr - The IP address.
   * @param {getNetInterfaceDataCallback} cb - The callback function.
   */
  getNetInterfaceData(ipaddr, cb) {
    iNetworkDeprecate('As of v1.0, \'iNetwork.getNetInterfaceData()\' is deprecated and will be removed at a later time.');
    let address = ipaddr;

    const IPToNum = (ip) => {
      const ipArray = ip.split('.');
      let num = 0;

      /* eslint-disable no-bitwise */
      num += parseInt(ipArray[0], 10) << 24;
      num += parseInt(ipArray[1], 10) << 16;
      num += parseInt(ipArray[2], 10) << 8;
      num += parseInt(ipArray[3], 10);
      num >>>= 0; // zero-fill right-shift, returns non-negative

      return num;
    };
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '15A', value: '' }, // Internet address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Internet address binary
        { type: '15A', value: '' }, // Network address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Network address binary
        { type: '10A', value: '' }, // Line description
        { type: '2A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Interface status
        { type: '10i0', value: 0 }, // Interface type of service
        { type: '10i0', value: 0 }, // Interface MTU
        { type: '10i0', value: 0 }, // Interface line type
        { type: '15A', value: '' }, // Host address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Host address binary
        { type: '15A', value: '' }, // Interface subnet mask
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Interface subnet mask binary
        { type: '15A', value: '' }, // Directed broadcast address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Directed broadcast address binary
        { type: '8A', value: '' }, // Change date
        { type: '6A', value: '' }, // Change time
        { type: '15A', value: '' }, // Associated local interface
        { type: '3A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Associated local interface binary
        { type: '10i0', value: 0 }, // Change status
        { type: '10i0', value: 0 }, // Packet rules
        { type: '10i0', value: 0 }, // Automatic start
        { type: '10i0', value: 0 }, // TRLAN bit sequencing
        { type: '10i0', value: 0 }, // Interface type
        { type: '10i0', value: 0 }, // Proxy ARP allowed
        { type: '10i0', value: 0 }, // Proxy ARP enabled
        { type: '10i0', value: 0 }, // Configured MTU
        { type: '24A', value: '' }, // Network name
        { type: '24A', value: '' }, // Interface name
        { type: '50A', value: '' }, // Alias name
        { type: '2A', value: '' }, // Reserved
        { type: '50A', value: '' }, // Interface description
        { type: '2A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Offset to preferred interface list
        { type: '10i0', value: 0 }, // Number of entries in preferred interface list
        { type: '10i0', value: 0 }, // Length of one preferred interface list entry
        { type: '10i0', value: 0 }, // DHCP created
        { type: '10i0', value: 0 }, // DHCP dynamic DNS updates
        { type: '20i0', value: 0 }, // DHCP lease expiration
        { type: '8A', value: '' }, // DHCP lease expiration - date
        { type: '6A', value: '' }, // DHCP lease expiration - time
        { type: '20i0', value: 0 }, // DHCP lease obtained
        { type: '8A', value: '' }, // DHCP lease obtained - date
        { type: '6A', value: '' }, // DHCP lease obtained - time
        { type: '10i0', value: 0 }, // Use DHCP unique identifier
        { type: '15A', value: '' }, // DHCP server IP address
        { type: '1A', value: '' }, // Reserved
        { type: '15h', value: '' }, // Preferred interface Internet address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Preferred interface Internet address binary
        { type: '1A', value: '' }, // Reserved
      ],
    };
    if (ipaddr === 'localhost') { address = '127.0.0.1'; }
    const request = {
      type: 'ds',
      fields: [
        { type: '10i0', value: '1' },
        { type: '10i0', value: IPToNum(address) },
      ],
    };
    const pgm = new ProgramCall('QTOCNETSTS', { lib: 'QSYS', func: 'QtocRtvNetIfcDta' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'NIFD0100' });
    pgm.addParam(request);
    pgm.addParam(this.errno);
    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
            Internet_address: data[2]._,
            Internet_address_binary: data[4]._,
            Network_address: data[5]._,
            Network_address_binary: data[7]._,
            Line_description: data[8]._,
            Interface_status: data[10]._,
            Interface_type_of_service: data[11]._,
            Interface_MTU: data[12]._,
            Interface_line_type: data[13]._,
            Host_address: data[14]._,
            Host_address_binary: data[16]._,
            Interface_subnet_mask: data[17]._,
            Interface_subnet_mask_binary: data[19]._,
            Directed_broadcast_address: data[20]._,
            Directed_broadcast_address_binary: data[22]._,
            Change_date: data[23]._,
            Change_time: data[24]._,
            Associated_local_interface: data[25]._,
            Associated_local_interface_binary: data[27]._,
            Change_status: data[28]._,
            Packet_rules: data[29]._,
            Automatic_start: data[30]._,
            TRLAN_bit_sequencing: data[31]._,
            Interface_type: data[32]._,
            Proxy_ARP_allowed: data[33]._,
            Proxy_ARP_enabled: data[34]._,
            Configured_MTU: data[35]._,
            Network_name: data[36]._,
            Interface_name: data[37]._,
            Alias_name: data[38]._,
            Interface_description: data[40]._,
            Offset_to_preferred_interface_list: data[42]._,
            Number_of_entries_in_preferred_interface_list: data[43]._,
            Length_of_one_preferred_interface_list_entry: data[44]._,
            DHCP_created: data[45]._,
            DHCP_dynamic_DNS_updates: data[46]._,
            DHCP_lease_expiration: data[47]._,
            'DHCP_lease_expiration_-_date': data[48]._,
            'DHCP_lease_expiration_-_time': data[49]._,
            DHCP_lease_obtained: data[50]._,
            'DHCP_lease_obtained_-_date': data[51]._,
            'DHCP_lease_obtained_-_time': data[52]._,
            Use_DHCP_unique_identifier: data[53]._,
            DHCP_server_IP_address: data[54]._,
            Preferred_interface_Internet_address: data[56]._,
            Preferred_interface_Internet_address_binary: data[58]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson); // Post the input XML and get the response.
  }
}

class iObj {
  /**
   * @deprecated Will be removed in the next major version.
   * @constructor
   * @param {Connection} conn - The Connection object.
   */
  constructor(conn) {
    iObjDeprecate('As of v1.0, class \'iObj\' is deprecated and will be removed at a later time.');
    if (!conn || !typeof conn === 'object') {
      throw new Error('Expected a Connection object');
    }

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
   * @callback addToLibraryListCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {boolean|null} output - This is true if successful or null when an error occurs.
   */

  /**
   * @description
   * Adds a library to the library list.
   * IBM i API: QLICHGLL
   * @deprecated Will be removed in the next major version.
   * @param {string} lib - The library to add.
   * @param {addToLibraryListCallback} cb - The callback function.
   */
  addToLibraryList(lib, cb) {
    iObjDeprecate('As of v1.0, \'iObj.addToLibraryList()\' is deprecated and will be removed at a later time.');
    const pgm = new ProgramCall('QLICHGLL', { lib: 'QSYS' });
    pgm.addParam({ type: '11A', value: '*SAME' });
    pgm.addParam({ type: '11A', value: '*SAME' });
    pgm.addParam({ type: '11A', value: '*SAME' });
    pgm.addParam({ type: '11A', value: lib });
    pgm.addParam({ type: '10i0', value: 1 });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
          rtValue = true;
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

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * retrUsrAuth Output Object
   * @typedef {object} retrUsrAuthOutput
   * @property {string} Object_authority_/_Data_authority
   * @property {string} Authorization_list_management
   * @property {string} Object_operational
   * @property {string} Object_management
   * @property {string} Object_existence
   * @property {string} Data_read
   * @property {string} Data_add
   * @property {string} Data_update
   * @property {string} Data_delete
   * @property {string} Authorization_list
   * @property {string} Authority_source
   * @property {string} Some_adopted_authority
   * @property {string} Adopted_object_authority
   * @property {string} Adopted_authorization_list_management
   * @property {string} Adopted_object_operational
   * @property {string} Adopted_object_management
   * @property {string} Adopted_object_existence
   * @property {string} Adopted_data_read
   * @property {string} Adopted_data_add
   * @property {string} Adopted_data_update
   * @property {string} Adopted_data_delete
   * @property {string} Adopted_data_execute
   * @property {string} Reserved
   * @property {string} Adopted_object_alter
   * @property {string} Adopted_object_reference
   * @property {string} Data_execute
   * @property {string} Object_alter
   * @property {string} Object_reference
   * @property {string} ASP_device_name_of_library
   * @property {string} ASP_device_name_of_object
   * @property {string} Offset_to_group_information_table
   * @property {string} Number_of_group_table_entries_returned
   */

  /**
   * @callback retrUsrAuthCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {retrUsrAuthOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * Retrieves a specific user's authority for an object.
   * IBM i API: QSYRUSRA
   * @deprecated Will be removed in the next major version.
   * @param {string} usr - The name of the user whose object authority is returned.
   * @param {string} type - The type of object for which authority information is returned.
   * @param {string} obj -  The object name.
   * @param {string} lib - The library name.
   * @param {retrUsrAuthCallback} cb - The callback function.
   */
  retrUsrAuth(usr, type, obj, lib = '*LIBL', cb) {
    iObjDeprecate('As of v1.0, \'iObj.retrUsrAuth()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Object authority / Data authority
        { type: '1A', value: '' }, // Authorization list management
        { type: '1A', value: '' }, // Object operational
        { type: '1A', value: '' }, // Object management
        { type: '1A', value: '' }, // Object existence
        { type: '1A', value: '' }, // Data read
        { type: '1A', value: '' }, // Data add
        { type: '1A', value: '' }, // Data update
        { type: '1A', value: '' }, // Data delete
        { type: '10A', value: '' }, // Authorization list
        { type: '2A', value: '' }, // Authority source
        { type: '1A', value: '' }, // Some adopted authority
        { type: '10A', value: '' }, // Adopted object authority
        { type: '1A', value: '' }, // Adopted authorization list management
        { type: '1A', value: '' }, // Adopted object operational
        { type: '1A', value: '' }, // Adopted object management
        { type: '1A', value: '' }, // Adopted object existence
        { type: '1A', value: '' }, // Adopted data read
        { type: '1A', value: '' }, // Adopted data add
        { type: '1A', value: '' }, // Adopted data update
        { type: '1A', value: '' }, // Adopted data delete
        { type: '1A', value: '' }, // Adopted data execute
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Adopted object alter
        { type: '1A', value: '' }, // Adopted object reference
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Data execute
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Object alter
        { type: '1A', value: '' }, // Object reference
        { type: '10A', value: '' }, // ASP device name of library
        { type: '10A', value: '' }, // ASP device name of object
        { type: '3A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Offset to group information table
        { type: '10i0', value: 0 }, // Number of group table entries returned
        { type: '48b', value: 0 }, // Group information table repeated for each of the user's groups
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: obj },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QSYRUSRA', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'USRA0100' });
    pgm.addParam({ type: '10A', value: usr });
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '10A', value: type });
    pgm.addParam(this.errno);
    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
            'Object_authority_/_Data_authority': data[2]._,
            Authorization_list_management: data[3]._,
            Object_operational: data[4]._,
            Object_management: data[5]._,
            Object_existence: data[6]._,
            Data_read: data[7]._,
            Data_add: data[8]._,
            Data_update: data[9]._,
            Data_delete: data[10]._,
            Authorization_list: data[11]._,
            Authority_source: data[12]._,
            Some_adopted_authority: data[13]._,
            Adopted_object_authority: data[14]._,
            Adopted_authorization_list_management: data[15]._,
            Adopted_object_operational: data[16]._,
            Adopted_object_management: data[17]._,
            Adopted_object_existence: data[18]._,
            Adopted_data_read: data[19]._,
            Adopted_data_add: data[20]._,
            Adopted_data_update: data[21]._,
            Adopted_data_delete: data[22]._,
            Adopted_data_execute: data[23]._,
            Reserved: data[24]._,
            Adopted_object_alter: data[25]._,
            Adopted_object_reference: data[26]._,
            // Reserved: data[27]._, // TODO: duplicate key
            Data_execute: data[28]._,
            // Reserved: data[29]._, // TODO: duplicate key
            Object_alter: data[30]._,
            Object_reference: data[31]._,
            ASP_device_name_of_library: data[32]._,
            ASP_device_name_of_object: data[33]._,
            // Reserved: data[34]._, // TODO: duplicate key
            Offset_to_group_information_table: data[35]._,
            Number_of_group_table_entries_returned: data[36]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * retrCmdInfo Output Object
   * @typedef {object} retrCmdInfoOutput
   * @property {string} Command_name
   * @property {string} Command_library_name
   * @property {string} Command_processing_program_or_proxy_target_command
   * @property {string} Command_processing_program's_or_proxy_target_command's_library name
   * @property {string} Source_file_name
   * @property {string} Source_file_library_name
   * @property {string} Source_file_member_name
   * @property {string} Validity_check_program_name
   * @property {string} Validity_check_program_library_name
   * @property {string} Mode_information
   * @property {string} Where_allowed_to_run
   * @property {string} Allow_limited_user
   * @property {string} Maximum_positional_parameters
   * @property {string} Prompt_message_file_name
   * @property {string} Prompt_message_file_library_name
   * @property {string} Message_file_name
   * @property {string} Message_file_library_name
   * @property {string} Help_panel_group_name
   * @property {string} Help_panel_group_library_name
   * @property {string} Help_identifier
   * @property {string} Search_index_name
   * @property {string} Search_index_library_name
   * @property {string} Current_library
   * @property {string} Product_library
   * @property {string} Prompt_override_program_name
   * @property {string} Prompt_override_program_library name
   * @property {string} Restricted_to_target_release
   * @property {string} Text_description
   * @property {string} Command_processing_program_call_state
   * @property {string} Validity_check_program_call_state
   * @property {string} Prompt_override_program_call_state
   * @property {string} Offset_to_help_bookshelf_information
   * @property {string} Length_of_help_bookshelf_information
   * @property {string} Coded_character_set_ID_(CCSID)
   * @property {string} Enabled_for_GUI_indicator
   * @property {string} Threadsafe_indicator
   * @property {string} Multithreaded_job_action
   * @property {string} Proxy_command_indicator
   * @property {string} Prompt_message_file_text_indicator
   * @property {string} Object_authority_/_Data_authority
   */

  /**
   * @callback retrCmdInfoCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {retrCmdInfoOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @description
   * Retrieves information from a command definition object.
   * IBM i API: QCDRCMDI
   * @deprecated Will be removed in the next major version.
   * @param {string} cmd - The command name.
   * @param {string} lib - The library name.
   * @param {retrCmdInfoCallback} cb - The callback function.
   */
  retrCmdInfo(cmd, lib = '*LIBL', cb) {
    iObjDeprecate('As of v1.0, \'iObj.retrCmdInfo()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Command name
        { type: '10A', value: '' }, // Command library name
        { type: '10A', value: '' }, // Command processing program or proxy target command
        { type: '10A', value: '' }, // Command processing program's or proxy target command's library name
        { type: '10A', value: '' }, // Source file name
        { type: '10A', value: '' }, // Source file library name
        { type: '10A', value: '' }, // Source file member name
        { type: '10A', value: '' }, // Validity check program name
        { type: '10A', value: '' }, // ]Validity check program library name
        { type: '10A', value: '' }, // ]Mode information
        { type: '15A', value: '' }, // ]Where allowed to run
        { type: '1A', value: '' }, // Allow limited user
        { type: '10i0', value: 0 }, // Maximum positional parameters
        { type: '10A', value: '' }, // Prompt message file name
        { type: '10A', value: '' }, // Prompt message file library name
        { type: '10A', value: '' }, // Message file name
        { type: '10A', value: '' }, // Message file library name
        { type: '10A', value: '' }, // Help panel group name
        { type: '10A', value: '' }, // Help panel group library name
        { type: '10A', value: '' }, // Help identifier
        { type: '10A', value: '' }, // Search index name
        { type: '10A', value: '' }, // Search index library name
        { type: '10A', value: '' }, // Current library
        { type: '10A', value: '' }, // Product library
        { type: '10A', value: '' }, // Prompt override program name
        { type: '10A', value: '' }, // Prompt override program library name
        { type: '6A', value: '' }, // Restricted to target release
        { type: '50A', value: '' }, // Text description
        { type: '2A', value: '' }, // Command processing program call state
        { type: '2A', value: '' }, // Validity check program call state
        { type: '2A', value: '' }, // Prompt override program call state
        { type: '10i0', value: 0 }, // Offset to help bookshelf information
        { type: '10i0', value: 0 }, // Length of help bookshelf information
        { type: '10i0', value: 0 }, // Coded character set ID (CCSID)
        { type: '1A', value: '' }, // Enabled for GUI indicator
        { type: '1A', value: '' }, // Threadsafe indicator
        { type: '1A', value: '' }, // Multithreaded job action
        { type: '1A', value: '' }, // Proxy command indicator
        { type: '1A', value: '' }, // Prompt message file text indicator
        { type: '13A', value: '' }, // Reserved
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: cmd },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QCDRCMDI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'CMDI0100' });
    pgm.addParam(qualifiedName);
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
            Command_name: data[2]._,
            Command_library_name: data[3]._,
            Command_processing_program_or_proxy_target_command: data[4]._,
            "Command_processing_program's_or_proxy_target_command's_library_name": data[5]._,
            Source_file_name: data[6]._,
            Source_file_library_name: data[7]._,
            Source_file_member_name: data[8]._,
            Validity_check_program_name: data[9]._,
            Validity_check_program_library_name: data[10]._,
            Mode_information: data[11]._,
            Where_allowed_to_run: data[12]._,
            Allow_limited_user: data[13]._,
            Maximum_positional_parameters: data[14]._,
            Prompt_message_file_name: data[15]._,
            Prompt_message_file_library_name: data[16]._,
            Message_file_name: data[17]._,
            Message_file_library_name: data[18]._,
            Help_panel_group_name: data[19]._,
            Help_panel_group_library_name: data[20]._,
            Help_identifier: data[21]._,
            Search_index_name: data[22]._,
            Search_index_library_name: data[23]._,
            Current_library: data[24]._,
            Product_library: data[25]._,
            Prompt_override_program_name: data[26]._,
            Prompt_override_program_library_name: data[27]._,
            Restricted_to_target_release: data[28]._,
            Text_description: data[29]._,
            Command_processing_program_call_state: data[30]._,
            Validity_check_program_call_state: data[31]._,
            Prompt_override_program_call_state: data[32]._,
            Offset_to_help_bookshelf_information: data[33]._,
            Length_of_help_bookshelf_information: data[34]._,
            'Coded_character_set_ID_(CCSID)': data[35]._,
            Enabled_for_GUI_indicator: data[36]._,
            Threadsafe_indicator: data[37]._,
            Multithreaded_job_action: data[38]._,
            Proxy_command_indicator: data[39]._,
            Prompt_message_file_text_indicator: data[40]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

 /**
   * retrPgmInfo Output Object
   * @typedef {object} retrPgmInfoOutput
   * @property {string} Program_name
   * @property {string} Program_library_name
   * @property {string} Program_owner
   * @property {string} Program_attribute
   * @property {string} Creation_date_and_time
   * @property {string} Source_file_name
   * @property {string} Source_file_library_name
   * @property {string} Source_file_member_name
   * @property {string} Source_file_updated_date_and_time
   * @property {string} Observable_information
   * @property {string} User_profile_option
   * @property {string} Use_adopted_authority
   * @property {string} Log_commands
   * @property {string} Allow_RTVCLSRC
   * @property {string} Fix_decimal_data
   * @property {string} Text description
   * @property {string} Type_of_program
   * @property {string} Teraspace_storage-enabled_program
   * @property {string} Reserved
   * @property {string} Minimum_number_of_parameters
   * @property {string} Maximum_number_of_parameters
   * @property {string} Program_size
   * @property {string} Associated_space_size
   * @property {string} Static_storage_size
   * @property {string} Automatic_storage_size
   * @property {string} Number_of_MI_instructions
   * @property {string} Number_of_MI_ODT_entries
   * @property {string} Program_state
   * @property {string} Compiler_identification
   * @property {string} Earliest_release_program_can_run
   * @property {string} Sort_sequence_table_name
   * @property {string} Sort_sequence_table_library name
   * @property {string} Language_identifier
   * @property {string} Program_domain
   * @property {string} Conversion_required
   * @property {string} Conversion_details
   * @property {string} Optimization
   * @property {string} Paging_pool
   * @property {string} Update_program_automatic_storage_area_(PASA)
   * @property {string} Clear_program_automatic_storage_area_(PASA)
   * @property {string} Paging_amount
   * @property {string} Program_entry_procedure_module
   * @property {string} Program_entry_procedure_module_library
   * @property {string} Activation_group_attribute
   * @property {string} Observable_information_compressed
   * @property {string} Run-time_information_compressed
   * @property {string} Release_program_created_on
   * @property {string} Shared_activation_group
   * @property {string} Allow_update
   * @property {string} Program_CCSID
   * @property {string} Number_of_modules
   * @property {string} Number_of_service_programs
   * @property {string} Number_of_copyrights
   * @property {string} Number_of_unresolved_references
   * @property {string} Release_program_created_for
   * @property {string} Allow_static_storage_reinitialization
   * @property {string} All_creation_data
   * @property {string} Allow_bound_*SRVPGM_library_name_update
   * @property {string} Profiling_data
   * @property {string} Teraspace_storage_enabled_modules
   * @property {string} Storage_model
   * @property {string} Uses_argument_optimization_(ARGOPT)
   */

  /**
   * @callback retrPgmInfoCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {retrPgmInfoOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @description
   * Retrieves information from a program object.
   * IBM i API: QCLRPGMI
   * @deprecated Will be removed in the next major version.
   * @param {string} _pgm - The program name.
   * @param {string} lib - The library name.
   * @param {retrPgmInfoCallback} cb - The callback function.
   */
  retrPgmInfo(_pgm, lib = '*LIBL', cb) {
    iObjDeprecate('As of v1.0, \'iObj.retrPgmInfo()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Program name
        { type: '10A', value: '' }, // Program library name
        { type: '10A', value: '' }, // Program owner
        { type: '10A', value: '' }, // Program attribute
        { type: '13A', value: '' }, // Creation date and time
        { type: '10A', value: '' }, // Source file name
        { type: '10A', value: '' }, // Source file library name
        { type: '10A', value: '' }, // Source file member name
        { type: '13A', value: '' }, // [10]Source file updated date and time
        { type: '1A', value: '' }, // Observable information
        { type: '1A', value: '' }, // User profile option
        { type: '1A', value: '' }, // Use adopted authority
        { type: '1A', value: '' }, // Log commands
        { type: '1A', value: '' }, // Allow RTVCLSRC
        { type: '1A', value: '' }, // Fix decimal data
        { type: '50A', value: '' }, // Text description
        { type: '1A', value: '' }, // Type of program
        { type: '1A', value: '' }, // Teraspace storage-enabled program
        { type: '58A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Minimum number of parameters
        { type: '10i0', value: 0 }, // Maximum number of parameters
        { type: '10i0', value: 0 }, // Program size
        { type: '10i0', value: 0 }, // Associated space size
        { type: '10i0', value: 0 }, // Static storage size
        { type: '10i0', value: 0 }, // Automatic storage size
        { type: '10i0', value: 0 }, // Number of MI instructions
        { type: '10i0', value: 0 }, // Number of MI ODT entries
        { type: '1A', value: '' }, // Program state
        { type: '14A', value: '' }, // Compiler identification
        { type: '6A', value: '' }, // Earliest release program can run
        { type: '10A', value: '' }, // Sort sequence table name
        { type: '10A', value: '' }, // Sort sequence table library name
        { type: '10A', value: '' }, // Language identifier
        { type: '1A', value: '' }, // Program domain
        { type: '1A', value: '' }, // Conversion required
        { type: '1A', value: '' }, // Conversion details
        { type: '19A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Optimization
        { type: '1A', value: '' }, // Paging pool
        { type: '1A', value: '' }, // Update program automatic storage area (PASA)
        { type: '1A', value: '' }, // Clear program automatic storage area (PASA)
        { type: '1A', value: '' }, // Paging amount
        { type: '18A', value: '' }, // Reserved
        { type: '10A', value: '' }, // Program entry procedure module
        { type: '10A', value: '' }, // Program entry procedure module library
        { type: '30A', value: '' }, // Activation group attribute
        { type: '1A', value: '' }, // Observable information compressed
        { type: '1A', value: '' }, // Run-time information compressed
        { type: '6A', value: '' }, // Release program created on
        { type: '1A', value: '' }, // Shared activation group
        { type: '1A', value: '' }, // Allow update
        { type: '10i0', value: 0 }, // Program CCSID
        { type: '10i0', value: 0 }, // Number of modules
        { type: '10i0', value: 0 }, // Number of service programs
        { type: '10i0', value: 0 }, // Number of copyrights
        { type: '10i0', value: 0 }, // Number of unresolved references
        { type: '6A', value: '' }, // Release program created for
        { type: '1A', value: '' }, // Allow static storage reinitialization
        { type: '1A', value: '' }, // All creation data
        { type: '1A', value: '' }, // Allow bound *SRVPGM library name update
        { type: '10A', value: '' }, // Profiling data
        { type: '1A', value: '' }, // Teraspace storage enabled modules
        { type: '1A', value: '' }, // Storage model
        { type: '10A', value: '' }, // Uses argument optimization (ARGOPT)
        { type: '77A', value: '' }, // Reserved
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: _pgm },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QCLRPGMI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'PGMI0100' });
    pgm.addParam(qualifiedName);
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
            Program_name: data[2]._,
            Program_library_name: data[3]._,
            Program_owner: data[4]._,
            Program_attribute: data[5]._,
            Creation_date_and_time: data[6]._,
            Source_file_name: data[7]._,
            Source_file_library_name: data[8]._,
            Source_file_member_name: data[9]._,
            Source_file_updated_date_and_time: data[10]._,
            Observable_information: data[11]._,
            User_profile_option: data[12]._,
            Use_adopted_authority: data[13]._,
            Log_commands: data[14]._,
            Allow_RTVCLSRC: data[15]._,
            Fix_decimal_data: data[16]._,
            Text_description: data[17]._,
            Type_of_program: data[18]._,
            'Teraspace_storage-enabled_program': data[19]._,
            Reserved: data[20]._,
            Minimum_number_of_parameters: data[21]._,
            Maximum_number_of_parameters: data[22]._,
            Program_size: data[23]._,
            Associated_space_size: data[24]._,
            Static_storage_size: data[25]._,
            Automatic_storage_size: data[26]._,
            Number_of_MI_instructions: data[27]._,
            Number_of_MI_ODT_entries: data[28]._,
            Program_state: data[29]._,
            Compiler_identification: data[30]._,
            Earliest_release_program_can_run: data[31]._,
            Sort_sequence_table_name: data[32]._,
            Sort_sequence_table_library_name: data[33]._,
            Language_identifier: data[34]._,
            Program_domain: data[35]._,
            Conversion_required: data[36]._,
            Conversion_details: data[37]._,
            // Reserved: data[38]._, // TODO: duplicate
            Optimization: data[39]._,
            Paging_pool: data[40]._,
            'Update_program_automatic_storage_area_(PASA)': data[41]._,
            'Clear_program_automatic_storage_area_(PASA)': data[42]._,
            Paging_amount: data[43]._,
            // Reserved: data[38]._, // TODO: duplicate
            Program_entry_procedure_module: data[45]._,
            Program_entry_procedure_module_library: data[46]._,
            Activation_group_attribute: data[47]._,
            Observable_information_compressed: data[48]._,
            'Run-time_information_compressed': data[49]._,
            Release_program_created_on: data[50]._,
            Shared_activation_group: data[51]._,
            Allow_update: data[52]._,
            Program_CCSID: data[53]._,
            Number_of_modules: data[54]._,
            Number_of_service_programs: data[55]._,
            Number_of_copyrights: data[56]._,
            Number_of_unresolved_references: data[57]._,
            Release_program_created_for: data[58]._,
            Allow_static_storage_reinitialization: data[59]._,
            All_creation_data: data[60]._,
            'Allow_bound_*SRVPGM_library_name_update': data[61]._,
            Profiling_data: data[62]._,
            Teraspace_storage_enabled_modules: data[63]._,
            Storage_model: data[64]._,
            'Uses_argument_optimization_(ARGOPT)': data[65]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * retrSrvPgmInfo Output Object
   * @typedef {object} retrSrvPgmInfoOutput
   * @property {string} Service_program_name
   * @property {string} Service_program_library_name
   * @property {string} Service_program_owner
   * @property {string} Service_program_attribute
   * @property {string} Creation_date_and_time
   * @property {string} Export_source_file_name
   * @property {string} Export_source_file_library_name
   * @property {string} Export_source_file_member_name
   * @property {string} Activation_group_attribute
   * @property {string} Current_export_signature
   * @property {string} User_profile
   * @property {string} Observable_information_compressed
   * @property {string} Run-time_information_compressed
   * @property {string} Service_program_CCSID
   * @property {string} Number_of_modules
   * @property {string} Number_of_service_programs
   * @property {string} Number_of_copyrights
   * @property {string} Text_description
   * @property {string} Shared_activation_group
   * @property {string} Allow_update
   * @property {string} Number_of_unresolved_references
   * @property {string} Use_adopted_authority
   * @property {string} Allow_bound_*SRVPGM_library_name_update
   * @property {string} Profiling_data
   * @property {string} Teraspace_storage_enabled_modules
   * @property {string} Storage_model
   * @property {string} Uses_argument_optimization_(ARGOPT)
   * @property {string} Reserved_'00'X
   * @property {string} Service_program_state
   * @property {string} Service program_domain
   * @property {string} Associated_space_size
   * @property {string} Static_storage_size
   * @property {string} Service_program_size
   * @property {string} Release_service_program_created_on
   * @property {string} Earliest_release_service_program_can_run
   * @property {string} Release_service_program_created_for
   * @property {string} Allow_static_storage_reinitialization
   * @property {string} Conversion_required
   * @property {string} All_creation_data
   * @property {string} Conversion_details
   * @property {string} Reserved
   * @property {string} Paging_pool
   * @property {string} Paging_amount
   */

  /**
   * @callback retrSrvPgmInfoCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {retrSrvPgmInfoOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * Retrieves information from a service program object.
   * IBM i API: QBNRSPGM
   * @deprecated Will be removed in the next major version.
   * @param {string} srvpgm - The service program name.
   * @param {string} lib - The library name.
   * @param {retrSrvPgmInfoCallback} cb - THe callback function.
   */
  retrSrvPgmInfo(srvpgm, lib = '*LIB', cb) {
    iObjDeprecate('As of v1.0, \'iObj.retrSrvPgmInfo()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Service program name
        { type: '10A', value: '' }, // Service program library name
        { type: '10A', value: '' }, // Service program owner
        { type: '10A', value: '' }, // Service program attribute
        { type: '13A', value: '' }, // Creation date and time
        { type: '10A', value: '' }, // Export source file name
        { type: '10A', value: '' }, // Export source file library name
        { type: '10A', value: '' }, // Export source file member name
        { type: '30A', value: '' }, // ]Activation group attribute
        { type: '16A', value: '' }, // ]Current export signature
        { type: '1A', value: '' }, // User profile
        { type: '1A', value: '' }, // Observable information compressed
        { type: '1A', value: '' }, // Run-time information compressed
        { type: '10i0', value: 0 }, // Service program CCSID
        { type: '10i0', value: 0 }, // Number of modules
        { type: '10i0', value: 0 }, // Number of service programs
        { type: '10i0', value: 0 }, // Number of copyrights
        { type: '50A', value: '' }, // Text description
        { type: '1A', value: '' }, // Shared activation group
        { type: '1A', value: '' }, // Allow update
        { type: '10i0', value: 0 }, // [22]Number of unresolved references
        { type: '1A', value: '' }, // Use adopted authority
        { type: '1A', value: '' }, // Allow bound *SRVPGM library name update
        { type: '10A', value: '' }, // Profiling data
        { type: '1A', value: '' }, // Teraspace storage enabled modules
        { type: '1A', value: '' }, // Storage model
        { type: '10A', value: '' }, // Uses argument optimization (ARGOPT)
        { type: '70A', value: '' }, // Reserved '00'X
        { type: '1A', value: '' }, // Service program state
        { type: '1A', value: '' }, // Service program domain
        { type: '10i0', value: 0 }, // Associated space size
        { type: '10i0', value: 0 }, // Static storage size
        { type: '10i0', value: 0 }, // Service program size
        { type: '6A', value: '' }, // Release service program created on
        { type: '6A', value: '' }, // Earliest release service program can run
        { type: '6A', value: '' }, // Release service program created for
        { type: '1A', value: '' }, // Allow static storage reinitialization
        { type: '1A', value: '' }, // Conversion required
        { type: '1A', value: '' }, // All creation data
        { type: '1A', value: '' }, // Conversion details
        { type: '90A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Paging pool
        { type: '1A', value: '' }, // Paging amount
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: srvpgm },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QBNRSPGM', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'SPGI0100' });
    pgm.addParam(qualifiedName);
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
            Service_program_name: data[2]._,
            Service_program_library_name: data[3]._,
            Service_program_owner: data[4]._,
            Service_program_attribute: data[5]._,
            Creation_date_and_time: data[6]._,
            Export_source_file_name: data[7]._,
            Export_source_file_library_name: data[8]._,
            Export_source_file_member_name: data[9]._,
            Activation_group_attribute: data[10]._,
            Current_export_signature: data[11]._,
            User_profile: data[12]._,
            Observable_information_compressed: data[13]._,
            'Run-time_information_compressed': data[14]._,
            Service_program_CCSID: data[15]._,
            Number_of_modules: data[16]._,
            Number_of_service_programs: data[17]._,
            Number_of_copyrights: data[18]._,
            Text_description: data[19]._,
            Shared_activation_group: data[20]._,
            Allow_update: data[21]._,
            Number_of_unresolved_references: data[22]._,
            Use_adopted_authority: data[23]._,
            'Allow_bound_*SRVPGM_library_name_update': data[24]._,
            Profiling_data: data[25]._,
            Teraspace_storage_enabled_modules: data[26]._,
            Storage_model: data[27]._,
            'Uses_argument_optimization_(ARGOPT)': data[28]._,
            "Reserved_'00'X": data[29]._,
            Service_program_state: data[30]._,
            Service_program_domain: data[31]._,
            Associated_space_size: data[32]._,
            Static_storage_size: data[33]._,
            Service_program_size: data[34]._,
            Release_service_program_created_on: data[35]._,
            Earliest_release_service_program_can_run: data[36]._,
            Release_service_program_created_for: data[37]._,
            Allow_static_storage_reinitialization: data[38]._,
            Conversion_required: data[39]._,
            All_creation_data: data[40]._,
            Conversion_details: data[41]._,
            Reserved: data[42]._,
            Paging_pool: data[43]._,
            Paging_amount: data[44]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * retrUserInfo Output Object
   * @typedef {object} retrUserInfoOutput
   * @property {string} User_profile_name
   * @property {string} Previous_sign-on_date_and_time
   * @property {string} Sign-on_attempts_not_valid
   * @property {string} Status
   * @property {string} Password_change_date
   * @property {string} No_password_indicator
   * @property {string} Reserved
   * @property {string} Password_expiration_interval
   * @property {string} Date_password_expires
   * @property {string} Days_until_password_expires
   * @property {string} Set_password_to_expire
   * @property {string} Display_sign-on_information
   * @property {string} Local_password_management
   * @property {string} Block_password_change
   */

  /**
   * @callback retrUserInfoCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {retrUserInfoOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * Retrieves information about a user profile.
   * IBM i API: QSYRUSRI
   * @deprecated Will be removed in the next major version.
   * @param {string} user - The user profile.
   * @param {retrUserInfoCallback} cb - The callback function.
   */
  retrUserInfo(user, cb) {
    iObjDeprecate('As of v1.0, \'iObj.retrUserInfo()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // User profile name
        { type: '13A', value: '' }, // Previous sign-on date and time
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Sign-on attempts not valid
        { type: '10A', value: '' }, // Status
        { type: '8A', value: '' }, // Password change date
        { type: '1A', value: '' }, // No password indicator
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Password expiration interval
        { type: '8A', value: '' }, // Date password expires
        { type: '10i0', value: 0 }, // Days until password expires
        { type: '1A', value: '' }, // Set password to expire
        { type: '10A', value: '' }, // Display sign-on information
        { type: '1A', value: '' }, // Local password management
        { type: '10A', value: '' }, // Block password change
      ],
    };
    const pgm = new ProgramCall('QSYRUSRI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'USRI0100' });
    pgm.addParam({ type: '10A', value: user });
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
            User_profile_name: data[2]._,
            'Previous_sign-on_date_and_time': data[3]._,
            // Reserved: data[4]._, // TODO: This is a duplicate
            'Sign-on_attempts_not_valid': data[5]._,
            Status: data[6]._,
            Password_change_date: data[7]._,
            No_password_indicator: data[8]._,
            Reserved: data[9]._,
            Password_expiration_interval: data[10]._,
            Date_password_expires: data[11]._,
            Days_until_password_expires: data[12]._,
            Set_password_to_expire: data[13]._,
            'Display_sign-on_information': data[14]._,
            Local_password_management: data[15]._,
            Block_password_change: data[16]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * retrUserAuthToObj Output Object
   * @typedef {object} retrUserAuthToObjOutput
   * @property {string} Profile_name
   * @property {string} User_or_group indicator
   * @property {string} Data_authority
   * @property {string} Authorization_list_management
   * @property {string} Object_management
   * @property {string} Object_existence
   * @property {string} Object_alter
   * @property {string} Object_reference
   * @property {string} Reserved
   * @property {string} Object_operational
   * @property {string} Data_read
   * @property {string} Data_add
   * @property {string} Data_update
   * @property {string} Data_delete
   * @property {string} Data_execute
   */

  /**
   * @callback retrUserAuthToObjCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {retrUserAuthToObjOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * Retrieves information about the users who are authorized to an object.
   * IBM i API: QSYRTVUA
   * @deprecated Will be removed in the next major version.
   * @param {string} path - The absolute path to the object.
   * @param {retrUserAuthToObjCallback} cb - The callback function.
   */
  retrUserAuthToObj(path, cb) {
    iObjDeprecate('As of v1.0, \'iObj.retrUserAuthToObj()\' is deprecated and will be removed at a later time.');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10A', value: '' }, // Profile name
        { type: '1A', value: '' }, // User or group indicator
        { type: '10A', value: '' }, // Data authority
        { type: '1A', value: '' }, // Authorization list management
        { type: '1A', value: '' }, // Object management
        { type: '1A', value: '' }, // Object existence
        { type: '1A', value: '' }, // Object alter
        { type: '1A', value: '' }, // Object reference
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // bject operational
        { type: '1A', value: '' }, // Data read
        { type: '1A', value: '' }, // Data add
        { type: '1A', value: '' }, // Data update
        { type: '1A', value: '' }, // Data delete
        { type: '1A', value: '' }, // Data execute
        { type: '10A', value: '' }, // Reserved
      ],
    };
    const feedBack = {
      type: 'ds',
      io: 'out',
      len: 'rec3',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned in the returned records feedback information
        { type: '10i0', value: 0 }, // Bytes available in the returned records feedback information
        { type: '10i0', value: 0 }, // Bytes returned in the receiver variable
        { type: '10i0', value: 0 }, // Bytes available in the receiver variable
        { type: '10i0', value: 0 }, // Number of authorized users
        { type: '10i0', value: 0 }, // Entry length for each authorized user returned
        { type: '10A', value: '' }, // Owner
        { type: '10A', value: '' }, // Primary group
        { type: '10A', value: '' }, // Authorization list
        { type: '1A', value: '' }, // Sensitivity level
      ],
    };

    const pgm = new ProgramCall('QSYRTVUA', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam(feedBack);
    pgm.addParam({ type: '10i0', setlen: 'rec3', value: 0 });
    pgm.addParam({ type: '8A', value: 'RTUA0100' });
    pgm.addParam({ type: `${path.length}A`, value: path });
    pgm.addParam({ type: '10i0', value: path.length });
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
            Profile_name: data[0]._,
            User_or_group_indicator: data[1]._,
            Data_authority: data[2]._,
            Authorization_list_management: data[3]._,
            Object_management: data[4]._,
            Object_existence: data[5]._,
            Object_alter: data[6]._,
            Object_reference: data[7]._,
            Reserved: data[8]._,
            Object_operational: data[9]._,
            Data_read: data[10]._,
            Data_add: data[11]._,
            Data_update: data[12]._,
            Data_delete: data[13]._,
            Data_execute: data[14]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }
}

class iProd {
  /**
   * @deprecated Will be removed in the next major version.
   * @constructor
   * @param {Connection} conn - The Connection object.
   */
  constructor(conn) {
    iProdDeprecate('As of v1.0, class \'iProd\' is deprecated and will be removed at a later time.');
    if (!conn || !typeof conn === 'object') {
      throw new Error('Expected a Connection object');
    }

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
   * getPTFInfo Output Object
   * @typedef {object} getPTFInfoOutput
   * @property {string} Product_ID
   * @property {string} PTF_ID
   * @property {string} Release_level
   * @property {string} Product_option
   * @property {string} Load_ID
   * @property {string} Loaded_status
   * @property {string} Cover_letter_status
   * @property {string} On-order_status
   * @property {string} Save_file_status
   * @property {string} File_name
   * @property {string} File_library_name
   * @property {string} PTF_type
   * @property {string} IPL_action
   * @property {string} Action_pending
   * @property {string} Action_required
   * @property {string} PTF_is_released
   * @property {string} Target_release
   * @property {string} Superseding_PTF
   * @property {string} Current_IPL_source
   * @property {string} Minimum_level
   * @property {string} Maximum_level
   * @property {string} Format_information_available
   * @property {string} Status_date_and_time
   * @property {string} Licensed_Internal_Code_group
   * @property {string} Superseded_by_PTF_ID
   * @property {string} Current_server_IPL_source
   * @property {string} Server_IPL_required
   * @property {string} Creation_date_and_time
   * @property {string} Technology_refresh_PTF
   * @property {string} Reserved
   */

  /**
   * @callback getPTFInfoCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getPTFInfoOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @description
   * Get the load status of specified PTF.
   * IBM i API: QPZRTVFX
   * @deprecated Will be removed in the next major version.
   * @param {string} PTFID - The PTF number to be queried
   * @param {getPTFInfoCallback} cb - The callback function.
   */
  getPTFInfo(PTFID, cb) {
    iProdDeprecate('As of v1.0, \'iProd.getPTFInfo()\' is deprecated and will be removed at a later time');
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Offset to additional information
        { type: '7A', value: '' }, // Product ID
        { type: '7A', value: '' }, // PTF ID
        { type: '6A', value: '' }, // Release level
        { type: '4A', value: '' }, // Product option
        { type: '4A', value: '' }, // Load ID
        { type: '1A', value: '' }, // Loaded status
        { type: '1A', value: '' }, // Cover letter status
        { type: '1A', value: '' }, // On-order status
        { type: '1A', value: '' }, // Save file status
        { type: '10A', value: '' }, // File name
        { type: '10A', value: '' }, // File library name
        { type: '1A', value: '' }, // PTF type
        { type: '1A', value: '' }, // IPL action
        { type: '1A', value: '' }, // Action pending
        { type: '1A', value: '' }, // Action required
        { type: '1A', value: '' }, // PTF is released
        { type: '6A', value: '' }, // Target release
        { type: '7A', value: '' }, // Superseding PTF
        { type: '1A', value: '' }, // Current IPL source
        { type: '2A', value: '' }, // Minimum level
        { type: '2A', value: '' }, // Maximum level
        { type: '1A', value: '' }, // Format information available
        { type: '13A', value: '' }, // Status date and time
        { type: '7A', value: '' }, // Licensed Internal Code group
        { type: '7A', value: '' }, // Superseded by PTF ID
        { type: '1A', value: '' }, // Current server IPL source
        { type: '1A', value: '' }, // Server IPL required
        { type: '13A', value: '' }, // Creation date and time
        { type: '1A', value: '' }, // Technology refresh PTF
        { type: '1A', value: '' }, // Reserved
      ],
    };

    const PTFInfo = {
      type: 'ds',
      fields: [
        { type: '7A', value: PTFID }, // PTF ID
        { type: '7A', value: '*ONLY' }, // Product ID
        { type: '6A', value: '' }, // Release level
        { type: '10i0', value: '' }, // CCSID for returned directory names
        { type: '1A', value: '0' }, // Close PTF database files
        { type: '25A', value: '' }, // Reserved
      ],
    };

    const pgm = new ProgramCall('QPZRTVFX', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam(PTFInfo);
    pgm.addParam({ type: '8A', value: 'PTFR0100' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
          cb(null);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Product_ID: data[3]._,
            PTF_ID: data[4]._,
            Release_level: data[5]._,
            Product_option: data[6]._,
            Load_ID: data[7]._,
            Loaded_status: data[8]._,
            Cover_letter_status: data[9]._,
            'On-order_status': data[10]._,
            Save_file_status: data[11]._,
            File_name: data[12]._,
            File_library_name: data[13]._,
            PTF_type: data[14]._,
            IPL_action: data[15]._,
            Action_pending: data[16]._,
            Action_required: data[17]._,
            PTF_is_released: data[18]._,
            Target_release: data[19]._,
            Superseding_PTF: data[20]._,
            Current_IPL_source: data[21]._,
            Minimum_level: data[22]._,
            Maximum_level: data[23]._,
            Format_information_available: data[24]._,
            Status_date_and_time: data[25]._,
            Licensed_Internal_Code_group: data[26]._,
            Superseded_by_PTF_ID: data[27]._,
            Current_server_IPL_source: data[28]._,
            Server_IPL_required: data[29]._,
            Creation_date_and_time: data[30]._,
            Technology_refresh_PTF: data[31]._,
            Reserved: data[32]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * getProductInfo Output Object
   * @typedef {object} getProductInfoOutput
   * @property {string} Product_ID
   * @property {string} Release_level
   * @property {string} Product_option
   * @property {string} Load_ID
   * @property {string} Loaded_type
   * @property {string} Symbolic_load_state
   * @property {string} Load_error_indicator
   * @property {string} Load_state
   * @property {string} Supported_flag
   * @property {string} Registration_type
   * @property {string} Registration_value
   * @property {string} Offset_to_additional_information
   * @property {string} Primary_language_load_identifier
   * @property {string} Minimum_target_release
   * @property {string} Minimum_VRM_of_*BASE_required_by_option
   * @property {string} Requirements_met_between_base_and_option_value
   * @property {string} Level
   * @property {string} Reserved
   */

  /**
   * @callback getProductInfoCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getProductInfoOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @description
   * Get the status of the specified product.
   * IBM i API: QSZRTVPR
   * @deprecated Will be removed in the next major version.
   * @param {string} prodID - The product id.
   * @param {number} [option] - The product option.
   * @param {getProductInfoCallback} cb - The callback function.
   */
  getProductInfo(prodID, option, cb) {
    iProdDeprecate('As of v1.0, \'iProd.getProductInfo()\' is deprecated and will be removed at a later time');
    let callback = cb;
    let prodOption;
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { value: 0, type: '10i0' }, // Bytes returned
        { value: 0, type: '10i0' }, // Bytes available
        { value: 0, type: '10i0' }, // Reserved
        { type: '7A', value: '' }, // Product ID
        { type: '6A', value: '' }, // Release level
        { type: '4A', value: '' }, // Product option
        { type: '4A', value: '' }, // Load ID
        { type: '10A', value: '' }, // Load type
        { type: '10A', value: '' }, // Symbolic load state
        { type: '10A', value: '' }, // Load error indicator
        { type: '2A', value: '' }, // Load state
        { type: '1A', value: '' }, // Supported flag
        { type: '2A', value: '' }, // Registration type
        { type: '14A', value: '' }, // Registration value
        { type: '2A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Offset to additional information
        { type: '4A', value: '' }, // Primary language load identifier
        { type: '6A', value: '' }, // Minimum target release
        { type: '6A', value: '' }, // Minimum VRM of *BASE required by option
        { type: '1A', value: '' }, // Requirements met between base and option value
        { type: '3A', value: '' }, // Level
        { type: '1A', value: '' }, // Reserved
      ],
    };
    if (!cb) { // If we do not get the third param,
      if (option) { // If we get two params,
        if (typeof option === 'function') { // If it is a function,
          callback = option; // then it is the callback.
          prodOption = '0000';
        }
      } else { // If we have only one param,
        prodOption = '0000'; // then use *BASE as default.
      }
    }

    if (Number.isInteger(option)) {
      if (option < 0 || option > 99) {
        prodOption = '0000';
      } else if (prodOption < 10) {
        prodOption = `000${option}`;
      } else {
        prodOption = `00${option}`;
      }
    }

    const ProdInfo = {
      type: 'ds',
      fields: [
        { type: '7A', value: prodID },
        { type: '6A', value: '*ONLY' },
        { type: '4A', value: prodOption },
        { type: '10A', value: '*CODE' },
      ],
    };

    const pgm = new ProgramCall('QSZRTVPR', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'PRDR0100' });
    pgm.addParam(ProdInfo);
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          callback(transportError, null);
          return;
        }
        callback(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            callback(parseError, null);
            return;
          }
          callback(null);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];

          rtValue = {
            // Reserved: data[2]._, // TODO: Duplicate key
            Product_ID: data[3]._,
            Release_level: data[4]._,
            Product_option: data[5]._,
            Load_ID: data[6]._,
            Load_type: data[7]._,
            Symbolic_load_state: data[8]._,
            Load_error_indicator: data[9]._,
            Load_state: data[10]._,
            Supported_flag: data[11]._,
            Registration_type: data[12]._,
            Registration_value: data[13]._,
            // Reserved: data[14]._, // TODO: Duplicate key
            Offset_to_additional_information: data[15]._,
            Primary_language_load_identifier: data[16]._,
            Minimum_target_release: data[17]._,
            'Minimum_VRM_of_*BASE_required_by_option': data[18]._,
            Requirements_met_between_base_and_option_value: data[19]._,
            Level: data[20]._,
            Reserved: data[21]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          callback(null, rtValue);
          return;
        }
        callback(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * getInstalledProducts Output Object
   * @typedef {object} getInstalledProductsOutput
   * @property {string} Product_ID
   * @property {string} Product_option
   * @property {string} Release_level
   * @property {string} Description_text_message_ID
   * @property {string} Description_text_object_name
   * @property {string} Description_text_library_name
   * @property {string} Installed_flag
   * @property {string} Supported_flag
   * @property {string} Registration_type
   * @property {string} Registration_value
   * @property {string} Description_text
   */

  /**
   * @callback getInstalledProductsCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getInstalledProductsOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @description
   * Get the list of all installed products.
   * IBM i API: QSZSLTPR
   * @deprecated Will be removed in the next major version.
   * @param {getInstalledProductsCallback} cb - the callback function
   */
  getInstalledProducts(cb) {
    iProdDeprecate('As of v1.0, \'iProd.getInstalledProducts()\' is deprecated and will be removed at a later time');
    const maxProd = 197;
    const outBuf = {
      type: 'ds',
      io: 'out',
      fields: [],
    };
    for (let i = 0; i < maxProd; i += 1) {
      outBuf.fields.push({ type: '7A', value: '' }); // Product ID
      outBuf.fields.push({ type: '5A', value: '' }); // Product option
      outBuf.fields.push({ type: '6A', value: '' }); // Release level
      outBuf.fields.push({ type: '2h', value: '' }); // Skip
      outBuf.fields.push({ type: '7A', value: '' }); // Description text message ID
      outBuf.fields.push({ type: '10A', value: '' }); // Description text object name
      outBuf.fields.push({ type: '10A', value: '' }); // Description text library name
      outBuf.fields.push({ type: '1A', value: '' }); // Installed flag
      outBuf.fields.push({ type: '1A', value: '' }); // Supported flag
      outBuf.fields.push({ type: '2A', value: '' }); // Registration type
      outBuf.fields.push({ type: '14A', value: '' }); // Registration value
      outBuf.fields.push({ type: '132A', value: '' }); // Description text
    }
    const inputInfo = {
      type: 'ds',
      fields: [
        { type: '10i0', value: maxProd },
        { type: '10A', value: '*ALL' },
        { value: '1', type: '1A' },
        { value: '1', type: '1A' },
        { type: '10A', value: '*ALL' },
        { type: '10A', value: '*INSTLD' },
        { type: '10i0', value: maxProd },
      ],
    };
    const ProdInfo = {
      type: 'ds',
      fields: [
        { type: '7A', value: '' },
        { type: '5A', value: '' },
        { type: '6A', value: '' },
      ],
    };
    const OutputInfo = {
      type: 'ds',
      io: 'out',
      fields: [
        { type: '10i0', value: 0 },
        { type: '10i0', value: 0 },
        { type: '10i0', value: 0 },
      ],
    };
    const pgm = new ProgramCall('QSZSLTPR', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam(inputInfo);
    pgm.addParam({ type: '8A', value: 'PRDS0200' });
    pgm.addParam(ProdInfo);
    pgm.addParam(OutputInfo);
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue = []; // The returned value.
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
          const count = result.myscript.pgm[0].parm[4].ds[0].data[1]._;

          for (let i = 0; i < count * 12; i += 12) {
            rtValue.push({
              Product_ID: data[i]._,
              Product_option: data[i + 1]._,
              Release_level: data[i + 2]._,
              Description_text_message_ID: data[i + 4]._,
              Description_text_object_name: data[i + 5]._,
              Description_text_library_name: data[i + 6]._,
              Installed_flag: data[i + 7]._,
              Supported_flag: data[i + 8]._,
              Registration_type: data[i + 9]._,
              Registration_value: data[i + 10]._,
              Description_text: data[i + 11]._,
            });
          }
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }
}

class iUserSpace {
  /**
   * @deprecated Will be removed in the next major version.
   * @constructor
   * @param {Connection} conn - The Connection object.
   */
  constructor(conn) {
    iUserSpaceDeprecate('As of v1.0, class \'iUserSpace\' is deprecated and will be removed at a later time.');
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
   * @callback createUserSpaceCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {boolean|null} output - This is true if successful or null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Create a new user space.
   * IBM i API: QUSCRTUS
   * @param {string} name - The user space name. (10 characters max).
   * @param {string} lib - The library name.
   * @param {string} attr - The extended attribute of the user space (11 characters max).
   * @param {number} size - The initial size of the user space.
   * @param {string} auth - The authority to the user space.
   * @param {string} desc - The description of the user space (50 characters max).
   * @param {createUserSpaceCallback} cb
   */
  createUserSpace(name, lib, attr, size, auth, desc, cb) {
    iUserSpaceDeprecate('As of v1.0, \'iUserSpace.createUserSpace()\' is deprecated and will be removed at a later time.');
    const pgm = new ProgramCall('QUSCRTUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '11A', value: attr === '' ? 'LOG' : attr });
    pgm.addParam({ type: '10i0', value: size === '' ? 50 : size });
    pgm.addParam({ type: '1A', value: 0 });
    pgm.addParam({ type: '10A', value: auth === '' ? '*USE' : auth });
    pgm.addParam({ type: '50A', value: desc });
    pgm.addParam({ type: '10A', value: '*NO' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

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
          rtValue = true;
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

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * @callback setUserSpaceDataCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {boolean|null} output - This is true if successful or null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Set the content of the user space.
   * IBM i API: QUSCHGUS
   * @param {string} name - The user space name.
   * @param {string} lib - The library name.
   * @param {string} length -Tthe length of the data to set.
   * @param {string} msg - The data to set.
   * @param {setUserSpaceDataCallback} cb - The callback function.
   */
  setUserSpaceData(name, lib, length, msg, cb) {
    iUserSpaceDeprecate('As of v1.0, \'iUserSpace.setUserSpaceData()\' is deprecated and will be removed at a later time.');
    const pgm = new ProgramCall('QUSCHGUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '10i0', value: 1 });
    pgm.addParam({ type: '10i0', value: length });
    pgm.addParam({ type: `${length}A`, value: msg });
    pgm.addParam({ type: '1A', value: 0 });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
          rtValue = true;
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

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * @callback  getUserSpaceDataCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {string|null} output - This is the output from the user space if successful
   *  or null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Get the content of the user space.
   * IBM i API: QUSRTVUS
   * @param {string} name - The user space name.
   * @param {string} lib - The library name.
   * @param {string} length - The length of the data to retrieve.
   * @param {getUserSpaceDataCallback} cb - The callback function.
   */
  getUserSpaceData(name, lib, length, cb) {
    iUserSpaceDeprecate('As of v1.0, \'iUserSpace.getUserSpaceData()\' is deprecated ad will be removed at a later time.');
    const pgm = new ProgramCall('QUSRTVUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '10i0', value: 1 });
    pgm.addParam({ type: '10i0', value: length });
    pgm.addParam({ type: `${length}A`, io: 'out', value: '' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
          const { data } = result.myscript.pgm[0].parm[3];
          rtValue = data[0]._;
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

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  /**
   * @callback deleteUserSpaceCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {boolean|null} output - This is true if successful or null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Delete the user space.
   * IBM i API: QUSDLTUS
   * @param {string} name - The user space name.
   * @param {string} lib - The library name.
   * @param {deleteUserSpaceCallback} cb - The callback function.
   */
  deleteUserSpace(name, lib, cb) {
    iUserSpaceDeprecate('As of v1.0, \'iUserSpace.deleteUserSpace()\' is deprecated and will be removed at a later time');
    const pgm = new ProgramCall('QUSDLTUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

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
          rtValue = true;
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }
}

class iWork {
  /**
   * @deprecated Will be removed in the next major version.
   * @constructor
   * @param {Connection} conn - The Connection object.
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
   * @callback  getSysValueCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {string|null} output - This is the system value if successful
   *  or null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Get the specified system value.
   * IBM i API: QWCRSVAL
   * @param {string} sysValue - The system value.
   * @param {getSysValueCallback} cb - The callback function.
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
   * getSysStatus Output Object
   * @typedef {object} getSysStatusOutput
   * @property {string} Current_date_and_time
   * @property {string} System_name
   * @property {string} Users_currently_signed_on
   * @property {string} Users_temporarily_signed_off_(disconnected)
   * @property {string} Users_suspended_by_system_request
   * @property {string} Users_suspended_by_group_jobs
   * @property {string} Users_signed_off_with_printer_output_waiting_to_print
   * @property {string} Batch_jobs_waiting_for_messages
   * @property {string} Batch_jobs_running
   * @property {string} Batch_jobs_held_while_running
   * @property {string} Batch_jobs_ending
   * @property {string} Batch_jobs_waiting_to_run_or_already_scheduled
   * @property {string} Batch_jobs_held_on_a_job_queue
   * @property {string} Batch_jobs_on_a_held_job_queue
   * @property {string} Batch_jobs_on_an_unassigned_job_queue
   * @property {string} Batch_jobs_ended_with_printer_output_waiting_to_print
   */

  /**
   * @callback getSysStatusCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getSysStatusOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Get basic system status.
   * IBM i API: QWCRSSTS
   * @param {getSysStatusCallback} cb - The callback function.
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
   * getSysStatusExt Output Object
   * @typedef {object} getSysStatusExtOutput
   * @property {string} Current_date_and_time
   * @property {string} System_name
   * @property {string} Elapsed_time
   * @property {string} Restricted_state_flag
   * @property {string} %_processing_unit_used
   * @property {string} Jobs_in_system
   * @property {string} %_permanent_addresses
   * @property {string} %_temporary_addresses
   * @property {string} System_ASP
   * @property {string} %_system_ASP_used
   * @property {string} Total_auxiliary_storage
   * @property {string} Current_unprotected_storage_used
   * @property {string} Maximum_unprotected_storage_used
   * @property {string} %_DB_capability
   * @property {string} Main_storage_size
   * @property {string} Number_of_partitions
   * @property {string} Partition_identifier
   * @property {string} Current_processing_capacity
   * @property {string} Processor_sharing_attribute
   * @property {string} Number_of_processors
   * @property {string} Active_jobs_in_system
   * @property {string} Active_threads_in_system
   * @property {string} Maximum_jobs_in_system
   * @property {string} %_temporary_256MB_segments_used
   * @property {string} %_temporary_4GB_segments_used
   * @property {string} %_permanent_256MB_segments_used
   * @property {string} %_permanent_4GB_segments_used
   * @property {string} %_current_interactive_performance
   * @property {string} %_uncapped_CPU_capacity_used
   * @property {string} %_shared_processor_pool_used
   * @property {string} Main_storage_size_(long)
   */

  /**
   * @callback getSysStatusExtCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getSysStatusExtOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Get detailed system status.
   * IBM i API: QWCRSSTS
   * @param {getSysStatusExtCallback} cb - The callback function.
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
   * getJobStatus Output Object
   * @typedef {object} getJobStatusOutput
   * @property {string} Job_status
   * @property {string} Fully_qualified_job_name
   */

  /**
   * @callback getJobStatusCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getJobStatusOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Get the status of the specified job.
   * IBM i API: QWCRJBST
   * @param {string} jobId - The job id.
   * @param {getJobStatusCallback} cb - The callback function.
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
   * getJobInfo Output Object
   * @typedef {object} getJobInfoOutput
   * @property {string} Job_name
   * @property {string} User_name
   * @property {string} Job_number
   * @property {string} Job_status
   * @property {string} Job_type
   * @property {string} Job_subtype
   * @property {string} Subsystem_description_name
   * @property {string} Run_priority_(job)
   * @property {string} System_pool_identifier
   * @property {string} Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds
   * @property {string} Number_of_auxiliary_I/O_requests,_if_less_than_2,147,483,647
   * @property {string} Number_of_interactive_transactions
   * @property {string} Response_time_total
   * @property {string} Function_type
   * @property {string} Function_name
   * @property {string} Active_job_status
   * @property {string} Number_of_database_lock_waits
   * @property {string} Number_of_internal_machine_lock_waits
   * @property {string} Number_of_nondatabase_lock_waits
   * @property {string} Time_spent_on_database_lock_waits
   * @property {string} Time_spent_on_internal_machine_lock_waits
   * @property {string} Time_spent_on_nondatabase_lock_waits
   * @property {string} Current_system_pool_identifier
   * @property {string} Thread_count
   * @property {string} Processing_unit_time_used_-_total_for_the_job
   * @property {string} Number_of_auxiliary_I/O_requests
   * @property {string} Processing_unit_time_used_for_database_-_total_for_the_job
   * @property {string} Page_faults
   * @property {string} Active_job_status_for_jobs_ending
   * @property {string} Memory_pool_name
   * @property {string} Message_reply
   * @property {string} Message_key,_when_active_job_waiting_for_a_message
   * @property {string} Message_queue_name,_when_active_job_waiting_for_a_message
   * @property {string} Message_queue_library_name,_when_active_job_waiting_for_a_message
   * @property {string} Message_queue_library_ASP_device_name,_when_active_job_waiting_for_a_message
   */

  /**
   * @callback getJobInfoCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getJobInfoOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Get info about the specified job.
   * IBM i API: QUSRJOBI
   * @param {string} jobName - The job name.
   * @param {string} userName - The username.
   * @param {string} jobNumber - The job number.
   * @param {getJobInfoCallback} cb - The callback function.
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
   * getDataArea Output Object
   * @typedef {object} getDataAreaOutput
   * @property {string} Type_of_value_returned
   * @property {string} Library_name
   * @property {string} Length_of_value_returned
   * @property {string} Number_of_decimal_positions
   * @property {string} Value
   */

  /**
   * @callback getDataAreaCallback
   * @param {Error|null} error - the error object if an error occured or null.
   * @param {getDataAreaOutput|null} output - This is an object if successful or
   *  null when an error occurs.
   */

  /**
   * @deprecated Will be removed in the next major version.
   * @description
   * Retrieve the contents of a data area.
   * IBM i API: QWCRDTAA
   * @param {string} lib - The library name.
   * @param {string} area - The data area name.
   * @param {string} length - The length of the data to retrieve.
   * @param {getDataAreaCallback} cb - The callback function.
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
 * CL Command Options
 * @typedef {object} clOptionsDeprecated
 * @property {string} [exec=cmd] - How to run the command.
 * Valid options: 'cmd', 'system', or 'rexx'.
 * @property {string} [error=fast] - Valid options are 'on', 'off', or 'fast'.
 * @property {string} [hex=off] - The option to output data in hex. Valid options: 'on' or 'off'
 * @property {string} [before] - The CCSID to convert to before command call.
 * @property {string} [after] - The CCSID to convert to after command call.
 */

/**
 * @deprecated Will be removed in the next major version. Use CommandCall instead.
 * @description Creates cmd XML
 * @param {string} cmd - The command to run.
 * @param {clOptionsDeprecated} [options] - The cmd options.
 * @returns {string} The generated XML for the CL command.
 */
function iCmd(cmd, options) {
  iCmdDeprecate('As of v1.0, class \'iCmd()\' is deprecated. Please use \'CommandCall\' instead.');
  const command = new CommandCall({ command: cmd, type: 'cl', options });
  return command.toXML();
}

/**
 * QSH Command Options
 * @typedef {object} qshOptionsDeprecated
 * @property {string} [rows] - The option to split the output row by row.
 * Valid options are 'on' or 'off'.
 * @property {string} [error=fast] - Valid options: 'on', 'off', 'fast'.
 * @property {string} [hex=off] - The option to output data in hex format.
 * Valid options are 'on' or 'off'.
 * @property {string} [before] - The CCSID to convert to before command call.
 * @property {string} [after] - The CCSID to convert to after command call.
 */

/**
 * @deprecated Will be removed in the next major version. Use CommandCall instead.
 * @description Creates qsh XML
 * @param {string} qsh - The command to run.
 * @param {shOptionsDeprecated} [options] - The qsh options.
 * @returns {string} The generated XML for the qsh command.
 */
function iQsh(qsh, options) {
  iQshDeprecate('As of v1.0, class \'iQsh()\' is deprecated. Please use \'CommandCall\' instead.');
  const command = new CommandCall({ command: qsh, type: 'qsh', options });
  return command.toXML();
}

/**
 * SH Command Options
 * @typedef {object} shOptionsDeprecated
 * @property {string} [rows] - The option to split the output row by row.
 * Valid options are 'on' or 'off'.
 * @property {string} [error=fast] - Valid options: 'on', 'off', 'fast'.
 * @property {string} [hex=off] - The option to output data in hex format.
 * Valid options are 'on' or 'off'.
 * @property {string} [before] - The CCSID to convert to before command call.
 * @property {string} [after] - The CCSID to convert to after command call.
 */

/**
 * @deprecated Will be removed in the next major version. Use the CommandCall Class instead.
 * @description Creates sh XML
 * @param {string} sh - The command to run.
 * @param {shOptions} [options] - The sh options.
 * @returns {string} The generated XML for the sh command.
 */
function iSh(sh, options) {
  iShDeprecate('As of v1.0, class \'iSh()\' is deprecated. Please use \'CommandCall\' instead.');
  const command = new CommandCall({ command: sh, type: 'sh', options });
  return command.toXML();
}

/**
 * @deprecated Will be removed in the next major version.
 * @param {string} xml - The XMLSERVICE output.
 * @returns {object[]} - The array of result objects.
 */
function xmlToJson(xml) {
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
