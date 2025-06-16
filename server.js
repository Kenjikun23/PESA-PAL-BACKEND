const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.json());

const consumer_key = "9ivZDpEO0WtVWN+EJsf9oNb0EViSmqih";
const consumer_secret = "FkJTVgOULrAcYOdulkTp/bab9pw=";

// Route to get OAuth token
app.get("/get-token", async (req, res) => {
  try {
    const response = await axios.get("https://pay.pesapal.com/v3/api/Auth/RequestToken", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64")}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error getting token:", error.message);
    res.status(500).send("Failed to get token");
  }
});

// Route to handle order submission (optional, if you want backend control)
app.post("/submit-order", (req, res) => {
  console.log("Order received:", req.body);
  res.send("Order received");
});

// Serve the payment page
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "payment.html"));
});

// Serve the callback page
app.get("/callback", (req, res) => {
  res.sendFile(path.join(__dirname, "callback.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
