class ErrorsApp extends Error {
  constructor(statusCode, message) {
    super(message), (this.statusCode = statusCode);
  }
}

const handleErrors = (err, req, res, next) => {
  if (!(err instanceof ErrorsApp)) {
    err = new ErrorsApp(500, "Internal Server !");
  }

  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = {
  ErrorsApp,
  handleErrors,
};
