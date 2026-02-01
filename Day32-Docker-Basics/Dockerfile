# === Dockerizing the MERN Stack ===
# In a "Full-Fledged" setup, we stop worrying about "it works on my machine".
# We use Docker to bundle our code, Node.js version, and environment variables into an Image.
# 
# === Containerization vs. Virtualization ===
# A Virtual Machine (VM) is heavy because it includes an entire Operating System.
# Docker containers are lightweight because they share the host's OS kernel but stay completely isolated.
# 
# 1. Dockerfile: The blueprint (revipe) for your environment.
# 2. Docker Image: The unchangeable "snapshot" of your app.
# 3. Docker Container: The actual running instance of that image.


# MICROLAB
# Create a Dockerfile for your Next.js/Node.js backend. The goal is a Multi-stage Build.
# This is an advanced technique that keeps your production image tiny by throwing away the devDependencies and source code after building.

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]