module.exports = app => {
  const settings = require("../controllers/setting.controller.js");
  const users = require("../controllers/users.controller.js");

  app.use("/", require("./home"));
  app.use("/", require("./tweets"));
  app.use("/", require("./browser_source"));
  app.use("/", require("./authentication"));

  app.post("/settings", settings.create);
  app.get("/settings", settings.findAll);

	app.post('/users', users.create)
	app.get('/users', users.findAll)
};