const pino = require('pino');
const pinoPretty = require('pino-pretty');
const fs = require('fs');
const path = require('path');

// Create a writable stream for the info log file
const infoLogFilePath = path.join(__dirname, '../logs', 'info.log');
const infoLogFileStream = fs.createWriteStream(infoLogFilePath, { flags: 'a' });

// Create a writable stream for the error log file
const errorLogFilePath = path.join(__dirname, '../logs', 'error.log');
const errorLogFileStream = fs.createWriteStream(errorLogFilePath, { flags: 'a' });

const infoLogger = pino({
    level: 'info',
    base: { pid: false },
    transport: {
        target: 'pino-pretty',
        options: {
            colorized: true
        }
    },
    timestamp: () => `,"time": "${new Date().toLocaleString()}"`,
}, infoLogFileStream);
const errorLogger = pino({ level: 'error' }, errorLogFileStream);

function logQueryParams(req, res, next) {
    const { link } = req.query;
    const userIP = req.ip;

    infoLogger.info({
        link, userIP
    }, 'Received a request with "link" query parameter and user IP');
    next();
}

module.exports = {
    infoLogger,
    errorLogger,
    logQueryParams,
};

