const { NotFoundError } = require('../errors/NotFoundError');
const { infoLogger, errorLogger } = require('../utils/logger');
const Video = require('../models/video');
const Country = require('../models/country');

let countries;
(async () => {
    countries = await Country.find({});
})()


const getVideos = async (req, res, next) => {
    const { limit = 10, country = 'US' } = req.query;
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date().setDate(currentDate.getDate() + 1);
    const endDateIso = new Date(endDate);
    endDateIso.setUTCHours(0, 0, 0, 0);

    try {
        let videos;
        if (limit === 'all') {
            videos = await Video.find({ country, date: { $gte: currentDate, $lt: endDateIso } })
            console.log('videos.length: ', videos.length, ' country: ', country)
            console.log('All videos from: ', country)
        } else {
            videos = await Video.find({ country, date: { $gte: currentDate, $lt: endDateIso } }).limit(limit);
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

module.exports = getVideos;