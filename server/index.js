import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
// import user from "./router/auth.js";
import post from "./router/post.js";
import auth from "./router/auth.js";
const app = express();
const port = 5000;

const URL =
  "mongodb+srv://minhthai:thanhhoainun1@cluster0.zadf4hh.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cors());
app.use("/post", post);
app.use("/auth", auth);
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((error) => console.log(error.message));
