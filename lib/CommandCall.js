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

const availableCommands = ['sh', 'cl', 'qsh'];

/**
 * CL Command Options
 * @typedef {object} clOptions
 * @property {string} [exec=cmd] - How to run the command.
 * Valid options: ``cmd``, ``system``, or ``rexx``.  Default is ``cmd``.
 * @property {string} [error=fast] - Determines action when an error is encountered.
 * Valid options are ``on``, ``off``, or ``fast``. Default is ``fast``. Using ``on``
 * will cause the script execution to stop and log a full error report.
 * Using ``off`` or ``fast`` continues executing the script. The Difference is that ``fast``
 * will log a brief error report and ``off`` will not.
 * @property {string} [hex=off] - Whether to output data in hex format.
 * Valid options are ``on`` or ``off``. Default is ``off``.
 * @property {string} [before] - The CCSID to convert to before the command call.
 * @property {string} [after] - The CCSID to convert to after the command call.
 */

/**
 * QSH and SH Command Options
 * @typedef {object} shOptions
 * @property {string} [rows] - Whether to split the output row by row.
 * Valid options are ``on`` or ``off``. Default is ``off``.
 * @property {string} [error=fast] - Determines action when an error is encountered.
 * Valid options are ``on``, ``off``, or ``fast``. Default is ``fast``. Using ``on``
 * will cause the script execution to stop and log a full error report.
 * Using ``off`` or ``fast`` continues executing the script. The Difference is that ``fast``
 * will log a brief error report and ``off`` will not.
 * @property {string} [hex=off] - Whether to output data in hex format.
 * Valid options are ``on`` or ``off``. Default is ``off``.
 * @property {string} [before] - The CCSID to convert to before the command call.
 * @property {string} [after] - The CCSID to convert to after the command call.
 */

/**
 * CommandCall Configuration
 * @typedef {object} commandCallConfig
 * @property {string} command - The command string to run.
 * @property {string} type - The type of the commmand: ``cl``, ``qsh``, ``sh``.
 * NOTE: ``qsh`` type requires ``XMLSERVICE >= 1.9.8``.
 * @property {clOptions|shOptions} [commandOptions] - The options for the command.
 */

class CommandCall {
  /**
   * @description Creates a new CommandCall object.
   * @constructor
   * @param {commandCallConfig} config - The CommandCall config object.
   * @throws Will throw an error when the first parameter is not an object.
   * @throws Will throw an error when an invalid command type is set.
   */
  constructor(config) {
    if (!config.command || !config.type) {
      throw new Error('Please specify a command and type (cl, qsh, sh)');
    }

    if (!availableCommands.includes(config.type)) {
      throw new Error(`Invalid command type (${config.type}). Valid types: (${availableCommands.join(', ')})`);
    }

    this.command = config.command;
    this.type = config.type;
    this.options = config.options || {};
    this.xml = '';
  }

  /**
   * @returns {string} The command in xml format.
   */
  toXML() {
    if (!availableCommands.includes(this.type)) {
      throw new Error(`Invalid command type (${this.type}). Valid types: (${availableCommands.join(', ')})`);
    }

    const type = this.type === 'cl' ? 'cmd' : this.type;
    this.xml = `<${type}`;

    if (this.type === 'cl') {
      const defaultExec = (this.command.indexOf('?') > 0) ? 'rexx' : 'cmd';
      this.xml += ` exec='${this.options.exec || defaultExec}'`;
    }

    // append optional values if set
    if (this.options.rows) this.xml += ` rows='${this.options.rows}'`;
    if (this.options.hex) this.xml += ` hex='${this.options.hex}'`;
    if (this.options.before) this.xml += ` before='${this.options.before}'`;
    if (this.options.after) this.xml += ` after='${this.options.after}'`;

    this.xml += ` error='${this.options.error || 'fast'}'>${this.command}</${type}>`;

    return this.xml;
  }
}

module.exports.CommandCall = CommandCall;
