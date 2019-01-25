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

const xt = require('./itoolkit');

const timeoutMsg = 'Timeout!';
const retryInterval = 100; // wait 0.1 second to retry to get result in sync mode.
const retryTimes = Math.round(xt.timeout / retryInterval);

class iProd {
  constructor(conn) {
    this.conn = conn; // Pass in the connection object.
    this.errno = [
      [0, '10i0'],
      [0, '10i0', { setlen: 'rec2' }],
      ['', '7A'],
      ['', '1A'],
    ];
  }

  getPTFInfo(PTFID, cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      [0, '10i0'], // [2]Offset to additional information
      ['', '7A'], // [3]Product ID
      ['', '7A'], // [4]PTF ID
      ['', '6A'], // [5]Release level
      ['', '4A'], // [6]Product option
      ['', '4A'], // [7]Load ID
      ['', '1A'], // [8]Loaded status
      ['', '1A'], // [9]Cover letter status
      ['', '1A'], // [10]On-order status
      ['', '1A'], // [11]Save file status
      ['', '10A'], // [12]File name
      ['', '10A'], // [13]File library name
      ['', '1A'], // [14]PTF type
      ['', '1A'], // [15]IPL action
      ['', '1A'], // [16]Action pending
      ['', '1A'], // [17]Action required
      ['', '1A'], // [18]PTF is released
      ['', '6A'], // [19]Target release
      ['', '7A'], // [20]Superseding PTF
      ['', '1A'], // [21]Current IPL source
      ['', '2A'], // [22]Minimum level
      ['', '2A'], // [23]Maximum level
      ['', '1A'], // [24]Format information available
      ['', '13A'], // [25]Status date and time
      ['', '7A'], // [26]Licensed Internal Code group
      ['', '7A'], // [27]Superseded by PTF ID
      ['', '1A'], // [28]Current server IPL source
      ['', '1A'], // [29]Server IPL required
      ['', '13A'], // [30]Creation date and time
      ['', '1A'], // [31]Technology refresh PTF
      ['', '1A'], // [32]Reserved
    ];

    const PTFInfo = [
      [PTFID, '7A'], // PTF ID
      ['*ONLY', '7A'], // Product ID
      ['', '6A'], // Release level
      ['', '10i0'], // CCSID for returned directory names
      ['0', '1A'], // Close PTF database files
      ['', '25A'], // Reserved
    ];

    const pgm = new xt.iPgm('QPZRTVFX', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam(PTFInfo);
    pgm.addParam('PTFR0100', '8A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue; // The returned value.
    let stop = 0; // A flag indicating whether the process is finished.
    let retry = 0; // How many times we have retried.
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) {
        rtValue = {
          Product_ID: output[0].data[3].value,
          PTF_ID: output[0].data[4].value,
          Release_level: output[0].data[5].value,
          Product_option: output[0].data[6].value,
          Load_ID: output[0].data[7].value,
          Loaded_status: output[0].data[8].value,
          Cover_letter_status: output[0].data[9].value,
          'On-order_status': output[0].data[10].value,
          Save_file_status: output[0].data[11].value,
          File_name: output[0].data[12].value,
          File_library_name: output[0].data[13].value,
          PTF_type: output[0].data[14].value,
          IPL_action: output[0].data[15].value,
          Action_pending: output[0].data[16].value,
          Action_required: output[0].data[17].value,
          PTF_is_released: output[0].data[18].value,
          Target_release: output[0].data[19].value,
          Superseding_PTF: output[0].data[20].value,
          Current_IPL_source: output[0].data[21].value,
          Minimum_level: output[0].data[22].value,
          Maximum_level: output[0].data[23].value,
          Format_information_available: output[0].data[24].value,
          Status_date_and_time: output[0].data[25].value,
          Licensed_Internal_Code_group: output[0].data[26].value,
          Superseded_by_PTF_ID: output[0].data[27].value,
          Current_server_IPL_source: output[0].data[28].value,
          Server_IPL_required: output[0].data[29].value,
          Creation_date_and_time: output[0].data[30].value,
          Technology_refresh_PTF: output[0].data[31].value,
          Reserved: output[0].data[32].value,
        };
      } else { rtValue = str; }
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };

    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };

    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
  }

  getProductInfo(prodID, option, cb) {
    let prodOption;
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      [0, '10i0'], // [2]Reserved
      ['', '7A'], // [3]Product ID
      ['', '6A'], // [4]Release level
      ['', '4A'], // [5]Product option
      ['', '4A'], // [6]Load ID
      ['', '10A'], // [7]Load type
      ['', '10A'], // [8]Symbolic load state
      ['', '10A'], // [9]Load error indicator
      ['', '2A'], // [10]Load state
      ['', '1A'], // [11]Supported flag
      ['', '2A'], // [12]Registration type
      ['', '14A'], // [13]Registration value
      ['', '2A'], // [14]Reserved
      [0, '10i0'], // [15]Offset to additional information
      ['', '4A'], // [16]Primary language load identifier
      ['', '6A'], // [17]Minimum target release
      ['', '6A'], // [18]Minimum VRM of *BASE required by option
      ['', '1A'], // [19]Requirements met between base and option value
      ['', '3A'], // [20]Level
      ['', '1A'], // [21]Reserved
    ];
    if (!cb) { // If we do not get the third param,
      if (option) { // If we get two params,
        if (xt.getClass(option) === 'Function') { // If it is a function,
          cb = option; // then it is the callback. // TODO: This just needs work for linting
        }
      } else { // If we have only one param,
        prodOption = '0000'; // then use *BASE as default.
      }
    }
    if (option < 0 || option > 99) { prodOption = '0000'; } else if (prodOption < 10) { prodOption = `000${option}`; } else prodOption = `00${option}`;

    const ProdInfo = [
      [prodID, '7A'],
      ['*ONLY', '6A'],
      [prodOption, '4A'],
      ['*CODE', '10A'],
    ];

    const pgm = new xt.iPgm('QSZRTVPR', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('PRDR0100', '8A');
    pgm.addParam(ProdInfo);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue; // The returned value.
    let stop = 0; // A flag indicating whether the process is finished.
    let retry = 0; // How many times we have retried.
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) {
        rtValue = {
          // Reserved: output[0].data[2].value, // TODO: Duplicate key
          Product_ID: output[0].data[3].value,
          // Release_level: output[0].data[4].value, // TODO: Duplicate key
          Product_option: output[0].data[5].value,
          Load_ID: output[0].data[6].value,
          Load_type: output[0].data[7].value,
          Symbolic_load_state: output[0].data[8].value,
          Load_error_indicator: output[0].data[9].value,
          Load_state: output[0].data[10].value,
          Supported_flag: output[0].data[11].value,
          Registration_type: output[0].data[12].value,
          Registration_value: output[0].data[13].value,
          // Reserved: output[0].data[14].value, // TODO: Duplicate key
          Offset_to_additional_information: output[0].data[15].value,
          Primary_language_load_identifier: output[0].data[16].value,
          Minimum_target_release: output[0].data[17].value,
          'Minimum_VRM_of_*BASE_required_by_option': output[0].data[18].value,
          Requirements_met_between_base_and_option_value: output[0].data[19].value,
          Level: output[0].data[20].value,
          Reserved: output[0].data[21].value,
        };
      } else { rtValue = str; }
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };

    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };

    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
  }

  getInstalledProducts(cb) {
    const maxProd = 197;
    const outBuf = [];
    for (let i = 0; i < maxProd; i += 1) {
      outBuf.push(['', '7A']); // [0]Product ID
      outBuf.push(['', '5A']); // [1]Product option
      outBuf.push(['', '6A']); // [2]Release level
      outBuf.push(['', '2h']); // [3]Skip
      outBuf.push(['', '7A']); // [4]Description text message ID
      outBuf.push(['', '10A']); // [5]Description text object name
      outBuf.push(['', '10A']); // [6]Description text library name
      outBuf.push(['', '1A']); // [7]Installed flag
      outBuf.push(['', '1A']); // [8]Supported flag
      outBuf.push(['', '2A']); // [9]Registration type
      outBuf.push(['', '14A']); // [10]Registration value
      outBuf.push(['', '132A']); // [11]Description text
    }
    const inputInfo = [
      [maxProd, '10i0'],
      ['*ALL', '10A'],
      ['1', '1A'],
      ['1', '1A'],
      ['*ALL', '10A'],
      ['*INSTLD', '10A'],
      [maxProd, '10i0'],
    ];
    const ProdInfo = [
      ['', '7A'],
      ['', '5A'],
      ['', '6A'],
    ];
    const OutputInfo = [
      [0, '10i0'],
      [0, '10i0'],
      [0, '10i0'],
    ];
    const pgm = new xt.iPgm('QSZSLTPR', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out' });
    pgm.addParam(inputInfo);
    pgm.addParam('PRDS0200', '8A');
    pgm.addParam(ProdInfo);
    pgm.addParam(OutputInfo, { io: 'out' });
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue = []; // The returned value.
    let stop = 0; // A flag indicating whether the process is finished.
    let retry = 0; // How many times we have retried.
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      const { length } = output[0].data;
      const count = Number(output[0].data[length - 6].value);
      if (Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true) {
        for (let i = 0; i < count * 12; i += 12) {
          rtValue.push({
            Product_ID: output[0].data[i].value,
            Product_option: output[0].data[i + 1].value,
            Release_level: output[0].data[i + 2].value,
            Description_text_message_ID: output[0].data[i + 4].value,
            Description_text_object_name: output[0].data[i + 5].value,
            Description_text_library_name: output[0].data[i + 6].value,
            Installed_flag: output[0].data[i + 7].value,
            Supported_flag: output[0].data[i + 8].value,
            Registration_type: output[0].data[i + 9].value,
            Registration_value: output[0].data[i + 10].value,
            Description_text: output[0].data[i + 11].value,
          });
        }
      } else { rtValue = str; }
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };

    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };

    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
  }
}

exports.iProd = iProd;
