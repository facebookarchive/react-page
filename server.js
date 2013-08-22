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
var path = require('path');
var reactMiddleware = require('react-page-middleware');

var PROJECT_ROOT = __dirname;
var PAGES_DIR = path.join(PROJECT_ROOT, 'src/pages');

/**
 * Make sure to include our package.json root folder, and the location of React
 * core sources.
 */
var REACT_LOCATION = PROJECT_ROOT + '/node_modules/react-tools/src';
var SEARCH_PATHS = [PROJECT_ROOT, REACT_LOCATION];

var app = connect()
  .use(reactMiddleware.provide({
    logTiming: true,
    pageRouteRoot: PAGES_DIR,           // URLs based in this directory
    useSourceMaps: true,                    // Generate client source maps.
    jsSourcePaths: SEARCH_PATHS,            // Search for sources from
    ignorePaths: function(p) {              // Additional filtering
      return p.indexOf('__tests__') !== -1;
    }
  }))
  .use(connect['static'](__dirname + '/src/static_files'))
  .use(connect.logger())
  .use(connect.compress())
  .use(connect.errorHandler());

http.createServer(app).listen(8080);
console.log('Open http://localhost:8080/index.html');
