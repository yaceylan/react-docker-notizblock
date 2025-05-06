# Mein React Notizblock mit Backend-Sync (Containerisiert)

Diese Anwendung ist ein einfacher Notizblock, der mit React im Frontend und einem Node.js/Express Backend entwickelt wurde. Das Frontend ist mit Docker containerisiert, während das Backend für diese Anleitung separat (z.B. lokal oder in einem anderen Container) gestartet wird.

## Voraussetzungen

* Docker muss auf deinem System installiert sein.
* Node.js und npm müssen auf deinem System installiert sein (für die lokale Ausführung des Backends oder die Installation von Abhängigkeiten).

## Struktur

* `frontend/`: Enthält den Quellcode für die React-Anwendung und das Dockerfile für das Frontend-Image.
* `backend/`: Enthält den Quellcode für das Node.js/Express Backend und das Dockerfile für das Backend-Image.

## Containerisierte Anwendung mit Persistenz starten

1.  **Backend-Image bauen:**
    Navigiere im Terminal zum `backend`-Verzeichnis und führe den folgenden Befehl aus, um das Docker-Image für das Backend mit File-Persistenz zu erstellen:
    ```bash
    cd backend
    docker build -t my-backend-api:persistence .
    ```

2.  **Docker Volume für Backend erstellen:**
    Erstelle ein benanntes Docker Volume für die persistenten Daten des Backends:
    ```bash
    docker volume create my-backend-data
    ```

3.  **Backend-Container mit Volume starten:**
    Starte den Backend-Container und mounte das zuvor erstellte Volume. Der Port 3000 des Containers wird auf Port 8081 des Host-Rechners gemappt:
    ```bash
    docker run -d -p 8081:3000 --name my-backend-persistent -v my-backend-data:/app/data my-backend-api:persistence
    ```

4.  **Frontend-Image bauen:**
    Navigiere im Terminal zum `frontend`-Verzeichnis und führe den folgenden Befehl aus, um das Docker-Image für das Frontend zu erstellen. Die `VITE_API_URL` ist auf die Adresse des laufenden Backend-Containers gesetzt:
    ```bash
    cd frontend
    docker build --build-arg VITE_API_URL=http://localhost:8081 -t my-frontend-app .
    ```

5.  **Frontend-Container starten:**
    Führe den folgenden Befehl aus, um einen Container aus dem Frontend-Image zu starten und den Port 80 des Containers auf Port 8080 deines Host-Rechners zu mappen:
    ```bash
    docker run -d -p 8080:80 --name my-frontend my-frontend-app
    ```

## Interaktion mit der Anwendung

Öffne deinen Webbrowser und gehe zu `http://localhost:8080`. Du solltest die React-basierte Notizblock-Anwendung sehen. Interagiere mit der Anwendung, indem du neue Notizen (Todos) hinzufügst und versuchst, sie zu löschen. Das Frontend kommuniziert mit dem Backend unter `http://localhost:8081`. Die Daten werden persistent im Docker Volume gespeichert.

## Wahl des Volume-Typs: Benanntes Volume

Für die Persistenz der Backend-Daten wurde ein **benanntes Volume** (`my-backend-data`) gewählt.

**Vorteile:**

* **Einfache Verwaltung:** Docker kümmert sich um den Speicherort auf dem Hostsystem.
* **Bessere Abstraktion:** Die Daten sind gut innerhalb des Docker-Ökosystems gekapselt.
* **Portabilität:** Weniger Abhängigkeit von der spezifischen Host-Dateisystemstruktur.

**Nachteile im Vergleich zu Bind Mount:**

* **Direkter Zugriff erschwert:** Der genaue Speicherort auf dem Host ist abstrahiert.

Im Kontext dieser Entwicklungsaufgabe, bei der die einfache Verwaltung und die Persistenz innerhalb der Docker-Umgebung im Vordergrund standen, war das benannte Volume die geeignetere Wahl.
