const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Standard-Log-Level
  format: winston.format.combine(
    winston.format.timestamp(), // Fügt einen Zeitstempel zu jedem Logeintrag hinzu
    winston.format.json() // Formatiert Logeinträge als JSON
  ),
  transports: [
    new winston.transports.Console() // Gibt Logeinträge in der Konsole aus
  ]
});

module.exports = logger;
