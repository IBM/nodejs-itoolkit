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

function returnTransports(transportOptions) {
  // eslint-disable-next-line global-require
  const { Connection } = require('./Connection');
  const availableTransports = ['idb', 'rest', 'ssh', 'odbc'];
  const transports = [];

  const options = {
    verbose: transportOptions.verbose,
    transportOptions,
  };

  availableTransports.forEach((transport) => {
    // eslint-disable-next-line no-param-reassign
    options.transport = transport;
    transports.push({ name: transport, me: new Connection(options) });
  });

  return transports;
}

function returnTransportsDeprecated(options) {
  // eslint-disable-next-line global-require
  const { iConn } = require('./itoolkit');
  const availableTransports = ['idb', 'rest'];
  const transports = [];
  let restOptions = null;

  availableTransports.forEach((transport) => {
    // eslint-disable-next-line no-param-reassign
    if (transport === 'rest') {
      restOptions = { host: options.host, port: options.port, path: options.path };
    }
    transports.push({
      name: transport,
      // eslint-disable-next-line new-cap
      me: new iConn(options.database, options.username, options.password, restOptions),
    });
  });

  return transports;
}

module.exports = { returnTransports, returnTransportsDeprecated };
