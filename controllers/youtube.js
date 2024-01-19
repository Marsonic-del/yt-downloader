const { getYtData } = require('../utils/metadata');
const { NotFoundError } = require('../errors/NotFoundError');
// const pool = require('../db/db');
const { errorLogger } = require('../utils/logger');

const getYtContent = async (req, res, next) => {
    try {
        const { link } = req.query;
        const ip = req.ip
        const currentDate = new Date();
        const response = await getYtData(link)
        res.status(200).json(response)

        // pool.query(
        //     'INSERT INTO logs (ip, link, log_date) VALUES ($1, $2, $3)RETURNING id, ip, link, log_date',
        //     [ip, link, currentDate],
        //     // (err, data) => {
        //     //     console.log('data: ', data.rows[0])
        //     //     console.log('err: ', err)
        //     //     res.status(200).json(response);
        //     // }
        // );



    } catch (error) {
        if (error.message.includes('Video unavailable')) {
            return next(new NotFoundError('The video or the link are unavailable'));
        }
        errorLogger.error(error);
        next(new Error(error.message || "Some error occurred."));
    }
}

module.exports = { getYtContent };