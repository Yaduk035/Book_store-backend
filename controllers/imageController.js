const fs = require("fs");

// Function to delete an image
const deleteImage = (filePath) => {
  try {
    fs.unlinkSync(filePath); // Delete the image file
    console.log("Image deleted successfully.");
  } catch (err) {
    console.error("Error deleting image:", err);
  }
};

module.exports = { deleteImage };
