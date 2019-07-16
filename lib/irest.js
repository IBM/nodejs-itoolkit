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

const http = require('http');
const iRestHttp = (callback,xhost,xport,xpath,xdatabase,xuser,xpassword,xipc,xctl,xml_input_script,xml_output_max_size) => {
  let xml_out = "";
  let xml_enc = "db2=" + encodeURIComponent(xdatabase)
        + "&uid=" + encodeURIComponent(xuser)
        + "&pwd=" + encodeURIComponent(xpassword)
        + "&ipc=" + encodeURIComponent(xipc)
        + "&ctl=" + encodeURIComponent(xctl)
        + "&xmlin=" + encodeURIComponent(xml_input_script)
        + "&xmlout=" + encodeURIComponent(xml_output_max_size);
  // myibmi/cgi-bin/xmlcgi.pgm?xml
  let options = {
    host: xhost,
	port: xport,
    path: xpath + '?' + xml_enc
  };
  const httpCallback = (response) => {
    let str = '';
    //another chunk of data has been received, so append it to `str`
    response.on('data', (chunk) => {
      str += chunk;
    });
    //the whole response has been received, so return
    response.on('end', () => {
      callback(str);
    });
  }
  // make the call
  http.request(options, httpCallback).end();
}

exports.iRestHttp = iRestHttp;