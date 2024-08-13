require('dotenv').config();

const {
    NODE_ENV, PORT,
} = process.env;

module.exports = {
    PORT: NODE_ENV === 'production' ? PORT : 8080,
    corsOptions: {
        origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:80', 'https://localhost:3000', 'https://hollywooddownloader.com', 'http://hollywooddownloader.com'],
        methods: 'POST,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }
};