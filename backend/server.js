
const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
    res.send('pong');
    });

app.listen(3000, () => {

    console.log('Server is running on port https://localhost:3000/ping');
    });

    
