
var assert = require('assert');
var NodeVer = process.version.slice(1,2);
assert.notEqual(NodeVer, '0', 'Unsupported version of Node.js!');
var xt = require('../lib/itoolkit');
var hint = 'check the "success" property in return value'

var opt = {
  xslib : 'XMLSERVICE',
  db   : '*LOCAL',
  user : 'USER',
  pwd  : 'PWD'
  //host : 'ut28p63',
  //port : 80,
  //path : '/cgi-bin/xmlcgi.pgm'
};

var conn = new xt.iConn(opt.db,null,null,opt);
conn.debug(true);
conn.add(xt.iQsh('system wrksyssts'));
conn.run(function(str){
  var results = xt.xmlToJson(str);
  var success = true;
  results.every(function(result, i){
    if(result.hasOwnProperty('success'))
      success = result.success == true;
  });
  console.log(JSON.stringify(results));
});
