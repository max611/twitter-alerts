module.exports = app => {
  app.use("/", require("./home"));
  app.use("/", require("./tweets"));
  app.use("/", require("./browser_source"));
  app.use("/", require("./authentication"));
  app.use("/", require("./settings"));
  app.use("/", require("./users"));
};