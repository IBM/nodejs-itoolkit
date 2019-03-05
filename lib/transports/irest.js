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

const http = require('http');

const iRestHttp = (config, xmlInput, done) => {
  const {
    database = '*LOCAL',
    username = null,
    password = null,
    ipc = '*NA',
    ctl = '*here',
    host = 'localhost',
    port = 80,
    path = '/',
  } = config;

  const outputBuffer = 15728640; // set to the max output buffer 15Mib

  // perform some validation
  if (!database || typeof database !== 'string') {
    done('Provide a valid data source', null);
    return;
  }

  if (!username || typeof username !== 'string') {
    done('Provide a valid username', null);
    return;
  }

  if (!password || typeof password !== 'string') {
    done('Provide a valid password', null);
    return;
  }

  const xmlEnc = encodeURI(`db2=${database
  }&uid=${username
  }&pwd=${password
  }&ipc=${ipc
  }&ctl=${ctl
  }&xmlin=${xmlInput
  }&xmlout=${outputBuffer.toString()}`);

  const options = {
    host,
    port,
    path: `${path}?${xmlEnc}`,
    method: 'GET',
  };

  const request = http.request(options, (response) => {
    let xmlOutput = '';

    response.on('data', (chunk) => {
      xmlOutput += chunk;
    });

    response.on('end', () => {
      done(null, xmlOutput);
    });
  });

  request.on('error', (error) => {
    done(error, null);
  });

  request.end();
};

exports.iRestHttp = iRestHttp;
