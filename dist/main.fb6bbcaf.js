// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
var countryForm = document.querySelector('#country-form');
var results = document.querySelector('#results');
var result = document.querySelector('#result');

if (countryForm) {
  countryForm.addEventListener('submit', function (e) {
    //Stop from submitting to a file
    e.preventDefault(); //Get user input

    var country = document.querySelector('#country').value;
    fetchCountries(country);
  });
} // Fetch animals from API


function fetchCountries(country) {
  //Fetch the Country
  fetch("https://restcountries.eu/rest/v2/name/".concat(country)).then(function (res) {
    return res.json();
  }).then(function (country) {
    console.log(country[0].alpha2Code);
    var output = "\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <img src=\"".concat(country[0].flag, "\" class=\"img-thumbnail\"/>\n            </div>\n            <div class=\"col-md-6\">\n              <h2><strong><em>").concat(country[0].name, "</em></strong></h2>\n              <a onclick=\"countrySelected('").concat(country[0].alpha2Code, "')\" href=\"country.html\" class=\"btn btn-primary mt-3\">Country Details</a>\n            </div>\n          </div>\n        </div>\n      ");
    results.innerHTML = '';
    var doc = new DOMParser().parseFromString(output, 'text/html');
    results.appendChild(doc.body);
  }).catch(function (err) {
    return err;
  });
}

function countrySelected(id) {
  localStorage.setItem('alpha2Code', id); //move to individual country page automatically

  window.location = 'country.html';
  return false;
} // Fetch individual country  from API


function getCountry() {
  var country = localStorage.getItem('alpha2Code'); //Fetch the Pets

  fetch("https://restcountries.eu/rest/v2/alpha/".concat(country)).then(function (res) {
    return res.json();
  }).then(function (count) {
    console.log(count);
    var output = "\n      <div class=\"row\">\n      <div class=\"col\">\n        <img src=\"".concat(count.flag, "\" class=\"img-thumbnail\"/>\n      </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <h2><strong><em>").concat(count.name, "</em></strong></h2>\n          <ul class=\"list-group\">\n            <li class=\"list-group-item\"><strong>Capital:</strong> ").concat(count.capital, "</li>\n            <li class=\"list-group-item\"><strong>Region:</strong> ").concat(count.region, "</li>\n\n            <li class=\"list-group-item\"><strong>Subregion:</strong> ").concat(count.subregion, "</li>\n            ").concat(count.regionalBlocs[0] ? "<li class=\"list-group-item\"><strong>Regional Bloc:</strong/> (".concat(count.regionalBlocs[0].acronym, ") - <span>").concat(count.regionalBlocs[0].name, "</span></li>") : "", "\n            \n          \n            <li class=\"list-group-item\"><strong>Population:</strong> ").concat(count.population, "</li>\n            <li class=\"list-group-item\"><strong>Languages Spoken:</strong>\n            ").concat(count.languages.map(function (lang) {
      return " <span>".concat(lang.name, "</span>");
    }), "\n             </li>\n           \n            <li class=\"list-group-item\"><strong>Capital:</strong> ").concat(count.capital, "</li>\n          </ul>\n        </div>\n      \n      ");
    result.innerHTML = '';
    var doc = new DOMParser().parseFromString(output, 'text/html');
    result.appendChild(doc.body);
  }).catch(function (err) {
    return err;
  });
} // document.addEventListener('click', (e) => {
//   e.preventDefault()
//   getMovie()
// })
//     function employee(name, jobtitle, born)
// {
// 	this.name = name
// 	this.jobtitile = jobtitle
// 	this.born = born
// }
// var fred = new employee("Fred Flintstone", "Caveman", 1970)
// employee.prototype.salary = null
// fred.salary = 20000
// document.write(fred.salary)
// function constfuncs() {
//   var funcs = []
//    for(var i = 0; i < 10; i++) 
//    funcs[i] = function() { return i}
//    return funcs
// }
// var funcs = constfuncs()
// console.log(funcs[5] ())
// function Employee(firstName, lastName)
// {
//      this.firstName = firstName;
//      this.lastName = lastName;
// }
// Employee.prototype.setOccupation = function() {
// console.log('hello')}
// let guy = new Employee('ethan', 'R')
// console.log(guy.setOccupation())
// country page
},{}],"../../../../.nvm/versions/node/v8.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51764" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v8.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map