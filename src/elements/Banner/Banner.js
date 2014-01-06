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
"use strict";

var React = require('React');

/**
 * Look at Banner, Michael!
 */
var Banner = React.createClass({
  getInitialState: function() {
    return {initialized: false};
  },

  componentDidMount: function() {
    this.setState({initialized: true});
  },

  render: function() {
    var classes = [
      'banner',
      this.state.initialized ? 'fadeIn' : ''
    ].join(' ');
    return (
      <h1 className={classes}>
        {this.props.bannerMessage}
      </h1>
    );
  }
});

module.exports = Banner;
