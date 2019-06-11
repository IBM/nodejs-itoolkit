// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
const {parseString} = require('xml2js');
const deprecate = require('depd');

const iXmlToJsonDeprecate = deprecate('xmlToJson');

async function xmlToJs(xml) {
  const ResultArr = [];
  
  const parseXML = (xml) => {
    return new Promise(resolve => {
      parseString(xml, (err, result) => {
        // console.log(JSON.stringify(result, null, 2));
        resolve(result);
      });
    });
  };
  
  const result = await parseXML(xml);
  const myScript = result.myscript;
  
  for (let [cmdType, command] of Object.entries(result.myscript)) {
    const cmd = command[0];
    const successReg = /^\+\+\+ success (.*?)$/;
    const errorReg = /\*\*\* error (.*?)<\/error>.*?<error>(.*?)<\/error>/;
    
    let rs = { type: cmdType };
    for (let [cmdAttr, cmdProp] of Object.entries(cmd.$ ? cmd.$ : {})) {
      rs[cmdAttr] = cmdProp;
    }
    // parse sh/qsh matches
    if (cmdType === 'sh' || cmdType === 'qsh' ) {
      rs.data = cmd._ ? cmd._ : '';
    }
    
    // parse cmd matches
    else if (cmdType === 'cmd' || cmdType === 'pgm') {
      const sucFlag = cmd.success[0].match(successReg);
      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) {
          [, rs.cmd] = sucFlag;
        }
      } else {
        rs.success = false;
        const errFlag = cmd.match(errorReg);
        if (errFlag && errFlag.length > 1) {
          [, rs.cmd] = errFlag;
        }
        if (errFlag && errFlag.length > 2) {
          [, , rs.error] = errFlag;
        }
      }
      
      if (cmdType === 'cmd' && cmd.row && cmd.row.length > 0) {
        const arr = [];
        cmd.row.forEach((row) => {
          if(row.data && row.data.length > 0) {
            const rowData = row.data[0];
            if (rowData && rowData._ && rowData.$ && rowData.$.desc) {
              arr.push({ 
                name: rowData.$.desc, 
                value: rowData._ ? rowData._ : '' 
              });
            }
          }
        });
        rs.data = arr;
      }
      
      if (cmdType === 'pgm') {
        const parmArray = cmd.parm;
        if (parmArray && parmArray.length > 0) {
          const arr = [];
          parmArray.forEach((parm) => {
            
            let item = {};
            if(parm.$ && parm.$.io)
              item.io = parm.$.io;
            
            if(parm.data && parm.data.length > 0 && parm.data[0].$) {
              item.param = {};
              for (let [ikey, ivalue] of Object.entries(parm.data[0].$)) {
                item.param[ikey] = ivalue;
              }
              if(parm.data[0]._)
                item.param.value = parm.data[0]._;
            }
            
            if(parm.ds && parm.ds.length > 0 && parm.ds[0].data && parm.ds[0].data.length > 0) {
              const parmDs = parm.ds[0].data;
              const ds = [];
              parmDs.forEach((pds) => {
                ds.push({ type : pds.$.type, value : pds._ });
              });
              item.param = ds;
            }
            arr.push(item);
          });
          rs.data = arr;
        }
      }
    } // else if (cmdType === 'cmd' || cmdType === 'pgm')
    
    // parse sql matches
    else if (cmdType === 'sql') {
      const arr = [];
      for (let [key, value] of Object.entries(cmd)) {
        const v = value[0];
        let item = {};
        item.command = key;
        for (let [ikey, ivalue] of Object.entries(v.$ ? v.$ : {})) {
          item[ikey] = ivalue;
        }
        item.result = v._?  v._ : '';

        if(v.success && v.success.length > 0) {
          const sucFlag = v.success[0].match(successReg);
          if (sucFlag && sucFlag.length > 0) {
            item.success = true;
            if (sucFlag.length > 1) {
              [, item.sql] = sucFlag;
            }
          } else {
            item.success = false;
            const errFlag = v.success.match(errorReg);
            if (errFlag && errFlag.length > 1) {
              [, item.sql] = errFlag;
            }
            if (errFlag && errFlag.length > 2) {
              [, , item.error] = errFlag;
            }
          }
        }

        const rows = v.row;
        if(rows && rows.length > 0) {
          const rowsData = [];
          rows.forEach((row) => {
            const data = row.data;
            if(data && data.length > 0) {
              const rowData = [];
              data.forEach((field) => {
                rowData.push({ desc : field.$.desc, value : field._});
              });
              rowsData.push(rowData);
            }
          });
          item.result = rowsData;
        }
        arr.push(item);
      }
      rs.data = arr;
    } // else if (cmdType === 'sql')
    ResultArr.push(rs);
  }
  // console.log(JSON.stringify(ResultArr, ' ', 2));
  return ResultArr;
}

const xmlToJson = (xml) => {
  iXmlToJsonDeprecate('As of v1.0, class \'xmlToJson()\' is deprecated. Please use \'xmlToJs\' instead.');
  const cmdRegG = /<cmd.*?>[\s\S]+?<\/cmd>/g;
  const shRegG = /<sh.*?>[\s\S]+?<\/sh>/g;
  const qshRegG = /<qsh.*?>[\s\S]+?<\/qsh>/g;
  const pgmRegG = /<pgm.*?>[\s\S]+?<\/pgm>/g;
  const sqlRegG = /<sql.*?>[\s\S]+?<\/sql>/g;

  const shReg = /<sh.*?>([\s\S]+?)<\/sh>/;
  const qshReg = /<qsh.*?>([\s\S]+?)<\/qsh>/;
  const pgmReg = /<pgm name='(.*?)' lib='(.*?)'.*?>/;

  const successReg = /<success>.*?\+\+\+ success (.*?)<\/success>/;
  const errorReg = /<error>.*?\*\*\* error (.*?)<\/error>.*?<error>(.*?)<\/error>/;
  const rtDataRegG = /<data desc='.*?'>[\s\S]*?<\/data>/g;
  const rtDataReg = /<data desc='(.*?)'>([\s\S]*?)<\/data>/;

  // const dsRegG = /<ds.*?>[\s\S]+?<\/ds>/g; // TODO: Not used
  // const dsReg = /<ds.*?>([\s\S]+?)<\/ds>/; // TODO: Not used
  const dataRegG = /<data[\s\S]*?<\/data>/g;
  const dataReg = /<data.*?type='(.*?)'.*?>([\s\S]*?)<\/data>/;
  const sqlResultG = /<row>[\s\S]+?<\/row>/g;
  const sqlRowG = /<data desc='[\s\S]+?'>[\s\S]*?<\/data>/g;
  const sqlRow = /<data desc='([\s\S]+?)'>([\s\S]*?)<\/data>/;

  const cmdData = xml.match(cmdRegG);
  const shData = xml.match(shRegG);
  const qshData = xml.match(qshRegG);
  const pgmData = xml.match(pgmRegG);
  const sqlData = xml.match(sqlRegG);

  const ResultArr = [];

  // parse cmd matches
  if (cmdData && cmdData.length > 0) {
    cmdData.forEach((cmd) => {
      const rs = { type: 'cmd' };
      const sucFlag = cmd.match(successReg);

      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) {
          [, rs.cmd] = sucFlag;
        }
      } else {
        rs.success = false;
        const errFlag = cmd.match(errorReg);
        if (errFlag && errFlag.length > 1) {
          [, rs.cmd] = errFlag;
        }
        if (errFlag && errFlag.length > 2) {
          [, , rs.error] = errFlag;
        }
      }
      const rowArray = cmd.match(rtDataRegG);

      if (rowArray && rowArray.length > 0) {
        const arr = [];

        rowArray.forEach((row) => {
          const eachRow = row.match(rtDataReg);
          if (eachRow && eachRow.length > 1) {
            arr.push({ name: eachRow[1], value: eachRow[2] ? eachRow[2] : '' });
          }
        });

        rs.data = arr;
      }
      ResultArr.push(rs);
    });
  }

  // parse sh matches
  if (shData && shData.length > 0) {
    shData.forEach((sh) => {
      const rs = { type: 'sh' };
      const shOutput = sh.match(shReg);

      if (shOutput && shOutput.length > 0) {
        [, rs.data] = shOutput;
      }
      ResultArr.push(rs);
    });
  }

  // parse qsh matches
  if (qshData && qshData.length > 0) {
    qshData.forEach((qsh) => {
      const rs = { type: 'qsh' };
      const qshOutput = qsh.match(qshReg);
      if (qshOutput && qshOutput.length > 0) {
        [, rs.data] = qshOutput;
      }
      ResultArr.push(rs);
    });
  }

  // parse pgm matches
  if (pgmData && pgmData.length > 0) {
    pgmData.forEach((pgm) => {
      const rs = { type: 'pgm' };
      const sucFlag = pgm.match(successReg);

      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
      } else {
        rs.success = false;
      }

      const pgmLib = pgm.match(pgmReg);

      if (pgmLib && pgmLib.length > 2) {
        [, rs.pgm, rs.lib] = pgmLib;
      }

      const paramData = pgm.match(dataRegG);

      if (paramData && paramData.length > 0) {
        const arr = [];
        paramData.forEach((param) => {
          const obj = {};
          const rx = / \b(.*?)\s*=\s*'([^']*)'/g;
          const eachRow = param.match(dataReg);
          let attr;

          if (eachRow && eachRow.length > 1) {
            obj.value = (eachRow[2] ? eachRow[2] : '');
          }

          // eslint-disable-next-line no-cond-assign
          while (attr = rx.exec(param)) {
            // eslint-disable-next-line prefer-destructuring
            obj[attr[1]] = attr[2];
          }

          arr.push(obj);
        });

        rs.data = arr;
      }
      ResultArr.push(rs);
    });
  }

  // parse sql matches
  if (sqlData && sqlData.length > 0) {
    sqlData.forEach((sql) => {
      const rs = { type: 'sql' };
      const sucFlag = sql.match(successReg);

      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) {
          if (sucFlag[0].includes('![CDATA')) {
            const fixed = sucFlag[1].replace(/]]>/, '');
            rs.stmt = fixed;
          } else {
            [, rs.stmt] = sucFlag;
          }
        }
      } else {
        rs.success = false;
        const errFlag = sql.match(errorReg);

        if (errFlag && errFlag.length > 1) {
          [, rs.stmt] = errFlag;
        }
        if (errFlag && errFlag.length > 2) {
          [, , rs.error] = errFlag;
        }
      }

      const sqlResult = sql.match(sqlResultG);

      if (sqlResult && sqlResult.length > 0) {
        const arr = [];

        sqlResult.forEach((result) => {
          const eachRow = result.match(sqlRowG);

          if (eachRow) {
            const theRow = [];

            eachRow.forEach((row) => {
              const perField = row.match(sqlRow);

              if (perField && perField.length > 2) {
                theRow.push({ desc: perField[1], value: perField[2] });
              }
            });

            arr.push(theRow);
          }
        });

        rs.result = arr;
      }
      ResultArr.push(rs);
    });
  }
  return ResultArr;
};

function returnTransports(transportOptions) {
  // eslint-disable-next-line global-require
  const { Connection } = require('./Connection');
  const availableTransports = ['idb', 'rest', 'ssh'];
  const transports = [];

  const options = {
    verbose: transportOptions.verbose,
    transportOptions,
  };

  availableTransports.forEach((transport) => {
    // eslint-disable-next-line no-param-reassign
    options.transport = transport;
    transports.push({ name: transport, me: new Connection(options) });
  });

  return transports;
}

function returnTransportsDeprecated(options) {
  // eslint-disable-next-line global-require
  const { iConn } = require('./itoolkit');
  const availableTransports = ['idb', 'rest'];
  const transports = [];
  let restOptions = null;

  availableTransports.forEach((transport) => {
    // eslint-disable-next-line no-param-reassign
    if (transport === 'rest') {
      restOptions = { host: options.host, port: options.port, path: options.path };
    }
    transports.push({
      name: transport,
      // eslint-disable-next-line new-cap
      me: new iConn(options.database, options.username, options.password, restOptions),
    });
  });

  return transports;
}

module.exports = { xmlToJs, xmlToJson, returnTransports, returnTransportsDeprecated };
