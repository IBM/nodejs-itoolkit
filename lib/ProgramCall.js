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
   * @property {string} lib - The library where the program exists.
   * @property {string} [error=fast] - Determines action when an error is encountered.
   * Valid options are ``on``, ``off``, or ``fast``. Default is ``fast``. Using ``on``
   * will cause the script execution to stop and log a full error report.
   * Using ``off`` or ``fast`` continues executing the script. The Difference is that ``fast``
   * will log a brief error report and ``off`` will not.
   * @property {string} [func] - The target function of the service program.
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
   * @description Internal function to handle ds and data within <parm> node
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
  * @property {string} [varying] - Marks data as a varying length character type
  * (ie. varchar) and specifies the size of the length prefix. Valid values are ``on``, ``off``,
  *  ``2``, or '4' (``on`` is equivalent to ``2``). NOTE: This is only valid for character types.
  * @property {string} [enddo] - The label that marks the end of the ``dou``` (do until) label.
  * @property {string} [setlen] - The label to set the length of the data
  * based on the matching ``len`` label.
  * @property {string} [hex] - Whether to interpret the data as hex.
  * Valid values are ``on`` or ``off``. Default is ``off``.
  * @property {string} [trim] - Whether to allow trim. Valid values are ``on`` or ``off``.
  * Default is ``on``.
  */

  /**
  * Parameter Config Object
  * @typedef {object} parameterConfig
  * @property {string} type - The XMLSERVICE data type or ds for a data structure.
  * @property {string} value - The value of the data.
  * @property {string} [name] - The name of the parameter.
  * @property {data[]} [fields] - The array of data objects for a ds.
  * @property {string} [io] - Whether the parameter is used for input, output, both, or *OMIT.
  * Valid values are ``in``, ``out``, ``both``, and ``omit``.
  * @property {string} [by] - Whether to pass the parameter by reference or value.
  * Valid values are ``ref`` or ``val``. NOTE: Pass by value requires ``XMLSERVICE >= 1.9.9.3``.
  * @property {string} [dim] - Sets ds array dimension value.
  * @property {string} [dou] - Marks ds with do until label.
  * @property {string} [len] - Marks ds with len label.
  * @property {string} [varying] -  Marks data as a varying length character type
  * (ie. varchar) and specifies the size of the length prefix. Valid values are 'on', ``off``,
  * ``2``, or ``4`` (``on`` is equivalent to ``2``). NOTE: This is only valid for character types.
  * @property {string} [enddo] - The label that marks the end of the ``dou`` (do until) label.
  * @property {string} [setlen] - The label to set the length of the data
  * based on the matching ``len`` label.
  * @property {string} [hex] - Whether to interpret the data as hex.
  * Valid values are ``on`` or ``off``. Default is ``off``.
  * @property {string} [trim] - Whether to allow trim. Valid values are ``on`` or ``off``.
  * Default is ``on``.
  */

  /**
  * @description Adds a parameter to the program XML.
  * @param {parameterConfig} parmeter
  * @throws Will throw an error when the first parameter is not an object.
  * @throws Will throw an error when the object does set the ``type`` key.
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
  * @property {string} [name] - The name of the return data.
  * @property {data[]} [fields] - The array of data objects for a ds.
  * @property {string} [dim] - Sets ds array dimension value.
  * @property {string} [dou] - Marks ds with do until label.
  * @property {string} [len] - Marks ds with len label.
  * @property {string} [varying] - Marks data as a varying length character type
  * (ie. varchar) and specifies the size of the length prefix. Valid values are ``on``, ``off``,
  * ``2``, or ``4`` (``on`` is equivalent to ``2``). NOTE: This is only valid for character types.
  * @property {string} [enddo] - The label that marks the end of the ``dou`` (do until) label.
  * @property {string} [setlen] - The label to set the length of the data
  * based on the matching ``len`` label.
  * @property {string} [hex] - Whether to interpret the input as hex.
  * Valid values are ``on`` or ``off``. Default is ``off``.
  * @property {string} [trim] - Whether to allow trim. Valid values are ``on`` or ``off``.
  * Default is ``on``.
  */

  /**
   * @description Specifies the type of the return value for the service program function.
   * @param {returnConfig} data
   * @throws Will throw an error when the first parameter is not an object.
   * @throws Will throw an error when the object does set the ``type`` key.
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
