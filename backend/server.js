require("@tensorflow/tfjs-node");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const imageRouter = require("./routes/imageRoute");
const uploadDir = path.join(__dirname, "./uploads");

app.use(express.json());

app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("api running");
});

function deleteExcessFiles(maxFiles) {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    if (files.length >= maxFiles) {
      // Calculate how many files to delete
      const filesToDelete = files.length - maxFiles;

      // Delete the excess files
      for (let i = 0; i < filesToDelete; i++) {
        const filePath = uploadDir + "/" + files[i];
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted:", filePath);
          }
        });
      }
    } else {
      console.log("less than max files");
    }
  });
}

const maxFilesToKeep = 1;
setInterval(() => {
  deleteExcessFiles(maxFilesToKeep);
}, 60000);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
