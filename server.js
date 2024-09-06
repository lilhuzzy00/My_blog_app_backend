const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

// db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", authRoute);
app.use("/api", postRoute);



const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));