// Copyright (c) International Business Machines Corp. 2019

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

/* eslint-env mocha */
/* eslint-disable new-cap */

const { expect } = require('chai');
const { iConn, iNetwork } = require('../../../lib/itoolkit');

const { config } = require('../config');

if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const { database, username, password } = config.transportOptions;

let restOptions = null;

if (config.transport === 'rest') {
  restOptions = config.restOptions;
}

describe('iNetwork Functional Tests', () => {
  describe('constructor', () => {
    it('creates and returns an instance of iNetwork', () => {
      const connection = new iConn(database, config.user, password);

      const net = new iNetwork(connection);

      expect(net).to.be.instanceOf(iNetwork);
    });
  });

  describe('getTCPIPAttr', () => {
    it(`retrieves TCP/IP Attributes using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const net = new iNetwork(connection);

      net.getTCPIPAttr((output) => {
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('TCP/IPv4_stack_status');
        expect(output).to.have.a.property('How_long_active');
        expect(output).to.have.a.property('When_last_started_-_date');
        expect(output).to.have.a.property('When_last_started_-_time');
        expect(output).to.have.a.property('When_last_ended_-_date');
        expect(output).to.have.a.property('When_last_ended_-_time');
        expect(output).to.have.a.property('Who_last_started_-_job_name');
        expect(output).to.have.a.property('Who_last_started_-_job_user_name');
        expect(output).to.have.a.property('Who_last_started_-_job_number');
        expect(output).to.have.a.property('Who_last_started_-_internal_job_identifier');
        expect(output).to.have.a.property('Who_last_ended_-_job_name');
        expect(output).to.have.a.property('Who_last_ended_-_job_user_name');
        expect(output).to.have.a.property('Who_last_ended_-_job_number');
        expect(output).to.have.a.property('Who_last_ended_-_internal_job_identifier');
        expect(output).to.have.a.property('Offset_to_additional_information');
        expect(output).to.have.a.property('Length_of_additional_information');
        expect(output).to.have.a.property('Limited_mode');
        expect(output).to.have.a.property('Offset_to_list_of_Internet_addresses');
        expect(output).to.have.a.property('Number_of_Internet_addresses');
        expect(output).to.have.a.property('Entry_length_for_list_of_Internet_addresses');
        expect(output).to.have.a.property('DNS_protocol');
        expect(output).to.have.a.property('Retries');
        expect(output).to.have.a.property('Time_interval');
        expect(output).to.have.a.property('Search_order');
        expect(output).to.have.a.property('Initial_domain_name_server');
        expect(output).to.have.a.property('DNS_listening_port');
        expect(output).to.have.a.property('Host_name');
        expect(output).to.have.a.property('Domain_name');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Domain_search_list');
        done();
      });
    });
  });

  describe('getNetInterfaceData', () => {
    it(`retrieves IPv4 network interface info using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const net = new iNetwork(connection);

      net.getNetInterfaceData('127.0.0.1', (output) => {
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Internet_address');
        expect(output).to.have.a.property('Internet_address_binary');
        expect(output).to.have.a.property('Network_address');
        expect(output).to.have.a.property('Network_address_binary');
        expect(output).to.have.a.property('Line_description');
        expect(output).to.have.a.property('Interface_status');
        expect(output).to.have.a.property('Interface_type_of_service');
        expect(output).to.have.a.property('Interface_MTU');
        expect(output).to.have.a.property('Interface_line_type');
        expect(output).to.have.a.property('Host_address');
        expect(output).to.have.a.property('Host_address_binary');
        expect(output).to.have.a.property('Interface_subnet_mask');
        expect(output).to.have.a.property('Interface_subnet_mask_binary');
        expect(output).to.have.a.property('Directed_broadcast_address');
        expect(output).to.have.a.property('Directed_broadcast_address_binary');
        expect(output).to.have.a.property('Change_date');
        expect(output).to.have.a.property('Change_time');
        expect(output).to.have.a.property('Associated_local_interface');
        expect(output).to.have.a.property('Associated_local_interface_binary');
        expect(output).to.have.a.property('Packet_rules');
        expect(output).to.have.a.property('Change_status');
        expect(output).to.have.a.property('Automatic_start');
        expect(output).to.have.a.property('TRLAN_bit_sequencing');
        expect(output).to.have.a.property('Interface_type');
        expect(output).to.have.a.property('Proxy_ARP_allowed');
        expect(output).to.have.a.property('Proxy_ARP_enabled');
        expect(output).to.have.a.property('Configured_MTU');
        expect(output).to.have.a.property('Network_name');
        expect(output).to.have.a.property('Interface_name');
        expect(output).to.have.a.property('Alias_name');
        expect(output).to.have.a.property('Interface_description');
        expect(output).to.have.a.property('Offset_to_preferred_interface_list');
        expect(output).to.have.a.property('Number_of_entries_in_preferred_interface_list');
        expect(output).to.have.a.property('Length_of_one_preferred_interface_list_entry');
        expect(output).to.have.a.property('DHCP_created');
        expect(output).to.have.a.property('DHCP_dynamic_DNS_updates');
        expect(output).to.have.a.property('DHCP_lease_expiration');
        expect(output).to.have.a.property('DHCP_lease_expiration_-_date');
        expect(output).to.have.a.property('DHCP_lease_expiration_-_time');
        expect(output).to.have.a.property('DHCP_lease_obtained');
        expect(output).to.have.a.property('DHCP_lease_obtained_-_date');
        expect(output).to.have.a.property('DHCP_lease_obtained_-_time');
        expect(output).to.have.a.property('Use_DHCP_unique_identifier');
        expect(output).to.have.a.property('DHCP_server_IP_address');
        expect(output).to.have.a.property('Preferred_interface_Internet_address');
        expect(output).to.have.a.property('Preferred_interface_Internet_address_binary');
        done();
      });
    });
  });
});
