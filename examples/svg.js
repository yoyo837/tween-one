webpackJsonp([18],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(203);


/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcTweenOne = __webpack_require__(2);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _SvgMorphPlugin = __webpack_require__(204);
	
	var _SvgMorphPlugin2 = _interopRequireDefault(_SvgMorphPlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	_rcTweenOne2.default.plugins.push(_SvgMorphPlugin2.default);
	
	var Demo = function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'svg',
	      { width: '100%', height: '600', version: '1.2' },
	      _react2.default.createElement(_rcTweenOne2.default, {
	        animation: {
	          d: 'M294.863,134.137c0,0,49.599-76.923,26.082,0' + 's-55.142,119.658-55.142,19.658S161.53,19.521,294.863,34.137z'
	        },
	        style: { fill: '#fff000', storkeWidth: 1, stroke: '#000fff' },
	        component: 'path',
	        d: 'M294.863,134.137c0,0,49.599-76.923,126.082,0s-55.142, 119.658-55.142,119.658S161.53,149.521,294.863,134.137z',
	        attr: 'attr'
	      })
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _snapsvglite = __webpack_require__(205);
	
	var SvgPlugin = function SvgPlugin(target, vars, key) {
	  this.target = target;
	  this.vars = vars;
	  this.key = key;
	  this.propsData = {};
	}; /* eslint-disable func-names */
	
	
	var p = SvgPlugin.prototype = {
	  name: 'SVGMorph'
	};
	p.getPointVars = function (d) {
	  return d.split(/\s+/).map(function (item) {
	    return item.split(',').map(function (_item) {
	      return parseFloat(_item);
	    });
	  });
	};
	p.polygonPoints = function (start, end) {
	  var startArray = this.getPointVars(start);
	  var endArray = this.getPointVars(end);
	  if (startArray.length !== endArray.length) {
	    var long = startArray.length > endArray.length ? startArray : endArray;
	    var short = long === startArray ? endArray : startArray;
	    for (var i = short.length; i < long.length; i++) {
	      short[i] = short[short.length - 1];
	    }
	    return startArray.length > endArray.length ? [long, short] : [short, long];
	  }
	  return [startArray, endArray];
	};
	p.getAnimStart = function () {
	  this.start = this.target.getAttribute(this.key);
	  if (this.key === 'd') {
	    this.pathArray = (0, _snapsvglite.path2curve)(this.start, this.vars);
	  } else {
	    this.pathArray = this.polygonPoints(this.start, this.vars);
	  }
	  return this.pathArray;
	};
	p.setArrayRatio = function (ratio, start, item, i) {
	  if (typeof item === 'string') {
	    return item;
	  }
	  var startData = start[i];
	  return (item - startData) * ratio + startData;
	};
	p.setRatio = function (ratio, tween) {
	  var _this = this;
	
	  var start = this.pathArray[0];
	  var end = this.pathArray[1];
	  tween[this.key] = end.map(function (item, i) {
	    var startData = start[i];
	    var t = item.map(_this.setArrayRatio.bind(_this, ratio, startData));
	    var name = t[0];
	    if (_this.key === 'd') {
	      t.shift();
	    }
	    return _this.key === 'd' ? '' + name + t.join(',') : t.join(',');
	  });
	  var vars = ratio === 1 ? this.vars : tween[this.key].join(' ');
	  vars = ratio === 0 ? this.start : vars;
	  if (vars) {
	    this.target.setAttribute(this.key, vars);
	  }
	};
	exports.default = SvgPlugin;
	module.exports = exports['default'];

/***/ },

/***/ 205:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.path2curve = path2curve;
	/* eslint-disable */
	
	/*
	 * Useful things from Adobe's Snap.svg adopted to the library needs
	 * source: https://github.com/alexk111/SVG-Morpheus
	 */
	/*
	 * Paths
	 */
	
	var spaces = "\t\n\u000b\f\r   ᠎             　\u2028\u2029";
	var pathCommand = new RegExp("([a-z])[" + spaces + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + spaces + "]*,?[" + spaces + "]*)+)", "ig");
	var pathValues = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + spaces + "]*,?[" + spaces + "]*", "ig");
	
	// Parses given path string into an array of arrays of path segments
	var parsePathString = function parsePathString(pathString) {
	  if (!pathString) {
	    return null;
	  }
	
	  if ((typeof pathString === "undefined" ? "undefined" : _typeof(pathString)) === _typeof([])) {
	    return pathString;
	  } else {
	    var paramCounts = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 },
	        data = [];
	
	    String(pathString).replace(pathCommand, function (a, b, c) {
	      var params = [],
	          name = b.toLowerCase();
	      c.replace(pathValues, function (a, b) {
	        b && params.push(+b);
	      });
	      if (name == "m" && params.length > 2) {
	        data.push([b].concat(params.splice(0, 2)));
	        name = "l";
	        b = b == "m" ? "l" : "L";
	      }
	      if (name == "o" && params.length == 1) {
	        data.push([b, params[0]]);
	      }
	      if (name == "r") {
	        data.push([b].concat(params));
	      } else while (params.length >= paramCounts[name]) {
	        data.push([b].concat(params.splice(0, paramCounts[name])));
	        if (!paramCounts[name]) {
	          break;
	        }
	      }
	    });
	
	    return data;
	  }
	};
	
	// http://schepers.cc/getting-to-the-point
	var catmullRom2bezier = function catmullRom2bezier(crp, z) {
	  var d = [];
	  for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
	    var p = [{ x: +crp[i - 2], y: +crp[i - 1] }, { x: +crp[i], y: +crp[i + 1] }, { x: +crp[i + 2], y: +crp[i + 3] }, { x: +crp[i + 4], y: +crp[i + 5] }];
	    if (z) {
	      if (!i) {
	        p[0] = { x: +crp[iLen - 2], y: +crp[iLen - 1] };
	      } else if (iLen - 4 == i) {
	        p[3] = { x: +crp[0], y: +crp[1] };
	      } else if (iLen - 2 == i) {
	        p[2] = { x: +crp[0], y: +crp[1] };
	        p[3] = { x: +crp[2], y: +crp[3] };
	      }
	    } else {
	      if (iLen - 4 == i) {
	        p[3] = p[2];
	      } else if (!i) {
	        p[0] = { x: +crp[i], y: +crp[i + 1] };
	      }
	    }
	    d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y]);
	  }
	
	  return d;
	};
	
	var ellipsePath = function ellipsePath(x, y, rx, ry, a) {
	  if (a == null && ry == null) {
	    ry = rx;
	  }
	  x = +x;
	  y = +y;
	  rx = +rx;
	  ry = +ry;
	  if (a != null) {
	    var rad = Math.PI / 180,
	        x1 = x + rx * Math.cos(-ry * rad),
	        x2 = x + rx * Math.cos(-a * rad),
	        y1 = y + rx * Math.sin(-ry * rad),
	        y2 = y + rx * Math.sin(-a * rad),
	        res = [["M", x1, y1], ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
	  } else {
	    res = [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
	  }
	  return res;
	};
	
	var pathToAbsolute = function pathToAbsolute(pathArray) {
	  pathArray = parsePathString(pathArray);
	
	  if (!pathArray || !pathArray.length) {
	    return [["M", 0, 0]];
	  }
	  var res = [],
	      x = 0,
	      y = 0,
	      mx = 0,
	      my = 0,
	      start = 0,
	      pa0;
	  if (pathArray[0][0] == "M") {
	    x = +pathArray[0][1];
	    y = +pathArray[0][2];
	    mx = x;
	    my = y;
	    start++;
	    res[0] = ["M", x, y];
	  }
	  var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
	  for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
	    res.push(r = []);
	    pa = pathArray[i];
	    pa0 = pa[0];
	    if (pa0 != pa0.toUpperCase()) {
	      r[0] = pa0.toUpperCase();
	      switch (r[0]) {
	        case "A":
	          r[1] = pa[1];
	          r[2] = pa[2];
	          r[3] = pa[3];
	          r[4] = pa[4];
	          r[5] = pa[5];
	          r[6] = +pa[6] + x;
	          r[7] = +pa[7] + y;
	          break;
	        case "V":
	          r[1] = +pa[1] + y;
	          break;
	        case "H":
	          r[1] = +pa[1] + x;
	          break;
	        case "R":
	          var dots = [x, y].concat(pa.slice(1));
	          for (var j = 2, jj = dots.length; j < jj; j++) {
	            dots[j] = +dots[j] + x;
	            dots[++j] = +dots[j] + y;
	          }
	          res.pop();
	          res = res.concat(catmullRom2bezier(dots, crz));
	          break;
	        case "O":
	          res.pop();
	          dots = ellipsePath(x, y, pa[1], pa[2]);
	          dots.push(dots[0]);
	          res = res.concat(dots);
	          break;
	        case "U":
	          res.pop();
	          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	          r = ["U"].concat(res[res.length - 1].slice(-2));
	          break;
	        case "M":
	          mx = +pa[1] + x;
	          my = +pa[2] + y;
	        default:
	          for (j = 1, jj = pa.length; j < jj; j++) {
	            r[j] = +pa[j] + (j % 2 ? x : y);
	          }
	      }
	    } else if (pa0 == "R") {
	      dots = [x, y].concat(pa.slice(1));
	      res.pop();
	      res = res.concat(catmullRom2bezier(dots, crz));
	      r = ["R"].concat(pa.slice(-2));
	    } else if (pa0 == "O") {
	      res.pop();
	      dots = ellipsePath(x, y, pa[1], pa[2]);
	      dots.push(dots[0]);
	      res = res.concat(dots);
	    } else if (pa0 == "U") {
	      res.pop();
	      res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	      r = ["U"].concat(res[res.length - 1].slice(-2));
	    } else {
	      for (var k = 0, kk = pa.length; k < kk; k++) {
	        r[k] = pa[k];
	      }
	    }
	    pa0 = pa0.toUpperCase();
	    if (pa0 != "O") {
	      switch (r[0]) {
	        case "Z":
	          x = +mx;
	          y = +my;
	          break;
	        case "H":
	          x = r[1];
	          break;
	        case "V":
	          y = r[1];
	          break;
	        case "M":
	          mx = r[r.length - 2];
	          my = r[r.length - 1];
	        default:
	          x = r[r.length - 2];
	          y = r[r.length - 1];
	      }
	    }
	  }
	
	  return res;
	};
	
	var l2c = function l2c(x1, y1, x2, y2) {
	  return [x1, y1, x2, y2, x2, y2];
	};
	var q2c = function q2c(x1, y1, ax, ay, x2, y2) {
	  var _13 = 1 / 3,
	      _23 = 2 / 3;
	  return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2];
	};
	var a2c = function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	  // for more information of where this math came from visit:
	  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	  var _120 = Math.PI * 120 / 180,
	      rad = Math.PI / 180 * (+angle || 0),
	      res = [],
	      xy,
	      rotate = function rotate(x, y, rad) {
	    var X = x * Math.cos(rad) - y * Math.sin(rad),
	        Y = x * Math.sin(rad) + y * Math.cos(rad);
	    return { x: X, y: Y };
	  };
	  if (!recursive) {
	    xy = rotate(x1, y1, -rad);
	    x1 = xy.x;
	    y1 = xy.y;
	    xy = rotate(x2, y2, -rad);
	    x2 = xy.x;
	    y2 = xy.y;
	    var cos = Math.cos(Math.PI / 180 * angle),
	        sin = Math.sin(Math.PI / 180 * angle),
	        x = (x1 - x2) / 2,
	        y = (y1 - y2) / 2;
	    var h = x * x / (rx * rx) + y * y / (ry * ry);
	    if (h > 1) {
	      h = Math.sqrt(h);
	      rx = h * rx;
	      ry = h * ry;
	    }
	    var rx2 = rx * rx,
	        ry2 = ry * ry,
	        k = (large_arc_flag == sweep_flag ? -1 : 1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
	        cx = k * rx * y / ry + (x1 + x2) / 2,
	        cy = k * -ry * x / rx + (y1 + y2) / 2,
	        f1 = Math.asin(((y1 - cy) / ry).toFixed(9)),
	        f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
	
	    f1 = x1 < cx ? Math.PI - f1 : f1;
	    f2 = x2 < cx ? Math.PI - f2 : f2;
	    f1 < 0 && (f1 = Math.PI * 2 + f1);
	    f2 < 0 && (f2 = Math.PI * 2 + f2);
	    if (sweep_flag && f1 > f2) {
	      f1 = f1 - Math.PI * 2;
	    }
	    if (!sweep_flag && f2 > f1) {
	      f2 = f2 - Math.PI * 2;
	    }
	  } else {
	    f1 = recursive[0];
	    f2 = recursive[1];
	    cx = recursive[2];
	    cy = recursive[3];
	  }
	  var df = f2 - f1;
	  if (Math.abs(df) > _120) {
	    var f2old = f2,
	        x2old = x2,
	        y2old = y2;
	    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
	    x2 = cx + rx * Math.cos(f2);
	    y2 = cy + ry * Math.sin(f2);
	    res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	  }
	  df = f2 - f1;
	  var c1 = Math.cos(f1),
	      s1 = Math.sin(f1),
	      c2 = Math.cos(f2),
	      s2 = Math.sin(f2),
	      t = Math.tan(df / 4),
	      hx = 4 / 3 * rx * t,
	      hy = 4 / 3 * ry * t,
	      m1 = [x1, y1],
	      m2 = [x1 + hx * s1, y1 - hy * c1],
	      m3 = [x2 + hx * s2, y2 - hy * c2],
	      m4 = [x2, y2];
	  m2[0] = 2 * m1[0] - m2[0];
	  m2[1] = 2 * m1[1] - m2[1];
	  if (recursive) {
	    return [m2, m3, m4].concat(res);
	  } else {
	    res = [m2, m3, m4].concat(res).join().split(",");
	    var newres = [];
	    for (var i = 0, ii = res.length; i < ii; i++) {
	      newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
	    }
	    return newres;
	  }
	};
	
	function path2curve(path, path2) {
	  var p = pathToAbsolute(path),
	      p2 = path2 && pathToAbsolute(path2),
	      attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
	      attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
	      processPath = function processPath(path, d, pcom) {
	    var nx, ny;
	    if (!path) {
	      return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
	    }
	    !(path[0] in { T: 1, Q: 1 }) && (d.qx = d.qy = null);
	    switch (path[0]) {
	      case "M":
	        d.X = path[1];
	        d.Y = path[2];
	        break;
	      case "A":
	        path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
	        break;
	      case "S":
	        if (pcom == "C" || pcom == "S") {
	          // In "S" case we have to take into account, if the previous command is C/S.
	          nx = d.x * 2 - d.bx; // And reflect the previous
	          ny = d.y * 2 - d.by; // command's control point relative to the current point.
	        } else {
	          // or some else or nothing
	          nx = d.x;
	          ny = d.y;
	        }
	        path = ["C", nx, ny].concat(path.slice(1));
	        break;
	      case "T":
	        if (pcom == "Q" || pcom == "T") {
	          // In "T" case we have to take into account, if the previous command is Q/T.
	          d.qx = d.x * 2 - d.qx; // And make a reflection similar
	          d.qy = d.y * 2 - d.qy; // to case "S".
	        } else {
	          // or something else or nothing
	          d.qx = d.x;
	          d.qy = d.y;
	        }
	        path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
	        break;
	      case "Q":
	        d.qx = path[1];
	        d.qy = path[2];
	        path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
	        break;
	      case "L":
	        path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
	        break;
	      case "H":
	        path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
	        break;
	      case "V":
	        path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
	        break;
	      case "Z":
	        path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
	        break;
	    }
	    return path;
	  },
	      fixArc = function fixArc(pp, i) {
	    if (pp[i].length > 7) {
	      pp[i].shift();
	      var pi = pp[i];
	      while (pi.length) {
	        pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
	        p2 && (pcoms2[i] = "A"); // the same as above
	        pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
	      }
	      pp.splice(i, 1);
	      ii = Math.max(p.length, p2 && p2.length || 0);
	    }
	  },
	      fixM = function fixM(path1, path2, a1, a2, i) {
	    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
	      path2.splice(i, 0, ["M", a2.x, a2.y]);
	      a1.bx = 0;
	      a1.by = 0;
	      a1.x = path1[i][1];
	      a1.y = path1[i][2];
	      ii = Math.max(p.length, p2 && p2.length || 0);
	    }
	  },
	      pcoms1 = [],
	      // path commands of original path p
	  pcoms2 = [],
	      // path commands of original path p2
	  pfirst = "",
	      // temporary holder for original path command
	  pcom = ""; // holder for previous path command of original path
	  for (var i = 0, ii = Math.max(p.length, p2 && p2.length || 0); i < ii; i++) {
	    p[i] && (pfirst = p[i][0]); // save current path command
	
	    if (pfirst != "C") {
	      // C is not saved yet, because it may be result of conversion
	      pcoms1[i] = pfirst; // Save current path command
	      i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
	    }
	    p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath
	
	    if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
	    // which may produce multiple C:s
	    // so we have to make sure that C is also C in original path
	
	    fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1
	
	    if (p2) {
	      // the same procedures is done to p2
	      p2[i] && (pfirst = p2[i][0]);
	      if (pfirst != "C") {
	        pcoms2[i] = pfirst;
	        i && (pcom = pcoms2[i - 1]);
	      }
	      p2[i] = processPath(p2[i], attrs2, pcom);
	
	      if (pcoms2[i] != "A" && pfirst == "C") {
	        pcoms2[i] = "C";
	      }
	
	      fixArc(p2, i);
	    }
	    fixM(p, p2, attrs, attrs2, i);
	    fixM(p2, p, attrs2, attrs, i);
	    var seg = p[i],
	        seg2 = p2 && p2[i],
	        seglen = seg.length,
	        seg2len = p2 && seg2.length;
	    attrs.x = seg[seglen - 2];
	    attrs.y = seg[seglen - 1];
	    attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
	    attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
	    attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
	    attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
	    attrs2.x = p2 && seg2[seg2len - 2];
	    attrs2.y = p2 && seg2[seg2len - 1];
	  }
	
	  return p2 ? [p, p2] : p;
	};

/***/ }

});
//# sourceMappingURL=svg.js.map