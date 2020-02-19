/* eslint-disable prefer-template */
// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

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

const iXmlAttrDefault = (z, x, y) => {
  if (typeof x === 'undefined' || x === '') {
    if (y === '') {
      return y;
    }
    return ` ${z}='${y}'`;
  }
  return ` ${z}='${x}'`;
};

module.exports.iXmlNodeError = msg => `<error>${msg}</error>`;




module.exports.iXmlNodePgmOpen = (xname, xlib, xfunc, xerror) => `<pgm${iXmlAttrDefault('name', xname, 'undefined')}${iXmlAttrDefault('lib', xlib, '')}${iXmlAttrDefault('func', xfunc, '')}${iXmlAttrDefault('error', xerror, 'fast')}>`;

module.exports.iXmlNodePgmClose = () => '</pgm>';

module.exports.iXmlNodeParmOpen = (opt) => {
  if (!(opt && typeof opt === 'object')) {
    return '<parm>';
  }

  const io = (opt.io) ? iXmlAttrDefault('io', opt.io, '') : '';
  const by = (opt.by) ? iXmlAttrDefault('by', opt.by, '') : '';

  return `<parm${io}${by}>`;
};

module.exports.iXmlNodeParmClose = () => '</parm>';

module.exports.iXmlNodeReturnOpen = () => '<return>';

module.exports.iXmlNodeReturnClose = () => '</return>';

module.exports.iXmlNodeOverlayOpen = (xio, xoffset, xtop) => `<overlay${iXmlAttrDefault('io', xio, 'both')}${iXmlAttrDefault('offset', xoffset, '')}${iXmlAttrDefault('top', xtop, '')}>`;

module.exports.iXmlNodeOverlayClose = () => '</overlay>';

module.exports.iXmlNodeDsOpen = (xdim, xdou, xlen, xdata) => `<ds${iXmlAttrDefault('dim', xdim, '')}${iXmlAttrDefault('dou', xdou, '')}${iXmlAttrDefault('len', xlen, '')}${iXmlAttrDefault('data', xdata, '')}>`;

module.exports.iXmlNodeDsClose = () => '</ds>';

module.exports.iXmlNodeDataOpen = (xtype, options) => {
  let result = `<data${iXmlAttrDefault('type', xtype, '1024a')}`;

  if (options && typeof options === 'object') {
    Object.keys(options).forEach((key) => {
      result += iXmlAttrDefault(key, options[key], '1024a');
    });
  }

  result += '>';
  return result;
};

module.exports.iXmlNodeDataClose = () => '</data>';













































