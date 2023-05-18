const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const { MongoDB } = require("winston-mongodb");
const CATEGORY = "EmpMngSys";

let loggerTransports = [
  new transports.Console(),
  new DailyRotateFile({
    level: "error",
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  }),
  new DailyRotateFile({
    level: "debug",
    filename: "logs/debug-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  }),
];

// Check if running in production
if (process.env.NODE_ENV === "production") {
  loggerTransports = [
    new MongoDB({
      level: "debug",
      db: process.env.MONGODB_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: "logs",
    }),
  ];
}

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: loggerTransports,
});

module.exports = logger;
