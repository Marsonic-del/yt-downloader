require('dotenv').config();

const {
    NODE_ENV, PORT,
} = process.env;

module.exports = {
    PORT: NODE_ENV === 'production' ? PORT : 8080,
    corsOptions: {
        origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:5000', 'http://localhost:80', 'https://localhost:3000', 'https://24youtube.com', 'http://24youtube.com'],
        methods: 'GET,POST,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    },
    categories: {
        music: 10,
        films: 1,
        games: 20,
        shorts: 24,
        mostPopular: 99,
    },
    database: process.env.DB_TYPE,
};