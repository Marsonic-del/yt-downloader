const validator = require('validator');
const NotValidDataError = require('../errors/NotValidDataError');
const youtubeUrl = require('youtube-url');

const validateYtLink = (req, res, next) => {
    const link = req.query.link;

    // Check if the link is a valid URL
    if (validator.isURL(link)) {
        // const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|youtu\.be\/)(watch\?v=)?([^&=%\?]{11})$/;
        // const match = link.match(youtubeRegex);

        if (link.includes("&list=")) {
            // Remove everything after "&list="
            req.query.link = link.split("&list=")[0];
        }

        if (link.startsWith('https://www.youtube.com/shorts/')) {
            return next()
        }

        if (youtubeUrl.valid(link)) {
            next()
        } else {
            return next(new NotValidDataError("Not valid Youtube link"));
        }
    } else {
        next(new NotValidDataError("Not valid link"));
    }
}

module.exports = { validateYtLink }