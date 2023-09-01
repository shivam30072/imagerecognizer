const asyncHandler = require("express-async-handler");
const mobilenet = require("@tensorflow-models/mobilenet");
const { createCanvas, loadImage } = require("canvas");
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

  const canvas = createCanvas(640, 480);
  const ctx = canvas.getContext("2d");
  const image = await loadImage(imagePath);
  ctx.drawImage(image, 0, 0);

  const model = await mobilenet.load();

  const predictions = await model.classify(canvas);
  const extractedData = [];

  predictions.forEach((prediction) => {
    extractedData.push(prediction.className);
    const score = Math.round(prediction.probability * 1000);
    extractedData.push(score);
  });
  console.log(extractedData);
  console.log(predictions);
  res.sendFile(imagePath);
});

module.exports = { uploadImage, sendImage };
