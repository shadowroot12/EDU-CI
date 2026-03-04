# Base image
FROM node:18-alpine AS builder

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Expose port (Railway/Render will provide PORT env var)
ENV PORT=3000
EXPOSE 3000

# Start command
CMD ["npm", "run", "start:prod"]
