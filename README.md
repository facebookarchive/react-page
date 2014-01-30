- - -

**_This project is not actively maintained. Proceed at your own risk!_**

- - -

<img height="224px" width="704px" src="./src/elements/Banner/ReactPageLogo@2x.png"/>


  - <h4>Render [React](http://www.github.com/facebook/react/) pages on the server or client - _effortlessly_.</h4>
  - <h4>Use CommonJS to build and share UI components.</h4>
  - <h4>Develop rapidly - instant reloading.</h4>

<br>


##Install (Mac/Linux - requires a recent version of node/npm)

> Clone this project

    git clone https://github.com/facebook/react-page
    cd react-page
    npm install                            # install dependencies.

> Try out the server rendering

    node server.js
    # open http://localhost:8080/index.html
    # Make changes to src/index.js, and refresh instantly!


##Philosophy

##### Why Server Rendering?

  - Faster Pages: Markup displayed before downloading JS (with SEO benefits)
  - Page generation on a fast server vs. low power client devices.
  - Instantly refresh while developing.
  - Static content sites: As easy as a single `wget` command.


##### Why React?

  - React is a client/server rendering framework from the ground up.
  - When performance constraints change, simply change _where_ you render it - don't change your app.
  - React is functional. Explore the documentation on the [React Github Page](http://www.github.com/facebook/react/).
  - Server rendering optional - you can always just use React as a declarative client side framework.


##Developing

#### Default Project Structure

The included directory structure suggests a way to organize a single _or_ multi-page app.
`npm install` other components/libraries and they automatically work. It's the same commonJS
that you know and love.


    react-page/
     ├── package.json                # Add npm dependencies here.
     ├── server.js                   # Start web server with `node server.js`
     ├── ...                         # Create more pages/directories here
     └── src                         # All your application JS.
         ├── elements/               # Shared React components.
         │   ├── SiteBoilerPlate.js  # Reusable html/body component
         │   └── Banner.js           # An example component for displaying text
         │
         ├── index.js                # localhost:8080/index.html routed here
         └── pages                   # Make your site structure
             └── about.js            # localhost:8080/pages/about.html


#### Everything Is A Component

React's philosophy is that mutation-minimal functions and composition are the
best tools for building sophisticated applications with low complexity. In React,
_"components"_ are the tool for composing. `react-page` embraces this simplicity,
even allowing the _entire page_ to be expressed as an arbitrarily deep composition
of components.

`react-page/src/index.js` corresponds to `index.html`. `index.js` is a React
component that renders the `<html>`,`<body>`, and all the contents of the page.

If you look at `index.js`, you'll notice that it doesn't output all the `<div>`s
and `<span>`s directly - it _composes_ other components that take on much of that
responsibility. `index.js` composes a `<Banner>` component, and inside of `Banner.js`,
you'll see that the implementation of `<Banner>` outputs an `<h1>` DOM component.
Even DOM representations such as `<h1>` are components in React

To build out your app, just add or install more components with `npm`.

#### Simple Default Page Routing

Requests to `path/file.html` are routed to your React component located at
`src/path/file.js`. By default all page requests are routed to the `src`
directory, but you can customize that behavior via the `pageRouteRoot` setting.

Here are a couple of examples of the default configuration:

    http://localhost:8080/index.html => react-page/src/pages/index.js
    http://localhost:8080/docs/hello.html => react-page/src/pages/docs/hello.js
    http://localhost:8080/pages/about.html => react-page/src/pages/about/index.js
    http://localhost:8080/path/img.png => react-page/src/path/img.png


- Currently, every `html` routing must map to a `.js` file that exports a single React
  component, that renders the page, including `html/body` tags.
- Routing is customizable (more later).


## How Does Server Rendering Work?

  - `react-page` computes page markup on the server, sends it to the client so the
    user can see it quickly.
  - The corresponding JavaScript is then packaged and sent.
  - The browser runs that JavaScript, so that all of the event handlers,
  interactions and update code will run seamlessly on top of the server
  generated markup.
  - From the developer's (and the user's) perspective, it's just as if the
  rendering occurred on the client, only faster.



## Command Line Usage:

    # --useSourceMaps=true        # default:true
    # --useBrowserBuiltins=false  # Allow node modules (util)  - default:false
    # --logTiming=true            # Shows colored timing metrics - default:true
    # --pageRouteRoot=<root_dir>  # page URLs root - default: react-page/src

    # for example:
    node server.js --useSourceMaps=true


**Node Modules in the Browser:** You can use modules installed via `npm`,
but if anything requires builtin modules (such as `util`), make sure to
enable the `useBrowserBuiltins` option.



## React As A Blogging Engine:

React can power dynamic, network-connected apps. But with `react-page`, React
can also be used to build a static blog, Github documentation, or any other
static site. Because `react-page` uses server rendering, creating a static site
is as easy as a single `wget` command.

    node server.js
    wget -mpck --user-agent="" -e robots=off http://localhost:8080/index.html

Get `wget` on OS X: try http://osxdaily.com/2012/05/22/install-wget-mac-os-x/ or if you have brew: `brew install wget`

This prebuilds your entire interactive site, so it can be served from a file server or github etc.
**Don't forget** to enable gzip on your file server! React markup is large but compresses very well.



## Motivations/Next-Steps:

-`react-page` is a rapid development environment for experimenting with new ways of
building production web apps powered by React. It provides a common environment
that allows sharing of modules client/server architecture prototypes.

In order to use this technology in a production environment, you must audit and
verify that the server rendering strategy is safe and suitable for your purposes.

- You  must ensure that a proper server sandbox is enforced. However, `react-page`
_does_ run your UI rendering code inside of contextify as a preliminary sandbox.

- In production, the js packaging features of `react-page` should be performed
ahead of time and stored in a CDN. However, dynamic server rendering
is a compelling production feature.

- Additional connect middleware should be added to prevent stack traces from showing
up in browser.


#### TODO:

  - Windows support (depends on fixing https://github.com/facebook/node-haste/pull/2)
  - Allow sharing of css/images through npm packages.
  - Experiments with optimizing page load time - incremental streaming of
  markup/resources.
  - Advanced packaging such as splitting projects into several independently
  cacheable sub-packages.
  - require('image/path/img.jpg') should resolve to image path.
  - A way to automatically package/bundle css, regardless of file path of
  depending js resource. (using require('commonJSPath/to/css.css'))
