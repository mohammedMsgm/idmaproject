#!/bin/bash
# Render build script

echo "🚀 Starting Render build process..."

# Install all dependencies (including dev dependencies for build)
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Build completed successfully!"

# List build output for verification
echo "📁 Build output:"
ls -la dist/

echo "🎉 Ready for deployment!"
