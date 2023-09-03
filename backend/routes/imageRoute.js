const express = require("express");
const { uploadImage, sendImage } = require("../controllers/imageController");
const upload = require("../multer/multer");

const router = express.Router();

router.post("/", upload.single("uploaded-file"), uploadImage);
router.route("/:filename").get(sendImage);

module.exports = router;
