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
    passphrase: process.env.TKPHRASE,
    verbose: !!process.env.TKVERBOSE,
    dsn: process.env.TKDSN,
  },
  restOptions: {
    host: process.env.TKHOST || 'localhost',
    port: process.env.TKPORT || 80,
    path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
  },
};

module.exports.config = config;
