const { Connection, iSql } = require('itoolkit');
const { parseString } = require('xml2js');

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' },
});

const sql = new iSql();

sql.prepare('call qsys2.tcpip_info()');
sql.execute();
sql.fetch();
sql.free();

connection.add(sql);

connection.run((error, xmlOutput) => {
  if (error) {
    throw error;
  }
  parseString(xmlOutput, (parseError, result) => {
    if (parseError) {
      throw parseError;
    }
    console.log(JSON.stringify(result));
  });
});
