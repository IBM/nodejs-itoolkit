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

const ProgramCall = require('./ProgramCall');
const { xmlToJson } = require('./utils');

module.exports = class iDataQueue {
  constructor(conn) {
    this.conn = conn; // Pass in the connection object.
    this.errno = [
      [0, '10i0'],
      [0, '10i0', { setlen: 'rec2' }],
      ['', '7A'],
      ['', '1A'],
    ];
  }

  sendToDataQueue(name, lib, data, cb) {
    const pgm = new ProgramCall('QSNDDTAQ', { lib: 'QSYS' });
    pgm.addParam(name, '10A');
    pgm.addParam(lib === '' ? '*CURLIB' : lib, '10A');
    pgm.addParam(data.length, '5p0');
    pgm.addParam(data, `${data.length}A`);

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xmlToJson(str);
      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) {
        rtValue = true;
      } else {
        rtValue = str;
      }

      cb(rtValue); // Run the call back function against the returned value.
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  receiveFromDataQueue(name, lib, length, cb) {
    const pgm = new ProgramCall('QRCVDTAQ', { lib: 'QSYS' });
    pgm.addParam(name, '10A');
    pgm.addParam(lib === '' ? '*CURLIB' : lib, '10A');
    pgm.addParam(length, '5p0');
    pgm.addParam('', `${length + 1}A`);
    pgm.addParam(0, '5p0');

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

    const toJson = (str) => { // Convert the XML output into JSON
      const output = xmlToJson(str);
      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) {
        rtValue = output[0].data[3].value;
      } else {
        rtValue = str;
      }

      cb(rtValue); // Run the call back function against the returned value.
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  clearDataQueue(name, lib, cb) {
    const pgm = new ProgramCall('QCLRDTAQ', { lib: 'QSYS' });
    pgm.addParam(name, '10A');
    pgm.addParam(lib === '' ? '*CURLIB' : lib, '10A');

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

    const toJson = (str) => { // Convert the XML output into JSON
      const output = xmlToJson(str);

      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) {
        rtValue = true;
      } else {
        rtValue = str;
      }

      cb(rtValue);
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }
};
