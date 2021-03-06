define('node_modules/rc-trigger/lib/Trigger', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('node_modules/react-dom/index');
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _contains = require('node_modules/rc-util/lib/Dom/contains');
  
  var _contains2 = _interopRequireDefault(_contains);
  
  var _addEventListener = require('node_modules/rc-util/lib/Dom/addEventListener');
  
  var _addEventListener2 = _interopRequireDefault(_addEventListener);
  
  var _Popup = require('node_modules/rc-trigger/lib/Popup');
  
  var _Popup2 = _interopRequireDefault(_Popup);
  
  var _utils = require('node_modules/rc-trigger/lib/utils');
  
  var _getContainerRenderMixin = require('node_modules/rc-util/lib/getContainerRenderMixin');
  
  var _getContainerRenderMixin2 = _interopRequireDefault(_getContainerRenderMixin);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function noop() {}
  
  function returnEmptyString() {
    return '';
  }
  
  var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];
  
  var Trigger = _react2["default"].createClass({
    displayName: 'Trigger',
  
    propTypes: {
      children: _react.PropTypes.any,
      action: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
      showAction: _react.PropTypes.any,
      hideAction: _react.PropTypes.any,
      getPopupClassNameFromAlign: _react.PropTypes.any,
      onPopupVisibleChange: _react.PropTypes.func,
      afterPopupVisibleChange: _react.PropTypes.func,
      popup: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired,
      popupStyle: _react.PropTypes.object,
      prefixCls: _react.PropTypes.string,
      popupClassName: _react.PropTypes.string,
      popupPlacement: _react.PropTypes.string,
      builtinPlacements: _react.PropTypes.object,
      popupTransitionName: _react.PropTypes.string,
      popupAnimation: _react.PropTypes.any,
      mouseEnterDelay: _react.PropTypes.number,
      mouseLeaveDelay: _react.PropTypes.number,
      zIndex: _react.PropTypes.number,
      focusDelay: _react.PropTypes.number,
      blurDelay: _react.PropTypes.number,
      getPopupContainer: _react.PropTypes.func,
      destroyPopupOnHide: _react.PropTypes.bool,
      mask: _react.PropTypes.bool,
      onPopupAlign: _react.PropTypes.func,
      popupAlign: _react.PropTypes.object,
      popupVisible: _react.PropTypes.bool,
      maskTransitionName: _react.PropTypes.string,
      maskAnimation: _react.PropTypes.string
    },
  
    mixins: [(0, _getContainerRenderMixin2["default"])({
      autoMount: false,
  
      isVisible: function isVisible(instance) {
        return instance.state.popupVisible;
      },
      getContainer: function getContainer(instance) {
        var popupContainer = document.createElement('div');
        var mountNode = instance.props.getPopupContainer ? instance.props.getPopupContainer((0, _reactDom.findDOMNode)(instance)) : document.body;
        mountNode.appendChild(popupContainer);
        return popupContainer;
      },
      getComponent: function getComponent(instance) {
        var props = instance.props;
        var state = instance.state;
  
        var mouseProps = {};
        if (instance.isMouseEnterToShow()) {
          mouseProps.onMouseEnter = instance.onPopupMouseEnter;
        }
        if (instance.isMouseLeaveToHide()) {
          mouseProps.onMouseLeave = instance.onPopupMouseLeave;
        }
        return _react2["default"].createElement(
          _Popup2["default"],
          _extends({
            prefixCls: props.prefixCls,
            destroyPopupOnHide: props.destroyPopupOnHide,
            visible: state.popupVisible,
            className: props.popupClassName,
            action: props.action,
            align: instance.getPopupAlign(),
            onAlign: props.onPopupAlign,
            animation: props.popupAnimation,
            getClassNameFromAlign: instance.getPopupClassNameFromAlign
          }, mouseProps, {
            getRootDomNode: instance.getRootDomNode,
            style: props.popupStyle,
            mask: props.mask,
            zIndex: props.zIndex,
            transitionName: props.popupTransitionName,
            maskAnimation: props.maskAnimation,
            maskTransitionName: props.maskTransitionName
          }),
          typeof props.popup === 'function' ? props.popup() : props.popup
        );
      }
    })],
  
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-trigger-popup',
        getPopupClassNameFromAlign: returnEmptyString,
        onPopupVisibleChange: noop,
        afterPopupVisibleChange: noop,
        onPopupAlign: noop,
        popupClassName: '',
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0.1,
        focusDelay: 0,
        blurDelay: 0.15,
        popupStyle: {},
        destroyPopupOnHide: false,
        popupAlign: {},
        defaultPopupVisible: false,
        mask: false,
        action: [],
        showAction: [],
        hideAction: []
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var popupVisible = void 0;
      if ('popupVisible' in props) {
        popupVisible = !!props.popupVisible;
      } else {
        popupVisible = !!props.defaultPopupVisible;
      }
      return {
        popupVisible: popupVisible
      };
    },
    componentWillMount: function componentWillMount() {
      var _this = this;
  
      ALL_HANDLERS.forEach(function (h) {
        _this['fire' + h] = function (e) {
          _this.fireEvents(h, e);
        };
      });
    },
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate({}, {
        popupVisible: this.state.popupVisible
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
      var popupVisible = _ref.popupVisible;
  
      if (popupVisible !== undefined) {
        this.setState({
          popupVisible: popupVisible
        });
      }
    },
    componentDidUpdate: function componentDidUpdate(_, prevState) {
      var props = this.props;
      var state = this.state;
      this.renderComponent(null, function () {
        if (prevState.popupVisible !== state.popupVisible) {
          props.afterPopupVisibleChange(state.popupVisible);
        }
      });
      if (this.isClickToHide()) {
        if (state.popupVisible) {
          if (!this.clickOutsideHandler) {
            this.clickOutsideHandler = (0, _addEventListener2["default"])(document, 'mousedown', this.onDocumentClick);
            this.touchOutsideHandler = (0, _addEventListener2["default"])(document, 'touchstart', this.onDocumentClick);
          }
          return;
        }
      }
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.touchOutsideHandler.remove();
        this.clickOutsideHandler = null;
        this.touchOutsideHandler = null;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      this.clearDelayTimer();
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.touchOutsideHandler.remove();
        this.clickOutsideHandler = null;
        this.touchOutsideHandler = null;
      }
    },
    onMouseEnter: function onMouseEnter(e) {
      this.fireEvents('onMouseEnter', e);
      this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
    },
    onMouseLeave: function onMouseLeave(e) {
      this.fireEvents('onMouseLeave', e);
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
    },
    onPopupMouseEnter: function onPopupMouseEnter() {
      this.clearDelayTimer();
    },
    onPopupMouseLeave: function onPopupMouseLeave(e) {
      // https://github.com/react-component/trigger/pull/13
      // react bug?
      if (e.relatedTarget && !e.relatedTarget.setTimeout && this._component && (0, _contains2["default"])(this._component.getPopupDomNode(), e.relatedTarget)) {
        return;
      }
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
    },
    onFocus: function onFocus(e) {
      this.fireEvents('onFocus', e);
      // incase focusin and focusout
      this.clearDelayTimer();
      if (this.isFocusToShow()) {
        this.focusTime = Date.now();
        this.delaySetPopupVisible(true, this.props.focusDelay);
      }
    },
    onMouseDown: function onMouseDown(e) {
      this.fireEvents('onMouseDown', e);
      this.preClickTime = Date.now();
    },
    onTouchStart: function onTouchStart(e) {
      this.fireEvents('onTouchStart', e);
      this.preTouchTime = Date.now();
    },
    onBlur: function onBlur(e) {
      this.fireEvents('onBlur', e);
      this.clearDelayTimer();
      if (this.isBlurToHide()) {
        this.delaySetPopupVisible(false, this.props.blurDelay);
      }
    },
    onClick: function onClick(event) {
      this.fireEvents('onClick', event);
      // focus will trigger click
      if (this.focusTime) {
        var preTime = void 0;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      event.preventDefault();
      var nextVisible = !this.state.popupVisible;
      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.setPopupVisible(!this.state.popupVisible);
      }
    },
    onDocumentClick: function onDocumentClick(event) {
      var target = event.target;
      var root = (0, _reactDom.findDOMNode)(this);
      var popupNode = this.getPopupDomNode();
      if (!(0, _contains2["default"])(root, target) && !(0, _contains2["default"])(popupNode, target)) {
        this.setPopupVisible(false);
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      // for test
      if (this._component) {
        return this._component.isMounted() ? this._component.getPopupDomNode() : null;
      }
      return null;
    },
    getRootDomNode: function getRootDomNode() {
      return _reactDom2["default"].findDOMNode(this);
    },
    getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
      var className = [];
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var builtinPlacements = props.builtinPlacements;
      var prefixCls = props.prefixCls;
  
      if (popupPlacement && builtinPlacements) {
        className.push((0, _utils.getPopupClassNameFromAlign)(builtinPlacements, prefixCls, align));
      }
      if (props.getPopupClassNameFromAlign) {
        className.push(props.getPopupClassNameFromAlign(align));
      }
      return className.join(' ');
    },
    getPopupAlign: function getPopupAlign() {
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var popupAlign = props.popupAlign;
      var builtinPlacements = props.builtinPlacements;
  
      if (popupPlacement && builtinPlacements) {
        return (0, _utils.getAlignFromPlacement)(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    setPopupVisible: function setPopupVisible(popupVisible) {
      this.clearDelayTimer();
      if (this.state.popupVisible !== popupVisible) {
        if (!('popupVisible' in this.props)) {
          this.setState({
            popupVisible: popupVisible
          });
        }
        this.props.onPopupVisibleChange(popupVisible);
      }
    },
    delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
      var _this2 = this;
  
      var delay = delayS * 1000;
      this.clearDelayTimer();
      if (delay) {
        this.delayTimer = setTimeout(function () {
          _this2.setPopupVisible(visible);
          _this2.clearDelayTimer();
        }, delay);
      } else {
        this.setPopupVisible(visible);
      }
    },
    clearDelayTimer: function clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    },
    createTwoChains: function createTwoChains(event) {
      var childPros = this.props.children.props;
      var props = this.props;
      if (childPros[event] && props[event]) {
        return this['fire' + event];
      }
      return childPros[event] || props[event];
    },
    isClickToShow: function isClickToShow() {
      var _props = this.props;
      var action = _props.action;
      var showAction = _props.showAction;
  
      return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
    },
    isClickToHide: function isClickToHide() {
      var _props2 = this.props;
      var action = _props2.action;
      var hideAction = _props2.hideAction;
  
      return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
    },
    isMouseEnterToShow: function isMouseEnterToShow() {
      var _props3 = this.props;
      var action = _props3.action;
      var showAction = _props3.showAction;
  
      return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
    },
    isMouseLeaveToHide: function isMouseLeaveToHide() {
      var _props4 = this.props;
      var action = _props4.action;
      var hideAction = _props4.hideAction;
  
      return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
    },
    isFocusToShow: function isFocusToShow() {
      var _props5 = this.props;
      var action = _props5.action;
      var showAction = _props5.showAction;
  
      return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
    },
    isBlurToHide: function isBlurToHide() {
      var _props6 = this.props;
      var action = _props6.action;
      var hideAction = _props6.hideAction;
  
      return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
    },
    forcePopupAlign: function forcePopupAlign() {
      if (this.state.popupVisible && this.popupInstance && this.popupInstance.alignInstance) {
        this.popupInstance.alignInstance.forceAlign();
      }
    },
    fireEvents: function fireEvents(type, e) {
      var childCallback = this.props.children.props[type];
      if (childCallback) {
        childCallback(e);
      }
      var callback = this.props[type];
      if (callback) {
        callback(e);
      }
    },
    render: function render() {
      var props = this.props;
      var children = props.children;
      var child = _react2["default"].Children.only(children);
      var newChildProps = {};
  
      if (this.isClickToHide() || this.isClickToShow()) {
        newChildProps.onClick = this.onClick;
        newChildProps.onMouseDown = this.onMouseDown;
        newChildProps.onTouchStart = this.onTouchStart;
      } else {
        newChildProps.onClick = this.createTwoChains('onClick');
        newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
        newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
      }
      if (this.isMouseEnterToShow()) {
        newChildProps.onMouseEnter = this.onMouseEnter;
      } else {
        newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
      }
      if (this.isMouseLeaveToHide()) {
        newChildProps.onMouseLeave = this.onMouseLeave;
      } else {
        newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
      }
      if (this.isFocusToShow() || this.isBlurToHide()) {
        newChildProps.onFocus = this.onFocus;
        newChildProps.onBlur = this.onBlur;
      } else {
        newChildProps.onFocus = this.createTwoChains('onFocus');
        newChildProps.onBlur = this.createTwoChains('onBlur');
      }
  
      return _react2["default"].cloneElement(child, newChildProps);
    }
  });
  
  exports["default"] = Trigger;
  module.exports = exports['default'];

});
