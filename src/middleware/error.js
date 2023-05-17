function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error(message);
  res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
