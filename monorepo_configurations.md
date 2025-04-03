# Monorepo Configuration Structure

## Directory Structure

```
Root Directory
├── Folders
│   ├── apps/*           # Next.js applications
│   ├── packages/*       # Shared packages
│   │   ├── typescript-config/
│   │   └── eslint-config/
│   └── shared/          # Shared components and utilities
│       ├── src/
│       ├── config/
│       ├── tsconfig/
│       └── Shared Config Files
│           ├── package.json
│           ├── tsconfig.json
│           ├── tailwind.config.ts
│           ├── postcss.config.mjs
│           ├── tsup.config.ts
│           └── components.json
└── Configuration Files
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.base.json
    ├── turbo.json
    ├── pnpm-workspace.yaml
    ├── .eslintrc.js
    ├── prettier.config.mjs
    ├── .npmrc
    └── .editorconfig
```

## Root Configuration Files

### 1. Package Management (`package.json`)
```json
{
  "name": "turborepo-shadcn-ui",
  "version": "1.5.1",
  "private": true,
  "license": "MIT",
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "ui": "pnpm --filter @shared ui",
    "check": "turbo check"
  },
  "devDependencies": {
    "@shared/eslint-config": "workspace:*",
    "@shared/typescript-config": "workspace:*",
    "typescript": "~5.4.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "glob": "^11.0.1",
    "prettier": "^3.1.1",
    "turbo": "latest"
  },
  "packageManager": "pnpm@9.12.0",
  "engines": {
    "node": ">=18"
  },
  "volta": {
    "node": "20.17.0",
    "pnpm": "10.5.2"
  },
  "pnpm": {
    "overrides": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "typescript": "~5.4.5"
    }
  }
}
```

### 2. TypeScript Configuration (`tsconfig.json` and `tsconfig.base.json`)
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["./shared/src/*"],
      "@packages/*": ["./packages/*"],
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules"]
}
```

### 3. Workspace Configuration (`pnpm-workspace.yaml`)
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'shared'

catalog:
  lucide-react: ^0.451.0
  tailwindcss: ^3.4.13
  eslint: ^8.57.0
  prettier: ^3.3.3
  typescript: ^5.6.3
  "@types/node": ^20
  "@types/eslint": ^8

catalogs:
  react18:
    react: ^18.3.1
    react-dom: ^18.3.1
    "@types/react": ^18.3.11
    "@types/react-dom": ^18.3.0
```

### 4. Turborepo Configuration (`turbo.json`)
```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "check": {
      "dependsOn": ["^check"],
      "inputs": ["$TURBO_DEFAULT$", "tsconfig.json", "src/**"],
      "outputs": []
    }
  }
}
```

### 5. ESLint Configuration (`.eslintrc.js`)
```javascript
module.exports = {
  root: true,
  extends: ["@shared/eslint-config"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
```

### 6. Prettier Configuration (`prettier.config.mjs`)
```javascript
export default {
  plugins: ["prettier-plugin-tailwindcss"],
};
```

## Key Features

1. **Monorepo Structure**
   - Uses pnpm workspaces for package management
   - Turborepo for build pipeline optimization
   - Shared configurations across packages
   - Catalog-based dependency management

2. **TypeScript Setup**
   - Strict type checking
   - Path aliases for clean imports
   - Shared TypeScript configurations
   - Declaration files generation
   - Base TypeScript configuration for inheritance

3. **Styling**
   - Tailwind CSS integration
   - CSS variables for theming
   - Component-based styling system
   - PostCSS configuration

4. **Development Tools**
   - ESLint for code linting
   - Prettier for code formatting
   - Turborepo for build caching
   - Type checking with `check` task
   - Editor configuration via `.editorconfig`

5. **Package Management**
   - pnpm as the package manager
   - Workspace dependencies
   - Version management through package.json
   - Catalog-based version control
   - Dependency overrides for consistent versions

6. **Build System**
   - tsup for package building
   - TypeScript declaration files
   - Source maps for debugging
   - Environment variable support
   - Output caching for faster builds

7. **Version Management**
   - Node.js version pinned via Volta (20.17.0)
   - pnpm version management (10.5.2)
   - Catalog-based dependency versions
   - React 18 support with consistent versions
   - TypeScript 5.4.5 with overrides

This configuration structure provides a robust foundation for a modern monorepo setup with shared components and configurations, optimized for Next.js applications with shadcn/ui components.
