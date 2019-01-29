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

/**
 * main entry point for itoolkit package
 */

const {
  ProgramCall,
  iPgm, // deprecated
} = require('./ProgramCall');

const {
  CommandGenerator,
  iCmd, // deprecated
  iQsh, // deprecated
  iSh, // deprecated
} = require('./CommandGenerator');

const {
  SqlGenerator,
  iSql, // deprecated
} = require('./SqlGenerator');

const {
  Connection,
  iConn, // deprecated
} = require('./Connection');

const { xmlToJson } = require('./utils');
const {
  Toolkit,
  iDataQueue, // deprecated
  iNetwork, // deprecated
  iObj, // deprecated
  iProd, // deprecated
  iUserSpace, // deprecated
  iWork, // deprecated
} = require('./Toolkit');

module.exports = {
  CommandGenerator,
  ProgramCall,
  SqlGenerator,
  Connection,
  Toolkit,
  xmlToJson,
  // deprecated exports below, replaced by functionality above
  iCmd,
  iConn,
  iDataQueue,
  iNetwork,
  iObj,
  iPgm,
  iProd,
  iQsh,
  iSh,
  iSql,
  iUserSpace,
  iWork,
};


// Eventually, file will look something like this:

// const { ProgramCall } = require('./ProgramCall');
// const { CommandGenerator } = require('./CommandGenerator);
// const { Connection } = require('./Connection);
// const { Toolkit } = require('./Toolkit');
// const { xmlToJson } = require('./utils');
//
// module.exports = { ... }
//
