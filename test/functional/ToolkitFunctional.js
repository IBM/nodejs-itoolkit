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
const { Toolkit, Connection } = require('../../lib/itoolkit');
const { config, printConfig } = require('./config');
const { checkObjectExists } = require('./checkObjectExists');

const lib = 'NODETKTEST';

function generateRandomName() {
  let name;

  do {
    // generate a random 10 digit base-36 number string
    // (base 36 is 0-9A-Z)
    name = Math.floor(Math.random() * (36 ** 10)).toString(36);
  }
  // first character can't be a digit
  while (name[0] >= '0' && name[0] <= '9');

  return name.toUpperCase();
}

describe('Toolkit Functional Tests', () => {
  before(() => {
    printConfig();
  });

  describe('DataQueue Functional Tests', () => {
    const dqName = 'TESTQ';
    const dqName2 = 'TESTQ2';

    before('check if data queue exists for tests', (done) => {
      checkObjectExists(config, dqName, '*DTAQ', (error) => {
        if (error) { throw error; }

        checkObjectExists(config, dqName2, '*DTAQ', (error) => {
          if (error) { throw error; }
          done();
        });
      });
    });
    describe('sendToDataQueue', () => {
      it('sends data to specified DQ', (done) => {
        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        toolkit.sendToDataQueue(dqName, lib, 'Hello from DQ!', (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.equal(true);
          done();
        });
      });
    });

    describe('receiveFromDataQueue', () => {
      it('receives data from specfied DQ', (done) => {
        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        toolkit.receiveFromDataQueue(dqName, lib, 100, (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.be.a('string').and.to.equal('Hello from DQ!');
          done();
        });
      });
    });

    describe('clearDataQueue', () => {
      it('clears the specifed DQ', (done) => {
        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        toolkit.clearDataQueue(dqName2, lib, (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.equal(true);
          done();
        });
      });
    });
  });
  describe('getTCPIPAttr', () => {
    it('retrieves TCP/IP Attributes', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.getTCPIPAttr((error, output) => {
        expect(error).to.equal(null);
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
    it('retrieves IPv4 network interface info', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.getNetInterfaceData('127.0.0.1', (error, output) => {
        expect(error).to.equal(null);
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
  describe('retrUsrAuth', () => {
    it(`returns uses's authority for an object using ${config.transport} tranport`, (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.retrUsrAuth('*PUBLIC', '*PGM', 'XMLCGI', 'QXMLSERV', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Object_authority_/_Data_authority');
        expect(output).to.have.a.property('Authorization_list_management');
        expect(output).to.have.a.property('Object_operational');
        expect(output).to.have.a.property('Object_management');
        expect(output).to.have.a.property('Object_existence');
        expect(output).to.have.a.property('Data_read');
        expect(output).to.have.a.property('Data_add');
        expect(output).to.have.a.property('Data_update');
        expect(output).to.have.a.property('Data_delete');
        expect(output).to.have.a.property('Authorization_list');
        expect(output).to.have.a.property('Authority_source');
        expect(output).to.have.a.property('Some_adopted_authority');
        expect(output).to.have.a.property('Adopted_object_authority');
        expect(output).to.have.a.property('Adopted_authorization_list_management');
        expect(output).to.have.a.property('Adopted_object_operational');
        expect(output).to.have.a.property('Adopted_object_management');
        expect(output).to.have.a.property('Adopted_object_existence');
        expect(output).to.have.a.property('Adopted_data_read');
        expect(output).to.have.a.property('Adopted_data_add');
        expect(output).to.have.a.property('Adopted_data_update');
        expect(output).to.have.a.property('Adopted_data_delete');
        expect(output).to.have.a.property('Adopted_data_execute');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Adopted_object_alter');
        expect(output).to.have.a.property('Adopted_object_reference');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Data_execute');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Object_alter');
        expect(output).to.have.a.property('Object_reference');
        expect(output).to.have.a.property('ASP_device_name_of_library');
        expect(output).to.have.a.property('ASP_device_name_of_object');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Offset_to_group_information_table');
        expect(output).to.have.a.property('Number_of_group_table_entries_returned');
        done();
      });
    });
  });

  describe('rtrCmdInfo', () => {
    it('returns command info', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.retrCmdInfo('CRTLIB', '*LIBL', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Command_name');
        expect(output).to.have.a.property('Command_library_name');
        expect(output).to.have.a.property('Command_processing_program_or_proxy_target_command');
        expect(output).to.have.a.property('Command_processing_program\'s_or_proxy_target_command\'s_library_name');
        expect(output).to.have.a.property('Source_file_name');
        expect(output).to.have.a.property('Source_file_library_name');
        expect(output).to.have.a.property('Source_file_member_name');
        expect(output).to.have.a.property('Validity_check_program_name');
        expect(output).to.have.a.property('Validity_check_program_library_name');
        expect(output).to.have.a.property('Mode_information');
        expect(output).to.have.a.property('Where_allowed_to_run');
        expect(output).to.have.a.property('Allow_limited_user');
        expect(output).to.have.a.property('Maximum_positional_parameters');
        expect(output).to.have.a.property('Prompt_message_file_name');
        expect(output).to.have.a.property('Prompt_message_file_library_name');
        expect(output).to.have.a.property('Message_file_name');
        expect(output).to.have.a.property('Message_file_library_name');
        expect(output).to.have.a.property('Help_panel_group_name');
        expect(output).to.have.a.property('Help_panel_group_library_name');
        expect(output).to.have.a.property('Help_identifier');
        expect(output).to.have.a.property('Search_index_name');
        expect(output).to.have.a.property('Search_index_library_name');
        expect(output).to.have.a.property('Current_library');
        expect(output).to.have.a.property('Product_library');
        expect(output).to.have.a.property('Prompt_override_program_name');
        expect(output).to.have.a.property('Prompt_override_program_library_name');
        expect(output).to.have.a.property('Restricted_to_target_release');
        expect(output).to.have.a.property('Text_description');
        expect(output).to.have.a.property('Command_processing_program_call_state');
        expect(output).to.have.a.property('Validity_check_program_call_state');
        expect(output).to.have.a.property('Prompt_override_program_call_state');
        expect(output).to.have.a.property('Offset_to_help_bookshelf_information');
        expect(output).to.have.a.property('Length_of_help_bookshelf_information');
        expect(output).to.have.a.property('Coded_character_set_ID_(CCSID)');
        expect(output).to.have.a.property('Enabled_for_GUI_indicator');
        expect(output).to.have.a.property('Threadsafe_indicator');
        expect(output).to.have.a.property('Multithreaded_job_action');
        expect(output).to.have.a.property('Proxy_command_indicator');
        expect(output).to.have.a.property('Prompt_message_file_text_indicator');
        done();
      });
    });
  });

  describe('retrPgmInfo', () => {
    it('returns program info', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.retrPgmInfo('XMLCGI', 'QXMLSERV', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Program_name');
        expect(output).to.have.a.property('Program_library_name');
        expect(output).to.have.a.property('Program_owner');
        expect(output).to.have.a.property('Program_attribute');
        expect(output).to.have.a.property('Creation_date_and_time');
        expect(output).to.have.a.property('Source_file_name');
        expect(output).to.have.a.property('Source_file_library_name');
        expect(output).to.have.a.property('Source_file_member_name');
        expect(output).to.have.a.property('Source_file_updated_date_and_time');
        expect(output).to.have.a.property('Observable_information');
        expect(output).to.have.a.property('User_profile_option');
        expect(output).to.have.a.property('Use_adopted_authority');
        expect(output).to.have.a.property('Log_commands');
        expect(output).to.have.a.property('Allow_RTVCLSRC');
        expect(output).to.have.a.property('Fix_decimal_data');
        expect(output).to.have.a.property('Text_description');
        expect(output).to.have.a.property('Type_of_program');
        expect(output).to.have.a.property('Teraspace_storage-enabled_program');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Minimum_number_of_parameters');
        expect(output).to.have.a.property('Maximum_number_of_parameters');
        expect(output).to.have.a.property('Program_size');
        expect(output).to.have.a.property('Associated_space_size');
        expect(output).to.have.a.property('Static_storage_size');
        expect(output).to.have.a.property('Automatic_storage_size');
        expect(output).to.have.a.property('Number_of_MI_instructions');
        expect(output).to.have.a.property('Number_of_MI_ODT_entries');
        expect(output).to.have.a.property('Program_state');
        expect(output).to.have.a.property('Compiler_identification');
        expect(output).to.have.a.property('Earliest_release_program_can_run');
        expect(output).to.have.a.property('Sort_sequence_table_name');
        expect(output).to.have.a.property('Sort_sequence_table_library_name');
        expect(output).to.have.a.property('Language_identifier');
        expect(output).to.have.a.property('Program_domain');
        expect(output).to.have.a.property('Conversion_required');
        expect(output).to.have.a.property('Conversion_details');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Optimization');
        expect(output).to.have.a.property('Paging_pool');
        expect(output).to.have.a.property('Update_program_automatic_storage_area_(PASA)');
        expect(output).to.have.a.property('Clear_program_automatic_storage_area_(PASA)');
        expect(output).to.have.a.property('Paging_amount');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Program_entry_procedure_module');
        expect(output).to.have.a.property('Program_entry_procedure_module_library');
        expect(output).to.have.a.property('Activation_group_attribute');
        expect(output).to.have.a.property('Observable_information_compressed');
        expect(output).to.have.a.property('Run-time_information_compressed');
        expect(output).to.have.a.property('Release_program_created_on');
        expect(output).to.have.a.property('Shared_activation_group');
        expect(output).to.have.a.property('Allow_update');
        expect(output).to.have.a.property('Program_CCSID');
        expect(output).to.have.a.property('Number_of_modules');
        expect(output).to.have.a.property('Number_of_service_programs');
        expect(output).to.have.a.property('Number_of_copyrights');
        expect(output).to.have.a.property('Number_of_unresolved_references');
        expect(output).to.have.a.property('Release_program_created_for');
        expect(output).to.have.a.property('Allow_static_storage_reinitialization');
        expect(output).to.have.a.property('All_creation_data');
        expect(output).to.have.a.property('Allow_bound_*SRVPGM_library_name_update');
        expect(output).to.have.a.property('Profiling_data');
        expect(output).to.have.a.property('Teraspace_storage_enabled_modules');
        expect(output).to.have.a.property('Storage_model');
        expect(output).to.have.a.property('Uses_argument_optimization_(ARGOPT)');
        done();
      });
    });
  });

  describe('retrSrvPgmInfo', () => {
    it('returns service program info', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.retrSrvPgmInfo('QZSRVSSL', 'QHTTPSVR', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Service_program_name');
        expect(output).to.have.a.property('Service_program_name');
        expect(output).to.have.a.property('Service_program_owner');
        expect(output).to.have.a.property('Service_program_attribute');
        expect(output).to.have.a.property('Creation_date_and_time');
        expect(output).to.have.a.property('Export_source_file_name');
        expect(output).to.have.a.property('Export_source_file_library_name');
        expect(output).to.have.a.property('Export_source_file_member_name');
        expect(output).to.have.a.property('Activation_group_attribute');
        expect(output).to.have.a.property('Current_export_signature');
        expect(output).to.have.a.property('User_profile');
        expect(output).to.have.a.property('Observable_information_compressed');
        expect(output).to.have.a.property('Run-time_information_compressed');
        expect(output).to.have.a.property('Run-time_information_compressed');
        expect(output).to.have.a.property('Service_program_CCSID');
        expect(output).to.have.a.property('Number_of_modules');
        expect(output).to.have.a.property('Number_of_service_programs');
        expect(output).to.have.a.property('Number_of_copyrights');
        expect(output).to.have.a.property('Text_description');
        expect(output).to.have.a.property('Shared_activation_group');
        expect(output).to.have.a.property('Allow_update');
        expect(output).to.have.a.property('Number_of_unresolved_references');
        expect(output).to.have.a.property('Use_adopted_authority');
        expect(output).to.have.a.property('Allow_bound_*SRVPGM_library_name_update');
        expect(output).to.have.a.property('Profiling_data');
        expect(output).to.have.a.property('Teraspace_storage_enabled_modules');
        expect(output).to.have.a.property('Storage_model');
        expect(output).to.have.a.property('Uses_argument_optimization_(ARGOPT)');
        expect(output).to.have.a.property('Reserved_\'00\'X');
        expect(output).to.have.a.property('Service_program_state');
        expect(output).to.have.a.property('Service_program_domain');
        expect(output).to.have.a.property('Associated_space_size');
        expect(output).to.have.a.property('Static_storage_size');
        expect(output).to.have.a.property('Service_program_size');
        expect(output).to.have.a.property('Release_service_program_created_on');
        expect(output).to.have.a.property('Earliest_release_service_program_can_run');
        expect(output).to.have.a.property('Release_service_program_created_for');
        expect(output).to.have.a.property('Allow_static_storage_reinitialization');
        expect(output).to.have.a.property('Conversion_required');
        expect(output).to.have.a.property('All_creation_data');
        expect(output).to.have.a.property('Conversion_details');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Paging_pool');
        expect(output).to.have.a.property('Paging_amount');
        done();
      });
    });
  });

  describe('retrUserInfo', () => {
    it('returns specified user profile info', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.retrUserInfo('QSYS', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('User_profile_name');
        expect(output).to.have.a.property('Previous_sign-on_date_and_time');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Sign-on_attempts_not_valid');
        expect(output).to.have.a.property('Status');
        expect(output).to.have.a.property('Password_change_date');
        expect(output).to.have.a.property('No_password_indicator');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Password_expiration_interval');
        expect(output).to.have.a.property('Date_password_expires');
        expect(output).to.have.a.property('Days_until_password_expires');
        expect(output).to.have.a.property('Set_password_to_expire');
        expect(output).to.have.a.property('Display_sign-on_information');
        expect(output).to.have.a.property('Local_password_management');
        expect(output).to.have.a.property('Block_password_change');
        done();
      });
    });
  });

  describe('retrUsrAuthToObj', () => {
    it(`retrieves info for users who are authorized to an object using ${config.transport} transpsort`, (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.retrUserAuthToObj('/home', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Profile_name');
        expect(output).to.have.a.property('User_or_group_indicator');
        expect(output).to.have.a.property('Data_authority');
        expect(output).to.have.a.property('Authorization_list_management');
        expect(output).to.have.a.property('Object_management');
        expect(output).to.have.a.property('Object_existence');
        expect(output).to.have.a.property('Object_alter');
        expect(output).to.have.a.property('Object_reference');
        expect(output).to.have.a.property('Reserved');
        expect(output).to.have.a.property('Object_operational');
        expect(output).to.have.a.property('Data_read');
        expect(output).to.have.a.property('Data_add');
        expect(output).to.have.a.property('Data_update');
        expect(output).to.have.a.property('Data_delete');
        expect(output).to.have.a.property('Data_execute');
        done();
      });
    });
  });

  describe('addToLibraryList', () => {
    it('appends lib to user\'s lib list', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.addToLibraryList('QHTTPSVR', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.a('boolean').and.to.equal(true);
        done();
      });
    });
  });

  describe('UserSpace Functional Tests', () => {
    let userSpaceName;

    describe('createUserSpace', () => {
      it('creates a user space', (done) => {
        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        const description = 'Node toolkit test user space';

        const name = generateRandomName();

        toolkit.createUserSpace(name, lib, 'LOG', 50, '*EXCLUDE',
          description, (error, output) => {
            expect(error).to.equal(null);
            expect(output).to.be.a('boolean').and.to.equal(true);
            userSpaceName = name;
            done();
          });
      });
    });

    describe('setUserSpaceData', () => {
      it('sets data within the user space', (done) => {
        if (!userSpaceName) {
          this.skip();
        }

        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        const msg = 'Hello from userspace!';

        toolkit.setUserSpaceData(userSpaceName, lib, msg.length, msg,
          (error, output) => {
            expect(error).to.equal(null);
            expect(output).to.be.a('boolean').and.to.equal(true);
            done();
          });
      });
    });

    describe('getUserSpaceData', () => {
      it('returns specified length of data', (done) => {
        if (!userSpaceName) {
          this.skip();
        }

        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        toolkit.getUserSpaceData(userSpaceName, lib, 21, (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.be.a('string').and.to.equal('Hello from userspace!');
          done();
        });
      });
    });

    describe('deleteUserSpace', () => {
      it('removes a user space', (done) => {
        if (!userSpaceName) {
          this.skip();
        }
        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        toolkit.deleteUserSpace(userSpaceName, lib, (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.be.a('boolean').and.to.equal(true);
          done();
        });
      });
    });
  });

  describe('getSysValue', () => {
    it('returns the value of system variable', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.getSysValue('QCENTURY', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.a('string').and.to.equal('1');
        done();
      });
    });
  });

  describe('getSysStatus', () => {
    it('returns basic system status information about the signed-on users '
             + 'and batch jobs',
    (done) => {
      const connection = new Connection(config);
      const toolkit = new Toolkit(connection);

      toolkit.getSysStatus((error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Current_date_and_time');
        expect(output).to.have.a.property('System_name');
        expect(output).to.have.a.property('Users_currently_signed_on');
        expect(output).to.have.a.property('Users_temporarily_signed_off_(disconnected)');
        expect(output).to.have.a.property('Users_suspended_by_system_request');
        expect(output).to.have.a.property('Users_suspended_by_group_jobs');
        expect(output).to.have.a.property('Users_signed_off_with_printer_output_waiting_to_print');
        expect(output).to.have.a.property('Batch_jobs_waiting_for_messages');
        expect(output).to.have.a.property('Batch_jobs_running');
        expect(output).to.have.a.property('Batch_jobs_held_while_running');
        expect(output).to.have.a.property('Batch_jobs_ending');
        expect(output).to.have.a.property('Batch_jobs_waiting_to_run_or_already_scheduled');
        expect(output).to.have.a.property('Batch_jobs_held_on_a_job_queue');
        expect(output).to.have.a.property('Batch_jobs_on_a_held_job_queue');
        expect(output).to.have.a.property('Batch_jobs_on_an_unassigned_job_queue');
        expect(output).to.have.a.property('Batch_jobs_ended_with_printer_output_waiting_to_print');
        done();
      });
    });
  });

  describe('getSysStatusExt', () => {
    it('returns more detailed system status info',
      (done) => {
        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        toolkit.getSysStatusExt((error, output) => {
          expect(error).to.equal(null);
          expect(output).to.be.an('Object');
          expect(output).to.have.a.property('Current_date_and_time');
          expect(output).to.have.a.property('System_name');
          expect(output).to.have.a.property('Elapsed_time');
          expect(output).to.have.a.property('Restricted_state_flag');
          expect(output).to.have.a.property('%_processing_unit_used');
          expect(output).to.have.a.property('Jobs_in_system');
          expect(output).to.have.a.property('%_permanent_addresses');
          expect(output).to.have.a.property('%_temporary_addresses');
          expect(output).to.have.a.property('System_ASP');
          expect(output).to.have.a.property('%_system_ASP_used');
          expect(output).to.have.a.property('Total_auxiliary_storage');
          expect(output).to.have.a.property('Current_unprotected_storage_used');
          expect(output).to.have.a.property('Maximum_unprotected_storage_used');
          expect(output).to.have.a.property('%_DB_capability');
          expect(output).to.have.a.property('Main_storage_size');
          expect(output).to.have.a.property('Number_of_partitions');
          expect(output).to.have.a.property('Partition_identifier');
          expect(output).to.have.a.property('Current_processing_capacity');
          expect(output).to.have.a.property('Processor_sharing_attribute');
          expect(output).to.have.a.property('Number_of_processors');
          expect(output).to.have.a.property('Active_jobs_in_system');
          expect(output).to.have.a.property('Active_threads_in_system');
          expect(output).to.have.a.property('Maximum_jobs_in_system');
          expect(output).to.have.a.property('%_temporary_256MB_segments_used');
          expect(output).to.have.a.property('%_temporary_4GB_segments_used');
          expect(output).to.have.a.property('%_permanent_256MB_segments_used');
          expect(output).to.have.a.property('%_permanent_4GB_segments_used');
          expect(output).to.have.a.property('%_current_interactive_performance');
          expect(output).to.have.a.property('%_uncapped_CPU_capacity_used');
          expect(output).to.have.a.property('%_shared_processor_pool_used');
          expect(output).to.have.a.property('Main_storage_size_(long)');
          done();
        });
      });
  });

  describe('getJobStatus', () => {
    it('returns status of specified job',
      (done) => {
        const connection = new Connection(config);

        const toolkit = new Toolkit(connection);

        toolkit.getJobStatus('000000', (error, output) => {
          expect(error).to.equal(null);
          expect(output).to.be.an('Object');
          expect(output).to.have.a.property('Job_status');
          expect(output).to.have.a.property('Fully_qualified_job_name');
          done();
        });
      });
  });

  describe('getJobInfo', () => {
    it('returns info on specfed job', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.getJobInfo('SCPF', 'QSYS', '000000', (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Job_name');
        expect(output).to.have.a.property('User_name');
        expect(output).to.have.a.property('Job_number');
        expect(output).to.have.a.property('Job_status');
        expect(output).to.have.a.property('Job_type');
        expect(output).to.have.a.property('Job_subtype');
        expect(output).to.have.a.property('Subsystem_description_name');
        expect(output).to.have.a.property('Run_priority_(job)');
        expect(output).to.have.a.property('System_pool_identifier');
        expect(output).to.have.a.property('Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds');
        expect(output).to.have.a.property('Number_of_auxiliary_I/O_requests,_if_less_than_2,147,483,647');
        expect(output).to.have.a.property('Number_of_interactive_transactions');
        expect(output).to.have.a.property('Response_time_total');
        expect(output).to.have.a.property('Function_type');
        expect(output).to.have.a.property('Function_name');
        expect(output).to.have.a.property('Active_job_status');
        expect(output).to.have.a.property('Number_of_database_lock_waits');
        expect(output).to.have.a.property('Number_of_internal_machine_lock_waits');
        expect(output).to.have.a.property('Number_of_nondatabase_lock_waits');
        expect(output).to.have.a.property('Time_spent_on_database_lock_waits');
        expect(output).to.have.a.property('Time_spent_on_internal_machine_lock_waits');
        expect(output).to.have.a.property('Time_spent_on_nondatabase_lock_waits');
        expect(output).to.have.a.property('Current_system_pool_identifier');
        expect(output).to.have.a.property('Thread_count');
        expect(output).to.have.a.property('Processing_unit_time_used_-_total_for_the_job');
        expect(output).to.have.a.property('Number_of_auxiliary_I/O_requests');
        expect(output).to.have.a.property('Processing_unit_time_used_for_database_-_total_for_the_job');
        expect(output).to.have.a.property('Page_faults');
        expect(output).to.have.a.property('Active_job_status_for_jobs_ending');
        expect(output).to.have.a.property('Memory_pool_name');
        expect(output).to.have.a.property('Message_reply');
        expect(output).to.have.a.property('Message_key,_when_active_job_waiting_for_a_message');
        expect(output).to.have.a.property('Message_queue_name,_when_active_job_waiting_for_a_message');
        expect(output).to.have.a.property('Message_queue_library_name,_when_active_job_waiting_for_a_message');
        expect(output).to.have.a.property('Message_queue_library_ASP_device_name,_when_active_job_waiting_for_a_message');
        done();
      });
    });
  });

  describe('getDataArea', () => {
    before('check if data area exists for tests', (done) => {
      checkObjectExists(config, 'TESTDA', '*DTAARA', (error) => {
        if (error) { throw error; }
        done();
      });
    });
    it('returns contents of a data area', (done) => {
      const connection = new Connection(config);

      const toolkit = new Toolkit(connection);

      toolkit.getDataArea('NODETKTEST', 'TESTDA', 20, (error, output) => {
        expect(error).to.equal(null);
        expect(output).to.be.an('Object');
        expect(output).to.have.a.property('Type_of_value_returned');
        expect(output).to.have.a.property('Library_name');
        expect(output).to.have.a.property('Length_of_value_returned');
        expect(output).to.have.a.property('Number_of_decimal_positions');
        expect(output).to.have.a.property('Value');
        done();
      });
    });
  });
});
