const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");

const currentTime = Sequelize.literal("CURRENT_TIMESTAMP");

module.exports = { currentTime };
