const route = require('express').Router();
const cors = require('cors');
const apiRouter = require('./api')
const { corsOptions } = require('../config')

route.options('*', cors(corsOptions));
route.use('/api', cors(corsOptions), apiRouter);


module.exports = route;
