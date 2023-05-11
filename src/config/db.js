const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let mongoServer;

async function connect() {
  mongoose.set("strictQuery", false);

  const url =
    process.env.NODE_ENV === "test"
      ? await startTestDatabase()
      : process.env.MONGODB_URL;

  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function startTestDatabase() {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const uri = await mongoServer.getUri();
  return uri;
}

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (process.env.NODE_ENV === "test" && mongoServer) {
    await mongoServer.stop();
  }
}

module.exports = { connect, closeDatabase };
