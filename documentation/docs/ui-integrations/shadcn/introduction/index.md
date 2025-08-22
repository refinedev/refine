<!-- ---
title: Introduction
---

Refine provides an integration with [shadcn/ui](https://ui.shadcn.com/) components through a registry system. This integration offers a collection of pre-built components that seamlessly work with Refine's features while maintaining shadcn/ui's design principles and accessibility standards.

Unlike traditional package installations, shadcn/ui components are added to your project's source code, giving you full control over styling and customization.

## Installation

The easiest way to get started is by using Refine's CLI to scaffold a new project with shadcn/ui:

```bash
npm create refine-app@latest my-app -- --preset shadcn
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

### 🎨 **Full Customization**

Components are added to your source code, allowing complete control over styling, behavior, and structure.

### ♿ **Accessibility First**

Built on Radix UI primitives, ensuring robust accessibility support out of the box.

### 🔧 **Refine Integration**

Seamlessly integrates with Refine's data hooks, auth system, and routing.

### 📱 **Responsive Design**

All components are built with mobile-first responsive design principles.

### 🌙 **Dark Mode Support**

Full support for light and dark themes using CSS variables.

### 🌍 **Internationalization**

Built-in support for Refine's translation system.

## Styling and Theming

Since components are added to your source code, you have complete control over styling. The components use CSS variables for theming, making it easy to customize:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... more variables */
}
```

## TypeScript Support

All components are built with TypeScript and provide full type safety when working with your data models:

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export function ProductForm() {
  const {
    register,
    formState: { errors },
  } = useForm<Product>();

  // Full type safety for your data model
  return (
    <form>
      <Input {...register("name")} />
      <Input {...register("price", { valueAsNumber: true })} />
      {/* TypeScript will catch any invalid field names */}
    </form>
  );
}
```

## Migration from Other UI Libraries

If you're migrating from other UI libraries like Ant Design or Material UI, the component patterns remain similar. The main difference is that you'll be installing components individually and they'll be part of your source code rather than node_modules.

## Next Steps

- Explore the [AutoSaveIndicator](/docs/ui-integrations/shadcn/components/auto-save-indicator) component
- Check out the complete [component registry](https://ui.refine.dev)
- Learn about [customizing themes](https://ui.shadcn.com/docs/theming)
- Read the [shadcn/ui documentation](https://ui.shadcn.com/docs) for component details
 -->
