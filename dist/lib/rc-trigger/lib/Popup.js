define('node_modules/rc-trigger/lib/Popup', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('node_modules/react-dom/index');
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _rcAlign = require('node_modules/rc-align/lib/index');
  
  var _rcAlign2 = _interopRequireDefault(_rcAlign);
  
  var _rcAnimate = require('node_modules/rc-animate/lib/index');
  
  var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
  
  var _PopupInner = require('node_modules/rc-trigger/lib/PopupInner');
  
  var _PopupInner2 = _interopRequireDefault(_PopupInner);
  
  var _LazyRenderBox = require('node_modules/rc-trigger/lib/LazyRenderBox');
  
  var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var Popup = _react2["default"].createClass({
    displayName: 'Popup',
  
    propTypes: {
      visible: _react.PropTypes.bool,
      style: _react.PropTypes.object,
      getClassNameFromAlign: _react.PropTypes.func,
      onAlign: _react.PropTypes.func,
      getRootDomNode: _react.PropTypes.func,
      onMouseEnter: _react.PropTypes.func,
      align: _react.PropTypes.any,
      destroyPopupOnHide: _react.PropTypes.bool,
      className: _react.PropTypes.string,
      prefixCls: _react.PropTypes.string,
      onMouseLeave: _react.PropTypes.func
    },
  
    componentDidMount: function componentDidMount() {
      this.rootNode = this.getPopupDomNode();
    },
    onAlign: function onAlign(popupDomNode, align) {
      var props = this.props;
      var alignClassName = props.getClassNameFromAlign(props.align);
      var currentAlignClassName = props.getClassNameFromAlign(align);
      if (alignClassName !== currentAlignClassName) {
        this.currentAlignClassName = currentAlignClassName;
        popupDomNode.className = this.getClassName(currentAlignClassName);
      }
      props.onAlign(popupDomNode, align);
    },
    getPopupDomNode: function getPopupDomNode() {
      return _reactDom2["default"].findDOMNode(this.refs.popup);
    },
    getTarget: function getTarget() {
      return this.props.getRootDomNode();
    },
    getMaskTransitionName: function getMaskTransitionName() {
      var props = this.props;
      var transitionName = props.maskTransitionName;
      var animation = props.maskAnimation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },
    getTransitionName: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    },
    getClassName: function getClassName(currentAlignClassName) {
      return this.props.prefixCls + ' ' + this.props.className + ' ' + currentAlignClassName;
    },
    getPopupElement: function getPopupElement() {
      var props = this.props;
      var align = props.align;
      var style = props.style;
      var visible = props.visible;
      var prefixCls = props.prefixCls;
      var destroyPopupOnHide = props.destroyPopupOnHide;
  
      var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
      var hiddenClassName = prefixCls + '-hidden';
      if (!visible) {
        this.currentAlignClassName = null;
      }
      var newStyle = _extends({}, style, this.getZIndexStyle());
      var popupInnerProps = {
        className: className,
        prefixCls: prefixCls,
        ref: 'popup',
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        style: newStyle
      };
      if (destroyPopupOnHide) {
        return _react2["default"].createElement(
          _rcAnimate2["default"],
          {
            component: '',
            exclusive: true,
            transitionAppear: true,
            transitionName: this.getTransitionName()
          },
          visible ? _react2["default"].createElement(
            _rcAlign2["default"],
            {
              target: this.getTarget,
              key: 'popup',
              ref: this.saveAlign,
              monitorWindowResize: true,
              align: align,
              onAlign: this.onAlign
            },
            _react2["default"].createElement(
              _PopupInner2["default"],
              _extends({
                visible: true
              }, popupInnerProps),
              props.children
            )
          ) : null
        );
      }
      return _react2["default"].createElement(
        _rcAnimate2["default"],
        {
          component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName(),
          showProp: 'xVisible'
        },
        _react2["default"].createElement(
          _rcAlign2["default"],
          {
            target: this.getTarget,
            key: 'popup',
            ref: this.saveAlign,
            monitorWindowResize: true,
            xVisible: visible,
            childrenProps: { visible: 'xVisible' },
            disabled: !visible,
            align: align,
            onAlign: this.onAlign
          },
          _react2["default"].createElement(
            _PopupInner2["default"],
            _extends({
              hiddenClassName: hiddenClassName
            }, popupInnerProps),
            props.children
          )
        )
      );
    },
    getZIndexStyle: function getZIndexStyle() {
      var style = {};
      var props = this.props;
      if (props.zIndex !== undefined) {
        style.zIndex = props.zIndex;
      }
      return style;
    },
    getMaskElement: function getMaskElement() {
      var props = this.props;
      var maskElement = void 0;
      if (props.mask) {
        var maskTransition = this.getMaskTransitionName();
        maskElement = _react2["default"].createElement(_LazyRenderBox2["default"], {
          style: this.getZIndexStyle(),
          key: 'mask',
          className: props.prefixCls + '-mask',
          hiddenClassName: props.prefixCls + '-mask-hidden',
          visible: props.visible
        });
        if (maskTransition) {
          maskElement = _react2["default"].createElement(
            _rcAnimate2["default"],
            {
              key: 'mask',
              showProp: 'visible',
              transitionAppear: true,
              component: '',
              transitionName: maskTransition
            },
            maskElement
          );
        }
      }
      return maskElement;
    },
    saveAlign: function saveAlign(align) {
      this.alignInstance = align;
    },
    render: function render() {
      return _react2["default"].createElement(
        'div',
        null,
        this.getMaskElement(),
        this.getPopupElement()
      );
    }
  });
  
  exports["default"] = Popup;
  module.exports = exports['default'];

});
