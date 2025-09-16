---
title: Introduction
source: https://github.com/refinedev/refine/tree/feat/init-shadcn/packages/refine-ui/registry/new-york/refine-ui
---

Refine provides an integration with [shadcn/ui](https://ui.shadcn.com/) components through a registry system. This integration offers a collection of pre-built components that seamlessly work with Refine's features while maintaining shadcn/ui's design principles and accessibility standards.

Unlike traditional package installations, shadcn/ui components are added to your project's source code, giving you full control over styling and customization.

## Installation

The easiest way to get started is by using Refine's CLI to scaffold a new project with shadcn/ui:

```bash
npm create refine-app@latest my-app -- --preset vite-shadcn
```

### Manual Setup

If you want to add shadcn/ui to an existing Refine project:

1. **Initialize shadcn/ui in your project:**

```bash
npx shadcn@latest init
```

2. **Install Refine core packages:**

```bash
npm install @refinedev/core @refinedev/react-hook-form
```

3. **Add Refine components from the registry:**

```bash
npx shadcn@latest add https://ui.refine.dev/r/auto-save-indicator.json
```

## Usage

Refine's shadcn/ui components are designed to work seamlessly with Refine's data hooks and provide common UI patterns needed in admin panels and data-heavy applications.

```tsx
import { useForm } from "@refinedev/react-hook-form";
import { AutoSaveIndicator } from "@/components/refine-ui/form/auto-save-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EditProduct() {
  const {
    register,
    refineCore: { autoSaveProps },
  } = useForm({
    refineCoreProps: {
      autoSave: { enabled: true, debounce: 1000 },
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2>Edit Product</h2>
        <AutoSaveIndicator {...autoSaveProps} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="name">Product Name</label>
          <Input id="name" {...register("name")} />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <Input id="price" type="number" {...register("price")} />
        </div>
        <Button type="submit">Save Product</Button>
      </CardContent>
    </Card>
  );
}
```

## Component Registry

Refine provides a growing collection of components through the shadcn/ui registry system. Each component can be installed individually:

### Form Components

- `AutoSaveIndicator` - Visual feedback for auto-save operations

### View Components

- `EditView` - Layout wrapper for edit pages
- `CreateView` - Layout wrapper for create pages
- `ListView` - Layout wrapper for list pages
- `ShowView` - Layout wrapper for show pages

### Field Components

- `TextField` - Display text data with proper formatting
- `NumberField` - Display numeric data with formatting options
- `DateField` - Display dates with localization
- `BooleanField` - Display boolean values with appropriate indicators

### Button Components

- `DeleteButton` - Button with delete confirmation dialog
- `EditButton` - Navigation button to edit pages
- `CreateButton` - Navigation button to create pages
- `SaveButton` - Form submission button with loading states

## Key Features

- **🎨 Full Source Code Access**: [shadcn/ui components](https://ui.shadcn.com/docs) are copied directly into your project, giving you complete control over styling, behavior, and structure without package dependencies.

- **♿ Accessibility First**: Built on [Radix UI primitives](https://www.radix-ui.com/primitives) with [WAI-ARIA](https://www.w3.org/WAI/ARIA/) standards, ensuring robust accessibility support including keyboard navigation and screen reader compatibility.

- **🔧 Deep Refine Integration**: Seamlessly works with [Refine's data hooks](https://refine.dev/docs/data/hooks/use-list/), authentication, routing, and form handling - less boilerplate, more productivity.

- **📱 Responsive Design**: Built with [Tailwind CSS](https://ui.shadcn.com/docs/components) and mobile-first principles, components automatically adapt to any screen size.

- **🌙 Advanced Theming**: Full light/dark theme support using [CSS custom properties](https://ui.shadcn.com/docs/theming) with flexible customization options.

- **🌍 Internationalization**: Built-in support for Refine's [i18n system](https://refine.dev/docs/i18n/i18n-provider/) with RTL languages, localization, and proper formatting.

## Styling and Theming

Since components are added to your source code, you have complete control over styling. The components use [shadcn/ui's theming system](https://ui.shadcn.com/docs/theming) based on CSS variables, making it easy to customize colors, spacing, and appearance.

### CSS Variables

The theme system uses HSL color values defined as CSS custom properties. These variables are automatically generated during the `shadcn init` process and can be found in your `globals.css` file:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --muted: 210 40% 96%;
  --accent: 210 40% 96%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --muted: 217.2 32.6% 17.5%;
  --accent: 217.2 32.6% 17.5%;
  --destructive: 0 62.8% 30.6%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### Theme Customization

You can customize your theme in several ways:

1. **Manual Editing**: Modify the CSS variables in your `globals.css` file directly
2. **Theme Generator**: Use the [shadcn/ui theme editor](https://ui.shadcn.com/themes) to generate custom themes
3. **Interactive Editor**: Try the [TweakCN Theme Editor](https://tweakcn.com/editor/theme) for a visual approach to theme creation

### Adding Custom Themes

To add additional themes beyond light and dark:

```css
[data-theme="blue"] {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... other variables */
}

[data-theme="green"] {
  --primary: 142.1 76.2% 36.3%;
  --primary-foreground: 355.7 100% 97.3%;
  /* ... other variables */
}
```

For more detailed theming options, refer to the [shadcn/ui theming documentation](https://ui.shadcn.com/docs/theming).
