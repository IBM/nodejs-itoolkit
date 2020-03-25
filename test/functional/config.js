const { readFileSync } = require('fs');

let privateKey;
if (process.env.TKPK) {
  privateKey = readFileSync(process.env.TKPK, 'utf-8');
}

const config = {
  transport: process.env.TKTRANSPORT || 'ssh',
  transportOptions: {
    database: process.env.TKDB || '*LOCAL',
    username: process.env.TKUSER || '',
    password: process.env.TKPASS || '',
    host: process.env.TKHOST || 'localhost',
    port: process.env.TKPORT,
    path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
    privateKey,
    // passphrase is used by the ssh transport to decrypt the private key
    passphrase: process.env.TKPHRASE,
    verbose: !!process.env.TKVERBOSE,
    dsn: process.env.TKDSN,
  },
};

module.exports.config = config;
