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
const { iConn, iDataQueue } = require('../../../lib/itoolkit');
const { config } = require('../config');
const { checkObjectExists } = require('../checkObjectExists');


if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const { database, username, password } = config.transportOptions;

let restOptions = null;

if (config.transport === 'rest') {
  restOptions = config.restOptions;
}

const lib = 'NODETKTEST'; const dqName = 'TESTQ';

describe('iDataQueue Functional Tests', () => {
  before('check if data queue exists for tests', (done) => {
    checkObjectExists(config, '*DTAQ', (error) => {
      if (error) { throw error; }
      done();
    });
  });
  describe('constructor', () => {
    it('creates and returns an instance of iDataQueue', () => {
      const connection = new iConn(database, config.user, password);

      const dq = new iDataQueue(connection);
      expect(dq).to.be.instanceOf(iDataQueue);
    });
  });

  describe('sendToDataQueue', () => {
    it(`sends data to specified DQ using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const dq = new iDataQueue(connection);

      dq.sendToDataQueue(dqName, lib, 'Hello from DQ!', (output) => {
        expect(output).to.equal(true);
        done();
      });
    });
  });

  describe('receiveFromDataQueue', () => {
    it(`receives data from specfied DQ using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const dq = new iDataQueue(connection);

      dq.receiveFromDataQueue(dqName, lib, 100, (output) => {
        expect(output).to.be.a('string').and.to.equal('Hello from DQ!');
        done();
      });
    });
  });

  describe('clearDataQueue', () => {
    it(`clears the specifed DQ using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const dq = new iDataQueue(connection);

      dq.clearDataQueue(dqName, lib, (output) => {
        expect(output).to.equal(true);
        done();
      });
    });
  });
});
