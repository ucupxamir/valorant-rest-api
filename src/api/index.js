const Router = require('express');
const ApiRouter = Router();

ApiRouter.use('/agent', require('./agent'));

module.exports = ApiRouter;