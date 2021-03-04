const { Connection, iDataQueue } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const dq = new iDataQueue(connection);

dq.receiveFromDataQueue('mydq', 'mylib', 20, (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
