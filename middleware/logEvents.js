const { format } = require("date-fns");
const { v4 } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${v4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  const excludedPatterns = [/^\/check\/username\//, /^\/check\/email\//];

  const shouldLog = !excludedPatterns.some((pattern) => pattern.test(req.path));

  if (shouldLog) {
    logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqlog.txt");
  }

  console.log(`${req.method} ${req.path}`);

  next();
};

module.exports = { logger, logEvents };
