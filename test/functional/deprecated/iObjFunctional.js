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
const { iConn, iObj } = require('../../../lib/itoolkit');

const { config } = require('../config');

if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const { database, username, password } = config.transportOptions;

let restOptions = null;

if (config.transport === 'rest') {
  restOptions = config.restOptions;
}

describe('iObj Functional Tests', () => {
  describe('constructor', () => {
    it('creates and returns an instance of iObj', () => {
      const connection = new iConn(database, config.user, password);

      const obj = new iObj(connection);

      expect(obj).to.be.instanceOf(iObj);
    });
  });

  describe('retrUsrAuth', () => {
    it(`returns uses's authority for an object using ${config.transport} tranport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const obj = new iObj(connection);

      obj.retrUsrAuth('*PUBLIC', '*PGM', 'XMLCGI', 'QXMLSERV', (output) => {
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
    it(`returns command info using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const obj = new iObj(connection);

      obj.retrCmdInfo('CRTLIB', '*LIBL', (output) => {
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
    it(`returns program info using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const obj = new iObj(connection);

      obj.retrPgmInfo('XMLCGI', 'QXMLSERV', (output) => {
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
    it(`returns service program info using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const obj = new iObj(connection);

      obj.retrSrvPgmInfo('QZSRVSSL', 'QHTTPSVR', (output) => {
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
    it(`returns specified user profile info using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const obj = new iObj(connection);

      obj.retrUserInfo('QSYS', (output) => {
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
      const connection = new iConn(database, username, password, restOptions);

      const obj = new iObj(connection);

      obj.retrUserAuthToObj('/home', (output) => {
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
    it(`appends lib to user's lib list using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const obj = new iObj(connection);

      obj.addToLibraryList('QHTTPSVR', (output) => {
        expect(output).to.be.a('boolean').and.to.equal(true);
        done();
      });
    });
  });
});
