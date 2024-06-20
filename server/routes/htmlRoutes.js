const path = require('path'); // Import the 'path' module from Node.js

module.exports = (app) =>
    // Export a function that accepts 'app' as a parameter
  app.get('/', (req, res) =>
      // Define a route handler for GET requests to '/'
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
      // Send the 'index.html' file located in the 'client/dist' directory
  );
