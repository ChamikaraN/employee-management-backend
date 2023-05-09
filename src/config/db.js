const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;
function connect() {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connect };
