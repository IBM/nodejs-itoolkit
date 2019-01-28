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

const ProgramCaller = require('./programCaller');

class iPgm {
  /**
   * @description Creates a new iPgm object
   * @constructor
   * @param {string} pgm
   * @param {object} [options]
   */
  constructor(pgm, options) {
    console.warn('As of v1.0, class \'iPgm\' is deprecated. Please use \'ProgramCaller\' instead.');
    this.programCaller = new ProgramCaller(pgm, options);
  }

  /**
    * @description adds a parameter to the program XML
    * @param {string | array} data
    * @param {string} [type]
    * @param {object} options
    * @param {*} inDs
    */
  addParam(data, type, options, inDs) {
    console.warn('As of v1.0, class \'iPgm.addParam(data, type, options, inDs)\' is deprecated. Please use \'ProgramCaller.addParam(data, type, options, inDs)\' instead.');
    this.programCaller.addParam(data, type, options, inDs);
  }

  /**
   * @description adds a return element to the program XML
   * @param {string} data
   * @param {string} type
   * @param {object} [options]
   */
  addReturn(data, type, options) {
    console.warn('As of v1.0, class \'iPgm.addReturn(data, type, options)\' is deprecated. Please use \'ProgramCaller.addParam(data, type, options)\' instead.');
    this.programCaller.addReturn(data, type, options);
  }

  /**
   * @description returns the current program XML
   * @returns {string} the generated program XML
   */
  toXML() {
    console.warn('As of v1.0, class \'iPgm.toXML()\' is deprecated. Please use \'ProgramCaller.toXML()\' instead.');
    return this.programCaller.toXML();
  }
}

module.exports = iPgm;
