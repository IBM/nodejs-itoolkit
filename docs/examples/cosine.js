const { Connection, ProgramCall } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');

const conn = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const program = new ProgramCall('QC2UTIL2', { lib: 'QSYS', func: 'cos' });

program.addParam({ type: '8f', value: '0' });
program.addReturn({ type: '8f', value: '' });

conn.add(program);
conn.debug(true);

conn.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }

  const Parser = new XMLParser();
  const result = Parser.parse(xmlOutput);

  console.log(result.myscript.pgm.return.data); // 1
});
