const validator = require('validator');
const NotValidDataError = require('../errors/NotValidDataError');
const youtubeUrl = require('youtube-url');
const UrlParser = require("@iktakahiro/youtube-url-parser");


const validateYtLink = (req, res, next) => {
    const link = req.query.link;

    console.log('check link: ', link)
    //console.log('validator: ', validator.isURL(link))

    // Check if the link is a valid URL
    if (link && validator.isURL(link)) {
        console.log('link valid: ', link)
        // const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|youtu\.be\/)(watch\?v=)?([^&=%\?]{11})$/;
        // const match = link.match(youtubeRegex);

        if (link.includes("&list=")) {
            // Remove everything after "&list="
            req.query.link = link.split("&list=")[0];
        }

        if (link.startsWith('https://youtube.com/shorts/') || link.startsWith('https://www.youtube.com/shorts/')) {
            console.log("shortS")
            return next()
        }

        // if (new UrlParser.YouTubeURLParser(link).isValid()) {
        //     console.log("shortS")
        //     return next()
        // }

        if (youtubeUrl.valid(link)) {
            next()
        } else {
            console.log("not valid short")
            console.log(link)
            return next(new NotValidDataError("Not valid Youtube link"));
        }
    } else {
        console.log('link invalid: ', link)
        next(new NotValidDataError("The provided video link is empty or invalid."));
    }
}

module.exports = { validateYtLink }