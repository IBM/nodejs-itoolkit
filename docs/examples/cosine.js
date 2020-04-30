const { Connection, ProgramCall } = require('itoolkit');
const { parseString } = require('xml2js');

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
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(result.myscript.pgm[0].return[0].data[0]._); // 1
  });
});
