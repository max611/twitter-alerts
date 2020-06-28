const sql = require("./db.js");

// constructor
const Setting = function(setting) {
  this.user_id = setting.user_id;
  this.fade_in = setting.fade_in;
  this.fade_out = setting.fade_out;
  this.delay = setting.delay;
};

Setting.create = (newSetting, result) => {
  sql.query("INSERT INTO settings SET ?", newSetting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created setting: ", { id: res.insertId, ...newSetting });
    result(null, { id: res.insertId, ...newSetting });
  });
};

Setting.findById = (settingId, result) => {
  sql.query(`SELECT * FROM settings WHERE id = ${settingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found setting: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Setting with the id
    result({ kind: "not_found" }, null);
  });
};

Setting.getAll = result => {
  sql.query("SELECT * FROM settings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("settings: ", res);
    result(null, res);
  });
};

Setting.updateById = (id, setting, result) => {
  sql.query(
    "UPDATE settings SET user_id = ?, delay = ?, fade_in = ?, fade_out = ? WHERE id = ?",
    [setting.user_id, setting.delay, setting.fade_in, setting.fade_out, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Setting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated setting: ", { id: id, ...setting });
      result(null, { id: id, ...setting });
    }
  );
};

Setting.remove = (id, result) => {
  sql.query("DELETE FROM settings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Setting with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted setting with id: ", id);
    result(null, res);
  });
};

Setting.removeAll = result => {
  sql.query("DELETE FROM settings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} settings`);
    result(null, res);
  });
};

module.exports = Setting;