const { Connection, ProgramCall } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');

const conn = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const receiver = {
  name: 'receiver',
  type: 'ds',
  io: 'out',
  len: 'rec1',
  fields: [
    { name: 'bytes_returned', type: '10i0', value: '0' },
    { name: 'bytes_available', type: '10i0', value: '0' },
    { name: 'object_name', type: '10A', value: '' },
    { name: 'object_library_name', type: '10A', value: '' },
    { name: 'object_type', type: '10A', value: '' },
    { name: 'return_library', type: '10A', value: '0' },
    { name: 'storage_pool_number', type: '10i0', value: '0' },
    { name: 'object_owner', type: '10A', value: '' },
    { name: 'object_domain', type: '2A', value: '' },
    { name: 'creation_datetime', type: '13A', value: '' },
    { name: 'object_change_datetime', type: '13A', value: '' },
  ],
};

const errno = {
  name: 'error_code',
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

const objectAndLibrary = {
  type: 'ds',
  fields: [
    { name: 'object', type: '10A', value: 'QCSRC' },
    { name: 'lib', type: '10A', value: '*LIBL' },
  ],
};

const program = new ProgramCall('QUSROBJD', { lib: 'QSYS' });
program.addParam(receiver);
program.addParam({
  name: 'length_of_receiver',
  type: '10i0',
  setlen: 'rec1',
  value: '0',
});
program.addParam({ name: 'format_name', type: '8A', value: 'OBJD0100' });
program.addParam(objectAndLibrary);
program.addParam({ name: 'object_type', type: '10A', value: '*FILE' });
program.addParam(errno);

conn.add(program);

conn.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }

  const Parser = new XMLParser();
  const result = Parser.parse(result);

  console.log(JSON.stringify(result));
});
