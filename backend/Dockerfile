FROM node:lts-alpine
WORKDIR /app
# Installiere curl und andere Debug-Tools
RUN cat /app/package.json || ls -al /app
# Kopiere zuerst Paketdateien
COPY package*.json ./
# Installiere alle Abhängigkeiten (Produktion und Entwicklung)
RUN npm install
COPY . .
RUN ls -al /app
RUN ls -al /app # Hinzugefügt: Nochmalige Auflistung nach dem Kopieren aller Dateien
CMD ["node", "index.js"]