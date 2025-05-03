# syntax=docker.io/docker/dockerfile:1

# Base image
FROM node:22-alpine AS base

# Common dependencies for all stages
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS deps

# Only copy what's needed to install dependencies
COPY package.json package-lock.json ./

# Install node_modules
RUN npm install --legacy-peer-deps

# ---- Prisma Stage ----
COPY prisma ./prisma
RUN npx prisma generate && npx prisma db push

# ---- Builder Stage ----
FROM base AS builder
WORKDIR /app

# Copy installed modules and app code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Runner Stage (Production Image) ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy required build files and assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Switch to non-root user
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
