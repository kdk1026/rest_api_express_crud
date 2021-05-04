const express = require('express');
const router = express.Router();

const movie = require('./movie');
router.use('/api/movie', movie);

module.exports = router;