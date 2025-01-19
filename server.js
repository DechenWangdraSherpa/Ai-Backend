const express = require("express");
const WebSocket = require("ws"); // WebSocket library for handling WebSocket connections
const cors = require("cors"); // CORS for handling cross-origin requests

const app = express();

// Use environment PORT for hosting, or default to 3001
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware for parsing JSON data
app.use(cors()); // Enable CORS for all routes

// In-memory storage for the latest data received from the dataTransmitter
let latestData = {};

// Endpoint for receiving data from dataTransmitter.py
app.post("/api/receive-data", (req, res) => {
  try {
    const incomingData = req.body;

    // Validate the incoming data structure (optional)
    if (!incomingData || typeof incomingData !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    // Save the incoming data to in-memory storage
    latestData = incomingData;
    console.log("Received data from dataTransmitter:", latestData);

    // Send an acknowledgment back to the dataTransmitter
    res.status(200).json({ message: "Data successfully received" });
  } catch (error) {
    console.error("Error processing incoming data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for frontend to fetch the latest data
app.get("/api/data", (req, res) => {
  if (Object.keys(latestData).length === 0) {
    return res.status(500).json({ error: "No data received yet" });
  }

  // Respond with the latest data
  res.json({
    temperature: latestData.temperature || "Unknown",
    speed: latestData.speed || "Unknown",
    gps: latestData.gps || { latitude: 0, longitude: 0 },
    battery: {
      percentage: latestData.battery_level || "Unknown",
      health: "Good", // Static or based on your requirements
    },
    camera: latestData.video_frame || "No video available",
  });
});

// WebSocket client to connect to a dummy server (optional, based on your architecture)
const dummyServerUrl = "ws://127.0.0.1:8765"; // WebSocket server address
const ws = new WebSocket(dummyServerUrl);

// When the WebSocket client connects
ws.on("open", () => {
  console.log("Connected to the dummy server WebSocket");
});

// Handle messages from the dummy server
ws.on("message", (data) => {
  try {
    const parsedData = JSON.parse(data);
    latestData = parsedData; // Store the latest data
    console.log("Data from dummy server:", parsedData);
  } catch (error) {
    console.error("Error parsing data from dummy server:", error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
