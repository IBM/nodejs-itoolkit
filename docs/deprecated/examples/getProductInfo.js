const { Connection, iProd } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const prod = new iProd(connection);

prod.getProductInfo('5770DG1', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
