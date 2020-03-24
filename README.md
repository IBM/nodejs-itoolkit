# Node.js iToolkit <!-- omit in toc -->

[![NPM](https://nodei.co/npm/itoolkit.png?downloads=true&downloadRank=true)](https://nodei.co/npm/itoolkit/)


`itoolkit` is a Node.js interface to [XMLSERVICE](https://github.com/IBM/xmlservice) to access all things IBM i.

# Table of Contents <!-- omit in toc -->
- [Installation](#installation)
- [Main Classes](#main-classes)
  - [Connection](#connection)
    - [Transports](#transports)
      - [idb-connector](#idb-connector)
      - [REST](#rest)
      - [SSH](#ssh)
      - [ODBC](#odbc)
  - [ProgramCall](#programcall)
    - [Example](#example)
  - [CommandCall](#commandcall)
    - [Example](#example-1)
  - [Utility Toolkit Functions](#utility-toolkit-functions)
- [Documentation](#documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

# Installation

Before installing, download and install Node.js

```sh
    $ npm i itoolkit@alpha
```

## Main Classes

### Connection
The Connection class is used to transport xml input and return xml output.

#### Transports
Supported transports include [idb-connector](https://github.com/IBM/nodejs-idb-connector), REST, SSH, and ODBC.

##### idb-connector
The [idb-connector](https://github.com/IBM/nodejs-idb-connector) transport establishes a database connection and calls XMLSERVICE stored procedure.

**NOTE** the `idb-connector` transport is only supported on an IBM i system.

To use the `idb-connector` transport create an instance of Connection with:

```javascript
const connection = new Connection({
  transport: 'idb',
  transportOptions: { database: '*LOCAL', username: 'myuser', password: 'mypass' }
});
```

##### REST
The REST transport makes an HTTP request to an endpoint that process the XML input and returns XML output.

Initial configuration is required for the endpoint.

A quick example is to add the following to `/www/apachedft/conf/httpd.conf`

```apache
ScriptAlias /cgi-bin/ /QSYS.LIB/XMLSERVICE.LIB/
<Directory /QSYS.LIB/XMLSERVICE.LIB/>
  AllowOverride None
  Require all granted
  SetHandler cgi-script
  Options +ExecCGI
</Directory>
```

- start the server

     ` STRTCPSVR SERVER(*HTTP) HTTPSVR(APACHEDFT)`

- go to `http://HOSTNAME:PORT/cgi-bin/xmlcgi.pgm`

you should see an XML document

To use the `REST` transport create an instance of Connection with:

```javascript
const connection = new Connection({
  transport: 'rest',
  transportOptions: { host: 'myhost', port: 80, path:'/cgi-bin/xmlcgi.pgm' database: '*LOCAL', username: 'myuser', password: 'mypass' }
});
```

##### SSH
The SSH transport executes `xmlservice-cli` program via ssh.

Ensure you have OpenSSH installed on your IBM i system.

Also `xmlservice-cli` is required on the IBM i host with:

`yum install itoolkit-utils`

The [ssh2](https://www.npmjs.com/package/ssh2#client-methods) client module is used to connect and supports both private key and password authentication.

To use the `SSH` transport with private key authentication create an instance of Connection with:

```javascript
const { readFileSync } = require('fs');

const privateKey = readFileSync('path/to/privateKey', 'utf-8');

// NOTE if your privateKey also requires a passphrase provide it

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', privateKey, passphrase: 'myphrase' }
});
```

To use the `SSH` transport with password authentication create an instance of Connection with:

```javascript

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});
```

##### ODBC
The [ODBC](https://github.com/wankdanker/node-odbc/tree/v2.0) transport establishes a database connection and calls XMLSERVICE stored procedure.

Refer to the [odbc setup guide](https://github.com/IBM/ibmi-oss-examples/blob/master/odbc/odbc.md#table-of-contents) for setup instructions.

To use the `ODBC` transport create an instance of Connection with:

```javascript
const connection = new Connection({
  transport: 'odbc',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword'}
});
```

Alternatively you can specify a [DSN](https://github.com/IBM/ibmi-oss-examples/blob/master/odbc/odbc.md#dsns) to use.

To use the `ODBC` transport with a DSN create an instance of Connection with:

```javascript
const connection = new Connection({
  transport: 'odbc',
  transportOptions: { dsn: '*LOCAL'}
});
```
### ProgramCall
The ProgramCall class is used to call IBM i programs and service programs.

#### Example
```javascript
const {
  Connection, ProgramCall,
} = require('itoolkit');

const { parseString } = require('xml2js');

const conn = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

const program = new ProgramCall('QWCRSVAL', { lib: 'QSYS' });
const outBuf = [
  [0, '10i0'],
  [0, '10i0'],
  ['', '36h'],
  ['', '10A'],
  ['', '1A'],
  ['', '1A'],
  [0, '10i0'],
  [0, '10i0'],
];
const errno = [
  [0, '10i0'],
  [0, '10i0', { setlen: 'rec2' }],
  ['', '7A'],
  ['', '1A'],
];

program.addParam(outBuf, { io: 'out' });
program.addParam(66, '10i0');
program.addParam(1, '10i0');
program.addParam('QCCSID', '10A');
program.addParam(errno, { io: 'both', len: 'rec2' });

conn.add(program);


conn.run((error, xmlOutput) => {
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
### CommandCall
CommandCall is used to execute a CL, QSH, or PASE command.

#### Example
```javascript
const {
  Connection, CommandCall,
} = require('itoolkit');

const { parseString } = require('xml2js');

const conn = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

conn.add(new CommandCall({ command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)', type: 'cl' }));

conn.run((error, xmlOutput) => {
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


## Utility Toolkit Functions

Aside from the main classes this toolkit also provides helper functions to access:
- Data Queues
- User Space objects
- Object info
- Product info
- Network info

```js
const {
  Connection, Toolkit,
} = require('itoolkit');

const conn = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

const toolkit = new Toolkit(conn);

toolkit.getSysValue('QCCSID', (error, value) => {
  if (error) {
    throw error;
  }
  console.log(`QCCSID = ${value}`);
});
```

# Documentation
Please read the [docs](docs/README.md).

# Testing
Refer to the [README](test/README.md)

# Contributing
Please read the [contribution guidelines](https://github.com/IBM/nodejs-itoolkit/blob/master/CONTRIBUTING.md).

# License
[`MIT`](https://github.com/IBM/nodejs-itoolkit/blob/master/LICENSE)
