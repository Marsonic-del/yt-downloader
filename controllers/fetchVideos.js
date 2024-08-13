const { fetchVideos } = require('../utils/videos');

module.exports = async (req, res, next) => {
    try {
        await fetchVideos();
        res.status(200).send('Videos have been saved');
    } catch (error) {
        return next(new Error('Error happened during downloading videos'));
    }
}