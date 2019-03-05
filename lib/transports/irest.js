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
const { validate } = require('../utils');

const iRestHttp = (config, xmlInput, done) => {
  const test = validate(config);

  if (test.invalid) {
    done(test.message, null);
  }

  const {
    database,
    username,
    password,
    outputBuffer,
    ipc = '',
    ctl = '',
    host,
    port,
    path,
  } = config;

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
  };

  const request = http.request(options, (response) => {
    let xmlOut = '';
    // another chunk of data has been received, so append it to xmlOut
    response.on('data', (chunk) => {
      xmlOut += chunk;
    });
    // the whole response has been received, so return
    response.on('end', () => {
      done(null, xmlOut);
    });
  });

  request.on('error', (error) => {
    done(error, null);
  });

  request.end();
};

exports.iRestHttp = iRestHttp;
