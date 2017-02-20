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

var xt = require('./itoolkit');
var timeoutMsg = "Timeout!";
var retryInterval = 100;  // wait 0.1 second to retry to get result in sync mode.
var retryTimes = Math.round(xt.timeout / retryInterval); 

function iNetwork(conn) {
	this.conn = conn;  //Pass in the connection object.
	this.errno = [
		[0, "10i0"],
		[0, "10i0", {"setlen":"rec2"}],
		["", "7A"],
		["", "1A"]
	];
}

function IPToNum(ip)   
{  
    var num = 0;
    ip = ip.split(".");
    num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
    num = num >>> 0;
    return num;
}  

iNetwork.prototype.getTCPIPAttr= function(cb){
	var outBuf = [
		[0, "10i0"],	// [0]Bytes returned
		[0, "10i0"],	// [1]Bytes available
		[0, "10i0"],	// [2]TCP/IPv4 stack status
		[0, "10i0"],	// [3]How long active
		["", "8A"],	// [4]When last started - date
		["", "6A"],	// [5]When last started - time
		["", "8A"],	// [6]When last ended - date
		["", "6A"],	// [7]When last ended - time
		["", "10A"],	// [8]Who last started - job name
		["", "10A"],	// [9]Who last started - job user name
		["", "6A"],	// [10]Who last started - job number
		["", "16h"],	// [11]Who last started - internal job identifier
		["", "10A"],	// [12]Who last ended - job name
		["", "10A"],	// [13]Who last ended - job user name
		["", "6A"],	// [14]Who last ended - job number
		["", "16h"],	// [15]Who last ended - internal job identifier
		[0, "10i0"],	// [16]Offset to additional information
		[0, "10i0"],	// [17]Length of additional information
		[0, "10i0"],	// [18]Limited mode
		[0, "10i0"],	// [19]Offset to list of Internet addresses
		[0, "10i0"],	// [20]Number of Internet addresses
		[0, "10i0"],	// [21]Entry length for list of Internet addresses
		[0, "10i0"],	// [22]DNS protocol
		[0, "10i0"],	// [23]Retries
		[0, "10i0"],	// [24]Time interval
		[0, "10i0"],	// [25]Search order
		[0, "10i0"],	// [26]Initial domain name server
		[0, "10i0"],	// [27]DNS listening port
		["", "64A"],	// [28]Host name
		["", "255A"],	// [29]Domain name
		["", "1A"],	// [30]Reserved
		["", "256A"],	// [31]Domain search list
	];
	                                                          
	var pgm = new xt.iPgm("QTOCNETSTS", {"lib":"QSYS","func":"QtocRtvTCPA"});
	pgm.addParam(outBuf, {"io":"out", "len":"rec1"});
	pgm.addParam(0, "10i0", {"setlen":"rec1"});
	pgm.addParam("TCPA0300", "8A");
	pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});
	this.conn.add(pgm.toXML());
	
	var async = cb && xt.getClass(cb) == "Function"; //If there is a callback function param, then it is in asynchronized mode.
	var rtValue;  // The returned value.
	var stop = 0;  // A flag indicating whether the process is finished.
	var retry = 0;  // How many times we have retried.
	function toJson(str) {  // Convert the XML output into JSON
		var output = xt.xmlToJson(str);
		if(output[0].hasOwnProperty("success") && output[0].success == true)
			rtValue = {
				"TCP/IPv4_stack_status":output[0].data[2].value,
				"How_long_active":output[0].data[3].value,
				"When_last_started_-_date":output[0].data[4].value,
				"When_last_started_-_time":output[0].data[5].value,
				"When_last_ended_-_date":output[0].data[6].value,
				"When_last_ended_-_time":output[0].data[7].value,
				"Who_last_started_-_job_name":output[0].data[8].value,
				"Who_last_started_-_job_user_name":output[0].data[9].value,
				"Who_last_started_-_job_number":output[0].data[10].value,
				"Who_last_started_-_internal_job_identifier":output[0].data[11].value,
				"Who_last_ended_-_job_name":output[0].data[12].value,
				"Who_last_ended_-_job_user_name":output[0].data[13].value,
				"Who_last_ended_-_job_number":output[0].data[14].value,
				"Who_last_ended_-_internal_job_identifier":output[0].data[15].value,
				"Offset_to_additional_information":output[0].data[16].value,
				"Length_of_additional_information":output[0].data[17].value,
				"Limited_mode":output[0].data[18].value,
				"Offset_to_list_of_Internet_addresses":output[0].data[19].value,
				"Number_of_Internet_addresses":output[0].data[20].value,
				"Entry_length_for_list_of_Internet_addresses":output[0].data[21].value,
				"DNS_protocol":output[0].data[22].value,
				"Retries":output[0].data[23].value,
				"Time_interval":output[0].data[24].value,
				"Search_order":output[0].data[25].value,
				"Initial_domain_name_server":output[0].data[26].value,
				"DNS_listening_port":output[0].data[27].value,
				"Host_name":output[0].data[28].value,
				"Domain_name":output[0].data[29].value,
				"Reserved":output[0].data[30].value,
				"Domain_search_list":output[0].data[31].value,
			};
		else
			rtValue = str;
		if(async)	// If it is in asynchronized mode.
			cb(rtValue);  // Run the call back function against the returned value.
		stop = 1;
	}
	function waitForResult() {
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

iNetwork.prototype.getNetInterfaceData= function(ipaddr, cb) {
	var outBuf = [
		[0, "10i0"],	// [0]Bytes returned
		[0, "10i0"],	// [1]Bytes available
		["", "15A"],	// [2]Internet address
		["", "1A"],	// [3]Reserved
		[0, "10i0"],	// [4]Internet address binary
		["", "15A"],	// [5]Network address
		["", "1A"],	// [6]Reserved
		[0, "10i0"],	// [7]Network address binary
		["", "10A"],	// [8]Line description
		["", "2A"],	// [9]Reserved
		[0, "10i0"],	// [10]Interface status
		[0, "10i0"],	// [11]Interface type of service
		[0, "10i0"],	// [12]Interface MTU
		[0, "10i0"],	// [13]Interface line type
		["", "15A"],	// [14]Host address
		["", "1A"],	// [15]Reserved
		[0, "10i0"],	// [16]Host address binary
		["", "15A"],	// [17]Interface subnet mask
		["", "1A"],	// [18]Reserved
		[0, "10i0"],	// [19]Interface subnet mask binary
		["", "15A"],	// [20]Directed broadcast address
		["", "1A"],	// [21]Reserved
		[0, "10i0"],	// [22]Directed broadcast address binary
		["", "8A"],	// [23]Change date
		["", "6A"],	// [24]Change time
		["", "15A"],	// [25]Associated local interface
		["", "3A"],	// [26]Reserved
		[0, "10i0"],	// [27]Associated local interface binary
		[0, "10i0"],	// [28]Change status
		[0, "10i0"],	// [29]Packet rules
		[0, "10i0"],	// [30]Automatic start
		[0, "10i0"],	// [31]TRLAN bit sequencing
		[0, "10i0"],	// [32]Interface type
		[0, "10i0"],	// [33]Proxy ARP allowed
		[0, "10i0"],	// [34]Proxy ARP enabled
		[0, "10i0"],	// [35]Configured MTU
		["", "24A"],	// [36]Network name
		["", "24A"],	// [37]Interface name
		["", "50A"],	// [38]Alias name
		["", "2A"],	// [39]Reserved
		["", "50A"],	// [40]Interface description
		["", "2A"],	// [41]Reserved
		[0, "10i0"],	// [42]Offset to preferred interface list
		[0, "10i0"],	// [43]Number of entries in preferred interface list
		[0, "10i0"],	// [44]Length of one preferred interface list entry
		[0, "10i0"],	// [45]DHCP created
		[0, "10i0"],	// [46]DHCP dynamic DNS updates
		[0, "20i0"],	// [47]DHCP lease expiration
		["", "8A"],	// [48]DHCP lease expiration - date
		["", "6A"],	// [49]DHCP lease expiration - time
		[0, "20i0"],	// [50]DHCP lease obtained
		["", "8A"],	// [51]DHCP lease obtained - date
		["", "6A"],	// [52]DHCP lease obtained - time
		[0, "10i0"],	// [53]Use DHCP unique identifier
		["", "15A"],	// [54]DHCP server IP address
		["", "1A"],	// [55]Reserved
		["", "15h"],	// [56]Preferred interface Internet address
		["", "1A"],	// [57]Reserved
		[0, "10i0"],	// [58]Preferred interface Internet address binary
		["", "1A"],	// [59]Reserved
	];
	if(ipaddr=="localhost")
		ipaddr = "127.0.0.1";
	var request = [
		[1, "10i0"],
		[IPToNum(ipaddr),"10i0"]
	];
	var pgm = new xt.iPgm("QTOCNETSTS", {"lib":"QSYS","func":"QtocRtvNetIfcDta"});
	pgm.addParam(outBuf, {"io":"out", "len":"rec1"});
	pgm.addParam(0, "10i0", {"setlen":"rec1"});
	pgm.addParam("NIFD0100", "8A");
	pgm.addParam(request);
	pgm.addParam(this.errno,{"io":"both", "len" : "rec2"});
	this.conn.add(pgm.toXML());
	
	var async = cb && xt.getClass(cb) == "Function"; //If there is a callback function param, then it is in asynchronized mode.
	var rtValue;
	var stop = 0;  
	var retry = 0;
	function toJson(str) {  // Convert the XML output into JSON
		var output = xt.xmlToJson(str);
		if(output[0].hasOwnProperty("success") && output[0].success == true)
			rtValue = {
				"Internet_address":output[0].data[2].value,
				"Internet_address_binary":output[0].data[4].value,
				"Network_address":output[0].data[5].value,
				"Network_address_binary":output[0].data[7].value,
				"Line_description":output[0].data[8].value,
				"Interface_status":output[0].data[10].value,
				"Interface_type_of_service":output[0].data[11].value,
				"Interface_MTU":output[0].data[12].value,
				"Interface_line_type":output[0].data[13].value,
				"Host_address":output[0].data[14].value,
				"Host_address_binary":output[0].data[16].value,
				"Interface_subnet_mask":output[0].data[17].value,
				"Interface_subnet_mask_binary":output[0].data[19].value,
				"Directed_broadcast_address":output[0].data[20].value,
				"Directed_broadcast_address_binary":output[0].data[22].value,
				"Change_date":output[0].data[23].value,
				"Change_time":output[0].data[24].value,
				"Associated_local_interface":output[0].data[25].value,
				"Associated_local_interface_binary":output[0].data[27].value,
				"Change_status":output[0].data[28].value,
				"Packet_rules":output[0].data[29].value,
				"Automatic_start":output[0].data[30].value,
				"TRLAN_bit_sequencing":output[0].data[31].value,
				"Interface_type":output[0].data[32].value,
				"Proxy_ARP_allowed":output[0].data[33].value,
				"Proxy_ARP_enabled":output[0].data[34].value,
				"Configured_MTU":output[0].data[35].value,
				"Network_name":output[0].data[36].value,
				"Interface_name":output[0].data[37].value,
				"Alias_name":output[0].data[38].value,
				"Interface_description":output[0].data[40].value,
				"Offset_to_preferred_interface_list":output[0].data[42].value,
				"Number_of_entries_in_preferred_interface_list":output[0].data[43].value,
				"Length_of_one_preferred_interface_list_entry":output[0].data[44].value,
				"DHCP_created":output[0].data[45].value,
				"DHCP_dynamic_DNS_updates":output[0].data[46].value,
				"DHCP_lease_expiration":output[0].data[47].value,
				"DHCP_lease_expiration_-_date":output[0].data[48].value,
				"DHCP_lease_expiration_-_time":output[0].data[49].value,
				"DHCP_lease_obtained":output[0].data[50].value,
				"DHCP_lease_obtained_-_date":output[0].data[51].value,
				"DHCP_lease_obtained_-_time":output[0].data[52].value,
				"Use_DHCP_unique_identifier":output[0].data[53].value,
				"DHCP_server_IP_address":output[0].data[54].value,
				"Preferred_interface_Internet_address":output[0].data[56].value,
				"Preferred_interface_Internet_address_binary":output[0].data[58].value,
			};
		else
			rtValue = str;
		if(async)	// If it is in asynchronized mode.
			cb(rtValue);  // Run the call back function against the returned value.
		stop = 1;
	}
	function waitForResult() {
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

exports.iNetwork = iNetwork;