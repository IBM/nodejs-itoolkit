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

class ProgramCall {
  /**
   * @description creates a new ProgramCall object
   * @constructor
   * @param {string} program
   * @param {object} [options]
   */
  constructor(program, options = {}) {
    this.xml = `<pgm name='${program}'`;
    if (options.lib) this.xml += ` lib='${options.lib}'`;
    if (options.func) this.xml += ` func='${options.func}'`;
    this.xml += ` error='${options.error || 'fast'}'>`;
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
    if (Array.isArray(data)) {
      opt = type;
    } else {
      opt = options;
      if (type === undefined) {
        throw new Error('Specifying the parameter type is required.');
      }
    }
    if (!inDs) { // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      this.xml += '<parm';
      if (opt && typeof opt === 'object') { // append <param> options
        if (opt.io) { this.xml += ` io='${opt.io}'`; }
        if (opt.by) { this.xml += ` by='${opt.by}'`; }
      }
      this.xml += '>';
    }

    if (Array.isArray(data)) { // If it is a struct parameter, recursively parse its children.
      this.xml += '<ds';
      if (opt && typeof opt === 'object') { // append <ds> options
        if (opt.dim) { this.xml += ` dim='${opt.dim}'`; }
        if (opt.dou) { this.xml += ` dou='${opt.dou}'`; }
        if (opt.len) { this.xml += ` len='${opt.len}'`; }
        if (opt.data) { this.xml += ` data='${opt.data}'`; }
      }
      this.xml += '>';

      for (let i = 0; i < data.length; i += 1) {
        this.addParam(data[i][0], data[i][1], data[i][2], true);
      }
      this.xml += '</ds>';
    } else { // A simple parameter
      this.xml += `<data type='${type}'`;
      if (opt && typeof opt === 'object') { // append <data> options
        Object.keys(opt).forEach((key) => {
          this.xml += ` ${key}='${opt[key]}'`;
        });
      }
      this.xml += `>${data}</data>`;
    }

    if (!inDs) { // In recursive mode, if it is an element in DS, then no <parm> or </parm> needed.
      this.xml += '</parm>';
    }
  }

  /**
   * @description adds a return element to the program XML
   * @param {string} data
   * @param {string} type
   * @param {object} [options]
   */
  addReturn(data, type, options = null) {
    if (!type) {
      throw new Error('Specifying the return type is required.');
    }
    this.xml += '<return>';

    if (options && typeof options === 'object') {
      this.xml += `<data type='${type}'`;
      Object.keys(options).forEach((key) => {
        this.xml += ` ${key}='${options[key]}'`;
      });
    } else {
      this.xml += `<data type='${type}'`;
    }
    this.xml += `>${data}</data></return>`;
  }

  /**
   * @description returns the current program XML
   * @returns {string} - the generated program XML
   */
  toXML() {
    return `${this.xml}</pgm>`;
  }
}

module.exports.ProgramCall = ProgramCall;
