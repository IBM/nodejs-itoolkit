# Node.js Toolkit

#### The toolkit is a Node.js wrapper over the XMLSERVICE open source project from IBM. 

[![NPM](https://nodei.co/npm/itoolkit.png?downloads=true&downloadRank=true)](https://nodei.co/npm/itoolkit/)

# Installation  

Installation is done from a PASE shell.

```sh
    $ npm i itoolkit
```

# Quick Example

## Example 1: Basic APIs
```js
	var xt = require("itoolkit");
	var conn = new xt.iConn("*LOCAL", "USERNAME", "PASSWORD");

	function cbJson(str) {
	  var result = xt.xmlToJson(str);
	  console.log(JSON.stringify(result, " ", 2))
	}

	conn.add(xt.iCmd("RTVJOBA USRLIBL(?) SYSLIBL(?)"));  /* Test iCmd */
	conn.add(xt.iSh("system -i wrksyssts"));	/* Test iSh */
	var pgm = new xt.iPgm("QWCRSVAL", {"lib":"QSYS"}); /* Test iPgm */
	var outBuf = [
			[0, "10i0"],
			[0, "10i0"],
			["", "36h"],
			["", "10A"],
			["", "1A"],
			["", "1A"],
			[0, "10i0"],
			[0, "10i0"]
		];
	pgm.addParam(outBuf, {"io":"out"});
	pgm.addParam(66, "10i0");
	pgm.addParam(1, "10i0");
	pgm.addParam("QCCSID", "10A");
	pgm.addParam(this.errno, {"io":"both", "len" : "rec2"});
	conn.add(pgm);

	var sql = new xt.iSql();  /* Test iSql Class */
	sql.prepare("call qsys2.tcpip_info()");
	sql.execute();
	sql.fetch();
	sql.free();
	conn.add(sql);
	conn.run(cbJson);
```

## Example 2: Toolkit classes
```js
	var xt = require("itoolkit");
	var wk = require('itoolkit/lib/iwork');
	var nt = require('itoolkit/lib/inetwork');

	var conn = new xt.iConn("*LOCAL", "USERNAME", "PASSWORD");

	var work = new wk.iWork(conn);
	var net = new nt.iNetwork(conn);

	work.getSysValue("QCCSID", (output) => {
	  console.log("QCCSID = " + output);
	});

	net.getTCPIPAttr((output) => {
	  console.log(JSON.stringify(output, " ", 2));
	});
```

# API Reference
* https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/IBM%20i%20Technology%20Updates/page/Toolkit%20for%20i%20APIs

# Contributions
Please read the [contribution guidelines](https://github.com/IBM/nodejs-itoolkit/blob/master/CONTRIBUTING.md).


# License
[`MIT`](https://github.com/IBM/nodejs-itoolkit/blob/master/LICENSE) file.
