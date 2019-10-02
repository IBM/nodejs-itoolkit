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

const {
  iXmlNodeCmdOpen,
  iXmlNodeCmdClose,
  iXmlNodeQshOpen,
  iXmlNodeQshClose,
  iXmlNodeShOpen,
  iXmlNodeShClose,
} = require('./ixml');

const availableCommands = ['sh', 'cl', 'qsh'];

class CommandCall {
  /**
   * @description Creates a new CommandCall object
   * @constructor
   * @param {object} config
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
    this.options = config.options || null;
    this.xml = '';
  }

  /**
   * @description returns the command in xml format
   * @returns {string}
   */
  toXML() {
    if (this.type === 'sh') {
      if (this.options) {
        this.xml = iXmlNodeShOpen(this.options.rows, this.options.hex, this.options.before,
          this.options.after, this.options.error)
              + this.command + iXmlNodeShClose();
      } else {
        this.xml = iXmlNodeShOpen('', '', '', '', '') + this.command + iXmlNodeShClose();
      }
    } else if (this.type === 'cl') {
      const exec = (this.command.indexOf('?') > 0) ? 'rexx' : 'cmd';

      if (this.options) {
        this.xml = iXmlNodeCmdOpen(this.options.exec, this.options.hex, this.options.before,
          this.options.after, this.options.error) + this.command + iXmlNodeCmdClose();
      } else {
        this.xml = iXmlNodeCmdOpen(exec, '', '', '', '', '') + this.command + iXmlNodeCmdClose();
      }
    } else if (this.type === 'qsh') {
      if (this.options) {
        this.xml = iXmlNodeQshOpen(this.options.rows, this.options.hex, this.options.before,
          this.options.after, this.options.error) + this.command + iXmlNodeQshClose();
      } else {
        this.xml = iXmlNodeQshOpen('', '', '', '', '') + this.command + iXmlNodeQshClose();
      }
    }

    return this.xml;
  }
}

module.exports.CommandCall = CommandCall;
