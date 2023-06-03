const Router = require('express');
const ApiRouter = Router();

ApiRouter.use('/agent', require('./agent'));
ApiRouter.use('/map', require('./map'));

module.exports = ApiRouter;