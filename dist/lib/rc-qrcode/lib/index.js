define('node_modules/rc-qrcode/lib/index', function(require, exports, module) {

  (function webpackUniversalModuleDefinition(root, factory) {
  	if(typeof exports === 'object' && typeof module === 'object')
  		module.exports = factory(require("node_modules/react/react"));
  	else if(typeof define === 'function' && define.amd)
  		define(["react"], factory);
  	else if(typeof exports === 'object')
  		exports["ReactQRCode"] = factory(require("node_modules/react/react"));
  	else
  		root["ReactQRCode"] = factory(root["React"]);
  })(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
  return /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId])
  /******/ 			return installedModules[moduleId].exports;
  /******/
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			exports: {},
  /******/ 			id: moduleId,
  /******/ 			loaded: false
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.loaded = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(0);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ function(module, exports, __webpack_require__) {
  
  	'use strict';
  	
  	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  	
  	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  	
  	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
  	
  	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  	
  	var React = __webpack_require__(1);
  	
  	var _require = __webpack_require__(2);
  	
  	var QRCode = _require.QRCode;
  	var QRErrorCorrectLevel = _require.QRErrorCorrectLevel;
  	var QRCapacityTable = _require.QRCapacityTable;
  	var UTF8Array = _require.UTF8Array;
  	
  	
  	var SUPPORT_CANVAS = !!document.createElement('canvas').getContext;
  	var SUPPORT_SVG = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
  	
  	function getQRVersion(text, ecl) {
  	    var c = UTF8Array(text).length,
  	        eci = [QRErrorCorrectLevel.L, QRErrorCorrectLevel.M, QRErrorCorrectLevel.Q, QRErrorCorrectLevel.H],
  	        capacity = 0,
  	        version = void 0;
  	
  	    //figure out what version can hold the amount of text
  	    for (var i = 0, j = QRCapacityTable.length; i < j; i++) {
  	        capacity = QRCapacityTable[i][eci[ecl]];
  	        if (c < QRCapacityTable[i][eci[ecl]]) {
  	            version = i + 1;
  	            break;
  	        }
  	    }
  	
  	    if (!version) {
  	        version = QRCapacityTable.length - 1;
  	    }
  	
  	    if (capacity < c) {
  	        throw new Error("Content too long");
  	    }
  	
  	    return version;
  	}
  	
  	var ReactQRCode = function (_React$Component) {
  	    _inherits(ReactQRCode, _React$Component);
  	
  	    function ReactQRCode() {
  	        _classCallCheck(this, ReactQRCode);
  	
  	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactQRCode).apply(this, arguments));
  	    }
  	
  	    _createClass(ReactQRCode, [{
  	        key: 'render',
  	        value: function render() {
  	            var renderer = this.props.render || this.props.renderer;
  	            if (!renderer || renderer === 'auto') {
  	                renderer = SUPPORT_SVG ? 'svg' : SUPPORT_CANVAS ? 'canvas' : '';
  	            }
  	            if (renderer === 'canvas') {
  	                return React.createElement(CanvasQRCode, this.props);
  	            } else {
  	                return React.createElement(SvgQRCode, this.props);
  	            }
  	        }
  	    }]);
  	
  	    return ReactQRCode;
  	}(React.Component);
  	
  	var SvgQRCode = function (_React$Component2) {
  	    _inherits(SvgQRCode, _React$Component2);
  	
  	    function SvgQRCode() {
  	        _classCallCheck(this, SvgQRCode);
  	
  	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SvgQRCode).apply(this, arguments));
  	    }
  	
  	    _createClass(SvgQRCode, [{
  	        key: 'componentWillMount',
  	        value: function componentWillMount() {
  	            this.qrcode = new QRCode(getQRVersion(this.props.content, QRErrorCorrectLevel.M), QRErrorCorrectLevel.M);
  	            this.qrcode.addData(this.props.content);
  	            this.qrcode.make();
  	        }
  	    }, {
  	        key: 'componentWillReceiveProps',
  	        value: function componentWillReceiveProps(nextProps) {
  	            if (nextProps.content !== this.props.content) {
  	                this.qrcode = new QRCode(getQRVersion(nextProps.content, QRErrorCorrectLevel.M), QRErrorCorrectLevel.M);
  	                this.qrcode.addData(nextProps.content);
  	                this.qrcode.make();
  	            }
  	        }
  	    }, {
  	        key: 'render',
  	        value: function render() {
  	            var props = this.props;
  	            var qrcode = this.qrcode;
  	            var count = qrcode.getModuleCount();
  	            var scale = +props.scale || 4;
  	            var margin = +props.margin || 20;
  	            var size = count * scale + margin * 2;
  	
  	            var rects = [React.createElement('rect', { key: 'background', x: '0', y: '0', width: size, height: size, style: { "fill": props.background, shapeRendering: "crispEdges" } })];
  	
  	            var currenty = margin,
  	                currentx = void 0;
  	            for (var row = 0; row < count; row++) {
  	                currentx = margin;
  	                for (var col = 0; col < count; col++) {
  	                    if (qrcode.isDark(row, col)) {
  	                        rects.push(React.createElement('rect', { key: row + '-' + col, x: currentx, y: currenty, width: scale, height: scale, style: { "fill": props.foreground, shapeRendering: "crispEdges" } }));
  	                    }
  	                    currentx += scale;
  	                }
  	                currenty += scale;
  	            }
  	
  	            return React.createElement(
  	                'svg',
  	                { xmlns: 'http://www.w3.org/2000/svg', version: '1.1', width: size, height: size },
  	                rects
  	            );
  	        }
  	    }]);
  	
  	    return SvgQRCode;
  	}(React.Component);
  	
  	var CanvasQRCode = function (_React$Component3) {
  	    _inherits(CanvasQRCode, _React$Component3);
  	
  	    function CanvasQRCode() {
  	        _classCallCheck(this, CanvasQRCode);
  	
  	        return _possibleConstructorReturn(this, Object.getPrototypeOf(CanvasQRCode).apply(this, arguments));
  	    }
  	
  	    _createClass(CanvasQRCode, [{
  	        key: 'componentWillMount',
  	        value: function componentWillMount() {
  	            this.qrcode = new QRCode(getQRVersion(this.props.content, QRErrorCorrectLevel.M), QRErrorCorrectLevel.M);
  	            this.qrcode.addData(this.props.content);
  	            this.qrcode.make();
  	        }
  	    }, {
  	        key: 'componentWillReceiveProps',
  	        value: function componentWillReceiveProps(nextProps) {
  	            if (nextProps.content !== this.props.content) {
  	                this.qrcode = new QRCode(getQRVersion(nextProps.content, QRErrorCorrectLevel.M), QRErrorCorrectLevel.M);
  	                this.qrcode.addData(nextProps.content);
  	                this.qrcode.make();
  	            }
  	        }
  	    }, {
  	        key: 'componentDidMount',
  	        value: function componentDidMount() {
  	            this.draw();
  	        }
  	    }, {
  	        key: 'componentDidUpdate',
  	        value: function componentDidUpdate() {
  	            this.draw();
  	        }
  	    }, {
  	        key: 'draw',
  	        value: function draw() {
  	            var props = this.props;
  	            var qrcode = this.qrcode;
  	            var canvas = ReactDOM.findDOMNode(this);
  	            var ctx = canvas.getContext('2d');
  	            var count = qrcode.getModuleCount();
  	            var scale = +props.scale || 4;
  	            var margin = +props.margin || 20;
  	            var size = count * scale + margin * 2;
  	
  	            ctx.clearRect(0, 0, canvas.width, canvas.height);
  	            canvas.style.height = canvas.height = size;
  	            canvas.style.width = canvas.width = size;
  	            ctx.fillStyle = props.background;
  	            ctx.fillRect(0, 0, size, size);
  	
  	            ctx.fillStyle = props.foreground;
  	            var currenty = margin,
  	                currentx = void 0;
  	            // draw in the canvas
  	            for (var row = 0; row < count; row++) {
  	                currentx = margin;
  	                for (var col = 0; col < count; col++) {
  	                    if (qrcode.isDark(row, col)) {
  	                        ctx.fillRect(currentx, currenty, scale, scale);
  	                    }
  	                    currentx += scale;
  	                }
  	                currenty += scale;
  	            }
  	        }
  	    }, {
  	        key: 'render',
  	        value: function render() {
  	            return React.createElement('canvas', null);
  	        }
  	    }]);
  	
  	    return CanvasQRCode;
  	}(React.Component);
  	
  	ReactQRCode.defaultProps = {
  	    renderer: "canvas",
  	    content: "",
  	    scale: 4,
  	    margin: 20,
  	    background: "white",
  	    foreground: "black"
  	};
  	
  	ReactQRCode.propTypes = {
  	    renderer: React.PropTypes.oneOf(['canvas', 'svg', 'auto']),
  	    content: React.PropTypes.string,
  	    scale: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  	    margin: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  	    background: React.PropTypes.string,
  	    foreground: React.PropTypes.string
  	};
  	
  	module.exports = ReactQRCode;
  
  /***/ },
  /* 1 */
  /***/ function(module, exports) {
  
  	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
  
  /***/ },
  /* 2 */
  /***/ function(module, exports) {
  
  	'use strict';
  	
  	/**
  	 * QRCode for JavaScript
  	 *
  	 * modified by Ryan Day for nodejs support
  	 * Copyright (c) 2011 Ryan Day
  	 *
  	 * Licensed under the MIT license:
  	 *   http://www.opensource.org/licenses/mit-license.php
  	 *
  	 * EXPORTS:
  	 *    {
  	 *	QRCode:QRCode
  	 *	QRErrorCorrectLevel:QRErrorCorrectLevel
  	 *	}
  	 //---------------------------------------------------------------------
  	 // QRCode for JavaScript
  	 //
  	 // Copyright (c) 2009 Kazuhiko Arase
  	 //
  	 // URL: http://www.d-project.com/
  	 //
  	 // Licensed under the MIT license:
  	 //   http://www.opensource.org/licenses/mit-license.php
  	 //
  	 // The word "QR Code" is registered trademark of
  	 // DENSO WAVE INCORPORATED
  	 //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  	 //
  	 //---------------------------------------------------------------------
  	 */
  	
  	//---------------------------------------------------------------------
  	// QRCode
  	//---------------------------------------------------------------------
  	
  	exports.QRCode = QRCode;
  	
  	var QRDataArray = typeof Uint32Array == 'undefined' ? Uint32Array : Array;
  	
  	function QRCode(typeNumber, errorCorrectLevel) {
  	    this.typeNumber = typeNumber;
  	    this.errorCorrectLevel = errorCorrectLevel;
  	    this.modules = null;
  	    this.moduleCount = 0;
  	    this.dataCache = null;
  	    this.dataList = new QRDataArray();
  	}
  	
  	QRCode.prototype = {
  	
  	    addData: function addData(data) {
  	        var newData = new QR8bitByte(data);
  	
  	        this.dataList.push(newData);
  	        this.dataCache = null;
  	    },
  	
  	    isDark: function isDark(row, col) {
  	        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
  	            throw new Error(row + "," + col);
  	        }
  	        return this.modules[row][col];
  	    },
  	
  	    getModuleCount: function getModuleCount() {
  	        return this.moduleCount;
  	    },
  	
  	    make: function make() {
  	        this.makeImpl(false, this.getBestMaskPattern());
  	    },
  	
  	    makeImpl: function makeImpl(test, maskPattern) {
  	
  	        this.moduleCount = this.typeNumber * 4 + 17;
  	        this.modules = new QRDataArray(this.moduleCount);
  	
  	        for (var row = 0; row < this.moduleCount; row++) {
  	
  	            this.modules[row] = new QRDataArray(this.moduleCount);
  	
  	            for (var col = 0; col < this.moduleCount; col++) {
  	                this.modules[row][col] = null; //(col + row) % 3;
  	            }
  	        }
  	
  	        this.setupPositionProbePattern(0, 0);
  	        this.setupPositionProbePattern(this.moduleCount - 7, 0);
  	        this.setupPositionProbePattern(0, this.moduleCount - 7);
  	        this.setupPositionAdjustPattern();
  	        this.setupTimingPattern();
  	        this.setupTypeInfo(test, maskPattern);
  	
  	        if (this.typeNumber >= 7) {
  	            this.setupTypeNumber(test);
  	        }
  	
  	        if (this.dataCache == null) {
  	            this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
  	        }
  	
  	        this.mapData(this.dataCache, maskPattern);
  	    },
  	
  	    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
  	
  	        for (var r = -1; r <= 7; r++) {
  	
  	            if (row + r <= -1 || this.moduleCount <= row + r) continue;
  	
  	            for (var c = -1; c <= 7; c++) {
  	
  	                if (col + c <= -1 || this.moduleCount <= col + c) continue;
  	
  	                if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
  	                    this.modules[row + r][col + c] = true;
  	                } else {
  	                    this.modules[row + r][col + c] = false;
  	                }
  	            }
  	        }
  	    },
  	
  	    getBestMaskPattern: function getBestMaskPattern() {
  	
  	        var minLostPoint = 0;
  	        var pattern = 0;
  	
  	        for (var i = 0; i < 8; i++) {
  	
  	            this.makeImpl(true, i);
  	
  	            var lostPoint = QRUtil.getLostPoint(this);
  	
  	            if (i == 0 || minLostPoint > lostPoint) {
  	                minLostPoint = lostPoint;
  	                pattern = i;
  	            }
  	        }
  	
  	        return pattern;
  	    },
  	
  	    setupTimingPattern: function setupTimingPattern() {
  	
  	        for (var r = 8; r < this.moduleCount - 8; r++) {
  	            if (this.modules[r][6] != null) {
  	                continue;
  	            }
  	            this.modules[r][6] = r % 2 == 0;
  	        }
  	
  	        for (var c = 8; c < this.moduleCount - 8; c++) {
  	            if (this.modules[6][c] != null) {
  	                continue;
  	            }
  	            this.modules[6][c] = c % 2 == 0;
  	        }
  	    },
  	
  	    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
  	
  	        var pos = QRUtil.getPatternPosition(this.typeNumber);
  	        pos = pos || '';
  	        for (var i = 0; i < pos.length; i++) {
  	
  	            for (var j = 0; j < pos.length; j++) {
  	
  	                var row = pos[i];
  	                var col = pos[j];
  	
  	                if (this.modules[row][col] != null) {
  	                    continue;
  	                }
  	
  	                for (var r = -2; r <= 2; r++) {
  	
  	                    for (var c = -2; c <= 2; c++) {
  	
  	                        if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
  	                            this.modules[row + r][col + c] = true;
  	                        } else {
  	                            this.modules[row + r][col + c] = false;
  	                        }
  	                    }
  	                }
  	            }
  	        }
  	    },
  	
  	    setupTypeNumber: function setupTypeNumber(test) {
  	
  	        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
  	
  	        for (var i = 0; i < 18; i++) {
  	            var mod = !test && (bits >> i & 1) == 1;
  	            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
  	        }
  	
  	        for (var i = 0; i < 18; i++) {
  	            var mod = !test && (bits >> i & 1) == 1;
  	            this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
  	        }
  	    },
  	
  	    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
  	
  	        var data = this.errorCorrectLevel << 3 | maskPattern;
  	        var bits = QRUtil.getBCHTypeInfo(data);
  	
  	        // vertical
  	        for (var i = 0; i < 15; i++) {
  	
  	            var mod = !test && (bits >> i & 1) == 1;
  	
  	            if (i < 6) {
  	                this.modules[i][8] = mod;
  	            } else if (i < 8) {
  	                this.modules[i + 1][8] = mod;
  	            } else {
  	                this.modules[this.moduleCount - 15 + i][8] = mod;
  	            }
  	        }
  	
  	        // horizontal
  	        for (var i = 0; i < 15; i++) {
  	
  	            var mod = !test && (bits >> i & 1) == 1;
  	
  	            if (i < 8) {
  	                this.modules[8][this.moduleCount - i - 1] = mod;
  	            } else if (i < 9) {
  	                this.modules[8][15 - i - 1 + 1] = mod;
  	            } else {
  	                this.modules[8][15 - i - 1] = mod;
  	            }
  	        }
  	
  	        // fixed module
  	        this.modules[this.moduleCount - 8][8] = !test;
  	    },
  	
  	    mapData: function mapData(data, maskPattern) {
  	
  	        var inc = -1;
  	        var row = this.moduleCount - 1;
  	        var bitIndex = 7;
  	        var byteIndex = 0;
  	
  	        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
  	
  	            if (col == 6) col--;
  	
  	            while (true) {
  	
  	                for (var c = 0; c < 2; c++) {
  	
  	                    if (this.modules[row][col - c] == null) {
  	
  	                        var dark = false;
  	
  	                        if (byteIndex < data.length) {
  	                            dark = (data[byteIndex] >>> bitIndex & 1) == 1;
  	                        }
  	
  	                        var mask = QRUtil.getMask(maskPattern, row, col - c);
  	
  	                        if (mask) {
  	                            dark = !dark;
  	                        }
  	
  	                        this.modules[row][col - c] = dark;
  	                        bitIndex--;
  	
  	                        if (bitIndex == -1) {
  	                            byteIndex++;
  	                            bitIndex = 7;
  	                        }
  	                    }
  	                }
  	
  	                row += inc;
  	
  	                if (row < 0 || this.moduleCount <= row) {
  	                    row -= inc;
  	                    inc = -inc;
  	                    break;
  	                }
  	            }
  	        }
  	    }
  	
  	};
  	
  	QRCode.PAD0 = 0xEC;
  	QRCode.PAD1 = 0x11;
  	
  	QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {
  	
  	    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  	
  	    var buffer = new QRBitBuffer();
  	
  	    for (var i = 0; i < dataList.length; i++) {
  	        var data = dataList[i];
  	        buffer.put(data.mode, 4);
  	        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
  	        data.write(buffer);
  	    }
  	
  	    // calc num max data.
  	    var totalDataCount = 0;
  	    for (var i = 0; i < rsBlocks.length; i++) {
  	        totalDataCount += rsBlocks[i].dataCount;
  	    }
  	
  	    if (buffer.getLengthInBits() > totalDataCount * 8) {
  	        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
  	    }
  	
  	    // end code
  	    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
  	        buffer.put(0, 4);
  	    }
  	
  	    // padding
  	    while (buffer.getLengthInBits() % 8 != 0) {
  	        buffer.putBit(false);
  	    }
  	
  	    // padding
  	    while (true) {
  	
  	        if (buffer.getLengthInBits() >= totalDataCount * 8) {
  	            break;
  	        }
  	        buffer.put(QRCode.PAD0, 8);
  	
  	        if (buffer.getLengthInBits() >= totalDataCount * 8) {
  	            break;
  	        }
  	        buffer.put(QRCode.PAD1, 8);
  	    }
  	
  	    return QRCode.createBytes(buffer, rsBlocks);
  	};
  	
  	QRCode.createBytes = function (buffer, rsBlocks) {
  	
  	    var offset = 0;
  	
  	    var maxDcCount = 0;
  	    var maxEcCount = 0;
  	
  	    var dcdata = new QRDataArray(rsBlocks.length);
  	    var ecdata = new QRDataArray(rsBlocks.length);
  	
  	    for (var r = 0; r < rsBlocks.length; r++) {
  	
  	        var dcCount = rsBlocks[r].dataCount;
  	        var ecCount = rsBlocks[r].totalCount - dcCount;
  	
  	        maxDcCount = Math.max(maxDcCount, dcCount);
  	        maxEcCount = Math.max(maxEcCount, ecCount);
  	
  	        dcdata[r] = new QRDataArray(dcCount);
  	
  	        for (var i = 0; i < dcdata[r].length; i++) {
  	            dcdata[r][i] = 0xff & buffer.buffer[i + offset];
  	        }
  	        offset += dcCount;
  	
  	        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
  	        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
  	
  	        var modPoly = rawPoly.mod(rsPoly);
  	        ecdata[r] = new QRDataArray(rsPoly.getLength() - 1);
  	        for (var i = 0; i < ecdata[r].length; i++) {
  	            var modIndex = i + modPoly.getLength() - ecdata[r].length;
  	            ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
  	        }
  	    }
  	
  	    var totalCodeCount = 0;
  	    for (var i = 0; i < rsBlocks.length; i++) {
  	        totalCodeCount += rsBlocks[i].totalCount;
  	    }
  	
  	    var data = new QRDataArray(totalCodeCount);
  	    var index = 0;
  	
  	    for (var i = 0; i < maxDcCount; i++) {
  	        for (var r = 0; r < rsBlocks.length; r++) {
  	            if (i < dcdata[r].length) {
  	                data[index++] = dcdata[r][i];
  	            }
  	        }
  	    }
  	
  	    for (var i = 0; i < maxEcCount; i++) {
  	        for (var r = 0; r < rsBlocks.length; r++) {
  	            if (i < ecdata[r].length) {
  	                data[index++] = ecdata[r][i];
  	            }
  	        }
  	    }
  	
  	    return data;
  	};
  	
  	//---------------------------------------------------------------------
  	// QR8bitByte
  	//---------------------------------------------------------------------
  	function QR8bitByte(data) {
  	    this.mode = QRMode.MODE_8BIT_BYTE;
  	    this.data = data;
  	    this.parsedData = UTF8Array(data);
  	}
  	
  	QR8bitByte.prototype = {
  	    getLength: function getLength(buffer) {
  	        return this.parsedData.length;
  	    },
  	    write: function write(buffer) {
  	        for (var i = 0, l = this.parsedData.length; i < l; i++) {
  	            buffer.put(this.parsedData[i], 8);
  	        }
  	    }
  	};
  	
  	//---------------------------------------------------------------------
  	// QRMode
  	//---------------------------------------------------------------------
  	
  	var QRMode = {
  	    MODE_NUMBER: 1 << 0,
  	    MODE_ALPHA_NUM: 1 << 1,
  	    MODE_8BIT_BYTE: 1 << 2,
  	    MODE_KANJI: 1 << 3
  	};
  	
  	//---------------------------------------------------------------------
  	// QRErrorCorrectLevel
  	//---------------------------------------------------------------------
  	//exported
  	
  	var QRErrorCorrectLevel = exports.QRErrorCorrectLevel = {
  	    L: 1,
  	    M: 0,
  	    Q: 3,
  	    H: 2
  	};
  	
  	//---------------------------------------------------------------------
  	// QRMaskPattern
  	//---------------------------------------------------------------------
  	
  	var QRMaskPattern = {
  	    PATTERN000: 0,
  	    PATTERN001: 1,
  	    PATTERN010: 2,
  	    PATTERN011: 3,
  	    PATTERN100: 4,
  	    PATTERN101: 5,
  	    PATTERN110: 6,
  	    PATTERN111: 7
  	};
  	
  	//---------------------------------------------------------------------
  	// QRUtil
  	//---------------------------------------------------------------------
  	
  	var QRUtil = {
  	
  	    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  	
  	    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  	    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  	    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  	
  	    getBCHTypeInfo: function getBCHTypeInfo(data) {
  	        var d = data << 10;
  	        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
  	            d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
  	        }
  	        return (data << 10 | d) ^ QRUtil.G15_MASK;
  	    },
  	
  	    getBCHTypeNumber: function getBCHTypeNumber(data) {
  	        var d = data << 12;
  	        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
  	            d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
  	        }
  	        return data << 12 | d;
  	    },
  	
  	    getBCHDigit: function getBCHDigit(data) {
  	
  	        var digit = 0;
  	
  	        while (data != 0) {
  	            digit++;
  	            data >>>= 1;
  	        }
  	
  	        return digit;
  	    },
  	
  	    getPatternPosition: function getPatternPosition(typeNumber) {
  	        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  	    },
  	
  	    getMask: function getMask(maskPattern, i, j) {
  	
  	        switch (maskPattern) {
  	
  	            case QRMaskPattern.PATTERN000:
  	                return (i + j) % 2 == 0;
  	            case QRMaskPattern.PATTERN001:
  	                return i % 2 == 0;
  	            case QRMaskPattern.PATTERN010:
  	                return j % 3 == 0;
  	            case QRMaskPattern.PATTERN011:
  	                return (i + j) % 3 == 0;
  	            case QRMaskPattern.PATTERN100:
  	                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
  	            case QRMaskPattern.PATTERN101:
  	                return i * j % 2 + i * j % 3 == 0;
  	            case QRMaskPattern.PATTERN110:
  	                return (i * j % 2 + i * j % 3) % 2 == 0;
  	            case QRMaskPattern.PATTERN111:
  	                return (i * j % 3 + (i + j) % 2) % 2 == 0;
  	
  	            default:
  	                throw new Error("bad maskPattern:" + maskPattern);
  	        }
  	    },
  	
  	    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
  	
  	        var a = new QRPolynomial([1], 0);
  	
  	        for (var i = 0; i < errorCorrectLength; i++) {
  	            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
  	        }
  	
  	        return a;
  	    },
  	
  	    getLengthInBits: function getLengthInBits(mode, type) {
  	
  	        if (1 <= type && type < 10) {
  	
  	            // 1 - 9
  	
  	            switch (mode) {
  	                case QRMode.MODE_NUMBER:
  	                    return 10;
  	                case QRMode.MODE_ALPHA_NUM:
  	                    return 9;
  	                case QRMode.MODE_8BIT_BYTE:
  	                    return 8;
  	                case QRMode.MODE_KANJI:
  	                    return 8;
  	                default:
  	                    throw new Error("mode:" + mode);
  	            }
  	        } else if (type < 27) {
  	
  	            // 10 - 26
  	
  	            switch (mode) {
  	                case QRMode.MODE_NUMBER:
  	                    return 12;
  	                case QRMode.MODE_ALPHA_NUM:
  	                    return 11;
  	                case QRMode.MODE_8BIT_BYTE:
  	                    return 16;
  	                case QRMode.MODE_KANJI:
  	                    return 10;
  	                default:
  	                    throw new Error("mode:" + mode);
  	            }
  	        } else if (type < 41) {
  	
  	            // 27 - 40
  	
  	            switch (mode) {
  	                case QRMode.MODE_NUMBER:
  	                    return 14;
  	                case QRMode.MODE_ALPHA_NUM:
  	                    return 13;
  	                case QRMode.MODE_8BIT_BYTE:
  	                    return 16;
  	                case QRMode.MODE_KANJI:
  	                    return 12;
  	                default:
  	                    throw new Error("mode:" + mode);
  	            }
  	        } else {
  	            throw new Error("type:" + type);
  	        }
  	    },
  	
  	    getLostPoint: function getLostPoint(qrCode) {
  	
  	        var moduleCount = qrCode.getModuleCount();
  	
  	        var lostPoint = 0;
  	
  	        // LEVEL1
  	
  	        for (var row = 0; row < moduleCount; row++) {
  	
  	            for (var col = 0; col < moduleCount; col++) {
  	
  	                var sameCount = 0;
  	                var dark = qrCode.isDark(row, col);
  	
  	                for (var r = -1; r <= 1; r++) {
  	
  	                    if (row + r < 0 || moduleCount <= row + r) {
  	                        continue;
  	                    }
  	
  	                    for (var c = -1; c <= 1; c++) {
  	
  	                        if (col + c < 0 || moduleCount <= col + c) {
  	                            continue;
  	                        }
  	
  	                        if (r == 0 && c == 0) {
  	                            continue;
  	                        }
  	
  	                        if (dark == qrCode.isDark(row + r, col + c)) {
  	                            sameCount++;
  	                        }
  	                    }
  	                }
  	
  	                if (sameCount > 5) {
  	                    lostPoint += 3 + sameCount - 5;
  	                }
  	            }
  	        }
  	
  	        // LEVEL2
  	
  	        for (var row = 0; row < moduleCount - 1; row++) {
  	            for (var col = 0; col < moduleCount - 1; col++) {
  	                var count = 0;
  	                if (qrCode.isDark(row, col)) count++;
  	                if (qrCode.isDark(row + 1, col)) count++;
  	                if (qrCode.isDark(row, col + 1)) count++;
  	                if (qrCode.isDark(row + 1, col + 1)) count++;
  	                if (count == 0 || count == 4) {
  	                    lostPoint += 3;
  	                }
  	            }
  	        }
  	
  	        // LEVEL3
  	
  	        for (var row = 0; row < moduleCount; row++) {
  	            for (var col = 0; col < moduleCount - 6; col++) {
  	                if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
  	                    lostPoint += 40;
  	                }
  	            }
  	        }
  	
  	        for (var col = 0; col < moduleCount; col++) {
  	            for (var row = 0; row < moduleCount - 6; row++) {
  	                if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
  	                    lostPoint += 40;
  	                }
  	            }
  	        }
  	
  	        // LEVEL4
  	
  	        var darkCount = 0;
  	
  	        for (var col = 0; col < moduleCount; col++) {
  	            for (var row = 0; row < moduleCount; row++) {
  	                if (qrCode.isDark(row, col)) {
  	                    darkCount++;
  	                }
  	            }
  	        }
  	
  	        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
  	        lostPoint += ratio * 10;
  	
  	        return lostPoint;
  	    }
  	
  	};
  	
  	//---------------------------------------------------------------------
  	// QRMath
  	//---------------------------------------------------------------------
  	
  	var QRMath = {
  	
  	    glog: function glog(n) {
  	
  	        if (n < 1) {
  	            throw new Error("glog(" + n + ")");
  	        }
  	
  	        return QRMath.LOG_TABLE[n];
  	    },
  	
  	    gexp: function gexp(n) {
  	
  	        while (n < 0) {
  	            n += 255;
  	        }
  	
  	        while (n >= 256) {
  	            n -= 255;
  	        }
  	
  	        return QRMath.EXP_TABLE[n];
  	    },
  	
  	    EXP_TABLE: new Array(256),
  	
  	    LOG_TABLE: new Array(256)
  	
  	};
  	
  	for (var i = 0; i < 8; i++) {
  	    QRMath.EXP_TABLE[i] = 1 << i;
  	}
  	for (var i = 8; i < 256; i++) {
  	    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  	}
  	for (var i = 0; i < 255; i++) {
  	    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  	}
  	
  	//---------------------------------------------------------------------
  	// QRPolynomial
  	//---------------------------------------------------------------------
  	
  	function QRPolynomial(num, shift) {
  	
  	    if (num.length == undefined) {
  	        throw new Error(num.length + "/" + shift);
  	    }
  	
  	    var offset = 0;
  	
  	    while (offset < num.length && num[offset] == 0) {
  	        offset++;
  	    }
  	
  	    this.num = new Array(num.length - offset + shift);
  	    for (var i = 0; i < num.length - offset; i++) {
  	        this.num[i] = num[i + offset];
  	    }
  	}
  	
  	QRPolynomial.prototype = {
  	
  	    get: function get(index) {
  	        return this.num[index];
  	    },
  	
  	    getLength: function getLength() {
  	        return this.num.length;
  	    },
  	
  	    multiply: function multiply(e) {
  	
  	        var num = new Array(this.getLength() + e.getLength() - 1);
  	
  	        for (var i = 0; i < this.getLength(); i++) {
  	            for (var j = 0; j < e.getLength(); j++) {
  	                num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
  	            }
  	        }
  	
  	        return new QRPolynomial(num, 0);
  	    },
  	
  	    mod: function mod(e) {
  	
  	        if (this.getLength() - e.getLength() < 0) {
  	            return this;
  	        }
  	
  	        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
  	
  	        var num = new Array(this.getLength());
  	
  	        for (var i = 0; i < this.getLength(); i++) {
  	            num[i] = this.get(i);
  	        }
  	
  	        for (var i = 0; i < e.getLength(); i++) {
  	            num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
  	        }
  	
  	        // recursive call
  	        return new QRPolynomial(num, 0).mod(e);
  	    }
  	};
  	
  	//---------------------------------------------------------------------
  	// QRRSBlock
  	//---------------------------------------------------------------------
  	
  	function QRRSBlock(totalCount, dataCount) {
  	    this.totalCount = totalCount;
  	    this.dataCount = dataCount;
  	}
  	
  	QRRSBlock.RS_BLOCK_TABLE = [
  	// L
  	// M
  	// Q
  	// H
  	
  	// 1
  	[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
  	// 2
  	[1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
  	// 3
  	[1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
  	// 4
  	[1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
  	// 5
  	[1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
  	// 6
  	[2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
  	// 7
  	[2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
  	// 8
  	[2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15],
  	// 9
  	[2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13],
  	// 10
  	[2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16]
  	//NOTE added by Ryan Day.to make greater than version 10 qrcodes
  	// this table starts on page 40 of the spec PDF. google ISO/IEC 18004
  	// 11
  	, [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13]
  	//12
  	, [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15]
  	//13
  	, [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12]
  	//14
  	, [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13]
  	//15
  	, [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13]
  	//16
  	, [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16]
  	//17
  	, [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15]
  	//18
  	, [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15]
  	//19
  	, [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14]
  	//20
  	, [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16]
  	//21
  	, [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17]
  	//22
  	, [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13]
  	//23
  	, [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16]
  	//24
  	, [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17]
  	//25
  	, [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16]
  	//26
  	, [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17]
  	//27
  	, [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16]
  	//28
  	, [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16]
  	//29
  	, [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16]
  	//30
  	, [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16]
  	//31
  	, [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16]
  	//32
  	, [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16]
  	//33
  	, [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16]
  	//34
  	, [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17]
  	//35
  	, [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16]
  	//36
  	, [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16]
  	//37
  	, [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16]
  	//38
  	, [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16]
  	//39
  	, [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16]
  	//40
  	, [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
  	
  	QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
  	
  	    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
  	
  	    if (rsBlock == undefined) {
  	        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
  	    }
  	
  	    var length = rsBlock.length / 3;
  	
  	    var list = new Array();
  	
  	    for (var i = 0; i < length; i++) {
  	
  	        var count = rsBlock[i * 3 + 0];
  	        var totalCount = rsBlock[i * 3 + 1];
  	        var dataCount = rsBlock[i * 3 + 2];
  	
  	        for (var j = 0; j < count; j++) {
  	            list.push(new QRRSBlock(totalCount, dataCount));
  	        }
  	    }
  	
  	    return list;
  	};
  	
  	QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
  	
  	    switch (errorCorrectLevel) {
  	        case QRErrorCorrectLevel.L:
  	            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
  	        case QRErrorCorrectLevel.M:
  	            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
  	        case QRErrorCorrectLevel.Q:
  	            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
  	        case QRErrorCorrectLevel.H:
  	            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
  	        default:
  	            return undefined;
  	    }
  	};
  	
  	//---------------------------------------------------------------------
  	// QRBitBuffer
  	//---------------------------------------------------------------------
  	
  	function QRBitBuffer() {
  	    this.buffer = new Array();
  	    this.length = 0;
  	}
  	
  	QRBitBuffer.prototype = {
  	
  	    get: function get(index) {
  	        var bufIndex = Math.floor(index / 8);
  	        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  	    },
  	
  	    put: function put(num, length) {
  	        for (var i = 0; i < length; i++) {
  	            this.putBit((num >>> length - i - 1 & 1) == 1);
  	        }
  	    },
  	
  	    getLengthInBits: function getLengthInBits() {
  	        return this.length;
  	    },
  	
  	    putBit: function putBit(bit) {
  	
  	        var bufIndex = Math.floor(this.length / 8);
  	        if (this.buffer.length <= bufIndex) {
  	            this.buffer.push(0);
  	        }
  	
  	        if (bit) {
  	            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
  	        }
  	
  	        this.length++;
  	    }
  	};
  	
  	exports.QRCapacityTable = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137] //11
  	, [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511] //24
  	, [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658] //28
  	, [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842] //32
  	, [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051] //36
  	, [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273] //40
  	];
  	
  	function UTF8Array(source) {
  	    if (Array.isArray(source)) {
  	        return new Uint8Array(source);
  	    }
  	
  	    return from_utf(source);
  	}
  	
  	exports.UTF8Array = UTF8Array;
  	
  	function from_utf(str) {
  	    var arr = [],
  	        code;
  	
  	    for (var i = 0, len = str.length; i < len; ++i) {
  	        code = fixed_cca(str, i);
  	
  	        if (code === false) {
  	            continue;
  	        }
  	
  	        if (code < 0x80) {
  	            arr[arr.length] = code;
  	
  	            continue;
  	        }
  	
  	        codepoint_to_bytes(arr, code);
  	    }
  	
  	    return new Uint8Array(arr);
  	}
  	
  	function codepoint_to_bytes(arr, code) {
  	    // find MSB, use that to determine byte count
  	    var copy_code = code,
  	        bit_count = 0,
  	        byte_count,
  	        prefix,
  	        _byte,
  	        pos;
  	
  	    do {
  	        ++bit_count;
  	    } while (copy_code >>>= 1);
  	
  	    byte_count = Math.ceil((bit_count - 1) / 5) | 0;
  	    prefix = [0, 0, 0xc0, 0xe0, 0xf0, 0xf8, 0xfc][byte_count];
  	    pos = [0, 0, 3, 4, 5, 6, 7][byte_count];
  	
  	    _byte |= prefix;
  	
  	    bit_count = 7 - pos + 6 * (byte_count - 1);
  	
  	    while (bit_count) {
  	        _byte |= +!!(code & 1 << bit_count) << 7 - pos;
  	        ++pos;
  	
  	        if (pos % 8 === 0) {
  	            arr[arr.length] = _byte;
  	            _byte = 0x80;
  	            pos = 2;
  	        }
  	
  	        --bit_count;
  	    }
  	
  	    if (pos) {
  	        _byte |= +!!(code & 1) << 7 - pos;
  	        arr[arr.length] = _byte;
  	    }
  	}
  	
  	function fixed_cca(str, idx) {
  	    idx = idx || 0;
  	
  	    var code = str.charCodeAt(idx),
  	        lo,
  	        hi;
  	
  	    if (0xD800 <= code && code <= 0xDBFF) {
  	        lo = str.charCodeAt(idx + 1);
  	        hi = code;
  	
  	        if (isNaN(lo)) {
  	            throw new Error('High surrogate not followed by low surrogate');
  	        }
  	
  	        return (hi - 0xD800) * 0x400 + (lo - 0xDC00) + 0x10000;
  	    }
  	
  	    if (0xDC00 <= code && code <= 0xDFFF) {
  	        return false;
  	    }
  	
  	    return code;
  	}
  
  /***/ }
  /******/ ])
  });
  ;
  //# sourceMappingURL=/node_modules/rc-qrcode/lib/index.js.map

});
