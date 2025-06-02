# Error Component

A modern, elegant 404 error page component for Refine applications with custom SVG graphics, dark mode support, and smooth navigation back to the homepage.

## Installation

```bash
npx shadcn add error-component
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

## Next.js Integration

```tsx
// pages/404.tsx
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";

export default function Custom404() {
  return <ErrorComponent />;
}
```

## React Router

```tsx
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";

function App() {
  return (
    <Routes>
      {/* Other routes */}
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
}
```
