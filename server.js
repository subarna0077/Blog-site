require('dotenv').config();
const express = require("express");
const connectDB = require("./db/connectdb");
const BlogRoutes = require("./routes/Blog");
const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(express.json())
app.use("/api/blogs", BlogRoutes);

app.listen(PORT, () => {
  console.log("App started");
});
