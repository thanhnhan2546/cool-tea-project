const express = require("express");
const v1 = require("./routers/v1");
const app = express();
const { PORT } = require("./config/env");
const { handleErrors, notFound } = require("./helpers/error");
const { sequelize } = require("./models");

app.use(express.json());

// sequelize.sync({ alter: true });
app.use("/api/v1", v1);
app.use(handleErrors);
app.use(notFound);

app.listen(PORT);
