const asyncHandler = require("express-async-handler");
const path = require("path");

/*
req - POST
desc - for uploading image
*/
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(404);
    throw new Error("Image not found");
  }

  // sending imageURL to front-end
  const imageUrl = `http://localhost:5000/api/image/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});

/*
req - GET
desc - fetching params from above imageURL and sending file from inside the uploads folder
*/
const sendImage = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  if (!filename) {
    res.status(404);
    throw new Error("Image not found");
  }

  // creating imagePath
  const imagePath = path.join(__dirname, "../uploads", filename);
  res.sendFile(imagePath);
});

module.exports = { uploadImage, sendImage };
