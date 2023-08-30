const express = require("express");
const app = express();
const imageRouter = require("./routes/imageRoute");

app.use(express.json());

app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("api running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
