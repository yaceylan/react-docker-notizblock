# Stage 1: BUILD
FROM node:lts-alpine AS builder
ARG VITE_API_URL
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN --mount=type=cache,target=/root/.npm npm run build -- --base=/
# Stage 2: SERVE
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/ || exit 1


CMD ["nginx", "-g", "daemon off;"]