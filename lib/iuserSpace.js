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

const Toolkit = require('./Toolkit');

module.exports = class iUserSpace {
  constructor(conn) {
    // TODO: deprecated
    this.toolkit = new Toolkit(conn);
  }

  createUserSpace(name, lib, attr, size, auth, desc, cb) {
    // TODO: deprecated
    this.toolkit.createUserSpace(name, lib, attr, size, auth, desc, cb);
  }

  setUserSpaceData(name, lib, length, msg, cb) {
    // TODO: deprecated
    this.toolkit.setUserSpaceData(name, lib, length, msg, cb);
  }

  getUserSpaceData(name, lib, length, cb) {
    // TODO: deprecated
    this.toolkit.getUserSpaceData(name, lib, length, cb);
  }

  deleteUserSpace(name, lib, cb) {
    // TODO: deprecated
    this.toolkit.deleteUserSpace(name, lib, cb);
  }
};
