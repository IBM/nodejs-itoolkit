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

class ProgramCaller {
  /**
   * @description creates a new ProgramCaller object
   * @constructor
   * @param {string} program
   * @param {object} [options]
   */
  constructor(program, options) {
    // TODO: what if there are some options but not others? iPgm is all or nothing
    if (options && typeof options === 'object' && options.lib && options.func && options.error) {
      this.xml = iXml.iXmlNodePgmOpen(program, options.lib, options.func, options.error);
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

module.exports = ProgramCaller;
