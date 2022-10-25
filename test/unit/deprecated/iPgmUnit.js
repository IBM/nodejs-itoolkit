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
const { iPgm } = require('../../../lib/itoolkit');

const outBuf = [
  [0, '10i0'],
  [0, '10i0'],
  ['', '36h'],
  ['', '10A'],
  ['', '1A'],
  ['', '1A'],
  [0, '10i0'],
  [0, '10i0'],
];
const errno = [
  [0, '10i0'],
  [0, '10i0', { setlen: 'rec2' }],
  ['', '7A'],
  ['', '1A'],
];

describe('iPgm Class Unit Tests', function () {
  describe('constructor', function () {
    it('creates and returns an instance of iPgm with lib and function set', function () {
      const pgm = new iPgm('QTOCNETSTS');
      expect(pgm).to.be.instanceOf(iPgm);
    });
  });

  describe('toXML', function () {
    it('returns pgm XML', function () {
      const pgm = new iPgm(
        'QTOCNETSTS',
        {
          lib: 'QSYS',
          func: 'QtoRtvTCPA',
          error: 'on',
        },
      );

      const expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'on\'></pgm>';

      expect(pgm.toXML()).to.be.a('string').and.to.equal(expectedXML);
    });
  });

  describe('addParam', function () {
    it('appends param to pgm xml', function () {
      const pgm = new iPgm(
        'QTOCNETSTS',
        {
          lib: 'QSYS',
          func: 'QtoRtvTCPA',
          error: 'fast',
        },
      );

      pgm.addParam(outBuf, { io: 'out' });

      let expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam(66, '10i0');

      expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm>'
      + '<parm><data type=\'10i0\'>66</data></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam(1, '10i0');

      expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm>'
      + '<parm><data type=\'10i0\'>66</data></parm>'
      + '<parm><data type=\'10i0\'>1</data></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam('QCCSID', '10A');

      expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm>'
      + '<parm><data type=\'10i0\'>66</data></parm>'
      + '<parm><data type=\'10i0\'>1</data></parm>'
      + '<parm><data type=\'10A\'>QCCSID</data></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam(errno, { io: 'both', len: 'rec2' });

      expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm>'
      + '<parm><data type=\'10i0\'>66</data></parm>'
      + '<parm><data type=\'10i0\'>1</data></parm>'
      + '<parm><data type=\'10A\'>QCCSID</data></parm>'
      + '<parm io=\'both\'><ds len=\'rec2\'><data type=\'10i0\'>0</data>'
      + '<data type=\'10i0\' setlen=\'rec2\'>0</data><data type=\'7A\'>'
      + '</data><data type=\'1A\'></data></ds></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);
    });

    it('regular <parm> contains by=\'val\'', function () {
      const pgm = new iPgm('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      pgm.addParam('', '1A', { by: 'val' });
      pgm.addReturn('', '2A', { name: 'output' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
    });

    it('data structure <parm> contains by=\'val\'', function () {
      const pgm = new iPgm('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      const params = [
        [0, '3s0'],
        [0, '7s0', { name: 'ds_fld2' }],
      ];

      pgm.addParam(params, { name: 'inds', by: 'val' });
      pgm.addReturn('', '2A', { name: 'output' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
    });

    it('regular <parm> contains by=\'val\', with io=\'both\'', function () {
      const pgm = new iPgm('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      pgm.addParam('', '1A', { by: 'val', io: 'both' });
      pgm.addReturn('', '2A', { name: 'output' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
      expect(lookAtXML).to.match(/<parm .*io='both'.*>/);
    });

    it('data structure <parm> contains by=\'val\', with io=\'both\'', function () {
      const pgm = new iPgm('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      const params = [
        [0, '3s0'],
        [0, '7s0', { name: 'ds_fld2' }],
      ];

      pgm.addParam(params, { name: 'inds', by: 'val', io: 'both' });
      pgm.addReturn('', '2A', { name: 'output' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
      expect(lookAtXML).to.match(/<parm .*io='both'.*>/);
    });
  });

  describe('addReturn', function () {
    it('appends return to pgm xml', function () {
      const pgm = new iPgm(
        'QTOCNETSTS',
        {
          lib: 'QSYS',
          func: 'QtoRtvTCPA',
          error: 'fast',
        },
      );

      pgm.addReturn('0', '20A');

      const expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' '
      + 'error=\'fast\'><return><data type=\'20A\'>0</data></return></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);
    });
  });
});
