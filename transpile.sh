#!/bin/bash

# Remove scripts directory
rm -rf scripts/

clear

echo "Starting TypeScript compiler..."

# Try bunx first, if it fails use npx
if command -v bun &> /dev/null; then
    echo "Using bunx"
    bunx tsc -watch
else
    echo "Using npx"
    npx tsc -watch
fi
