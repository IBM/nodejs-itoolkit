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
const { Connection, iUserSpace } = require('../../lib/itoolkit');
const { config, printConfig } = require('./config');

const lib = 'NODETKTEST';

function generateRandomName() {
  let name;

  do {
    // generate a random 10 digit base-36 number string
    // (base 36 is 0-9A-Z)
    name = Math.floor(Math.random() * (36 ** 10)).toString(36);
  }
  // first character can't be a digit
  while (name[0] >= '0' && name[0] <= '9');

  return name.toUpperCase();
}

describe('UserSpace Functional Tests', function () {
  before(function () {
    printConfig();
  });

  let userSpaceName;

  describe('createUserSpace', function () {
    it('creates a user space', function (done) {
      const connection = new Connection(config);

      const userSpace = new iUserSpace(connection);

      const description = 'Node userSpace test user space';

      const name = generateRandomName();

      userSpace.createUserSpace(
        name,
        lib,
        'LOG',
        50,
        '*EXCLUDE',
        description,
        (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.be.a('boolean').and.to.equal(true);
          userSpaceName = name;
          done();
        },
      );
    });
  });

  describe('setUserSpaceData', function () {
    it('sets data within the user space', function (done) {
      if (!userSpaceName) {
        this.skip();
      }

      const connection = new Connection(config);

      const userSpace = new iUserSpace(connection);

      const msg = 'Hello from userspace!';

      userSpace.setUserSpaceData(
        userSpaceName,
        lib,
        msg.length,
        msg,
        (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.be.a('boolean').and.to.equal(true);
          done();
        },
      );
    });
  });

  describe('getUserSpaceData', function () {
    it('returns specified length of data', function (done) {
      if (!userSpaceName) {
        this.skip();
      }

      const connection = new Connection(config);

      const userSpace = new iUserSpace(connection);

      userSpace.getUserSpaceData(userSpaceName, lib, 21, (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.a('string').and.to.equal('Hello from userspace!');
        done();
      });
    });
  });

  describe('deleteUserSpace', function () {
    it('removes a user space', function (done) {
      if (!userSpaceName) {
        this.skip();
      }
      const connection = new Connection(config);

      const userSpace = new iUserSpace(connection);

      userSpace.deleteUserSpace(userSpaceName, lib, (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.a('boolean').and.to.equal(true);
        done();
      });
    });
  });
});
