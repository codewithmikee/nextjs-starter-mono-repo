# Shadcn UI Configuration

This directory contains the shared configuration for Shadcn UI components across the monorepo.

## Usage

To use this configuration when adding new components to your app, copy the `components.json` file to your app's root directory or use the `--config` flag with the shadcn CLI:

```bash
pnpm dlx shadcn@latest add button --config shared/config/components.json
```

This will install the component to the `src/ui/ui-components` directory in your app.

## Configuration Details

The current configuration:

- Uses the default style
- Enables React Server Components
- Uses TypeScript with TSX
- Configures Tailwind with:
  - Base config file: `tailwind.config.js`
  - CSS file: `app/globals.css`
  - Base color: slate
  - CSS variables enabled
- Sets aliases:
  - Components: `@/ui/ui-components`
  - Utils: `@/lib/utils`
