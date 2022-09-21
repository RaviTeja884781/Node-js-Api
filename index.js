const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");

const authRouter = require("./routes/Auth");
const userRouter = require("./routes/Users");
const postRouter = require("./routes/Posts.js");
const categoryRouter = require("./routes/Categories");

const PORT = process.env.port || 5000;
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_url)
  .then(console.log("connected to mongodb"))
  .catch((error) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("working properly");
    }
  });

const storage = multer.diskStorage({
  destination: (req, file, callbackFun) => {
    callbackFun(null, "images");
  },
  filename: (req, file, callbackFun) => {
    callbackFun(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("servre is running on port 5000");
  }
});
