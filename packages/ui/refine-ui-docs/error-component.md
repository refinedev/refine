# Error Component

A modern, elegant 404 error page component for Refine applications with custom SVG graphics, dark mode support, and smooth navigation back to the homepage.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/error-component.json
```

## Dependencies

This component requires the following dependencies:

- `@refinedev/core` - For Refine hooks and utilities
- `lucide-react` - For icons
- `button` (shadcn/ui)
- `tooltip` (shadcn/ui)

## Usage

```tsx
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";

export default function NotFoundPage() {
  return <ErrorComponent />;
}
```
