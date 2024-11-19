const { getCountries, fetchVideos, fetchVideosByCategory } = require('../utils/videos');
const { categories } = require('../config')

// fetches and saves list of countries and videos from youtube
const getData = async (req, res, next) => {
    try {
        const password = req.query.password;
        if (password !== process.env.PASSWORD_FOR_ROUTE) {
            return res.status(401).send('Unauthorized');
        }
        await getCountries();
        await fetchVideos();
        // for (category of Object.keys(categories)) {
        //     await fetchVideosByCategory(categories[category])
        // }
        res.status(200).send(`Videos have been saved`);
    } catch (error) {
        return next(new Error('Error happened during fetching list of videos from youtube'));
    }
}

module.exports = getData;