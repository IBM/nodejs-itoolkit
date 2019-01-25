// Copyright (c) International Business Machines Corp. 2017
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

const db = require('idb-connector'); // TODO: This is optional

const db2Call = (callback, xlib, xdatabase, xuser, xpassword, xipc, xctl, xmlInputScript, xbuf,
  debug, sync) => {
  const xmlOut = 'NULL';
  let sql = `call ${xlib}.iPLUG512K(?,?,?,?)`;

  if (xbuf !== undefined) {
    const xBuf = Number(xbuf);
    if (xBuf <= 0) { sql = `call ${xlib}.iPLUG32K(?,?,?,?)`; } else if (xBuf <= 4096) { sql = `call ${xlib}.iPLUG4K(?,?,?,?)`; } else if (xBuf <= 32768) { sql = `call ${xlib}.iPLUG32K(?,?,?,?)`; } else if (xBuf <= 65536) { sql = `call ${xlib}.iPLUG65K(?,?,?,?)`; } else if (xBuf <= 524288) { sql = `call ${xlib}.iPLUG512K(?,?,?,?)`; } else if (xBuf <= 1048576) { sql = `call ${xlib}.iPLUG1M(?,?,?,?)`; } else if (xBuf <= 5242880) { sql = `call ${xlib}.iPLUG5M(?,?,?,?)`; } else if (xBuf <= 10485760) { sql = `call ${xlib}.iPLUG10M(?,?,?,?)`; } else sql = `call ${xlib}.iPLUG15M(?,?,?,?)`;
  }

  try {
    const conn = new db.dbconn(); // eslint-disable-line new-cap
    conn.setConnAttr(db.SQL_ATTR_DBC_SYS_NAMING, db.SQL_FALSE);
    if (typeof debug === 'boolean') { conn.debug(debug); }
    if (xuser && xuser.length > 0 && xpassword && xpassword.length > 0) {
      conn.conn(xdatabase, xuser, xpassword);
    } else {
      conn.conn(xdatabase);
    }

    const stmt = new db.dbstmt(conn); // eslint-disable-line new-cap

    const bindParams = [
      [xipc, db.SQL_PARAM_INPUT, 1],
      [xctl, db.SQL_PARAM_INPUT, 1],
      [xmlInputScript, db.SQL_PARAM_INPUT, 0],
      [xmlOut, db.SQL_PARAM_OUTPUT, 0],
    ];

    if (sync === true) { // Sync Mode
      stmt.prepareSync(sql);
      stmt.bindParamSync(bindParams);
      stmt.executeSync((outArray) => { // out is an array of the output parameters.
        // For XML service, there is always only one return XML output. So handle it directly.
        if (outArray.length === 1) {
          callback(outArray[0]);
        } else {
          callback(outArray); // For multiple return result, caller should handle it as an array.
        }
        // delete stmt; // TODO: eslint: delete in strict mode
        conn.disconn();
        // delete conn; // TODO: eslint: delete in strict mode
      });
    } else { // Async Mode
      stmt.prepare(sql, (prepareErr) => {
        if (prepareErr) throw prepareErr;
        stmt.bindParam(bindParams, (paramErr) => {
          if (paramErr) throw paramErr;
          stmt.execute((outArray, executeErr) => { // out is an array of the output parameters.
            if (executeErr) throw executeErr;
            if (outArray.length === 1) {
              // For XML service, there is always only one return XML output. So handle it directly.
              callback(outArray[0]);
              // For multiple return result, caller should handle it as an array.
            } else { callback(outArray); }
            // delete stmt; // TODO: eslint: delete in strict mode
            conn.disconn();
            // delete conn; // TODO: eslint: delete in strict mode
          });
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.db2Call = db2Call;
