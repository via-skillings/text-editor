const express = require('express'); // Import the Express framework

const app = express(); // Create an instance of Express
const PORT = process.env.PORT || 3000; // Define the port number from environment variable or default to 3000

// Serve static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Parse URL-encoded bodies and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Include routes defined in './routes/htmlRoutes' and pass the 'app' instance
require('./routes/htmlRoutes')(app);

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
