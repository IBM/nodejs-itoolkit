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
  iXmlNodeHead, iXmlNodeScriptOpen, iXmlNodeScriptClose,
} = require('./ixml');

const { iRestHttp } = require('./transports/irest');
const { db2Call } = require('./transports/istoredp');
const { sshCall } = require('./transports/sshTransport');

const availableTransports = {
  idb: db2Call,
  rest: iRestHttp,
  ssh: sshCall,
};

class Connection {
  /**
   * @description Creates a new Connection object
   * @constructor
   * @param {object | string} optionsOrDb
   * @param {string} user
   * @param {string} pwd
   * @param {object} [restConfig]
   */
  constructor(optionsOrDb, username, password, restOptions) {
    this.commandList = [];
    this.returnError = true;
    this.xml2js = true;
    this.verbose = false;
    let options = optionsOrDb;

    // maintain compatibility with versions < 1.0
    if (typeof options !== 'object') {
      options = {
        returnError: false,
        xml2js: false,
        transport: 'idb',
        transportOptions: {
          database: optionsOrDb,
          username,
          password,
        },
      };
      if (restOptions && typeof restOptions === 'object') {
        if (restOptions.host) {
          // pre v1.0 falls back to idb transport when host is not specified
          options.transport = 'rest';
        }
        options.transportOptions = { ...options.transportOptions, ...restOptions };
      }
    }

    this.transport = options.transport;

    if (!(this.transport in availableTransports)) {
      throw new Error(`${this.transport} is not a valid transport`);
    }

    this.transportCall = availableTransports[this.transport];
    this.transportOptions = options.transportOptions || {};

    if (typeof options.returnError === 'boolean') {
      this.returnError = options.returnError;
    }
    
    if (typeof options.xml2js === 'boolean') {
      this.xml2js = options.xml2js;
    }

    if (typeof options.verbose === 'boolean') {
      this.verbose = options.verbose;
    }
  }

  /**
   * @description
   * enables or disables the verbose mode for debugging
   * returns the current state of debug flag
   * @param {boolean} [flag]
   * @returns {boolean} the current state of the debug flag
   */
  debug(flag) {
    if (typeof flag === 'boolean') {
      this.verbose = flag;
    }
    return this.verbose;
  }


  /**
   * @description returns transportOptions property from Connection object.
   * @returns {object} the transportOptions property from Connection object.
   */
  getTransportOptions() {
    return this.transportOptions;
  }

  /**
   * @description adds XML request to command list
   * @param {string | object} xml
   */
  add(xml) {
    if (typeof xml === 'object') {
      this.commandList.push(xml.toXML());
    } else if (xml && typeof xml === 'string') {
      this.commandList.push(xml);
    }
  }

  /**
   * @description
   * Invokes transport with XML input from command list
   * Calls user provided callback with the [error] and XML output
   * @param {function} callback
   */
  run(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Passing a callback function is required');
    }
    if (!this.commandList.length) {
      throw new Error('Command list is empty. Make sure you add commands first');
    }

    // Build the XML document.
    const xmlInput = iXmlNodeHead() + iXmlNodeScriptOpen() + this.commandList.join()
                     + iXmlNodeScriptClose();
    // reset the command list
    this.commandList = [];
    this.transportOptions.verbose = this.verbose;

    // Print the XML document if in debug mode.
    if (this.verbose) {
      console.log('============\nINPUT XML\n============');
      console.log(xmlInput);
    }

    this.transportCall(this.transportOptions, xmlInput, (error, xmlOutput) => {
      if (this.verbose) {
        console.log('============\nOUTPUT XML\n============');
        console.log(xmlOutput);
      }
      // create an Error object if error returned from transport is not one already
      let transportError = error;
      if (error && !(error instanceof Error)) {
        transportError = new Error(error);
      }
      if (this.returnError) {
        callback(transportError, xmlOutput);
      } else {
        callback(xmlOutput);
      }
    });
  }
}

module.exports.Connection = Connection;
