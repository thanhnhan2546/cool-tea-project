const joi = require("joi");

const productValidate = joi
  .object({
    name: joi.string().required(),
    idCategory: joi
      .string()
      .pattern(
        new RegExp(
          "^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$"
        )
      )
      .required(),
    image: joi.string(),
    status: joi.string().pattern(new RegExp("^[01]$")),
    price: joi.number(),
    prices: joi.array().items(
      joi.object({
        size: joi.valid("M", "L").required(),
        price: joi.number().required(),
      })
    ),
  })
  .unknown(true);

const categoryValidate = joi.object({
  name: joi.string().required(),
});
module.exports = {
  productValidate,
  categoryValidate,
};
