
//--- 1. NODEJS: IMPORT MODULES
                            // Express provides Routing and Managing HTTP Verbs
const express = require('express');

//--- 2. EXPRESS: INITIALIZE APP
const HOSTNAME = 'localhost';
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

//--- 3. EXPRESS: TEMPLATE ENGINE
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

                            // Enable serving directly static files HTML/CSS/PNG, and
                            // Disable serving specifically http://domain_name/index.html, otherwise route '*' won't work on '/'
app.use('/', express.static('dist', { index: false }));
                            // Example of alternative writing:
                            // var options = {index: false};
                            // app.use(express.static(__dirname + 'dist', options));

// ------ SANDBOX BEGINS ------
/*
let counterGet = 0;         // For counting GET requests

                            // Browsers automatically request a favicon
                            // on every GET call. Here we catch the favicon
                            // petition. We respond with No Content (HTTP 204)
                            // and end the GET connection.
app.get('/favicon.ico', (req,res)=> res.status(204).end());

                            // Sandbox for testing points to http://localhost:3000/sandbox
                            // Basically we print a counter in the client and server
app.get('/sandbox', (req,res) => {
                            // Printing in Node.js server                            
    console.log(`Received a GET request #${counterGet}`);
                            
                            // Printing in Client has 2 ways:

                            // (Option A) Node.JS                       
    res.type('text/plain'); // (optional) Set response type    
                            // Printin in Client Node.js way by sending partial
                            // data to client                                                        
    res.write('Server says:');
    res.write(`Request Received #${counterGet}`);                            
    res.status(200).end();  // End Sending data by closing connection
                            // end('text here') can also send data before closing
                            
                            // (Option B) Exclusive of Express                    
    //res.send('my message');   // This is write() + end() combined, which
                            // means it will send a message, and end() the connection.
                            // means only send 1 message.
                            // Don't Combine Option A and Option B

    counterGet++;           // Increment counter on each GET call to sandbox
});
*/
// ------ SANDBOX ENDS ------

//--- 4. EXPRESS: ADD ROUTE HANDLERS
                            // '*' captures any route.
app.get('/*', (req, res) => {        
                            // Printing in server
    console.log('GET Request arrived');
                            // For STEP 2 only
                            // Print on client (send string data)
    //res.send('Server Answered');
                            // For STEP 3 only                            
    res.render('./index');  // Renders the view 'index' by using {req,res} properties
                            // For STEP ??? only
    //res.render('./index', {req, res});
});



//--- 5. EXPRESS: START ACCEPTING CONNECTIONS
                            // (optional) hostname
app.listen(PORT, HOSTNAME, () => {
        console.log(`Listening on http://${HOSTNAME}:${PORT}`);
});