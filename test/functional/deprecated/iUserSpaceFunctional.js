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

/* eslint-disable new-cap */

const { expect } = require('chai');
const { iConn, iUserSpace } = require('../../../lib/itoolkit');
const { config, printConfig } = require('../config');

// deprecated tests are in place to test compatability using deprecated classes and functions
// these tests use deprecated iConn Class to create a connnection
// iConn only supported idb and rest transports
if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const {
  database, username, password, host, port = 80, path,
} = config.transportOptions;

let restOptions = null;
if (config.transport === 'rest') {
  restOptions = {
    host,
    port,
    path,
  };
}

const lib = 'NODETKTEST';

describe('iUserSpace Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('constructor', function () {
    it('returns an instance of iUserSpace', function () {
      const connection = new iConn(database, config.user, password);

      const userSpace = new iUserSpace(connection);

      expect(userSpace).to.be.instanceOf(iUserSpace);
    });
  });

  describe('createUserSpace', function () {
    it('creates a user space', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const userSpace = new iUserSpace(connection);

      const description = 'Node toolkit test user space';

      const userSpaceName = `USP${(config.transport).toUpperCase()}`;

      userSpace.createUserSpace(
        userSpaceName,
        lib,
        'LOG',
        50,
        '*EXCLUDE',
        description,
        (output) => {
          expect(output).to.be.a('boolean').and.to.equal(true);
          done();
        },
      );
    });
  });

  describe('setUserSpaceData', function () {
    it('sets data within the user space', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const userSpace = new iUserSpace(connection);

      const msg = 'Hello from userspace!';

      const userSpaceName = `USP${(config.transport).toUpperCase()}`;

      userSpace.setUserSpaceData(
        userSpaceName,
        lib,
        msg.length,
        msg,
        (output) => {
          expect(output).to.be.a('boolean').and.to.equal(true);
          done();
        },
      );
    });
  });

  describe('getUserSpaceData', function () {
    it('returns specified length of data', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const userSpace = new iUserSpace(connection);

      const userSpaceName = `USP${(config.transport).toUpperCase()}`;

      userSpace.getUserSpaceData(userSpaceName, lib, 21, (output) => {
        expect(output).to.be.a('string').and.to.equal('Hello from userspace!');
        done();
      });
    });
  });

  describe('deleteUserSpace', function () {
    it('removes a user space', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const userSpace = new iUserSpace(connection);

      const userSpaceName = `USP${(config.transport).toUpperCase()}`;

      userSpace.deleteUserSpace(userSpaceName, lib, (output) => {
        expect(output).to.be.a('boolean').and.to.equal(true);
        done();
      });
    });
  });
});
