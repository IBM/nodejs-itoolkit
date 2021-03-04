const { Connection, iUserSpace } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const userSpace = new iUserSpace(connection);

userSpace.createUserSpace('myuserspace', 'mylib', 'LOG', 50, 'EXCLUDE', 'Example User Space', (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
