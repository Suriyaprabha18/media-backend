require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/media", mediaRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
