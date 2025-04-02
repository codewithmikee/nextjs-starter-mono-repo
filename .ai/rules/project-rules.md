# Project Rules

## Package Structure
- All packages should be merged into one package
- Root level should contain all configuration files
- Source code should be organized in the main src directory

## Import Rules
1. From apps folder:
   - Use `@packages/ui` for UI components
   - Use `@packages/types` for types
   - Use `@packages/utils` for utilities
   - Use `@packages/api-calls` for API calls

2. Inside packages folder:
   - Between main src folders: Use `@folder_name` (e.g., `@types/...`)
   - Inside same folder: Use relative paths or `@/folder_to_filename`

## Configuration Files
- All configuration files should be at root level
- No configuration files in individual package folders
- No src folders in individual package folders

## Testing Requirements
- All imports must work correctly
- No TypeScript errors
- No ESLint errors
- All functionality must be verified
