FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY --from=builder /app . 
EXPOSE 3000
CMD ["node", "index.js"]

