const { ErrorsApp } = require("../helpers/error");
const { response } = require("../helpers/response");

const uploadImage = () => {
  return async (req, res, next) => {
    try {
      if (req?.file) {
        res.status(200).json(response(req?.file?.path));
      }
      throw new ErrorsApp(400, "file is invalid");
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  uploadImage,
};
