const mongoose = require("mongoose");
const db = () => {
  mongoose
    .connect(process.env.db)
    .then(() => {
      console.log("DataBase is Connected Successfully");
    })
    .catch(() => {
      console.log("DataBase Error");
    });
};

module.exports = db;
