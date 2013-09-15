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

var BannerCSSRules = {
  'h1.banner': {
    '-webkit-user-select': 'none',
    'color': '#444',
    'font-family': 'Helvetica',
    'font-size': '5vh',  // Chrome bug prevents resizing on window resize!
    'font-weight': 'bold',
    'margin-bottom': 0,
    'margin-top': '60px',
    'opacity': 0,
    'text-align': 'center',
    'width': '100%' // Putting width 100% causes repaint on resize
  },

  'h1.banner.fadeIn': {
    'opacity': 1,
    'transition': 'opacity 3s ease-in'
  }
};

module.exports = BannerCSSRules;
