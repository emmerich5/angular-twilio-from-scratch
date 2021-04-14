# ANGULAR FROM SCRATCH +WEBPACK (NO CLI )
Don't use Angular CLI if:
1. You want better control (Like implementing Server Side Rendering SSR)
2. Angular CLI is not an option (business/requirements/config)

Angular CLI behind the scenes relies on basic Node.js setup, and must include at a minimum:
* TypeScript
* Modules, which Angular uses the tool `Webpack` to manage (before it was ~~`SystemJS`~~ )

This setup utilizes Webpack v4 and some specific plugin version numbers due to dependencies. For example @ngtools/webpack requires Webpack v4

# 1 - MINIMAL NODE.JS + EXPRESS ENVIRONMENT
Basically, create the minimal packages Angular needs from Node.js to run. There is 2 types of packages:
1. **Packages for Development** include `TypeScript` which transpiles to `JavaScript`. These packages are NOT required in Production/App Running.
2. **Packages for Production** include `Express` for routing.

## 1.1 - Steps

| STEP | CONSOLE | DERIVERABLE | DESCRIPTION |
| --- | --- | --- | --- |
| 1 |`npm init -y`| +package.json | Initialize project folder as Node.js |
| 2 |`npm install typescript@">=4.0 and <4.2" --save-dev` | +node_modules/typescript | Install TypeScript package. Means download it. |
| | | +package-lock.json  | First time `npm install` creates this, which has detailed package info and its dependencies. Also `--save-dev` adds a line `dev:true` to flag this package available only in development |
| | | U package.json | Updates it to add package dependency for `typescript` |
| 3 | `npm install webpack@4 webpack-cli html-webpack-plugin@4 copy-webpack-plugin@6 clean-webpack-plugin@3 --save-dev` | +node_modules/many | Install Webpack packages, which install many more due to dependencies. |
| | | U package.json, U package-lock.json | Several packages have been added |
| 4 | `npm install ejs express --save` | +node_modules/many, U package.json, U package-lock.json | Installs Expres (Routing), and EJS (HTML Template) for production. |

## 1.2 Deriverables

Current folder structure:
```
project_root_folder
|--package.json
|--package-lock.json
|--node_modules
   |--express
   |--typescript
   |--webpack
   |--several_packages
```
**package.json** has Developer and Production dependencies:
```json
{
 ..
 ..   
 several_general_project_keys: several_values,
 ..
 ..
 "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^6.4.1",
    "html-webpack-plugin": "^4.5.2",
    "typescript": ">=4.0 and <4.2",
    "webpack": "^4.46.0",
    "webpack-cli": "^4.6.0"
  },
  "dependencies": {
    "ejs": "^3.1.6",
    "express": "^4.17.1"
  }
}
```

**package-lock.json** has all packages + dependencies for Development marked `"dev":true`, and for Production
```json
{
  "name": "your_project_name",
  ..
  ..  
  "dependencies": {
    "typescript": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/typescript/_etc_.tgz",
      "integrity": "sha512-33g3pMJk3bg5nXbL_etc_==",
      "dev": true,
      "requires": {
        "another_package_a": "2.0.4",
        "another_package_b": "1.2.0"
      }
    },
    ..
    ..
    several_packages: several_values,
    ..
    ..
  }
}
```
## 1.3 Running
Up to this step nothing to run, but open `package.json` and `package-lock.json` to get familiar with content.

# 2 - MINIMAL EXPRESS APP WITHOUT ANGULAR
Basically, a running Express App.

## 2.1 Steps - Entry Point server.js
The minimal Express App has an entry point. We'll call it `server.js`, but **can be called anything**.
We create `server.js` and will basically to the following inside:

| STEP | CODE | DESCRIPTION |
| --- | --- | --- |
| 1 |`const express = require('express')`| Import/Load Express module |
| 2 |`const app = express()` | Declare a New Express App. |
| 3 |`app.get('/*', (req, res) => { }` | Declare the routes |
| 4 |`app.listen(PORT, () => { })` | Start accepting connections |

## 2.2 Deriverables
Current folder structure:
```
project_root_folder
|--package.json
|--package-lock.json
|--node_modules
|--server.js
```

**server.js** is the App entry point.

```javascript

//--- 1. NODEJS: IMPORT MODULES
                            // Express provides Routing and Managing HTTP Verbs
const express = require('express');

//--- 2. EXPRESS: INITIALIZE APP
                            // Declare the hostname and ports to be used
const HOSTNAME = 'localhost'; // (optional) By default `localhost` is utilized

                            // Multiple wasys of set process.env.PORT, here are some
                            // A) Add to package.json (below), then at terminal: "npm run customstart
                            // "scripts": {
                            //    "customstart": "PORT=3001 node server.js"
                            //  }
                            // B) from Linux terminal: PORT=3001 node server.js
                            //    Windows: set PORT=3001 then call node server.js
                            //    Windows: $env:PORT=3001 then call node server.js
const PORT = process.env.PORT || 3000;
const app = express();      // Creates the App

//--- 3. EXPRESS: ADD ROUTE HANDLERS
                            // '*' captures any route.
app.get('/*', (req, res) => {        
                            // Printing in server
    console.log('GET Request arrived');
                            //
                            // For STEP 2 only
                            // Print on client (send string data)
    res.send('Server Answered');
});


//--- 4. EXPRESS: START ACCEPTING CONNECTIONS
                            // (optional) hostname
app.listen(PORT, HOSTNAME, () => {
        console.log(`Listening on http://${HOSTNAME}:${PORT}`);
});
```
## 2.3 Running
By this stage run: `npm start`, and test by going to any address `http://localhost:3000`, `http://localhost:3000/anything`

# 3 - MINIMAL EXPRESS APP WITH WEBPACK WITHOUT ANGULAR
Basically, running a minimal Express App that can use Webpack to **build** the `~/src` and produce a target distribution in `~/dist`

## Step 3.1.1 - Add File to Compile/Build - main.ts
Create a minimun file to be compiled by Webpack.
`~/main.ts` should contain only: 
```javascript
console.log("Single Page App - SPA");
```
This file will not be served directly, but it will be processed/compiled/build by Webpack and injected into the final Webpage

## Step 3.1.2 - Add a minimal HTML template - index.html
This is a minimum HTML which Webpack will use as a template when building the App. Basically, Webpack gets the HTML and uses it in Compilation to inject or bundle stuff inside without user intervention.
`~/src/index.html`: 
```html
<html lang="en">
    <head>
        <title>Webpage Title</title>      
        <link rel="stylesheet" href="assets/styles/main.css">
    </head>
    <body>
        <h1>Title</h1>
        <div class="content">
            <p>Here's The Content A</p>
        </div>
        <div class="content">
            <p>Here's The Content B</p>
        </div>
        <footer><p>A Footer</p></footer>
    </body>
</html>
```
## Step 3.1.3 - Add a minimal CSS and Image - main.css / cloud-engineer.svg
Use this only to give more meaning to the HTML.
1. Save image in `~/src/assets/img/cloud-engineer.svg`
2. Create CSS `~/src/assets/styles/main.css` with content:
```css
body {
    border: 1px pink solid;/* debugging */
    margin: 0 auto;
    height: 100%;           /* Make BODY fill entire screen vertically */
    min-height: 550px; 
    max-width: 1000px;    
    display: flex;          /* Create a Flex container for BODY children elements */
    flex-direction: column; /* Children elements will position vertically like a tower (1 on top the another) */
                            /* Will use an image (like PNG, SVG) as background on BODY */
    background-image: url("/assets/img/cloud-engineer.svg");
                            /* Background will not be repeated as a pattern, and will be centered */
    background-repeat: no-repeat;
    background-position:center ;
}
.content {
    border: 1px green solid;/* debugging */
    flex: 1 0 auto;         /* Equivalent to write:
                                flex-grow: 1;       How Element will grow in relation to rest, 1 means equals
                                flex-shrink: 0;     How Element will shrink in relation to rest, 1 means equals
                                flex-basis: auto;   How element's length will be initially. Deaults is 0
                            */
 }
footer {
    text-align: center;     /* Make any text align at the center */
}
```

## Step 3.1.4 - Update package.json For Compilation
By adding scripts to `package.json`, we can customize what will run (buid/compilation, tests, the app). We need to add 2 scripts,
and remove a property `main`.

| STEP | STATUS | CODE | DESCRIPTION |
| --- | --- | --- | --- |
| 1 | NEW | `"build": "webpack"`| Will call Webpack to compile/transpile |
| 2 | NEW | `"start": "node server.js"` | Specify which file is entry point to start App |
| 3 | DELETE | `"main": "index.js"` | No longer needed since Webpack builds the project |

`package.json`:
```json
{
 ..
 .. REMOVE "main": "index.js",
 ..
 several_general_project_keys: several_values,
 ..
 ..
 "scripts": {
    ..
    ..
    "build": "webpack",
    "start": "node server.js"
  },
  ..
  ..
}
```

## Step 3.1.5 - Add Webpack Configuration
Basically, Webpack requires a configuration to work:
* `webpack.config.js` is the default file Webpack will search.
* Webpack basically do the following for each Entry
  1. Specify the `entries` that require a build.
  2. Apply `plugins` to each entry.
  3. Output build according to `outputs` declared.
* See 3.2) Deriverables for full code.

| STEP | CODE | DESCRIPTION |
| --- | --- | --- |
| 1 |`const HtmlWebpackPlugin = require('html-webpack-plugin');`| Import/Load Webpack Plugins |
| 2 |`module.exports = { webpack_info_here }`| Create Wepback Object |
| 3 |`mode: 'development'` | (Optional) Set the Enviroment/Lane |
| 4 |`entry: './src/main.ts'`| Declare entry point to start build |
| 5 |`output: { path: __dirname, filename: 'app.js'`| Declare the bundle ouput |
| 6 |`plugins: [ new CopyWebPackPlugin({ }), ]`| Setup the plugins. |

## Step 3.1.6 - Update server.js
* In summary, we need to update it to handle a **Template Engine** called EJS.
* See 3.2) Deriverables for full code.

| STEP | STATUS | CODE | DESCRIPTION |
| --- | --- | --- | --- |
| 1 | done | `const express = require('express')`| Import/Load Express module |
| 2 | done | `const app = express()` | Install TypeScript package. Means download it. |
| 3 | NEW | `app.engine('html', require('ejs').renderFile` | Declare HTML template rendering |
|   | NEW | `app.set('view engine', 'html')` | Define template engine |
|   | NEW | `app.set('views', 'dist')` | Define template folder location |
| 4 | NEW | `app.use('/', express.static( 'dist', { index: false }))` | Enable static HTML |
| 5 | UPDATE | `app.get('/*', (req, res) => { res.render() }` | Declare the routes, and use render() |
| 6 | Done | `app.listen(PORT, () => { })` | Start accepting connections |


## 3.2 Deriverables
Current folder structure:
```
project_root_folder
|--package.json
|--package-lock.json
|--webpack.config.js
|--node_modules
|--server.js
|--main.ts
|--src
  |--index.html
  |--assets
    |--img
      |--cloud-engineer.svg
    |--styles
      |--main.css
```
A `dist` folder will be automatically added on the firs run of `npm build`

`webpack.config.js`:
```javascript
//--- 1. IMPORT WEBPACK PLUGINS
                                // Generates HTML5, and can use hashes in filename
const HtmlWebpackPlugin = require('html-webpack-plugin');
                                // Copies file and folders to build folder
const CopyWebpackPlugin = require('copy-webpack-plugin');

//--- 2. CREATE OBJECT TO BE READ BY WEBPACK
                            // Basically everything inside { } is used by Webpack
module.exports = {

//--- 3. LANE MODE
        mode: 'development',// Use 'production' for Production Lane
//--- 4. ENTRY POINT        
                            // Tells Webpack to begin build bundles with './src/main.ts`
                            // This is the simplest entry point with exactly 1 page.
        entry: './src/main.ts',
                            // After simplest entry comes an Array of entries for multiple pages. Example:
                            // entry: ['main.ts','entry2.ts', 'entry3.js']
                            // The more robust and scalable is Object of entries
                            // entry: {
                            //      entry1: 'main.ts',
                            //        entry2: {
                            //            dependOn: 'main.ts',
                            //            import: 'file1.js'
                            //        }
                            // }
//--- 5. OUTPUT
                            // Tells Webpack to output the bundles to '~/dist'
        output: {
                            // Specifying the folder '~/dist`
            path: __dirname + '/dist',
                            // Specifying the output file '~/dist/app.js`
            filename: 'app.js',
                            // A more advanced ouput dealing with multiple files and hashes
                            // Example where [name] makes automatic reference to Step 4 entry names.
                            // and [fullhash] generates an automatic hash. Both part of Webpack features.
                            // output: {
                            //    filename: '[name].js',
                            //    path: __dirname + '/dist/[fullhash]',
                            //  },
                            //
            clean: true     // Remove all output path files ('/dist') before a new build
        },
//--- 6. SETUP PLUGINS

        plugins: [
                            // Copy Assets .CSS .PNG to ouput specified in 5. 
                            // Copy '~/src/assets` to '~/dist/assets'
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/assets', to: 'assets' }
                ]
            }),
                            // This will use information from 5. to: 
            new HtmlWebpackPlugin({
                            // to generate an 'dest/index.html' from template 'src/index.html'
                template: __dirname + '/src/index.html',
                            // and to inject (add) 'app.js' in the generated 'index.html'
                            // exactly in the <head> tag with the following:
                            // <script src="app.js"></script>
                inject: 'head'
            } )
        ]
                            // --- Webpack Object Ends ---
}
```

`server.js`:

```javascript

//--- 1. NODEJS: IMPORT MODULES
                            // Express provides Routing and Managing HTTP Verbs
const express = require('express');

//--- 2. EXPRESS: INITIALIZE APP
const HOSTNAME = 'localhost';
const PORT = process.env.PORT || 3000;
const app = express();      // Creates the App

//--- 3. EXPRESS: TEMPLATE ENGINE --- NEW CODE ---
                            // Default template engine in Express is Jade.
                            // 

                            // 3.1) Declare that when dealing with HTML content
                            // EJS engine will be used to render (res.render())
                            // 1st parameter says engine is for HTML.
                            // 2nd parameter is a shorthand to import like in (1)
app.engine('html', require('ejs').renderFile);
                            // Example if using Handlebars. There are more like PUG, Mustache:
                            // app.engine('html', require('hbs').renderFile);

                            // Defines the Express template engine to use
                            // Use 3.1) as the template engine.
app.set('view engine', 'html');
                            // Set the folder where templates are located
app.set('views', 'dist');   // Setting 'dist' as folder location
                            // Example using Node.js __dirname which points to folder
                            // where this server.js script resides, and Node.js
                            // path.join concatenates folders/paths:
                            // const path = require('path');                            
                            // app.set('views', path.join(__dirname, 'dist'));

                            // Enable serving directly static HTML, and
                            // Disable serving specifically http://domain_name/index.html, otherwise route '*' won't work on '/'
app.use('/', express.static('dist', { index: false }));
                            // Example of alternative writing:
                            // var options = {index: false};
                            // app.use(express.static(__dirname + 'dist', options));

//--- 4. EXPRESS: ADD ROUTE HANDLERS
                            // '*' captures any route.
app.get('/*', (req, res) => {        
                            // Printing in server
    console.log('GET Request arrived');
                            // For STEP 2 only
                            // Print on client (send string data)
    // res.send('Server Answered');
                            // For STEP 3 only --- NEW CODE ---
    res.render('./index');  // Renders the view 'index' by using {req,res} properties
                            // For a future STEP ??? only
    //res.render('./index', {req, res});
});


//--- 5. EXPRESS: START ACCEPTING CONNECTIONS
app.listen(PORT, HOSTNAME, () => {console.log(`Listening on http://${HOSTNAME}:${PORT}`);});
```

## 3.3 Running

| STEP | CONSOLE | DESCRIPTION |
| --- | --- | --- |
| 1 |`npm run build`| Builds/Compiles the project with Webpack, generating the target folder '/dist' |
| 2 |`npm start`| Run the Server |


# 4 - MINIMAL RUNNING APP WITH ANGULAR
Basically, the running App in 3) but with Angular support.

# 5 - MINIMAL COMPONENT AND SERVICE
Basically, adding to 4) support for Observable, Template, Async Injection

# REFERENCES
https://www.twilio.com/blog/2018/03/building-an-app-from-scratch-with-angular-and-webpack.html
https://www.taniarascia.com/how-to-use-webpack/
https://dev.to/antonmelnyk/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5
https://levelup.gitconnected.com/how-to-create-a-production-ready-webpack-4-config-from-scratch-ba1862e1607c  
https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x

