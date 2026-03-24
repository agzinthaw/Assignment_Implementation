require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // or your frontend port
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log("MongoDB Error ❌", err);
});

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Server working ✅");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});