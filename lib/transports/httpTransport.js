// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

const http = require('http');

function httpCall(config, xmlInput, done) {
  const {
    database = '*LOCAL',
    username = null,
    password = null,
    ipc = '*NA',
    ctl = '*here',
    url = null,
  } = config;

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

  if (!url || typeof url !== 'string') {
    done('Provide a valid url', null);
    return;
  }

  const parms = {
    db2: database,
    uid: username,
    pwd: password,
    ipc,
    ctl,
    xmlin: xmlInput,
    xmlout: '15728640', // set to the max output buffer 15Mib
  };

  const queryString = Object.keys(parms).map((k) => `${k}=${encodeURIComponent(parms[k])}`).join('&');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(queryString),
    },
  };

  const request = http.request(url, options, (response) => {
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
  request.write(queryString);
  request.end();
}

exports.httpCall = httpCall;
