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
      .messages({
        "string.pattern.base": "id must be a valid UUID format",
      })
      .required(),
    image: joi.string(),
    status: joi.string().pattern(new RegExp("^[01]$")),

    prices: joi.array().items(
      joi.object({
        size: joi.valid("M", "L", "no size").required(),
        price: joi.number().required(),
      })
    ),
  })
  .unknown(true);

const categoryAndRoleValidate = joi
  .object({
    name: joi.string().required(),
  })
  .unknown(true);

const updatePriceValidate = joi.object({
  idProduct: joi
    .string()
    .pattern(
      new RegExp(
        "^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$"
      )
    )
    .required(),
  size: joi.valid("M", "L", "no size").required(),
  price: joi.number().required(),
});

const idValidate = joi
  .string()
  .pattern(
    new RegExp(
      "^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$"
    )
  )
  .messages({
    "string.pattern.base": "id must be a valid UUID format",
  });

const employeeUpdateValidate = joi
  .object({
    firstName: joi
      .string()
      .pattern(/^[a-zA-ZÀ-ỹ\s']+$/u)
      .message({
        "string.pattern.base": "first name can only contain letters",
      })
      .required(),
    lastName: joi
      .string()
      .pattern(/^[a-zA-ZÀ-ỹ\s']+$/u)
      .message({
        "string.pattern.base": "last name can only contain letters",
      })
      .required(),
    gender: joi.valid("male", "female", "other").required(),
    dateOfBirth: joi.date().iso().required(),
    address: joi.string(),
    phone: joi
      .string()
      .pattern(/^\d{10,}$/)
      .message({
        "string.pattern.base": "Phone must be number",
      }),

    idRole: joi
      .string()
      .pattern(
        new RegExp(
          "^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$"
        )
      )
      .messages({
        "string.pattern.base": "id must be a valid UUID format",
      })
      .required(),
  })
  .messages({
    "date.format": "Date must have a valid format (YYYY-MM-DD)",
  });
const employeeCreateValidate = employeeUpdateValidate.append({
  password: joi
    .string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .message({
      "string.base": "Password must be a string.",
      "string.empty": "Password must not be empty.",
      "string.min": "Password must be at least {#limit} characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    })
    .required(),
});
module.exports = {
  productValidate,
  categoryAndRoleValidate,
  updatePriceValidate,
  idValidate,
  employeeUpdateValidate,
  employeeCreateValidate,
};
