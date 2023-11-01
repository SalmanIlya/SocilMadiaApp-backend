const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./Db/Db");
const dotenv = require("dotenv");
const admin = require("./Routes/admin");
const helmet = require("helmet");
const morgan = require("morgan");
const auth = require("./Routes/Auth");
dotenv.config({ path: "Config/.env" });
const app = express();

app.use(bodyparser.json());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
db();
app.use("/api", admin);
app.use("/auth", auth);

module.exports = app;
