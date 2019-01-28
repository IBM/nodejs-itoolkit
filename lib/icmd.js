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

const { iXmlNodeCmdOpen, iXmlNodeCmdClose } = require('./ixml');

// iCmd() return a CL command object

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

module.exports = iCmd;
