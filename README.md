# Node.js itoolkit <!-- omit in toc -->

[![npm](https://img.shields.io/npm/v/itoolkit?logo=npm)](https://www.npmjs.com/package/itoolkit)
![Supported Node Versions](https://img.shields.io/node/v-lts/itoolkit)
[![ryver-chat](https://img.shields.io/badge/Ryver-Chat-blue)](https://ibmioss.ryver.com/index.html#forums/1000127)
[![ryver-signup](https://img.shields.io/badge/Ryver-Signup-blue)](https://ibmioss.ryver.com/application/signup/members/9tJsXDG7_iSSi1Q)
[![Documentation Status](https://readthedocs.org/projects/nodejs-itoolkit/badge/?version=latest)](https://nodejs-itoolkit.readthedocs.io/en/latest/?badge=latest)

`itoolkit` is a Node.js interface to [XMLSERVICE](https://github.com/IBM/xmlservice) to access all things [IBM i](https://en.wikipedia.org/wiki/IBM_i).

# Table of Contents <!-- omit in toc -->
- [Introduction](#introduction)
- [Installation](#installation)
- [Features](#features)
- [Documentation](#documentation)
- [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)
- [Release](#release)

# Introduction

[XMLSERVICE](https://github.com/IBM/xmlservice) provides interfaces to interact with IBM i resources such as programs and commands. XMLSERVICE receives xml input and returns xml output.

For example run a CL command by sending the following XML input to XMLSERVICE.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<myscript>
   <cmd exec="rexx">RTVJOBA USRLIBL(?) SYSLIBL(?)</cmd>
</myscript>
```

XMLSERVICE will run the command and respond with XML output.

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

`itoolkit`, with the help of an XML parser, can run the same CL command with:

```js
const { Connection, CommandCall } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');

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

  const Parser = new XMLParser();
  const result = Parser.parse(xmlOutput);

  console.log(JSON.stringify(result));
});
```

The purpose of this package is to simplify the process of creating XMLSERVICE input, invoking XMLSERVICE, and returning XMLSERVICE output from Node.js.

# Installation

```sh
$ npm install itoolkit
```

# Features
- [Call ILE programs and service programs](https://nodejs-itoolkit.readthedocs.io/en/latest/ProgramCall.html)
- [Call CL, QSH, and PASE shell commands](https://nodejs-itoolkit.readthedocs.io/en/latest/CommandCall.html)

# Documentation
Please read the [docs](https://nodejs-itoolkit.readthedocs.io/en/latest/).

# Tests
Refer to the [README](test/README.md).

# Contributing
Please read the [contribution guidelines](https://github.com/IBM/nodejs-itoolkit/blob/master/CONTRIBUTING.md).

# License
[MIT](https://github.com/IBM/nodejs-itoolkit/blob/master/LICENSE)

# Release

For information on making a release, read [RELEASE.md](docs/RELEASE.md).
