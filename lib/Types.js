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

/*
 * From XMLSERVICEQUICK reference
 * http://yips.idevcloud.com/wiki/index.php/XMLService/XMLSERVICEQuick
 * -------------------------------------------------------------------
 * |  xmlservice      |  C/SQL         |  Fixed-format RPG           |
 * -------------------------------------------------------------------
 * |  3i0             |  int8/byte     |  D myint8   3i  0           |
 * |  5i0             |  int16/short   |  D myint16  5i  0           |
 * |  10i0            |  int32/int     |  D myint32  10i 0           |
 * |  20i0            |  int64/int64   |  D myint64  20i 0           |
 * |  3u0             |  uint8/ubyte   |  D myint8   3u  0           |
 * |  5u0             |  uint16/ushort |  D myint16  5u  0           |
 * |  10u0            |  uint32/uint   |  D myint32  10u 0           |
 * |  20u0            |  uint64/uint64 |  D myint64  20u 0           |
 * |  32a             |  char          |  D mychar   32a             |
 * |  32a (varying=2) |  varchar       |  D mychar   32a varying     |
 * |  32a (varying=4) |  varchar4      |  D mychar   32a varying(4)  |
 * |  12p2            |  packed        |  D mydec    12p 2           |
 * |  12s2            |  zoned         |  D myzone   12s 2           |
 * |  4f2             |  float         |  D myfloat  4f              |
 * |  8f4             |  real/double   |  D myfloat  8f              |
 * |  3b              |  binary        |  D mybin    (any)           |
 * -------------------------------------------------------------------
*/

/**
 * @param {number} length - The number of binary characters.
 * @returns {object} - The binary data type format expected by xml service.
 */

function Binary(length) {
  return { type: `${length}b` };
}

/**
 * @param {number} length - The number of characters within the varchar.
 * @returns {object} - The character data type format expected by xml service.
 */
function Char(length) {
  return { type: `${length}a` };
}

/**
 * @param {number} length - The number of characters.
 * @returns {object} - The long varchar data type format expected by
 * xml service.
 */
function LongVarchar(length) {
  return { type: `${length}a`, varying: '4' };
}

/**
 * @param {number} length - The number of characters.
 * @returns {object} - The varchar data type format expected by xml service.
 */
function Varchar(length) {
  return { type: `${length}a`, varying: '2' };
}

/**
 * @returns {object} - The double data type format expected by xml service.
 */
function Double() {
  return { type: '8f4' };
}

/**
 * @returns {object} - The float data type format expected by xml service.
 */
function Float() {
  return { type: '4f2' };
}

/**
 * @param {number} totalDigits -The number of integer digits.
 * @param {number} decimalDigits - The number of decimal digits.
 * @returns {object} - The packed data type format expected by xml service.
 */
function PackedDecimal(totalDigits, decimalDigits) {
  return { type: `${totalDigits}p${decimalDigits}` };
}

/**
 * @param {number} totalDigits - The number of integer digits.
 * @param {number} decimalDigits - The number of decimal digits.
 * @returns {object} - The zoned data type format expected by xml service.
 */
function ZonedDecimal(totalDigits, decimalDigits) {
  return { type: `${totalDigits}s${decimalDigits}` };
}

/**
 * @returns {object} The signed big int (int64) data type format expected by
 * xml service.
 */
function SignedBigInt() {
  return { type: '20i0' };
}

/**
 * @returns {object} The signed byte (int8) data type foramt expected by
 * xml service.
 */
function SignedByte() {
  return { type: '3i0' };
}

/**
 * @returns {object} The signed int (int32) data type format expected by xml service.
 */
function SignedInt() {
  return { type: '10i0' };
}

/**
 * @returns {object} The signed short (int16) data type format expected by
 * xml service.
 */
function SignedShort() {
  return { type: '5i0' };
}

// aliases for signed types
const BigInt = SignedBigInt;
const Byte = SignedByte;
const Int = SignedInt;
const Short = SignedShort;

/**
 * @returns {object} The unsigned big int (int64) data type format expected by
 * xml service.
 */
function UnsignedBigInt() {
  return { type: '20u0' };
}

/**
 * @returns {object} The unsigned byte (int8) data type foramt expected by
 * xml service.
 */
function UnsignedByte() {
  return { type: '3u0' };
}

/**
 * @returns {object} The unsigned int (int32) data type format expected by
 * xml service.
 */
function UnsignedInt() {
  return { type: '10u0' };
}

/**
 * @returns {object} - The signed short (int16) data type format expected by
 * xml service.
 */
function UnsignedShort() {
  return { type: '5u0' };
}

module.exports = {
  Binary,
  Char,
  LongVarchar,
  Varchar,
  Double,
  Float,
  PackedDecimal,
  ZonedDecimal,
  SignedBigInt,
  BigInt,
  SignedByte,
  Byte,
  SignedInt,
  Int,
  SignedShort,
  Short,
  UnsignedBigInt,
  UnsignedByte,
  UnsignedInt,
  UnsignedShort,
};
