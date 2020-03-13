const { ProgramCall } = require('./ProgramCall');
const { CommandCall } = require('./CommandCall');
const { xmlToJson } = require('./utils');

// QRCVDTAQ Parameters
const QRCVDTAQParameters = {
  DataQueueName: { io: 'in',  type: '10A' },
  LibraryName:   { io: 'in',  type: '10A' },
  LengthOfData:  { io: 'in',  type: '5p0' },
  Data:          { io: 'out', type: '10A' },
  WaitTime:      { io: 'in',  type: '5p0' }
}

class DataQueue {
  /**
   * @description Creates a new DataQueue object
   * @constructor
   * @param {object} connection
   * @param {string} name
   * @param {string} library
   */
  constructor(connection, name, library = '') {
    this.connection = connection;

    if (name.length > 10) {
      throw Error("DataQueue name must be 10 or fewer characters long.");
    }

    if (library.length > 10) {
      throw Error("DataQueue library must be 10 of fewer characers long.");
    }

    this.name = name;
    this.library = library ? library : '*CURLIB';
    this.qualifiedName = this.name.padEnd(10, ' ') + this.library.padEnd(10, ' ');
    this.maxLength = undefined;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Data Queue (CLDTAQ) CL Command
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @description Creates a Data Queue on the system of the connection passed in
   *              the constructor.
   * @constructor
   * @param {number} maxLength
   * @param {function} callback
   */
  create(maxLength, callback) {
    console.log(CommandCall.CommandCall);
    this.maxLength = maxLength;
    const commandConfig = {
      type: 'cl',
      command: `CRTDTAQ DTAQ(${this.library ? `${this.library}/` : ''}${this.name}) MAXLEN(${this.maxLength})`
    }

    this.connection.add(new CommandCall(commandConfig));
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error);
      }

      const result = xmlToJson(xmlOutput);
      callback(null, result);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Data Queue (DLTDTAQ) CL Command
  //////////////////////////////////////////////////////////////////////////////
  delete(callback) {
    const commandConfig = {
      type: 'cl',
      command: `DLTDTAQ DTAQ(${this.library ? `${this.library}/`: ''}${this.name})`
    }

    this.connection.add(new CommandCall(commandConfig));
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error);
      }

      const result = xmlToJson(xmlOutput);
      callback(null, result);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Receive Data Queue (QRCVDTAQ) API
  //////////////////////////////////////////////////////////////////////////////

  async receive(wait, length, callback) {
    if (typeof wait === 'function') {
      callback = wait;
      wait = 0;
    }

    if (length == undefined) {
      if (this.maxLength == undefined) {
        const description = await this._getDataQueueDescription();
        this.maxLength = description[0].data[2].value;
      }

      length = this.maxLength;
    }

    const program = new ProgramCall('QRCVDTAQ', { lib: 'QSYS' });

    program.addParam(this.name,    QRCVDTAQParameters.DataQueueName.type, { io: QRCVDTAQParameters.DataQueueName.io });
    program.addParam(this.library, QRCVDTAQParameters.LibraryName.type,   { io: QRCVDTAQParameters.LibraryName.io });
    program.addParam(length,       QRCVDTAQParameters.LengthOfData.type,  { io: QRCVDTAQParameters.LengthOfData.io });
    program.addParam('',           `${this.maxLength}A`,                  { io: QRCVDTAQParameters.Data.io });
    program.addParam(wait,         QRCVDTAQParameters.WaitTime.type,      { io: QRCVDTAQParameters.WaitTime.io });

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }
      const result = xmlToJson(xmlOutput);
      const data = result[0].data[0].value;
      return callback(null, data);
    });
  }

   // alias for receive, as the API is "RCV", but jt400 uses the term "read"
   async read(wait, callback) {
    return this.receive(wait, callback);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Send Data Queue (QSNDDTAQ) API
  //////////////////////////////////////////////////////////////////////////////

  async send(data, callback) {
    const program = new ProgramCall('QSNDDTAQ', { lib: 'QSYS' });
    program.addParam(this.name,    '10A');             // Data queue name
    program.addParam(this.library, '10A');             // Library name
    program.addParam(data.length,  '5p0');             // Length of data
    program.addParam(data,         `${data.length}A`); // Data

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }
      const result = xmlToJson(xmlOutput);
      return callback(null, result);
    });
  }

  async write(data, callback) {
    return this.write(data, callback);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Clear Data Queue (QCLRDTAQ) API
  //////////////////////////////////////////////////////////////////////////////

  async clear() {
    const program = new ProgramCall('QCLRDTAQ', { lib: 'QSYS' });
    program.addParam(this.name,    '10A'); // Data queue name
    program.addParam(this.library, '10A'); // Library name

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }
      const result = xmlToJson(xmlOutput);
      return callback(null, result);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // "Private" Functions
  //////////////////////////////////////////////////////////////////////////////

  
  async _getDataQueueDescription(callback) {
    const program = new ProgramCall('QMHQRDQD', { lib: 'QSYS' });

    const receiverVariable = [
      [0, '10i0'],
      [0, '10i0'],
      [0, '10i0']
    ];

    program.addParam(receiverVariable, { io: 'out', len: 'varLen'}); // Receiver variable
    program.addParam(0,       '10i0', { setlen: 'varLen'}); // Length of receiver variable
    program.addParam('RDQD0100',         '8A');   // Format name
    program.addParam(this.qualifiedName, '20A');  // Qualified data queue name

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }

      const result = xmlToJson(xmlOutput);
      this.maxLength = result[0].data[2].value
      return callback(null, result);
    });
  }
}

module.exports.DataQueue = DataQueue;
