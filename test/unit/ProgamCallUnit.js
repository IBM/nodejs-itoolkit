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

const { expect } = require('chai');
const { ProgramCall } = require('../../lib/itoolkit');

const outBuf = [
  { type: '10i0', value: 0 },
  { type: '10i0', value: 0 },
  { type: '36h', value: '' },
  { type: '10A', value: '' },
  { type: '1A', value: '' },
  { type: '1A', value: '' },
  { type: '10i0', value: 0 },
  { type: '10i0', value: 0 },
];
const errno = [
  { type: '10i0', value: 0 },
  { type: '10i0', value: 0, setlen: 'rec2' },
  { type: '7A', value: '' },
  { type: '1A', value: '' },
];

describe('ProgramCall Class Unit Tests', function () {
  describe('constructor', function () {
    it('creates and returns an instance of ProgramCall with lib and function set', function () {
      const pgm = new ProgramCall('QTOCNETSTS');
      expect(pgm).to.be.instanceOf(ProgramCall);
    });
  });

  describe('toXML', function () {
    it('returns pgm XML', function () {
      const pgm = new ProgramCall(
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
      const pgm = new ProgramCall(
        'QTOCNETSTS',
        {
          lib: 'QSYS',
          func: 'QtoRtvTCPA',
          error: 'fast',
        },
      );

      pgm.addParam({ type: 'ds', io: 'out', fields: outBuf });

      let expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam({ value: 66, type: '10i0' });

      expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm>'
      + '<parm><data type=\'10i0\'>66</data></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam({ value: 1, type: '10i0' });

      expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm>'
      + '<parm><data type=\'10i0\'>66</data></parm>'
      + '<parm><data type=\'10i0\'>1</data></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam({ value: 'QCCSID', type: '10A' });

      expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' error=\'fast\'>'
      + '<parm io=\'out\'><ds><data type=\'10i0\'>0</data><data type=\'10i0\'>'
      + '0</data><data type=\'36h\'></data><data type=\'10A\'></data>'
      + '<data type=\'1A\'></data><data type=\'1A\'></data><data type=\'10i0\'>'
      + '0</data><data type=\'10i0\'>0</data></ds></parm>'
      + '<parm><data type=\'10i0\'>66</data></parm>'
      + '<parm><data type=\'10i0\'>1</data></parm>'
      + '<parm><data type=\'10A\'>QCCSID</data></parm></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);

      pgm.addParam({
        type: 'ds', io: 'both', len: 'rec2', fields: errno,
      });

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
      const pgm = new ProgramCall('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      pgm.addParam({ value: '', type: '1A', by: 'val' });
      pgm.addReturn({ name: 'output', type: '2A', value: '' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
    });

    it('data structure <parm> contains by=\'val\'', function () {
      const pgm = new ProgramCall('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      const params = [
        { type: '3s0', value: 0 },
        { type: '7s0', value: 0, name: 'ds_fld2' },
      ];

      pgm.addParam({
        name: 'inds', type: 'ds', by: 'val', fields: params,
      });
      pgm.addReturn({ name: 'output', type: '2A', value: '' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
    });

    it('regular <parm> contains by=\'val\', with io=\'both\'', function () {
      const pgm = new ProgramCall('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      pgm.addParam({
        value: '', type: '1A', by: 'val', io: 'both',
      });
      pgm.addReturn({ name: 'output', type: '2A', value: '' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
      expect(lookAtXML).to.match(/<parm .*io='both'.*>/);
    });

    it('data structure <parm> contains by=\'val\', with io=\'both\'', function () {
      const pgm = new ProgramCall('MYPGM', { lib: 'MYLIB', func: 'MY_PROCEDURE' });

      const params = [
        { type: '3s0', value: 0 },
        { type: '7s0', value: 0, name: 'ds_fld2' },
      ];

      pgm.addParam({
        name: 'inds', type: 'ds', by: 'val', io: 'both', fields: params,
      });
      pgm.addReturn({ name: 'output', type: '2A', value: '' });

      const lookAtXML = pgm.toXML();
      expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
      expect(lookAtXML).to.match(/<parm .*io='both'.*>/);
    });

    it('add nested data structure parameter', function () {
      const pgm = new ProgramCall('MYPGM', { lib: 'MYLIB' });

      const nestedDs = {
        name: 'outer-ds',
        type: 'ds',
        fields: [
          {
            name: 'sub-ds1',
            type: 'ds',
            fields: [
              { type: '10i0', value: 0 },
              { type: '4A', value: 'test' },
            ],
          },
          {
            name: 'sub-ds2',
            type: 'ds',
            fields: [
              { type: '20i0', value: 1 },
              { type: '6A', value: 'test 2' },
            ],
          },
        ],
      };

      pgm.addParam(nestedDs);
      const expectedXML = '<pgm name=\'MYPGM\' lib=\'MYLIB\' error=\'fast\'>'
                             + '<parm name=\'outer-ds\'>'
                              + '<ds name=\'outer-ds\'>'
                              + '<ds name=\'sub-ds1\'>'
                              + '<data type=\'10i0\'>0</data>'
                              + '<data type=\'4A\'>test</data>'
                              + '</ds>'
                              + '<ds name=\'sub-ds2\'>'
                              + '<data type=\'20i0\'>1</data>'
                              + '<data type=\'6A\'>test 2</data>'
                              + '</ds>'
                              + '</ds>'
                             + '</parm>'
                           + '</pgm>';
      expect(pgm.toXML()).to.equal(expectedXML);
    });
  });

  describe('addReturn', function () {
    it('appends return to pgm xml', function () {
      const pgm = new ProgramCall(
        'QTOCNETSTS',
        {
          lib: 'QSYS',
          func: 'QtoRtvTCPA',
          error: 'fast',
        },
      );

      pgm.addReturn({ type: '20A', value: '0' });

      const expectedXML = '<pgm name=\'QTOCNETSTS\' lib=\'QSYS\' func=\'QtoRtvTCPA\' '
      + 'error=\'fast\'><return><data type=\'20A\'>0</data></return></pgm>';

      expect(pgm.toXML()).to.equal(expectedXML);
    });

    it('appends return with ds to pgm xml', function () {
      const pgm = new ProgramCall('TEST');

      const ds = {
        name: 'test_ds',
        type: 'ds',
        io: 'out',
        fields: [
          { type: '10i0', value: 0 },
          { type: '10A', value: '' },
        ],
      };
      pgm.addReturn(ds);

      const expectedXML = "<pgm name='TEST' error='fast'><return><ds name='test_ds'>"
      + "<data type='10i0'>0</data><data type='10A'></data></ds></return></pgm>";

      expect(pgm.toXML()).to.equal(expectedXML);
    });
  });
});
