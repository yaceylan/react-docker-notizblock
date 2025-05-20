# # # Stage 1: BUILD
# # FROM node:lts-alpine AS builder
# # ARG VITE_API_URL
# # WORKDIR /app

# # COPY package*.json ./
# # RUN npm ci

# # COPY . .

# # RUN --mount=type=cache,target=/root/.npm npm run build -- --base=/
# # # Stage 2: SERVE
# # FROM nginx:alpine
# # COPY --from=builder /app/dist /usr/share/nginx/html
# # COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# # EXPOSE 80

# # HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/ || exit 1

# # CMD ["nginx", "-g", "daemon off;"]

# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ARG VITE_API_URL=/api
# ENV VITE_API_URL=$VITE_API_URL
# RUN npm run build

# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

# Legt Image für den Frontend-Container an
# Das Image basiert auf dem nginx-Image
# FROM nginx:alpine
# Kopiert die Dateien aus dem dist-Ordner in den Nginx-Ordner
# Der dist-Ordner wird im Build-Prozess erstellt
# COPY ./dist /usr/share/nginx/html
# Der Nginx-Server lauscht auf Port 80
# EXPOSE 80
# --- STAGE 1: BUILD Stage ---
FROM node:lts-alpine AS builder
WORKDIR /app
# Kopiert die package.json und package-lock.json in den Container
COPY package*.json ./
# Installiert die Abhängigkeiten
RUN npm ci