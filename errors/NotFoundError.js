const { ERR_404 } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_404;
  }
}
module.exports = { NotFoundError };
