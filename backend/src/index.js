const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const cors = require('cors')

const app = express();
 
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-uxro6.mongodb.net/omnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// http methods : GET, POST, PUT and DELETE

// Types of params

// Query params: request.query 
// Route params: req.params
// Body:

app.use(cors())
app.use(express.json());
app.use(routes);
app.listen(3333);
