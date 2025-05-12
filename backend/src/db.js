const { Pool } = require("pg");
const logger = require("./logger"); // Stelle sicher, dass du ein logger.js hast

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

pool.on("connect", () => {
  logger.info("Datenbankverbindung hergestellt!");
});

pool.on("error", (err) => {
  logger.error("Fehler bei der Datenbankverbindung:", err);
});

module.exports = pool;
