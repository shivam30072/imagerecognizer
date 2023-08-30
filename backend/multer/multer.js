const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const uniqueSuffix = Date.now();
    const fileExtension = path.extname(originalName);
    cb(null, `${uniqueSuffix}${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
