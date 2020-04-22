# Migrating from itoolkit v0.x to v1.x

If you are upgrading an existing application its a great idea to have good test coverage before upgrading.

Most applications applications using a version < 1.0.0 should continue to work but it's still highly recommended to test your application first.

## 🚨 BREAKING CHANGES 🚨

### `iConn.run()` no longer supports sync mode
Sync mode did not work properly to begin with see ([#32](https://github.com/IBM/nodejs-itoolkit/issues/32)).

### `iConn.setTimeout()` is removed
This function was used to set timeout for `iConn.run` sync mode.

### `iSql.connect()` and `iSql.setOptions()` are removed

These functions were used in conjunction for XMLSERVICE user authentication. The transports already handle user authentication.

## New Features

### SSH and ODBC transports
Users can now use `ssh` and `odbc` transports. This will allow users more ways to use itoolkit on their local machine.

### Support error first callbacks
`iConn.run()` did not return errors to the run callback. `Connection.run()` follows Node.js convention of [error first callbacks](https://nodejs.org/api/errors.html#errors_error_first_callbacks).  `Connection` still has a compatability option `returnError` to behave like `iConn.run()` and return the xml output as the first parameter of the run callback.

### Support DS types within addReturn

- `iPgm.addReturn` did not support the DS data type, `ProgramCall.addReturn` added support.

## Deprecated Classes and Functions
### iConn
The `iConn` class was replaced with the `Connection` class and it will be removed in `v2.x`.

### Differences

- `Connection` constructor accepts single object parameter.
- `Connection.run()` follows Node.js convention of error first [error first callbacks](https://nodejs.org/api/errors.html#errors_error_first_callbacks).

#### Migrating from `iConn` to `Connection` Constructor

```js
// using idb transport

// const conn = new iConn("*LOCAL", "myuser", "mypassword");

const conn = new Connection({
  transport: 'idb',
  transportOptions: { database: '*LOCAL', username: 'myuser', password: 'mypassword' }
});

// using rest transport

// const restConfig = { host: 'myhost', port: 80, path: '/' }
// const conn = new iConn('*LOCAL', 'myuser', 'mypassword', restConfig);

const conn = new Connection({
  transport: 'rest',
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

#### Migrating from `iConn.run()` to `Connection.run()`

1. Create an instance of Connection with `returnError` set to false. This is a compatabilty option to behave like `iConn.run()` and return the xml output as the first parameter of the run callback.

```js
// const conn = new iConn("*LOCAL", "myuser", "mypassword");

const conn = new Connection({
  transport: 'idb',
  returnError: false,
  transportOptions: { database: '*LOCAL', username: 'myuser', password: 'mypassword' }
});

conn.add(...)

conn.run((xmlOutput) => {
    ...
})
```

2.  Test your application still works as expected using this instance of `Connection`.

3. Update `Connection.run()` callbacks to expect an error as the first parameter.

```js
conn.run((error, xmlOutput) => {
    if (error) { throw error; }
});
```

4. Remove `returnError` property from the `Connection` constructor. The default behavior is to return error first callbacks.

```js
const conn = new Connection({
  transport: 'idb',
  transportOptions: { database: '*LOCAL', username: 'myuser', password: 'mypassword' }
});

```

### iPgm
`iPgm` was replaced by the `ProgramCall` and will be removed in `v2.x`.

### Differences

- Data and data structures and are now defined as objects.
- `ProgramCall.addParam()` now accepts a single object parameter.
- `ProgramCall.addReturn()` now accepts a single object parameter,
- `ProgramCall.addReturn()` now supports DS as return type.

#### Migrating from `iPgm.addParam()` to `ProgramCall.addParam()`

Parameter and data options are passed with the object parameter. Ensure you specify the data type odefaulting to use `1024a` is deprecated.

```js
// iPgm.addParam('0', '10i0', { io: 'in', setlen: 'rec1' })

ProgramCall.addParam({ type: '10i0', io: 'in', setlen: 'rec1', value: 0 })

```

Data structures have type `ds` and an additional `fields` property which is an array of data or ds objects.

```js
/*
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
*/

// iPgm.addParam(ds, { io: 'out', dim: '1' });

const ds = {
  type: 'ds',
  dim: '1',
  io: 'out',
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

ProgramCall.addParam(ds);
```

#### Migrating from `iPgm.addReturn()` to `ProgramCall.addReturn()`
Data previously defined as:

`addReturn('', '10A', { varying: '4' })`

Will now be defined as:

`addReturn({type: '10A', value: '', varying: '4' })`

#### iCmd
`iCmd` is replaced by `CommandCall` and will be removed in `v2.x`.

A command previously generated with:

`const command = iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)')`

Will now be generated with:

`const command = new CommandCall({type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)' })`

### iQsh
`iQsh` is replaced by `CommandCall` and will be removed in `v2.x`.

A command previously generated with:

`const command = iQsh('system wrksyssts')`

Will now be generated with:

`const command = new CommandCall({type: 'qsh', command: 'system wrksyssts' })`

### iSh
`iSh` is replaced by `CommandCall` and will be removed in `v2.x`.

A command previously generated with:

`const command = iSh('ls /home')`

Will now be generated with:

`const command = new CommandCall({type: 'sh', command: 'ls /home' })`

### iSql
`iSql` class is deprecated and will be removed in `v2.x`.
The [odbc](https://www.npmjs.com/package/odbc), [idb-connector](https://www.npmjs.com/package/idb-connector), and [idb-pconnector](https://www.npmjs.com/package/idb-pconnector) npm packages are much better SQL interfaces for IBM i and should be used instead.

`iSql.connect` and `iSql.setOptions` are no longer available.

### xmlToJson
`xmlToJson` is deprecated and will be removed in `v2.x`.
Use [xml2js](https://www.npmjs.com/package/xml2js) instead.

### iDataQueue
The `iDataQueue` class is deprecated and will be removed in `v2.x`.

### iNetwork
The `iNetwork` class is deprecated and will be removed in `v2.x`.

### iObj
The `iObj` class is deprecated and will be removed in `v2.x`.

### iProd
The `iProd` class is deprecated and will be removed in `v2.x`.

### iUserSpace
The `iUserSpace` class is deprecated and will be removed in `v2.x`.

### iWork
The `iWork` class is deprecated and will be removed in `v2.x`.
