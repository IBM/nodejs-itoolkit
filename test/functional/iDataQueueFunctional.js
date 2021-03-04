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
