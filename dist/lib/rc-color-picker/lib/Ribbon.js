define('node_modules/rc-color-picker/lib/Ribbon', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('node_modules/react-dom/index');
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _rcUtil = require('node_modules/rc-color-picker/node_modules/rc-util/index');
  
  var _rcUtil2 = _interopRequireDefault(_rcUtil);
  
  var Ribbon = (function (_React$Component) {
    _inherits(Ribbon, _React$Component);
  
    function Ribbon(props) {
      var _this = this;
  
      _classCallCheck(this, Ribbon);
  
      _get(Object.getPrototypeOf(Ribbon.prototype), 'constructor', this).call(this, props);
  
      var events = ['onMouseDown', 'onDrag', 'onDragEnd', 'pointMoveTo', '_setHuePosition'];
      events.forEach(function (e) {
        if (_this[e]) {
          _this[e] = _this[e].bind(_this);
        }
      });
    }
  
    _createClass(Ribbon, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeListeners();
      }
    }, {
      key: 'onMouseDown',
      value: function onMouseDown(e) {
        var x = e.clientX;
        var y = e.clientY;
  
        this.pointMoveTo({
          x: x, y: y
        });
  
        this.dragListener = _rcUtil2['default'].Dom.addEventListener(window, 'mousemove', this.onDrag);
        this.dragUpListener = _rcUtil2['default'].Dom.addEventListener(window, 'mouseup', this.onDragEnd);
      }
    }, {
      key: 'onDrag',
      value: function onDrag(e) {
        var x = e.clientX;
        var y = e.clientY;
        this.pointMoveTo({
          x: x, y: y
        });
      }
    }, {
      key: 'onDragEnd',
      value: function onDragEnd(e) {
        var x = e.clientX;
        var y = e.clientY;
        this.pointMoveTo({
          x: x, y: y
        });
        this.removeListeners();
      }
    }, {
      key: 'getPrefixCls',
      value: function getPrefixCls() {
        return this.props.rootPrefixCls + '-ribbon';
      }
    }, {
      key: 'pointMoveTo',
      value: function pointMoveTo(coords) {
        var rect = _reactDom2['default'].findDOMNode(this).getBoundingClientRect();
        var width = rect.width;
        var left = coords.x - rect.left;
        left = Math.max(0, left);
        left = Math.min(left, width);
        var huePercent = left / width;
        var hue = huePercent * 360;
        // 新的对象, 避免引用
        var hsv = _extends({}, this.props.hsv, {
          h: hue
        });
        this.props.onChange(hsv);
      }
    }, {
      key: 'removeListeners',
      value: function removeListeners() {
        if (this.dragListener) {
          this.dragListener.remove();
          this.dragListener = null;
        }
        if (this.dragUpListener) {
          this.dragUpListener.remove();
          this.dragUpListener = null;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var prefixCls = this.getPrefixCls();
        var HSV = this.props.hsv;
        var hue = HSV.h;
        var per = hue / 360 * 100;
        return _react2['default'].createElement(
          'div',
          { className: prefixCls },
          _react2['default'].createElement('span', { ref: 'point', style: { left: per + '%' } }),
          _react2['default'].createElement('div', {
            className: prefixCls + '-' + 'handler',
            onMouseDown: this.onMouseDown
          })
        );
      }
    }]);
  
    return Ribbon;
  })(_react2['default'].Component);
  
  exports['default'] = Ribbon;
  
  Ribbon.propTypes = {
    rootPrefixCls: _react2['default'].PropTypes.string,
    hsv: _react2['default'].PropTypes.object,
    onChange: _react2['default'].PropTypes.func
  };
  module.exports = exports['default'];

});
