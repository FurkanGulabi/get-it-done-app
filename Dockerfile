# Use Bun as the base image
FROM oven/bun:1.1-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./ 

# Install dependencies with Bun
RUN bun install --frozen-lockfile

# Add system dependencies for image processing and media handling
RUN apk add --no-cache \
    fontconfig \
    poppler-utils \
    ffmpeg \
    vips-dev \
    curl # Add curl for healthcheck

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN bunx prisma generate # or RUN npx prisma generate

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_HIDE_HEADERS 1
ENV NEXT_OPTIMIZE_FONTS 1
ENV NEXT_OPTIMIZE_IMAGES 1
ENV NEXT_OPTIMIZE_CSS 1
ENV BUN_RUNTIME 1

# Create non-root user
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder --chown=nextjs:bunjs /app/public ./public
COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:bunjs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:bunjs /app/public/locales ./public/locales 2>/dev/null || :
COPY --from=builder --chown=nextjs:bunjs /app/.env.production ./.env.production 2>/dev/null || :

# Use non-root user
USER nextjs

# Expose port
EXPOSE 3000
ENV PORT 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000/ || exit 1

# Run Prisma migration and start the app
CMD echo "📦 Prisma migration başlatılıyor..." && \
    bunx prisma migrate deploy && \
    echo "🚀 Uygulama başlatılıyor..." && \
    exec bun run server.js
