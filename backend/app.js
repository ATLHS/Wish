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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const authRouter = require("./routes/api/auth");
const giftRouter = require("./routes/api/gift");

app.use("/api/auth", authRouter);
app.use("/api/gift", giftRouter);

app.listen(port, () => console.log(`Wish listening on port ${port}`));
