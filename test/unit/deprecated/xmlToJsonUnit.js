// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

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

const { expect } = require('chai');
const { xmlToJson } = require('../../../lib/itoolkit');

describe('xmlToJson Tests', () => {
  it('converts CL command XML output to js object', () => {
    const xmlOut = '<?xml version=\'1.0\'?><myscript><cmd exec=\'rexx\' error=\'fast\'>'
      + '<success>+++ success RTVJOBA USRLIBL(?) SYSLIBL(?)</success>'
      + '<row><data desc=\'USRLIBL\'>QGPL       QTEMP      QDEVELOP   QBLDSYS'
      + '    QBLDSYSR</data></row><row><data desc=\'SYSLIBL\'>QSYS'
      + '       QSYS2      QHLPSYS    QUSRSYS</data></row></cmd></myscript>';

    const result = xmlToJson(xmlOut);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.haveOwnProperty('type').and.to.equal('cmd');
    const cmd = 'RTVJOBA USRLIBL(?) SYSLIBL(?)';
    expect(result[0]).to.haveOwnProperty('cmd').and.to.equal(cmd);
    expect(result[0]).to.haveOwnProperty('data');
    expect(result[0].data).to.be.an('array');
    expect(result[0].data.length).to.equal(2);
    expect(result[0].data[0]).to.be.an('object');
    const name = 'USRLIBL';
    expect(result[0].data[0]).to.haveOwnProperty('name').and.to.equal(name);
    const value = 'QGPL       QTEMP      QDEVELOP   QBLDSYS    QBLDSYSR';
    expect(result[0].data[0]).to.haveOwnProperty('value').and.to.equal(value);
  });

  it('converts sh command XML output to js object', () => {
    const xmlOut = '<?xml version=\'1.0\'?><myscript><sh error=\'fast\'>\n'
                   + 'bin\n'
                   + 'ccs\n'
                   + 'icu4c\n'
                   + 'includ\n'
                   + 'lbin\n'
                   + 'lib\n'
                   + 'lib64\n'
                   + 'lpp\n'
                   + 'sbin\n'
                   + 'share\n'
                   + 'vacpp\n'
                   + '</sh>\n'
                   + '</myscript>';

    const result = xmlToJson(xmlOut);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.haveOwnProperty('type').and.to.equal('sh');
    const data = '\nbin\nccs\nicu4c\ninclud\nlbin\nlib\nlib64\nlpp\nsbin\n'
                 + 'share\nvacpp\n';
    expect(result[0]).to.haveOwnProperty('data').and.to.equal(data);
  });


  it('converts qsh command XML output to js object', () => {
    const xmlOut = '<?xml version=\'1.0\'?><myscript><qsh error=\'fast\'>\n'
                   + 'bin\n'
                   + 'ccs\n'
                   + 'icu4c\n'
                   + 'includ\n'
                   + 'lbin\n'
                   + 'lib\n'
                   + 'lib64\n'
                   + 'lpp\n'
                   + 'sbin\n'
                   + 'share\n'
                   + 'vacpp\n'
                   + '</qsh>\n'
                   + '</myscript>';

    const result = xmlToJson(xmlOut);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.haveOwnProperty('type').and.to.equal('qsh');
    const data = '\nbin\nccs\nicu4c\ninclud\nlbin\nlib\nlib64\nlpp\nsbin\n'
                 + 'share\nvacpp\n';
    expect(result[0]).to.haveOwnProperty('data').and.to.equal(data);
  });

  it('converts pgm command XML output to js object', () => {
    const xmlOut = `<?xml version='1.0'?><myscript><pgm name='QWCRSVAL' lib='QSYS' error='fast'>
    <parm io='out'>
    <ds len='rec1'>
    <data type='10i0'>1</data>
    <data type='10i0'>8</data>
    <data type='10A'>QCENTURY</data>
    <data type='1A'>C</data>
    <data type='1A'></data>
    <data type='10i0'>1</data>
    <data type='4A'>1</data>
    </ds>
    </parm>
    <parm>
    <data type='10i0' setlen='rec1'>28</data>
    </parm>
    <parm>
    <data type='10i0'>1</data>
    </parm>
    <parm>
    <data type='10A'>QCENTURY</data>
    </parm>
    <parm io='both'>
    <ds len='rec2'>
    <data type='10i0'>0</data>
    <data type='10i0' setlen='rec2'>16</data>
    <data type='7A'></data>
    <data type='1A'></data>
    </ds>
    </parm>
    <success><![CDATA[+++ success QSYS QWCRSVAL ]]></success>
    </pgm>
    </myscript>`;

    const result = xmlToJson(xmlOut);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.haveOwnProperty('type').and.to.equal('pgm');
    expect(result[0]).to.haveOwnProperty('success').and.to.equal(true);
    expect(result[0]).to.haveOwnProperty('pgm').and.to.equal('QWCRSVAL');
    expect(result[0]).to.haveOwnProperty('lib').and.to.equal('QSYS');
    expect(result[0]).to.haveOwnProperty('data');
    expect(result[0].data).to.be.an('array');
    expect(result[0].data.length).to.equal(14);

    result[0].data.forEach((part) => {
      expect(part).to.be.an('object');
      expect(result[0].data[0]).to.haveOwnProperty('value');
      expect(result[0].data[0]).to.haveOwnProperty('type');
    });
  });

  it('converts sql command XML output to js object', () => {
    const xmlOut = `<?xml version='1.0'?><myscript><sql>
    <query error='fast' conn='conn1' stmt='stmt1'>
    <success><![CDATA[+++ success SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT]]></success>
    </query>
    <fetch block='all' desc='on' stmt='stmt1'>
    <row><data desc='LSTNAM'>Henning</data><data desc='STATE'>TX</data></row>
    <row><data desc='LSTNAM'>Jones</data><data desc='STATE'>NY</data></row>
    <row><data desc='LSTNAM'>Vine</data><data desc='STATE'>VT</data></row>
    <row><data desc='LSTNAM'>Johnson</data><data desc='STATE'>GA</data></row>
    <row><data desc='LSTNAM'>Tyron</data><data desc='STATE'>NY</data></row>
    <row><data desc='LSTNAM'>Stevens</data><data desc='STATE'>CO</data></row>
    <row><data desc='LSTNAM'>Alison</data><data desc='STATE'>MN</data></row>
    <row><data desc='LSTNAM'>Doe</data><data desc='STATE'>CA</data></row>
    <row><data desc='LSTNAM'>Thomas</data><data desc='STATE'>WY</data></row>
    <row><data desc='LSTNAM'>Williams</data><data desc='STATE'>TX</data></row>
    <row><data desc='LSTNAM'>Lee</data><data desc='STATE'>NY</data></row>
    <row><data desc='LSTNAM'>Abraham</data><data desc='STATE'>MN</data></row>
    <success>+++ success stmt1</success>
    </fetch>
    <free><success>+++ success </success>
    </free>
    </sql>
    </myscript>`;

    const result = xmlToJson(xmlOut);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.haveOwnProperty('type').and.to.equal('sql');
    expect(result[0]).to.haveOwnProperty('success').and.to.equal(true);
    const stmt = 'SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT';
    expect(result[0]).to.haveOwnProperty('stmt').and.to.equal(stmt);
    expect(result[0]).to.haveOwnProperty('result');
    expect(result[0].result).to.be.an('array');
    expect(result[0].result.length).to.equal(12);

    // result is 2D array: each of its element is another array of objects
    // Propose to simplify for result to be 1D array of objects
    result[0].result.forEach((childArray) => {
      expect(childArray).to.be.an('array');
      childArray.forEach((element) => {
        expect(element).to.haveOwnProperty('desc');
        expect(element).to.haveOwnProperty('value');
      });
    });
  });
});
