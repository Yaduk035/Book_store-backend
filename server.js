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
const multer = require("multer");
const { deleteImage } = require("./controllers/imageController");
const fs = require("fs");
const axios = require("axios");
const bodyParser = require("body-parser");

connectDB();

app.use(logger);

app.use(bodyParser.json({ limit: "1mb" }));
app.use(
  express.urlencoded({ limit: "1mb", extended: true, parameterLimit: 50000 })
);
app.use(credentials);

// app.use(cors());
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cookieParser());

// built-in middleware to handle urlencoded form data
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

/////////////////////////////////////////////
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/"); // Set the destination folder for uploaded images
//   },
//   filename: (req, file, cb) => {
//     const timestamp = Date.now();
//     cb(null, `${timestamp}-${file.originalname}`); // Set the filename
//   },
// });

// const upload = multer({ storage });

// // Handle image upload
// app.post("/upload/", upload.single("image"), async (req, res) => {
//   // Multer middleware stores the uploaded file in req.file
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded." });
//   }

//   // You can now save the file path or perform other operations here
//   const filePath = req.file.path;
//   const fileName = req.file.filename;
//   ////

//   res.json({ message: "Image uploaded successfully.", fileName });
// });

// app.delete("/deleteimg/:filename", (req, res) => {
//   const { filename } = req.params;
//   const filePath = `public/uploads/${filename}`;

//   deleteImage(filePath); // Call the deleteImage function from the CRUD module

//   res.json({ message: "Image deleted successfully." });
// });

// app.get("/getimg/:filename", (req, res) => {
//   try {
//     const { filename } = req.params;
//     const filePath = path.join(__dirname, "public/uploads", filename);

//     // Check if the file exists
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ error: "Image not found." });
//     }

//     // Read the image file and send it as a response
//     res.sendFile(filePath);
//   } catch (error) {
//     console.error;
//   }
// });

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
