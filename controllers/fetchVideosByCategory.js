const { fetchVideosByCategory } = require('../utils/videos');

module.exports = async (req, res, next) => {
    try {
        const categoryId = req.params.category;
        await fetchVideosByCategory(categoryId);
        res.status(200).send(`Videos by categories have been saved ${categoryId}`);
    } catch (error) {
        return next(new Error('Error happened during downloading videos by categories'));
    }
}