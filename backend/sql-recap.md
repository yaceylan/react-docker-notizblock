# SQL Recap: Datenmodell für Todos

## Tabelle: todos

| Spalte    | Datentyp        | Primärschlüssel |
|-----------|-----------------|-----------------|
| id        | INTEGER         | JA              |
| title     | VARCHAR(255)    | NEIN            |
| erledigt  | BOOLEAN         | NEIN            |

## Grundlegende SQL-Abfragen (CRUD)

### CREATE

INSERT INTO todos (title, erledigt) VALUES (?, ?);
INSERT INTO todos (title, erledigt) VALUES (?, ?);
SELECT * FROM todos;
SELECT * FROM todos WHERE id = ?;
UPDATE todos SET title = ?, erledigt = ? WHERE id = ?;
DELETE FROM todos WHERE id = ?;

## Reflexion:

1. Warum ist die Speicherung von Anwendungsdaten in einer strukturierten Datenbank (mit
Tabellen, Spalten, Datentypen, Schlüsseln) besser als die einfache Speicherung in einer
JSON-Datei auf dem Dateisystem, wie wir sie in der vorherigen Aufgabe umgesetzt haben?
Nenne mindestens drei Vorteile.

I. Struktur und Datenintegrität: Datenbanken erzwingen ein Schema, was zu konsistenteren Daten führt.

II. Effiziente Abfragen: SQL ermöglicht gezielte und performante Datenabfragen.

III. Beziehungen zwischen Daten: Datenbanken erlauben die Definition von Beziehungen, was die Modellierung komplexer Daten erleichtert.

2.  Was ist der Hauptzweck eines Primärschlüssels in einer Tabelle, und wie hast du dieses Konzept in deinem Entwurf umgesetzt?

Der Hauptzweck eines Primärschlüssels in einer Tabelle ist es, jede Zeile (jeden Datensatz) in dieser Tabelle eindeutig zu identifizieren. Dadurch wird sichergestellt, dass es keine doppelten Einträge gibt und dass man jeden Datensatz gezielt ansprechen kann, zum Beispiel beim Lesen, Aktualisieren oder Löschen.
In meinem Entwurf der todos-Tabelle habe ich die Spalte id als Primärschlüssel definiert. Dies habe ich durch die Angabe PRIMARY KEY bei der Definition der Spalte festgelegt. Zusätzlich habe ich AUTOINCREMENT verwendet, um sicherzustellen, dass jede neue Zeile automatisch eine eindeutige, fortlaufende Nummer als id erhält.


3.  Wie würden die API-Endpunkte deiner Backend-Anwendung (`GET /todos`, `GET /todos/:id`, `POST /todos`, `DELETE /todos/:id`) theoretisch auf die von dir formulierten SQL-Abfragen abgebildet werden? Welche Art von Abfrage (SELECT, INSERT, UPDATE, DELETE) würde jeder Endpunkt typischerweise ausführen?

Der Endpunkt GET /todos würde eine SELECT-Abfrage ausführen, um alle Einträge aus der todos-Tabelle abzurufen (SELECT * FROM todos;).
Der Endpunkt GET /todos/:id würde eine SELECT-Abfrage mit einer WHERE-Klausel ausführen, um den Eintrag mit der spezifischen id abzurufen (SELECT * FROM todos WHERE id = ?;).
Der Endpunkt POST /todos würde eine INSERT-Abfrage ausführen, um einen neuen Eintrag in die todos-Tabelle einzufügen (INSERT INTO todos (title, erledigt) VALUES (?, ?);).
Der Endpunkt DELETE /todos/:id würde eine DELETE-Abfrage mit einer WHERE-Klausel ausführen, um den Eintrag mit der spezifischen id aus der todos-Tabelle zu löschen (DELETE FROM todos WHERE id = ?;).


4.  Warum ist die Nutzung einer Datenbank für persistente Daten wichtig im Kontext von containerisierten Anwendungen und DevOps?

Die Nutzung einer Datenbank für persistente Daten ist in containerisierten Anwendungen und DevOps wichtig, da Container oft zustandslos sind, Datenbanken unabhängig skalierbar sind.

## Datenbank-Schema 

Dieses Repository enthält nun auch eine theoretische Ausarbeitung des Datenbank-Schemas, das für diese Anwendung verwendet werden könnte. Die Details zum Tabellendesign und grundlegende SQL-Abfragen finden sich in der Datei backend/sql-recap.md