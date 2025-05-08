# SQL Recap: Datenmodell für Todos

## Tabelle: todos

| Spalte    | Datentyp        | Primärschlüssel |
|-----------|-----------------|-----------------|
| id        | INTEGER         | JA              |
| title     | VARCHAR(255)    | NEIN            |
| erledigt  | BOOLEAN         | NEIN            |

## Grundlegende SQL-Abfragen (CRUD)

### CREATE
```sql
INSERT INTO todos (title, erledigt) VALUES (?, ?);

INSERT INTO todos (title, erledigt) VALUES (?, ?);
SELECT * FROM todos;
SELECT * FROM todos WHERE id = ?;
UPDATE todos SET title = ?, erledigt = ? WHERE id = ?;
DELETE FROM todos WHERE id = ?;