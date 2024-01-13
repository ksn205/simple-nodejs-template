// the entry file, sets up the local server
const express = require('express');
const app = express();

// set up the port
const port = process.env.PORT || 8080;

// set up a static file directory at src so that all files can be accessed publicly
app.use(express.static('public'))

// set up the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);
