const { Connection, iWork } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const work = new iWork(connection);

work.getSysValue('QCCSID', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(`QCCSID = ${output}`);
});
