// Copyright (c) International Business Machines Corp. 2017
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
// IN THE SOFTWARE.

const xt = require('./itoolkit');
const timeoutMsg = "Timeout!";
const retryInterval = 100;  // wait 0.1 second to retry to get result in sync mode.
let retryTimes = Math.round(xt.timeout / retryInterval); 

const sysvalArray = [
  {"type":"100A", "key":["QSSLPCL"]},
  {"type":"152A", "key":["QALWOBJRST", "QSYSLIBL"]},
  {"type":"160A", "key":["QAUDLVL", "QSETJOBATR"]},
  {"type":"200A", "key":["QSCANFS", "QSCANFSCTL"]},
  {"type":"252A", "key":["QUSRLIBL"]},
  {"type":"1280A", "key":["QSSLCSL"]},
  {"type":"52A", "key":["QAUDCTL"]},
  {"type":"316A", "key":["QBOOKPATH"]},
  {"type":"500A", "key":["QALWUSRDMN"]},
  {"type":"752A", "key":["QPWDRULES"]},
  {"type":"80A", "key":["QACGLVL"]},
  {"type":"992A", "key":["QAUDLVL2"]},
  {"type":"10i0", "key":["QACTJOB", "QADLACTJ", "QADLSPLA", "QADLTOTJ", "QAUDFRCLVL", "QAUTOVRT", "QBASACTLVL", "QBASPOOL", "QCCSID", "QENDJOBLMT", "QHSTLOGSIZ", "QIGCFNTSIZ", "QJOBMSGQMX", "QJOBMSGQSZ", "QJOBMSGQTL", "QJOBSPLA", "QLEAPADJ", "QMAXACTLVL", "QMAXJOB", "QMAXSPLF", "QMCHPOOL", "QPRBHLDITV", "QPWDEXPWRN", "QPWDLVL", "QPWDMAXLEN", "QPWDMINLEN", "QPWRDWNLMT", "QSTGLOWLMT", "QSVRAUTITV", "QTOTJOB"]},
  {"type":"4A", "key":["QABNORMSW", "QALWJOBITP", "QAUTOCFG", "QAUTORMT", "QAUTOSPRPT", "QCENTURY", "QCURSYM", "QDATSEP", "QDBRCVYWT", "QDECFMT", "QDSPSGNINF", "QDYNPTYADJ", "QDYNPTYSCD", "QFRCCVNRST", "QIGC", "QIPLSTS", "QIPLTYPE", "QLIBLCKLVL", "QLMTDEVSSN", "QLMTSECOFR", "QMAXSGNACN", "QMLTTHDACN", "QPFRADJ", "QPRCMLTTSK", "QPWDLMTAJC", "QPWDLMTREP", "QPWDPOSDIF", "QPWDRQDDGT", "QPWDRQDDIF", "QPWRRSTIPL", "QRETSVRSEC", "QRMTIPL", "QRMTSRVATR", "QSAVACCPTH", "QSCPFCONS", "QSHRMEMCTL", "QSTRPRTWTR", "QTHDRSCADJ", "QTIMSEP", "QVFYOBJRST"]},
  {"type":"12A", "key":["QASTLVL", "QAUDENDACN", "QCHRIDCTL", "QCMNARB", "QCONSOLE", "QCRTAUT", "QCRTOBJAUD", "QDBFSTCCOL", "QDEVNAMING", "QDSCJOBITV", "QINACTITV", "QJOBMSGQFL", "QKBDBUF", "QLOGOUTPUT", "QPASTHRSVR", "QPRTDEV", "QPRTKEYFMT", "QPWDCHGBLK", "QPWDLMTCHR", "QQRYDEGREE", "QQRYTIMLMT", "QRCLSPLSTG", "QSFWERRLOG", "QSPCENV", "QSPLFACN", "QSRVDMP", "QSSLCSLCTL", "QSTGLOWACN", "QSTSMSG", "QTIMZON", "QTSEPOOL", "QUSEADPAUT"]},
  {"type":"16A", "key":["QIPLDATTIM"]},
  {"type":"4A", "key":["QCNTRYID", "QHOUR", "QMINUTE", "QMONTH", "QSECOND", "QSECURITY", "QYEAR"]},
  {"type":"20A", "key":["QATNPGM", "QCFGMSGQ", "QCHRID", "QCMNRCYLMT", "QCTLSBSD", "QDATETIME", "QDEVRCYACN", "QIGCCDEFNT", "QINACTMSGQ", "QPRBFTR", "QPWDVLDPGM", "QRMTSIGN", "QSRTSEQ", "QSTRUPPGM", "QTHDRSCAFN", "QUPSDLYTIM", "QUPSMSGQ"]},
  {"type":"2076A", "key":["QLOCALE"]},
  {"type":"4A", "key":["QDATFMT", "QDAY", "QKBDTYPE", "QLANGID"]},
  {"type":"32A", "key":["QPRTTXT", "QTIMADJ"]},
  {"type":"4A", "key":["QDAYOFWEEK", "QMODEL", "QPRCFEAT"]},
  {"type":"8A", "key":["QUTCOFFSET"]},
  {"type":"8A", "key":["QMAXSIGN", "QPWDEXPITV"]},
  {"type":"8A", "key":["QDATE"]},
  {"type":"8A", "key":["QSRLNBR"]},
  {"type":"12A", "key":["QTIME"]}
];

class iWork {
  constructor(conn) {
    this.conn = conn;  //Pass in the connection object.
    this.errno = [
      [0, "10i0"],
      [0, "10i0", {"setlen":"rec2"}],
      ["", "7A"],
      ["", "1A"]
    ];
  }
  
  getSysValue(sysValue, cb) {
    let keyValid = false;
    let type = "10i0";
    for(let i in sysvalArray) {
      for(let j in sysvalArray[i].key) {
        if(sysValue == sysvalArray[i].key[j]) {
          keyValid = true;
          type = sysvalArray[i].type;
          break;
        }
      }
    }
    if(keyValid == false)
      return "Invalid System Value Name.";
    
    let item;
    if(type == "10i0")
      item = [0, "10i0"];
    else
      item = ["", type];
      
    let outBuf = [
      [0, "10i0"],  //Number of system values returned
      [0, "10i0"],  //Offset to system value information table
      ["", "10A"],  //System value
      ["", "1A"],   //Type of data(C--character / B--binary / blank--not available.)
      ["", "1A"],   //Information status(blank--The information was available.)
      [0, "10i0"],  //Length of data
      item
    ];
    
    let pgm = new xt.iPgm("QWCRSVAL", {"lib":"QSYS"});
    pgm.addParam(outBuf, {"io":"out", "len":"rec1"});  //Receiver buffer
    pgm.addParam(0, "10i0", {"setlen":"rec1"});  //Length of the receiver buffer
    pgm.addParam(1, "10i0");  //Number of system values to retrieve
    pgm.addParam(sysValue, "10A");  //System value name
    pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});  //Error code

    this.conn.add(pgm.toXML());
    
    let async = cb && xt.getClass(cb) == "Function";
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => {
      let output = xt.xmlToJson(str);
      if(output[0].hasOwnProperty("success") && output[0].success == true) 
        rtValue = output[0].data[6].value;  //Get the returned value from the output array.
      else
        rtValue = str;
      if(async)	// If it is in asynchronized mode.
        cb(rtValue);  // Run the call back function against the returned value.
      stop = 1;
    }
    const waitForResult = () => {
      retry++;
      if(stop == 0)
        setTimeout(waitForResult, retryInterval);  // Check whether the result is retrieved
      else if(retry >= retryTimes)
        return timeoutMsg;
      else
        return rtValue;
    }
    this.conn.run(toJson, !async);  // Post the input XML and get the response.
    if(!async)  // If it is in synchronized mode.
      return waitForResult();  // Run the user defined call back function against the returned value.
  }

  getSysStatus(cb) {
    let outBuf = [
      [0, "10i0"],	// [0]Bytes available
      [0, "10i0"],	// [1]Bytes returned
      ["", "8A"],	// [2]Current date and time
      ["", "8A"],	// [3]System name
      [0, "10i0"],	// [4]Users currently signed on
      [0, "10i0"],	// [5]Users temporarily signed off (disconnected)
      [0, "10i0"],	// [6]Users suspended by system request
      [0, "10i0"],	// [7]Users suspended by group jobs
      [0, "10i0"],	// [8]Users signed off with printer output waiting to print
      [0, "10i0"],	// [9]Batch jobs waiting for messages
      [0, "10i0"],	// [10]Batch jobs running
      [0, "10i0"],	// [11]Batch jobs held while running
      [0, "10i0"],	// [12]Batch jobs ending
      [0, "10i0"],	// [13]Batch jobs waiting to run or already scheduled
      [0, "10i0"],	// [14]Batch jobs held on a job queue
      [0, "10i0"],	// [15]Batch jobs on a held job queue
      [0, "10i0"],	// [16]Batch jobs on an unassigned job queue
      [0, "10i0"],	// [17]Batch jobs ended with printer output waiting to print
    ];
    let pgm = new xt.iPgm("QWCRSSTS", {"lib":"QSYS"});
    pgm.addParam(outBuf, {"io":"out", "len":"rec1"});
    pgm.addParam(0, "10i0", {"setlen":"rec1"});
    pgm.addParam("SSTS0100", "8A");
    pgm.addParam("*NO", "10A");
    pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

    this.conn.add(pgm.toXML());
    
    let async = cb && xt.getClass(cb) == "Function";
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => {
      let output = xt.xmlToJson(str);
      if(output[0].hasOwnProperty("success") && output[0].success == true) {
        rtValue = {
          "Current_date_and_time":output[0].data[2].value,
          "System_name":output[0].data[3].value,
          "Users_currently_signed_on":output[0].data[4].value,
          "Users_temporarily_signed_off_(disconnected)":output[0].data[5].value,
          "Users_suspended_by_system_request":output[0].data[6].value,
          "Users_suspended_by_group_jobs":output[0].data[7].value,
          "Users_signed_off_with_printer_output_waiting_to_print":output[0].data[8].value,
          "Batch_jobs_waiting_for_messages":output[0].data[9].value,
          "Batch_jobs_running":output[0].data[10].value,
          "Batch_jobs_held_while_running":output[0].data[11].value,
          "Batch_jobs_ending":output[0].data[12].value,
          "Batch_jobs_waiting_to_run_or_already_scheduled":output[0].data[13].value,
          "Batch_jobs_held_on_a_job_queue":output[0].data[14].value,
          "Batch_jobs_on_a_held_job_queue":output[0].data[15].value,
          "Batch_jobs_on_an_unassigned_job_queue":output[0].data[16].value,
          "Batch_jobs_ended_with_printer_output_waiting_to_print":output[0].data[17].value,
        };
      }
      else
        rtValue = str;
      if(async)
        cb(rtValue);
      stop = 1;
    }
    const waitForResult = () => {
      retry++;
      if(stop == 0)
        setTimeout(waitForResult, retryInterval);
      else if(retry >= retryTimes)
        return timeoutMsg;
      else
        return rtValue;
    }
    this.conn.run(toJson, !async);
    if(!async)
      return waitForResult();
  }

  getSysStatusExt(cb) {
    let outBuf = [
      [0, "10i0"],	// [0]Bytes available
      [0, "10i0"],	// [1]Bytes returned
      ["", "8A"],	// [2]Current date and time
      ["", "8A"],	// [3]System name
      ["", "6A"],	// [4]Elapsed time
      ["", "1A"],	// [5]Restricted state flag
      ["", "1A"],	// [6]Reserved
      [0, "10i0"],	// [7]% processing unit used
      [0, "10i0"],	// [8]Jobs in system
      [0, "10i0"],	// [9]% permanent addresses
      [0, "10i0"],	// [10]% temporary addresses
      [0, "10i0"],	// [11]System ASP
      [0, "10i0"],	// [12]% system ASP used
      [0, "10i0"],	// [13]Total auxiliary storage
      [0, "10i0"],	// [14]Current unprotected storage used
      [0, "10i0"],	// [15]Maximum unprotected storage used
      [0, "10i0"],	// [16]% DB capability
      [0, "10i0"],	// [17]Main storage size
      [0, "10i0"],	// [18]Number of partitions
      [0, "10i0"],	// [19]Partition identifier
      [0, "10i0"],	// [20]Reserved
      [0, "10i0"],	// [21]Current processing capacity
      ["", "1A"],	// [22]Processor sharing attribute
      ["", "3A"],	// [23]Reserved
      [0, "10i0"],	// [24]Number of processors
      [0, "10i0"],	// [25]Active jobs in system
      [0, "10i0"],	// [26]Active threads in system
      [0, "10i0"],	// [27]Maximum jobs in system
      [0, "10i0"],	// [28]% temporary 256MB segments used
      [0, "10i0"],	// [29]% temporary 4GB segments used
      [0, "10i0"],	// [30]% permanent 256MB segments used
      [0, "10i0"],	// [31]% permanent 4GB segments used
      [0, "10i0"],	// [32]% current interactive performance
      [0, "10i0"],	// [33]% uncapped CPU capacity used
      [0, "10i0"],	// [34]% shared processor pool used
      [0, "20u0"],	// [35]Main storage size (long)
    ];
    let pgm = new xt.iPgm("QWCRSSTS", {"lib":"QSYS"});
    pgm.addParam(outBuf, {"io":"out", "len":"rec1"});
    pgm.addParam(0, "10i0", {"setlen":"rec1"});
    pgm.addParam("SSTS0200", "8A");
    pgm.addParam("*NO", "10A");
    pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

    this.conn.add(pgm.toXML());
    
    let async = cb && xt.getClass(cb) == "Function";
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => {
      let output = xt.xmlToJson(str);
      if(output[0].hasOwnProperty("success") && output[0].success == true) {
        rtValue = {
          "Current_date_and_time":output[0].data[2].value,
          "System_name":output[0].data[3].value,
          "Elapsed_time":output[0].data[4].value,
          "Restricted_state_flag":output[0].data[5].value,
          "%_processing_unit_used":output[0].data[7].value,
          "Jobs_in_system":output[0].data[8].value,
          "%_permanent_addresses":output[0].data[9].value,
          "%_temporary_addresses":output[0].data[10].value,
          "System_ASP":output[0].data[11].value,
          "%_system_ASP_used":output[0].data[12].value,
          "Total_auxiliary_storage":output[0].data[13].value,
          "Current_unprotected_storage_used":output[0].data[14].value,
          "Maximum_unprotected_storage_used":output[0].data[15].value,
          "%_DB_capability":output[0].data[16].value,
          "Main_storage_size":output[0].data[17].value,
          "Number_of_partitions":output[0].data[18].value,
          "Partition_identifier":output[0].data[19].value,
          "Current_processing_capacity":output[0].data[21].value,
          "Processor_sharing_attribute":output[0].data[22].value,
          "Number_of_processors":output[0].data[24].value,
          "Active_jobs_in_system":output[0].data[25].value,
          "Active_threads_in_system":output[0].data[26].value,
          "Maximum_jobs_in_system":output[0].data[27].value,
          "%_temporary_256MB_segments_used":output[0].data[28].value,
          "%_temporary_4GB_segments_used":output[0].data[29].value,
          "%_permanent_256MB_segments_used":output[0].data[30].value,
          "%_permanent_4GB_segments_used":output[0].data[31].value,
          "%_current_interactive_performance":output[0].data[32].value,
          "%_uncapped_CPU_capacity_used":output[0].data[33].value,
          "%_shared_processor_pool_used":output[0].data[34].value,
          "Main_storage_size_(long)":output[0].data[35].value,				
        };
      }
      else
        rtValue = str;
      if(async)
        cb(rtValue);
      stop = 1;
    }
    const waitForResult = () => {
      retry++;
      if(stop == 0)
        setTimeout(waitForResult, retryInterval);
      else if(retry >= retryTimes)
        return timeoutMsg;
      else
        return rtValue;
    }
    this.conn.run(toJson, !async);
    if(!async)
      return waitForResult();
  }

  getJobStatus(jobId, cb) {
    let outBuf = [
      [0, "10i0"],	// [0]Bytes returned
      [0, "10i0"],	// [1]Bytes available
      ["", "10A"],	// [2]Job status
      ["", "16h"],	// [3]Internal job identifier
      ["", "26A"],	// [4]Fully qualified job name
    ];
    let pgm = new xt.iPgm("QWCRJBST", {"lib":"QSYS"});
    pgm.addParam(outBuf, {"io":"out", "len":"rec1"});
    pgm.addParam(0, "10i0", {"setlen":"rec1"});
    pgm.addParam(jobId, "6A");
    pgm.addParam("JOBS0100", "8A");
    pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

    this.conn.add(pgm.toXML());
    
    let async = cb && xt.getClass(cb) == "Function";
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => {
      let output = xt.xmlToJson(str);
      if(output[0].hasOwnProperty("success") && output[0].success == true) {
        rtValue = {
          "Job_status":output[0].data[2].value,
          "Fully_qualified_job_name":output[0].data[4].value,
        };
      }
      else
        rtValue = str;
      if(async)
        cb(rtValue);
      stop = 1;
    }
    const waitForResult = () => {
      retry++;
      if(stop == 0)
        setTimeout(waitForResult, retryInterval);
      else if(retry >= retryTimes)
        return timeoutMsg;
      else
        return rtValue;
    }
    this.conn.run(toJson, !async);
    if(!async)
      return waitForResult();
  }

  getJobInfo(jobName, userName, jobNumber, cb) {
    let outBuf = [
      [0, "10i0"],	// [0]Number of bytes returned
      [0, "10i0"],	// [1]Number of bytes available
      ["", "10A"],	// [2]Job name
      ["", "10A"],	// [3]User name
      ["", "6A"],	// [4]Job number
      ["", "16h"],	// [5]Internal job identifier
      ["", "10A"],	// [6]Job status
      ["", "1A"],	// [7]Job type
      ["", "1A"],	// [8]Job subtype
      ["", "10A"],	// [9]Subsystem description name
      [0, "10i0"],	// [10]Run priority (job)
      [0, "10i0"],	// [11]System pool identifier
      [0, "10i0"],	// [12]Processing unit time used, if less than 2,147,483,647 milliseconds
      [0, "10i0"],	// [13]Number of auxiliary I/O requests, if less than 2,147,483,647
      [0, "10i0"],	// [14]Number of interactive transactions
      [0, "10i0"],	// [15]Response time total
      ["", "1A"],	// [16]Function type
      ["", "10A"],	// [17]Function name
      ["", "4A"],	// [18]Active job status
      [0, "10i0"],	// [19]Number of database lock waits
      [0, "10i0"],	// [20]Number of internal machine lock waits
      [0, "10i0"],	// [21]Number of nondatabase lock waits
      [0, "10i0"],	// [22]Time spent on database lock waits
      [0, "10i0"],	// [23]Time spent on internal machine lock waits
      [0, "10i0"],	// [24]Time spent on nondatabase lock waits
      ["", "1A"],	// [25]Reserved
      [0, "10i0"],	// [26]Current system pool identifier
      [0, "10i0"],	// [27]Thread count
      [0, "20u0"],	// [28]Processing unit time used - total for the job
      [0, "20u0"],	// [29]Number of auxiliary I/O requests
      [0, "20u0"],	// [30]Processing unit time used for database - total for the job
      [0, "20u0"],	// [31]Page faults
      ["", "4A"],	// [32]Active job status for jobs ending
      ["", "10A"],	// [33]Memory pool name
      ["", "1A"],	// [34]Message reply
      ["", "4A"],	// [35]Message key, when active job waiting for a message
      ["", "10A"],	// [36]Message queue name, when active job waiting for a message
      ["", "10A"],	// [37]Message queue library name, when active job waiting for a message
      ["", "10A"],	// [38]Message queue library ASP device name, when active job waiting for a message
    ];
    let JobId = [
      [jobName, "10A"],
      [userName, "10A"],
      [jobNumber, "6A"],
    ];
    let pgm = new xt.iPgm("QUSRJOBI", {"lib":"QSYS"});
    pgm.addParam(outBuf, {"io":"out", "len":"rec1"});
    pgm.addParam(0, "10i0", {"setlen":"rec1"});
    pgm.addParam("JOBI0200", "8A");
    pgm.addParam(JobId);
    pgm.addParam("", "16A");
    pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

    this.conn.add(pgm.toXML());
    
    let async = cb && xt.getClass(cb) == "Function";
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => {
      let output = xt.xmlToJson(str);
      if(output[0].hasOwnProperty("success") && output[0].success == true) {
        rtValue = {
          "Job_name":output[0].data[2].value,
          "User_name":output[0].data[3].value,
          "Job_number":output[0].data[4].value,
          "Job_status":output[0].data[6].value,
          "Job_type":output[0].data[7].value,
          "Job_subtype":output[0].data[8].value,
          "Subsystem_description_name":output[0].data[9].value,
          "Run_priority_(job)":output[0].data[10].value,
          "System_pool_identifier":output[0].data[11].value,
          "Processing_unit_time_used,_if_less_than_2,147,483,647_milliseconds":output[0].data[12].value,
          "Number_of_auxiliary_I/O_requests,_if_less_than_2,147,483,647":output[0].data[13].value,
          "Number_of_interactive_transactions":output[0].data[14].value,
          "Response_time_total":output[0].data[15].value,
          "Function_type":output[0].data[16].value,
          "Function_name":output[0].data[17].value,
          "Active_job_status":output[0].data[18].value,
          "Number_of_database_lock_waits":output[0].data[19].value,
          "Number_of_internal_machine_lock_waits":output[0].data[20].value,
          "Number_of_nondatabase_lock_waits":output[0].data[21].value,
          "Time_spent_on_database_lock_waits":output[0].data[22].value,
          "Time_spent_on_internal_machine_lock_waits":output[0].data[23].value,
          "Time_spent_on_nondatabase_lock_waits":output[0].data[24].value,
          "Current_system_pool_identifier":output[0].data[26].value,
          "Thread_count":output[0].data[27].value,
          "Processing_unit_time_used_-_total_for_the_job":output[0].data[28].value,
          "Number_of_auxiliary_I/O_requests":output[0].data[29].value,
          "Processing_unit_time_used_for_database_-_total_for_the_job":output[0].data[30].value,
          "Page_faults":output[0].data[31].value,
          "Active_job_status_for_jobs_ending":output[0].data[32].value,
          "Memory_pool_name":output[0].data[33].value,
          "Message_reply":output[0].data[34].value,
          "Message_key,_when_active_job_waiting_for_a_message":output[0].data[35].value,
          "Message_queue_name,_when_active_job_waiting_for_a_message":output[0].data[36].value,
          "Message_queue_library_name,_when_active_job_waiting_for_a_message":output[0].data[37].value,
          "Message_queue_library_ASP_device_name,_when_active_job_waiting_for_a_message":output[0].data[38].value,
        };
      }
      else
        rtValue = str;
      if(async)
        cb(rtValue);
      stop = 1;
    }
    const waitForResult = () => {
      retry++;
      if(stop == 0)
        setTimeout(waitForResult, retryInterval);
      else if(retry >= retryTimes)
        return timeoutMsg;
      else
        return rtValue;
    }
    this.conn.run(toJson, !async);
    if(!async)
      return waitForResult();
  }

  getDataArea(lib, area, length, cb) {
    let outBuf = [
      [0, "10i0"],	// [0]Bytes available
      [0, "10i0"],	// [1]Bytes returned
      ["", "10A"],	// [2]Type of value returned
      ["", "10A"],	// [3]Library name
      [0, "10i0"],	// [4]Length of value returned
      [0, "10i0"],	// [5]Number of decimal positions
      ["", length + "A"]	// [6]Value
    ];
    let areaPath = [
      [area, "10A"],
      [lib, "10A"]
    ];
    let pgm = new xt.iPgm("QWCRDTAA", {"lib":"QSYS"});
    pgm.addParam(outBuf, {"io":"out"});
    pgm.addParam(length + 36, "10i0");
    pgm.addParam(areaPath);
    pgm.addParam(1, "10i0");
    pgm.addParam(length, "10i0");
    pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

    this.conn.add(pgm.toXML());
    let async = cb && xt.getClass(cb) == "Function";
    let rtValue;
    let stop = 0;
    let retry = 0;
    const toJson = (str) => {
      let output = xt.xmlToJson(str);
      if(output[0].hasOwnProperty("success") && output[0].success == true) {
        rtValue = {
          "Type_of_value_returned":output[0].data[2].value,
          "Library_name":output[0].data[3].value,
          "Length_of_value_returned":output[0].data[4].value,
          "Number_of_decimal_positions":output[0].data[5].value,
          "Value":output[0].data[6].value,
        };
      }
      else
        rtValue = str;
      if(async)
        cb(rtValue);
      stop = 1;
    }
    const waitForResult = () => {
      retry++;
      if(stop == 0)
        setTimeout(waitForResult, retryInterval);
      else if(retry >= retryTimes)
        return timeoutMsg;
      else
        return rtValue;
    }
    this.conn.run(toJson, !async);
    if(!async)
      return waitForResult();
  }
} 

exports.iWork = iWork;