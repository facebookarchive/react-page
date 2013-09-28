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

var ReactStyle = require('ReactStyle');

var BannerStyleRules = ReactStyle.create({
  'h1.banner': {
    opacity: '0',
    fontFamily: 'Helvetica',
    color: '#444',
    fontWeight: 'bold',
    marginTop: '60px',
    marginBottom: '0',
    textAlign: 'center',
    '-webkit-user-select': 'none',
    fontSize: '5vh', /* Chrome bug prevents resizing on window resize! */
    width: '100%'    /* Putting width 100% causes repaint on resize */
  },
  'h1.banner.fadeIn': {
    opacity: '1',
    transition: 'opacity 3s ease-in'
  }
});

module.exports = BannerStyleRules;
