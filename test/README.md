# Node.js Toolkit Tests

Ensure dependencies are installed

From the root of the project run: `npm install`

***NOTE***

Some tests require creating libraries, objects, tables, etc. 

A before hook is setup to check for theses objects and create if needed.

These hooks are ran with `idb-pconnector` which requires to be run on IBM i.

In any case, the functional tests test for both transports Db2 and REST.

Using Db2 transport requires `idb-connector` which only runs on IBM i systems.

Tests using these hooks will fail on non IBM i systems.

# Running Tests

From the project root

`npm test test/foo`

where foo is the name of subdir such as `unit` or or individual test file.

***NOTE***

If you experience timeout issue with network calls add

`"test": "./node_modules/mocha/bin/mocha" --timeout Xs `

within `package.json` file, where X is the number of seconds before timeout

# Setup Rest interface
- view the [README](../README.md#rest)

# Setup SSH interface
- view the [README](../README.md#ssh)

# Configuring Tests
Each functional test contains an config object that is used to create connections

It is recommend to setup environment variables for these configurations

Instead of hard coding credentials with the test file.

you can set environment varaibales with `export KEY='value'`


For all tests
---
- verbose `TKVERBOSE` enables verbose mode

For idb-connector Tests
---

- user `TKUSER` defaults to ''

- password `TKPASS` defaults to ''

- database `TKDB` defaults to `*LOCAL`


For Rest Tests
---
- host `TKHOST` defaults to `localhost`

- user `TKUSER` defaults to ''

- password `TKPASS` defaults to ''

- port `TKPORT`

- path `TKPATH` defaults to `/cgi-bin/xmlcgi.pgm`

For SSH Tests
---

- host `TKHOST` defaults to `localhost`

- user `TKUSER` defaults to ''

- password `TKPASS` defaults to ''

- port `TKPORT`

- privateKey `TKPK`

- passphrase `TKPHRASE`

