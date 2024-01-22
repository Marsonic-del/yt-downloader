require('dotenv').config();

const {
    NODE_ENV, PORT,
} = process.env;

module.exports = {
    PORT: NODE_ENV === 'production' ? PORT : 8080,
    corsOptions: {
        origin: ['http://localhost:3000', 'https://localhost:3000', 'http://54.161.36.200', 'https://hollywooddownloader.com', 'http://hollywooddownloader.com'],
        methods: 'GET,HEAD,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }
};