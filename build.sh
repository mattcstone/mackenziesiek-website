#!/bin/bash

# Build script to ensure all static assets are included in production deployment

echo "Building client..."
vite build

echo "Copying static assets..."
mkdir -p dist/public
cp -r server/public/* dist/public/

echo "Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build complete! Static assets copied to dist/public/"
ls -la dist/public/images/ | head -5