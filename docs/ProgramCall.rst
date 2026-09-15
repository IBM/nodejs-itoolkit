.. _ProgramCall:

Calling a Program or Service Program
------------------------------------

ProgramCall API
^^^^^^^^^^^^^^^
.. autoclass:: ProgramCall
   :members:

.. autofunction:: programCallConfig
.. autofunction:: parameterConfig
.. autofunction:: returnConfig
.. autofunction:: data

Data types XMLSERVICE
^^^^^^^^^^^^^^^^^^^^^

.. list-table:: 
   :header-rows: 1
   :widths: 15 30 30 15

   * - C types
     - RPG types
     - XMLSERVICE types
     - SQL types
   * - int8/byte
     - D myint8    3i  0
     - ``<data type='3i0'/>``
     - TINYINT (unsupported DB2)
   * - int16/short
     - D myint16 5i 0 (4b 0)
     - ``<data type='5i0'/>``
     - SMALLINT
   * - int32/int
     - D myint32 10i 0 (9b 0)
     - ``<data type='10i0'/>``
     - INTEGER
   * - int64/longlong
     - D myint64 20i 0
     - ``<data type='20i0'/>``
     - BIGINT
   * - uint8/ubyte
     - D myuint8 3u 0
     - ``<data type='3u0'/>``
     - 
   * - uint16/ushort
     - D myuint16  5u 0
     - ``<data type='5u0'/>``
     - 
   * - uint32/uint
     - D myuint32 10u 0
     - ``<data type='10u0'/>``
     - 
   * - uint64/ulonglong
     - D myuint64 20u 0
     - ``<data type='20u0'/>``
     - 
   * - char
     - D mychar   32a
     - ``<data type='32a'/>``
     - CHAR(32)
   * - varchar2
     - D myvchar2 32a   varying
     - ``<data type='32a' varying='on'/>``
     - VARCHAR(32)
   * - varchar4
     - D myvchar4 32a   varying(4)
     - ``<data type='32a' varying='4'/>``
     - 
   * - packed
     - D mydec    12p 2
     - ``<data type='12p2'/>``
     - DECIMAL(12,2)
   * - zoned
     - D myzone   12s 2
     - ``<data type='12s2'/>``
     - NUMERIC(12,2)
   * - float
     - D myfloat   4f
     - ``<data type='4f2'/>``
     - FLOAT
   * - real/double
     - D myreal    8f
     - ``<data type='8f4'/>``
     - DOUBLE
   * - binary
     - D mybin    (any)
     - ``<data type='9b'>F1F2F3</data>``
     - BINARY
   * - hole (no out)
     - D myhole   (any)
     - ``<data type='40h'/>``
     - 
   * - boolean
     - D mybool    1n
     - ``<data type='4a'/>``
     - CHAR(4)
   * - time
     - D mytime     T   timfmt(*iso)
     - ``<data type='8A'>09.45.29</data>``
     - TIME
   * - timestamp
     - D mystamp    Z
     - ``<data type='26A'>2011-12-29-12.45.29.000000</data>``
     - TIMESTAMP
   * - date
     - D mydate     D   datfmt(*iso)
     - ``<data type='10A'>2009-05-11</data>``
     - DATE

Examples
^^^^^^^^

Call the QUSROBJD Program
"""""""""""""""""""""""""

.. literalinclude:: examples/qusrobjd.js
   :language: javascript

Retrieve the Return Value From a Service Program
""""""""""""""""""""""""""""""""""""""""""""""""

.. literalinclude:: examples/cosine.js
   :language: javascript


