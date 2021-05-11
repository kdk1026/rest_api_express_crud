const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(router);

app.use(function(req, res, next) {
    res.status(404).json( {code:404, message:'Not Found'} );
});

app.use(function(err, req, res, next) {
    res.status(500).json( {code:500, message:'Server Error'} );
});

app.listen(3000, function() {
    console.log('start, express server on port 3000');
});
