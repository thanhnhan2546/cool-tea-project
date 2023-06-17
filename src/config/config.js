const { Sequelize } = require("sequelize");

const currentTime = Sequelize.literal(
  "CONVERT_TZ(CURRENT_TIMESTAMP(), '+00:00', '+07:00')"
);

module.exports = { currentTime };
