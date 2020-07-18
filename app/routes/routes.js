module.exports = app => {
  const settings = require("../controllers/setting.controller.js");
  const users = require("../controllers/users.controller.js");

  app.use("/", require("./home"));
  app.use("/", require("./tweets"));
  app.use("/", require("./browser_source"));
  app.use("/", require("./authentication"));
  app.use("/", require("./settings"));

  app.post("/settings", settings.createOrUpdate);

	app.post('/users', users.create)
	app.get('/users', users.findAll)
};