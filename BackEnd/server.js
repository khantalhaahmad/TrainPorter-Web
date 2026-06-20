require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();


// Database
connectDB();


// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


// Routes

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/bookings",
  require("./routes/bookingRoutes")
);

app.use(
  "/api/activities",
  require("./routes/activityRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);


// Test Route

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TrainPorter Backend Running",
  });
});


// 404 Handler

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});