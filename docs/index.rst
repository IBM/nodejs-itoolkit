.. nodejs-itoolkit documentation master file, created by
   sphinx-quickstart on Tue Mar 31 16:50:35 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to nodejs-itoolkit's documentation!
===========================================

Introduction
============

.. _XMLSERVICE: https://github.com/IBM/xmlservice#xmlservice

``itoolkit`` is a Node.js interface to XMLSERVICE_ to access all things IBM i.

XMLSERVICE provides interfaces to interact with IBM i resources such as programs and commands.

XMLSERVICE receives xml input and returns xml output.

For example we can execute a CL command by sending the following XML input to XMLSERVICE.

.. code-block:: xml

   <?xml version="1.0" encoding="UTF-8"?>
   <myscript>
      <cmd exec="rexx">RTVJOBA USRLIBL(?) SYSLIBL(?)</cmd>
   </myscript>

XMLSERVICE will run the command and respond with XML output.

.. code-block:: xml

   <?xml version="1.0" encoding="UTF-8"?>
   <myscript>
      <cmd exec="rexx">
         <success>+++ success RTVJOBA USRLIBL(?) SYSLIBL(?)</success>
         <row>
            <data desc="USRLIBL">QGPL  QTEMP</data>
         </row>
         <row>
            <data desc="SYSLIBL">QSYS  QSYS2  QHLPSYS  QUSRSYS</data>
         </row>
      </cmd>
   </myscript>

The purpose of this package is to simplify the process of creating XMLSERVICE input, invoking XMLSERVICE, and returning XMLSERVICE output from Node.js.

Installation
^^^^^^^^^^^^

.. code-block:: bash

   $ npm install itoolkit

.. NOTE::
   If you are upgrading from ``0.1.x`` be sure to read the :doc:`migration guide </migratation-guide-v1.0>`.

.. toctree::
   :maxdepth: 1
   :caption: Contents:
   
   features
   deprecated
   migratation-guide-v1.0


Indices and tables
==================

* :ref:`genindex`
* :ref:`search`
