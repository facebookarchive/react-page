<img height="224px" width="704px" src="./src/static_files/images/ReactPageLogo@2x.png"/>


  - **Effortlessly** render UI on the server - using client side
  [React](http://www.github.com/facebook/react/) code.
  - Organize your UI components using commonJS modules.
  - An always-up-to-date, fast packager with sourcemaps.
  - Quickly get started with React.
  - Works with your existing connect middleware.

<br>

##Install

    git clone https://github.com/facebook/react-page
    cd react-page
    npm install                            # install dependencies.
    node server.js
    open http://localhost:8080/index.html  # renders UI code on the server!

## Developing

    vim src/pages/index.js   # Make changes, and refresh your browser!

#### Why Server Rendering?

  - Faster initial page speed:
    - Markup can be displayed before downloading heavy JavaScript.
    - Markup can be generated more quickly on a fast server than with a weak
    mobile phone CPU.
  - Faster Development and Prototyping:
    - Instantly refresh your app without waiting for any watch scripts or
    bundlers.
  - Easy deployment of static content pages/blogs: just archive using recursive
  `wget`.
  - SEO benefits of indexability and perf.


#### Why React JavaScript Server Rendering?

  - React allows you to seamlessly switch between rendering on the server and
  client. When performance constraints change, simply
  change where you render - not your application code.
  - React was built from the ground up to support rendering either on the client
  or server.
  - If you're not interested in server rendering - just ignore the server
  rendering step and use `react-page` as a rapid app development build tool.


#### Default Project Structure

`react-page` is a starter project for server rendering and rapid development
with React JavaScript library. The included directory structure suggests a way
to organize an interactive single _or_ multi-page app with a focus on
component reuse and JavaScript-centric development.


    react-page/
     ├── package.json                # Add npm dependencies here.
     ├── server.js                   # Start web server with `node server.js`
     ├── ...                         # Create more pages/directories here
     └── src                         # All your application JS.
         ├── static_files/           # Static assets like css/images.
         │   └── ...
         ├── components/             # Shared React components.
         │   ├── SiteBoilerPlate.js  # Reusable html/body component
         │   ├── Banner.js           # A sample widget for displaying text
         │   └── ...                 # Add yours here
         └── pages
             ├── index.js            # localhost:8080/index.html routed here
             └── about/              # Make your site structure
                 └── index.js        # localhost:8080/about/index.html


#### Everything Is A Component

React's philosophy is that mutation-minimal functions and composition are the
best tools for building sophisticated applications with low complexity. The
building block of composition in React is the _"component"_. `react-page` is no
different. In fact, with `react-page`, the _entire page_ is a component that
composes other components. `react-page/src/pages/index.js` corresponds to the
main `index.html` page. As you guessed, even `index.js` is a React component that
renders the `<html>`,`<body>`, and all the contents of the main `index.html`
page.

One thing to note, is that `index.js` doesn't just output all the `<div>`s and
`<span>`s directly - it _composes_ other components that take on some of that
responsibility. If you drill down into the `index.js` file, you'll see that it
composes a `<Banner>` component. If you dive one level deeper into the
implementation of `<Banner>`, you'll see that finally it outputs an `<h1>` DOM
component. But we are not just limited to two levels of composition. React never
imposes limits on the depth of composition.

#### React Is Functional

Learn more about [React](http://www.github.com/facebook/react/) and explore the
documentation.

#### Growing Your App

In the default project configuration, `components/` contains shared UI
components that are used across many pages. Simply `require()` them in your
application code. Then, make new components that wrap them into higher level
components. Create pages that are React components composed of other components.


#### Simple Default Page Routing

The `server.js` file supplies a root directory `pageRouteRoot` that indicates
where your pages are located in your project structure. By default, it is set to
`/absolute-path-to/src/pages/` which means that URLs will be mapped to
corresponding JavaScript components as follows.

    http://localhost:8080/index.html => react-page/src/pages/index.js
    http://localhost:8080/docs/hello.html => react-page/src/pages/docs/hello.js

As is the convention for web requests, if the ending URL does not have an
extension, `/index.html` will be appended for you. With the default
configuration, the following URL mapping would be performed.

    http://localhost:8080/about => react-page/src/pages/about/index.js

- Every routing must map to a `.js` file that exports a single React component,
  that renders the page, including `html/body` tags.
- You can also customize the routing to be more intelligent by supplying your
own router.


#### Other Features

  - Works with `sass`/`less` or any other connect middleware.
  - Automatically performs `js` syntax transformation on the fly.
  - If, in `server.js` you pass the `useSourceMaps: true` option, `react-page`
  will also automatically include source maps so that you can debug your
  application in the original source form!


#### How Does it Work?

  - You don't have to think about it.
  - `react-page` routes `http` requests to the proper `.js` React components,
  and renders their markup to a string.
  - `react-page` sends this markup to the client so the user can see it quickly.
  - The JavaScript corresponding to that page is packaged up and sent to the
  client.
  - The browser runs that JavaScript, so that all of the event handlers,
  interactions and update code will run seamlessly on top of the server
  generated markup.
  - From the developer's (and the user's) perspective, it's just as if the
  rendering occurred on the client, but the page was delivered faster.


#### Using `react-page` As A Static Blogging Engine:
Not only can React power server-data-driven apps, but with `react-page` you can
easily use React to build a blog, Github documentation, or any other site that
can be loaded from a set of static html/js/css files. Because `react-page` uses
server rendering, you can simply perform a deep rendering of your site, to
generate all of the pre-generated markup/JavaScript.

    node server.js
    wget -mpck --user-agent="" -e robots=off http://localhost:8080/index.html
    # If wget needed on Mac OS, try http://osxdaily.com/2012/05/22/install-wget-mac-os-x/

Although this generates a pre-rendering of your site, your user interactions can
be every bit as interactive and dynamic as it is when used with a server. All of
your JavaScript event handlers will work.

Normally, generating pre-rendered snapshots is difficult to do with JavaScript
rendered sites, but `react-page` leverages React's server rendering features to
make it very easy.

**Note**: Don't forget to enable gzip on your file servers - the generated React
markup is large, but compresses well.


## TODO:

  - Experiments with optimizing page load time - incremental streaming of
  markup/resources.
  - Advanced packaging such as splitting projects into several independently
  cacheable sub-packages.

## FAQ/Trouble-Shooting:

**npm install did not succeed**: You probably need to upgrade your version of
node.

## Integrating Into Packaging/Static Build tools:

Sometimes you'll want to run the packaging, transforms outside of a web request
environment. `react-page-middleware` lets you use an API called `compute` to
simply compute a string resource and do whatever you like with it in a callback:
The computed string is a self contained bundle that will run the main JS file as
indicated by the path given.


    reactMiddleware.compute({
      logTiming: true,
      pageRouteRoot: PAGES_DIR,           // URLs based in this directory
      useSourceMaps: false,               // Generate client source maps.
      jsSourcePaths: SEARCH_PATHS         // Search for sources from
    })('index.bundle', function(str) {console.log(str);});



## Motivations/Next-Steps:
`react-page` is a rapid development environment where you can experiment with
entirely new ways of building production web apps powered by React. It provides
a common environment that allows sharing of modules client/server architecture
prototypes.

In order to use this technology in a production environment, you would need to
audit and verify that the server rendering strategy is safe and suitable for
your purposes.

- In particular, you would want to ensure that a proper server
sandbox is enforced. However, `react-page` _does_ run your UI rendering code
inside of contextify as a preliminary sandbox.

- The packaging/transforming features of `react-page` would not be needed in a
production environment where the packages can be prebuilt once, stored in a CDN
and not be repackaged on the fly, but the server rendering feature is very
compelling for production environments where page load performance is of great
concern.

- Among other things, additional connect middleware should be added to prevent
stack traces from showing up in the client.
