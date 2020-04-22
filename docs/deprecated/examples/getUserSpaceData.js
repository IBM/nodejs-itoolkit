const { Connection, iUserSpace } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const userSpace = new iUserSpace(connection);

userSpace.getUserSpaceData('myuserspace', 'mylib', 20, (error, output) => {
  if (error) {
    throw error;
  }
  console.log(output);
});
