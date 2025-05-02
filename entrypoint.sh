#!/bin/sh
set -e

echo "📦 Prisma migration başlatılıyor..."
bunx prisma migrate deploy

echo "🚀 Uygulama başlatılıyor..."
exec bun run server.js
