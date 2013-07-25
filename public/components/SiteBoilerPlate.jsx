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
 *
 * @jsx React.DOM
 */

var React = require('react-core').React;


var MOBILE_APP_META =
  '<meta name="viewport" content="width=device-width, ' +
  'initial-scale=1.0, user-scalable=no" />';

/**
 * Component for performing some redundant site wrapping. Customize to your
 * liking, or create a new, similar module. `react-page` automatically ensures
 * that all fo the JavaScript used to generate the page, will be bundled and
 * sent into the response so that all the event handlers will work.
 *
 * Usage:
 *
 * var React = require('react-core').React;
 * var SiteBoilerPlate = require('./components/SiteBoilerPlate.jsx');
 * var MyPage = React.createClass({
 *   render: function() {
 *     return (
 *       <SiteBoilerPlate>
 *          <div>Hello This Is My App!</div>
 *       </SiteBoilerPlate>
 *     );
 *   }
 * });
 */
var SiteBoilerPlate = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta dangerouslySetInnerHTML={{__html: MOBILE_APP_META}} />
          <link rel="stylesheet" href="/css/main.css" />
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = SiteBoilerPlate;
