const { Connection, iWork } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const work = new iWork(connection);

work.getDataArea('mylibrary', 'mydataarea', 100, (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
