# Package Consolidation Tasks

## Phase 1: Setup and Structure
- [ ] Create new consolidated package structure
  - [ ] Create root package.json
  - [ ] Set up tsconfig.json
  - [ ] Configure tsup.config.ts
  - [ ] Set up tailwind.config.js
  - [ ] Create src directory structure

## Phase 2: Package Merging
- [ ] Merge package.json files
  - [ ] Combine dependencies
  - [ ] Update package names and versions
  - [ ] Set up proper exports
  - [ ] Configure build scripts

## Phase 3: Configuration
- [ ] Update tsconfig.json
  - [ ] Set up path aliases
  - [ ] Configure module resolution
  - [ ] Set up proper type declarations
- [ ] Update tsup.config.ts
  - [ ] Configure entry points
  - [ ] Set up proper exports
- [ ] Update other config files (eslint, etc.)

## Phase 4: Import Path Updates
- [ ] Update import paths in all files
  - [ ] Update internal package imports
  - [ ] Update external package imports
  - [ ] Test relative imports
  - [ ] Test alias imports

## Phase 5: Testing and Validation
- [ ] Test imports in apps folder
  - [ ] Verify @packages/* imports
  - [ ] Test internal package imports
  - [ ] Validate type declarations
- [ ] Run type checks
- [ ] Run linting
- [ ] Test build process

## Phase 6: Cleanup
- [ ] Remove old package directories
- [ ] Update documentation
- [ ] Update CI/CD if needed

# Package Standardization Tasks

## High Priority
- [ ] Move common dependencies from root package.json to shared package
- [ ] Standardize version numbers across all packages
- [ ] Update package.json files to use workspace:* for internal dependencies
- [ ] Ensure all packages use the same major versions of shared dependencies

## Dependencies to Standardize
- [ ] next-auth (currently ^4.24.6)
- [ ] @faker-js/faker (currently ^9.6.0)
- [ ] axios (currently ^1.8.4)
- [ ] nuqs (currently ^2.4.1)
- [ ] query-string (currently ^9.1.1)

## Package Structure
- [ ] Review and update workspace configuration
- [ ] Ensure proper peer dependencies
- [ ] Set up proper version constraints
