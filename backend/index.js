//Muntasir14
//mongodb+srv://mdmuntasirazad:Muntasir14@cluster0.nlrhm38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend requests
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
