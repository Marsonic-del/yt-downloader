const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, corsOptions } = require('./config');
const mongoose = require('mongoose');
const { getCountries, fetchVideos } = require('./utils/videos');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/video', {});

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(route);

// централизованный обработчик ошибок
app.use(errorHandler);

const server = app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT} port`)
    // await getCountries();
    // await fetchVideos()

    // const intervalId = setInterval(fetchVideos, 24 * 60 * 60 * 1000);

    // app.set('intervalId', intervalId);
});

process.on('SIGINT', () => {
    // const intervalId = app.get('intervalId');

    // clearInterval(intervalId);

    server.close(() => {
        process.exit();
    });
});
