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

class CommandGenerator {
  static generateCmdXML(cmd, options) {
    const xexec = (cmd.indexOf('?') > 0) ? 'rexx' : 'cmd'; // if need return value, use 'rexx'
    let xml;

    if (options) {
      xml = iXmlNodeCmdOpen(options.exec, options.hex, options.before, options.after, options.error)
            + cmd + iXmlNodeCmdClose();
    } else {
      xml = iXmlNodeCmdOpen(xexec, '', '', '', '', '') + cmd + iXmlNodeCmdClose();
    }

    return xml;
  }

  static generateQshXML(qsh, options) {
    let xml;
    if (options) {
      xml = iXmlNodeQshOpen(options.rows, options.hex, options.before, options.after, options.error)
            + qsh + iXmlNodeQshClose();
    } else {
      xml = iXmlNodeQshOpen('', '', '', '', '') + qsh + iXmlNodeQshClose();
    }
    return xml;
  }

  static generateShXML(sh, options) {
    let xml;
    if (options) {
      xml = iXmlNodeShOpen(options.rows, options.hex, options.before, options.after, options.error)
            + sh + iXmlNodeShClose();
    } else {
      xml = iXmlNodeShOpen('', '', '', '', '') + sh + iXmlNodeShClose();
    }
    return xml;
  }
}

// DEPRECATED FUNCTIONS BELOW. WILL BE REMOVED SOMETIME AFTER v1.0

/**
 * @description creates cmd XML
 * @param {string} cmd
 * @param {object} [options]
 * @returns {string} - the generated XML for the CL command
 */
const iCmd = (cmd, options) => {
  let xexec = 'cmd';
  let xml;

  if (cmd.indexOf('?') > 0) { // If need return value
    xexec = 'rexx';
  }

  if (options) {
    xml = iXmlNodeCmdOpen(options.exec, options.hex, options.before, options.after, options.error)
          + cmd + iXmlNodeCmdClose();
  } else {
    xml = iXmlNodeCmdOpen(xexec, '', '', '', '', '') + cmd + iXmlNodeCmdClose();
  }

  return xml;
};

/**
 * @description creates qsh XML
 * @param {string} qsh
 * @param {object} [options]
 * @returns {string} - the generated XML for the qsh command
 */
const iQsh = (qsh, options) => {
  let xml;
  if (options) {
    xml = iXmlNodeQshOpen(options.rows, options.hex, options.before, options.after, options.error)
          + qsh + iXmlNodeQshClose();
  } else {
    xml = iXmlNodeQshOpen('', '', '', '', '') + qsh + iXmlNodeQshClose();
  }
  return xml;
};

/**
 * @description creates sh XML
 * @param {string} sh
 * @param {object} [options]
 * @returns {string} - the generated XML for the sh command
 */
const iSh = (sh, options) => {
  let xml;
  if (options) {
    xml = iXmlNodeShOpen(options.rows, options.hex, options.before, options.after, options.error)
          + sh + iXmlNodeShClose();
  } else {
    xml = iXmlNodeShOpen('', '', '', '', '') + sh + iXmlNodeShClose();
  }
  return xml;
};

module.exports.CommandGenerator = CommandGenerator;
module.exports.iCmd = iCmd;
module.exports.iQsh = iQsh;
module.exports.iSh = iSh;
