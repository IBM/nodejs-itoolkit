// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

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
