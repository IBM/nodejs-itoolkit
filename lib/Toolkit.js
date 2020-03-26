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
        { type: '10i0', value: 0 },
        { type: '10i0', setlen: 'rec2', value: 0 },
        { type: '7A', value: '' },
        { type: '1A', value: '' },
      ],
    };
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

    const pgm = new ProgramCall('QTOCNETSTS', { lib: 'QSYS', func: 'QtocRtvTCPA' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('TCPA0300', '8A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
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
    const pgm = new ProgramCall('QSYRUSRA', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('USRA0100', '8A');
    pgm.addParam(usr, '10A');
    pgm.addParam([[obj, '10A'], [lib, '10A']]);
    pgm.addParam(type, '10A');
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
    const pgm = new ProgramCall('QCDRCMDI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('CMDI0100', '8A');
    pgm.addParam([[cmd, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
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
    const pgm = new ProgramCall('QCLRPGMI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('PGMI0100', '8A');
    pgm.addParam([[_pgm, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
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
    const pgm = new ProgramCall('QBNRSPGM', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('SPGI0100', '8A');
    pgm.addParam([[srvpgm, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
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
    const pgm = new ProgramCall('QSYRUSRI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('USRI0100', '8A');
    pgm.addParam(user, '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
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

    const pgm = new ProgramCall('QPZRTVFX', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam(PTFInfo);
    pgm.addParam('PTFR0100', '8A');
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

    const ProdInfo = [
      [prodID, '7A'],
      ['*ONLY', '6A'],
      [prodOption, '4A'],
      ['*CODE', '10A'],
    ];

    const pgm = new ProgramCall('QSZRTVPR', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('PRDR0100', '8A');
    pgm.addParam(ProdInfo);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('SSTS0100', '8A');
    pgm.addParam('*NO', '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
    const pgm = new ProgramCall('QWCRSSTS', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('SSTS0200', '8A');
    pgm.addParam('*NO', '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
    const outBuf = [
      [0, '10i0'], // [0]Bytes returned
      [0, '10i0'], // [1]Bytes available
      ['', '10A'], // [2]Job status
      ['', '16h'], // [3]Internal job identifier
      ['', '26A'], // [4]Fully qualified job name
    ];
    const pgm = new ProgramCall('QWCRJBST', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam(jobId, '6A');
    pgm.addParam('JOBS0100', '8A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
    const pgm = new ProgramCall('QUSRJOBI', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('JOBI0200', '8A');
    pgm.addParam(JobId);
    pgm.addParam('', '16A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
    const pgm = new ProgramCall('QWCRDTAA', { lib: 'QSYS' });
    pgm.addParam(outBuf, { io: 'out' });
    pgm.addParam(length + 36, '10i0');
    pgm.addParam(areaPath);
    pgm.addParam(1, '10i0');
    pgm.addParam(length, '10i0');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

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
