# Theme System

A complete theme system with provider, toggle, and select components. Supports dark, light, and system themes with localStorage persistence.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/theme-provider.json
```

**Dependencies:** `lucide-react`

**Registry Dependencies:** `button`, `dropdown-menu`

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── theme/
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── theme-select.tsx
└── ... (other registry components)
```

This package includes three main components:

- `ThemeProvider` - Context provider for theme management
- `ThemeToggle` - Cycling button component to switch between themes
- `ThemeSelect` - Dropdown menu component for theme selection

## Setup

1. Wrap your app with ThemeProvider

> All layout components in the Refine registry support the theme provider and automatically adapt to theme changes.

```tsx
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="refine-ui-theme">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

2. Add theme components to your layout

> All layout components in the Refine registry support the theme provider and automatically adapt to theme changes.

```tsx
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { ThemeSelect } from "@/components/refine-ui/theme/theme-select";

function Layout() {
  return (
    <div>
      {/* Header with theme toggle */}
      <header>
        <ThemeToggle />
      </header>

      {/* Or use theme select in dropdown menus */}
      <nav>
        <ThemeSelect />
      </nav>
    </div>
  );
}
```

### ThemeProvider

Is a context provider that provides the theme to the app. It is used to wrap the app in the `App.tsx` file.

> All layout components in the Refine registry support the theme provider and automatically adapt to theme changes.

```tsx
<ThemeProvider>{/* Your app content */}</ThemeProvider>
```

| Prop           | Type                            | Default             | Description                       |
| -------------- | ------------------------------- | ------------------- | --------------------------------- |
| `children`     | `ReactNode`                     | -                   | Child components                  |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"`          | Default theme when none is stored |
| `storageKey`   | `string`                        | `"refine-ui-theme"` | localStorage key for persistence  |

### ThemeToggle

Cycling button that switches between light → dark → system themes.

```tsx
<ThemeToggle className="rounded-md" />
```

| Prop        | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `className` | `string` | Additional CSS classes |

### ThemeSelect

Dropdown menu for explicit theme selection.

```tsx
<ThemeSelect />
```

### useTheme

Custom hook to get the current theme and set the theme.

```tsx
import { useTheme } from "@/components/refine-ui/theme/theme-provider";

function CustomComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Switch to dark</button>
    </div>
  );
}
```
