require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

// db config
const url = process.env.ATLAS_URL;
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", (_) => {
  console.log("Database connected:", url);
});
db.on("error", (err) => {
  console.error("connection error:", err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

app.listen(port, () => console.log(`Wish listening on port ${port}`));
