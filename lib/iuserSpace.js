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

function iUserSpace(conn) {
	this.conn = conn;  //Pass in the connection object.
	this.errno = [
		[0, "10i0"],
		[0, "10i0", {"setlen":"rec2"}],
		["", "7A"],
		["", "1A"]
	];
}

iUserSpace.prototype.createUserSpace= function(name, lib, attr, size, auth, desc, cb) {
	var pgm = new xt.iPgm("QUSCRTUS", {"lib":"QSYS"});
	pgm.addParam([[name, "10A"], [lib == ""?"*CURLIB":lib, "10A"]]);
	pgm.addParam(attr == ""?"LOG":attr, "11A");
	pgm.addParam(size == ""?50:size, "10i0");
	pgm.addParam(0, "1A");
	pgm.addParam(auth == ""?"*USE":auth, "10A");
	pgm.addParam(desc, "50A");
	pgm.addParam("*NO", "10A");
	pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

	this.conn.add(pgm.toXML());
	var async = cb && xt.getClass(cb) == "Function"; //If there is a callback function param, then it is in asynchronized mode.
	var rtValue;  // The returned value.
	var stop = 0;  // A flag indicating whether the process is finished.
	var retry = 0;  // How many times we have retried.
	function toJson(str) {  // Convert the XML output into JSON
		var output = xt.xmlToJson(str);
		if(output[0].hasOwnProperty("success") && output[0].success == true)
			rtValue = true;
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

iUserSpace.prototype.setUserSpaceData= function(name, lib, length, msg, cb) {
	var pgm = new xt.iPgm("QUSCHGUS", {"lib":"QSYS"});
	pgm.addParam([[name, "10A"], [lib == ""?"*CURLIB":lib, "10A"]]);
	pgm.addParam(1, "10i0");
	pgm.addParam(length, "10i0");
	pgm.addParam(msg, length + "A");
	pgm.addParam(0, "1A");
	pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

	this.conn.add(pgm.toXML());
	
	var async = cb && xt.getClass(cb) == "Function"; //If there is a callback function param, then it is in asynchronized mode.
	var rtValue;  // The returned value.
	var stop = 0;  // A flag indicating whether the process is finished.
	var retry = 0;  // How many times we have retried.
	function toJson(str) {  // Convert the XML output into JSON
		var output = xt.xmlToJson(str);
		if(output[0].hasOwnProperty("success") && output[0].success == true)
			rtValue = true;
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

iUserSpace.prototype.getUserSpaceData= function(name, lib, length, cb) {
	var pgm = new xt.iPgm("QUSRTVUS", {"lib":"QSYS"});
	pgm.addParam([[name, "10A"], [lib == ""?"*CURLIB":lib, "10A"]]);
	pgm.addParam(1, "10i0");
	pgm.addParam(length, "10i0");
	pgm.addParam("", length + "A", {"io":"out"});
	pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

	this.conn.add(pgm.toXML());
	
	var async = cb && xt.getClass(cb) == "Function"; //If there is a callback function param, then it is in asynchronized mode.
	var rtValue;  // The returned value.
	var stop = 0;  // A flag indicating whether the process is finished.
	var retry = 0;  // How many times we have retried.
	function toJson(str) {  // Convert the XML output into JSON
		var output = xt.xmlToJson(str);
		if(output[0].hasOwnProperty("success") && output[0].success == true)
			rtValue = output[0].data[4].value;
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

iUserSpace.prototype.deleteUserSpace= function(name, lib, cb) {
	var pgm = new xt.iPgm("QUSDLTUS", {"lib":"QSYS"});
	pgm.addParam([[name, "10A"], [lib == ""?"*CURLIB":lib, "10A"]]);
	pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});

	this.conn.add(pgm.toXML());
	var async = cb && xt.getClass(cb) == "Function"; //If there is a callback function param, then it is in asynchronized mode.
	var rtValue;  // The returned value.
	var stop = 0;  // A flag indicating whether the process is finished.
	var retry = 0;  // How many times we have retried.
	function toJson(str) {  // Convert the XML output into JSON
		var output = xt.xmlToJson(str);
		if(output[0].hasOwnProperty("success") && output[0].success == true)
			rtValue = true;
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

exports.iUserSpace = iUserSpace;