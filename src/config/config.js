const { Sequelize } = require("sequelize");
const bcruyt = require("bcrypt");

const currentTime = Sequelize.literal("CURRENT_TIMESTAMP");

const generateIdEmployee = (prefix, max) => {
  if (!max) {
    return prefix + "001";
  }
  const intValue = parseInt(max);

  const nextValue = intValue + 1;
  const suffix = String(nextValue).padStart(max.length, "0");

  return prefix + suffix;
};

const hashPassword = (pass) => {
  const salt = bcruyt.genSaltSync();

  return bcruyt.hashSync(pass, salt);
};

module.exports = { currentTime, generateIdEmployee, hashPassword };
