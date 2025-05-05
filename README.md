# Mein React Notizblock mit Backend-Sync (Containerisiert)

Diese Anwendung ist ein einfacher Notizblock, der mit React im Frontend und einem Node.js/Express Backend entwickelt wurde. Das Frontend ist mit Docker containerisiert, während das Backend für diese Anleitung separat (z.B. lokal oder in einem anderen Container) gestartet wird.

## Voraussetzungen

* Docker muss auf deinem System installiert sein.
* Node.js und npm müssen auf deinem System installiert sein (für die lokale Ausführung des Backends oder die Installation von Abhängigkeiten).

1.  **Backend separat starten:**
    Stelle sicher, dass dein Backend läuft und unter der konfigurierten `VITE_API_URL` erreichbar ist (standardmäßig `http://localhost:8081` für eine containerisierte Backend-Konfiguration oder `http://localhost:3000` für lokale Ausführung).

2.  **Frontend-Image bauen:**
    Navigiere im Terminal zum `frontend`-Verzeichnis und führe den folgenden Befehl aus, um das Docker-Image für das Frontend zu erstellen. Passe die `VITE_API_URL` entsprechend der Adresse deines laufenden Backends an.
    ```bash
    cd frontend
    docker build --build-arg VITE_API_URL=http://localhost:8081 -t my-frontend-app .
    ```
    *(Ersetze `http://localhost:8081` durch die tatsächliche Adresse deines Backends, falls abweichend).*

3.  **Frontend-Container starten:**
    Führe den folgenden Befehl aus, um einen Container aus dem gerade erstellten Frontend-Image zu starten und den Port 80 des Containers auf Port 8080 deines Host-Rechners zu mappen:
    
    docker run -d -p 8080:80 --name my-frontend my-frontend-app
    

    ## Interaktion mit der Anwendung

Öffne deinen Webbrowser und gehe zu `http://localhost:8080`. Du solltest die React-basierte Notizblock-Anwendung sehen. Interagiere mit der Anwendung, indem du neue Notizen (Todos) hinzufügst und versuchst, sie zu löschen. Das Frontend kommuniziert mit dem separat laufenden Backend unter der konfigurierten `VITE_API_URL`.
