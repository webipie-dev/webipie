window.Modernizr = (function (window, document, undefined) {
  var version = '2.8.3', Modernizr = {}, enableClasses = true, docElement = document.documentElement, mod = 'modernizr',
    modElem = document.createElement(mod), mStyle = modElem.style, inputElem = document.createElement('input'),
    smile = ':)', toString = {}.toString, prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    omPrefixes = 'Webkit Moz O ms', cssomPrefixes = omPrefixes.split(' '),
    domPrefixes = omPrefixes.toLowerCase().split(' '), ns = {'svg': 'http://www.w3.org/2000/svg'}, tests = {},
    inputs = {}, attrs = {}, classes = [], slice = classes.slice, featureName,
    injectElementWithStyles = function (rule, callback, nodes, testnames) {
      var style, ret, node, docOverflow, div = document.createElement('div'), body = document.body,
        fakeBody = body || document.createElement('body');
      if (parseInt(nodes, 10)) {
        while (nodes--) {
          node = document.createElement('div');
          node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
          div.appendChild(node);
        }
      }
      style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if (!body) {
        fakeBody.style.background = '';
        fakeBody.style.overflow = 'hidden';
        docOverflow = docElement.style.overflow;
        docElement.style.overflow = 'hidden';
        docElement.appendChild(fakeBody);
      }
      ret = callback(div, rule);
      if (!body) {
        fakeBody.parentNode.removeChild(fakeBody);
        docElement.style.overflow = docOverflow;
      } else {
        div.parentNode.removeChild(div);
      }
      return !!ret;
    }, testMediaQuery = function (mq) {
      var matchMedia = window.matchMedia || window.msMatchMedia;
      if (matchMedia) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }
      var bool;
      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function (node) {
        bool = (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle)['position'] == 'absolute';
      });
      return bool;
    }, isEventSupported = (function () {
      var TAGNAMES = {
        'select': 'input',
        'change': 'input',
        'submit': 'form',
        'reset': 'form',
        'error': 'img',
        'load': 'img',
        'abort': 'img'
      };

      function isEventSupported(eventName, element) {
        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;
        var isSupported = eventName in element;
        if (!isSupported) {
          if (!element.setAttribute) {
            element = document.createElement('div');
          }
          if (element.setAttribute && element.removeAttribute) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');
            if (!is(element[eventName], 'undefined')) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }
        element = null;
        return isSupported;
      }

      return isEventSupported;
    })(), _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;
  if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
    hasOwnProp = function (object, property) {
      return _hasOwnProperty.call(object, property);
    };
  } else {
    hasOwnProp = function (object, property) {
      return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
    };
  }
  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {
      var target = this;
      if (typeof target != "function") {
        throw new TypeError();
      }
      var args = slice.call(arguments, 1), bound = function () {
        if (this instanceof bound) {
          var F = function () {
          };
          F.prototype = target.prototype;
          var self = new F();
          var result = target.apply(self, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return self;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };
      return bound;
    };
  }

  function setCss(str) {
    mStyle.cssText = str;
  }

  function setCssAll(str1, str2) {
    return setCss(prefixes.join(str1 + ';') + (str2 || ''));
  }

  function is(obj, type) {
    return typeof obj === type;
  }

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  function testProps(props, prefixed) {
    for (var i in props) {
      var prop = props[i];
      if (!contains(prop, "-") && mStyle[prop] !== undefined) {
        return prefixed == 'pfx' ? prop : true;
      }
    }
    return false;
  }

  function testDOMProps(props, obj, elem) {
    for (var i in props) {
      var item = obj[props[i]];
      if (item !== undefined) {
        if (elem === false) return props[i];
        if (is(item, 'function')) {
          return item.bind(elem || obj);
        }
        return item;
      }
    }
    return false;
  }

  function testPropsAll(prop, prefixed, elem) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
      props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');
    if (is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed);
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  tests['flexbox'] = function () {
    return testPropsAll('flexWrap');
  };
  tests['flexboxlegacy'] = function () {
    return testPropsAll('boxDirection');
  };
  tests['canvas'] = function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  };
  tests['canvastext'] = function () {
    return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
  };
  tests['webgl'] = function () {
    return !!window.WebGLRenderingContext;
  };
  tests['touch'] = function () {
    var bool;
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      injectElementWithStyles(['@media (', prefixes.join('touch-enabled),('), mod, ')', '{#modernizr{top:9px;position:absolute}}'].join(''), function (node) {
        bool = node.offsetTop === 9;
      });
    }
    return bool;
  };
  tests['geolocation'] = function () {
    return 'geolocation' in navigator;
  };
  tests['postmessage'] = function () {
    return !!window.postMessage;
  };
  tests['websqldatabase'] = function () {
    return !!window.openDatabase;
  };
  tests['indexedDB'] = function () {
    return !!testPropsAll("indexedDB", window);
  };
  tests['hashchange'] = function () {
    return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
  };
  tests['history'] = function () {
    return !!(window.history && history.pushState);
  };
  tests['draganddrop'] = function () {
    var div = document.createElement('div');
    return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
  };
  tests['websockets'] = function () {
    return 'WebSocket' in window || 'MozWebSocket' in window;
  };
  tests['rgba'] = function () {
    setCss('background-color:rgba(150,255,150,.5)');
    return contains(mStyle.backgroundColor, 'rgba');
  };
  tests['hsla'] = function () {
    setCss('background-color:hsla(120,40%,100%,.5)');
    return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
  };
  tests['multiplebgs'] = function () {
    setCss('background:url(https://),url(https://),red url(https://)');
    return (/(url\s*\(.*?){3}/).test(mStyle.background);
  };
  tests['backgroundsize'] = function () {
    return testPropsAll('backgroundSize');
  };
  tests['borderimage'] = function () {
    return testPropsAll('borderImage');
  };
  tests['borderradius'] = function () {
    return testPropsAll('borderRadius');
  };
  tests['boxshadow'] = function () {
    return testPropsAll('boxShadow');
  };
  tests['textshadow'] = function () {
    return document.createElement('div').style.textShadow === '';
  };
  tests['opacity'] = function () {
    setCssAll('opacity:.55');
    return (/^0.55$/).test(mStyle.opacity);
  };
  tests['cssanimations'] = function () {
    return testPropsAll('animationName');
  };
  tests['csscolumns'] = function () {
    return testPropsAll('columnCount');
  };
  tests['cssgradients'] = function () {
    var str1 = 'background-image:', str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
      str3 = 'linear-gradient(left top,#9f9, white);';
    setCss((str1 + '-webkit- '.split(' ').join(str2 + str1) + prefixes.join(str3 + str1)).slice(0, -str1.length));
    return contains(mStyle.backgroundImage, 'gradient');
  };
  tests['cssreflections'] = function () {
    return testPropsAll('boxReflect');
  };
  tests['csstransforms'] = function () {
    return !!testPropsAll('transform');
  };
  tests['csstransforms3d'] = function () {
    var ret = !!testPropsAll('perspective');
    if (ret && 'webkitPerspective' in docElement.style) {
      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function (node, rule) {
        ret = node.offsetLeft === 9 && node.offsetHeight === 3;
      });
    }
    return ret;
  };
  tests['csstransitions'] = function () {
    return testPropsAll('transition');
  };
  tests['fontface'] = function () {
    var bool;
    injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function (node, rule) {
      var style = document.getElementById('smodernizr'), sheet = style.sheet || style.styleSheet,
        cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
      bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
    });
    return bool;
  };
  tests['generatedcontent'] = function () {
    var bool;
    injectElementWithStyles(['#', mod, '{font:0/0 a}#', mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}'].join(''), function (node) {
      bool = node.offsetHeight >= 3;
    });
    return bool;
  };
  tests['video'] = function () {
    var elem = document.createElement('video'), bool = false;
    try {
      if (bool = !!elem.canPlayType) {
        bool = new Boolean(bool);
        bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
        bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
        bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
      }
    } catch (e) {
    }
    return bool;
  };
  tests['audio'] = function () {
    var elem = document.createElement('audio'), bool = false;
    try {
      if (bool = !!elem.canPlayType) {
        bool = new Boolean(bool);
        bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
        bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/, '');
        bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
        bool.m4a = (elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;')).replace(/^no$/, '');
      }
    } catch (e) {
    }
    return bool;
  };
  tests['localstorage'] = function () {
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  };
  tests['sessionstorage'] = function () {
    try {
      sessionStorage.setItem(mod, mod);
      sessionStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  };
  tests['webworkers'] = function () {
    return !!window.Worker;
  };
  tests['applicationcache'] = function () {
    return !!window.applicationCache;
  };
  tests['svg'] = function () {
    return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
  };
  tests['inlinesvg'] = function () {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
  };
  tests['smil'] = function () {
    return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
  };
  tests['svgclippaths'] = function () {
    return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
  };

  function webforms() {
    Modernizr['input'] = (function (props) {
      for (var i = 0, len = props.length; i < len; i++) {
        attrs[props[i]] = !!(props[i] in inputElem);
      }
      if (attrs.list) {
        attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
      }
      return attrs;
    })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
    Modernizr['inputtypes'] = (function (props) {
      for (var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++) {
        inputElem.setAttribute('type', inputElemType = props[i]);
        bool = inputElem.type !== 'text';
        if (bool) {
          inputElem.value = smile;
          inputElem.style.cssText = 'position:absolute;visibility:hidden;';
          if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {
            docElement.appendChild(inputElem);
            defaultView = document.defaultView;
            bool = defaultView.getComputedStyle && defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' && (inputElem.offsetHeight !== 0);
            docElement.removeChild(inputElem);
          } else if (/^(search|tel)$/.test(inputElemType)) {
          } else if (/^(url|email)$/.test(inputElemType)) {
            bool = inputElem.checkValidity && inputElem.checkValidity() === false;
          } else {
            bool = inputElem.value != smile;
          }
        }
        inputs[props[i]] = !!bool;
      }
      return inputs;
    })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
  }

  for (var feature in tests) {
    if (hasOwnProp(tests, feature)) {
      featureName = feature.toLowerCase();
      Modernizr[featureName] = tests[feature]();
      classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
    }
  }
  Modernizr.input || webforms();
  Modernizr.addTest = function (feature, test) {
    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          Modernizr.addTest(key, feature[key]);
        }
      }
    } else {
      feature = feature.toLowerCase();
      if (Modernizr[feature] !== undefined) {
        return Modernizr;
      }
      test = typeof test == 'function' ? test() : test;
      if (typeof enableClasses !== "undefined" && enableClasses) {
        docElement.className += ' ' + (test ? '' : 'no-') + feature;
      }
      Modernizr[feature] = test;
    }
    return Modernizr;
  };
  setCss('');
  modElem = inputElem = null;
  ;(function (window, document) {
    var version = '3.7.0';
    var options = window.html5 || {};
    var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
    var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
    var supportsHtml5Styles;
    var expando = '_html5shiv';
    var expanID = 0;
    var expandoData = {};
    var supportsUnknownElements;
    (function () {
      try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        supportsHtml5Styles = ('hidden' in a);
        supportsUnknownElements = a.childNodes.length == 1 || (function () {
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined');
        }());
      } catch (e) {
        supportsHtml5Styles = true;
        supportsUnknownElements = true;
      }
    }());

    function addStyleSheet(ownerDocument, cssText) {
      var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
      p.innerHTML = 'x<style>' + cssText + '</style>';
      return parent.insertBefore(p.lastChild, parent.firstChild);
    }

    function getElements() {
      var elements = html5.elements;
      return typeof elements == 'string' ? elements.split(' ') : elements;
    }

    function getExpandoData(ownerDocument) {
      var data = expandoData[ownerDocument[expando]];
      if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
      }
      return data;
    }

    function createElement(nodeName, ownerDocument, data) {
      if (!ownerDocument) {
        ownerDocument = document;
      }
      if (supportsUnknownElements) {
        return ownerDocument.createElement(nodeName);
      }
      if (!data) {
        data = getExpandoData(ownerDocument);
      }
      var node;
      if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
      } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
      } else {
        node = data.createElem(nodeName);
      }
      return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
    }

    function createDocumentFragment(ownerDocument, data) {
      if (!ownerDocument) {
        ownerDocument = document;
      }
      if (supportsUnknownElements) {
        return ownerDocument.createDocumentFragment();
      }
      data = data || getExpandoData(ownerDocument);
      var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length;
      for (; i < l; i++) {
        clone.createElement(elems[i]);
      }
      return clone;
    }

    function shivMethods(ownerDocument, data) {
      if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
      }
      ownerDocument.createElement = function (nodeName) {
        if (!html5.shivMethods) {
          return data.createElem(nodeName);
        }
        return createElement(nodeName, ownerDocument, data);
      };
      ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' + getElements().join().replace(/[\w\-]+/g, function (nodeName) {
        data.createElem(nodeName);
        data.frag.createElement(nodeName);
        return 'c("' + nodeName + '")';
      }) + ');return n}')(html5, data.frag);
    }

    function shivDocument(ownerDocument) {
      if (!ownerDocument) {
        ownerDocument = document;
      }
      var data = getExpandoData(ownerDocument);
      if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
        data.hasCSS = !!addStyleSheet(ownerDocument, 'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' + 'mark{background:#FF0;color:#000}' + 'template{display:none}');
      }
      if (!supportsUnknownElements) {
        shivMethods(ownerDocument, data);
      }
      return ownerDocument;
    }

    var html5 = {
      'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',
      'version': version,
      'shivCSS': (options.shivCSS !== false),
      'supportsUnknownElements': supportsUnknownElements,
      'shivMethods': (options.shivMethods !== false),
      'type': 'default',
      'shivDocument': shivDocument,
      createElement: createElement,
      createDocumentFragment: createDocumentFragment
    };
    window.html5 = html5;
    shivDocument(document);
  }(this, document));
  Modernizr._version = version;
  Modernizr._prefixes = prefixes;
  Modernizr._domPrefixes = domPrefixes;
  Modernizr._cssomPrefixes = cssomPrefixes;
  Modernizr.mq = testMediaQuery;
  Modernizr.hasEvent = isEventSupported;
  Modernizr.testProp = function (prop) {
    return testProps([prop]);
  };
  Modernizr.testAllProps = testPropsAll;
  Modernizr.testStyles = injectElementWithStyles;
  Modernizr.prefixed = function (prop, obj, elem) {
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      return testPropsAll(prop, obj, elem);
    }
  };
  docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + (enableClasses ? ' js ' + classes.join(' ') : '');
  return Modernizr;
})(this, this.document);

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr = function (a, b, c) {
  function C(a) {
    j.cssText = a
  }

  function D(a, b) {
    return C(n.join(a + ";") + (b || ""))
  }

  function E(a, b) {
    return typeof a === b
  }

  function F(a, b) {
    return !!~("" + a).indexOf(b)
  }

  function G(a, b) {
    for (var d in a) {
      var e = a[d];
      if (!F(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
    }
    return !1
  }

  function H(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c) return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f
    }
    return !1
  }

  function I(a, b, c) {
    var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + p.join(d + " ") + d).split(" ");
    return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), H(e, b, c))
  }

  function J() {
    e.input = function (c) {
      for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
      return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u
    }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function (a) {
      for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !!e;
      return t
    }("search tel url email datetime date month week time datetime-local number range color".split(" "))
  }

  var d = "2.8.3", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style,
    k = b.createElement("input"), l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "),
    o = "Webkit Moz O ms", p = o.split(" "), q = o.toLowerCase().split(" "), r = {svg: "http://www.w3.org/2000/svg"},
    s = {}, t = {}, u = {}, v = [], w = v.slice, x, y = function (a, c, d, e) {
      var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
      if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
      return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
    }, z = function () {
      function d(d, e) {
        e = e || b.createElement(a[d] || "div"), d = "on" + d;
        var f = d in e;
        return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
      }

      var a = {select: "input", change: "input", submit: "form", reset: "form", error: "img", load: "img", abort: "img"};
      return d
    }(), A = {}.hasOwnProperty, B;
  !E(A, "undefined") && !E(A.call, "undefined") ? B = function (a, b) {
    return A.call(a, b)
  } : B = function (a, b) {
    return b in a && E(a.constructor.prototype[b], "undefined")
  }, Function.prototype.bind || (Function.prototype.bind = function (b) {
    var c = this;
    if (typeof c != "function") throw new TypeError;
    var d = w.call(arguments, 1), e = function () {
      if (this instanceof e) {
        var a = function () {
        };
        a.prototype = c.prototype;
        var f = new a, g = c.apply(f, d.concat(w.call(arguments)));
        return Object(g) === g ? g : f
      }
      return c.apply(b, d.concat(w.call(arguments)))
    };
    return e
  }), s.flexbox = function () {
    return I("flexWrap")
  }, s.canvas = function () {
    var a = b.createElement("canvas");
    return !!a.getContext && !!a.getContext("2d")
  }, s.canvastext = function () {
    return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function")
  }, s.webgl = function () {
    return !!a.WebGLRenderingContext
  }, s.touch = function () {
    var c;
    return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
      c = a.offsetTop === 9
    }), c
  }, s.geolocation = function () {
    return "geolocation" in navigator
  }, s.postmessage = function () {
    return !!a.postMessage
  }, s.websqldatabase = function () {
    return !!a.openDatabase
  }, s.indexedDB = function () {
    return !!I("indexedDB", a)
  }, s.hashchange = function () {
    return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
  }, s.history = function () {
    return !!a.history && !!history.pushState
  }, s.draganddrop = function () {
    var a = b.createElement("div");
    return "draggable" in a || "ondragstart" in a && "ondrop" in a
  }, s.websockets = function () {
    return "WebSocket" in a || "MozWebSocket" in a
  }, s.rgba = function () {
    return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba")
  }, s.hsla = function () {
    return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla")
  }, s.multiplebgs = function () {
    return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
  }, s.backgroundsize = function () {
    return I("backgroundSize")
  }, s.borderimage = function () {
    return I("borderImage")
  }, s.borderradius = function () {
    return I("borderRadius")
  }, s.boxshadow = function () {
    return I("boxShadow")
  }, s.textshadow = function () {
    return b.createElement("div").style.textShadow === ""
  }, s.opacity = function () {
    return D("opacity:.55"), /^0.55$/.test(j.opacity)
  }, s.cssanimations = function () {
    return I("animationName")
  }, s.csscolumns = function () {
    return I("columnCount")
  }, s.cssgradients = function () {
    var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
      c = "linear-gradient(left top,#9f9, white);";
    return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), F(j.backgroundImage, "gradient")
  }, s.cssreflections = function () {
    return I("boxReflect")
  }, s.csstransforms = function () {
    return !!I("transform")
  }, s.csstransforms3d = function () {
    var a = !!I("perspective");
    return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b, c) {
      a = b.offsetLeft === 9 && b.offsetHeight === 3
    }), a
  }, s.csstransitions = function () {
    return I("transition")
  }, s.fontface = function () {
    var a;
    return y('@font-face {font-family:"font";src:url("https://")}', function (c, d) {
      var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet,
        g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
      a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
    }), a
  }, s.generatedcontent = function () {
    var a;
    return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function (b) {
      a = b.offsetHeight >= 3
    }), a
  }, s.video = function () {
    var a = b.createElement("video"), c = !1;
    try {
      if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
    } catch (d) {
    }
    return c
  }, s.audio = function () {
    var a = b.createElement("audio"), c = !1;
    try {
      if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
    } catch (d) {
    }
    return c
  }, s.localstorage = function () {
    try {
      return localStorage.setItem(h, h), localStorage.removeItem(h), !0
    } catch (a) {
      return !1
    }
  }, s.sessionstorage = function () {
    try {
      return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0
    } catch (a) {
      return !1
    }
  }, s.webworkers = function () {
    return !!a.Worker
  }, s.applicationcache = function () {
    return !!a.applicationCache
  }, s.svg = function () {
    return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect
  }, s.inlinesvg = function () {
    var a = b.createElement("div");
    return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
  }, s.smil = function () {
    return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")))
  }, s.svgclippaths = function () {
    return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")))
  };
  for (var K in s) B(s, K) && (x = K.toLowerCase(), e[x] = s[K](), v.push((e[x] ? "" : "no-") + x));
  return e.input || J(), e.addTest = function (a, b) {
    if (typeof a == "object") for (var d in a) B(a, d) && e.addTest(d, a[d]); else {
      a = a.toLowerCase();
      if (e[a] !== c) return e;
      b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
    }
    return e
  }, C(""), i = k = null, function (a, b) {
    function l(a, b) {
      var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
      return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
    }

    function m() {
      var a = s.elements;
      return typeof a == "string" ? a.split(" ") : a
    }

    function n(a) {
      var b = j[a[h]];
      return b || (b = {}, i++, a[h] = i, j[i] = b), b
    }

    function o(a, c, d) {
      c || (c = b);
      if (k) return c.createElement(a);
      d || (d = n(c));
      var g;
      return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
    }

    function p(a, c) {
      a || (a = b);
      if (k) return a.createDocumentFragment();
      c = c || n(a);
      var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length;
      for (; e < g; e++) d.createElement(f[e]);
      return d
    }

    function q(a, b) {
      b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
        return s.shivMethods ? o(c, a, b) : b.createElem(c)
      }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function (a) {
        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
      }) + ");return n}")(s, b.frag)
    }

    function r(a) {
      a || (a = b);
      var c = n(a);
      return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
    }

    var c = "3.7.0", d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
      f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
      g, h = "_html5shiv", i = 0, j = {}, k;
    (function () {
      try {
        var a = b.createElement("a");
        a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function () {
          b.createElement("a");
          var a = b.createDocumentFragment();
          return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
        }()
      } catch (c) {
        g = !0, k = !0
      }
    })();
    var s = {
      elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
      version: c,
      shivCSS: d.shivCSS !== !1,
      supportsUnknownElements: k,
      shivMethods: d.shivMethods !== !1,
      type: "default",
      shivDocument: r,
      createElement: o,
      createDocumentFragment: p
    };
    a.html5 = s, r(b)
  }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.hasEvent = z, e.testProp = function (a) {
    return G([a])
  }, e.testAllProps = I, e.testStyles = y, e.prefixed = function (a, b, c) {
    return b ? I(a, b, c) : I(a, "pfx")
  }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
}(this, this.document), function (a, b, c) {
  function d(a) {
    return "[object Function]" == o.call(a)
  }

  function e(a) {
    return "string" == typeof a
  }

  function f() {
  }

  function g(a) {
    return !a || "loaded" == a || "complete" == a || "uninitialized" == a
  }

  function h() {
    var a = p.shift();
    q = 1, a ? a.t ? m(function () {
      ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
    }, 0) : (a(), h()) : q = 0
  }

  function i(a, c, d, e, f, i, j) {
    function k(b) {
      if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
        "img" != a && m(function () {
          t.removeChild(l)
        }, 50);
        for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
      }
    }

    var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {t: d, s: c, e: f, a: i, x: j};
    1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
      k.call(this, r)
    }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
  }

  function j(a, b, c, d, f) {
    return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
  }

  function k() {
    var a = B;
    return a.loader = {load: j, i: 0}, a
  }

  var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0,
    r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode,
    l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l,
    u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) {
      return "[object Array]" == o.call(a)
    }, x = [], y = {}, z = {
      timeout: function (a, b) {
        return b.length && (a.timeout = b[0]), a
      }
    }, A, B;
  B = function (a) {
    function b(a) {
      var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {url: c, origUrl: c, prefixes: a}, e, f, g;
      for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
      for (f = 0; f < b; f++) c = x[f](c);
      return c
    }

    function g(a, e, f, g, h) {
      var i = b(a), j = i.autoCallback;
      i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
        k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
      })))
    }

    function h(a, b) {
      function c(a, c) {
        if (a) {
          if (e(a)) c || (j = function () {
            var a = [].slice.call(arguments);
            k.apply(this, a), l()
          }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () {
            var b = 0, c;
            for (c in a) a.hasOwnProperty(c) && b++;
            return b
          }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
            var a = [].slice.call(arguments);
            k.apply(this, a), l()
          } : j[n] = function (a) {
            return function () {
              var b = [].slice.call(arguments);
              a && a.apply(this, b), l()
            }
          }(k[n])), g(a[n], j, b, n, h))
        } else !c && l()
      }

      var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
      c(h ? a.yep : a.nope, !!i), i && c(i)
    }

    var i, j, l = this.yepnope.loader;
    if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l)
  }, B.addPrefix = function (a, b) {
    z[a] = b
  }, B.addFilter = function (a) {
    x.push(a)
  }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
    b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
  }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
    var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
    k.src = a;
    for (o in d) k.setAttribute(o, d[o]);
    c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
      !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
    }, m(function () {
      l || (l = 1, c(1))
    }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
  }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
    var e = b.createElement("link"), j, c = i ? h : c || f;
    e.href = a, e.rel = "stylesheet", e.type = "text/css";
    for (j in d) e.setAttribute(j, d[j]);
    g || (n.parentNode.insertBefore(e, n), m(c, 0))
  }
}(this, document), Modernizr.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0))
};
