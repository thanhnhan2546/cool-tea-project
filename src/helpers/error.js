class ErrorsApp extends Error {
  constructor(statusCode, message) {
    super(message), (this.statusCode = statusCode);
  }
}

const handleErrors = (err, req, res, next) => {
  console.log("err: ", err);
  if (!(err instanceof ErrorsApp)) {
    err = new ErrorsApp(500, "Internal Server !");
  }

  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
const notFound = (req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Route is not defined",
  });
};

module.exports = {
  ErrorsApp,
  handleErrors,
  notFound,
};
