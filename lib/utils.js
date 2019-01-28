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

const xmlToJson = (xml) => {
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
  if (cmdData && cmdData.length > 0) {
    // Object.keys(cmdData).forEach((key) => {
    //   iXml += iXmlAttrDefault(options[key].desc, options[key].value, I_XML_ATTR_VALUE_OPTIONAL);
    // });
    for (i in cmdData) {
      const rs = { type: 'cmd' };
      const sucFlag = cmdData[i].match(successReg);
      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) { rs.cmd = sucFlag[1]; }
      } else {
        rs.success = false;
        const errFlag = cmdData[i].match(errorReg);
        if (errFlag && errFlag.length > 1) { rs.cmd = errFlag[1]; }
        if (errFlag && errFlag.length > 2) { rs.error = errFlag[2]; }
      }
      const rowArray = cmdData[i].match(rtDataRegG);
      if (rowArray && rowArray.length > 0) {
        const arr = [];
        for (j in rowArray) {
          const eachRow = rowArray[j].match(rtDataReg);
          if (eachRow && eachRow.length > 1) { arr.push({ name: eachRow[1], value: eachRow[2] ? eachRow[2] : '' }); }
        }
        rs.data = arr;
      }
      ResultArr.push(rs);
    }
  }
  if (shData && shData.length > 0) {
    for (i in shData) {
      const rs = { type: 'sh' };
      const shOutput = shData[i].match(shReg);
      if (shOutput && shOutput.length > 0) { rs.data = shOutput[1]; }
      ResultArr.push(rs);
    }
  }
  if (qshData && qshData.length > 0) {
    for (i in qshData) {
      const rs = { type: 'qsh' };
      const qshOutput = qshData[i].match(qshReg);
      if (qshOutput && qshOutput.length > 0) { rs.data = qshOutput[1]; }
      ResultArr.push(rs);
    }
  }
  if (pgmData && pgmData.length > 0) {
    for (i in pgmData) {
      const rs = { type: 'pgm' };
      const sucFlag = pgmData[i].match(successReg);
      if (sucFlag && sucFlag.length > 0) { rs.success = true; } else { rs.success = false; }
      const pgmLib = pgmData[i].match(pgmReg);
      if (pgmLib && pgmLib.length > 2) {
        rs.pgm = pgmLib[1];
        rs.lib = pgmLib[2];
      }
      const paramData = pgmData[i].match(dataRegG);
      if (paramData && paramData.length > 0) {
        const arr = [];
        for (j in paramData) {
          const obj = {}; let attr; const
            rx = / \b(.*?)\s*=\s*'([^']*)'/g;
          const eachRow = paramData[j].match(dataReg);
          if (eachRow && eachRow.length > 1) { obj.value = (eachRow[2] ? eachRow[2] : ''); }
          while (attr = rx.exec(paramData[j])) {
            obj[attr[1]] = attr[2];
          }
          arr.push(obj);
        }
        rs.data = arr;
      }
      ResultArr.push(rs);
    }
  }
  if (sqlData && sqlData.length > 0) {
    for (i in sqlData) {
      const rs = { type: 'sql' };
      const sucFlag = sqlData[i].match(successReg);
      if (sucFlag && sucFlag.length > 0) {
        rs.success = true;
        if (sucFlag.length > 1) { rs.stmt = sucFlag[1]; }
      } else {
        rs.success = false;
        const errFlag = sqlData[i].match(errorReg);
        if (errFlag && errFlag.length > 1) { rs.stmt = errFlag[1]; }
        if (errFlag && errFlag.length > 2) { rs.error = errFlag[2]; }
      }
      const sqlResult = sqlData[i].match(sqlResultG);
      if (sqlResult && sqlResult.length > 0) {
        const arr = [];
        for (j in sqlResult) {
          const eachRow = sqlResult[j].match(sqlRowG);
          if (eachRow) {
            const theRow = [];
            for (j in eachRow) {
              const perField = eachRow[j].match(sqlRow);
              if (perField && perField.length > 2) { theRow.push({ desc: perField[1], value: perField[2] }); }
            }
            arr.push(theRow);
          }
        }
        rs.result = arr;
      }
      ResultArr.push(rs);
    }
  }
  return ResultArr;
};

exports.xmlToJson = xmlToJson;
