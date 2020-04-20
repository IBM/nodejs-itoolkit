const { readFileSync } = require('fs');

let privateKey;
if (process.env.TKPK) {
  privateKey = readFileSync(process.env.TKPK, 'utf-8');
}

const config = {
  transport: process.env.TKTRANSPORT || 'ssh',
  verbose: !!process.env.TKVERBOSE,
  transportOptions: {
    database: process.env.TKDB || '*LOCAL',
    username: process.env.TKUSER || '',
    password: process.env.TKPASS || '',
    host: process.env.TKHOST || 'localhost',
    port: process.env.TKPORT,
    path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
    url: process.env.TKURL,
    privateKey,
    // passphrase is used by the ssh transport to decrypt the private key
    passphrase: process.env.TKPHRASE,
    dsn: process.env.TKDSN,
  },
};

function printConfig() {
/* eslint-disable no-console */
  console.log('-----------------------');
  console.log('transport:', config.transport);
  console.log(`verbose: ${config.verbose ? 'on' : 'off'}`);
  console.log('-----------------------');
}

module.exports.config = config;
module.exports.printConfig = printConfig;
