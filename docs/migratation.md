# Migrating from itoolkit v0 to v1

If you are upgrading an existing application its a great idea to have good test coverage before upgrading.

Most applications applications using a version < 1.0.0 should continue to work but it is still highly recommended to test your application first.

## Major Features

### Added ssh and odbc transports

In addition to the existing `idb` and `rest` transports users can now use `ssh` and `odbc` transports.

These transports will allow users more ways to use itoolkit on their local machine.

### Support error first callbacks

Using `Connection.run()` users now have access to an error first callback to check if a transport error occured.

### Support DS types within return node

Previously `iPgm.addReturn` did not support DS as return types.

This feature was added to `ProgramCall.addReturn`.

## Deprecated Classes and Functions

### iConn
The `iConn` class is deprecated and will be removed in the next major version.

Use the `Connection` class instead.

The `Connection` class supports multiple transports.

The transport and transport options are specified during object construction.

For example creating a `Connection` using ssh transport:

```js
const conn = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});
```

Migrating from `iConn` to `Connection` constructor

`iConn` with idb transport:

```js
const conn = new iConn("*LOCAL", "myuser", "mypassword");
```

`Connection` with `idb` transport:

```js
const conn = new Connection({
  transport: 'idb',
  transportOptions: { database: '*LOCAL', username: 'myuser', password: 'mypassword' }
});

```

`iConn` with `rest` transport:

```js
const restConfig = { host: 'myhost', port: 80, path: '/' }
const conn = new iConn('*LOCAL', 'myuser', 'mypassword', restConfig);
```

`Connection` with `rest` transport:

```js
const conn = new Connection({
  transport: 'idb',
  transportOptions: {
    database: '*LOCAL',
    username: 'myuser',
    password: 'mypassword',
    host: 'myhost',
    port: 80,
    path: '/',
  }
});
```

`Connection.run()` returns error first callback to indicate a transport error.

`Connection.run()` does not support sync mode and always runs asynchronously.

### iPgm
The `iPgm` class is deprecated and will be removed in the next major version.

Use the `ProgramCall` class instead.

`ProgramCall.addParam()` now accepts a single object parameter.

Data and data structures and are now defined as objects.

Data previously defined as:

`addParam('0', '10i0', { setlen: 'rec1' })`

Will now be defined as:

`addParam({ type: '10i0', value: 0, setlen: 'rec1' })`

Notice that the data options are passed with the object parameter.

A data structure previously defined as:

```js
const ds = [
  [0, '10i0'],
  [0, '10i0', { setlen: 'rec2' }],
  ['', '36h'],
  ['', '10A'],
  ['', '1A'],
  ['', '1A'],
  [0, '10i0'],
  [0, '10i0'],
];

progam.addParam(ds, { dim: '1' });
```

Will now be defined as:

```js
const ds = {
  type: 'ds',
  dim: '1',
  fields: [
    { type: '10i0', value: 0 },
    { type: '10i0', value: 0, setlen: 'rec2' },
    { type: '36h', value: '' },
    { type: '10A', value: '' },
    { type: '1A', value: ''},
    { type: '1A', value: ''},
    { type: '10i0', value: 0 },
    { type: '10i0', value: 0 },
  ]
};

progam.addParam(ds);
```

Data structures have type `ds` and an additional `fields` property which is an array of data or ds objects.

`ProgramCall.addReturn()` now accepts a single object parameter, with the same format as `ProgramCall.addParam()`.

Data previously defined as:

`addReturn('', '10A', { varying: '4' })`

Will now be defined as:

`addReturn({type: '10A', value: '', varying: '4' })`

`ProgramCall.addReturn()` now supports DS as return type.

#### iCmd
The `iCmd` class is deprecated and will be removed in the next major version.

Use the `CommandCall` class instead with type set to `cl` instead.

A command previously generated with:

`const command = iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)')`

Will now be generated with:

`const command = new CommandCall({type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)' })`

### iQsh
The `iQsh` class is deprecated and will be removed in the next major version.

Use the `CommandCall` class instead with type set to `qsh` instead.

A command previously generated with:

`const command = iQsh('system wrksyssts')`

Will now be generated with:

`const command = new CommandCall({type: 'qsh', command: 'system wrksyssts' })`

### iSh
The `iSh` class is deprecated and will be removed in the next major version.

Use the `CommandCall` class instead with type set to `sh` instead.

A command previously generated with:

`const command = iSh('ls /home')`

Will now be generated with:

`const command = new CommandCall({type: 'sh', command: 'ls /home' })`

### iSql
The `iSql` class is deprecated and will be removed in the next major version.

The `odbc`, `idb-connector`, and `idb-pconnector` npm packages are much better SQL interfaces for IBM i and should be used instead.

`iSql.connect` and `iSql.setOptions` are no longer available.

### xmlToJson
The `xmlToJson` function is deprecated and will be removed in the next major version.

Use `xml2js` npm package.

### iDataQueue
The `iDataQueue` class is deprecated and will be removed in the next major version.

### iNetwork
The `iNetwork` class is deprecated and will be removed in the next major version.

### iObj
The `iObj` class is deprecated and will be removed in the next major version.

### iProd
The `iProd` class is deprecated and will be removed in the next major version.

### iUserSpace
The `iUserSpace` class is deprecated and will be removed in the next major version.

### iWork
The `iWork` class is deprecated and will be removed in the next major version.
