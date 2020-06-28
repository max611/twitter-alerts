module.exports = app => {
  const settings = require("../controllers/setting.controller.js");

  app.post("/settings", settings.create);

  app.get("/settings", settings.findAll);
};