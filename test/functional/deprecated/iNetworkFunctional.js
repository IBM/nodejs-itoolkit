// Copyright contributors to the nodejs-itoolkit project
// SPDX-License-Identifier: MIT

/* eslint-disable new-cap */

const { expect } = require('chai');
const { iConn, iNetwork } = require('../../../lib/itoolkit');
const { config, printConfig } = require('../config');

// deprecated tests are in place to test compatability using deprecated classes and functions
// these tests use deprecated iConn Class to create a connnection
// iConn only supported idb and rest transports
if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const {
  database, username, password, host, port = 80, path,
} = config.transportOptions;

let restOptions = null;
if (config.transport === 'rest') {
  restOptions = {
    host,
    port,
    path,
  };
}

describe('iNetwork Functional Tests', function () {
  before(function () {
    printConfig();
  });

  describe('constructor', function () {
    it('creates and returns an instance of iNetwork', function () {
      const connection = new iConn(database, config.user, password);

      const net = new iNetwork(connection);

      expect(net).to.be.instanceOf(iNetwork);
    });
  });

  describe('getTCPIPAttr', function () {
    it('retrieves TCP/IP Attributes', function (done) {
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
        expect(output).to.have.a.property('Domain_search_list');
        done();
      });
    });
  });

  describe('getNetInterfaceData', function () {
    it('retrieves IPv4 network interface info', function (done) {
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
