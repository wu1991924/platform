define('node_modules/react/lib/flattenChildren', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule flattenChildren
   * 
   */
  
  'use strict';
  
  var KeyEscapeUtils = require('node_modules/react/lib/KeyEscapeUtils');
  var traverseAllChildren = require('node_modules/react/lib/traverseAllChildren');
  var warning = require('node_modules/fbjs/lib/warning');
  
  /**
   * @param {function} traverseContext Context passed through traversal.
   * @param {?ReactComponent} child React child component.
   * @param {!string} name String name of key path to child.
   * @param {number=} selfDebugID Optional debugID of the current internal instance.
   */
  function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
    // We found a component instance.
    if (traverseContext && typeof traverseContext === 'object') {
      var result = traverseContext;
      var keyUnique = result[name] === undefined;
      if ('development' !== 'production') {
        var ReactComponentTreeDevtool = require('node_modules/react/lib/ReactComponentTreeDevtool');
        'development' !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeDevtool.getStackAddendumByID(selfDebugID)) : void 0;
      }
      if (keyUnique && child != null) {
        result[name] = child;
      }
    }
  }
  
  /**
   * Flattens children that are typically specified as `props.children`. Any null
   * children will not be included in the resulting object.
   * @return {!object} flattened children keyed by name.
   */
  function flattenChildren(children, selfDebugID) {
    if (children == null) {
      return children;
    }
    var result = {};
  
    if ('development' !== 'production') {
      traverseAllChildren(children, function (traverseContext, child, name) {
        return flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID);
      }, result);
    } else {
      traverseAllChildren(children, flattenSingleChildIntoContext, result);
    }
    return result;
  }
  
  module.exports = flattenChildren;

});
