// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

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

const xt = require('./itoolkit');

const timeoutMsg = 'Timeout!';
const retryInterval = 100; // wait 0.1 second to retry to get result in sync mode.
const retryTimes = Math.round(xt.timeout / retryInterval);

class iObj {
  constructor(conn) {
    this.conn = conn; // Pass in the connection object.
    this.errno = [
      [0, '10i0'],
      [0, '10i0', { setlen: 'rec2' }],
      ['', '7A'],
      ['', '1A'],
    ];
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
    const pgm = new xt.iPgm('QSYRUSRA', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('USRA0100', '8A');
    pgm.addParam(usr, '10A');
    pgm.addParam([[obj, '10A'], [lib, '10A']]);
    pgm.addParam(type, '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue; // The returned value.
    let stop = 0; // A flag indicating whether the process is finished.
    let retry = 0; // How many times we have retried.
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (output[0].success) {
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
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };
    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };
    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
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
    const pgm = new xt.iPgm('QCDRCMDI', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('CMDI0100', '8A');
    pgm.addParam([[cmd, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (output[0].success) {
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
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };
    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };
    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult();
    } // Run the user defined call back function against the returned value.

    return null; // TODO: eslint consistent-return
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
    const pgm = new xt.iPgm('QCLRPGMI', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('PGMI0100', '8A');
    pgm.addParam([[_pgm, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (output[0].success) {
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
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };
    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };
    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
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
    const pgm = new xt.iPgm('QBNRSPGM', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('SPGI0100', '8A');
    pgm.addParam([[srvpgm, '10A'], [lib, '10A']]);
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (output[0].success) {
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
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };

    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };

    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
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
    const pgm = new xt.iPgm('QSYRUSRI', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam('USRI0100', '8A');
    pgm.addParam(user, '10A');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (output[0].success) {
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
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };

    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };

    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
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

    const pgm = new xt.iPgm('QSYRTVUA', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam(outBuf, { io: 'out', len: 'rec1' });
    pgm.addParam(0, '10i0', { setlen: 'rec1' });
    pgm.addParam(feedBack, { io: 'out', len: 'rec3' });
    pgm.addParam(0, '10i0', { setlen: 'rec3' });
    pgm.addParam('RTUA0100', '8A');
    pgm.addParam(path, `${path.length}A`);
    pgm.addParam(path.length, '10i0');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });
    this.conn.add(pgm.toXML());

    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (output[0].success) {
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
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };

    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };

    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
  }

  addToLibraryList(Lib, cb) {
    const pgm = new xt.iPgm('QLICHGLL', { lib: 'QSYS' }); // eslint-disable-line new-cap
    pgm.addParam('*SAME', '11A');
    pgm.addParam('*SAME', '11A');
    pgm.addParam('*SAME', '11A');
    pgm.addParam(Lib, '11A');
    pgm.addParam(1, '10i0');
    pgm.addParam(this.errno, { io: 'both', len: 'rec2' });

    this.conn.add(pgm.toXML());
    const async = cb && xt.getClass(cb) === 'Function'; // If there is a callback function param, then it is in asynchronized mode.
    let rtValue; // The returned value.
    let stop = 0; // A flag indicating whether the process is finished.
    let retry = 0; // How many times we have retried.
    const toJson = (str) => { // Convert the XML output into JSON
      const output = xt.xmlToJson(str);
      if (output[0].success) { rtValue = true; } else { rtValue = str; }
      if (async) { // If it is in asynchronized mode.
        cb(rtValue); // Run the call back function against the returned value.
      }
      stop = 1;
    };

    const waitForResult = () => {
      retry += 1;
      if (stop === 0) {
        setTimeout(waitForResult, retryInterval);
        return null;
      }
      if (retry >= retryTimes) {
        return timeoutMsg;
      }

      return rtValue;
    };

    this.conn.run(toJson, !async); // Post the input XML and get the response.
    if (!async) { // If it is in synchronized mode.
      return waitForResult(); // Run the user defined call back function against the returned value.
    }

    return null; // TODO: eslint consistent-return
  }
}

exports.iObj = iObj;
