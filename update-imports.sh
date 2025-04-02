#!/bin/bash

# Script to update imports for UI components across the Next.js monorepo

# Make sure the script is executable
chmod +x update-imports.js

# Check if glob is installed (required by the script)
if ! pnpm list glob &>/dev/null; then
  echo "Installing glob dependency..."
  pnpm add -D glob
fi

# Run the update script
node update-imports.js

echo "Import paths have been updated to follow the convention:"
echo "- In apps: use '@shared/ui-components' for UI components"
echo "- In shared: use '@ui-components' for UI components"
