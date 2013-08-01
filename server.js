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
var reactMiddleware = require('react-page-middleware');
var connect = require('connect');
var http = require('http');

var PUBLIC_ROOT = __dirname + '/public';
var app = connect()
  .use(reactMiddleware.provide({sourceDir: PUBLIC_ROOT,  dev: true}))
  .use(connect['static'](__dirname + '/public/static'))
  .use(connect.logger())
  .use(connect.errorHandler());

http.createServer(app).listen(8080);
console.log('Open http://localhost:8080/index.html');
