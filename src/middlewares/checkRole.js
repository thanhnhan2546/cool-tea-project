const { ErrorsApp } = require("../helpers/error");

const verifyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    throw new ErrorsApp(
      401,
      "user is not authorized to access this resource Admin"
    );
  }
  next();
};

const verifyManager = (req, res, next) => {
  const { role } = req.user;
  if (role !== "Manager") {
    throw new ErrorsApp(401, "user is not authorized to access this resource");
  }
  next();
};

module.exports = {
  verifyAdmin,
  verifyManager,
};
