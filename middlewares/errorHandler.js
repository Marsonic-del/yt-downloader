const { errorLogger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const { link } = req.query;
  const userIP = req.ip;
  errorLogger.error({ link, userIP, statusCode }, message);
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'Internal Server Error'
        : message,
    });
  next();
};

module.exports = errorHandler;
