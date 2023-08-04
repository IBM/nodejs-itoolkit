// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

const { Client } = require('ssh2');

function sshCall(config, xmlIn, done) {
  const {
    verbose = false,
  } = config;

  let xmlOut = '';
  const xmlBuffer = Buffer.from(xmlIn);

  const client = new Client();

  // subscribe for events
  client.on('error', (error) => {
    if (verbose) {
      console.log('SSH CLIENT ERROR: ', error);
    }
    client.end();
    client.destroy();
    done(error, null);
  });

  client.on('close', () => {
    if (verbose) {
      console.log('SSH Client has closed');
    }
  });

  client.on('end', () => {
    if (verbose) {
      console.log('SSH Client has ended');
    }
  });

  client.on('ready', () => {
    if (verbose) {
      console.log('SSH Client is ready');
    }
    client.exec('/QOpenSys/pkgs/bin/xmlservice-cli', (error, stream) => {
      if (error) {
        if (verbose) {
          console.log('Exec error: ', error);
        }
        client.emit('error', error);
        return;
      }
      stream.on('exit', (code, signal, didCoreDump, description) => {
        if (verbose) {
          console.log(`Stream exit code: ${code}`);
          if (signal) {
            console.log(`Signal: ${signal}, Description: ${description}`);
          }
        }

        if (signal) {
          client.emit('error', new Error(`xmlservice-cli was signaled with: ${signal}`));
          return;
        }

        if (code !== 0) {
          client.emit('error', new Error(`xmlservice-cli exited abnormally with code: ${code}`));
          return;
        }
        client.end();
        client.destroy();
        done(null, xmlOut);
      });

      stream.stdin.on('end', () => {
        if (verbose) {
          console.log('stdin has ended');
        }
      });

      stream.stdout.on('end', () => {
        if (verbose) {
          console.log('stdout has ended');
        }
      });

      stream.stdout.on('data', (data) => {
        xmlOut += data.toString();
        if (verbose) {
          console.log(`STDOUT:\n${data}`);
        }
      });

      stream.stderr.on('data', (data) => {
        if (verbose) {
          console.log(`STDERR:\n${data}`);
        }
      });

      stream.stdin.write(xmlBuffer);
      stream.stdin.end();
    });
  });

  client.connect(config);
}

exports.sshCall = sshCall;
