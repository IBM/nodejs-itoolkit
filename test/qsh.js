
const assert = require('assert');
const NodeVer = process.version.slice(1,2);
assert.notEqual(NodeVer, '0', 'Unsupported version of Node.js!');
const xt = require('../lib/itoolkit');
const hint = 'check the "success" property in return value'

const opt = {
  xslib : 'XMLSERVICE',
  db   : '*LOCAL',
  user : 'USER',
  pwd  : 'PWD'
  //host : 'ut28p63',
  //port : 80,
  //path : '/cgi-bin/xmlcgi.pgm'
};

let conn = new xt.iConn(opt.db,null,null,opt);
conn.debug(true);
conn.add(xt.iQsh('system wrksyssts'));
conn.run( (str) => {
  let results = xt.xmlToJson(str);
  let success = true;
  results.every( (result, i) => {
    if(result.hasOwnProperty('success'))
      success = result.success == true;
  });
  console.log(JSON.stringify(results));
});
