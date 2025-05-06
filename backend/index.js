const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, "data", "items.json");
const dataDir = path.join(__dirname, "data");

app.use(cors());
app.use(express.json());

let items = [];
let nextId = 1;

const loadData = () => {
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
            console.log("Datenverzeichnis erstellt:", dataDir);
        }
        if (fs.existsSync(dataFilePath)) {
            const rawData = fs.readFileSync(dataFilePath, "utf8");
            items = JSON.parse(rawData);
            nextId = items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
            console.log("Daten aus", dataFilePath, "geladen.");
        } else {
            items = [];
            console.log("Datei", dataFilePath, "nicht gefunden. Initialisiere mit leeren Daten.");
        }
    } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        items = [];
    }
};

const saveData = () => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2), "utf8");
        console.log("Daten in", dataFilePath, "gespeichert.");
    } catch (error) {
        console.error("Fehler beim Speichern der Daten:", error);
    }
};

loadData();

app.get("/api/items", (req, res) => {
    res.json(items);
});

app.post("/api/items", (req, res) => {
    const { text } = req.body;
    if (text) {
        const newItem = { id: nextId++, text };
        items.push(newItem);
        saveData();
        res.status(201).json(newItem);
    } else {
        res.status(400).send("Text ist erforderlich.");
    }
});

app.delete("/api/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);
    if (items.length < initialLength) {
        saveData();
        res.status(204).send();
    } else {
        res.status(404).send("Item nicht gefunden.");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});