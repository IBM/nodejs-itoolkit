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

const iXml = require('./ixml');

class ProgramCall {
  /**
   * @description creates a new ProgramCall object
   * @constructor
   * @param {string} program
   * @param {object} [options]
   */
  constructor(program, options) {
    if (options && typeof options === 'object') {
      // add options if they exist, or empty string if they don't
      this.xml = iXml.iXmlNodePgmOpen(program,
        options.lib !== undefined ? options.lib : '',
        options.func !== undefined ? options.func : '',
        options.error !== undefined ? options.error : '');
    } else {
      this.xml = iXml.iXmlNodePgmOpen(program, '', '', '');
    }
  }

  /**
    * @description adds a parameter to the program XML
    * @param {string | array} data
    * @param {string} [type]
    * @param {object} options
    * @param {*} inDs
    */
  addParam(data, type, options, inDs = null) {
    let opt;
    // DS element has no 'type', so if the second param 'type' is an Object, then it is the options.
    if (typeof type === 'object') {
      opt = type;
    } else {
      opt = options;
    }

    if (!inDs) { // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      if (opt && opt.io) {
        this.xml += iXml.iXmlNodeParmOpen(opt.io);
      } else {
        this.xml += iXml.iXmlNodeParmOpen();
      }
    }

    if (Array.isArray(data)) { // If it is a struct parameter, recursivly parse its children.
      if (opt) {
        this.xml += iXml.iXmlNodeDsOpen(opt.dim, opt.dou, opt.len, opt.data);
      } else {
        this.xml += iXml.iXmlNodeDsOpen('', '', '', '');
      }
      for (let i = 0; i < data.length; i += 1) {
        this.addParam(data[i][0], data[i][1], data[i][2], true);
      }
      this.xml += iXml.iXmlNodeDsClose();
    } else { // A simple parameter
      this.xml += iXml.iXmlNodeDataOpen(type, opt) + data + iXml.iXmlNodeDataClose();
    }

    if (!inDs) { // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      this.xml += iXml.iXmlNodeParmClose();
    }
  }

  /**
   * @description adds a return element to the program XML
   * @param {string} data
   * @param {string} type
   * @param {object} [options]
   */
  addReturn(data, type, options = null) {
    this.xml += iXml.iXmlNodeReturnOpen();
    if (options && typeof options === 'object') {
      this.xml += iXml.iXmlNodeDataOpen(type, options);
    } else {
      this.xml += iXml.iXmlNodeDataOpen(type);
    }
    this.xml += data + iXml.iXmlNodeDataClose() + iXml.iXmlNodeReturnClose();
  }

  /**
   * @description returns the current program XML
   * @returns {string} - the generated program XML
   */
  toXML() {
    return this.xml + iXml.iXmlNodePgmClose();
  }
}


// DEPRECATED: For now, routes calls to ProgramCall, but will be removed at a later time.
class iPgm {
  /**
   * @description Creates a new iPgm object
   * @constructor
   * @param {string} pgm
   * @param {object} [options]
   */
  constructor(pgm, options) {
    console.warn('As of v1.0, class \'iPgm\' is deprecated. Please use \'ProgramCall\' instead.');
    this.ProgramCall = new ProgramCall(pgm, options);
  }

  /**
    * @description adds a parameter to the program XML
    * @param {string | array} data
    * @param {string} [type]
    * @param {object} options
    * @param {*} inDs
    */
  addParam(data, type, options, inDs) {
    console.warn('As of v1.0, \'iPgm.addParam(data, type, options, inDs)\' is deprecated. Please use \'ProgramCall.addParam(data, type, options, inDs)\' instead.');
    return this.ProgramCall.addParam(data, type, options, inDs);
  }

  /**
   * @description adds a return element to the program XML
   * @param {string} data
   * @param {string} type
   * @param {object} [options]
   */
  addReturn(data, type, options) {
    console.warn('As of v1.0, \'iPgm.addReturn(data, type, options)\' is deprecated. Please use \'ProgramCall.addParam(data, type, options)\' instead.');
    return this.ProgramCall.addReturn(data, type, options);
  }

  /**
   * @description returns the current program XML
   * @returns {string} the generated program XML
   */
  toXML() {
    console.warn('As of v1.0, \'iPgm.toXML()\' is deprecated. Please use \'ProgramCall.toXML()\' instead.');
    return this.ProgramCall.toXML();
  }
}

module.exports.ProgramCall = ProgramCall;
module.exports.iPgm = iPgm;
