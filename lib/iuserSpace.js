// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software
// and associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR INCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const ProgramCall = require('./ProgramCall');
const { xmlToJson } = require('./utils');

module.exports = class iUserSpace {
  constructor(conn) {
    this.conn = conn; // Pass in the connection object.
    this.errno = [
      [0, '10i0'],
      [0, '10i0', { setlen: 'rec2' }],
      ['', '7A'],
      ['', '1A'],
    ];
  }

  createUserSpace(name, lib, attr, size, auth, desc, cb) {
    const pgm = new ProgramCall('QUSCRTUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(attr === '' ? 'LOG' : attr, '11A');
    pgm.addParam(size === '' ? 50 : size, '10i0');
    pgm.addParam(0, '1A');
    pgm.addParam(auth === '' ? '*USE' : auth, '10A');
    pgm.addParam(desc, '50A');
    pgm.addParam('*NO', '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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

  setUserSpaceData(name, lib, length, msg, cb) {
    const pgm = new ProgramCall('QUSCHGUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(1, '10i0');
    pgm.addParam(length, '10i0');
    pgm.addParam(msg, `${length}A`);
    pgm.addParam(0, '1A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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

  getUserSpaceData(name, lib, length, cb) {
    const pgm = new ProgramCall('QUSRTVUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(1, '10i0');
    pgm.addParam(length, '10i0');
    pgm.addParam('', `${length}A`, { io: 'out' });
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (str) => { // Convert the XML output into JSON
      const output = xmlToJson(str);
      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) {
        rtValue = output[0].data[4].value;
      } else {
        rtValue = str;
      }

      cb(rtValue); // Run the call back function against the returned value.
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  deleteUserSpace(name, lib, cb) {
    const pgm = new ProgramCall('QUSDLTUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (str) => { // Convert the XML output into JSON
      const output = xmlToJson(str);
      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) { rtValue = true; } else { rtValue = str; }

      cb(rtValue); // Run the call back function against the returned value.
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }
};
