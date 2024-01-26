// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/**
 * main entry point for itoolkit package
 */

const { ProgramCall } = require('./ProgramCall');
const { CommandCall } = require('./CommandCall');
const { Connection } = require('./Connection');

const {
  iPgm,
  iSql,
  iConn,
  iDataQueue,
  iNetwork,
  iObj,
  iProd,
  iUserSpace,
  iWork,
  iCmd,
  iQsh,
  iSh,
  xmlToJson,
} = require('./Deprecated');

const Types = require('./Types');

module.exports = {
  ProgramCall,
  CommandCall,
  Connection,
  ...Types,
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
