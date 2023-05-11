const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/config/db.js");
const errorHandler = require("./src/middleware/error");
const employeeRouter = require("./src/routes/employee");
const swagger = require("./swagger");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", swagger);

// Testing root endpoint
app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Routes
app.use("/api/v1/employee", employeeRouter);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
db.connect()
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      app.emit("ready"); // emit the ready event
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
