// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/* eslint-disable new-cap */

const { expect } = require('chai');
const { iConn, iDataQueue } = require('../../../lib/itoolkit');
const { config, printConfig } = require('../config');
const { checkObjectExists } = require('../checkObjectExists');

// deprecated tests are in place to test compatability using deprecated classes and functions
// these tests use deprecated iConn Class to create a connnection.
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

const lib = 'NODETKTEST'; const dqName = 'TESTQ';

describe('iDataQueue Functional Tests', function () {
  before('check if data queue exists for tests', function (done) {
    printConfig();
    checkObjectExists(config, dqName, '*DTAQ', (error) => {
      if (error) { throw error; }
      done();
    });
  });

  describe('constructor', function () {
    it('creates and returns an instance of iDataQueue', function () {
      const connection = new iConn(database, config.user, password);

      const dq = new iDataQueue(connection);
      expect(dq).to.be.instanceOf(iDataQueue);
    });
  });

  describe('sendToDataQueue', function () {
    it('sends data to specified DQ', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const dq = new iDataQueue(connection);

      dq.sendToDataQueue(dqName, lib, 'Hello from DQ!', (output) => {
        expect(output).to.equal(true);
        done();
      });
    });
  });

  describe('receiveFromDataQueue', function () {
    it('receives data from specfied DQ', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const dq = new iDataQueue(connection);

      dq.receiveFromDataQueue(dqName, lib, 100, (output) => {
        expect(output).to.be.a('string').and.to.equal('Hello from DQ!');
        done();
      });
    });
  });

  describe('clearDataQueue', function () {
    it('clears the specifed DQ', function (done) {
      const connection = new iConn(database, username, password, restOptions);

      const dq = new iDataQueue(connection);

      dq.clearDataQueue(dqName, lib, (output) => {
        expect(output).to.equal(true);
        done();
      });
    });
  });
});
