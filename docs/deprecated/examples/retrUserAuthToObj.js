const { Connection, iObj } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const obj = new iObj(connection);

obj.retrUserAuthToObj('/home', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
