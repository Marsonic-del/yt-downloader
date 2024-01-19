require('dotenv').config();

const {
    NODE_ENV, PORT,
} = process.env;

module.exports = {
    PORT: NODE_ENV === 'production' ? PORT : 8080,
    corsOptions: {
        origin: ['http://localhost:3000', 'https://localhost:3000', 'http://192.168.1.2:3000', 'https://hollywood-downloader', 'http://hollywood-downloader'],
        methods: 'GET,HEAD,POST,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }
};