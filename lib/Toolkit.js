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

  retrUsrAuth(usr, type, obj, lib = '*LIBL', cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Object authority / Data authority
        { type: '1A', value: '' }, // Authorization list management
        { type: '1A', value: '' }, // Object operational
        { type: '1A', value: '' }, // Object management
        { type: '1A', value: '' }, // Object existence
        { type: '1A', value: '' }, // Data read
        { type: '1A', value: '' }, // Data add
        { type: '1A', value: '' }, // Data update
        { type: '1A', value: '' }, // Data delete
        { type: '10A', value: '' }, // Authorization list
        { type: '2A', value: '' }, // Authority source
        { type: '1A', value: '' }, // Some adopted authority
        { type: '10A', value: '' }, // Adopted object authority
        { type: '1A', value: '' }, // Adopted authorization list management
        { type: '1A', value: '' }, // Adopted object operational
        { type: '1A', value: '' }, // Adopted object management
        { type: '1A', value: '' }, // Adopted object existence
        { type: '1A', value: '' }, // Adopted data read
        { type: '1A', value: '' }, // Adopted data add
        { type: '1A', value: '' }, // Adopted data update
        { type: '1A', value: '' }, // Adopted data delete
        { type: '1A', value: '' }, // Adopted data execute
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Adopted object alter
        { type: '1A', value: '' }, // Adopted object reference
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Data execute
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Object alter
        { type: '1A', value: '' }, // Object reference
        { type: '10A', value: '' }, // ASP device name of library
        { type: '10A', value: '' }, // ASP device name of object
        { type: '3A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Offset to group information table
        { type: '10i0', value: 0 }, // Number of group table entries returned
        { type: '48b', value: 0 }, // Group information table repeated for each of the user's groups
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: obj },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QSYRUSRA', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'USRA0100' });
    pgm.addParam({ type: '10A', value: usr });
    pgm.addParam(qualifiedName);
    pgm.addParam({ type: '10A', value: type });
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
            'Object_authority_/_Data_authority': data[2]._,
            Authorization_list_management: data[3]._,
            Object_operational: data[4]._,
            Object_management: data[5]._,
            Object_existence: data[6]._,
            Data_read: data[7]._,
            Data_add: data[8]._,
            Data_update: data[9]._,
            Data_delete: data[10]._,
            Authorization_list: data[11]._,
            Authority_source: data[12]._,
            Some_adopted_authority: data[13]._,
            Adopted_object_authority: data[14]._,
            Adopted_authorization_list_management: data[15]._,
            Adopted_object_operational: data[16]._,
            Adopted_object_management: data[17]._,
            Adopted_object_existence: data[18]._,
            Adopted_data_read: data[19]._,
            Adopted_data_add: data[20]._,
            Adopted_data_update: data[21]._,
            Adopted_data_delete: data[22]._,
            Adopted_data_execute: data[23]._,
            Reserved: data[24]._,
            Adopted_object_alter: data[25]._,
            Adopted_object_reference: data[26]._,
            // Reserved: data[27]._, // TODO: duplicate key
            Data_execute: data[28]._,
            // Reserved: data[29]._, // TODO: duplicate key
            Object_alter: data[30]._,
            Object_reference: data[31]._,
            ASP_device_name_of_library: data[32]._,
            ASP_device_name_of_object: data[33]._,
            // Reserved: data[34]._, // TODO: duplicate key
            Offset_to_group_information_table: data[35]._,
            Number_of_group_table_entries_returned: data[36]._,
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

  retrCmdInfo(cmd, lib = '*LIBL', cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Command name
        { type: '10A', value: '' }, // Command library name
        { type: '10A', value: '' }, // Command processing program or proxy target command
        { type: '10A', value: '' }, // Command processing program's or proxy target command's library name
        { type: '10A', value: '' }, // Source file name
        { type: '10A', value: '' }, // Source file library name
        { type: '10A', value: '' }, // Source file member name
        { type: '10A', value: '' }, // Validity check program name
        { type: '10A', value: '' }, // ]Validity check program library name
        { type: '10A', value: '' }, // ]Mode information
        { type: '15A', value: '' }, // ]Where allowed to run
        { type: '1A', value: '' }, // Allow limited user
        { type: '10i0', value: 0 }, // Maximum positional parameters
        { type: '10A', value: '' }, // Prompt message file name
        { type: '10A', value: '' }, // Prompt message file library name
        { type: '10A', value: '' }, // Message file name
        { type: '10A', value: '' }, // Message file library name
        { type: '10A', value: '' }, // Help panel group name
        { type: '10A', value: '' }, // Help panel group library name
        { type: '10A', value: '' }, // Help identifier
        { type: '10A', value: '' }, // Search index name
        { type: '10A', value: '' }, // Search index library name
        { type: '10A', value: '' }, // Current library
        { type: '10A', value: '' }, // Product library
        { type: '10A', value: '' }, // Prompt override program name
        { type: '10A', value: '' }, // Prompt override program library name
        { type: '6A', value: '' }, // Restricted to target release
        { type: '50A', value: '' }, // Text description
        { type: '2A', value: '' }, // Command processing program call state
        { type: '2A', value: '' }, // Validity check program call state
        { type: '2A', value: '' }, // Prompt override program call state
        { type: '10i0', value: 0 }, // Offset to help bookshelf information
        { type: '10i0', value: 0 }, // Length of help bookshelf information
        { type: '10i0', value: 0 }, // Coded character set ID (CCSID)
        { type: '1A', value: '' }, // Enabled for GUI indicator
        { type: '1A', value: '' }, // Threadsafe indicator
        { type: '1A', value: '' }, // Multithreaded job action
        { type: '1A', value: '' }, // Proxy command indicator
        { type: '1A', value: '' }, // Prompt message file text indicator
        { type: '13A', value: '' }, // Reserved
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: cmd },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QCDRCMDI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'CMDI0100' });
    pgm.addParam(qualifiedName);
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
            Command_name: data[2]._,
            Command_library_name: data[3]._,
            Command_processing_program_or_proxy_target_command: data[4]._,
            "Command_processing_program's_or_proxy_target_command's_library_name": data[5]._,
            Source_file_name: data[6]._,
            Source_file_library_name: data[7]._,
            Source_file_member_name: data[8]._,
            Validity_check_program_name: data[9]._,
            Validity_check_program_library_name: data[10]._,
            Mode_information: data[11]._,
            Where_allowed_to_run: data[12]._,
            Allow_limited_user: data[13]._,
            Maximum_positional_parameters: data[14]._,
            Prompt_message_file_name: data[15]._,
            Prompt_message_file_library_name: data[16]._,
            Message_file_name: data[17]._,
            Message_file_library_name: data[18]._,
            Help_panel_group_name: data[19]._,
            Help_panel_group_library_name: data[20]._,
            Help_identifier: data[21]._,
            Search_index_name: data[22]._,
            Search_index_library_name: data[23]._,
            Current_library: data[24]._,
            Product_library: data[25]._,
            Prompt_override_program_name: data[26]._,
            Prompt_override_program_library_name: data[27]._,
            Restricted_to_target_release: data[28]._,
            Text_description: data[29]._,
            Command_processing_program_call_state: data[30]._,
            Validity_check_program_call_state: data[31]._,
            Prompt_override_program_call_state: data[32]._,
            Offset_to_help_bookshelf_information: data[33]._,
            Length_of_help_bookshelf_information: data[34]._,
            'Coded_character_set_ID_(CCSID)': data[35]._,
            Enabled_for_GUI_indicator: data[36]._,
            Threadsafe_indicator: data[37]._,
            Multithreaded_job_action: data[38]._,
            Proxy_command_indicator: data[39]._,
            Prompt_message_file_text_indicator: data[40]._,
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

  retrPgmInfo(_pgm, lib = '*LIBL', cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Program name
        { type: '10A', value: '' }, // Program library name
        { type: '10A', value: '' }, // Program owner
        { type: '10A', value: '' }, // Program attribute
        { type: '13A', value: '' }, // Creation date and time
        { type: '10A', value: '' }, // Source file name
        { type: '10A', value: '' }, // Source file library name
        { type: '10A', value: '' }, // Source file member name
        { type: '13A', value: '' }, // [10]Source file updated date and time
        { type: '1A', value: '' }, // Observable information
        { type: '1A', value: '' }, // User profile option
        { type: '1A', value: '' }, // Use adopted authority
        { type: '1A', value: '' }, // Log commands
        { type: '1A', value: '' }, // Allow RTVCLSRC
        { type: '1A', value: '' }, // Fix decimal data
        { type: '50A', value: '' }, // Text description
        { type: '1A', value: '' }, // Type of program
        { type: '1A', value: '' }, // Teraspace storage-enabled program
        { type: '58A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Minimum number of parameters
        { type: '10i0', value: 0 }, // Maximum number of parameters
        { type: '10i0', value: 0 }, // Program size
        { type: '10i0', value: 0 }, // Associated space size
        { type: '10i0', value: 0 }, // Static storage size
        { type: '10i0', value: 0 }, // Automatic storage size
        { type: '10i0', value: 0 }, // Number of MI instructions
        { type: '10i0', value: 0 }, // Number of MI ODT entries
        { type: '1A', value: '' }, // Program state
        { type: '14A', value: '' }, // Compiler identification
        { type: '6A', value: '' }, // Earliest release program can run
        { type: '10A', value: '' }, // Sort sequence table name
        { type: '10A', value: '' }, // Sort sequence table library name
        { type: '10A', value: '' }, // Language identifier
        { type: '1A', value: '' }, // Program domain
        { type: '1A', value: '' }, // Conversion required
        { type: '1A', value: '' }, // Conversion details
        { type: '19A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Optimization
        { type: '1A', value: '' }, // Paging pool
        { type: '1A', value: '' }, // Update program automatic storage area (PASA)
        { type: '1A', value: '' }, // Clear program automatic storage area (PASA)
        { type: '1A', value: '' }, // Paging amount
        { type: '18A', value: '' }, // Reserved
        { type: '10A', value: '' }, // Program entry procedure module
        { type: '10A', value: '' }, // Program entry procedure module library
        { type: '30A', value: '' }, // Activation group attribute
        { type: '1A', value: '' }, // Observable information compressed
        { type: '1A', value: '' }, // Run-time information compressed
        { type: '6A', value: '' }, // Release program created on
        { type: '1A', value: '' }, // Shared activation group
        { type: '1A', value: '' }, // Allow update
        { type: '10i0', value: 0 }, // Program CCSID
        { type: '10i0', value: 0 }, // Number of modules
        { type: '10i0', value: 0 }, // Number of service programs
        { type: '10i0', value: 0 }, // Number of copyrights
        { type: '10i0', value: 0 }, // Number of unresolved references
        { type: '6A', value: '' }, // Release program created for
        { type: '1A', value: '' }, // Allow static storage reinitialization
        { type: '1A', value: '' }, // All creation data
        { type: '1A', value: '' }, // Allow bound *SRVPGM library name update
        { type: '10A', value: '' }, // Profiling data
        { type: '1A', value: '' }, // Teraspace storage enabled modules
        { type: '1A', value: '' }, // Storage model
        { type: '10A', value: '' }, // Uses argument optimization (ARGOPT)
        { type: '77A', value: '' }, // Reserved
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: _pgm },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QCLRPGMI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'PGMI0100' });
    pgm.addParam(qualifiedName);
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
            Program_name: data[2]._,
            Program_library_name: data[3]._,
            Program_owner: data[4]._,
            Program_attribute: data[5]._,
            Creation_date_and_time: data[6]._,
            Source_file_name: data[7]._,
            Source_file_library_name: data[8]._,
            Source_file_member_name: data[9]._,
            Source_file_updated_date_and_time: data[10]._,
            Observable_information: data[11]._,
            User_profile_option: data[12]._,
            Use_adopted_authority: data[13]._,
            Log_commands: data[14]._,
            Allow_RTVCLSRC: data[15]._,
            Fix_decimal_data: data[16]._,
            Text_description: data[17]._,
            Type_of_program: data[18]._,
            'Teraspace_storage-enabled_program': data[19]._,
            Reserved: data[20]._,
            Minimum_number_of_parameters: data[21]._,
            Maximum_number_of_parameters: data[22]._,
            Program_size: data[23]._,
            Associated_space_size: data[24]._,
            Static_storage_size: data[25]._,
            Automatic_storage_size: data[26]._,
            Number_of_MI_instructions: data[27]._,
            Number_of_MI_ODT_entries: data[28]._,
            Program_state: data[29]._,
            Compiler_identification: data[30]._,
            Earliest_release_program_can_run: data[31]._,
            Sort_sequence_table_name: data[32]._,
            Sort_sequence_table_library_name: data[33]._,
            Language_identifier: data[34]._,
            Program_domain: data[35]._,
            Conversion_required: data[36]._,
            Conversion_details: data[37]._,
            // Reserved: data[38]._, // TODO: duplicate
            Optimization: data[39]._,
            Paging_pool: data[40]._,
            'Update_program_automatic_storage_area_(PASA)': data[41]._,
            'Clear_program_automatic_storage_area_(PASA)': data[42]._,
            Paging_amount: data[43]._,
            // Reserved: data[38]._, // TODO: duplicate
            Program_entry_procedure_module: data[45]._,
            Program_entry_procedure_module_library: data[46]._,
            Activation_group_attribute: data[47]._,
            Observable_information_compressed: data[48]._,
            'Run-time_information_compressed': data[49]._,
            Release_program_created_on: data[50]._,
            Shared_activation_group: data[51]._,
            Allow_update: data[52]._,
            Program_CCSID: data[53]._,
            Number_of_modules: data[54]._,
            Number_of_service_programs: data[55]._,
            Number_of_copyrights: data[56]._,
            Number_of_unresolved_references: data[57]._,
            Release_program_created_for: data[58]._,
            Allow_static_storage_reinitialization: data[59]._,
            All_creation_data: data[60]._,
            'Allow_bound_*SRVPGM_library_name_update': data[61]._,
            Profiling_data: data[62]._,
            Teraspace_storage_enabled_modules: data[63]._,
            Storage_model: data[64]._,
            'Uses_argument_optimization_(ARGOPT)': data[65]._,
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

  retrSrvPgmInfo(srvpgm, lib = '*LIB', cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // Service program name
        { type: '10A', value: '' }, // Service program library name
        { type: '10A', value: '' }, // Service program owner
        { type: '10A', value: '' }, // Service program attribute
        { type: '13A', value: '' }, // Creation date and time
        { type: '10A', value: '' }, // Export source file name
        { type: '10A', value: '' }, // Export source file library name
        { type: '10A', value: '' }, // Export source file member name
        { type: '30A', value: '' }, // ]Activation group attribute
        { type: '16A', value: '' }, // ]Current export signature
        { type: '1A', value: '' }, // User profile
        { type: '1A', value: '' }, // Observable information compressed
        { type: '1A', value: '' }, // Run-time information compressed
        { type: '10i0', value: 0 }, // Service program CCSID
        { type: '10i0', value: 0 }, // Number of modules
        { type: '10i0', value: 0 }, // Number of service programs
        { type: '10i0', value: 0 }, // Number of copyrights
        { type: '50A', value: '' }, // Text description
        { type: '1A', value: '' }, // Shared activation group
        { type: '1A', value: '' }, // Allow update
        { type: '10i0', value: 0 }, // [22]Number of unresolved references
        { type: '1A', value: '' }, // Use adopted authority
        { type: '1A', value: '' }, // Allow bound *SRVPGM library name update
        { type: '10A', value: '' }, // Profiling data
        { type: '1A', value: '' }, // Teraspace storage enabled modules
        { type: '1A', value: '' }, // Storage model
        { type: '10A', value: '' }, // Uses argument optimization (ARGOPT)
        { type: '70A', value: '' }, // Reserved '00'X
        { type: '1A', value: '' }, // Service program state
        { type: '1A', value: '' }, // Service program domain
        { type: '10i0', value: 0 }, // Associated space size
        { type: '10i0', value: 0 }, // Static storage size
        { type: '10i0', value: 0 }, // Service program size
        { type: '6A', value: '' }, // Release service program created on
        { type: '6A', value: '' }, // Earliest release service program can run
        { type: '6A', value: '' }, // Release service program created for
        { type: '1A', value: '' }, // Allow static storage reinitialization
        { type: '1A', value: '' }, // Conversion required
        { type: '1A', value: '' }, // All creation data
        { type: '1A', value: '' }, // Conversion details
        { type: '90A', value: '' }, // Reserved
        { type: '1A', value: '' }, // Paging pool
        { type: '1A', value: '' }, // Paging amount
      ],
    };
    const qualifiedName = {
      type: 'ds',
      fields: [
        { type: '10A', value: srvpgm },
        { type: '10A', value: lib },
      ],
    };
    const pgm = new ProgramCall('QBNRSPGM', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'SPGI0100' });
    pgm.addParam(qualifiedName);
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
            Service_program_name: data[2]._,
            Service_program_library_name: data[3]._,
            Service_program_owner: data[4]._,
            Service_program_attribute: data[5]._,
            Creation_date_and_time: data[6]._,
            Export_source_file_name: data[7]._,
            Export_source_file_library_name: data[8]._,
            Export_source_file_member_name: data[9]._,
            Activation_group_attribute: data[10]._,
            Current_export_signature: data[11]._,
            User_profile: data[12]._,
            Observable_information_compressed: data[13]._,
            'Run-time_information_compressed': data[14]._,
            Service_program_CCSID: data[15]._,
            Number_of_modules: data[16]._,
            Number_of_service_programs: data[17]._,
            Number_of_copyrights: data[18]._,
            Text_description: data[19]._,
            Shared_activation_group: data[20]._,
            Allow_update: data[21]._,
            Number_of_unresolved_references: data[22]._,
            Use_adopted_authority: data[23]._,
            'Allow_bound_*SRVPGM_library_name_update': data[24]._,
            Profiling_data: data[25]._,
            Teraspace_storage_enabled_modules: data[26]._,
            Storage_model: data[27]._,
            'Uses_argument_optimization_(ARGOPT)': data[28]._,
            "Reserved_'00'X": data[29]._,
            Service_program_state: data[30]._,
            Service_program_domain: data[31]._,
            Associated_space_size: data[32]._,
            Static_storage_size: data[33]._,
            Service_program_size: data[34]._,
            Release_service_program_created_on: data[35]._,
            Earliest_release_service_program_can_run: data[36]._,
            Release_service_program_created_for: data[37]._,
            Allow_static_storage_reinitialization: data[38]._,
            Conversion_required: data[39]._,
            All_creation_data: data[40]._,
            Conversion_details: data[41]._,
            Reserved: data[42]._,
            Paging_pool: data[43]._,
            Paging_amount: data[44]._,
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

  retrUserInfo(user, cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned
        { type: '10i0', value: 0 }, // Bytes available
        { type: '10A', value: '' }, // User profile name
        { type: '13A', value: '' }, // Previous sign-on date and time
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Sign-on attempts not valid
        { type: '10A', value: '' }, // Status
        { type: '8A', value: '' }, // Password change date
        { type: '1A', value: '' }, // No password indicator
        { type: '1A', value: '' }, // Reserved
        { type: '10i0', value: 0 }, // Password expiration interval
        { type: '8A', value: '' }, // Date password expires
        { type: '10i0', value: 0 }, // Days until password expires
        { type: '1A', value: '' }, // Set password to expire
        { type: '10A', value: '' }, // Display sign-on information
        { type: '1A', value: '' }, // Local password management
        { type: '10A', value: '' }, // Block password change
      ],
    };
    const pgm = new ProgramCall('QSYRUSRI', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam({ type: '8A', value: 'USRI0100' });
    pgm.addParam({ type: '10A', value: user });
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
            User_profile_name: data[2]._,
            'Previous_sign-on_date_and_time': data[3]._,
            // Reserved: data[4]._, // TODO: This is a duplicate
            'Sign-on_attempts_not_valid': data[5]._,
            Status: data[6]._,
            Password_change_date: data[7]._,
            No_password_indicator: data[8]._,
            Reserved: data[9]._,
            Password_expiration_interval: data[10]._,
            Date_password_expires: data[11]._,
            Days_until_password_expires: data[12]._,
            Set_password_to_expire: data[13]._,
            'Display_sign-on_information': data[14]._,
            Local_password_management: data[15]._,
            Block_password_change: data[16]._,
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


  retrUserAuthToObj(path, cb) {
    const outBuf = {
      type: 'ds',
      io: 'out',
      len: 'rec1',
      fields: [
        { type: '10A', value: '' }, // Profile name
        { type: '1A', value: '' }, // User or group indicator
        { type: '10A', value: '' }, // Data authority
        { type: '1A', value: '' }, // Authorization list management
        { type: '1A', value: '' }, // Object management
        { type: '1A', value: '' }, // Object existence
        { type: '1A', value: '' }, // Object alter
        { type: '1A', value: '' }, // Object reference
        { type: '10A', value: '' }, // Reserved
        { type: '1A', value: '' }, // bject operational
        { type: '1A', value: '' }, // Data read
        { type: '1A', value: '' }, // Data add
        { type: '1A', value: '' }, // Data update
        { type: '1A', value: '' }, // Data delete
        { type: '1A', value: '' }, // Data execute
        { type: '10A', value: '' }, // Reserved
      ],
    };
    const feedBack = {
      type: 'ds',
      io: 'out',
      len: 'rec3',
      fields: [
        { type: '10i0', value: 0 }, // Bytes returned in the returned records feedback information
        { type: '10i0', value: 0 }, // Bytes available in the returned records feedback information
        { type: '10i0', value: 0 }, // Bytes returned in the receiver variable
        { type: '10i0', value: 0 }, // Bytes available in the receiver variable
        { type: '10i0', value: 0 }, // Number of authorized users
        { type: '10i0', value: 0 }, // Entry length for each authorized user returned
        { type: '10A', value: '' }, // Owner
        { type: '10A', value: '' }, // Primary group
        { type: '10A', value: '' }, // Authorization list
        { type: '1A', value: '' }, // Sensitivity level
      ],
    };

    const pgm = new ProgramCall('QSYRTVUA', { lib: 'QSYS' });
    pgm.addParam(outBuf);
    pgm.addParam({ type: '10i0', setlen: 'rec1', value: 0 });
    pgm.addParam(feedBack);
    pgm.addParam({ type: '10i0', setlen: 'rec3', value: 0 });
    pgm.addParam({ type: '8A', value: 'RTUA0100' });
    pgm.addParam({ type: `${path.length}A`, value: path });
    pgm.addParam({ type: '10i0', value: path.length });
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
            Profile_name: data[0]._,
            User_or_group_indicator: data[1]._,
            Data_authority: data[2]._,
            Authorization_list_management: data[3]._,
            Object_management: data[4]._,
            Object_existence: data[5]._,
            Object_alter: data[6]._,
            Object_reference: data[7]._,
            Reserved: data[8]._,
            Object_operational: data[9]._,
            Data_read: data[10]._,
            Data_add: data[11]._,
            Data_update: data[12]._,
            Data_delete: data[13]._,
            Data_execute: data[14]._,
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

  addToLibraryList(Lib, cb) {
    const pgm = new ProgramCall('QLICHGLL', { lib: 'QSYS' });
    pgm.addParam({ type: '11A', value: '*SAME' });
    pgm.addParam({ type: '11A', value: '*SAME' });
    pgm.addParam({ type: '11A', value: '*SAME' });
    pgm.addParam({ type: '11A', value: Lib });
    pgm.addParam({ type: '10i0', value: 1 });
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
