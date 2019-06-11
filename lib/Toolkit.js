// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

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

const { ProgramCall } = require('./ProgramCall');
const { xmlToJs, xmlToJson } = require('./utils');
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

const succeed = (output) => {
  return Object.prototype.hasOwnProperty.call(output[0], 'success') && output[0].success === true;
}

class Toolkit {
  constructor(conn = {}) {
    if (!conn || !typeof conn === 'object') {
      throw new Error('Expected a Connection object');
    }

    if (conn.constructor.name === 'Connection') {
      this.conn = conn;
      this.reportError = conn.returnError;
      this.xml2js = conn.xml2js;
    } else if (conn.constructor.name === 'iConn') {
      this.conn = conn.connection;
      this.reportError = this.conn.returnError;
      this.xml2js = this.conn.xml2js;
    } else {
      throw new Error('Expected a Connection object');
    }

    if (!this.reportError) {
      this.conn = new Connection({
        transport: this.conn.transport,
        transportOptions: this.conn.transportOptions,
      });
    }
    this.errno = [
      [0, '10i0'],
      [0, '10i0', { setlen: 'rec2' }],
      ['', '7A'],
      ['', '1A'],
    ];
  }

  sendToDataQueue(name, lib, data, cb) {
    const pgm = new ProgramCall('QSNDDTAQ', { lib: 'QSYS' });
    pgm.addParam(name, '10A');
    pgm.addParam(lib === '' ? '*CURLIB' : lib, '10A');
    pgm.addParam(data.length, '5p0');
    pgm.addParam(data, `${data.length}A`);

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
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
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = true;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };
    this.conn.run(toJson); // Post the input XML and get the response.
  }

  receiveFromDataQueue(name, lib, length, cb) {
    const pgm = new ProgramCall('QRCVDTAQ', { lib: 'QSYS' });
    pgm.addParam(name, '10A');
    pgm.addParam(lib === '' ? '*CURLIB' : lib, '10A');
    pgm.addParam(length, '5p0');
    pgm.addParam('', `${length + 1}A`);
    pgm.addParam(0, '5p0');

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            rtValue = output[0].data[3].param.value;
          } else {
            rtValue = str;
          }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = output[0].data[3].value;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  clearDataQueue(name, lib, cb) {
    const pgm = new ProgramCall('QCLRDTAQ', { lib: 'QSYS' });
    pgm.addParam(name, '10A');
    pgm.addParam(lib === '' ? '*CURLIB' : lib, '10A');

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
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
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = true;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getTCPIPAttr(cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      [0, '10i0'], // [2]TCP/IPv4 stack status
      [0, '10i0'], // [3]How long active
      ['', '8A'], // [4]When last started - date
      ['', '6A'], // [5]When last started - time
      ['', '8A'], // [6]When last ended - date
      ['', '6A'], // [7]When last ended - time
      ['', '10A'], // [8]Who last started - job name
      ['', '10A'], // [9]Who last started - job user name
      ['', '6A'], // [10]Who last started - job number
      ['', '16h'], // [11]Who last started - internal job identifier
      ['', '10A'], // [12]Who last ended - job name
      ['', '10A'], // [13]Who last ended - job user name
      ['', '6A'], // [14]Who last ended - job number
      ['', '16h'], // [15]Who last ended - internal job identifier
      [0, '10i0'], // [16]Offset to additional information
      [0, '10i0'], // [17]Length of additional information
      [0, '10i0'], // [18]Limited mode
      [0, '10i0'], // [19]Offset to list of Internet addresses
      [0, '10i0'], // [20]Number of Internet addresses
      [0, '10i0'], // [21]Entry length for list of Internet addresses
      [0, '10i0'], // [22]DNS protocol
      [0, '10i0'], // [23]Retries
      [0, '10i0'], // [24]Time interval
      [0, '10i0'], // [25]Search order
      [0, '10i0'], // [26]Initial domain name server
      [0, '10i0'], // [27]DNS listening port
      ['', '64A'], // [28]Host name
      ['', '255A'], // [29]Domain name
      ['', '1A'], // [30]Reserved
      ['', '256A'], // [31]Domain search list
    ];
    
    const outValue = {
      'TCP/IPv4_stack_status': 2,
      How_long_active: 3,
      'When_last_started_-_date': 4,
      'When_last_started_-_time': 5,
      'When_last_ended_-_date': 6,
      'When_last_ended_-_time': 7,
      'Who_last_started_-_job_name': 8,
      'Who_last_started_-_job_user_name': 9,
      'Who_last_started_-_job_number': 10,
      'Who_last_started_-_internal_job_identifier': 11,
      'Who_last_ended_-_job_name': 12,
      'Who_last_ended_-_job_user_name': 13,
      'Who_last_ended_-_job_number': 14,
      'Who_last_ended_-_internal_job_identifier': 15,
      Offset_to_additional_information: 16,
      Length_of_additional_information: 17,
      Limited_mode: 18,
      Offset_to_list_of_Internet_addresses: 19,
      Number_of_Internet_addresses: 20,
      Entry_length_for_list_of_Internet_addresses: 21,
      DNS_protocol: 22,
      Retries: 23,
      Time_interval: 24,
      Search_order: 25,
      Initial_domain_name_server: 26,
      DNS_listening_port: 27,
      Host_name: 28,
      Domain_name: 29,
      Reserved: 30,
      Domain_search_list: 31,
    };
    
    const pgm = new ProgramCall('QTOCNETSTS', { lib: 'QSYS', func: 'QtocRtvTCPA' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('TCPA0300', '8A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {}; // The returned value.

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            'TCP/IPv4_stack_status': output[0].data[2].value,
            How_long_active: output[0].data[3].value,
            'When_last_started_-_date': output[0].data[4].value,
            'When_last_started_-_time': output[0].data[5].value,
            'When_last_ended_-_date': output[0].data[6].value,
            'When_last_ended_-_time': output[0].data[7].value,
            'Who_last_started_-_job_name': output[0].data[8].value,
            'Who_last_started_-_job_user_name': output[0].data[9].value,
            'Who_last_started_-_job_number': output[0].data[10].value,
            'Who_last_started_-_internal_job_identifier': output[0].data[11].value,
            'Who_last_ended_-_job_name': output[0].data[12].value,
            'Who_last_ended_-_job_user_name': output[0].data[13].value,
            'Who_last_ended_-_job_number': output[0].data[14].value,
            'Who_last_ended_-_internal_job_identifier': output[0].data[15].value,
            Offset_to_additional_information: output[0].data[16].value,
            Length_of_additional_information: output[0].data[17].value,
            Limited_mode: output[0].data[18].value,
            Offset_to_list_of_Internet_addresses: output[0].data[19].value,
            Number_of_Internet_addresses: output[0].data[20].value,
            Entry_length_for_list_of_Internet_addresses: output[0].data[21].value,
            DNS_protocol: output[0].data[22].value,
            Retries: output[0].data[23].value,
            Time_interval: output[0].data[24].value,
            Search_order: output[0].data[25].value,
            Initial_domain_name_server: output[0].data[26].value,
            DNS_listening_port: output[0].data[27].value,
            Host_name: output[0].data[28].value,
            Domain_name: output[0].data[29].value,
            Reserved: output[0].data[30].value,
            Domain_search_list: output[0].data[31].value,
          };
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getNetInterfaceData(ipaddr, cb) {
    let address = ipaddr;
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '15A'], // [2]Internet address
      ['', '1A'], // [3]Reserved
      [0, '10i0'], // [4]Internet address binary
      ['', '15A'], // [5]Network address
      ['', '1A'], // [6]Reserved
      [0, '10i0'], // [7]Network address binary
      ['', '10A'], // [8]Line description
      ['', '2A'], // [9]Reserved
      [0, '10i0'], // [10]Interface status
      [0, '10i0'], // [11]Interface type of service
      [0, '10i0'], // [12]Interface MTU
      [0, '10i0'], // [13]Interface line type
      ['', '15A'], // [14]Host address
      ['', '1A'], // [15]Reserved
      [0, '10i0'], // [16]Host address binary
      ['', '15A'], // [17]Interface subnet mask
      ['', '1A'], // [18]Reserved
      [0, '10i0'], // [19]Interface subnet mask binary
      ['', '15A'], // [20]Directed broadcast address
      ['', '1A'], // [21]Reserved
      [0, '10i0'], // [22]Directed broadcast address binary
      ['', '8A'], // [23]Change date
      ['', '6A'], // [24]Change time
      ['', '15A'], // [25]Associated local interface
      ['', '3A'], // [26]Reserved
      [0, '10i0'], // [27]Associated local interface binary
      [0, '10i0'], // [28]Change status
      [0, '10i0'], // [29]Packet rules
      [0, '10i0'], // [30]Automatic start
      [0, '10i0'], // [31]TRLAN bit sequencing
      [0, '10i0'], // [32]Interface type
      [0, '10i0'], // [33]Proxy ARP allowed
      [0, '10i0'], // [34]Proxy ARP enabled
      [0, '10i0'], // [35]Configured MTU
      ['', '24A'], // [36]Network name
      ['', '24A'], // [37]Interface name
      ['', '50A'], // [38]Alias name
      ['', '2A'], // [39]Reserved
      ['', '50A'], // [40]Interface description
      ['', '2A'], // [41]Reserved
      [0, '10i0'], // [42]Offset to preferred interface list
      [0, '10i0'], // [43]Number of entries in preferred interface list
      [0, '10i0'], // [44]Length of one preferred interface list entry
      [0, '10i0'], // [45]DHCP created
      [0, '10i0'], // [46]DHCP dynamic DNS updates
      [0, '20i0'], // [47]DHCP lease expiration
      ['', '8A'], // [48]DHCP lease expiration - date
      ['', '6A'], // [49]DHCP lease expiration - time
      [0, '20i0'], // [50]DHCP lease obtained
      ['', '8A'], // [51]DHCP lease obtained - date
      ['', '6A'], // [52]DHCP lease obtained - time
      [0, '10i0'], // [53]Use DHCP unique identifier
      ['', '15A'], // [54]DHCP server IP address
      ['', '1A'], // [55]Reserved
      ['', '15h'], // [56]Preferred interface Internet address
      ['', '1A'], // [57]Reserved
      [0, '10i0'], // [58]Preferred interface Internet address binary
      ['', '1A'], // [59]Reserved
    ];
    
    const outValue = {
      Internet_address: 2,
      Internet_address_binary: 4,
      Network_address: 5,
      Network_address_binary: 7,
      Line_description: 8,
      Interface_status: 10,
      Interface_type_of_service: 11,
      Interface_MTU: 12,
      Interface_line_type: 13,
      Host_address: 14,
      Host_address_binary: 16,
      Interface_subnet_mask: 17,
      Interface_subnet_mask_binary: 19,
      Directed_broadcast_address: 20,
      Directed_broadcast_address_binary: 22,
      Change_date: 23,
      Change_time: 24,
      Associated_local_interface: 25,
      Associated_local_interface_binary: 27,
      Change_status: 28,
      Packet_rules: 29,
      Automatic_start: 30,
      TRLAN_bit_sequencing: 31,
      Interface_type: 32,
      Proxy_ARP_allowed: 33,
      Proxy_ARP_enabled: 34,
      Configured_MTU: 35,
      Network_name: 36,
      Interface_name: 37,
      Alias_name: 38,
      Interface_description: 40,
      Offset_to_preferred_interface_list: 42,
      Number_of_entries_in_preferred_interface_list: 43,
      Length_of_one_preferred_interface_list_entry: 44,
      DHCP_created: 45,
      DHCP_dynamic_DNS_updates: 46,
      DHCP_lease_expiration: 47,
      'DHCP_lease_expiration_-_date': 48,
      'DHCP_lease_expiration_-_time': 49,
      DHCP_lease_obtained: 50,
      'DHCP_lease_obtained_-_date': 51,
      'DHCP_lease_obtained_-_time': 52,
      Use_DHCP_unique_identifier: 53,
      DHCP_server_IP_address: 54,
      Preferred_interface_Internet_address: 56,
      Preferred_interface_Internet_address_binary: 58,
    };
          
    if (ipaddr === 'localhost') { address = '127.0.0.1'; }
    const request = [
      [1, '10i0'],
      [IPToNum(address), '10i0'],
    ];
    const pgm = new ProgramCall('QTOCNETSTS', { lib: 'QSYS', func: 'QtocRtvNetIfcDta' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('NIFD0100', '8A');
    pgm.addParam(request);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {}; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Internet_address: output[0].data[2].value,
            Internet_address_binary: output[0].data[4].value,
            Network_address: output[0].data[5].value,
            Network_address_binary: output[0].data[7].value,
            Line_description: output[0].data[8].value,
            Interface_status: output[0].data[10].value,
            Interface_type_of_service: output[0].data[11].value,
            Interface_MTU: output[0].data[12].value,
            Interface_line_type: output[0].data[13].value,
            Host_address: output[0].data[14].value,
            Host_address_binary: output[0].data[16].value,
            Interface_subnet_mask: output[0].data[17].value,
            Interface_subnet_mask_binary: output[0].data[19].value,
            Directed_broadcast_address: output[0].data[20].value,
            Directed_broadcast_address_binary: output[0].data[22].value,
            Change_date: output[0].data[23].value,
            Change_time: output[0].data[24].value,
            Associated_local_interface: output[0].data[25].value,
            Associated_local_interface_binary: output[0].data[27].value,
            Change_status: output[0].data[28].value,
            Packet_rules: output[0].data[29].value,
            Automatic_start: output[0].data[30].value,
            TRLAN_bit_sequencing: output[0].data[31].value,
            Interface_type: output[0].data[32].value,
            Proxy_ARP_allowed: output[0].data[33].value,
            Proxy_ARP_enabled: output[0].data[34].value,
            Configured_MTU: output[0].data[35].value,
            Network_name: output[0].data[36].value,
            Interface_name: output[0].data[37].value,
            Alias_name: output[0].data[38].value,
            Interface_description: output[0].data[40].value,
            Offset_to_preferred_interface_list: output[0].data[42].value,
            Number_of_entries_in_preferred_interface_list: output[0].data[43].value,
            Length_of_one_preferred_interface_list_entry: output[0].data[44].value,
            DHCP_created: output[0].data[45].value,
            DHCP_dynamic_DNS_updates: output[0].data[46].value,
            DHCP_lease_expiration: output[0].data[47].value,
            'DHCP_lease_expiration_-_date': output[0].data[48].value,
            'DHCP_lease_expiration_-_time': output[0].data[49].value,
            DHCP_lease_obtained: output[0].data[50].value,
            'DHCP_lease_obtained_-_date': output[0].data[51].value,
            'DHCP_lease_obtained_-_time': output[0].data[52].value,
            Use_DHCP_unique_identifier: output[0].data[53].value,
            DHCP_server_IP_address: output[0].data[54].value,
            Preferred_interface_Internet_address: output[0].data[56].value,
            Preferred_interface_Internet_address_binary: output[0].data[58].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  retrUsrAuth(usr, type, obj, lib = '*LIBL', cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '10A'], // [2]Object authority / Data authority
      ['', '1A'], // [3]Authorization list management
      ['', '1A'], // [4]Object operational
      ['', '1A'], // [5]Object management
      ['', '1A'], // [6]Object existence
      ['', '1A'], // [7]Data read
      ['', '1A'], // [8]Data add
      ['', '1A'], // [9]Data update
      ['', '1A'], // [10]Data delete
      ['', '10A'], // [11]Authorization list
      ['', '2A'], // [12]Authority source
      ['', '1A'], // [13]Some adopted authority
      ['', '10A'], // [14]Adopted object authority
      ['', '1A'], // [15]Adopted authorization list management
      ['', '1A'], // [16]Adopted object operational
      ['', '1A'], // [17]Adopted object management
      ['', '1A'], // [18]Adopted object existence
      ['', '1A'], // [19]Adopted data read
      ['', '1A'], // [20]Adopted data add
      ['', '1A'], // [21]Adopted data update
      ['', '1A'], // [22]Adopted data delete
      ['', '1A'], // [23]Adopted data execute
      ['', '10A'], // [24]Reserved
      ['', '1A'], // [25]Adopted object alter
      ['', '1A'], // [26]Adopted object reference
      ['', '10A'], // [27]Reserved
      ['', '1A'], // [28]Data execute
      ['', '10A'], // [29]Reserved
      ['', '1A'], // [30]Object alter
      ['', '1A'], // [31]Object reference
      ['', '10A'], // [32]ASP device name of library
      ['', '10A'], // [33]ASP device name of object
      ['', '3A'], // [34]Reserved
      [0, '10i0'], // [35]Offset to group information table
      [0, '10i0'], // [36]Number of group table entries returned
      [0, '48b'], // [37]Group information table repeated for each of the user's groups
    ];
    
    const outValue = {
      'Object_authority_/_Data_authority': 2,
      Authorization_list_management: 3,
      Object_operational: 4,
      Object_management: 5,
      Object_existence: 6,
      Data_read: 7,
      Data_add: 8,
      Data_update: 9,
      Data_delete: 10,
      Authorization_list: 11,
      Authority_source: 12,
      Some_adopted_authority: 13,
      Adopted_object_authority: 14,
      Adopted_authorization_list_management: 15,
      Adopted_object_operational: 16,
      Adopted_object_management: 17,
      Adopted_object_existence: 18,
      Adopted_data_read: 19,
      Adopted_data_add: 20,
      Adopted_data_update: 21,
      Adopted_data_delete: 22,
      Adopted_data_execute: 23,
      Reserved: 24,
      Adopted_object_alter: 25,
      Adopted_object_reference: 26,
      // Reserved: 27, // TODO: duplicate key
      Data_execute: 28,
      // Reserved: 29, // TODO: duplicate key
      Object_alter: 30,
      Object_reference: 31,
      ASP_device_name_of_library: 32,
      ASP_device_name_of_object: 33,
      // Reserved: 34, // TODO: duplicate key
      Offset_to_group_information_table: 35,
      Number_of_group_table_entries_returned: 36,
    };
          
    const pgm = new ProgramCall('QSYRUSRA', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('USRA0100', '8A');
    pgm.addParam(usr, '10A');
    pgm.addParam([[obj, '10A'], [lib, '10A']]);
    pgm.addParam(type, '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {}; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            'Object_authority_/_Data_authority': output[0].data[2].value,
            Authorization_list_management: output[0].data[3].value,
            Object_operational: output[0].data[4].value,
            Object_management: output[0].data[5].value,
            Object_existence: output[0].data[6].value,
            Data_read: output[0].data[7].value,
            Data_add: output[0].data[8].value,
            Data_update: output[0].data[9].value,
            Data_delete: output[0].data[10].value,
            Authorization_list: output[0].data[11].value,
            Authority_source: output[0].data[12].value,
            Some_adopted_authority: output[0].data[13].value,
            Adopted_object_authority: output[0].data[14].value,
            Adopted_authorization_list_management: output[0].data[15].value,
            Adopted_object_operational: output[0].data[16].value,
            Adopted_object_management: output[0].data[17].value,
            Adopted_object_existence: output[0].data[18].value,
            Adopted_data_read: output[0].data[19].value,
            Adopted_data_add: output[0].data[20].value,
            Adopted_data_update: output[0].data[21].value,
            Adopted_data_delete: output[0].data[22].value,
            Adopted_data_execute: output[0].data[23].value,
            Reserved: output[0].data[24].value,
            Adopted_object_alter: output[0].data[25].value,
            Adopted_object_reference: output[0].data[26].value,
            // Reserved: output[0].data[27].value, // TODO: duplicate key
            Data_execute: output[0].data[28].value,
            // Reserved: output[0].data[29].value, // TODO: duplicate key
            Object_alter: output[0].data[30].value,
            Object_reference: output[0].data[31].value,
            ASP_device_name_of_library: output[0].data[32].value,
            ASP_device_name_of_object: output[0].data[33].value,
            // Reserved: output[0].data[34].value, // TODO: duplicate key
            Offset_to_group_information_table: output[0].data[35].value,
            Number_of_group_table_entries_returned: output[0].data[36].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  retrCmdInfo(cmd, lib = '*LIBL', cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '10A'], // [2]Command name
      ['', '10A'], // [3]Command library name
      ['', '10A'], // [4]Command processing program or proxy target command
      ['', '10A'], // [5]Command processing program's or proxy target command's library name
      ['', '10A'], // [6]Source file name
      ['', '10A'], // [7]Source file library name
      ['', '10A'], // [8]Source file member name
      ['', '10A'], // [9]Validity check program name
      ['', '10A'], // [10]Validity check program library name
      ['', '10A'], // [11]Mode information
      ['', '15A'], // [12]Where allowed to run
      ['', '1A'], // [13]Allow limited user
      [0, '10i0'], // [14]Maximum positional parameters
      ['', '10A'], // [15]Prompt message file name
      ['', '10A'], // [16]Prompt message file library name
      ['', '10A'], // [17]Message file name
      ['', '10A'], // [18]Message file library name
      ['', '10A'], // [19]Help panel group name
      ['', '10A'], // [20]Help panel group library name
      ['', '10A'], // [21]Help identifier
      ['', '10A'], // [22]Search index name
      ['', '10A'], // [23]Search index library name
      ['', '10A'], // [24]Current library
      ['', '10A'], // [25]Product library
      ['', '10A'], // [26]Prompt override program name
      ['', '10A'], // [27]Prompt override program library name
      ['', '6A'], // [28]Restricted to target release
      ['', '50A'], // [29]Text description
      ['', '2A'], // [30]Command processing program call state
      ['', '2A'], // [31]Validity check program call state
      ['', '2A'], // [32]Prompt override program call state
      [0, '10i0'], // [33]Offset to help bookshelf information
      [0, '10i0'], // [34]Length of help bookshelf information
      [0, '10i0'], // [35]Coded character set ID (CCSID)
      ['', '1A'], // [36]Enabled for GUI indicator
      ['', '1A'], // [37]Threadsafe indicator
      ['', '1A'], // [38]Multithreaded job action
      ['', '1A'], // [39]Proxy command indicator
      ['', '1A'], // [40]Prompt message file text indicator
      ['', '13A'], // [41]Reserved
    ];
    
    const outValue = {
      Command_name: 2,
      Command_library_name: 3,
      Command_processing_program_or_proxy_target_command: 4,
      "Command_processing_program's_or_proxy_target_command's_library_name": 5,
      Source_file_name: 6,
      Source_file_library_name: 7,
      Source_file_member_name: 8,
      Validity_check_program_name: 9,
      Validity_check_program_library_name: 10,
      Mode_information: 11,
      Where_allowed_to_run: 12,
      Allow_limited_user: 13,
      Maximum_positional_parameters: 14,
      Prompt_message_file_name: 15,
      Prompt_message_file_library_name: 16,
      Message_file_name: 17,
      Message_file_library_name: 18,
      Help_panel_group_name: 19,
      Help_panel_group_library_name: 20,
      Help_identifier: 21,
      Search_index_name: 22,
      Search_index_library_name: 23,
      Current_library: 24,
      Product_library: 25,
      Prompt_override_program_name: 26,
      Prompt_override_program_library_name: 27,
      Restricted_to_target_release: 28,
      Text_description: 29,
      Command_processing_program_call_state: 30,
      Validity_check_program_call_state: 31,
      Prompt_override_program_call_state: 32,
      Offset_to_help_bookshelf_information: 33,
      Length_of_help_bookshelf_information: 34,
      'Coded_character_set_ID_(CCSID)': 35,
      Enabled_for_GUI_indicator: 36,
      Threadsafe_indicator: 37,
      Multithreaded_job_action: 38,
      Proxy_command_indicator: 39,
      Prompt_message_file_text_indicator: 40,
    };
          
    const pgm = new ProgramCall('QCDRCMDI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('CMDI0100', '8A');
    pgm.addParam([[cmd, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Command_name: output[0].data[2].value,
            Command_library_name: output[0].data[3].value,
            Command_processing_program_or_proxy_target_command: output[0].data[4].value,
            "Command_processing_program's_or_proxy_target_command's_library_name": output[0].data[5].value,
            Source_file_name: output[0].data[6].value,
            Source_file_library_name: output[0].data[7].value,
            Source_file_member_name: output[0].data[8].value,
            Validity_check_program_name: output[0].data[9].value,
            Validity_check_program_library_name: output[0].data[10].value,
            Mode_information: output[0].data[11].value,
            Where_allowed_to_run: output[0].data[12].value,
            Allow_limited_user: output[0].data[13].value,
            Maximum_positional_parameters: output[0].data[14].value,
            Prompt_message_file_name: output[0].data[15].value,
            Prompt_message_file_library_name: output[0].data[16].value,
            Message_file_name: output[0].data[17].value,
            Message_file_library_name: output[0].data[18].value,
            Help_panel_group_name: output[0].data[19].value,
            Help_panel_group_library_name: output[0].data[20].value,
            Help_identifier: output[0].data[21].value,
            Search_index_name: output[0].data[22].value,
            Search_index_library_name: output[0].data[23].value,
            Current_library: output[0].data[24].value,
            Product_library: output[0].data[25].value,
            Prompt_override_program_name: output[0].data[26].value,
            Prompt_override_program_library_name: output[0].data[27].value,
            Restricted_to_target_release: output[0].data[28].value,
            Text_description: output[0].data[29].value,
            Command_processing_program_call_state: output[0].data[30].value,
            Validity_check_program_call_state: output[0].data[31].value,
            Prompt_override_program_call_state: output[0].data[32].value,
            Offset_to_help_bookshelf_information: output[0].data[33].value,
            Length_of_help_bookshelf_information: output[0].data[34].value,
            'Coded_character_set_ID_(CCSID)': output[0].data[35].value,
            Enabled_for_GUI_indicator: output[0].data[36].value,
            Threadsafe_indicator: output[0].data[37].value,
            Multithreaded_job_action: output[0].data[38].value,
            Proxy_command_indicator: output[0].data[39].value,
            Prompt_message_file_text_indicator: output[0].data[40].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  retrPgmInfo(_pgm, lib = '*LIBL', cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '10A'], // [2]Program name
      ['', '10A'], // [3]Program library name
      ['', '10A'], // [4]Program owner
      ['', '10A'], // [5]Program attribute
      ['', '13A'], // [6]Creation date and time
      ['', '10A'], // [7]Source file name
      ['', '10A'], // [8]Source file library name
      ['', '10A'], // [9]Source file member name
      ['', '13A'], // [10]Source file updated date and time
      ['', '1A'], // [11]Observable information
      ['', '1A'], // [12]User profile option
      ['', '1A'], // [13]Use adopted authority
      ['', '1A'], // [14]Log commands
      ['', '1A'], // [15]Allow RTVCLSRC
      ['', '1A'], // [16]Fix decimal data
      ['', '50A'], // [17]Text description
      ['', '1A'], // [18]Type of program
      ['', '1A'], // [19]Teraspace storage-enabled program
      ['', '58A'], // [20]Reserved
      [0, '10i0'], // [21]Minimum number of parameters
      [0, '10i0'], // [22]Maximum number of parameters
      [0, '10i0'], // [23]Program size
      [0, '10i0'], // [24]Associated space size
      [0, '10i0'], // [25]Static storage size
      [0, '10i0'], // [26]Automatic storage size
      [0, '10i0'], // [27]Number of MI instructions
      [0, '10i0'], // [28]Number of MI ODT entries
      ['', '1A'], // [29]Program state
      ['', '14A'], // [30]Compiler identification
      ['', '6A'], // [31]Earliest release program can run
      ['', '10A'], // [32]Sort sequence table name
      ['', '10A'], // [33]Sort sequence table library name
      ['', '10A'], // [34]Language identifier
      ['', '1A'], // [35]Program domain
      ['', '1A'], // [36]Conversion required
      ['', '1A'], // [37]Conversion details
      ['', '19A'], // [38]Reserved
      ['', '1A'], // [39]Optimization
      ['', '1A'], // [40]Paging pool
      ['', '1A'], // [41]Update program automatic storage area (PASA)
      ['', '1A'], // [42]Clear program automatic storage area (PASA)
      ['', '1A'], // [43]Paging amount
      ['', '18A'], // [44]Reserved
      ['', '10A'], // [45]Program entry procedure module
      ['', '10A'], // [46]Program entry procedure module library
      ['', '30A'], // [47]Activation group attribute
      ['', '1A'], // [48]Observable information compressed
      ['', '1A'], // [49]Run-time information compressed
      ['', '6A'], // [50]Release program created on
      ['', '1A'], // [51]Shared activation group
      ['', '1A'], // [52]Allow update
      [0, '10i0'], // [53]Program CCSID
      [0, '10i0'], // [54]Number of modules
      [0, '10i0'], // [55]Number of service programs
      [0, '10i0'], // [56]Number of copyrights
      [0, '10i0'], // [57]Number of unresolved references
      ['', '6A'], // [58]Release program created for
      ['', '1A'], // [59]Allow static storage reinitialization
      ['', '1A'], // [60]All creation data
      ['', '1A'], // [61]Allow bound *SRVPGM library name update
      ['', '10A'], // [62]Profiling data
      ['', '1A'], // [63]Teraspace storage enabled modules
      ['', '1A'], // [64]Storage model
      ['', '10A'], // [65]Uses argument optimization (ARGOPT)
      ['', '77A'], // [66]Reserved
    ];
    
    const outValue = {
      Program_name: 2,
      Program_library_name: 3,
      Program_owner: 4,
      Program_attribute: 5,
      Creation_date_and_time: 6,
      Source_file_name: 7,
      Source_file_library_name: 8,
      Source_file_member_name: 9,
      Source_file_updated_date_and_time: 10,
      Observable_information: 11,
      User_profile_option: 12,
      Use_adopted_authority: 13,
      Log_commands: 14,
      Allow_RTVCLSRC: 15,
      Fix_decimal_data: 16,
      Text_description: 17,
      Type_of_program: 18,
      'Teraspace_storage-enabled_program': 19,
      Reserved: 20,
      Minimum_number_of_parameters: 21,
      Maximum_number_of_parameters: 22,
      Program_size: 23,
      Associated_space_size: 24,
      Static_storage_size: 25,
      Automatic_storage_size: 26,
      Number_of_MI_instructions: 27,
      Number_of_MI_ODT_entries: 28,
      Program_state: 29,
      Compiler_identification: 30,
      Earliest_release_program_can_run: 31,
      Sort_sequence_table_name: 32,
      Sort_sequence_table_library_name: 33,
      Language_identifier: 34,
      Program_domain: 35,
      Conversion_required: 36,
      Conversion_details: 37,
      // Reserved: 38, // TODO: duplicate
      Optimization: 39,
      Paging_pool: 40,
      'Update_program_automatic_storage_area_(PASA)': 41,
      'Clear_program_automatic_storage_area_(PASA)': 42,
      Paging_amount: 43,
      // Reserved: 38, // TODO: duplicate
      Program_entry_procedure_module: 45,
      Program_entry_procedure_module_library: 46,
      Activation_group_attribute: 47,
      Observable_information_compressed: 48,
      'Run-time_information_compressed': 49,
      Release_program_created_on: 50,
      Shared_activation_group: 51,
      Allow_update: 52,
      Program_CCSID: 53,
      Number_of_modules: 54,
      Number_of_service_programs: 55,
      Number_of_copyrights: 56,
      Number_of_unresolved_references: 57,
      Release_program_created_for: 58,
      Allow_static_storage_reinitialization: 59,
      All_creation_data: 60,
      'Allow_bound_*SRVPGM_library_name_update': 61,
      Profiling_data: 62,
      Teraspace_storage_enabled_modules: 63,
      Storage_model: 64,
      'Uses_argument_optimization_(ARGOPT)': 65,
    };
          
    const pgm = new ProgramCall('QCLRPGMI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('PGMI0100', '8A');
    pgm.addParam([[_pgm, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Program_name: output[0].data[2].value,
            Program_library_name: output[0].data[3].value,
            Program_owner: output[0].data[4].value,
            Program_attribute: output[0].data[5].value,
            Creation_date_and_time: output[0].data[6].value,
            Source_file_name: output[0].data[7].value,
            Source_file_library_name: output[0].data[8].value,
            Source_file_member_name: output[0].data[9].value,
            Source_file_updated_date_and_time: output[0].data[10].value,
            Observable_information: output[0].data[11].value,
            User_profile_option: output[0].data[12].value,
            Use_adopted_authority: output[0].data[13].value,
            Log_commands: output[0].data[14].value,
            Allow_RTVCLSRC: output[0].data[15].value,
            Fix_decimal_data: output[0].data[16].value,
            Text_description: output[0].data[17].value,
            Type_of_program: output[0].data[18].value,
            'Teraspace_storage-enabled_program': output[0].data[19].value,
            Reserved: output[0].data[20].value,
            Minimum_number_of_parameters: output[0].data[21].value,
            Maximum_number_of_parameters: output[0].data[22].value,
            Program_size: output[0].data[23].value,
            Associated_space_size: output[0].data[24].value,
            Static_storage_size: output[0].data[25].value,
            Automatic_storage_size: output[0].data[26].value,
            Number_of_MI_instructions: output[0].data[27].value,
            Number_of_MI_ODT_entries: output[0].data[28].value,
            Program_state: output[0].data[29].value,
            Compiler_identification: output[0].data[30].value,
            Earliest_release_program_can_run: output[0].data[31].value,
            Sort_sequence_table_name: output[0].data[32].value,
            Sort_sequence_table_library_name: output[0].data[33].value,
            Language_identifier: output[0].data[34].value,
            Program_domain: output[0].data[35].value,
            Conversion_required: output[0].data[36].value,
            Conversion_details: output[0].data[37].value,
            // Reserved: output[0].data[38].value, // TODO: duplicate
            Optimization: output[0].data[39].value,
            Paging_pool: output[0].data[40].value,
            'Update_program_automatic_storage_area_(PASA)': output[0].data[41].value,
            'Clear_program_automatic_storage_area_(PASA)': output[0].data[42].value,
            Paging_amount: output[0].data[43].value,
            // Reserved: output[0].data[38].value, // TODO: duplicate
            Program_entry_procedure_module: output[0].data[45].value,
            Program_entry_procedure_module_library: output[0].data[46].value,
            Activation_group_attribute: output[0].data[47].value,
            Observable_information_compressed: output[0].data[48].value,
            'Run-time_information_compressed': output[0].data[49].value,
            Release_program_created_on: output[0].data[50].value,
            Shared_activation_group: output[0].data[51].value,
            Allow_update: output[0].data[52].value,
            Program_CCSID: output[0].data[53].value,
            Number_of_modules: output[0].data[54].value,
            Number_of_service_programs: output[0].data[55].value,
            Number_of_copyrights: output[0].data[56].value,
            Number_of_unresolved_references: output[0].data[57].value,
            Release_program_created_for: output[0].data[58].value,
            Allow_static_storage_reinitialization: output[0].data[59].value,
            All_creation_data: output[0].data[60].value,
            'Allow_bound_*SRVPGM_library_name_update': output[0].data[61].value,
            Profiling_data: output[0].data[62].value,
            Teraspace_storage_enabled_modules: output[0].data[63].value,
            Storage_model: output[0].data[64].value,
            'Uses_argument_optimization_(ARGOPT)': output[0].data[65].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  retrSrvPgmInfo(srvpgm, lib = '*LIB', cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '10A'], // [2]Service program name
      ['', '10A'], // [3]Service program library name
      ['', '10A'], // [4]Service program owner
      ['', '10A'], // [5]Service program attribute
      ['', '13A'], // [6]Creation date and time
      ['', '10A'], // [7]Export source file name
      ['', '10A'], // [8]Export source file library name
      ['', '10A'], // [9]Export source file member name
      ['', '30A'], // [10]Activation group attribute
      ['', '16A'], // [11]Current export signature
      ['', '1A'], // [12]User profile
      ['', '1A'], // [13]Observable information compressed
      ['', '1A'], // [14]Run-time information compressed
      [0, '10i0'], // [15]Service program CCSID
      [0, '10i0'], // [16]Number of modules
      [0, '10i0'], // [17]Number of service programs
      [0, '10i0'], // [18]Number of copyrights
      ['', '50A'], // [19]Text description
      ['', '1A'], // [20]Shared activation group
      ['', '1A'], // [21]Allow update
      [0, '10i0'], // [22]Number of unresolved references
      ['', '1A'], // [23]Use adopted authority
      ['', '1A'], // [24]Allow bound *SRVPGM library name update
      ['', '10A'], // [25]Profiling data
      ['', '1A'], // [26]Teraspace storage enabled modules
      ['', '1A'], // [27]Storage model
      ['', '10A'], // [28]Uses argument optimization (ARGOPT)
      ['', '70A'], // [29]Reserved '00'X
      ['', '1A'], // [30]Service program state
      ['', '1A'], // [31]Service program domain
      [0, '10i0'], // [32]Associated space size
      [0, '10i0'], // [33]Static storage size
      [0, '10i0'], // [34]Service program size
      ['', '6A'], // [35]Release service program created on
      ['', '6A'], // [36]Earliest release service program can run
      ['', '6A'], // [37]Release service program created for
      ['', '1A'], // [38]Allow static storage reinitialization
      ['', '1A'], // [39]Conversion required
      ['', '1A'], // [40]All creation data
      ['', '1A'], // [41]Conversion details
      ['', '90A'], // [42]Reserved
      ['', '1A'], // [43]Paging pool
      ['', '1A'], // [44]Paging amount
    ];
    
    const outValue = {
      Service_program_name: 2,
      Service_program_library_name: 3,
      Service_program_owner: 4,
      Service_program_attribute: 5,
      Creation_date_and_time: 6,
      Export_source_file_name: 7,
      Export_source_file_library_name: 8,
      Export_source_file_member_name: 9,
      Activation_group_attribute: 10,
      Current_export_signature: 11,
      User_profile: 12,
      Observable_information_compressed: 13,
      'Run-time_information_compressed': 14,
      Service_program_CCSID: 15,
      Number_of_modules: 16,
      Number_of_service_programs: 17,
      Number_of_copyrights: 18,
      Text_description: 19,
      Shared_activation_group: 20,
      Allow_update: 21,
      Number_of_unresolved_references: 22,
      Use_adopted_authority: 23,
      'Allow_bound_*SRVPGM_library_name_update': 24,
      Profiling_data: 25,
      Teraspace_storage_enabled_modules: 26,
      Storage_model: 27,
      'Uses_argument_optimization_(ARGOPT)': 28,
      "Reserved_'00'X": 29,
      Service_program_state: 30,
      Service_program_domain: 31,
      Associated_space_size: 32,
      Static_storage_size: 33,
      Service_program_size: 34,
      Release_service_program_created_on: 35,
      Earliest_release_service_program_can_run: 36,
      Release_service_program_created_for: 37,
      Allow_static_storage_reinitialization: 38,
      Conversion_required: 39,
      All_creation_data: 40,
      Conversion_details: 41,
      Reserved: 42,
      Paging_pool: 43,
      Paging_amount: 44,
    };
    
    const pgm = new ProgramCall('QBNRSPGM', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('SPGI0100', '8A');
    pgm.addParam([[srvpgm, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Service_program_name: output[0].data[2].value,
            Service_program_library_name: output[0].data[3].value,
            Service_program_owner: output[0].data[4].value,
            Service_program_attribute: output[0].data[5].value,
            Creation_date_and_time: output[0].data[6].value,
            Export_source_file_name: output[0].data[7].value,
            Export_source_file_library_name: output[0].data[8].value,
            Export_source_file_member_name: output[0].data[9].value,
            Activation_group_attribute: output[0].data[10].value,
            Current_export_signature: output[0].data[11].value,
            User_profile: output[0].data[12].value,
            Observable_information_compressed: output[0].data[13].value,
            'Run-time_information_compressed': output[0].data[14].value,
            Service_program_CCSID: output[0].data[15].value,
            Number_of_modules: output[0].data[16].value,
            Number_of_service_programs: output[0].data[17].value,
            Number_of_copyrights: output[0].data[18].value,
            Text_description: output[0].data[19].value,
            Shared_activation_group: output[0].data[20].value,
            Allow_update: output[0].data[21].value,
            Number_of_unresolved_references: output[0].data[22].value,
            Use_adopted_authority: output[0].data[23].value,
            'Allow_bound_*SRVPGM_library_name_update': output[0].data[24].value,
            Profiling_data: output[0].data[25].value,
            Teraspace_storage_enabled_modules: output[0].data[26].value,
            Storage_model: output[0].data[27].value,
            'Uses_argument_optimization_(ARGOPT)': output[0].data[28].value,
            "Reserved_'00'X": output[0].data[29].value,
            Service_program_state: output[0].data[30].value,
            Service_program_domain: output[0].data[31].value,
            Associated_space_size: output[0].data[32].value,
            Static_storage_size: output[0].data[33].value,
            Service_program_size: output[0].data[34].value,
            Release_service_program_created_on: output[0].data[35].value,
            Earliest_release_service_program_can_run: output[0].data[36].value,
            Release_service_program_created_for: output[0].data[37].value,
            Allow_static_storage_reinitialization: output[0].data[38].value,
            Conversion_required: output[0].data[39].value,
            All_creation_data: output[0].data[40].value,
            Conversion_details: output[0].data[41].value,
            Reserved: output[0].data[42].value,
            Paging_pool: output[0].data[43].value,
            Paging_amount: output[0].data[44].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  retrUserInfo(user, cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '10A'], // [2]User profile name
      ['', '13A'], // [3]Previous sign-on date and time
      ['', '1A'], // [4]Reserved
      [0, '10i0'], // [5]Sign-on attempts not valid
      ['', '10A'], // [6]Status
      ['', '8A'], // [7]Password change date
      ['', '1A'], // [8]No password indicator
      ['', '1A'], // [9]Reserved
      [0, '10i0'], // [10]Password expiration interval
      ['', '8A'], // [11]Date password expires
      [0, '10i0'], // [12]Days until password expires
      ['', '1A'], // [13]Set password to expire
      ['', '10A'], // [14]Display sign-on information
      ['', '1A'], // [15]Local password management
      ['', '10A'], // [16]Block password change
    ];
    
    const outValue = {
      User_profile_name: 2,
      'Previous_sign-on_date_and_time': 3,
      // Reserved: 4, // TODO: This is a duplicate
      'Sign-on_attempts_not_valid': 5,
      Status: 6,
      Password_change_date: 7,
      No_password_indicator: 8,
      Reserved: 9,
      Password_expiration_interval: 10,
      Date_password_expires: 11,
      Days_until_password_expires: 12,
      Set_password_to_expire: 13,
      'Display_sign-on_information': 14,
      Local_password_management: 15,
      Block_password_change: 16,
    };
          
    const pgm = new ProgramCall('QSYRUSRI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('USRI0100', '8A');
    pgm.addParam(user, '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            User_profile_name: output[0].data[2].value,
            'Previous_sign-on_date_and_time': output[0].data[3].value,
            // Reserved: output[0].data[4].value, // TODO: This is a duplicate
            'Sign-on_attempts_not_valid': output[0].data[5].value,
            Status: output[0].data[6].value,
            Password_change_date: output[0].data[7].value,
            No_password_indicator: output[0].data[8].value,
            Reserved: output[0].data[9].value,
            Password_expiration_interval: output[0].data[10].value,
            Date_password_expires: output[0].data[11].value,
            Days_until_password_expires: output[0].data[12].value,
            Set_password_to_expire: output[0].data[13].value,
            'Display_sign-on_information': output[0].data[14].value,
            Local_password_management: output[0].data[15].value,
            Block_password_change: output[0].data[16].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }


  retrUserAuthToObj(path, cb) {
    const outBuf = [
      ['', '10A'], // [0]Profile name
      ['', '1A'], // [1]User or group indicator
      ['', '10A'], // [2]Data authority
      ['', '1A'], // [3]Authorization list management
      ['', '1A'], // [4]Object management
      ['', '1A'], // [5]Object existence
      ['', '1A'], // [6]Object alter
      ['', '1A'], // [7]Object reference
      ['', '10A'], // [8]Reserved
      ['', '1A'], // [9]Object operational
      ['', '1A'], // [10]Data read
      ['', '1A'], // [11]Data add
      ['', '1A'], // [12]Data update
      ['', '1A'], // [13]Data delete
      ['', '1A'], // [14]Data execute
      ['', '10A'], // [15]Reserved
    ];
    
    const feedBack = [
      [0, '10i0'], // [0]Bytes returned in the returned records feedback information
      [0, '10i0'], // [1]Bytes available in the returned records feedback information
      [0, '10i0'], // [2]Bytes returned in the receiver variable
      [0, '10i0'], // [3]Bytes available in the receiver variable
      [0, '10i0'], // [4]Number of authorized users
      [0, '10i0'], // [5]Entry length for each authorized user returned
      ['', '10A'], // [6]Owner
      ['', '10A'], // [7]Primary group
      ['', '10A'], // [8]Authorization list
      ['', '1A'], // [9]Sensitivity level
    ];

    const outValue = {
      Profile_name: 0,
      User_or_group_indicator: 1,
      Data_authority: 2,
      Authorization_list_management: 3,
      Object_management: 4,
      Object_existence: 5,
      Object_alter: 6,
      Object_reference: 7,
      Reserved: 8,
      Object_operational: 9,
      Data_read: 10,
      Data_add: 11,
      Data_update: 12,
      Data_delete: 13,
      Data_execute: 14,
    };
    
    const pgm = new ProgramCall('QSYRTVUA', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam(feedBack, { io: 'out', len: 'rec3' });
    pgm.addParam(0, '10i0', { setlen: 'rec3' });
    pgm.addParam('RTUA0100', '8A');
    pgm.addParam(path, `${path.length}A`);
    pgm.addParam(path.length, '10i0');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Profile_name: output[0].data[0].value,
            User_or_group_indicator: output[0].data[1].value,
            Data_authority: output[0].data[2].value,
            Authorization_list_management: output[0].data[3].value,
            Object_management: output[0].data[4].value,
            Object_existence: output[0].data[5].value,
            Object_alter: output[0].data[6].value,
            Object_reference: output[0].data[7].value,
            Reserved: output[0].data[8].value,
            Object_operational: output[0].data[9].value,
            Data_read: output[0].data[10].value,
            Data_add: output[0].data[11].value,
            Data_update: output[0].data[12].value,
            Data_delete: output[0].data[13].value,
            Data_execute: output[0].data[14].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  addToLibraryList(Lib, cb) {
    const pgm = new ProgramCall('QLICHGLL', { lib: 'QSYS' });
    pgm.addParam('*SAME', '11A');
    pgm.addParam('*SAME', '11A');
    pgm.addParam('*SAME', '11A');
    pgm.addParam(Lib, '11A');
    pgm.addParam(1, '10i0');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
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
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = true;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
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
    
    const outValue = {
      Product_ID: 3,
      PTF_ID: 4,
      Release_level: 5,
      Product_option: 6,
      Load_ID: 7,
      Loaded_status: 8,
      Cover_letter_status: 9,
      'On-order_status': 10,
      Save_file_status: 11,
      File_name: 12,
      File_library_name: 13,
      PTF_type: 14,
      IPL_action: 15,
      Action_pending: 16,
      Action_required: 17,
      PTF_is_released: 18,
      Target_release: 19,
      Superseding_PTF: 20,
      Current_IPL_source: 21,
      Minimum_level: 22,
      Maximum_level: 23,
      Format_information_available: 24,
      Status_date_and_time: 25,
      Licensed_Internal_Code_group: 26,
      Superseded_by_PTF_ID: 27,
      Current_server_IPL_source: 28,
      Server_IPL_required: 29,
      Creation_date_and_time: 30,
      Technology_refresh_PTF: 31,
      Reserved: 32,
    };

    const pgm = new ProgramCall('QPZRTVFX', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam(PTFInfo);
    pgm.addParam('PTFR0100', '8A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue = {}; // The returned value.

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
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

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
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
        if (typeof option === 'function') { // If it is a function,
          cb = option; // then it is the cb.
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

    const ProdInfo = [
      [prodID, '7A'],
      ['*ONLY', '6A'],
      [prodOption, '4A'],
      ['*CODE', '10A'],
    ];
    
    const outValue = {
      // Reserved: 2, // TODO: Duplicate key
      Product_ID: 3,
      Release_level: 4,
      Product_option: 5,
      Load_ID: 6,
      Load_type: 7,
      Symbolic_load_state: 8,
      Load_error_indicator: 9,
      Load_state: 10,
      Supported_flag: 11,
      Registration_type: 12,
      Registration_value: 13,
      // Reserved: 14, // TODO: Duplicate key
      Offset_to_additional_information: 15,
      Primary_language_load_identifier: 16,
      Minimum_target_release: 17,
      'Minimum_VRM_of_*BASE_required_by_option': 18,
      Requirements_met_between_base_and_option_value: 19,
      Level: 20,
      Reserved: 21,
    };

    const pgm = new ProgramCall('QSZRTVPR', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('PRDR0100', '8A');
    pgm.addParam(ProdInfo);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue = {}; // The returned value.
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            // Reserved: output[0].data[2].value, // TODO: Duplicate key
            Product_ID: output[0].data[3].value,
            Release_level: output[0].data[4].value,
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

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
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
    
    const outValue = {
      Product_ID: 0,
      Product_option: 1,
      Release_level: 2,
      Description_text_message_ID: 4,
      Description_text_object_name: 5,
      Description_text_library_name: 6,
      Installed_flag: 7,
      Supported_flag: 8,
      Registration_type: 9,
      Registration_value: 10,
      Description_text: 11,
    }
            
    const pgm = new ProgramCall('QSZSLTPR', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out' });
    pgm.addParam(inputInfo);
    pgm.addParam('PRDS0200', '8A');
    pgm.addParam(ProdInfo);
    pgm.addParam(OutputInfo, { io: 'out' });
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          const count = Number(output[0].data[4].param[1].value);
          if (succeed(output)) {
            for (let i = 0; i < count * 12; i += 12) {
              let ptf = {};
              for (let [key, j] of Object.entries(outValue)) {
                ptf[key] = output[0].data[0].param[i + j].value;
              }
              rtValue.push(ptf);
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        const { length } = output[0].data;
        const count = Number(output[0].data[length - 6].value);

        if (succeed(output)) {
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

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }


  createUserSpace(name, lib, attr, size, auth, desc, cb) {
    const pgm = new ProgramCall('QUSCRTUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(attr === '' ? 'LOG' : attr, '11A');
    pgm.addParam(size === '' ? 50 : size, '10i0');
    pgm.addParam(0, '1A');
    pgm.addParam(auth === '' ? '*USE' : auth, '10A');
    pgm.addParam(desc, '50A');
    pgm.addParam('*NO', '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
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
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = true;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  setUserSpaceData(name, lib, length, msg, cb) {
    const pgm = new ProgramCall('QUSCHGUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(1, '10i0');
    pgm.addParam(length, '10i0');
    pgm.addParam(msg, `${length}A`);
    pgm.addParam(0, '1A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
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
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = true;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  getUserSpaceData(name, lib, length, cb) {
    const pgm = new ProgramCall('QUSRTVUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(1, '10i0');
    pgm.addParam(length, '10i0');
    pgm.addParam('', `${length}A`, { io: 'out' });
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            rtValue = output[0].data[3].param.value;
          } else {
            rtValue = str;
          }
          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = output[0].data[4].value;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML and get the response.
  }

  deleteUserSpace(name, lib, cb) {
    const pgm = new ProgramCall('QUSDLTUS', { lib: 'QSYS' });
    pgm.addParam([[name, '10A'], [lib === '' ? '*CURLIB' : lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            rtValue = true;
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = true;
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
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
    if (type === '10i0') { item = [0, '10i0']; } else { item = ['', type]; }

    const outBuf = [
      [0, '10i0'], // Number of system values returned
      [0, '10i0'], // Offset to system value information table
      ['', '10A'], // System value
      ['', '1A'], // Type of data(C--character / B--binary / blank--not available.)
      ['', '1A'], // Information status(blank--The information was available.)
      [0, '10i0'], // Length of data
      item,
    ];

    const pgm = new ProgramCall('QWCRSVAL', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' }); // Receiver buffer
    pgm.addParam(0, '10i0', { setlen: 'rec1' }); // Length of the receiver buffer
    pgm.addParam(1, '10i0'); // Number of system values to retrieve
    pgm.addParam(sysValue, '10A'); // System value name
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' }); // Error code

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
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            rtValue = output[0].data[0].param[6].value;
          } else {
            rtValue = str;
          }
          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = output[0].data[6].value; // Get the returned value from the output array.
        } else {
          rtValue = str;
        }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson); // Post the input XML
  }

  getSysStatus(cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes available
      [0, '10i0'], // [1]Bytes returned
      ['', '8A'], // [2]Current date and time
      ['', '8A'], // [3]System name
      [0, '10i0'], // [4]Users currently signed on
      [0, '10i0'], // [5]Users temporarily signed off (disconnected)
      [0, '10i0'], // [6]Users suspended by system request
      [0, '10i0'], // [7]Users suspended by group jobs
      [0, '10i0'], // [8]Users signed off with printer output waiting to print
      [0, '10i0'], // [9]Batch jobs waiting for messages
      [0, '10i0'], // [10]Batch jobs running
      [0, '10i0'], // [11]Batch jobs held while running
      [0, '10i0'], // [12]Batch jobs ending
      [0, '10i0'], // [13]Batch jobs waiting to run or already scheduled
      [0, '10i0'], // [14]Batch jobs held on a job queue
      [0, '10i0'], // [15]Batch jobs on a held job queue
      [0, '10i0'], // [16]Batch jobs on an unassigned job queue
      [0, '10i0'], // [17]Batch jobs ended with printer output waiting to print
    ];
    
    const outValue = {
      Current_date_and_time: 2,
      System_name: 3,
      Users_currently_signed_on: 4,
      'Users_temporarily_signed_off_(disconnected)': 5,
      Users_suspended_by_system_request: 6,
      Users_suspended_by_group_jobs: 7,
      Users_signed_off_with_printer_output_waiting_to_print: 8,
      Batch_jobs_waiting_for_messages: 9,
      Batch_jobs_running: 10,
      Batch_jobs_held_while_running: 11,
      Batch_jobs_ending: 12,
      Batch_jobs_waiting_to_run_or_already_scheduled: 13,
      Batch_jobs_held_on_a_job_queue: 14,
      Batch_jobs_on_a_held_job_queue: 15,
      Batch_jobs_on_an_unassigned_job_queue: 16,
      Batch_jobs_ended_with_printer_output_waiting_to_print: 17,
    };
          
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('SSTS0100', '8A');
    pgm.addParam('*NO', '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue = {};
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Current_date_and_time: output[0].data[2].value,
            System_name: output[0].data[3].value,
            Users_currently_signed_on: output[0].data[4].value,
            'Users_temporarily_signed_off_(disconnected)': output[0].data[5].value,
            Users_suspended_by_system_request: output[0].data[6].value,
            Users_suspended_by_group_jobs: output[0].data[7].value,
            Users_signed_off_with_printer_output_waiting_to_print: output[0].data[8].value,
            Batch_jobs_waiting_for_messages: output[0].data[9].value,
            Batch_jobs_running: output[0].data[10].value,
            Batch_jobs_held_while_running: output[0].data[11].value,
            Batch_jobs_ending: output[0].data[12].value,
            Batch_jobs_waiting_to_run_or_already_scheduled: output[0].data[13].value,
            Batch_jobs_held_on_a_job_queue: output[0].data[14].value,
            Batch_jobs_on_a_held_job_queue: output[0].data[15].value,
            Batch_jobs_on_an_unassigned_job_queue: output[0].data[16].value,
            Batch_jobs_ended_with_printer_output_waiting_to_print: output[0].data[17].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson);
  }

  getSysStatusExt(cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes available
      [0, '10i0'], // [1]Bytes returned
      ['', '8A'], // [2]Current date and time
      ['', '8A'], // [3]System name
      ['', '6A'], // [4]Elapsed time
      ['', '1A'], // [5]Restricted state flag
      ['', '1A'], // [6]Reserved
      [0, '10i0'], // [7]% processing unit used
      [0, '10i0'], // [8]Jobs in system
      [0, '10i0'], // [9]% permanent addresses
      [0, '10i0'], // [10]% temporary addresses
      [0, '10i0'], // [11]System ASP
      [0, '10i0'], // [12]% system ASP used
      [0, '10i0'], // [13]Total auxiliary storage
      [0, '10i0'], // [14]Current unprotected storage used
      [0, '10i0'], // [15]Maximum unprotected storage used
      [0, '10i0'], // [16]% DB capability
      [0, '10i0'], // [17]Main storage size
      [0, '10i0'], // [18]Number of partitions
      [0, '10i0'], // [19]Partition identifier
      [0, '10i0'], // [20]Reserved
      [0, '10i0'], // [21]Current processing capacity
      ['', '1A'], // [22]Processor sharing attribute
      ['', '3A'], // [23]Reserved
      [0, '10i0'], // [24]Number of processors
      [0, '10i0'], // [25]Active jobs in system
      [0, '10i0'], // [26]Active threads in system
      [0, '10i0'], // [27]Maximum jobs in system
      [0, '10i0'], // [28]% temporary 256MB segments used
      [0, '10i0'], // [29]% temporary 4GB segments used
      [0, '10i0'], // [30]% permanent 256MB segments used
      [0, '10i0'], // [31]% permanent 4GB segments used
      [0, '10i0'], // [32]% current interactive performance
      [0, '10i0'], // [33]% uncapped CPU capacity used
      [0, '10i0'], // [34]% shared processor pool used
      [0, '20u0'], // [35]Main storage size (long)
    ];

    const outValue = {
      Current_date_and_time: 2,
      System_name: 3,
      Elapsed_time: 4,
      Restricted_state_flag: 5,
      '%_processing_unit_used': 7,
      Jobs_in_system: 8,
      '%_permanent_addresses': 9,
      '%_temporary_addresses': 10,
      System_ASP: 11,
      '%_system_ASP_used': 12,
      Total_auxiliary_storage: 13,
      Current_unprotected_storage_used: 14,
      Maximum_unprotected_storage_used: 15,
      '%_DB_capability': 16,
      Main_storage_size: 17,
      Number_of_partitions: 18,
      Partition_identifier: 19,
      Current_processing_capacity: 21,
      Processor_sharing_attribute: 22,
      Number_of_processors: 24,
      Active_jobs_in_system: 25,
      Active_threads_in_system: 26,
      Maximum_jobs_in_system: 27,
      '%_temporary_256MB_segments_used': 28,
      '%_temporary_4GB_segments_used': 29,
      '%_permanent_256MB_segments_used': 30,
      '%_permanent_4GB_segments_used': 31,
      '%_current_interactive_performance': 32,
      '%_uncapped_CPU_capacity_used': 33,
      '%_shared_processor_pool_used': 34,
      'Main_storage_size_(long)': 35,
    };
          
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('SSTS0200', '8A');
    pgm.addParam('*NO', '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue = {};
    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Current_date_and_time: output[0].data[2].value,
            System_name: output[0].data[3].value,
            Elapsed_time: output[0].data[4].value,
            Restricted_state_flag: output[0].data[5].value,
            '%_processing_unit_used': output[0].data[7].value,
            Jobs_in_system: output[0].data[8].value,
            '%_permanent_addresses': output[0].data[9].value,
            '%_temporary_addresses': output[0].data[10].value,
            System_ASP: output[0].data[11].value,
            '%_system_ASP_used': output[0].data[12].value,
            Total_auxiliary_storage: output[0].data[13].value,
            Current_unprotected_storage_used: output[0].data[14].value,
            Maximum_unprotected_storage_used: output[0].data[15].value,
            '%_DB_capability': output[0].data[16].value,
            Main_storage_size: output[0].data[17].value,
            Number_of_partitions: output[0].data[18].value,
            Partition_identifier: output[0].data[19].value,
            Current_processing_capacity: output[0].data[21].value,
            Processor_sharing_attribute: output[0].data[22].value,
            Number_of_processors: output[0].data[24].value,
            Active_jobs_in_system: output[0].data[25].value,
            Active_threads_in_system: output[0].data[26].value,
            Maximum_jobs_in_system: output[0].data[27].value,
            '%_temporary_256MB_segments_used': output[0].data[28].value,
            '%_temporary_4GB_segments_used': output[0].data[29].value,
            '%_permanent_256MB_segments_used': output[0].data[30].value,
            '%_permanent_4GB_segments_used': output[0].data[31].value,
            '%_current_interactive_performance': output[0].data[32].value,
            '%_uncapped_CPU_capacity_used': output[0].data[33].value,
            '%_shared_processor_pool_used': output[0].data[34].value,
            'Main_storage_size_(long)': output[0].data[35].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson);
  }

  getJobStatus(jobId, cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '10A'], // [2]Job status
      ['', '16h'], // [3]Internal job identifier
      ['', '26A'], // [4]Fully qualified job name
    ];
    
    const outValue = {
      Job_status: 2,
      Fully_qualified_job_name: 4,
    };
          
    const pgm = new ProgramCall('QWCRJBST', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam(jobId, '6A');
    pgm.addParam('JOBS0100', '8A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Job_status: output[0].data[2].value,
            Fully_qualified_job_name: output[0].data[4].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };

    this.conn.run(toJson);
  }

  getJobInfo(jobName, userName, jobNumber, cb) {
    const outBuf = [
      [0, '10i0'], // [0]Number of bytes returned
      [0, '10i0'], // [1]Number of bytes available
      ['', '10A'], // [2]Job name
      ['', '10A'], // [3]User name
      ['', '6A'], // [4]Job number
      ['', '16h'], // [5]Internal job identifier
      ['', '10A'], // [6]Job status
      ['', '1A'], // [7]Job type
      ['', '1A'], // [8]Job subtype
      ['', '10A'], // [9]Subsystem description name
      [0, '10i0'], // [10]Run priority (job)
      [0, '10i0'], // [11]System pool identifier
      [0, '10i0'], // [12]Processing unit time used, if less than 2,147,483,647 milliseconds
      [0, '10i0'], // [13]Number of auxiliary I/O requests, if less than 2,147,483,647
      [0, '10i0'], // [14]Number of interactive transactions
      [0, '10i0'], // [15]Response time total
      ['', '1A'], // [16]Function type
      ['', '10A'], // [17]Function name
      ['', '4A'], // [18]Active job status
      [0, '10i0'], // [19]Number of database lock waits
      [0, '10i0'], // [20]Number of internal machine lock waits
      [0, '10i0'], // [21]Number of nondatabase lock waits
      [0, '10i0'], // [22]Time spent on database lock waits
      [0, '10i0'], // [23]Time spent on internal machine lock waits
      [0, '10i0'], // [24]Time spent on nondatabase lock waits
      ['', '1A'], // [25]Reserved
      [0, '10i0'], // [26]Current system pool identifier
      [0, '10i0'], // [27]Thread count
      [0, '20u0'], // [28]Processing unit time used - total for the job
      [0, '20u0'], // [29]Number of auxiliary I/O requests
      [0, '20u0'], // [30]Processing unit time used for database - total for the job
      [0, '20u0'], // [31]Page faults
      ['', '4A'], // [32]Active job status for jobs ending
      ['', '10A'], // [33]Memory pool name
      ['', '1A'], // [34]Message reply
      ['', '4A'], // [35]Message key, when active job waiting for a message
      ['', '10A'], // [36]Message queue name, when active job waiting for a message
      ['', '10A'], // [37]Message queue library name, when active job waiting for a message
      ['', '10A'], // [38]Message queue library ASP device name, when active job waiting for a message
    ];
    
    const JobId = [
      [jobName, '10A'],
      [userName, '10A'],
      [jobNumber, '6A'],
    ];
    
    const outValue = {
      Job_name: 2,
      User_name: 3,
      Job_number: 4,
      Job_status: 6,
      Job_type: 7,
      Job_subtype: 8,
      Subsystem_description_name: 9,
      'Run_priority_(job)': 10,
      System_pool_identifier: 11,
      'Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds': 12,
      'Number_of_auxiliary_I/O_requests,_if_less_than_2,147,483,647': 13,
      Number_of_interactive_transactions: 14,
      Response_time_total: 15,
      Function_type: 16,
      Function_name: 17,
      Active_job_status: 18,
      Number_of_database_lock_waits: 19,
      Number_of_internal_machine_lock_waits: 20,
      Number_of_nondatabase_lock_waits: 21,
      Time_spent_on_database_lock_waits: 22,
      Time_spent_on_internal_machine_lock_waits: 23,
      Time_spent_on_nondatabase_lock_waits: 24,
      Current_system_pool_identifier: 26,
      Thread_count: 27,
      'Processing_unit_time_used_-_total_for_the_job': 28,
      'Number_of_auxiliary_I/O_requests': 29,
      'Processing_unit_time_used_for_database_-_total_for_the_job': 30,
      Page_faults: 31,
      Active_job_status_for_jobs_ending: 32,
      Memory_pool_name: 33,
      Message_reply: 34,
      'Message_key,_when_active_job_waiting_for_a_message': 35,
      'Message_queue_name,_when_active_job_waiting_for_a_message': 36,
      'Message_queue_library_name,_when_active_job_waiting_for_a_message': 37,
      'Message_queue_library_ASP_device_name,_when_active_job_waiting_for_a_message': 38,
    };

    const pgm = new ProgramCall('QUSRJOBI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('JOBI0200', '8A');
    pgm.addParam(JobId);
    pgm.addParam('', '16A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Job_name: output[0].data[2].value,
            User_name: output[0].data[3].value,
            Job_number: output[0].data[4].value,
            Job_status: output[0].data[6].value,
            Job_type: output[0].data[7].value,
            Job_subtype: output[0].data[8].value,
            Subsystem_description_name: output[0].data[9].value,
            'Run_priority_(job)': output[0].data[10].value,
            System_pool_identifier: output[0].data[11].value,
            'Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds': output[0].data[12].value,
            'Number_of_auxiliary_I/O_requests,_if_less_than_2,147,483,647': output[0].data[13].value,
            Number_of_interactive_transactions: output[0].data[14].value,
            Response_time_total: output[0].data[15].value,
            Function_type: output[0].data[16].value,
            Function_name: output[0].data[17].value,
            Active_job_status: output[0].data[18].value,
            Number_of_database_lock_waits: output[0].data[19].value,
            Number_of_internal_machine_lock_waits: output[0].data[20].value,
            Number_of_nondatabase_lock_waits: output[0].data[21].value,
            Time_spent_on_database_lock_waits: output[0].data[22].value,
            Time_spent_on_internal_machine_lock_waits: output[0].data[23].value,
            Time_spent_on_nondatabase_lock_waits: output[0].data[24].value,
            Current_system_pool_identifier: output[0].data[26].value,
            Thread_count: output[0].data[27].value,
            'Processing_unit_time_used_-_total_for_the_job': output[0].data[28].value,
            'Number_of_auxiliary_I/O_requests': output[0].data[29].value,
            'Processing_unit_time_used_for_database_-_total_for_the_job': output[0].data[30].value,
            Page_faults: output[0].data[31].value,
            Active_job_status_for_jobs_ending: output[0].data[32].value,
            Memory_pool_name: output[0].data[33].value,
            Message_reply: output[0].data[34].value,
            'Message_key,_when_active_job_waiting_for_a_message': output[0].data[35].value,
            'Message_queue_name,_when_active_job_waiting_for_a_message': output[0].data[36].value,
            'Message_queue_library_name,_when_active_job_waiting_for_a_message': output[0].data[37].value,
            'Message_queue_library_ASP_device_name,_when_active_job_waiting_for_a_message': output[0].data[38].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };
    this.conn.run(toJson);
  }

  getDataArea(lib, area, length, cb) {
    const outBuf = [
      [0, '10i0'], // [0]Bytes available
      [0, '10i0'], // [1]Bytes returned
      ['', '10A'], // [2]Type of value returned
      ['', '10A'], // [3]Library name
      [0, '10i0'], // [4]Length of value returned
      [0, '10i0'], // [5]Number of decimal positions
      ['', `${length}A`], // [6]Value
    ];
    
    const areaPath = [
      [area, '10A'],
      [lib, '10A'],
    ];
    
    const outValue = {
      Type_of_value_returned: 2,
      Library_name: 3,
      Length_of_value_returned: 4,
      Number_of_decimal_positions: 5,
      Value: 6,
    };
          
    const pgm = new ProgramCall('QWCRDTAA', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out' });
    pgm.addParam(length + 36, '10i0');
    pgm.addParam(areaPath);
    pgm.addParam(1, '10i0');
    pgm.addParam(length, '10i0');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());

    let rtValue = {};

    const toJson = (transportError, str) => {
      if (transportError) {
        if (this.reportError) {
          cb(transportError, null);
          return;
        }
        cb(null);
        return;
      }
      if (this.xml2js) { // Use new xmlToJs
        xmlToJs(str).then(output => {
          if (succeed(output)) {
            for (let [key, i] of Object.entries(outValue)) {
              rtValue[key] = output[0].data[0].param[i].value;
            }
          } else { rtValue = str; }

          if (this.reportError) {
            cb(null, rtValue);
            return;
          }
          cb(rtValue);
        });
      }
      else { // Use old xmlToJson
        const output = xmlToJson(str);
        if (succeed(output)) {
          rtValue = {
            Type_of_value_returned: output[0].data[2].value,
            Library_name: output[0].data[3].value,
            Length_of_value_returned: output[0].data[4].value,
            Number_of_decimal_positions: output[0].data[5].value,
            Value: output[0].data[6].value,
          };
        } else { rtValue = str; }

        if (this.reportError) {
          cb(null, rtValue);
          return;
        }
        cb(rtValue);
      }
    };
    this.conn.run(toJson);
  }
}

module.exports.Toolkit = Toolkit;
