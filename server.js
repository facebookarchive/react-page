/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var connect = require('connect');
var http = require('http');
var optimist = require('optimist');
var path = require('path');
var reactMiddleware = require('react-page-middleware');

var argv = optimist.argv;

var PROJECT_ROOT = __dirname;
var FILE_SERVE_ROOT = path.join(PROJECT_ROOT, 'src');

var port = argv.port;

var isServer = !argv.computeForPath;

var serverDefaults = {
  serverRender: true,
  skipES5Shim: false,
  useBrowserBuiltins: false,
  logTiming: true,
  useSourceMaps: true,
  pageRouteRoot: FILE_SERVE_ROOT,
  sourceMapsType: 'linked'
};

var computeDefaults = {
  serverRender: false,
  skipES5Shim: false,
  useBrowserBuiltins: false,
  logTiming: false,
  useSourceMaps: false,
  pageRouteRoot: FILE_SERVE_ROOT,
  sourceMapsType: 'linked'
};

var defaults = isServer ? serverDefaults : computeDefaults;

var buildOptions = {
  projectRoot: PROJECT_ROOT,
  skipES5Shim: argv.skipES5Shim == 'true',      // Skip shim if you know you have
                                                // a very modern browser.
  useBrowserBuiltins:                           // Include node util modules.
    'useBrowserBuiltins' in argv ?
    argv.useBrowserBuiltins === 'true' :
    defaults.useBrowserBuiltins,
  logTiming: 'logTiming' in argv ?              // Colored timing logs.
    argv.logTiming === 'true' :
    defaults.logTiming,
  sourceMapsType: 'sourceMapsType' in argv ?
    argv.sourceMapsType: defaults.sourceMapsType,
  pageRouteRoot: 'pageRouteRoot' in argv ?
    argv.pageRouteRoot : defaults.pageRouteRoot, // URLs based in this directory
  useSourceMaps: 'useSourceMaps' in argv ?
    argv.useSourceMaps === 'true' :
    defaults.useSourceMaps,                     // Generate client source maps.
  ignorePaths: function(p) {                    // Additional filtering
    return p.indexOf('__tests__') !== -1;
  },
  blacklistRE: argv.blacklistRE && new RegExp(argv.blacklistRE),
  serverRender: 'serverRender' in argv ?
    argv.serverRender === 'true': defaults.serverRender,
  dev: argv.dev === 'true'
};

if (!isServer) {
  reactMiddleware.compute(buildOptions)(argv.computeForPath, function(str) {
    process.stdout.write(str);
  });
} else {
  var app = connect()
    .use(reactMiddleware.provide(buildOptions))
    .use(connect['static'](FILE_SERVE_ROOT))
    .use(connect.favicon(path.join(FILE_SERVE_ROOT, 'elements', 'favicon', 'favicon.ico')))
    .use(connect.logger())
    .use(connect.compress())
    .use(connect.errorHandler());

  var portToUse = port || 8080;
  http.createServer(app).listen(portToUse);
  console.log('Open http://localhost:' + portToUse + '/index.html');
}
