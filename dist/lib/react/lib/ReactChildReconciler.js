define('node_modules/react/lib/ReactChildReconciler', function(require, exports, module) {

  /**
   * Copyright 2014-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactChildReconciler
   */
  
  'use strict';
  
  var ReactReconciler = require('node_modules/react/lib/ReactReconciler');
  
  var instantiateReactComponent = require('node_modules/react/lib/instantiateReactComponent');
  var KeyEscapeUtils = require('node_modules/react/lib/KeyEscapeUtils');
  var shouldUpdateReactComponent = require('node_modules/react/lib/shouldUpdateReactComponent');
  var traverseAllChildren = require('node_modules/react/lib/traverseAllChildren');
  var warning = require('node_modules/fbjs/lib/warning');
  
  function instantiateChild(childInstances, child, name, selfDebugID) {
    // We found a component instance.
    var keyUnique = childInstances[name] === undefined;
    if ('development' !== 'production') {
      var ReactComponentTreeDevtool = require('node_modules/react/lib/ReactComponentTreeDevtool');
      'development' !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeDevtool.getStackAddendumByID(selfDebugID)) : void 0;
    }
    if (child != null && keyUnique) {
      childInstances[name] = instantiateReactComponent(child, true);
    }
  }
  
  /**
   * ReactChildReconciler provides helpers for initializing or updating a set of
   * children. Its output is suitable for passing it onto ReactMultiChild which
   * does diffed reordering and insertion.
   */
  var ReactChildReconciler = {
    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildNodes Nested child maps.
     * @return {?object} A set of child instances.
     * @internal
     */
    instantiateChildren: function (nestedChildNodes, transaction, context, selfDebugID // __DEV__ only
    ) {
      if (nestedChildNodes == null) {
        return null;
      }
      var childInstances = {};
  
      if ('development' !== 'production') {
        traverseAllChildren(nestedChildNodes, function (childInsts, child, name) {
          return instantiateChild(childInsts, child, name, selfDebugID);
        }, childInstances);
      } else {
        traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
      }
      return childInstances;
    },
  
    /**
     * Updates the rendered children and returns a new set of children.
     *
     * @param {?object} prevChildren Previously initialized set of children.
     * @param {?object} nextChildren Flat child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @param {object} context
     * @return {?object} A new set of child instances.
     * @internal
     */
    updateChildren: function (prevChildren, nextChildren, removedNodes, transaction, context) {
      // We currently don't have a way to track moves here but if we use iterators
      // instead of for..in we can zip the iterators and check if an item has
      // moved.
      // TODO: If nothing has changed, return the prevChildren object so that we
      // can quickly bailout if nothing has changed.
      if (!nextChildren && !prevChildren) {
        return;
      }
      var name;
      var prevChild;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        prevChild = prevChildren && prevChildren[name];
        var prevElement = prevChild && prevChild._currentElement;
        var nextElement = nextChildren[name];
        if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
          ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
          nextChildren[name] = prevChild;
        } else {
          if (prevChild) {
            removedNodes[name] = ReactReconciler.getHostNode(prevChild);
            ReactReconciler.unmountComponent(prevChild, false);
          }
          // The child must be instantiated before it's mounted.
          var nextChildInstance = instantiateReactComponent(nextElement, true);
          nextChildren[name] = nextChildInstance;
        }
      }
      // Unmount children that are no longer present.
      for (name in prevChildren) {
        if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
          prevChild = prevChildren[name];
          removedNodes[name] = ReactReconciler.getHostNode(prevChild);
          ReactReconciler.unmountComponent(prevChild, false);
        }
      }
    },
  
    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted.
     *
     * @param {?object} renderedChildren Previously initialized set of children.
     * @internal
     */
    unmountChildren: function (renderedChildren, safely) {
      for (var name in renderedChildren) {
        if (renderedChildren.hasOwnProperty(name)) {
          var renderedChild = renderedChildren[name];
          ReactReconciler.unmountComponent(renderedChild, safely);
        }
      }
    }
  
  };
  
  module.exports = ReactChildReconciler;

});
