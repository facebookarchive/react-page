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
 * @providesModule SiteStyles
 * @jsx React.DOM
 */
"use strict";

var React = require('React');

/**
 * Utility to manage site-wide styles.
 */
var SiteStyles = {
  /**
   * @type {array}
   */
  _rules: [],

  /**
   * @param {object} newRules
   */
  addRules: function(newRules) {
    var rules = SiteStyles._rules;
    for (var selector in newRules) {
      var ruleText =  selector + '{';
      var declarations = newRules[selector];
      for (var property in declarations) {
        ruleText += property + ':' + declarations[property] + ';';
      }
      ruleText += '}';
      rules.push(ruleText);
    }
    SiteStyles._onChange();
  },

  /**
   * Use the CSS @import() rule to include styles to the site.
   * Note that using @import() may block the parallel downloading of CSS files.
   * See http://www.stevesouders.com/blog/2009/04/09/dont-use-import/
   * @param {url} url
   */
  addImport: function(url) {
    SiteStyles._rules.push({
      importText: '@import("' + url + '"")'
    });
    SiteStyles._onChange();
  },

  /**
   * Add a stylesheet <link rel="stylesheet" href="a.css" />
   * to the site. Note that In Internet Explorer 8 and 9, only 31 stylesheets
   * at most can be inserted into the document. If you plan to load many
   * stylesheets in the page, do consider using a better CSS package system that
   * shall automatically package many CSS files into fewer files or just use
   * {SiteStyles#addRules} and {SiteStyles#addImport} to load more styles.
   * @param {url} url
   */
  addLink: function(url) {
    SiteStyles._rules.push({
      linkURL: url
    });
    SiteStyles._onChange();
  },

  /**
   * @return {array<SiteStyle>}
   */
  renderToComponents: function() {
    var rules = SiteStyles._rules;
    var components = [];
    var cssText = '';
    var rulesCount = 0;
    var importsCount = 0;
    var index = 0;

    for (var i = 0, j = rules.length; i < j; i++) {
      var rule = rules[i];
      if (rule.linkURL) {
        if (cssText) {
          components.push(
            <style
              key={'SiteStyle' + (index++)}
              dangerouslySetInnerHTML={{__html: cssText}}
            />
          );
          rulesCount = 0;
          cssText = '';
          importsCount = 0;
        }

        components.push(
          <link
            key={'SiteStyle' + (index++)}
            rel="stylesheet"
            href={rule.linkURL}
          />
        );
        continue;
      }

      cssText += rule;
      rulesCount++;

      if (rule.importText) {
        importsCount++;
      }

      if (rulesCount > 4095 || importsCount > 31) {
        // Stylesheet has limits in Internet Explorer 8 and 9 so we need to
        // shard style rules into several stylesheets.
        // 1. A sheet may contain up to 4095 rules.
        // 2. A sheet may @import up to 31 sheets
        // See http://bit.ly/mARqBv
        components.push(
          <style
            key={'SiteStyle' + (index++)}
            dangerouslySetInnerHTML={{__html: cssText}}
          />
        );
        rulesCount = 0;
        cssText = '';
        importsCount = 0;
      }
    }

    if (cssText) {
      components.push(
        <style
          key={'SiteStyle' + (index++)}
          dangerouslySetInnerHTML={{__html: cssText}}
        />
      );
    }
    return components
  },

  _onChange: function() {
    SiteStyles.onChange && SiteStyles.onChange();
  }
};

module.exports = SiteStyles;
