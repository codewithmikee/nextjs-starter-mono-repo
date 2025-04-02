#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration for import patterns
const replacePatterns = [
  // In apps folder, change to @shared/ui-components
  {
    // Match from @shared/ui/* or @shared/ui/components/* to @shared/ui-components
    pattern: /from\s+["']@shared\/ui(?:\/components)?\/(.+?)["']/g,
    replacement: 'from "@shared/ui-components/$1"',
    location: 'apps'
  },
  // Match from @shared/components or @/components to @shared/ui-components in apps folder
  {
    pattern: /from\s+["'](?:@shared\/components|@\/components)\/(.+?)["']/g,
    replacement: 'from "@shared/ui-components/$1"',
    location: 'apps'
  },
  // In shared folder, change to @ui-components
  {
    pattern: /from\s+["']@\/ui\/components\/(.+?)["']/g,
    replacement: 'from "@/ui-components/$1"',
    location: 'shared'
  },
  // Also handle @/components in shared folder
  {
    pattern: /from\s+["']@\/components\/(.+?)["']/g,
    replacement: 'from "@/ui-components/$1"',
    location: 'shared'
  }
];

// Get all TypeScript files
const findTypeScriptFiles = (baseDir) => {
  return glob.sync(`${baseDir}/**/*.{ts,tsx}`, {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/.turbo/**']
  });
};

// Process file
const processFile = (filePath) => {
  try {
    // Check if the path is a directory
    if (fs.statSync(filePath).isDirectory()) {
      console.log(`Skipping directory: ${filePath}`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    let hasChanges = false;

    // Determine if this file is in apps or shared folder
    const isInApps = filePath.includes('/apps/');
    const isInShared = filePath.includes('/shared/');
    const location = isInApps ? 'apps' : (isInShared ? 'shared' : null);

    if (!location) return; // Skip if not in apps or shared

    // Apply the appropriate replacement patterns
    replacePatterns.forEach(({ pattern, replacement, location: patternLocation }) => {
      if (patternLocation === location) {
        const newContent = modified.replace(pattern, replacement);
        if (newContent !== modified) {
          hasChanges = true;
          modified = newContent;
        }
      }
    });

    // Write changes back to file if any changes were made
    if (hasChanges) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log(`Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Main execution
const main = () => {
  const baseDir = process.cwd();
  const files = findTypeScriptFiles(baseDir);

  console.log(`Found ${files.length} TypeScript files to process`);

  files.forEach(processFile);

  console.log('Import path update completed');
};

main();
