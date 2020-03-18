// Copyright (c) International Business Machines Corp. 2019

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software
// and associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR INCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const { parseString } = require('xml2js');
const { ProgramCall } = require('./ProgramCall');
const { Connection } = require('./Connection');

const sysvalArray = [
  { type: '100A', key: ['QSSLPCL'] },
  { type: '152A', key: ['QALWOBJRST', 'QSYSLIBL'] },
  { type: '160A', key: ['QAUDLVL', 'QSETJOBATR'] },
  { type: '200A', key: ['QSCANFS', 'QSCANFSCTL'] },
  { type: '252A', key: ['QUSRLIBL'] },
  { type: '1280A', key: ['QSSLCSL'] },
  { type: '52A', key: ['QAUDCTL'] },
  { type: '316A', key: ['QBOOKPATH'] },
  { type: '500A', key: ['QALWUSRDMN'] },
  { type: '752A', key: ['QPWDRULES'] },
  { type: '80A', key: ['QACGLVL'] },
  { type: '992A', key: ['QAUDLVL2'] },
  { type: '10i0', key: ['QACTJOB', 'QADLACTJ', 'QADLSPLA', 'QADLTOTJ', 'QAUDFRCLVL', 'QAUTOVRT', 'QBASACTLVL', 'QBASPOOL', 'QCCSID', 'QENDJOBLMT', 'QHSTLOGSIZ', 'QIGCFNTSIZ', 'QJOBMSGQMX', 'QJOBMSGQSZ', 'QJOBMSGQTL', 'QJOBSPLA', 'QLEAPADJ', 'QMAXACTLVL', 'QMAXJOB', 'QMAXSPLF', 'QMCHPOOL', 'QPRBHLDITV', 'QPWDEXPWRN', 'QPWDLVL', 'QPWDMAXLEN', 'QPWDMINLEN', 'QPWRDWNLMT', 'QSTGLOWLMT', 'QSVRAUTITV', 'QTOTJOB'] },
  { type: '4A', key: ['QABNORMSW', 'QALWJOBITP', 'QAUTOCFG', 'QAUTORMT', 'QAUTOSPRPT', 'QCENTURY', 'QCURSYM', 'QDATSEP', 'QDBRCVYWT', 'QDECFMT', 'QDSPSGNINF', 'QDYNPTYADJ', 'QDYNPTYSCD', 'QFRCCVNRST', 'QIGC', 'QIPLSTS', 'QIPLTYPE', 'QLIBLCKLVL', 'QLMTDEVSSN', 'QLMTSECOFR', 'QMAXSGNACN', 'QMLTTHDACN', 'QPFRADJ', 'QPRCMLTTSK', 'QPWDLMTAJC', 'QPWDLMTREP', 'QPWDPOSDIF', 'QPWDRQDDGT', 'QPWDRQDDIF', 'QPWRRSTIPL', 'QRETSVRSEC', 'QRMTIPL', 'QRMTSRVATR', 'QSAVACCPTH', 'QSCPFCONS', 'QSHRMEMCTL', 'QSTRPRTWTR', 'QTHDRSCADJ', 'QTIMSEP', 'QVFYOBJRST'] },
  { type: '12A', key: ['QASTLVL', 'QAUDENDACN', 'QCHRIDCTL', 'QCMNARB', 'QCONSOLE', 'QCRTAUT', 'QCRTOBJAUD', 'QDBFSTCCOL', 'QDEVNAMING', 'QDSCJOBITV', 'QINACTITV', 'QJOBMSGQFL', 'QKBDBUF', 'QLOGOUTPUT', 'QPASTHRSVR', 'QPRTDEV', 'QPRTKEYFMT', 'QPWDCHGBLK', 'QPWDLMTCHR', 'QQRYDEGREE', 'QQRYTIMLMT', 'QRCLSPLSTG', 'QSFWERRLOG', 'QSPCENV', 'QSPLFACN', 'QSRVDMP', 'QSSLCSLCTL', 'QSTGLOWACN', 'QSTSMSG', 'QTIMZON', 'QTSEPOOL', 'QUSEADPAUT'] },
  { type: '16A', key: ['QIPLDATTIM'] },
  { type: '4A', key: ['QCNTRYID', 'QHOUR', 'QMINUTE', 'QMONTH', 'QSECOND', 'QSECURITY', 'QYEAR'] },
  { type: '20A', key: ['QATNPGM', 'QCFGMSGQ', 'QCHRID', 'QCMNRCYLMT', 'QCTLSBSD', 'QDATETIME', 'QDEVRCYACN', 'QIGCCDEFNT', 'QINACTMSGQ', 'QPRBFTR', 'QPWDVLDPGM', 'QRMTSIGN', 'QSRTSEQ', 'QSTRUPPGM', 'QTHDRSCAFN', 'QUPSDLYTIM', 'QUPSMSGQ'] },
  { type: '2076A', key: ['QLOCALE'] },
  { type: '4A', key: ['QDATFMT', 'QDAY', 'QKBDTYPE', 'QLANGID'] },
  { type: '32A', key: ['QPRTTXT', 'QTIMADJ'] },
  { type: '4A', key: ['QDAYOFWEEK', 'QMODEL', 'QPRCFEAT'] },
  { type: '8A', key: ['QUTCOFFSET'] },
  { type: '8A', key: ['QMAXSIGN', 'QPWDEXPITV'] },
  { type: '8A', key: ['QDATE'] },
  { type: '8A', key: ['QSRLNBR'] },
  { type: '12A', key: ['QTIME'] },
];

const IPToNum = (ip) => {
  const ipArray = ip.split('.');
  let num = 0;

  /* eslint-disable no-bitwise */
  num += parseInt(ipArray[0], 10) << 24;
  num += parseInt(ipArray[1], 10) << 16;
  num += parseInt(ipArray[2], 10) << 8;
  num += parseInt(ipArray[3], 10);
  num >>>= 0; // zero-fill right-shift, returns non-negative
  /* eslint-enable no-bitwise */

  return num;
};

class Toolkit {
  constructor(conn = {}) {
    if (!conn || !typeof conn === 'object') {
      throw new Error('Expected a Connection object');
    }

    if (conn.constructor.name === 'Connection') {
      this.conn = conn;
      this.reportError = conn.returnError;
    } else if (conn.constructor.name === 'iConn') {
      this.conn = conn.connection;
      this.reportError = this.conn.returnError;
    } else {
      throw new Error('Expected a Connection object');
    }

    if (!this.reportError) {
      this.conn = new Connection({
        transport: this.conn.transport,
        transportOptions: this.conn.transportOptions,
      });
    }
    this.errno = {
      type: 'ds',
      io: 'both',
      len: 'rec2',
      fields: [
        {
          name: 'bytes_provided',
          type: '10i0',
          value: 0,
          setlen: 'rec2',
        },
        { name: 'bytes_available', type: '10i0', value: 0 },
        { name: 'msgid', type: '7A', value: '' },
        { type: '1A', value: '' },
      ],
    };
  }

  sendToDataQueue(name, lib, data, cb) {
    const pgm = new ProgramCall('QSNDDTAQ', { lib: 'QSYS' });
    pgm.addParam({ type: '10A', value: name });
    pgm.addParam({ type: '10A', value: lib === '' ? '*CURLIB' : lib });
    pgm.addParam({ type: '5p0', value: data.length });
    pgm.addParam({ type: `${data.length}A`, value: data });

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes(`+++ success`)) {
          rtValue = true;
        } else {
          rtValue = str;
        }
        if (this.reportError) {
          cb(null, rtValue); // Run the call back function against the returned value.
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  receiveFromDataQueue(name, lib, length, cb) {
    const pgm = new ProgramCall('QRCVDTAQ', { lib: 'QSYS' });
    pgm.addParam({ type: '10A', value: name });
    pgm.addParam({ type: '10A', value: lib === '' ? '*CURLIB' : lib });
    pgm.addParam({ type: '5p0', value: length });
    pgm.addParam({ type: `${length + 1}A`, value: '' });
    pgm.addParam({ type: '5p0', value: 0 });

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          rtValue = result.myscript.pgm[0].parm[3].data[0]._;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson); // Post the input XML and get the response.
  }

  clearDataQueue(name, lib, cb) {
    const pgm = new ProgramCall('QCLRDTAQ', { lib: 'QSYS' });
    pgm.addParam({ type: '10A', value: name });
    pgm.addParam({ type: '10A', value: lib === '' ? '*CURLIB' : lib });

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      // Convert the XML output into JSON
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          rtValue = true;
        } else {
          rtValue = str;
        }
        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getTCPIPAttr(cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // TCP/IPv4 stack status
        { type: '10i0', value: 0 }, // How long active
        { type: '8A', value: '' }, // When last started - date
        { type: '6A', value: '' }, // When last started - time
        { type: '8A', value: '' }, // When last ended - date
        { type: '6A', value: '' }, // When last ended - time
        { type: '10A', value: '' }, // Who last started - job name
        { type: '10A', value: '' }, // Who last started - job user name
        { type: '6A', value: '' }, // Who last started - job number
        { type: '16h', value: '' }, // Who last started - internal job identifier
        { type: '10A', value: '' }, // Who last ended - job name
        { type: '10A', value: '' }, // Who last ended - job user name
        { type: '6A', value: '' }, // Who last ended - job number
        { type: '16h', value: '' }, // Who last ended - internal job identifier
        { type: '10i0', value: 0 }, // Offset to additional information
        { type: '10i0', value: 0 }, // Length of additional information
        { type: '10i0', value: 0 }, // Limited mode
        { type: '10i0', value: 0 }, // Offset to list of Internet addresses
        { type: '10i0', value: 0 }, // Number of Internet addresses
        { type: '10i0', value: 0 }, // Entry length for list of Internet addresses
        { type: '10i0', value: 0 }, // DNS protocol
        { type: '10i0', value: 0 }, // Retries
        { type: '10i0', value: 0 }, // Time interval
        { type: '10i0', value: 0 }, // Search order
        { type: '10i0', value: 0 }, // Initial domain name server
        { type: '10i0', value: 0 }, // DNS listening port
        { type: '64A', value: '' }, // Host name
        { type: '255A', value: '' }, // Domain name
        { type: '1A', value: '' }, // Reserved
        { type: '256A', value: '' }, // ]Domain search list
      ],
    };

    const pgm = new ProgramCall('QTOCNETSTS', { lib: 'QSYS', func: 'QtocRtvTCPA' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'TCPA0300' });
    pgm.addParam(this.errno);
    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      // Convert the XML output into JSON
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            'TCP/IPv4_stack_status': data[2]._,
            How_long_active: data[3]._,
            'When_last_started_-_date': data[4]._,
            'When_last_started_-_time': data[5]._,
            'When_last_ended_-_date': data[6]._,
            'When_last_ended_-_time': data[7]._,
            'Who_last_started_-_job_name': data[8]._,
            'Who_last_started_-_job_user_name': data[9]._,
            'Who_last_started_-_job_number': data[10]._,
            'Who_last_started_-_internal_job_identifier': data[11]._,
            'Who_last_ended_-_job_name': data[12]._,
            'Who_last_ended_-_job_user_name': data[13]._,
            'Who_last_ended_-_job_number': data[14]._,
            'Who_last_ended_-_internal_job_identifier': data[14]._,
            Offset_to_additional_information: data[16]._,
            Length_of_additional_information: data[17]._,
            Limited_mode: data[18]._,
            Offset_to_list_of_Internet_addresses: data[19]._,
            Number_of_Internet_addresses: data[20]._,
            Entry_length_for_list_of_Internet_addresses: data[21]._,
            DNS_protocol: data[22]._,
            Retries: data[23]._,
            Time_interval: data[24]._,
            Search_order: data[25]._,
            Initial_domain_name_server: data[26]._,
            DNS_listening_port: data[27]._,
            Host_name: data[28]._,
            Domain_name: data[29]._,
            Reserved: data[30]._,
            Domain_search_list: data[31]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getNetInterfaceData(ipaddr, cb) {
    let address = ipaddr;
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '15A', value: '' }, // Internet address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Internet address binary
        { type: '15A', value: '' }, // Network address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Network address binary
        { type: '10A', value: '' }, // Line description
        { type: '2A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Interface status
        { type: '10i0', value: 0 }, // Interface type of service
        { type: '10i0', value: 0 }, // Interface MTU
        { type: '10i0', value: 0 }, // Interface line type
        { type: '15A', value: '' }, // Host address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Host address binary
        { type: '15A', value: '' }, // Interface subnet mask
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Interface subnet mask binary
        { type: '15A', value: '' }, // Directed broadcast address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Directed broadcast address binary
        { type: '8A', value: '' }, // Change date
        { type: '6A', value: '' }, // Change time
        { type: '15A', value: '' }, // Associated local interface
        { type: '3A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Associated local interface binary
        { type: '10i0', value: 0 }, // Change status
        { type: '10i0', value: 0 }, // Packet rules
        { type: '10i0', value: 0 }, // Automatic start
        { type: '10i0', value: 0 }, // TRLAN bit sequencing
        { type: '10i0', value: 0 }, // Interface type
        { type: '10i0', value: 0 }, // Proxy ARP allowed
        { type: '10i0', value: 0 }, // Proxy ARP enabled
        { type: '10i0', value: 0 }, // Configured MTU
        { type: '24A', value: '' }, // Network name
        { type: '24A', value: '' }, // Interface name
        { type: '50A', value: '' }, // Alias name
        { type: '2A', value: '' }, // Reserved
        { type: '50A', value: '' }, // Interface description
        { type: '2A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Offset to preferred interface list
        { type: '10i0', value: 0 }, // Number of entries in preferred interface list
        { type: '10i0', value: 0 }, // Length of one preferred interface list entry
        { type: '10i0', value: 0 }, // DHCP created
        { type: '10i0', value: 0 }, // DHCP dynamic DNS updates
        { type: '20i0', value: 0 }, // DHCP lease expiration
        { type: '8A', value: '' }, // DHCP lease expiration - date
        { type: '6A', value: '' }, // DHCP lease expiration - time
        { type: '20i0', value: 0 }, // DHCP lease obtained
        { type: '8A', value: '' }, // DHCP lease obtained - date
        { type: '6A', value: '' }, // DHCP lease obtained - time
        { type: '10i0', value: 0 }, // Use DHCP unique identifier
        { type: '15A', value: '' }, // DHCP server IP address
        { type: '1A', value: '' }, // Reserved
        { type: '15h', value: '' }, // Preferred interface Internet address
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Preferred interface Internet address binary
        { type: '1A', value: '' }, // Reserved
      ],
    };
    if (ipaddr === 'localhost') { address = '127.0.0.1'; }
    const request = {
      type: 'ds',
      fields: [
        { type: '10i0', value: '1' },
        { type: '10i0', value: IPToNum(address) },
      ],
    };
    const pgm = new ProgramCall('QTOCNETSTS', { lib: 'QSYS', func: 'QtocRtvNetIfcDta' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'NIFD0100' });
    pgm.addParam(request);
    pgm.addParam(this.errno);
    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];

          rtValue = {
            Internet_address: data[2]._,
            Internet_address_binary: data[4]._,
            Network_address: data[5]._,
            Network_address_binary: data[7]._,
            Line_description: data[8]._,
            Interface_status: data[10]._,
            Interface_type_of_service: data[11]._,
            Interface_MTU: data[12]._,
            Interface_line_type: data[13]._,
            Host_address: data[14]._,
            Host_address_binary: data[16]._,
            Interface_subnet_mask: data[17]._,
            Interface_subnet_mask_binary: data[19]._,
            Directed_broadcast_address: data[20]._,
            Directed_broadcast_address_binary: data[22]._,
            Change_date: data[23]._,
            Change_time: data[24]._,
            Associated_local_interface: data[25]._,
            Associated_local_interface_binary: data[27]._,
            Change_status: data[28]._,
            Packet_rules: data[29]._,
            Automatic_start: data[30]._,
            TRLAN_bit_sequencing: data[31]._,
            Interface_type: data[32]._,
            Proxy_ARP_allowed: data[33]._,
            Proxy_ARP_enabled: data[34]._,
            Configured_MTU: data[35]._,
            Network_name: data[36]._,
            Interface_name: data[37]._,
            Alias_name: data[38]._,
            Interface_description: data[40]._,
            Offset_to_preferred_interface_list: data[42]._,
            Number_of_entries_in_preferred_interface_list: data[43]._,
            Length_of_one_preferred_interface_list_entry: data[44]._,
            DHCP_created: data[45]._,
            DHCP_dynamic_DNS_updates: data[46]._,
            DHCP_lease_expiration: data[47]._,
            'DHCP_lease_expiration_-_date': data[48]._,
            'DHCP_lease_expiration_-_time': data[49]._,
            DHCP_lease_obtained: data[50]._,
            'DHCP_lease_obtained_-_date': data[51]._,
            'DHCP_lease_obtained_-_time': data[52]._,
            Use_DHCP_unique_identifier: data[53]._,
            DHCP_server_IP_address: data[54]._,
            Preferred_interface_Internet_address: data[56]._,
            // eslint-disable-next-line max-len
            Preferred_interface_Internet_address_binary: data[58]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson); // Post the input XML and get the response.
  }










  getPTFInfo(PTFID, cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Offset to additional information
        { type: '7A', value: '' }, // Product ID
        { type: '7A', value: '' }, // PTF ID
        { type: '6A', value: '' }, // Release level
        { type: '4A', value: '' }, // Product option
        { type: '4A', value: '' }, // Load ID
        { type: '1A', value: '' }, // Loaded status
        { type: '1A', value: '' }, // Cover letter status
        { type: '1A', value: '' }, // On-order status
        { type: '1A', value: '' }, // Save file status
        { type: '10A', value: '' }, // File name
        { type: '10A', value: '' }, // File library name
        { type: '1A', value: '' }, // PTF type
        { type: '1A', value: '' }, // IPL action
        { type: '1A', value: '' }, // Action pending
        { type: '1A', value: '' }, // Action required
        { type: '1A', value: '' }, // PTF is released
        { type: '6A', value: '' }, // Target release
        { type: '7A', value: '' }, // Superseding PTF
        { type: '1A', value: '' }, // Current IPL source
        { type: '2A', value: '' }, // Minimum level
        { type: '2A', value: '' }, // Maximum level
        { type: '1A', value: '' }, // Format information available
        { type: '13A', value: '' }, // Status date and time
        { type: '7A', value: '' }, // Licensed Internal Code group
        { type: '7A', value: '' }, // Superseded by PTF ID
        { type: '1A', value: '' }, // Current server IPL source
        { type: '1A', value: '' }, // Server IPL required
        { type: '13A', value: '' }, // Creation date and time
        { type: '1A', value: '' }, // Technology refresh PTF
        { type: '1A', value: '' }, // Reserved
      ],
    };

    const PTFInfo = {
      type: 'ds',
      fields: [
        { type: '7A', value: PTFID }, // PTF ID
        { type: '7A', value: '*ONLY' }, // Product ID
        { type: '6A', value: '' }, // Release level
        { type: '10i0', value: '' }, // CCSID for returned directory names
        { type: '1A', value: '0' }, // Close PTF database files
        { type: '25A', value: '' }, // Reserved
      ],
    };

    const pgm = new ProgramCall('QPZRTVFX', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam(PTFInfo);
    pgm.addParam({ type: '8A', value: 'PTFR0100' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(null);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Product_ID: data[3]._,
            PTF_ID: data[4]._,
            Release_level: data[5]._,
            Product_option: data[6]._,
            Load_ID: data[7]._,
            Loaded_status: data[8]._,
            Cover_letter_status: data[9]._,
            'On-order_status': data[10]._,
            Save_file_status: data[11]._,
            File_name: data[12]._,
            File_library_name: data[13]._,
            PTF_type: data[14]._,
            IPL_action: data[15]._,
            Action_pending: data[16]._,
            Action_required: data[17]._,
            PTF_is_released: data[18]._,
            Target_release: data[19]._,
            Superseding_PTF: data[20]._,
            Current_IPL_source: data[21]._,
            Minimum_level: data[22]._,
            Maximum_level: data[23]._,
            Format_information_available: data[24]._,
            Status_date_and_time: data[25]._,
            Licensed_Internal_Code_group: data[26]._,
            Superseded_by_PTF_ID: data[27]._,
            Current_server_IPL_source: data[28]._,
            Server_IPL_required: data[29]._,
            Creation_date_and_time: data[30]._,
            Technology_refresh_PTF: data[31]._,
            Reserved: data[32]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getProductInfo(prodID, option, cb) {
    let callback = cb;
    let prodOption;
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { value: 0, type: '10i0' }, // Bytes returned
        { value: 0, type: '10i0' }, // Bytes available
        { value: 0, type: '10i0' }, // Reserved
        { type: '7A', value: '' }, // Product ID
        { type: '6A', value: '' }, // Release level
        { type: '4A', value: '' }, // Product option
        { type: '4A', value: '' }, // Load ID
        { type: '10A', value: '' }, // Load type
        { type: '10A', value: '' }, // Symbolic load state
        { type: '10A', value: '' }, // Load error indicator
        { type: '2A', value: '' }, // Load state
        { type: '1A', value: '' }, // Supported flag
        { type: '2A', value: '' }, // Registration type
        { type: '14A', value: '' }, // Registration value
        { type: '2A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Offset to additional information
        { type: '4A', value: '' }, // Primary language load identifier
        { type: '6A', value: '' }, // Minimum target release
        { type: '6A', value: '' }, // Minimum VRM of *BASE required by option
        { type: '1A', value: '' }, // Requirements met between base and option value
        { type: '3A', value: '' }, // Level
        { type: '1A', value: '' }, // Reserved
      ],
    };
    if (!cb) { // If we do not get the third param,
      if (option) { // If we get two params,
        if (typeof option === 'function') { // If it is a function,
          callback = option; // then it is the callback.
          prodOption = '0000';
        }
      } else { // If we have only one param,
        prodOption = '0000'; // then use *BASE as default.
      }
    }

    if (Number.isInteger(option)) {
      if (option < 0 || option > 99) {
        prodOption = '0000';
      } else if (prodOption < 10) {
        prodOption = `000${option}`;
      } else {
        prodOption = `00${option}`;
      }
    }

    const ProdInfo = {
      type: 'ds',
      fields: [
        { type: '7A', value: prodID },
        { type: '6A', value: '*ONLY' },
        { type: '4A', value: prodOption },
        { type: '10A', value: '*CODE' },
      ],
    };

    const pgm = new ProgramCall('QSZRTVPR', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'PRDR0100' });
    pgm.addParam(ProdInfo);
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          callback(transportError, null);
          return;
        }
        callback(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            callback(parseError, null);
            return;
          }
          callback(null);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];

          rtValue = {
            // Reserved: data[2]._, // TODO: Duplicate key
            Product_ID: data[3]._,
            Release_level: data[4]._,
            Product_option: data[5]._,
            Load_ID: data[6]._,
            Load_type: data[7]._,
            Symbolic_load_state: data[8]._,
            Load_error_indicator: data[9]._,
            Load_state: data[10]._,
            Supported_flag: data[11]._,
            Registration_type: data[12]._,
            Registration_value: data[13]._,
            // Reserved: data[14]._, // TODO: Duplicate key
            Offset_to_additional_information: data[15]._,
            Primary_language_load_identifier: data[16]._,
            Minimum_target_release: data[17]._,
            'Minimum_VRM_of_*BASE_required_by_option': data[18]._,
            Requirements_met_between_base_and_option_value: data[19]._,
            Level: data[20]._,
            Reserved: data[21]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          callback(null, rtValue);
          return;
        }
        callback(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getInstalledProducts(cb) {
    const maxProd = 197;
    const outBuf = {
      type: 'ds',
      io: 'out',
      fields: [],
    };
    for (let i = 0; i < maxProd; i += 1) {
      outBuf.fields.push({ type: '7A', value: '' }); // Product ID
      outBuf.fields.push({ type: '5A', value: '' }); // Product option
      outBuf.fields.push({ type: '6A', value: '' }); // Release level
      outBuf.fields.push({ type: '2h', value: '' }); // Skip
      outBuf.fields.push({ type: '7A', value: '' }); // Description text message ID
      outBuf.fields.push({ type: '10A', value: '' }); // Description text object name
      outBuf.fields.push({ type: '10A', value: '' }); // Description text library name
      outBuf.fields.push({ type: '1A', value: '' }); // Installed flag
      outBuf.fields.push({ type: '1A', value: '' }); // Supported flag
      outBuf.fields.push({ type: '2A', value: '' }); // Registration type
      outBuf.fields.push({ type: '14A', value: '' }); // Registration value
      outBuf.fields.push({ type: '132A', value: '' }); // Description text
    }
    const inputInfo = {
      type: 'ds',
      fields: [
        { type: '10i0', value: maxProd },
        { type: '10A', value: '*ALL' },
        { value: '1', type: '1A' },
        { value: '1', type: '1A' },
        { type: '10A', value: '*ALL' },
        { type: '10A', value: '*INSTLD' },
        { type: '10i0', value: maxProd },
      ],
    };
    const ProdInfo = {
      type: 'ds',
      fields: [
        { type: '7A', value: '' },
        { type: '5A', value: '' },
        { type: '6A', value: '' },
      ],
    };
    const OutputInfo = {
      type: 'ds',
      io: 'out',
      fields: [
        { type: '10i0', value: 0 },
        { type: '10i0', value: 0 },
        { type: '10i0', value: 0 },
      ],
    };
    const pgm = new ProgramCall('QSZSLTPR', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam(inputInfo);
    pgm.addParam({ type: '8A', value: 'PRDS0200' });
    pgm.addParam(ProdInfo);
    pgm.addParam(OutputInfo);
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue = []; // The returned value.
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          const count = result.myscript.pgm[0].parm[4].ds[0].data[1]._;

          for (let i = 0; i < count * 12; i += 12) {
            rtValue.push({
              Product_ID: data[i]._,
              Product_option: data[i + 1]._,
              Release_level: data[i + 2]._,
              Description_text_message_ID: data[i + 4]._,
              Description_text_object_name: data[i + 5]._,
              Description_text_library_name: data[i + 6]._,
              Installed_flag: data[i + 7]._,
              Supported_flag: data[i + 8]._,
              Registration_type: data[i + 9]._,
              Registration_value: data[i + 10]._,
              Description_text: data[i + 11]._,
            });
          }
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }


  createUserSpace(name, lib, attr, size, auth, desc, cb) {
    const pgm = new ProgramCall('QUSCRTUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '11A', value: attr === '' ? 'LOG' : attr });
    pgm.addParam({ type: '10i0', value: size === '' ? 50 : size });
    pgm.addParam({ type: '1A', value: 0 });
    pgm.addParam({ type: '10A', value: auth === '' ? '*USE' : auth });
    pgm.addParam({ type: '50A', value: desc });
    pgm.addParam({ type: '10A', value: '*NO' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());
    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          rtValue = true;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  setUserSpaceData(name, lib, length, msg, cb) {
    const pgm = new ProgramCall('QUSCHGUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '10i0', value: 1 });
    pgm.addParam({ type: '10i0', value: length });
    pgm.addParam({ type: `${length}A`, value: msg });
    pgm.addParam({ type: '1A', value: 0 });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          rtValue = true;
        } else {
          rtValue = str;
        }
        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getUserSpaceData(name, lib, length, cb) {
    const pgm = new ProgramCall('QUSRTVUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '10i0', value: 1 });
    pgm.addParam({ type: '10i0', value: length });
    pgm.addParam({ type: `${length}A`, io: 'out', value: '' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[3];
          rtValue = data[0]._;
        } else {
          rtValue = str;
        }
        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  deleteUserSpace(name, lib, cb) {
    const pgm = new ProgramCall('QUSDLTUS', { lib: 'QSYS' });
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: name },
        { type: '10A', value: lib === '' ? '*CURLIB' : lib },
      ],
    };
    pgm.addParam(qualifiedName);
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          rtValue = true;
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getSysValue(sysValue, cb) {
    let keyValid = false;
    let type = '10i0';

    sysvalArray.some(value => value.key.some((key) => {
      if (sysValue === key) {
        keyValid = true;
        ({ type } = value);
        return true;
      }
      return false;
    }));

    // TODO: Throw error
    if (keyValid === false) { return; }

    let item;
    if (type === '10i0') { item = { type: '10i0', value: 0 }; } else { item = { type, value: '' }; }

    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Number of system values returned
        { type: '10i0', value: 0 }, // Offset to system value information table
        { type: '10A', value: '' }, // System value
        { type: '1A', value: '' }, // Type of data(C--character / B--binary / blank--not available.)
        { type: '1A', value: '' }, // Information status(blank--The information was available.)
        { type: '10i0', value: 0 }, // Length of data
        item,
      ],
    };

    const pgm = new ProgramCall('QWCRSVAL', { lib: 'QSYS' });
    pgm.addParam(outBuf); // Receiver buffer
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 }); // Length of the receiver buffer
    pgm.addParam({ type: '10i0', value: 1 }); // Number of system values to retrieve
    pgm.addParam({ type: '10A', value: sysValue }); // System value name
    pgm.addParam(this.errno); // Error code

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = data[6]._; // Get the returned value from the output array.
        } else {
          rtValue = str;
        }
        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson); // Post the input XML
  }

  getSysStatus(cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '20u0', value: '' }, // Current date and time
        { type: '8A', value: '' }, // System name
        { type: '10i0', value: 0 }, // Users currently signed on
        { type: '10i0', value: 0 }, // Users temporarily signed off (disconnected)
        { type: '10i0', value: 0 }, // Users suspended by system request
        { type: '10i0', value: 0 }, // Users suspended by group jobs
        { type: '10i0', value: 0 }, // Users signed off with printer output waiting to print
        { type: '10i0', value: 0 }, // Batch jobs waiting for messages
        { type: '10i0', value: 0 }, // Batch jobs running
        { type: '10i0', value: 0 }, // Batch jobs held while running
        { type: '10i0', value: 0 }, // Batch jobs ending
        { type: '10i0', value: 0 }, // Batch jobs waiting to run or already scheduled
        { type: '10i0', value: 0 }, // Batch jobs held on a job queue
        { type: '10i0', value: 0 }, // Batch jobs on a held job queue
        { type: '10i0', value: 0 }, // Batch jobs on an unassigned job queue
        { type: '10i0', value: 0 }, // Batch jobs ended with printer output waiting to print
      ],
    };
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'SSTS0100' });
    pgm.addParam({ type: '10A', value: '*NO' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Current_date_and_time: data[2]._,
            System_name: data[3]._,
            Users_currently_signed_on: data[4]._,
            'Users_temporarily_signed_off_(disconnected)': data[5]._,
            Users_suspended_by_system_request: data[6]._,
            Users_suspended_by_group_jobs: data[7]._,
            Users_signed_off_with_printer_output_waiting_to_print: data[8]._,
            Batch_jobs_waiting_for_messages: data[9]._,
            Batch_jobs_running: data[10]._,
            Batch_jobs_held_while_running: data[11]._,
            Batch_jobs_ending: data[12]._,
            Batch_jobs_waiting_to_run_or_already_scheduled: data[13]._,
            Batch_jobs_held_on_a_job_queue: data[14]._,
            Batch_jobs_on_a_held_job_queue: data[15]._,
            Batch_jobs_on_an_unassigned_job_queue: data[16]._,
            Batch_jobs_ended_with_printer_output_waiting_to_print: data[17]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson);
  }

  getSysStatusExt(cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '20u0', value: '' }, // Current date and time
        { type: '8A', value: '' }, // System name
        { type: '6A', value: '' }, // Elapsed time
        { type: '1A', value: '' }, // Restricted state flag
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // % processing unit used
        { type: '10i0', value: 0 }, // Jobs in system
        { type: '10i0', value: 0 }, // % permanent addresses
        { type: '10i0', value: 0 }, // % temporary addresses
        { type: '10i0', value: 0 }, // System ASP
        { type: '10i0', value: 0 }, // % system ASP used
        { type: '10i0', value: 0 }, // Total auxiliary storage
        { type: '10i0', value: 0 }, // Current unprotected storage used
        { type: '10i0', value: 0 }, // Maximum unprotected storage used
        { type: '10i0', value: 0 }, // % DB capability
        { type: '10i0', value: 0 }, // Main storage size
        { type: '10i0', value: 0 }, // Number of partitions
        { type: '10i0', value: 0 }, // Partition identifier
        { type: '10i0', value: 0 }, // Reserved
        { type: '10i0', value: 0 }, // Current processing capacity
        { type: '1A', value: '' }, // Processor sharing attribute
        { type: '3A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Number of processors
        { type: '10i0', value: 0 }, // Active jobs in system
        { type: '10i0', value: 0 }, // Active threads in system
        { type: '10i0', value: 0 }, // Maximum jobs in system
        { type: '10i0', value: 0 }, // % temporary 256MB segments used
        { type: '10i0', value: 0 }, // % temporary 4GB segments used
        { type: '10i0', value: 0 }, // % permanent 256MB segments used
        { type: '10i0', value: 0 }, // % permanent 4GB segments used
        { type: '10i0', value: 0 }, // % current interactive performance
        { type: '10i0', value: 0 }, // % uncapped CPU capacity used
        { type: '10i0', value: 0 }, // % shared processor pool used
        { type: '20u0', value: 0 }, // Main storage size (long)
      ],
    };
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'SSTS0200' });
    pgm.addParam({ type: '10A', value: '*NO' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }

        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Current_date_and_time: data[2]._,
            System_name: data[3]._,
            Elapsed_time: data[4]._,
            Restricted_state_flag: data[5]._,
            '%_processing_unit_used': data[7]._,
            Jobs_in_system: data[8]._,
            '%_permanent_addresses': data[9]._,
            '%_temporary_addresses': data[10]._,
            System_ASP: data[11]._,
            '%_system_ASP_used': data[12]._,
            Total_auxiliary_storage: data[13]._,
            Current_unprotected_storage_used: data[14]._,
            Maximum_unprotected_storage_used: data[15]._,
            '%_DB_capability': data[16]._,
            Main_storage_size: data[17]._,
            Number_of_partitions: data[18]._,
            Partition_identifier: data[19]._,
            Current_processing_capacity: data[21]._,
            Processor_sharing_attribute: data[22]._,
            Number_of_processors: data[24]._,
            Active_jobs_in_system: data[25]._,
            Active_threads_in_system: data[26]._,
            Maximum_jobs_in_system: data[27]._,
            '%_temporary_256MB_segments_used': data[28]._,
            '%_temporary_4GB_segments_used': data[29]._,
            '%_permanent_256MB_segments_used': data[30]._,
            '%_permanent_4GB_segments_used': data[31]._,
            '%_current_interactive_performance': data[32]._,
            '%_uncapped_CPU_capacity_used': data[33]._,
            '%_shared_processor_pool_used': data[34]._,
            'Main_storage_size_(long)': data[35]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson);
  }

  getJobStatus(jobId, cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Job status
        { type: '16h', value: '' }, // Internal job identifier
        { type: '26A', value: '' }, // Fully qualified job name
      ],
    };
    const pgm = new ProgramCall('QWCRJBST', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '6A', value: jobId });
    pgm.addParam({ type: '8A', value: 'JOBS0100' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }

        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Job_status: data[2]._,
            Fully_qualified_job_name: data[4]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };

    this.conn.run(toJson);
  }

  getJobInfo(jobName, userName, jobNumber, cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Number of bytes returned
        { type: '10i0', value: 0 }, // Number of bytes available
        { type: '10A', value: '' }, // Job name
        { type: '10A', value: '' }, // User name
        { type: '6A', value: '' }, // Job number
        { type: '16h', value: '' }, // Internal job identifier
        { type: '10A', value: '' }, // Job status
        { type: '1A', value: '' }, // Job type
        { type: '1A', value: '' }, // Job subtype
        { type: '10A', value: '' }, // Subsystem description name
        { type: '10i0', value: 0 }, // Run priority (job)
        { type: '10i0', value: 0 }, // System pool identifier
        { type: '10i0', value: 0 }, // Processing unit time used, if less than 2,147,483,647 milliseconds
        { type: '10i0', value: 0 }, // Number of auxiliary I/O requests, if less than 2,147,483,647
        { type: '10i0', value: 0 }, // Number of interactive transactions
        { type: '10i0', value: 0 }, // Response time total
        { type: '1A', value: '' }, // Function type
        { type: '10A', value: '' }, // Function name
        { type: '4A', value: '' }, // Active job status
        { type: '10i0', value: 0 }, // Number of database lock waits
        { type: '10i0', value: 0 }, // Number of internal machine lock waits
        { type: '10i0', value: 0 }, // Number of nondatabase lock waits
        { type: '10i0', value: 0 }, // Time spent on database lock waits
        { type: '10i0', value: 0 }, // Time spent on internal machine lock waits
        { type: '10i0', value: 0 }, // Time spent on nondatabase lock waits
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Current system pool identifier
        { type: '10i0', value: 0 }, // Thread count
        { type: '20u0', value: 0 }, // Processing unit time used - total for the job
        { type: '20u0', value: 0 }, // Number of auxiliary I/O requests
        { type: '20u0', value: 0 }, // Processing unit time used for database - total for the job
        { type: '20u0', value: 0 }, // Page faults
        { type: '4A', value: '' }, // Active job status for jobs ending
        { type: '10A', value: '' }, // Memory pool name
        { type: '1A', value: '' }, // Message reply
        { type: '4A', value: '' }, // Message key, when active job waiting for a message
        { type: '10A', value: '' }, // Message queue name, when active job waiting for a message
        { type: '10A', value: '' }, // Message queue library name, when active job waiting for a message
        { type: '10A', value: '' }, // Message queue library ASP device name, when active job waiting for a message
      ],
    };
    const JobId = {
      type: 'ds',
      fields: [
        { type: '10A', value: jobName },
        { type: '10A', value: userName },
        { type: '6A', value: jobNumber },
      ],
    };
    const pgm = new ProgramCall('QUSRJOBI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'JOBI0200' });
    pgm.addParam(JobId);
    pgm.addParam({ type: '16A', value: '' });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }

        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];

          rtValue = {
            Job_name: data[2]._,
            User_name: data[3]._,
            Job_number: data[4]._,
            Job_status: data[6]._,
            Job_type: data[7]._,
            Job_subtype: data[8]._,
            Subsystem_description_name: data[9]._,
            'Run_priority_(job)': data[10]._,
            System_pool_identifier: data[11]._,
            'Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds': data[12]._,
            'Number_of_auxiliary_I/O_requests,_if_less_than_2,147,483,647': data[13]._,
            Number_of_interactive_transactions: data[14]._,
            Response_time_total: data[15]._,
            Function_type: data[16]._,
            Function_name: data[17]._,
            Active_job_status: data[18]._,
            Number_of_database_lock_waits: data[19]._,
            Number_of_internal_machine_lock_waits: data[20]._,
            Number_of_nondatabase_lock_waits: data[21]._,
            Time_spent_on_database_lock_waits: data[22]._,
            Time_spent_on_internal_machine_lock_waits: data[23]._,
            Time_spent_on_nondatabase_lock_waits: data[24]._,
            Current_system_pool_identifier: data[26]._,
            Thread_count: data[27]._,
            'Processing_unit_time_used_-_total_for_the_job': data[28]._,
            'Number_of_auxiliary_I/O_requests': data[29]._,
            'Processing_unit_time_used_for_database_-_total_for_the_job': data[30]._,
            Page_faults: data[31]._,
            Active_job_status_for_jobs_ending: data[32]._,
            Memory_pool_name: data[33]._,
            Message_reply: data[34]._,
            'Message_key,_when_active_job_waiting_for_a_message': data[35]._,
            'Message_queue_name,_when_active_job_waiting_for_a_message': data[36]._,
            'Message_queue_library_name,_when_active_job_waiting_for_a_message': data[37]._,
            'Message_queue_library_ASP_device_name,_when_active_job_waiting_for_a_message': data[38]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson);
  }

  getDataArea(lib, area, length, cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      fields: [
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10A', value: '' }, // Type of value returned
        { type: '10A', value: '' }, // Library name
        { type: '10i0', value: 0 }, // Length of value returned
        { type: '10i0', value: 0 }, // Number of decimal positions
        { type: `${length}A`, value: '' }, // Value
      ],
    };
    const areaPath = {
      type: 'ds',
      fields: [
        { type: '10A', value: area },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QWCRDTAA', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', value: length + 36 });
    pgm.addParam(areaPath);
    pgm.addParam({ type: '10i0', value: 1 });
    pgm.addParam({ type: '10i0', value: length });
    pgm.addParam(this.errno);

    this.conn.add(pgm.toXML());

    let rtValue;

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      parseString(str, (parseError, result) => {
        if (parseError) {
          if (this.reportError) {
            cb(parseError, null);
            return;
          }
          cb(str);
          return;
        }
        if (result.myscript.pgm[0].success && result.myscript.pgm[0].success[0].includes('+++ success')) {
          const { data } = result.myscript.pgm[0].parm[0].ds[0];
          rtValue = {
            Type_of_value_returned: data[2]._,
            Library_name: data[3]._,
            Length_of_value_returned: data[4]._,
            Number_of_decimal_positions: data[5]._,
            Value: data[6]._,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      });
    };
    this.conn.run(toJson);
  }
}

module.exports.Toolkit = Toolkit;
