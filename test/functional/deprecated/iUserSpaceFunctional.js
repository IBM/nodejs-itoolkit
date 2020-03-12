// Copyright (c) International Business Machines Corp. 2019

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

/* eslint-env mocha */
/* eslint-disable new-cap */

const { expect } = require('chai');
const { iConn, iUserSpace } = require('../../../lib/itoolkit');
const { returnTransportsDeprecated } = require('../../../lib/utils');

// Set Env variables or set values here.
const opt = {
  database: process.env.TKDB || '*LOCAL',
  username: process.env.TKUSER || '',
  password: process.env.TKPASS || '',
  host: process.env.TKHOST || 'localhost',
  port: process.env.TKPORT || 80,
  path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
};

const lib = 'NODETKTEST';
const transports = returnTransportsDeprecated(opt);

describe('iUserSpace Functional Tests', () => {
  describe('constructor', () => {
    it('returns an instance of iUserSpace', () => {
      const connection = new iConn(opt.database, opt.user, opt.password);

      const userSpace = new iUserSpace(connection);

      expect(userSpace).to.be.instanceOf(iUserSpace);
    });
  });

  describe('createUserSpace', () => {
    transports.forEach((transport) => {
      it(`creates a user space using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const userSpace = new iUserSpace(connection);

        const description = 'Node toolkit test user space';

        const userSpaceName = `USP${(transport.name).toUpperCase()}`;

        userSpace.createUserSpace(userSpaceName, lib, 'LOG', 50, '*EXCLUDE',
          description, (output) => {
            expect(output).to.be.a('boolean').and.to.equal(true);
            done();
          });
      });
    });
  });

  describe('setUserSpaceData', () => {
    transports.forEach((transport) => {
      it(`sets data within the user space using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const userSpace = new iUserSpace(connection);

        const msg = 'Hello from userspace!';

        const userSpaceName = `USP${(transport.name).toUpperCase()}`;

        userSpace.setUserSpaceData(userSpaceName, lib, msg.length, msg,
          (output) => {
            expect(output).to.be.a('boolean').and.to.equal(true);
            done();
          });
      });
    });
  });

  describe('getUserSpaceData', () => {
    transports.forEach((transport) => {
      it(`returns specified length of data using ${transport.name} transport`,
        (done) => {
          const connection = transport.me;

          const userSpace = new iUserSpace(connection);

          const userSpaceName = `USP${(transport.name).toUpperCase()}`;

          userSpace.getUserSpaceData(userSpaceName, lib, 21, (output) => {
            expect(output).to.be.a('string').and.to.equal('Hello from userspace!');
            done();
          });
        });
    });
  });

  describe('deleteUserSpace', () => {
    transports.forEach((transport) => {
      it(`removes a user space using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const userSpace = new iUserSpace(connection);

        const userSpaceName = `USP${(transport.name).toUpperCase()}`;

        userSpace.deleteUserSpace(userSpaceName, lib, (output) => {
          expect(output).to.be.a('boolean').and.to.equal(true);
          done();
        });
      });
    });
  });
});
