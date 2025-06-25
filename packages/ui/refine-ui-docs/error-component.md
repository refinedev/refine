# Error Component

A modern, elegant 404 error page component for Refine applications with custom SVG graphics, dark mode support, and smooth navigation back to the homepage.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/error-component.json
```

This command will install the `ErrorComponent` component along with its dependencies:

- **Dependencies** (npm packages):
  - `@refinedev/core`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `button`
  - `tooltip`

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── layout/
│   ├── error-component.tsx
└── ... (other registry components)
```

## Usage

The `ErrorComponent` is typically used on a dedicated error page. It is used to display a 404 error page.

```tsx
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";

export default function NotFoundPage() {
  return <ErrorComponent />;
}
```
