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

/* eslint-disable no-underscore-dangle */

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
   * Internal function to handle ds and data within <parm> node
   * There is an open propsal to add private methods to JS.
   * https://github.com/tc39/proposal-private-methods
   * We should update to use private methods in the future.
   * @param {object} data
   */
  __addData__(data = {}) {
    if (data.type === 'ds') {
      this.xml += '<ds';
      // append <ds> options
      if (data.name) { this.xml += ` name='${data.name}'`; }
      if (data.dim) { this.xml += ` dim='${data.dim}'`; }
      if (data.dou) { this.xml += ` dou='${data.dou}'`; }
      if (data.len) { this.xml += ` len='${data.len}'`; }
      if (data.data) { this.xml += ` data='${data.data}'`; }
      this.xml += '>';

      for (let i = 0; i < data.fields.length; i += 1) {
        this.__addData__(data.fields[i]);
      }
      this.xml += '</ds>';
    } else {
      this.xml += `<data type='${data.type}'`;
      // append <data> options
      if (data.name) { this.xml += ` name='${data.name}'`; }
      if (data.varying) { this.xml += ` varying='${data.varying}'`; }
      if (data.enddo) { this.xml += ` enddo='${data.enddo}'`; }
      if (data.setlen) { this.xml += ` setlen='${data.setlen}'`; }
      if (data.offset) { this.xml += ` offset='${data.offset}'`; }
      if (data.hex) { this.xml += ` hex='${data.hex}'`; }
      if (data.trim) { this.xml += ` trim='${data.trim}'`; }
      if (data.next) { this.xml += ` next='${data.next}'`; }
      this.xml += `>${data.value}</data>`;
    }
  }

  /**
  * @description adds a parameter to the program XML
  * @param {object} parmeter
  */
  addParam(parameter = {}) {
    if (typeof parameter !== 'object') {
      throw new Error('Expected the first parameter to be an object');
    }
    if (parameter.type === undefined) {
      throw new Error('Expected \'type\' key on the parameter object');
    }
    this.xml += '<parm';

    if (parameter.name) { this.xml += ` name='${parameter.name}'`; }
    if (parameter.io) { this.xml += ` io='${parameter.io}'`; }
    if (parameter.by) { this.xml += ` by='${parameter.by}'`; }

    this.xml += '>';
    this.__addData__(parameter);
    this.xml += '</parm>';
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
