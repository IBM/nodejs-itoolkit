const { ProgramCall } = require('./ProgramCall');
const { CommandCall } = require('./CommandCall');
// const { xmlToJson }   = require('./utils');

// QRCVDTAQ Parameters
const QRCVDTAQParameters = {
  DataQueueName: { io: 'in',  type: '10A' },
  LibraryName:   { io: 'in',  type: '10A' },
  LengthOfData:  { io: 'out', type: '5p0' },
  Data:          { io: 'out' },
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
  async create(maxLength, callback) {
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

      callback(null, xmlOutput);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Data Queue (DLTDTAQ) CL Command
  //////////////////////////////////////////////////////////////////////////////
  async delete(callback) {
    const commandConfig = {
      type: 'cl',
      command: `DLTDTAQ DTAQ(${this.library ? `${this.library}/`: ''}${this.name})`
    }

    this.connection.add(new CommandCall(commandConfig));
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error);
      }

      callback(null, xmlOutput);
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
        const description = await this._getDataQueueDescription((error, result) => {
          if (error) console.error(error);
          console.log(description);
          this.maxLength = 100;
        });
      }

      length = this.maxLength;
    }

    console.log(`Length in receive is ${length}`);

    const program = new ProgramCall('QRCVDTAQ', { lib: 'QSYS' });

    program.addParam (
      { value: this.name, ...QRCVDTAQParameters.DataQueueName }
    );
    program.addParam (
      { value: this.library, ...QRCVDTAQParameters.LibraryName }
    );
    program.addParam (
      { value: length, ...QRCVDTAQParameters.LengthOfData }
    );
    program.addParam (
      { value: '', ...QRCVDTAQParameters.Data, type: `${length}A` }
    );
    program.addParam (
      { value: wait, ...QRCVDTAQParameters.WaitTime}
    );

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, xmlOutput);
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
    console.log("data length is " + data.length);
    const program = new ProgramCall('QSNDDTAQ', { lib: 'QSYS' });
    program.addParam({value: this.name, type: '10A'});        // Data queue name
    program.addParam({value: this.library, type: '10A'});     // Library name
    program.addParam({value: data.length, type: '5p0'});      // Length of data
    program.addParam({value: data, type: `${data.length}A`}); // Data

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }

      return callback(null, xmlOutput);
    });
  }

  // alias for send, as the API is "SND", but jt400 uses the term "write"
  async write(data, callback) {
    return this.send(data, callback);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Clear Data Queue (QCLRDTAQ) API
  //////////////////////////////////////////////////////////////////////////////

  async clear(callback) {
    const program = new ProgramCall('QCLRDTAQ', { lib: 'QSYS' });
    program.addParam({ value: this.name, type: '10A'} ); // Data queue name
    program.addParam({ value: this.library, type:  '10A'}); // Library name

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }

      return callback(null, xmlOutput);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // "Private" Functions
  //////////////////////////////////////////////////////////////////////////////

  
  async _getDataQueueDescription(callback) {
    const program = new ProgramCall('QMHQRDQD', { lib: 'QSYS' });

    const receiverVariable = [
      { value: 0, type: '10i0' },
      { value: 0, type: '10i0' },
      { value: 0, type: '10i0' },
    ];

    program.addParam ( // Receiver variable
      { value: receiverVariable, fields: receiverVariable, type: 'ds', io: 'out', len: 'varLen' }
    );
    program.addParam ( // Length of receiver variable
      { value: 0, type: '10i0', setlen: 'varLen' }
    );
    program.addParam ( // Format name
      { value: 'RDQD0100', type: '8A' }
    );
    program.addParam ( // Qualified data queue name
      { value: this.qualifiedName, type: '20A' }
    );

    this.connection.add(program)
    this.connection.run((error, xmlOutput) => {
      if (error) {
        return callback(error, null);
      }

      return callback(null, xmlOutput);
    });
  }
}

module.exports.DataQueue = DataQueue;
