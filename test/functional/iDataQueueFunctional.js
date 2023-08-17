// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/* eslint-disable new-cap */

const { expect } = require('chai');
const { iDataQueue, Connection } = require('../../lib/itoolkit');
const { config, printConfig } = require('./config');
const { checkObjectExists } = require('./checkObjectExists');

const lib = 'NODETKTEST';

describe('DataQueue Functional Tests', function () {
  const dqName = 'TESTQ';
  const dqName2 = 'TESTQ2';

  before('check if data queue exists for tests', function (done) {
    printConfig();
    checkObjectExists(config, dqName, '*DTAQ', (error) => {
      if (error) { throw error; }

      checkObjectExists(config, dqName2, '*DTAQ', (error2) => {
        if (error2) { throw error2; }
        done();
      });
    });
  });
  describe('sendToDataQueue', function () {
    it('sends data to specified DQ', function (done) {
      const connection = new Connection(config);

      const dq = new iDataQueue(connection);

      dq.sendToDataQueue(dqName, lib, 'Hello from DQ!', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.equal(true);
        done();
      });
    });
  });

  describe('receiveFromDataQueue', function () {
    it('receives data from specfied DQ', function (done) {
      const connection = new Connection(config);

      const dq = new iDataQueue(connection);

      dq.receiveFromDataQueue(dqName, lib, 100, (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.a('string').and.to.equal('Hello from DQ!');
        done();
      });
    });
  });

  describe('clearDataQueue', function () {
    it('clears the specifed DQ', function (done) {
      const connection = new Connection(config);

      const dq = new iDataQueue(connection);

      dq.clearDataQueue(dqName2, lib, (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.equal(true);
        done();
      });
    });
  });
});
