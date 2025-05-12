const pool = require("../db");
const logger = require("../logger");

// Ruft alle Items aus der Datenbank ab
async function findAll() {
  try {
    const result = await pool.query("SELECT * FROM items");
    logger.info("Alle Items abgerufen");
    return result.rows;
  } catch (error) {
    logger.error("Fehler beim Abrufen aller Items:", error);
    throw error;
  }
}

// Ruft ein Item anhand seiner ID aus der Datenbank ab
async function findById(id) {
  try {
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      logger.warn(`Item mit ID ${id} nicht gefunden`);
      throw new Error("Item nicht gefunden");
    }
    logger.info(`Item mit ID ${id} abgerufen`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Fehler beim Abrufen des Items mit ID ${id}:`, error);
    throw error;
  }
}

// Erstellt ein neues Item in der Datenbank
async function create(item) {
  try {
    const { title, description } = item;
    const result = await pool.query(
      "INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    logger.info("Neues Item erstellt:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    logger.error("Fehler beim Erstellen eines neuen Items:", error);
    throw error;
  }
}

// Aktualisiert ein Item in der Datenbank
async function updateById(id, updatedItem) {
  try {
    const { title, description } = updatedItem;
    const result = await pool.query(
      "UPDATE items SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    if (result.rows.length === 0) {
      logger.warn(`Item mit ID ${id} nicht gefunden`);
      throw new Error("Item nicht gefunden");
    }
    logger.info(`Item mit ID ${id} aktualisiert:`, result.rows[0]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Fehler beim Aktualisieren des Items mit ID ${id}:`, error);
    throw error;
  }
}

// Löscht ein Item aus der Datenbank
async function deleteById(id) {
  try {
    const result = await pool.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      logger.warn(`Item mit ID ${id} nicht gefunden`);
      throw new Error("Item nicht gefunden");
    }
    logger.info(`Item mit ID ${id} gelöscht`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Fehler beim Löschen des Items mit ID ${id}:`, error);
    throw error;
  }
}

module.exports = {
  findAll,
  findById,
  create,
  updateById, // Added the updateById function
  deleteById,
};
