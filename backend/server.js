const express = require("express");
const winston = require("winston");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, "data", "items.json");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

app.use(express.json());

fs.mkdir(path.join(__dirname, "data"), { recursive: true }).catch(console.error);

async function loadItems() {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    logger.warn("Could not read data file, initializing with empty array.", error);
    return [];
  }
}

async function saveItems(items) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), "utf8");
    logger.info("Data saved to file.");
  } catch (error) {
    logger.error("Error saving data to file:", error);
  }
}

let items = [];

app.get("/api/items", async (req, res) => {
  items = await loadItems();
  res.json(items);
});

app.post("/api/items", async (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  await saveItems(items);
  res.status(201).json(newItem);
});

logger.info("Starting backend API...");
logger.info("Database Configuration (received via ENV):", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD ? "[REDACTED]" : "N/A"
});
logger.info("-------------------------------------------");

app.listen(port, () => {
  logger.info(`Backend API listening at http://localhost:${port}`);
});