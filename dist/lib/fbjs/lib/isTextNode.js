define('node_modules/fbjs/lib/isTextNode', function(require, exports, module) {

  'use strict';
  
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @typechecks
   */
  
  var isNode = require('node_modules/fbjs/lib/isNode');
  
  /**
   * @param {*} object The object to check.
   * @return {boolean} Whether or not the object is a DOM text node.
   */
  function isTextNode(object) {
    return isNode(object) && object.nodeType == 3;
  }
  
  module.exports = isTextNode;

});
