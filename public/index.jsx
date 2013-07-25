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
var SiteBoilerPlate = require('./components/SiteBoilerPlate.jsx');
var VectorWidget = require('./components/VectorWidget.jsx');
var Banner = require('./components/Banner.jsx');


/**
 * TODO: Find a way to allow a component to render into two parts.
 * var i = <index flush={0}/>;
 * React.renderComponentToString(i, cb);
 * i.setProps({flush: 1});
 * React.renderComponentToString(i, cb);
 */
var index = React.createClass({
  render: function() {
    return (
      <SiteBoilerPlate>
        <Banner bannerMessage="Welcome to React"/>
        <VectorWidget />
      </SiteBoilerPlate>
    );
  }
});

module.exports = index;
