# === Multi-stage Docker Builds ===
# The goal is simple: Your final production image should only contain the files needed to run the app.
# It shouldn't contain your devDependencies, npm cache, or source code (if using TypeScript/Babel).
#
# === The "Builder" Pattern ===
# 1. Stage 1 (The Builder): Start with a Node.js image. Install all dependencies (including typescript, eslint, etc.), copy the source code, and run the build command.
# 2. Stage 2 (The Runner): Start with a tiny, "Alpine" Linux image. Copy only the compiled /dist folder and the production-only node_modules from the Builder stage.
# 3. The Result: You descard the heavy compilers and caches, leaving behind a lean, and lightning-fast production container.


# MICROLAB
# Write a Dockerfile for your Next.js/Express backend that utilizes multiple  stages and the "Alpine" base image.

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
ENV NODE_ENV=production

# Only copy what is absolutely necessary
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --only=production

EXPOSE 3000
CMD ["node", "dist/server.js"]