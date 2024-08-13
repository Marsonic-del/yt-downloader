const { getYtData } = require('../utils/metadata');
const { NotFoundError } = require('../errors/NotFoundError');
const { infoLogger, errorLogger } = require('../utils/logger');

const getYtContent = async (req, res, next) => {
    try {
        console.log('from controller')
        const referer = req.get('Referer');
        const origin = req.get('Origin');

        console.log('Referer:', referer);
        console.log('Origin:', origin);

        const { link } = req.query;
        const ip = req.ip
        //const currentDate = new Date();

        const response = await getYtData(link)
        res.status(200).json(response)
        infoLogger.info({
            link, ip
        });
    } catch (error) {
        console.log(error.message)
        if (error.message.includes('Video unavailable')) {
            return next(new NotFoundError('The video or the link are unavailable'));
        }
        errorLogger.error(error);
        next(new Error(error.message || "Some error occurred."));
    }
}

module.exports = { getYtContent };