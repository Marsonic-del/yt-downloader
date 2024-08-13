const { NotFoundError } = require('../errors/NotFoundError');
const { infoLogger, errorLogger } = require('../utils/logger');
const Video = require('../models/video');
const Country = require('../models/country');

let countries;
(async () => {
    countries = await Country.find({});
})()

// fetching videos by scrolling in browser
const getVideosByCategory = async (req, res, next) => {
    const categoryId = req.params.category;
    console.log(categoryId)
    const { pageNumber, pageSize, limit = 10, country = 'US' } = req.query;
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date().setDate(currentDate.getDate() + 1);
    const endDateIso = new Date(endDate);
    endDateIso.setUTCHours(0, 0, 0, 0);

    try {
        let videos;
        console.log('pageNumber: ', pageNumber)
        console.log('pageSize: ', pageSize)
        const skip = (pageNumber - 1) * pageSize;
        if (limit === 'all') {
            videos = await Video.find({ country, category: categoryId }).sort({ date: -1 }).skip(skip).limit(pageSize).exec();
            console.log('All videos from: ', country)
        } else {
            videos = await Video.find({ country, category: categoryId }).sort({ date: -1 }).skip(skip).limit(pageSize).exec();
            console.log('Limit videos from: ', country)
        }

        res.status(200).json({
            country,
            videos,
        })
        infoLogger.info({
            country: countries.find(obj => obj.gl === country).gl
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = getVideosByCategory;