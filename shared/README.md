# Shared Folder Structure Guidelines

This document provides instructions on how to add, configure, and maintain new folders under the `shared` package, with a particular focus on the `shared/src` folder.

## Adding a New Folder

When you need to add a new folder under `shared` (especially under `shared/src`), follow these steps:

1. **Decide on a Clear Name:**
   - Choose a descriptive name that reflects the folder's purpose (e.g., `ui-components`, `types`, `utils`, `hooks`).

2. **Create the Folder:**
   - Inside `shared/src`, create your new folder. For example, if adding a folder for new UI components, create `shared/src/new-ui`.

3. **Initialize an Entry Point:**
   - Create an `index.ts` file inside the new folder. Use this file to re-export the modules or components contained in that folder. This provides a single entry point for easy imports.

4. **Update Root Exports:**
   - In `shared/src/index.ts`, add an export for the new folder. For example:
     ```typescript
     export * from './new-ui';
     ```
   - This allows other parts of the monorepo to import modules from the shared package uniformly.

5. **Configure Package Exports (if required):**
   - If the new folder should be publicly accessible via the package (e.g., `@shared/new-ui`), update the `exports` field in `shared/package.json`. For example:
     ```json
     {
       "exports": {
         "./new-ui": {
           "types": "./dist/new-ui/index.d.ts",
           "import": "./dist/new-ui/index.mjs",
           "require": "./dist/new-ui/index.js"
         }
       }
     }
     ```

6. **Update Aliases:**
   - To use custom aliases for the new folder, update your `tsconfig.json` (or similar configuration) to include a new path mapping:
     ```json
     {
       "compilerOptions": {
         "paths": {
           "@shared/new-ui": ["shared/src/new-ui"]
         }
       }
     }
     ```

7. **Testing and Documentation:**
   - Write tests for any functionality added in the new folder.
   - Update this document or provide additional documentation if the folder contains significant functionality.

## Handling Missing Folders

If a folder expected under `shared/src` is missing:

- **Verify Requirements:** Check if the folder was intentionally removed or if it's required by your configuration.
- **Create if Needed:** If the folder is necessary, create it following the steps above.
- **Update References:** Adjust any code or configuration that references the missing folder to point to the newly created one.

## Conclusion

Following these guidelines ensures that your shared package remains well-organized and that module resolution via exports, aliases, and re-exports works as expected throughout the monorepo.
