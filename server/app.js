require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const app = express();
const connectDB = require("./db/connect");

const PORT = 5000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use("/api/v1/tasks", router);

app.listen(PORT, async () => {
  try {
    await connectDB(process.env.DB_URI);
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log("🚀 ~ app.listen ~ error:", error);
  }
});
