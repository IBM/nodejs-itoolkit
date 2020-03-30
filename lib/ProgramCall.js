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

/* eslint-disable no-underscore-dangle */

class ProgramCall {
  /**
   * ProgramCall Configuration
   * @typedef {object} programCallConfig
   * @property {string} lib - The library where the program exists
   * @property {string} [error="fast"] - Valid options are 'on', 'off', or 'fast'
   * @property {string} [func] - The target function of the service program
   */

  /**
   * @description Creates a new ProgramCall object.
   * @constructor
   * @param {string} program - The program or service program name.
   * @param {programCallConfig} [options]
   */
  constructor(program, options = {}) {
    this.xml = `<pgm name='${program}'`;
    if (options.lib) this.xml += ` lib='${options.lib}'`;
    if (options.func) this.xml += ` func='${options.func}'`;
    this.xml += ` error='${options.error || 'fast'}'>`;
  }

  /**
   * @private
   * @description
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
      if (data.hex) { this.xml += ` hex='${data.hex}'`; }
      if (data.trim) { this.xml += ` trim='${data.trim}'`; }
      this.xml += `>${data.value}</data>`;
    }
  }

  /**
  * Data Object Within DS
  * @typedef {object} data
  * @property {string} type - The XMLSERVICE data type.
  * @property {string} value - The value of the data.
  * @property {string} [name] - The name of the data.
  * @property {string} [varying] - Option for character varying data
  * Valid values are 'on', 'off', '2', or '4'.
  * @property {string} [enddo] - Option to terminate dou of ds this must match dou label.
  * @property {string} [setlen] - Option to calculate length of ds this must match len label.
  * @property {string} [hex] -  Option for hex input character.
  * @property {string} [trim] - Option to trim character. Valid values are 'on' or 'off'.
  */

  /**
  * Parameter Config Object
  * @typedef {object} parameterConfig
  * @property {string} type - The XMLSERVICE data type or ds for a data structure.
  * @property {string} value - The value of the data.
  * @property {string} [name] - The name of the parameter.
  * @property {data[]} [fields] - The data objects within the ds.
  * @property {string} [io] -The parm option to define parameter input output type.
  * Valid values are 'in', 'out', or 'both'.
  * @property {string} [by] - The parm option to pass the parameter by reference or value.
  * Valid values are 'ref' or 'val'.
  * @property {string} [dim] - The ds option for array dimension value.
  * @property {string} [dou] - The ds option for label match array dou terminate parm label.
  * @property {string} [len] - The ds option for label match calculate length of ds parm label.
  * @property {string} [varying] - The data option for character varying data.
  * Valid values are 'on', 'off', '2', or '4'.
  * @property {string} [enddo] - The data option to terminate dou of ds this must match dou label.
  * @property {string} [setlen] - The data option to calculate length of ds this
  * must match len label.
  * @property {string} [hex] - The data option for hex input character.
  * @property {string} [trim] - The data option to trim character. Valid values are 'on' or 'off'.
  */

  /**
  * @description Adds a parameter to the program XML.
  * @param {parameterConfig} parmeter
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
  * Return Config Object
  * @typedef {object} returnConfig
  * @property {string} type - The XMLSERVICE data type or ds for a data structure.
  * @property {string} value - The value of the data node.
  * @property {string} [name] - The name of the parameter.
  * @property {data[]} [fields] - The data elements within the ds.
  * @property {string} [dim] - The ds option for array dimension value.
  * @property {string} [dou] - The ds option for label match array dou terminate parm label.
  * @property {string} [len] - The ds option for label match calculate length of ds parm label.
  * @property {string} [varying] - The data option for character varying data.
  * Valid values are 'on', 'off', '2', or '4'.
  * @property {string} [enddo] - The data option to terminate dou of ds this must match dou label.
  * @property {string} [setlen] - The data option to calculate length of ds this
  * must match len label.
  * @property {string} [hex] - The data option for hex input character.
  * @property {string} [trim] - The data option to trim character. Valid values are 'on' or 'off'.
  */

  /**
   * @description Adds a return element to the program XML.
   * @param {returnConfig} data
   */
  addReturn(data = {}) {
    if (typeof data !== 'object') {
      throw new Error('Expected the first parameter to be an object');
    }
    if (data.type === undefined) {
      throw new Error('Expected \'type\' key on the data object');
    }

    this.xml += '<return>';
    this.__addData__(data);
    this.xml += '</return>';
  }

  /**
   * @returns {string} the generated program XML
   */
  toXML() {
    return `${this.xml}</pgm>`;
  }
}

module.exports.ProgramCall = ProgramCall;
