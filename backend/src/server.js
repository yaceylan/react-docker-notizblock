const express = require("express");
const winston = require("winston");
const { Pool } = require("pg");
const itemsService = require("./services/itemsService"); 

const app = express();
const port = 3000;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

app.use(express.json());

// Datenbank-Konfiguration aus Umgebungsvariablen
const dbConfig = {
  host: process.env.DB_HOST || "database",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "myuser",
  password: process.env.DB_PASSWORD || "mypassword",
  database: process.env.DB_NAME || "mydb",
};

// Erstelle einen Connection Pool
const pool = new Pool(dbConfig);


async function testDatabaseConnection() {
  logger.info("testDatabaseConnection() wird aufgerufen...");
  try {
    const client = await pool.connect();
    logger.info("Datenbankverbindung erfolgreich hergestellt!");
    client.release();
    return true;
  } catch (err) {
    logger.error("Fehler beim Herstellen der Datenbankverbindung:", err);
    logger.error("Fehlerdetails:", err.message);
    return false;
  } finally {
    logger.info("testDatabaseConnection() abgeschlossen.");
  }
}

async function startServer() {
  const dbConnected = await testDatabaseConnection();

  if (!dbConnected) {
    logger.error("Failed to connect to the database. Exiting...");
    process.exit(1);
    return;
  }

  app.get("/api/items", async (req, res) => {
    try {
      const items = await itemsService.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Fehler beim Abrufen der Items" });
    }
  });

  app.get("/api/items/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Ungültige ID" });
    }
    try {
      const item = await itemsService.findById(id);
      res.json(item);
    } catch (error) {
      if (error.message === "Item nicht gefunden") {
        res.status(404).json({ error: "Item nicht gefunden" });
      } else {
        res.status(500).json({ error: "Fehler beim Abrufen des Items" });
      }
    }
  });

  app.post("/api/items", async (req, res) => {
    try {
      const newItem = await itemsService.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Fehler beim Erstellen des Items" });
    }
  });

  app.put("/api/items/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Ungültige ID" });
    }
    try {
      const updatedItem = await itemsService.updateById(id, req.body);
      res.json(updatedItem);
    } catch (error) {
      if (error.message === "Item nicht gefunden") {
        res.status(404).json({ error: "Item nicht gefunden" });
      } else {
        res.status(500).json({ error: "Fehler beim Aktualisieren des Items" });
      }
    }
  });

  app.delete("/api/items/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Ungültige ID" });
    }
    try {
      await itemsService.deleteById(id);
      res.status(204).send(); // 204 No Content für erfolgreiches Löschen
    } catch (error) {
      if (error.message === "Item nicht gefunden") {
        res.status(404).json({ error: "Item nicht gefunden" });
      } else {
        res.status(500).json({ error: "Fehler beim Löschen des Items" });
      }
    }
  });

  logger.info("Starting backend API...");
  logger.info("Database Configuration (received via ENV):", {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD ? "[REDACTED]" : "N/A",
  });
  logger.info("-------------------------------------------");

  app.listen(port, () => {
    logger.info(`Backend API listening at http://localhost:${port}`);
  });

  module.exports = { pool, logger };
}

startServer();
