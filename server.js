const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const validator = require("validator");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = (DB) => {
  mongoose
    .connect(DB)
    .then(() => console.log(`Database connection successful`))
    .catch((err) => {
      console.log(err);
    });
};

const app = express();

const DB = process.env.DB;

dbConfig(DB);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a firstName"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a lastname"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "A user must have an email address"],
    validate: [validator.isEmail, "A user must provide a valid email address"],
  },
});

const User = mongoose.model("User", UserSchema);

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

app.get("/", (req, res, next) => {
  res.json({ status: "sucess", message: "Application is Running" });
});
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ status: "sucess", data: users });
  } catch (err) {
    res.status(400).json({ status: "failure", message: err.message });
  }
});
app.post("/users", async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    res.status(200).json({ status: "success", user: newUser });
  } catch (err) {
    res.status(400).json({ status: "failure", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
