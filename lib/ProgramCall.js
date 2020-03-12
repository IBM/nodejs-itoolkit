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
   * Internal function to create <data> nodes
   * There is an open propsal to add private methods to JS.
   * https://github.com/tc39/proposal-private-methods
   * We should update to use private methods in the future.
   * @param {string} name
   * @param {string} type
   * @param {string} value
   * @param {object} options
  */
  __addDataNode__(name, type, value, options) {
    const dataName = name ? ` name='${name}'` : '';
    this.xml += `<data${dataName} type='${type}'`;
    // append <data> options
    if (typeof options === 'object') {
      if (options.varying) { this.xml += ` varying='${options.varying.varying}'`; }
      if (options.enddo) { this.xml += ` enddo='${options.enddo}'`; }
      if (options.setlen) { this.xml += ` setlen='${options.setlen}'`; }
      if (options.offset) { this.xml += ` offset='${options.offset}'`; }
      if (options.hex) { this.xml += ` hex='${options.hex}'`; }
      if (options.trim) { this.xml += ` trim='${options.trim}'`; }
      if (options.next) { this.xml += ` next='${options.next}'`; }
    }
    this.xml += `>${value}</data>`;
  }

  /**
   * Internal function to create <ds> nodes
   * There is an open propsal to add private methods to JS.
   * https://github.com/tc39/proposal-private-methods
   * We should update to use private methods in the future.
   * @param {array} ds
   * @param {object} options
   */
  __addDsNodes__(ds, options = {}) {
    if (Array.isArray(ds[0])) { // check if we are dealing with a 2D array
      for (let i = 0; i < ds.length; i += 1) {
        if (!Array.isArray(ds[i][0])) {
          // handles 2D array without nested DS
          this.__addDataNode__(ds[i][0], ds[i][1], ds[i][2], ds[i][3]);
          // eslint-disable-next-line no-continue
          continue;
        }
        // handle nested ds
        this.xml += '<ds';
        // append <ds> options
        if (options.dim) { this.xml += ` dim='${options.dim}'`; }
        if (options.dou) { this.xml += ` dou='${options.dou}'`; }
        if (options.len) { this.xml += ` len='${options.len}'`; }
        if (options.data) { this.xml += ` data='${options.data}'`; }
        this.xml += '>';

        for (let j = 0; j < ds[i].length; j += 1) {
          this.__addDsNodes__(ds[i][j], options);
        }
        this.xml += '</ds>';
      }
    } else {
      this.__addDataNode__(ds[0], ds[1], ds[2], ds[3]);
    }
  }

  /**
   * Internal function to handle ds and data within <parm> node
   * @param {object} parameter
   */
  __addData__(parameter = {}) {
    // adding a data structure with data nodes
    if (Array.isArray(parameter.value)) {
      this.xml += '<ds';
      // append <ds> options
      if (parameter.dim) { this.xml += ` dim='${parameter.dim}'`; }
      if (parameter.dou) { this.xml += ` dou='${parameter.dou}'`; }
      if (parameter.len) { this.xml += ` len='${parameter.len}'`; }
      if (parameter.data) { this.xml += ` data='${parameter.data}'`; }
      this.xml += '>';
      this.__addDsNodes__(parameter.value, parameter);
      this.xml += '</ds>';
    } else {
      this.__addDataNode__(parameter.name, parameter.type, parameter.value, parameter);
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
    const nameNode = parameter.name ? ` name='${parameter.name}'` : '';
    this.xml += `<parm${nameNode}`;

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
