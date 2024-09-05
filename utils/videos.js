require('dotenv').config();
const axios = require('axios');
const Country = require('../models/country')
const Video = require('../models/video')

const { API_KEY } = process.env;

const getCountries = async () => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${API_KEY}`);
        for (let country of response.data.items) {
            const { etag } = country;
            const { gl, name } = country.snippet;
            const existingCountry = await Country.findOne({ etag });
            if (!existingCountry) {
                // Create a new country record if it does not exist
                await Country.create({ etag, gl, name });
            }
        }
    } catch (error) {
        console.log(error)
    }

}

async function updateOrCreateVideo(video, country, categoryToAdd) {
    try {
        const { id } = video;
        const existingVideo = await Video.findOne({ id });
        if (existingVideo) {
            await Video.updateOne(
                { id, },
                {
                    $addToSet: { category: categoryToAdd, country: country }
                }
            );
        } else {
            video.country = [country];
            video.date = new Date();
            video.category = [categoryToAdd];
            await Video.create(video);
        }
        // const result = await Video.findOneAndUpdate(
        //     { id, country },
        //     { $addToSet: { category: categoryToAdd } }, // $addToSet ensures unique categories
        //     { upsert: true, new: true }
        // );

        // if (result) {
        //     console.log(`Document updated/created for id: ${id} and country: ${country}.`);
        // }
    } catch (error) {
        console.error('Error:', error);
        // } finally {
        //   // Close the database connection if needed
        //   mongoose.connection.close();
        // }
    }
}

const _createVideo = async (videos, country) => {
    for (let video of videos) {
        await updateOrCreateVideo(video, country, category = 99)
        // video.country = country;
        // video.date = new Date();
        // await Video.create(video)
    }
}

const _createVideoByCategory = async (videos, country, category) => {
    for (let video of videos) {
        await updateOrCreateVideo(video, country, category)
        // video.country = country;
        // video.category = category
        // video.date = new Date();
        // await Video.create(video)
    }
}

const _fetchVideo = async (country, nextPageToken) => {
    if (nextPageToken) {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,topicDetails,status,recordingDetails,localizations&maxResults=50&chart=mostPopular&regionCode=${country.gl}&key=${API_KEY}&pageToken=${nextPageToken}`);

        await _createVideo(response.data.items, country.gl);

        if ('nextPageToken' in response.data) {
            await _fetchVideo(country, response.data['nextPageToken'])
        }
    } else {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,topicDetails,status,recordingDetails,localizations&maxResults=50&chart=mostPopular&regionCode=${country.gl}&key=${API_KEY}`);

        await _createVideo(response.data.items, country.gl)

        if ('nextPageToken' in response.data) {
            await _fetchVideo(country, response.data['nextPageToken'])
        }
    }
}

const _fetchVideoByCategory = async (country, category, nextPageToken) => {
    if (nextPageToken) {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,topicDetails,status,recordingDetails,localizations&maxResults=50&chart=mostPopular&regionCode=${country.gl}&key=${API_KEY}&pageToken=${nextPageToken}&videoCategoryId=${category}`);

        await _createVideoByCategory(response.data.items, country.gl, category);

        if ('nextPageToken' in response.data) {
            await _fetchVideoByCategory(country, category, response.data['nextPageToken'])
        }
    } else {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,topicDetails,status,recordingDetails,localizations&maxResults=50&chart=mostPopular&regionCode=${country.gl}&key=${API_KEY}&videoCategoryId=${category}`);

        await _createVideoByCategory(response.data.items, country.gl, category)

        if ('nextPageToken' in response.data) {
            await _fetchVideoByCategory(country, category, response.data['nextPageToken'])
        }
    }
}

const fetchVideos = async () => {
    try {
        const countries = await Country.find({});
        for (let country of countries) {
            await _fetchVideo(country);
        }
        console.log('finish');
    } catch (error) {
        console.log(error)
    }
}

const fetchVideosByCategory = async (categoryId) => {
    try {
        const countries = await Country.find({});
        for (let country of countries) {
            await _fetchVideoByCategory(country, categoryId);
        }
        console.log('finish by category');
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getCountries,
    fetchVideos,
    fetchVideosByCategory
}