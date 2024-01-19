const apiRouter = require('express').Router();
const { getYtContent } = require('../controllers/youtube');
const { validateYtLink } = require('../middlewares/validations');


apiRouter.get('/v1', validateYtLink, getYtContent);

// userRouter.all((req, res, next) => { next(new NotFoundError('Несуществующий маршрут')); });

module.exports = apiRouter;