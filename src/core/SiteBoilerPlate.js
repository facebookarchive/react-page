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

var React = require('React');
var ReactStyle = require('ReactStyle');
var ReactStyleHead = require('ReactStyleHead');
var SiteBoilerPlateStyleRules = require('./SiteBoilerPlateStyleRules.js');

/**
 * We should support/experiment with modelling css dependencies using the exact
 * same commonJS resolution, so that we can include CSS files in our React npm
 * modules. An npm module should include everything needed to work with your
 * component - and it is impossible to know where your component will be
 * installed to.
 *
 *    // Depends on css from my project - relative paths automatically resolved.
 *    require('./SiteBoilerPlate.css');
 *
 *    // Depends on css from dependency 'bootstrap' in package.json
 *    require('bootstrap/Text-Input.css');
 *
 * For now, you have to use {ReactStyle#addRules} to make sure the
 * index.js page includes the styles that your project depends on directly.
 * Even in that case, we'll use commonJS resolution for css files as well,
 * so that if you whitelist things in node_modules for inclusion in your
 * bundle, the resources in those will be
 * accessible as well.
 */

/**
 * Component for performing some redundant site wrapping. Customize to your
 * liking, or create a new, similar module. `react-page` automatically ensures
 * that all fo the JavaScript used to generate the page, will be bundled and
 * sent into the response so that all the event handlers will work.
 *
 * Usage:
 *
 * var React = require('React');
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

ReactStyle.addRules(SiteBoilerPlateStyleRules);

var SiteBoilerPlate = React.createClass({
  render: function() {
    return (
      <html>
        <ReactStyleHead>
          <meta charset="UTF-8" />
          <title>React Page | Client-Server JavaScript Rendering</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
        </ReactStyleHead>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = SiteBoilerPlate;
