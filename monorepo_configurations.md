# Monorepo Configuration Structure

## Directory Structure

```
Root Directory
├── Folders
│   ├── packages/
│   │   ├── typescript-config/
│   │   └── eslint-config/
│   └── shared/
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
    ├── turbo.json
    ├── pnpm-workspace.yaml
    ├── .eslintrc.js
    └── prettier.config.mjs
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
    "@types/react": "catalog:react18",
    "@types/react-dom": "catalog:react18",
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
  }
}
```

### 2. TypeScript Configuration (`tsconfig.json`)
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
  - "apps/*"
  - "packages/*"
  - "shared"
```

### 4. Turborepo Configuration (`turbo.json`)
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
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

## Shared Package Configuration

### 1. Shared Package.json
```json
{
  "name": "@shared",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "license": "MIT",
  "files": [
    "dist/**"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint \"**/*.ts*\"",
    "clean": "rm -rf .turbo && rm -rf node_modules && rm -rf dist"
  },
  "devDependencies": {
    "@shared/eslint-config": "workspace:*",
    "@shared/typescript-config": "workspace:*",
    "@types/node": "^20.11.24",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "eslint": "^8.57.0",
    "tsup": "^8.0.2",
    "typescript": "^5.3.3"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

### 2. Shared TypeScript Configuration (`shared/tsconfig.json`)
```json
{
  "extends": "@shared/typescript-config/react-library.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

### 3. Tailwind Configuration (`shared/tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

### 4. PostCSS Configuration (`shared/postcss.config.mjs`)
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 5. Build Configuration (`shared/tsup.config.ts`)
```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react"],
});
```

### 6. Component Configuration (`shared/components.json`)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Key Features

1. **Monorepo Structure**
   - Uses pnpm workspaces for package management
   - Turborepo for build pipeline optimization
   - Shared configurations across packages

2. **TypeScript Setup**
   - Strict type checking
   - Path aliases for clean imports
   - Shared TypeScript configurations

3. **Styling**
   - Tailwind CSS integration
   - CSS variables for theming
   - Component-based styling system

4. **Development Tools**
   - ESLint for code linting
   - Prettier for code formatting
   - Turborepo for build caching

5. **Package Management**
   - pnpm as the package manager
   - Workspace dependencies
   - Version management through package.json

6. **Build System**
   - tsup for package building
   - TypeScript declaration files
   - Source maps for debugging

This configuration structure provides a robust foundation for a modern monorepo setup with shared components and configurations.
