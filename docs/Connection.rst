.. _Connection:

Creating a Connection
=====================

Transports
----------

The ``Connection`` Class uses ``ODBC``, ``SSH``, ``idb``, and ``REST`` transports to access ``XMLSERVICE``.
Some transports require prerequisite setup. Learn morre about each transport below.

ODBC
^^^^
.. _guide: https://github.com/IBM/ibmi-oss-examples/blob/master/odbc/odbc.md#table-of-contents

The ODBC transport establishes a database connection and calls XMLSERVICE stored procedure.
Refer to the odbc guide_ for setup instructions.

SSH
^^^
The SSH transport executes ``xmlservice-cli`` program via ssh.
Install ``xmlservice-cli`` before using the ``SSH`` transport.

.. code-block:: bash

   $ yum install itoolkit-utils

idb
^^^^

The idb transport establishes a database connection and calls the XMLSERVICE stored procedure.

**NOTE** the idb transport is only supported on an IBM i system.

REST
^^^^
The REST transport makes an HTTP request to an endpoint that process the XML input and returns XML output.

Initial configuration is required for the endpoint.

A quick example is to add the following to ``/www/apachedft/conf/httpd.conf``.


.. code-block:: apache

   ScriptAlias /cgi-bin/ /QSYS.LIB/XMLSERVICE.LIB/
   <Directory /QSYS.LIB/XMLSERVICE.LIB/>
   AllowOverride None
   Require all granted
   SetHandler cgi-script
   Options +ExecCGI
   </Directory>

Connection API
--------------

.. autoclass:: Connection
   :members:

.. autofunction:: connectionConfig
.. autofunction:: odbcOptions
.. autofunction:: sshOptions
.. autofunction:: idbOptions
.. autofunction:: restOptions
.. autofunction:: runCallback

Examples
--------

Creating a ``Connection`` using the ``ODBC`` tranport.

.. code-block:: js

   const connection = new Connection({
     transport: 'odbc',
     transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword'}
   });

Creating a ``Connection`` using the ``ODBC`` tranport with a ``DSN``.

.. code-block:: js

   const connection = new Connection({
     transport: 'odbc',
     transportOptions: { dsn: '*LOCAL'}
   });

Creating a ``Connection`` with ``ssh`` tranport using private key to authenticate.

.. code-block:: js

   const connection = new Connection({
     transport: 'ssh',
     transportOptions: { host: 'myhost', username: 'myuser', password: 'mypassword' }
   });

Creating a ``Connection`` using the ``ssh`` tranport with a private key to authenticate.

.. code-block:: js

   const { readFileSync } = require('fs');

   const privateKey = readFileSync('path/to/privateKey', 'utf-8');

   // NOTE if your privateKey also requires a passphrase provide it

   const connection = new Connection({
   transport: 'ssh',
   transportOptions: { host: 'myhost', username: 'myuser', privateKey, passphrase: 'myphrase' }
   });

Creating a ``Connection`` using the ``idb`` tranport.

.. code-block:: js

   const connection = new Connection({
     transport: 'idb',
     transportOptions: { database: '*LOCAL', username: 'myuser', password: 'mypass' }
   });

Creating a ``Connection`` using the ``REST`` tranport.

.. code-block:: js

   const connection = new Connection({
     transport: 'rest',
     transportOptions: {
        database: '*LOCAL',
        username: 'myuser',
        password: 'mypass'
        url: 'http://myhost.example.com/cgi-bin/xmlcgi.pgm',
      }
   });
