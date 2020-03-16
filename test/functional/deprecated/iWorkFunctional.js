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
const { iConn, iWork } = require('../../../lib/itoolkit');
const { config } = require('../config');

if (config.transport !== 'idb' && config.transport !== 'rest') {
  throw new Error('Only idb and rest transports are available for deprecated tests');
}

const { database, username, password } = config.transportOptions;

let restOptions = null;

if (config.transport === 'rest') {
  restOptions = config.restOptions;
}

describe('iWork Functional Tests', () => {
  describe('constructor', () => {
    it('creates and returns an instance of iWork', () => {
      const connection = new iConn(database, config.user, password);

      const work = new iWork(connection);

      expect(work).to.be.instanceOf(iWork);
    });
  });

  describe('getSysValue', () => {
    it(`returns the value of system variable using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const work = new iWork(connection);

      work.getSysValue('QCENTURY', (output) => {
        expect(output).to.be.a('string').and.to.equal('1');
        done();
      });
    });
  });

  describe('getSysStatus', () => {
    it('returns basic system status information about the signed-on users '
           + `and batch jobs using ${config.transport} transport`,
    (done) => {
      const connection = new iConn(database, username, password, restOptions);
      const work = new iWork(connection);

      work.getSysStatus((output) => {
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
    it(`returns more detailed system status info using ${config.transport} transport`,
      (done) => {
        const connection = new iConn(database, username, password, restOptions);

        const work = new iWork(connection);

        work.getSysStatusExt((output) => {
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
    it(`returns status of specified job using ${config.transport} transport`,
      (done) => {
        const connection = new iConn(database, username, password, restOptions);

        const work = new iWork(connection);

        work.getJobStatus('000000', (output) => {
          expect(output).to.be.an('Object');
          expect(output).to.have.a.property('Job_status');
          expect(output).to.have.a.property('Fully_qualified_job_name');
          done();
        });
      });
  });

  describe('getJobInfo', () => {
    it(`returns info on specfed job using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const work = new iWork(connection);

      work.getJobInfo('SCPF', 'QSYS', '000000', (output) => {
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
    before('init lib, data area, and add data', async () => {
      // eslint-disable-next-line global-require
      const { DBPool } = require('idb-pconnector');
      const pool = new DBPool({ url: '*LOCAL' }, { incrementSize: 2 });

      const qcmdexec = 'CALL QSYS2.QCMDEXC(?)';
      const lib = 'NODETKTEST';
      const dataArea = 'TESTDA';

      const createLib = `CRTLIB LIB(${lib}) TYPE(*TEST) TEXT('Used to test' Node.js toolkit')`;

      const createDataArea = `CRTDTAARA DTAARA(${lib}/${dataArea}) TYPE(*CHAR) `
                          + 'TEXT(\'TEST DATA AREA FOR NODE TOOLKIT\') '
                          + 'VALUE(\'Hello From Test Data Area!\')';

      const findLib = 'SELECT SCHEMA_NAME FROM qsys2.sysschemas WHERE SCHEMA_NAME = \'NODETKTEST\'';

      const findDataArea = `SELECT OBJNAME FROM TABLE (QSYS2.OBJECT_STATISTICS('${lib}', '*DTAARA')) AS X`;

      const libResult = await pool.runSql(findLib);

      const dataAreaResult = await pool.runSql(findDataArea);

      if (!libResult.length) {
        await pool.prepareExecute(qcmdexec, [createLib]).catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Unable to Create Lib!');
          throw error;
        });
        // eslint-disable-next-line no-console
        console.log('CREATED LIB!');
      }
      if (!dataAreaResult.length) {
        await pool.prepareExecute(qcmdexec, [createDataArea]).catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Unable to Create DA!');
          throw error;
        });
        // eslint-disable-next-line no-console
        console.log('CREATED DA!');
      }
    });
    it(`returns contents of a data area using ${config.transport} transport`, (done) => {
      const connection = new iConn(database, username, password, restOptions);

      const work = new iWork(connection);

      work.getDataArea('NODETKTEST', 'TESTDA', 20, (output) => {
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
