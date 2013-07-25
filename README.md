# Develop:

    node server.js

Once the server is running, all file changes are automatically picked up when
you reload the page - no watchers needed.

# Build For Static Deployment:

    node server.js
    wget -mpck --user-agent="" -e robots=off localhost:8080/index.html


<img height="276px" src="./public/static/ReactPageLogo@2x.png"/>


  - **Effortlessly** render on the server - using your client side JavaScript code.
  - Render entire pages in React JavaScript.
  - package JavaScript on-the-fly, without blocking page rendering.
  - Refreshing your browser always runs the latest code.
  - Works with your existing connect middleware.

<br>

###Install

    git clone https://github.com/jordwalke/react-page
    cd react-page
    npm install                            # install dependencies.
    node server.js
    open http://localhost:8080/index.html  # renders UI code on the server!

# Why Server Rendering?

  - Faster Page Speed:
    - Page displays before downloading heavy JavaScript.
  - Faster Development and Prototyping:
    - Instantly refresh your app without waiting for any watch scripts or
    bundlers.
  - Deployment of static content pages/blogs becomes trivial: just archive using
  recursive `wget`.
  - SEO benefits

# Why React JavaScript Server Rendering?

  - All the performance benefits of server rendering combined with the
  expressiveness of JavaScript.
  - React was built from the ground up to support rendering either on the client
  or server.

# How?

  - You don't have to think about it.
  - `react-page` routes `http` requests to the propper `.jsx` React components,
  and renders their markup to a string.
  - `react-page` sends this markup to the client so the user can see it quickly.
  - The JavaScript corresponding to that page is packaged up and sent to the
  client.
  - The browser runs that JavaScript, so that all of the event handlers,
  interactions and update code will run seamlessly on top of the server
  generated markup.
  - From the developer's (and the user's) perspective, it's just as if the
  rendering occured on the client, but the page was delivered faster.


### Simple Default Routing:

  The simplest routing scheme is enabled by default:
  

    /index.html => /public/index.jsx
    /docs/hello.html => /public/docs/hello.jsx

By default, the page url is used to find a corresponding `.jsx` file that
exports a React component. `react-page` will render the full site markup for
that URL.

  You can also customize the routing to be more intelligent based on regex
  patterns in the URL.
  

# Other Features:

  - `commonJS` `require` calls work perfectly in your application code, either
  on the client, or the server (thanks to Browserify). (Again, you don't have to
   think about it.)
  - Sourcemaps preserve file names/line numbers thanks to Browserify.
  - Works with `sass`/`less` or any other connect middleware.
  - Automatically performs `jsx` syntax transformation.

### Start Building Your Page:

    vim public/index.jsx

Build up an applications by composing lower level components into more
sophisticated components. By convention, `public/components/` contains shared UI
components that are used across many pages. Simply `require()` them in your
application code.

### Run and Build on the Fly

>  Just hit your browser's refresh button to run an always-up-to-date version of your app.

- Dynamically packages/compiles your app on each server request.

### Create More Pages:

    mkdir public/user_profiles/
    vim public/user_profiles/me.jsx


###Structure

> `react-page` is a basic structure for you app and development environment.


    react-page/
     ├── package.json                 # Add npm dependencies here.
     ├── server.js                    # Start web server with `node server.js`
     └── public/                      # Publicly accessable pages/resources.
         ├── static/                  # Shared images/css go here.
         ├── index.jsx                # Renders index.html
         ├── ...                      # Create more pages/directories here
         └── components/              # Shared React components.
             ├── SiteBoilerPlate.jsx  # Reusable html/body component
             └── Widget.jsx           # Custom Widget Example

### TODO:

  - Annotate the JavaScript bundle as `async`.
  - Send initial props in earlier flush than the initial markup, so that if the
  async-marked bundle was cached from an earlier visit, the client can begin
  rendering the markup before the server sends it across the network. Whoever
  can compute and deliver the markup faster can be allowed to create the initial
  user experience.
  - Create SandBox.

### FAQ:

**npm install did not succeed**: Try `npm cache clean` and then try again.


### Not just for Dynamic requests!
Not only can React power server-data-driven apps, but with `react-page` you can
easily use React to build a blog, Github documentation, or any other site that
can be loaded from a set of static html/js/css files.  Because `react-page` uses
server rendering, you can simply perform a deep pre-rendering of your site, to
generate all of the pre-generated markup/JavaScript.

    node server.js
    wget -mpck --user-agent="" -e robots=off http://localhost:8080/index.html
    # If wget needed on Mac OS, try http://osxdaily.com/2012/05/22/install-wget-mac-os-x/

Although this generates a pre-rendering of your site, your UI can be every bit
as interactive and dynamic as it is when used with a server. All of your
JavaScript event handlers will work.

Normally, generating pre-rendered snapshots is difficult to do with JavaScript
rendered sites, but `react-page` leverages React's server rendering features to
make it very easy.

**Note**: Don't forget to enable gzip on your file servers - the generated React
markup is large, but compresses well.


### Important:
`react-page` is intended to be used as a starting point for rapidly developing
React applications. The provided `server.js` and `package.json` dependencies are
not yet vetted to be used to serve production traffic.
