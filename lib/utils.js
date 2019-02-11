/* eslint-disable new-cap */
const { iConn } = require('./itoolkit.js');

function returnTransports(opt) {
  const transports = [{ name: 'idb', me: new iConn(opt.database, opt.user, opt.password) },
    { name: 'rest', me: new iConn(opt.database, opt.user, opt.password, opt) },
  ];

  return transports;
}

module.exports = { returnTransports };
