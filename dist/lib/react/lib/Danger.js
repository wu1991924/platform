define('node_modules/react/lib/Danger', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Danger
   */
  
  'use strict';
  
  var _prodInvariant = require('node_modules/react/lib/reactProdInvariant');
  
  var DOMLazyTree = require('node_modules/react/lib/DOMLazyTree');
  var ExecutionEnvironment = require('node_modules/fbjs/lib/ExecutionEnvironment');
  
  var createNodesFromMarkup = require('node_modules/fbjs/lib/createNodesFromMarkup');
  var emptyFunction = require('node_modules/fbjs/lib/emptyFunction');
  var invariant = require('node_modules/fbjs/lib/invariant');
  
  var Danger = {
  
    /**
     * Replaces a node with a string of markup at its current position within its
     * parent. The markup must render into a single root node.
     *
     * @param {DOMElement} oldChild Child node to replace.
     * @param {string} markup Markup to render in place of the child node.
     * @internal
     */
    dangerouslyReplaceNodeWithMarkup: function (oldChild, markup) {
      !ExecutionEnvironment.canUseDOM ? 'development' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use ReactDOMServer.renderToString() for server rendering.') : _prodInvariant('56') : void 0;
      !markup ? 'development' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : _prodInvariant('57') : void 0;
      !(oldChild.nodeName !== 'HTML') ? 'development' !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the <html> node. This is because browser quirks make this unreliable and/or slow. If you want to render to the root you must use server rendering. See ReactDOMServer.renderToString().') : _prodInvariant('58') : void 0;
  
      if (typeof markup === 'string') {
        var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
        oldChild.parentNode.replaceChild(newChild, oldChild);
      } else {
        DOMLazyTree.replaceChildWithTree(oldChild, markup);
      }
    }
  
  };
  
  module.exports = Danger;

});
