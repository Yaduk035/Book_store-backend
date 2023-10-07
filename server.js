const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const fs = require("fs");
const bodyParser = require("body-parser");

connectDB();

app.use(logger);

app.use(bodyParser.json({ limit: "1mb" }));
app.use(
  express.urlencoded({ limit: "1mb", extended: true, parameterLimit: 50000 })
);
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

//User Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/check", require("./routes/api/userCheck"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/books", require("./routes/api/books"));
app.use("/edituser", require("./routes/editUser"));

//Users by id
app.use("/users", require("./routes/api/users"));

//////////////////////////////////////

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Error: "404 Not found!!" });
  } else {
    res.type("text").send("Error, Page not found!");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
