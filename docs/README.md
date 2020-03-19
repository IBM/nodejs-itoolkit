# Node.js iToolkit Docs <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->
- [Introduction](#Introduction)
  - [Installation](#Installation)
- [Class Connection](#Class-Connection)
  - [Constructor: Connection(optionsOrDb[, username, password, restOptions])](#Constructor-ConnectionoptionsOrDb-username-password-restOptions)
      - [Syntax 1: Connection(options)](#Syntax-1-Connectionoptions)
        - [idb-connector transportOptions](#idb-connector-transportOptions)
        - [rest transportOptions](#rest-transportOptions)
        - [ssh transportOptions](#ssh-transportOptions)
        - [odbc transportOptions](#odbc-transportOptions)
      - [Syntax 2: Connection(database, username, password [,restOptions])](#Syntax-2-Connectiondatabase-username-password-restOptions)
  - [Connection.add(input)](#Connectionaddinput)
  - [Connection.debug([flag])](#Connectiondebugflag)
  - [Connection.getTransportOptions()](#ConnectiongetTransportOptions)
  - [Connection.run(callback)](#Connectionruncallback)
- [Class: CommandCall](#Class-CommandCall)
    - [Example](#Example)
  - [Constructor: CommandCall(config)](#Constructor-CommandCallconfig)
  - [CommandCall.toXML()](#CommandCalltoXML)
- [Class ProgramCall](#Class-ProgramCall)
  - [Example](#Example-1)
  - [Constructor: ProgramCall(program[, options])](#Constructor-ProgramCallprogram-options)
  - [ProgramCall.addParam(value, [options])](#ProgramCalladdParamvalue-options)
  - [ProgramCall.addReturn(value, type[, options])](#ProgramCalladdReturnvalue-type-options)
  - [ProgramCall.toXML()](#ProgramCalltoXML)
- [Class Toolkit](#Class-Toolkit)
  - [Constructor: Toolkit(connection)](#Constructor-Toolkitconnection)
  - [Toolkit.getSysValue(value, callback)](#ToolkitgetSysValuevalue-callback)
  - [Toolkit.getSysStatus(callback)](#ToolkitgetSysStatuscallback)
  - [Toolkit.getSysStatusExt(callback)](#ToolkitgetSysStatusExtcallback)
  - [Toolkit.getJobStatus(id, callback)](#ToolkitgetJobStatusid-callback)
  - [Toolkit.getJobInfo(name, user, number, callback)](#ToolkitgetJobInfoname-user-number-callback)
  - [Toolkit.getDataArea(library, area, length, callback)](#ToolkitgetDataArealibrary-area-length-callback)
  - [Toolkit.getPTFInfo(number, callback)](#ToolkitgetPTFInfonumber-callback)
  - [Toolkit.getProductInfo(name, option, callback)](#ToolkitgetProductInfoname-option-callback)
  - [Toolkit.getInstalledProducts(callback)](#ToolkitgetInstalledProductscallback)
  - [Toolkit.createUserSpace(name, library, attribute, size, authority, description, callback)](#ToolkitcreateUserSpacename-library-attribute-size-authority-description-callback)
  - [Toolkit.setUserSpaceData(name, library, size, data, callback)](#ToolkitsetUserSpaceDataname-library-size-data-callback)
  - [Toolkit.getUserSpaceData(name, library, size, callback)](#ToolkitgetUserSpaceDataname-library-size-callback)
  - [Toolkit.deleteUserSpace(name, library, callback)](#ToolkitdeleteUserSpacename-library-callback)
  - [Toolkit.getTCPIPAttr(callback)](#ToolkitgetTCPIPAttrcallback)
  - [Toolkit.getNetInterfaceData(ip, callback)](#ToolkitgetNetInterfaceDataip-callback)
  - [Toolkit.sendToDataQueue(name, library, data, callback)](#ToolkitsendToDataQueuename-library-data-callback)
  - [Toolkit.receiveFromDataQueue(name, library, size, callback)](#ToolkitreceiveFromDataQueuename-library-size-callback)
  - [Toolkit.clearDataQueue(name, library, callback)](#ToolkitclearDataQueuename-library-callback)
- [Deprecated Classes and Functions](#Deprecated-Classes-and-Functions)
  - [iConn](#iConn)
  - [iCmd](#iCmd)
  - [iDataQueue](#iDataQueue)
  - [iNetwork](#iNetwork)
  - [iObj](#iObj)
    - [iObj.retrUsrAuth(user, type, name, library, callback)](#iObjretrUsrAuthuser-type-name-library-callback)
    - [iObj.retrCmdInfo(command, [library,] callback)](#iObjretrCmdInfocommand-library-callback)
    - [iObj.retrPgmInfo(program, library, callback)](#iObjretrPgmInfoprogram-library-callback)
    - [iObj.retrSrvPgmInfo(program, library, callback)](#iObjretrSrvPgmInfoprogram-library-callback)
    - [iObj.retrUserInfo(user, callback)](#iObjretrUserInfouser-callback)
    - [iObj.retrUserAuthToObj(path, callback)](#iObjretrUserAuthToObjpath-callback)
    - [iObj.addToLibraryList(library, callback)](#iObjaddToLibraryListlibrary-callback)
  - [iPgm](#iPgm)
  - [iProd](#iProd)
  - [iQsh](#iQsh)
  - [iSh](#iSh)
  - [iSql](#iSql)
    - [Examples](#Examples)
      - [run a query](#run-a-query)
      - [call a procedure](#call-a-procedure)
  - [Constructor: iSql()](#Constructor-iSql)
  - [iSql.addQuery(statement[,options])](#iSqladdQuerystatementoptions)
  - [iSql.tables(params[,options])](#iSqltablesparamsoptions)
  - [iSql.tablePriv(params[,options])](#iSqltablePrivparamsoptions)
  - [iSql.columns(params[,options])](#iSqlcolumnsparamsoptions)
  - [iSql.special(params[,options])](#iSqlspecialparamsoptions)
  - [iSql.statistics(params[,options])](#iSqlstatisticsparamsoptions)
  - [iSql.columnPriv(params[,options])](#iSqlcolumnPrivparamsoptions)
  - [iSql.procedures(params[, options])](#iSqlproceduresparams-options)
  - [iSql.pColumns(params[, options])](#iSqlpColumnsparams-options)
  - [iSql.primaryKeys(params[, options])](#iSqlprimaryKeysparams-options)
  - [iSql.foreignKeys(params[, options])](#iSqlforeignKeysparams-options)
  - [iSql.rowCount([options])](#iSqlrowCountoptions)
  - [iSql.count([options])](#iSqlcountoptions)
  - [iSql.describe([options])](#iSqldescribeoptions)
  - [iSql.free()](#iSqlfree)
  - [iSql.fetch([options])](#iSqlfetchoptions)
  - [iSql.commit(options)](#iSqlcommitoptions)
  - [iSql.prepare(statement[, options])](#iSqlpreparestatement-options)
  - [iSql.execute([params,[options]])](#iSqlexecuteparamsoptions)
  - [iSql.toXML()](#iSqltoXML)
  - [iUserSpace](#iUserSpace)
  - [iWork](#iWork)
  - [xmlToJson(xml)](#xmlToJsonxml)

# Introduction

Node.js iToolkit is a is a Node.js interface to XMLSERVICE to access all things IBM i.

[XMLSERVICE](https://github.com/IBM/xmlservice) is a set of procedures written in ILE RPG that allow you to interact with IBM i resources such as programs and commands using a plain XML protocol.

XMLSERVICE receives xml input and returns xml output.

For example if we send below XML request to XMLSERVICE

```xml
<?xml version="1.0" encoding="UTF-8"?>
<myscript>
   <cmd exec="rexx">RTVJOBA USRLIBL(?) SYSLIBL(?)</cmd>
</myscript>
```

XMLSERVICE will run the command and send the below response back to client:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<myscript>
   <cmd exec="rexx">
      <success>+++ success RTVJOBA USRLIBL(?) SYSLIBL(?)</success>
      <row>
         <data desc="USRLIBL">QGPL  QTEMP</data>
      </row>
      <row>
         <data desc="SYSLIBL">QSYS  QSYS2  QHLPSYS  QUSRSYS</data>
      </row>
   </cmd>
</myscript>
```

The purpose of this package is to simplify the process of creating input XMLSERVICE input xml, invoking XMLSERVICE, and parsing the xml output from XMLSERVICE from the Node.js.

## Installation

```bash
npm install itoolkit
```

# Class Connection

The Connection class is used to transport xml input and return xml output.

## Constructor: Connection(optionsOrDb[, username, password, restOptions])

**Description:**

Constructor to instantiate a new instance of a Connection class.

The Connection constructor can be accessed in two ways.

As of version 1.0.0 the propery way to create a Connection is to pass an `options` object.

Syntax 2 remains in place only to support depreciated [iConn](#iConn) signature.

#### Syntax 1: Connection(options)

**Parameters:**
- **options** `<object>` the configuration options for the Connection. Keys include:
   - **transport** `<string>` the transport to use.
      - Valid values for transport are `(idb, rest, ssh, odbc)`
   - **returnError** `boolean` used to adjust error reporting from `Connection.run()`.
     - by default this set to `true` to allow `Connection.run(error, xmlOutput)`
     - before version 1.0.0 error where not appened to the `.run()` callback.
   - **transportOptions** `<object>` configuration options passed the transport.

Valid transportOptions vary based on the transport used.

##### idb-connector transportOptions

| Key      | Type    | Value       |
| -----    | ----    | ----------- |
| database | string  | The database to connect to. Use special `*LOCAL` value for a local database.<br> This key is required |
| username | string  | The database user.<br>This key is required when not connecting to `*LOCAL`. |
| password | string  | The database user's password.<br>This key is required when not connecting to `*LOCAL`. |
| ipc      | string  | The ipc key name/security route to XMLSERVICE job.<br>This key is optional and defaults to `*NA` |
| ctl      | string  | The control keywords for operator control over XMLSERVICE jobs.<br>This key is optional and defaults to `*here`|
| xslib    | string  | The XMLSERVICE library to use.<br>This key is optional and defaults to `QXMLSERV` |
| verbose  | boolean | Turns on verbose output printed to stdout.<br>This key is optional and defaults to `false` |


##### rest transportOptions

| Key      | Type    | Value       |
| -----    | ----    | ----------- |
| database | string  | The database to connect to. Use special `*LOCAL` value for a local database.<br> This key is required |
| username | string  | The database user.<br>This key is required. |
| password | string  | The database user's password.<br>This key is required. |
| ipc      | string  | The ipc key name/security route to XMLSERVICE job.<br>This key is optional and defaults to `*NA` |
| ctl      | string  | The control keywords for operator control over XMLSERVICE jobs.<br>This key is optional and defaults to `*here`|
| host     | string  | The host server to send the HTTP request to.<br>This is required and defaults to `localhost` |
| port     | string  | The host server's port.<br>This key is optional and defaults to `80` |
| path     | string  | The path on the host server to make the request<br>This key is optional and defaults to `/` |

##### ssh transportOptions

For a complete list of ssh transport options refer to the [ssh2 Client.connect()](https://www.npmjs.com/package/ssh2#client-methods).

##### odbc transportOptions

| Key      | Type    | Value |
| -----    | ----    | ----------- |
| host     | string  | The system to connect to<br>This is required and defaults to `localhost` |
| database | string  | The database to connect to. Use special `*LOCAL` value for a local database.<br> This key is required |
| username | string  | The database user.<br>This key is required. |
| password | string  | The database user's password.<br>This key is required. |
| dsn      | string  | The database source name to use. Refer to the [knowledge center](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_73/rzaik/connectkeywords.htm) for a list of valid options.<br>This key is optional. |
| xslib    | string  | The XMLSERVICE library to use.<br>This key is optional and defaults to `QXMLSERV` |
| ipc      | string  | The ipc key name/security route to XMLSERVICE job.<br>This key is optional and defaults to `*NA` |
| ctl      | string  | The control keywords for operator control over XMLSERVICE jobs.<br>This key is optional and defaults to `*here`|


#### Syntax 2: Connection(database, username, password [,restOptions])

**Parameters:**
- **database** `<string>` the database to connect to. Use special `*LOCAL` value for a local database
- **username** `<string>`  the database user
- **password** `<string>`  the database user's password
- **[restOptions]** `<object>` the configuration options for the REST transport. See [rest transportOptions](#rest-transportOptions).

**Returns:**

`<object>` a Connection object.

**Example Using idb-connector transport:**

```js
const { Connection } = require("itoolkit");

const connection = new Connection({
  transport: 'idb',
  transportOptions: { database: '*LOCAL', username: 'myuser', password: 'mypass' }
});

```

**Example Using REST transport:**

```js
const connection = new Connection({
  transport: 'rest',
  transportOptions: { host: 'myhost', port: 80, path:'/cgi-bin/xmlcgi.pgm' database: '*LOCAL', username: 'myuser', password: 'mypass' }
});
```

**Example Using SSH transport:**

```js
const { Connection } = require("itoolkit");

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', privateKey, passphrase: 'myphrase' }
});

```

```js
const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});
```

**Example Using ODBC transport:**

```js
const { Connection } = require("itoolkit");

const connection = new Connection({
  transport: 'odbc',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword'}
});

```

```js
const { Connection } = require("itoolkit");

const connection = new Connection({
  transport: 'odbc',
  transportOptions: { dsn: 'mydsn'}
});

```

## Connection.add(input)

**Description:**

Adds XML request to the command list

**Syntax:**

add(input)

**Parameters:**

- **input** `<object> | <string>` an instance of class [CommandCall](#Class-CommandCall), [ProgramCall](#Class-ProgramCall), [iSql](#Class-iSql) , or XML string.

**Example:**

```js
const { Connection, CommandCall } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

connection.add(new CommandCall({ type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)' }));

console.log(connection.commandList);
```

## Connection.debug([flag])

**Description:**

Enable or disable the verbose mode for debugging.

If the verbose mode is enabled, the input XML data will be printed.

By default verbose mode is disabled.

**Syntax:**

Syntax 1: debug()

Syntax 2: debug(flag)

**Parameters:**

- **flag** `<boolean>` value to set verbose mode.

**Returns:**

For Syntax 1, `<boolean>` value indicating whether verbose mode is enabled or not.

**Example:**

```js
const { Connection } = require("itoolkit");

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

connection.debug(true);
```

## Connection.getTransportOptions()

**Description:**

Returns the transportOptions property from Connection object.

**Syntax:**

getTransportOptions()

**Returns:**

`<object>` the transportOptions property from Connection object.

**Example:**

```js
const { Connection } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

console.log(connection.getTransportOptions());
```

## Connection.run(callback)

**Description:**

Builds the xml input that will passed to the transport by iterationing over the command list then cleares the command list.

Then invokes the desired transport with the xml input.

Once the transport is done the user provided callback is called with `error` and `xmlOutput` added as parameters.

If the Connection object was created using [syntax 2](#Syntax-2-Connectiondatabase-username-password-restOptions) `xmlOutput` is the only parameter added to the user provided callback.


**Syntax:**

run(callback)

**Parameters:**

- **callback** `<function>` The specified call back function to handle the execution result. output is the output XML document from XMLSERVICE program.
- The first parameter added to the callback is `error`. This is an `Error` object when a transport error occurs or `null`.
- The second parameter added to the callback is `xmlOutput`, the raw XML returned from XMLSERVICE.

**Example:**

```js
const { Connection, CommandCall } = require('itoolkit');
const { parseString } = require('xml2js');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

connection.add(new CommandCall({ type: 'sh', command: 'ls /home' }));

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(JSON.stringify(result));
  });
});
```

# Class: CommandCall

The CommandCall class is used to construct a `CL`, `QSH`, or `PASE Shell` command.

### Example

```js
const { Connection, CommandCall } = require('itoolkit');
const { parseString } = require('xml2js');


const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const command = new CommandCall({ type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)' });

connection.add(command);

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(JSON.stringify(result));
  });
});
```

## Constructor: CommandCall(config)

**Parameters:**

- **config** `<object>` to configure the command. Contains the keys:
   - **command** `<string>` this is the command to execute
   - **type** `<string>` specifies the type of the command.
       - valid types are: `(cl, sh, qsh)`
   - **[options]** `<object>` additional options indicating how to process the command.

Valid options vary based on the command type.

**CL command options:**

| Key     | Type   | Value       |
| -----   | ----   | ----------- |
| exec    | string | `cmd` - cmd only return true/false<br>`system` - system utility return CPFxxxx<br>`rexx` - return output parms and CPFxxxx |
| error   | string | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. This is the default value |
| hex     | string | `on` - output value is in raw hex format<br>`off` - output value is encoded by CCSID (default) |
| before  | string | Convert to this CCSID before system call. |
| after   | string | Convert output of system call to this CCSID. |


**QSH and PASE Shell options:**

| Key   | Type   | Value |
| -----   | ----   | ----------- |
| rows    | string | `on` - split the output row by row<br>`off` - the output is a block of text |
| error   | string | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. This is the default value |
| hex     | string | `on` - output value is in raw hex format<br>`off` - output value is encoded by CCSID |
| before  | string | CCSID to convert to before system call. |
| after   | string | CCSID to convert output of system call to. |

**Returns:**

`<object>` a CommandCall object.

## CommandCall.toXML()

**Description:**

Returns the CommandCall in xml format

**Syntax:**

toXML()

**Returns:**
`<string>` the CommandCall in xml format

**Example:**

```js
const { CommandCall } = require('itoolkit');

const command = new CommandCall({ type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)' });

console.log(command.toXML());
```

# Class ProgramCall

The ProgramCall is used to call a Programs and Service Programs.

ProgramCall requests are more complicated than CommandCall or iSql.

It is recommended to read the `XMLSERVICE call PGM` part of the [XMLSERVICE manual](http://youngiprofessionals.com/wiki/index.php/XMLSERVICE/XMLSERVICE) first.

For calling system programs it is recommended to review the [API manual](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/aplist.htm).

## Example

```js
const { Connection, ProgramCall } = require('itoolkit');
const { parseString } = require('xml2js');


const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const output = [
  ['0', '10i0'],
  ['0', '10i0'],
  ['', '10A'],
  ['', '1A'],
  ['', '1A'],
  ['0', '10i0'],
  ['0', '10i0'],
];

const errno = [
  ['0', '10i0'],
  ['0', '10i0', { setlen: 'rec2' }],
  ['', '7A'],
  ['', '1A'],
];

const program = new ProgramCall('QWCRSVAL', { lib: 'QSYS' });

program.addParam(output, { io: 'out', len: 'rec1' });
program.addParam('0', '10i0', { setlen: 'rec1' });
program.addParam('1', '10i0');
program.addParam('QCCSID', '10A');
program.addParam(errno, { io: 'both', len: 'rec2' });

connection.add(program);

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(JSON.stringify(result));
  });
});
```

XMLSERVICE provides two useful keywords `"len"` and `"setlen"` to automatically calculate and set the size of target data structure.


## Constructor: ProgramCall(program[, options])

**Description:**

Creates a new ProgramCall object,

**Parameters:**

- **program** `<string>` the program/service program to run.

- **[options]** `<object>` configuration options for the program call outlined below:

| Key   | Type   | Value                                 |
| ----- | ------ | -----------                           |
| lib   | string | The library where the program exists. |
| error | string | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. This is the default value |
| func  | string | The target function of the service program |

**Returns:**

`<object>` a ProgramCall object.


## ProgramCall.addParam(value, [options])

**Description:**

Add a new parameter element to the ProgramCall.

**Syntax 1:**

addParam(data, type[,options])

**Syntax 2:**

addParam(data, [,options])

**Parameters:**

- **value** `<string> | <array>` The parameter element value.

  If the parameter is a data structure, then use syntax 2 where data is an 2D `<array>`.

  Each element of the array can have: `[data, type, options]`.

  Otherwise use syntax 1 where data is the value of the parameter as a `<string>`.
  
- **type** `<string>` The parameter data type.

- **[options]** `<object>` additional configuration for the parameter.<br>Refer to the [param, ds, and data tag](http://youngiprofessionals.com/wiki/index.php/XMLSERVICE/XMLSERVICEQuick) for available options.

**Example:**

Refer to the [ProgramCall](#Example-1) example.

## ProgramCall.addReturn(value, type[, options])

**Description:**

Adds `return` element to ProgramCall object.

The return element is used to capture the return value from a service program function call.

This should only be used when calling service programs.

**Parameters:**

- **value** `<string> | <array>` The parameter element value. If the parameter is a data structure, then value is a 2D array of values.
  
- **type** `<string>` The parameter data type.<br>Refer to the [data tag](http://youngiprofessionals.com/wiki/index.php/XMLSERVICE/XMLSERVICEQuick) for more type details.

- **[options]** `<object>` additional configuration for the parameter.

**Syntax:**

addReturn(value, type[, options])

**Example:**

```js
const { Connection, ProgramCall } = require('itoolkit');
const { parseString } = require('xml2js');


const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const program = new ProgramCall('ZZSRV6', { lib: 'XMLSERVICE', func: 'ZZVARY4' });

const testName = 'Clark Jones';

program.addParam(testName, '10A', { varying: '4' });
program.addReturn('0', '20A', { varying: '4' });

connection.add(program);

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(result.myscript.pgm[0].return[0].data[0]._); // my name is Clark Jones
  });
});
```

**NOTE**

The service program `ZZSRV6` used in the above example is provided by [building](https://github.com/IBM/xmlservice#building-from-source) XMLSERVICE with test programs.

## ProgramCall.toXML()

**Description:**

Returns an ProgramCall object in XML format.

**Syntax:**

toXML()

**Returns:**

`<string>` the ProgramCall in xml format

**Example:**

```js
const { ProgramCall } = require('itoolkit');

const program = new ProgramCall('QWCRSVAL', { lib: 'QSYS' });

console.log(program.toXML());
```



# Class Toolkit

The Toolkit Class contains utility functions to access Data Queues, User Sapce Objects, and more.

These functions make use ProgramCall Class to call the IBM i APIs.

## Constructor: Toolkit(connection)

**Description:**

Constructs a new Toolkit object.

**Parameters:**

- **connection** `<object>` [Connection](#constructor-connectionoptions) object to run requests.

**Example:**

```js
const { Connection, Toolkit }  = require("itoolkit");

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

const toolkit = new Toolkit(connection);
```

## Toolkit.getSysValue(value, callback)

**Description:**

Get specified system value.

**Syntax:**

getSysValue (value, callback)

**Parameters:**

- **value** `<string>` The system value name to be queried.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<string>` system value when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QWCRSVAL](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qwcrsval.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getSysValue('QCCSID', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(`QCCSID = ${output}`);
});
```

## Toolkit.getSysStatus(callback)

**Description:**

Get basic system status.

**Syntax:**

getSysStatus(callback)

**Parameters:**
- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Keys                                                  |
| -----                                                 |
| Current_date_and_time                                 |
| System_name                                           |
| Users_currently_signed_on                             |
| Users_temporarily_signed_off_(disconnected)           |
| Users_suspended_by_system_request                     | 
| Users_suspended_by_group_jobs                         |
| Users_signed_off_with_printer_output_waiting_to_print |
| Batch_jobs_waiting_for_messages                       |
| Batch_jobs_running                                    | 
| Batch_jobs_held_while_running                         |
| Batch_jobs_ending                                     |
| Batch_jobs_waiting_to_run_or_already_scheduled        |
| Batch_jobs_held_on_a_job_queue                        |
| Batch_jobs_on_a_held_job_queue                        |
| Batch_jobs_on_an_unassigned_job_queue                 |
| Batch_jobs_ended_with_printer_output_waiting_to_print |

**IBM i API:**

[QWCRSSTS](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qwcrssts.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getSysStatus((error, output) => {
  if (error) {
    throw error;
  }
  console.log((output));
});
```

## Toolkit.getSysStatusExt(callback)

**Description:**

Get detailed system status.

**Syntax:**

getSysStatusExt(callback)

**Parameters:**

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                               |
| -----                             |
| Current_date_and_time             |
| System_name                       |
| Elapsed_time                      |
| Restricted_state_flag             |
| %_processing_unit_used            |
| Jobs_in_system                    |
| %_permanent_addresses             |
| %_temporary_addresses             |
| System_ASP                        |
| %_system_ASP_used                 |
| Total_auxiliary_storage           |
| Current_unprotected_storage_used  |
| Maximum_unprotected_storage_used  |
| %_DB_capability                   |
| Main_storage_size                 |
| Number_of_partitions              |
| Partition_identifier              |
| Current_processing_capacity       |
| Processor_sharing_attribute       |
| Number_of_processors              |
| Active_jobs_in_system             |
| Active_threads_in_system          |
| Maximum_jobs_in_system            |
| %_temporary_256MB_segments_used   |
| %_temporary_4GB_segments_used     |
| %_permanent_256MB_segments_used   |
| %_permanent_4GB_segments_used     |
| %_current_interactive_performance |
| %_uncapped_CPU_capacity_used      |
| %_shared_processor_pool_used      |
| Main_storage_size_(long)          |

**IBM i API:**

[QWCRSSTS](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qwcrssts.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getSysStatusExt((error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.getJobStatus(id, callback)

**Description:**

Get the status of the specified job.

**Syntax:**

getJobStatus(id, callback)

**Parameters:**

- **id** `<string>` a specific job number(6 characters max)

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                      |
| -----                    |
| Job_status               |
| Fully_qualified_job_name |


**IBM i API:**

[QWCRJBST](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qwcrjbst.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getJobStatus('jobid', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.getJobInfo(name, user, number, callback)

**Description:**

Get specified job’s status.

**Syntax:**

getJobInfo (name, user, number, callback)

**Parameters:**
- **name** `<string>` a specific job name (10 characters max)

- **user** `<string>` a specific user profile name (10 characters max)

- **number** `<string>` a specific job number (6 characters max)

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                                                                          |
| -----                                                                        |
| Job_name                                                                     |
| User_name        Data Queues                                                      |
| Job_number       Data Queues                                                      |
| Job_status       Data Queues                                                      |
| Job_type                                                                     |
| Job_subtype                                                                  |
| Subsystem_description_name                                                   |
| Run_priority_(job)                                                           |
| System_pool_identifier                                                       |
| Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds           |
| Number_of_auxiliary I/O requests,_if_less_than_2,147,483,647                 |
| Number_of_interactive_transactions                                           |
| Response_time_total                                                          |
| Function_type                                                                |
| Function_name                                                                |
| Active_job_status                                                            |
| Number_of_database_lock_waits                                                |
| Number_of_internal_machine_lock_waits                                        |
| Number_of_nondatabase_lock_waits                                             |
| Time_spent_on_database_lock_waits                                            |
| Time_spent_on_internal_machine_lock_waits                                    |
| Time_spent_on_nondatabase_lock_waits                                         |
| Current_system_pool_identifier                                               |
| Thread_count                                                                 |
| Processing_unit_time_used_-_total_for_the_job                                |
| Number_of_auxiliary_I/O_requests                                             |
| Processing_unit_time_used_for_database_-_total_for_the_job                   |
| Page_faults                                                                  |
| Active_job_status_for_jobs_ending                                            |
| Memory_pool_name                                                             |
| Message_reply                                                                |
| Message_key,_when_active_job_waiting_for_a_message                           |
| Message_queue_name,_when_active_job_waiting_for_a_message                    |
| Message_queue_library name,_when_active_job_waiting_for_a_message            |
| Message_queue_library_ASP_device name,_when active_job_waiting_for_a_message |

**IBM i API:**

[QUSRJOBI](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_72/apis/qusrjobi.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getJobInfo('jobname', 'user', 'jobnumber', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.getDataArea(library, area, length, callback)

**Description:**

Retrieve the contents of a data area.

**Syntax:**

getDataArea (library, area, length, callback)

**Parameters:**

- **library** `<string>` name of the library where the data area is located (10 characters max).

- **area** `<string>` the data area name (10 characters max)

- **length** `<number>` the length of the data area substring to be retrieved.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                         |
| -----                       |
| Type_of_value_returned      |
| Library_name                |
| Length_of_value_returned    |
| Number_of_decimal_positions |
| Value                       |

**IBM i API:**

[QWCRDTAA](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qwcrdtaa.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getDataArea('mylibrary', 'mydataarea', 100, (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```


## Toolkit.getPTFInfo(number, callback)

**Description:**

Get the load status of specified PTF.

**Syntax:**

getPTFInfo(number, callback)

**Parameters:**
- **number** `<string>` The PTF number to be queried.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                            |
| -----                          |
| Product_ID                     |
| PTF_ID                         |
| Release_level                  |
| Product_option                 |
| Load_ID                        |
| Loaded_status                  |
| Cover_letter_status            |
| On-order_status                |
| Save_file_status               |
| File_name                      |
| File_library_name              |
| PTF_type                       |
| IPL_action                     |
| Action_pending                 |
| Action_required                |
| PTF_is_released                |
| Target_release                 |
| Superseding_PTF                |
| Current_IPL_source             |
| Minimum_level                  |
| Maximum_level                  |
| Format_information_available   |
| Status_date_and_time           |
| Licensed_Internal_Code_group   |
| Superseded_by_PTF_ID           |
| Current_server_IPL_source      |
| Server_IPL_required            |
| Creation_date_and_time         |
| Technology_refresh_PTF         |
| Reserved                       |

**IBM i API:**

[QPZRTVFX](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qpzrtvfx.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getPTFInfo('SI54708', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});

```

## Toolkit.getProductInfo(name, option, callback)

**Description:**

Get the status of specified product.

**Syntax:**

getProductInfo (name, [option,] callback)

Parameters
- **name** `<string>` the product name.

- [option] `<object>` the option of the product. If it is not set, then the *BASE option("0000") is selected. The valid value is (0 - 99).

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.


**output**

| Key                                            |
| -----                                          |
| Product_ID                                     |
| Release_level                                  |
| Product_option                                 |
| Load_ID                                        |
| Loaded_type                                    |
| Symbolic_load_state                            |
| Load_error_indicator                           |
| Load_state                                     |
| Supported_flag                                 |
| Registration_type                              |
| Registration_value                             |
| Offset_to_additional_information               |
| Primary_language_load_identifier               |
| Minimum_target_release                         |
| Minimum_VRM_of_*BASE_required_by_option        |
| Requirements_met_between_base_and_option_value |
| Level                                          |
| Reserved                                       |

**IBM i API:**

[QSZRTVPR](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qszrtvpr.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getProductInfo('5770DG1', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.getInstalledProducts(callback)

**Description:**

Get the list of all installed products.

**Syntax:**

getInstalledProducts(callback)

**Parameters:**

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<array>` of objects when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**each object in the array has:**

| Key                           |
| -----                         |
| Product_ID                    |
| Product_option                |
| Release_level                 |
| Description_text_message_ID   |
| Description_text_object_name  |
| Description_text_library_name |
| Installed_flag                |
| Supported_flag                |
| Registration_type             |
| Registration_value            |
| Description_text              |


**IBM i API:**

[QSZSLTPR](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qszsltpr.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getInstalledProducts((error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.createUserSpace(name, library, attribute, size, authority, description, callback)

**Description:**

Create a new user space.

**Syntax:**

createUserSpace(name, library, attribute, size, authority, description, callback)

**Parameters:**

- **name** `<string>` the user space name. (10 characters max).

- **library** `<string>` tame of the library where the user space is located (10 characters max). If it is blank then `*CURLIB` is used.

- **attribute** `<string>` the extended attribute of the user space (11 characters max). If it is blank then `LOG` is used.

- **size** `<number>` the initial size of the user space being created. This value must be from 1 byte to 16,776,704 bytes. Defaults to `50`.

- **authority** `<string>` the authority you give users who do not have specific private or group authority to the user space. Defaults to `*USE`.

   The valid values for this parameter are:

   - `*ALL` - users can perform all authorized operations on the object.
   - `*CHANGE` - users can read the object description and has read, add, update, and delete authority to the object.
   - `*EXCLUDE` - users cannot access the object in any way.
   - `*LIBCRTAUT` - public authority for the user space is taken from the CRTAUT value for the target library when the object is created.
   - `*USE` - users can read the object and its description but cannot change them.

- **description** `<string>` This text briefly describes the user space. (50 characters max).

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<boolean> true` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QUSCRTUS](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/quscrtus.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.createUserSpace('myuserspace', 'mylib', 'LOG', 50, 'EXCLUDE', 'Example User Space', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.setUserSpaceData(name, library, size, data, callback)

**Description:**

Set the content of the user space.

**Syntax:**

setUserSpaceData(name, library, size, data, callback)

**Parameters:**
- **name** `<string>` the user space name. (10 characters max).

- **library** `<string>` name of the library where the user space is located (10 characters max). If it is blank then `*CURLIB` is used.

- **size** `<number>` the length of the new data in the input data parameter. The length must be greater than 0.

- **data** `<string>` the new data to be placed into the user space. The field must be at least as long as the length of data parameter.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<boolean> true` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QUSCHGUS](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/quschgus.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.setUserSpaceData('myuserspace', 'mylib', 20, 'Hello!', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.getUserSpaceData(name, library, size, callback)

**Description:**

Get the content of the user space.

**Syntax:**

getUserSpaceData(name, library, size, callback)

**Parameters:**

- **name** `<string>` the user space name. (10 characters max).

- **library** `<string>` name of the library where the user space is located (10 characters max). If it is blank then `*CURLIB` is used.

- **size**:`<number>` the length of the data to retrieve. The length must be greater than 0.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<string>` output from the user space when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QUSRTVUS](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_72/apis/qusrtvus.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getUserSpaceData('myuserspace', 'mylib', 20, (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.deleteUserSpace(name, library, callback)

**Description:**

Delete the user space.

**Syntax:**

deleteUserSpace(name, library, callback)

**Parameters:**
- **name** `<string>` the user space name. (10 characters max).

- **library** `<string>` name of the library where the user space is located (10 characters max). If it is blank then `*CURLIB` is used.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<boolean> true` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QUSDLTUS](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qusdltus.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.deleteUserSpace('myuserspace', 'mylib', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.getTCPIPAttr(callback)

**Description:**

Retrieve TCP/IP Attributes.

**Syntax:**

getTCPIPAttr(callback)

**Parameters:**

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                                         |
| -----                                       |
| TCP/IPv4_stack_status                       |
| How_long_active                             |
| When_last_started_-_date                    |
| When_last_started_-_time                    |
| When_last_ended_-_date                      |
| When_last_ended_-_time                      |
| Who_last_started_-_job_name                 |
| Who_last_started_-_job_user_name            |
| Who_last_started_-_job_number               |
| Who_last_started_-_internal_job_identifier  |
| Who_last_ended_-_job_name                   |
| Who_last_ended_-_job_user_name              |
| Who_last_ended_-_job_number                 |
| Who_last_ended_-_internal_job_identifier    |
| Offset_to_additional_information            |
| Length_of_additional_information            |
| Limited_mode                                |
| Offset_to_list_of_Internet_addresses        |
| Number_of_Internet_addresses                |
| Entry_length_for_list_of_Internet_addresses |
| DNS_protocol                                |
| Retries                                     |
| Time_interval                               |
| Search_order                                |
| Initial_domain_name_server                  |
| DNS_listening_port                          |
| Host_name                                   |
| Domain_name                                 |
| Reserved                                    |
| Domain_search_list                          |

**IBM i API:**

[QTOCNETSTS/QtocRtvTCPA](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qtocrtvtcpa.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getTCPIPAttr((error, output) => {
  if (error) {
    throw error;
  }
  console.log((output));
});
```

## Toolkit.getNetInterfaceData(ip, callback)

**Description:**

Retrieves detailed information about a specified IPv4 network interface.

**Syntax:**

getNetInterfaceData(ip, callback)

**Parameters:**
- **ip** `<string>` the IP address of the interface to be checked.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                                           |
| -----                                         |
| Internet_address                              |
| Internet_address_binary                       |
| Network_address                               |
| Network_address_binary                        |
| Line_description                              |
| Interface_status                              |
| Interface_type_of_service                     |
| Interface_MTU                                 |
| Interface_line_type                           |
| Host_address                                  |
| Host_address_binary                           |
| Interface_subnet_mask                         |
| Interface_subnet_mask_binary                  |
| Directed_broadcast_address                    |
| Directed_broadcast_address_binary             |
| Change_date                                   |
| Change_time                                   |
| Associated_local_interface                    |
| Associated_local_interface_binary             |
| Change_status                                 |
| Packet_rules                                  |
| Automatic_start                               |
| TRLAN_bit_sequencing                          |
| Interface_type                                |
| Proxy_ARP_allowed                             |
| Proxy_ARP_enabled                             |
| Configured_MTU                                |
| Network_name                                  |
| Interface_name                                |
| Alias_name                                    |
| Interface_description                         |
| Offset_to_preferred_interface_list            |
| Number_of_entries_in_preferred_interface_list |
| Length_of_one_preferred_interface_list_entry  |
| DHCP_created                                  |
| DHCP_dynamic_DNS_updates                      |
| DHCP_lease_expiration                         |
| DHCP_lease_expiration_-_date                  |
| DHCP_lease_expiration_-_time                  |
| DHCP_lease_obtained                           |
| DHCP_lease_obtained_-_date                    |
| DHCP_lease_obtained_-_time                    |
| Use_DHCP_unique_identifier                    |
| DHCP_server_IP_address                        |
| Preferred_interface_Internet_address          |
| Preferred_interface_Internet_address_binary   |

**IBM i API:**

[QTOCNETSTS/QtocRtvNetIfcDta](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qtocrtvnetifcdta.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.getNetInterfaceData('127.0.0.1', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.sendToDataQueue(name, library, data, callback)

**Description:**

Sends data to the specified data queue.

**Syntax:**

sendToDataQueue(name, library, data, callback)

**Parameters:**

- **name** `<string>` the data queue name. (10 characters max).

- **library** `<string>` name of the library where the data queue is located (10 characters max). If it is blank then `*CURLIB` is used.

- **data** `<string>` the new data to be sent to the data queue.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<boolean> true` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QSNDDTAQ](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qsnddtaq.htm)


**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.sendToDataQueue('TESTQ', 'TEST', 'Hello World!', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.receiveFromDataQueue(name, library, size, callback)

**Description:**

Receives data from the specified data queue.

**Syntax:**

receiveFromDataQueue(name, library, size, callback)

**Parameters:**

- **name** `<string>` the data queue name. (10 characters max).

- **library** `<string>` name of the library where the data queue is located (10 characters max). If it is blank then `*CURLIB` is used.

- **size** `<number>` the length of the data to retrieve. The length must be greater than 0.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<string>` output from the data queue when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QRCVDTAQ](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qrcvdtaq.htm)

**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.receiveFromDataQueue('mydq', 'mylib', 20, (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## Toolkit.clearDataQueue(name, library, callback)

**Description:**

Clear the data queue.

**Syntax:**

clearDataQueue(name, library, callback)

**Parameters:**

- **name** `<string>` the data queue name. (10 characters max).

- **library** `<string>` name of the library where the data queue is located (10 characters max). If it is blank then `*CURLIB` is used.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<boolean> true` when successful or `null` when transport error occurs.<br>If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QCLRDTAQ](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qclrdtaq.htm)


**Example:**

```js
const { Connection, Toolkit } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const toolkit = new Toolkit(connection);

toolkit.clearDataQueue('mydq', 'mylib', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

# Deprecated Classes and Functions

As of version 1.0.0 the following is deprecated:

## iConn

The `iConn` class is deprecated. Use the [Connection](#Class-Connection) class instead.

From the Connection class you may access:
- [sendToDataQueue](#ToolkitsendToDataQueuename-library-data-callback)
- [receiveFromDataQueue](#ToolkitreceiveFromDataQueuename-library-size-callback)
- [clearDataQueue](#ToolkitclearDataQueuename-library-callback)

## iCmd

The `iCmd` class is deprecated. Use the [CommandCall](#Class-CommandCall) class instead.

## iDataQueue

The `iDataQueue` class is deprecated. Use the [Toolkit](#Class-Toolkit) class instead.

From the Toolkit class you may access:
- [sendToDataQueue](#ToolkitsendToDataQueuename-library-data-callback)
- [receiveFromDataQueue](#ToolkitreceiveFromDataQueuename-library-size-callback)
- [clearDataQueue](#ToolkitclearDataQueuename-library-callback)

## iNetwork

The `iNetwork` class is deprecated. Use the [Toolkit](#Class-Toolkit) class instead.

From the Toolkit class you may access:
- [getTCPIPAttr](#ToolkitgetTCPIPAttrcallback)
- [getNetInterfaceData](#ToolkitgetNetInterfaceDataip-callback)

## iObj

### iObj.retrUsrAuth(user, type, name, library, callback)

**Description:**

Retrieves a specific user's authority for an object to the caller

**Syntax:**

retrUsrAuth(user, type, name, library, callback)

**Parameters:**
- **user** `<string>` the name of the user whose object authority is returned

  Special values:

  - `*CURRENT` the authority of the user currently running to the specified object is returned.

  - `*PUBLIC` the public authority for the object is returned.

- type `<string>` the type of object for which authority information is returned. For example, if the target object is a program, then *PGM should be set to the type parameter.

- **name** `<string>` the object name.

- **library** `<string>` the library name.

  Special values:

  - `*CURLIB` the current library is used to locate the object. If there is no current library, QGPL (general purpose library) is used.

  - `*LIBL` the library list is used to locate the object.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs. If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                                    |
| -----                                  |
| Object_authority_/_Data_authority      |
| Authorization_list_management          |
| Object_operational                     |
| Object_management                      |
| Object_existence                       |
| Data_read                              |
| Data_add                               |
| Data_update                            |
| Data_delete                            |
| Authorization_list                     |
| Authority_source                       |
| Some_adopted_authority                 |
| Adopted_object_authority               |
| Adopted_authorization_list_management  |
| Adopted_object_operational             |
| Adopted_object_management              |
| Adopted_object_existence               |
| Adopted_data_read                      |
| Adopted_data_add                       |
| Adopted_data_update                    |
| Adopted_data_delete                    |
| Adopted_data_execute                   |
| Reserved                               |
| Adopted_object_alter                   |
| Adopted_object_reference               |
| Data_execute                           |
| Object_alter                           |
| Object_reference                       |
| ASP_device_name_of_library             |
| ASP_device_name_of_object              |
| Offset_to_group_information_table      |
| Number_of_group_table_entries_returned |


**IBM i API:**

[QSYRUSRA](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qsyrusra.htm)

**Example:**

```js
const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.retrUsrAuth('*PUBLIC', '*PGM', 'XMLCGI', 'QXMLSERV', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

### iObj.retrCmdInfo(command, [library,] callback)

**Description:**

Retrieves information from a command definition object.

**Syntax:**

retrCmdInfo(cmd, [library,] callback)

**Parameters:**

- **command** `<string>` the command name.

- **library** `<string>` the library name. If it is undefined, `*LIBL` will be used.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs. If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                                                                  |
| -----                                                                |
| Command_name                                                         |
| Command_library_name                                                 |
| Command_processing_program_or_proxy_target_command                   |
| Command_processing_program's_or_proxy_target_command's_library name  |
| Source_file_name                                                     |
| Source_file_library_name                                             |
| Source_file_member_name                                              |
| Validity_check_program_name                                          |
| Validity_check_program_library_name                                  |
| Mode_information                                                     |
| Where_allowed_to_run                                                 |
| Allow_limited_user                                                   |
| Maximum_positional_parameters                                        |
| Prompt_message_file_name                                             |
| Prompt_message_file_library_name                                     |
| Message_file_name                                                    |
| Message_file_library_name                                            |
| Help_panel_group_name                                                |
| Help_panel_group_library_name                                        |
| Help_identifier                                                      |
| Search_index_name                                                    |
| Search_index_library_name                                            |
| Current_library                                                      |
| Product_library                                                      |
| Prompt_override_program_name                                         |
| Prompt_override_program_library name                                 |
| Restricted_to_target_release                                         |
| Text_description                                                     |
| Command_processing_program_call_state                                |
| Validity_check_program_call_state                                    |
| Prompt_override_program_call_state                                   |
| Offset_to_help_bookshelf_information                                 |
| Length_of_help_bookshelf_information                                 |
| Coded_character_set_ID_(CCSID)                                       |
| Enabled_for_GUI_indicator                                            |
| Threadsafe_indicator                                                 |
| Multithreaded_job_action                                             |
| Proxy_command_indicator                                              |
| Prompt_message_file_text_indicator                                   |

**IBM i API:**

[QCDRCMDI](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qcdrcmdi.htm)

**Example:**

```js
const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.retrCmdInfo('CRTLIB', '*LIBL', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```


### iObj.retrPgmInfo(program, library, callback)

**Description:**

Retrieves information from a program object.

**Syntax:**

retrPgmInfo(pgm, lib, callback)

**Parameters:**
- **program** `<string>` The program name.

- **library** `<string>` The library name. If it is undefined, *LIBL will be used.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs. If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                                          |
| -----                                        |
| Program_name                                 |
| Program_library_name                         |
| Program_owner                                |
| Program_attribute                            |
| Creation_date_and_time                       |
| Source_file_name                             |
| Source_file_library_name                     |
| Source_file_member_name                      |
| Source_file_updated_date_and_time            |
| Observable_information                       |
| User_profile_option                          |
| Use_adopted_authority                        |
| Log_commands                                 |
| Allow_RTVCLSRC                               |
| Fix_decimal_data                             |
| Text description                             |
| Type_of_program                              |
| Teraspace_storage-enabled_program            |
| Reserved                                     |
| Minimum_number_of_parameters                 |
| Maximum_number_of_parameters                 |
| Program_size                                 |
| Associated_space_size                        |
| Static_storage_size                          |
| Automatic_storage_size                       |
| Number_of_MI_instructions                    |
| Number_of_MI_ODT_entries                     |
| Program_state                                |
| Compiler_identification                      |
| Earliest_release_program_can_run             |
| Sort_sequence_table_name                     |
| Sort_sequence_table_library name             |
| Language_identifier                          |
| Program_domain                               |
| Conversion_required                          |
| Conversion_details                           |
| Optimization                                 |
| Paging_pool                                  |
| Update_program_automatic_storage_area_(PASA) |
| Clear_program_automatic_storage_area_(PASA)  |
| Paging_amount                                |
| Program_entry_procedure_module               |
| Program_entry_procedure_module_library       |
| Activation_group_attribute                   |
| Observable_information_compressed            |
| Run-time_information_compressed              |
| Release_program_created_on                   |
| Shared_activation_group                      |
| Allow_update                                 |
| Program_CCSID                                |
| Number_of_modules                            |
| Number_of_service_programs                   |
| Number_of_copyrights                         |
| Number_of_unresolved_references              |
| Release_program_created_for                  |
| Allow_static_storage_reinitialization        |
| All_creation_data                            |
| Allow_bound_*SRVPGM_library_name_update      |
| Profiling_data                               |
| Teraspace_storage_enabled_modules            |
| Storage_model                                |
| Uses_argument_optimization_(ARGOPT)          |

**IBM i API:**

[QCLRPGMI](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qclrpgmi.htm)

**Example:**

```js
const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.retrPgmInfo('XMLCGI', 'QXMLSERV', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```


### iObj.retrSrvPgmInfo(program, library, callback)

**Description:**

Retrieves information from a service program object.

**Syntax:**

retrSrvPgmInfo(program, library, callback)

**Parameters:**

- **program** `<string>` the service program name.

- **library** `<string>` the library name. If it is undefined, *LIBL will be used.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs. If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                                      |
| -----                                    |
| Service_program_name                     |
| Service_program_library_name             |
| Service_program_owner                    |
| Service_program_attribute                |
| Creation_date_and_time                   |
| Export_source_file_name                  |
| Export_source_file_library_name          |
| Export_source_file_member_name           |
| Activation_group_attribute               |
| Current_export_signature                 |
| User_profile                             |
| Observable_information_compressed        |
| Run-time_information_compressed          |
| Service_program_CCSID                    |
| Number_of_modules                        |
| Number_of_service_programs               |
| Number_of_copyrights                     |
| Text_description                         |
| Shared_activation_group                  |
| Allow_update                             | 
| Number_of_unresolved_references          |
| Use_adopted_authority                    |
| Allow_bound_*SRVPGM_library_name_update  |
| Profiling_data                           |
| Teraspace_storage_enabled_modules        |
| Storage_model                            |
| Uses_argument_optimization_(ARGOPT)      |
| Reserved_'00'X                           |
| Service_program_state                    |
| Service program_domain                   |
| Associated_space_size                    |
| Static_storage_size                      |
| Service_program_size                     |
| Release_service_program_created_on       |
| Earliest_release_service_program_can_run |
| Release_service_program_created_for      |
| Allow_static_storage_reinitialization    |
| Conversion_required                      |
| All_creation_data                        |
| Conversion_details                       |
| Reserved                                 |
| Paging_pool                              |
| Paging_amount                            |


**IBM i API:**

[QBNRSPGM](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qbnrspgm.htm)

**Example:**

```js
const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.retrSrvPgmInfo('QZSRVSSL', 'QHTTPSVR', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```


### iObj.retrUserInfo(user, callback)

**Description:**

Retrieves information about a user profile.

**Syntax:**

retrUserInfo(user, callback)

**Parameters:**
- **user** `<string>` the user profile.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is an `<object>` when successful or `null` when transport error occurs. If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                            |
| -----                          |
| User_profile_name              |
| Previous_sign-on_date_and_time |
| Reserved                       |
| Sign-on_attempts_not_valid     |
| Status                         |
| Password_change_date           |
| No_password_indicator          |
| Reserved                       |
| Password_expiration_interval   |
| Date_password_expires          |
| Days_until_password_expires    |
| Set_password_to_expire         |
| Display_sign-on_information    |
| Local_password_management      |
| Block_password_change          |

**IBM i API:**

[QSYRUSRI](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/apis/qsyrusri.htm)

**Example:**

```js
const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.retrUserInfo('QSYS', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```


### iObj.retrUserAuthToObj(path, callback)

**Description:**

Retrieves information about the users who are authorized to an object.

**Syntax:**

retrUserAuthToObj(path. callback)

**Parameters:**

- **path** `<string>` the absolute path of the object.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<object>` output when successful or `null` when transport error occurs. If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**output**

| Key                           |
| -----                         |
| Profile_name                  |
| User_or_group indicator       |
| Data_authority                |
| Authorization_list_management |
| Object_management             |
| Object_existence              |
| Object_alter                  |
| Object_reference              |
| Reserved                      |
| Object_operational            |
| Data_read                     |
| Data_add                      |
| Data_update                   |
| Data_delete                   |
| Data_execute                  |

**IBM i API:**

[QSYRTVUA](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/apis/qsyrtvua.htm)

**Example:**

```js
const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.retrUserAuthToObj('/home', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```


### iObj.addToLibraryList(library, callback)

**Description:**

Retrieves information about the users who are authorized to an object.

**Syntax:**

addToLibraryList(library)

**Parameters:**

- **library** `striing` the library name to be added to the library list.

- **callback** `<function>` to handle the output.
  - The first parameter added to the callback is `error`. This is an `Error` object when a occurs or `null`.
  - The second parameter added to the callback is `output`. This is `<boolean> true` when successful or `null` when transport error occurs. If there was a problem parsing the xmlOutput this will resolve to `<string>` raw xml output from XMLSERVICE.

**IBM i API:**

[QLICHGLL](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/rbam6/chglibl.htm)

**Example:**

```js
const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.addToLibraryList('QHTTPSVR', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
```

## iPgm

The `iPgm` class is deprecated. Use the [ProgramCall](#Class-ProgramCall) class instead.

## iProd

The `iProd` class is deprecated. Use the [Toolkit](#Class-Toolkit) class instead.

From the Toolkit class you may access:
- [getPTFInfo](#ToolkitgetPTFInfonumber-callback)
- [getProductInfo](#ToolkitgetProductInfoname-option-callback)
- [getInstalledProducts](#ToolkitgetInstalledProductscallback)

## iQsh

The `iQsh` class is deprecated. Use the [CommandCall](#Class-CommandCall) class instead.

## iSh

The `iSh` class is deprecated. Use the [CommandCall](#Class-CommandCall) class instead.

## iSql

Generates input xml used by XMLSERVICE to run an SQL query.

iSql works well when performing simple database queries.

For advanced database operations you should use [odbc](https://www.npmjs.com/package/odbc) or [idb-connector](https://www.npmjs.com/package/idb-connector) pacakges.

### Examples

#### run a query

```js
const { Connection, iSql } = require('itoolkit');
const { parseString } = require('xml2js');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const sql = new iSql();

sql.addQuery('SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT');
sql.fetch();
sql.free();

connection.add(sql);

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(JSON.stringify(result));
  });
});
```

#### call a procedure

```js
const { Connection, iSql } = require('itoolkit');
const { parseString } = require('xml2js');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const sql = new iSql();

sql.prepare('call qsys2.tcpip_info()');
sql.execute();
sql.fetch();
sql.free();

connection.add(sql);

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(JSON.stringify(result));
  });
});
```

## Constructor: iSql()

**Description:**

Constructs a new iSql object.


**Returns:**

<object> a iSql object.

## iSql.addQuery(statement[,options])

**Description:**

Adds `query` element to the iSql object.

This element runs an SQL query.

**Syntax:**

addQuery(statement[,options])

**Parameters:**

- **statement** `<string>` The SQL statement.

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. This is the default value|

**Example:**

See the [example](#run-a-query) above.


## iSql.tables(params[,options])

**Description:**

Adds `table` element to the iSql object.

This element retrieves table metadata.

**Syntax:**

tables(params[,options])

**Parameters:**

- **params** `<array>` in the format outlined below
  
 | Index  | Type    | Description                                                             |
 | ----   | ------- | -------                                                                 |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string. |
 | 1      | string  | The schema name for the table.                                          |
 | 2      | string  | The name of the table.                                                  |
 | 3      | string  | The type of the table.<br>This may be  an empty string.                 |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.tablePriv(params[,options])

**Description:**

Adds `tablepriv` element to the iSql object.

This element retrieves table privledge metadata.

**Syntax:**

tablePriv(params[,options])

**Parameters:**

- **params** `<array>` in the format outlined below
  
 | Index  | Type    | Description                                                                  |
 | ----   | ------- | -------                                                                      |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 1      | string  | The schema name for the table.                                               |
 | 2      | string  | The name of the table.                                                       |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. |

## iSql.columns(params[,options])

**Description:**

Adds `column` element to iSql object.

This element retrieves metadata on a column.

**Syntax:**

columns(params[,options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                        |
 | ----   | ------- | -------                                                                      |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 1      | string  | The schema name for the column.                                              |
 | 2      | string  | The name of the table.                                                       |
 | 3      | string  | The name of the column.                                                      |

- **[options]** `<object>` in the format outlined below:

| Key        | Type    | Value |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. |


## iSql.special(params[,options])

**Description:**

Adds `special` element to iSql object.

This element retrieves metadata on special column.

**Syntax:**

special(params[,options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                        |
 | ----   | ------- | -------                                                                      |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 1      | string  | The schema name for the column.                                              |
 | 2      | string  | `row \| transaction \| session`                                                 |
 | 3      | string  | `no \| nullable`                                                              |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.statistics(params[,options])

**Description:**

Adds `statistics` element to iSql object.

This element retrieves statistics on a table.

Retrieves a list of statistics about a table and the indexes associated with the table.


**Syntax:**

statistics(params[,options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                   |
 | ----   | ------- | -------                                                                 |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string. |
 | 1      | string  | The schema name for the column.                                         |
 | 2      | string  | The name of the table.                                                  |
 | 3      | string  | `all \| unique` specifies level of stats returned                        |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Description |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.columnPriv(params[,options])

**Description:**

Adds `columnpriv` element to the iSql object.

This element retrieves column privledge metadata.

**Syntax:**

columnPriv(params[,options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                   |
 | ----   | ------- | -------                                                                 |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string. |
 | 1      | string  | The schema name for the column.                                         |
 | 2      | string  | The name of the table.                                                  |
 | 3      | string  | The name of the column.                                                 |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Description |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.procedures(params[, options])

**Description:**

Adds `procedures` element to the iSql object.

This element retrieves procedure metadata.

**Syntax:**

procedures(params[, options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                        |
 | ----   | ------- | -------                                                                      |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 1      | string  | The schema name for the column.                                              |
 | 2      | string  | The name of the procedure.                                                   |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Description |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.pColumns(params[, options])

**Description:**

Adds `pColumns` element to the iSql object.

This column retrieves procedure columns metadata.

**Syntax:**

pColumns(params[, options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                        |
 | ----   | ------- | -------                                                                      |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 1      | string  | The schema name for the column.                                              |
 | 2      | string  | The name of the procedure.                                                   |
 | 2      | string  | The name of the column.                                                      |

- **[options]** `<object>` in the format outlined below:

| Key        | Type    | Description |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.primaryKeys(params[, options])

**Description:**

Adds `primaryKeys` element to the iSql object.

This element retrieves primary key metadata.

**Syntax:**

primaryKeys(params[, options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                        |
 | ----   | ------- | -------                                                                      |
 | 0      | string  | The qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 1      | string  | The schema name for the column.                                              |
 | 2      | string  | The name of the table.                                                       |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.foreignKeys(params[, options])

**Description:**

Adds `foreignKeys` element to the iSql object.

This element Retrieves foreign key metadata.

**Syntax:**

foreignKeys(params[, options])

**Parameters:**

- **params** `<array>` in the format outlined below:
  
 | Index  | Type    | Value                                                                                    |
 | ----   | ------- | -------                                                                                  |
 | 0      | string  | The primary key qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 1      | string  | The primary key schema name for the column.                                              |
 | 2      | string  | The primary name of the table.                                                           |
 | 3      | string  | The foreign key qualifer or catalog for the table.<br>This may be  an empty string.      |
 | 4      | string  | The foreign key schema name for the column.                                              |
 | 5      | string  | The foreign name of the table.                                                           |

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. |


## iSql.rowCount([options])

**Description:**

Adds `rowCount` element to the iSql object.

This element retrieves rows affected by a change. This should be performed after  UPDATE, INSERT, or DELETE statement.

**Syntax:**

rowCount([options])

**Parameters:**

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.count([options])

**Description:**

Adds `count` element to the iSql object.

This element counts the number of column results, params, or both depending on the option set.

count([options])

**Syntax:**

count([options])

**Parameters:**

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|


## iSql.describe([options])

**Description:**

**Syntax:**

describe([options])

Adds `describe` element to the iSql object.

This element describes a parameter.

**Parameters:**

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| desc       | string  | `param` - describe parameters<br>`col` - describe columns<br>`both` - describe both. This is the default. |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|

**Example:**

## iSql.free()

**Description:**

Adds `free` element to the iSql object.

This element releases resources.

**Syntax:**

free()

**Example:**

See the [example](#run-a-query) above.

## iSql.fetch([options])

**Description:**

Adds `fetch` element to the iSql object.

This element retrieves a result set.

**Syntax:**

fetch([options])

**Parameters:**

- **[options]** `<object>` in the format outlined below

| Key        | Type    | Value                          |
| ----       | ------- | -------                        |
| block      | string  | `all \| n`<br>The default is `all` |
| desc       | string  | `on \| off`<br>The default is `on` |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log.|

**Example:**

See the [example](#call-a-prodecure) above.

## iSql.commit(options)

**Description:**

Adds `commit` element to the iSql object.

This element commits or rolls back a transaction.

**Syntax:**

commit(options)

**Parameters:**

- **options** `<object>` in the format outlined below:

| Key        | Type    | Value |
| ----       | ------- | -------     |
| action     | string  | `commit` - Commit the operations.<br>`rollback` - Rollback the operations.<br>This key is required. |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log<br>This key is optional |


## iSql.prepare(statement[, options])

**Description:**

Adds `prepare` element to the iSql object.

This element prepares a SQL statement.

**Syntax:**

prepare(statement[,options])

**Parameters:**

- **statement** `<string>` the SQL statement to prepare.

- **[options]** `<object>` in the format outlined below:

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. This is the default value |

**Example:**

See the [example](#call-a-prodecure) above.

## iSql.execute([params,[options]])

**Description:**

Adds `execute` element to the iSql object.

This element executes a prepared statement.

**Syntax:**

execute([params[,options]])

**Parameters:**

- **params** `<array>` the parameter list. Each item of the list contains two fields:
   - io `<string>` valid values include `(in, out, both)`
   - value `<string>` - the value of the parameter.

- **[options]** `<object>`

| Key        | Type    | Value       |
| ----       | ------- | -------     |
| error      | string  | `on` - script stops, full error report<br>`off` - script continues, job error log<br>`fast` - script continues, brief error log. This is the default value |

**Example:**

See the [example](#call-a-prodecure) above.


## iSql.toXML()

**Description:**

Returns the iSql in xml format

**Syntax:**

toXML()

**Returns:**

`<string>` the iSql in xml format

**Example:**

```js
const { Connection, iSql } = require('itoolkit');
const { parseString } = require('xml2js');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const sql = new iSql();

sql.addQuery('SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT');

console.log(sql.toXML());
```

## iUserSpace

The `iUserSpace` class is deprecated. Use the [Toolkit](#Class-Toolkit) class instead.

From the Toolkit class you may access:
- [sendToDataQueue](#ToolkitsendToDataQueuename-library-data-callback)
- [receiveFromDataQueue](#ToolkitreceiveFromDataQueuename-library-size-callback)
- [clearDataQueue](#ToolkitclearDataQueuename-library-callback)

## iWork

The `iWork` class is deprecated. Use the [Toolkit](#Class-Toolkit) class instead.

From the Toolkit class you may access:
- [sendToDataQueue](#ToolkitsendToDataQueuename-library-data-callback)
- [receiveFromDataQueue](#ToolkitreceiveFromDataQueuename-library-size-callback)
- [clearDataQueue](#ToolkitclearDataQueuename-library-callback)

## xmlToJson(xml)

**Description:**

Converts XMLSERVICE output into an array of objects.

Each object in the array represents the program, command, or sql call that was made.

**Syntax:**

xmlToJson(xml)

**Parameters:**

- **xml** `<string>` the XMLSERVICE output to convert.

**Returns:**

`<array>` each element of the array is an object.

**Example:**

```js
const { Connection, CommandCall, xmlToJson } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

connection.add(new CommandCall({ type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)'}));

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  const result = xmlToJson(xmlOutput);
  console.log(result);
});
```

Expected Result:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<myscript>
   <cmd exec="rexx" error="fast">
      <success>+++ success RTVJOBA USRLIBL(?) SYSLIBL(?)</success>
      <row>
         <data desc="USRLIBL">QGPL  QTEMP</data>
      </row>
      <row>
         <data desc="SYSLIBL">QSYS  QSYS2  QHLPSYS  QUSRSYS</data>
      </row>
   </cmd>
</myscript>
```

```json
[
    {
        "type": "cmd",
        "success": true,
        "cmd": "RTVJOBA USRLIBL(?) SYSLIBL(?)",
        "data": [
            {
                "name": "USRLIBL",
                "value": "QGPL  QTEMP"
            },
            {
                "name": "SYSLIBL",
                "value": "QSYS  QSYS2  QHLPSYS  QUSRSYS"
            }
        ]
    }
]
```