# Migrating from itoolkit 0.x.x to 1.0.0

### Deprecated Classes and Functions

#### iConn
The `iConn` class is deprecated and will be removed at a later time.

You should migrate to use the `Connection` class instead.

The `Connection` class supports multiple trnasports.

The transport and transport options are specified during object construction.

`Connection.run()` returns error first callback to indicate a transport error.

`Connection.run()` does not support sync mode and always runs asynchronously.


For example creating a `Connection` using ssh transport:

```js
const conn = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
});

conn.add(new CommandCall({ command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)', type: 'cl' }));

conn.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
});
```
#### iPgm
The `iPgm` class is deprecated and will be removed at a later time.

You should migrate to use the `ProgramCall` class instead.

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

Data structures have type `ds` and `fields` property which is an array of data objects.

`ProgramCall.addReturn()` now accepts a single object parameter.

Data previously defined as:

`addReturn('', '10A', { varying: '4' })`

Will now be defined as:

`addReturn({type: '10A', value: '', varying: '4' })`

`ProgramCall.addReturn()` now supports DS as return type.

#### iCmd
The `iCmd` class is deprecated and will be removed at a later time.

You should migrate to use the `CommandCall` class instead using type `cl`.

A command previously generated with:

`iCmd('RTVJOBA USRLIBL(?) SYSLIBL(?)')`

Will now be generated with:

`const command = new CommandCall({type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)' })`

#### iQsh
The `iQsh` class is deprecated and will be removed at a later time.

You should migrate to use the `CommandCall` class instead using type `qsh`.

A command previously generated with:

`iQsh('system wrksyssts')`

Will now be generated with:

`const command = new CommandCall({type: 'qsh', command: 'system wrksyssts' })`

#### iSh
The `iSh` class is deprecated and will be removed at a later time.

You should migrate to use the `CommandCall` class instead using type `sh`.

A command previously generated with:

`iSh('ls /home')`

Will now be generated with:

`const command = new CommandCall({type: 'sh', command: 'ls /home' })`

#### iSql

The `iSql` class is deprecated and will be removed at a later time.

Instead of using `iSql` you should migrate to use `odbc`, `idb-connector`, or `idb-pconnector` npm package.

`iSql.connect` and `iSql.setOptions` are now disabled.

#### xmlToJson

The `xmlToJson` function is deprecated and will be removed at a later time.

You should migrate to use `xml2js` npm package.

#### iDataQueue
The `iDataQueue` class is deprecated and will be removed at a later time.

#### iNetwork
The `iNetwork` class is deprecated and will be removed at a later time.

#### iObj
The `iObj` class is deprecated and will be removed at a later time.

#### iProd
The `iProd` class is deprecated and will be removed at a later time.

#### iUserSpace

The `iUserSpace` class is deprecated and will be removed at a later time.

#### iWork

The `iWork` class is deprecated and will be removed at a later time.
