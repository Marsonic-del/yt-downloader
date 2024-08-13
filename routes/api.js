const apiRouter = require('express').Router();
const { getYtContent } = require('../controllers/youtube');
const getVideos = require('../controllers/getVideos');
const getVideosByCategory = require('../controllers/getVideosByCategory');
const fetchVideos = require('../controllers/fetchVideos');
const fetchVideosByCategory = require('../controllers/fetchVideosByCategory');
const removeOldVideos = require('../controllers/removeOldVideos');
const { validateYtLink } = require('../middlewares/validations');

// sends list of videos when an user is scrolling in a browser
apiRouter.post('/v1/videos/:category', getVideosByCategory);
//apiRouter.post('/v1/videos', getVideos);

// fetches from youtube api and saves in database info about most popular videos by category  
apiRouter.post('/v1/fetch-videos/:category', fetchVideosByCategory);
apiRouter.post('/v1/fetch-videos', fetchVideos);
apiRouter.post('/v1/delete-old-videos', removeOldVideos);
apiRouter.post('/v1', validateYtLink, getYtContent);

// userRouter.all((req, res, next) => { next(new NotFoundError('Несуществующий маршрут')); });

module.exports = apiRouter;