const { Connection, iNetwork } = require('itoolkit');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const net = new iNetwork(connection);

net.getTCPIPAttr((error, output) => {
  if (error) {
    throw error;
  }
  console.log((output));
});
