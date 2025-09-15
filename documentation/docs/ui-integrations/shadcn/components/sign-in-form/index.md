---
title: SignInForm
source: https://github.com/refinedev/refine/blob/feat/init-shadcn/packages/refine-ui/registry/new-york/refine-ui/form/sign-in-form.tsx
---

# Sign In Form Component

The `SignInForm` component provides a ready-to-use sign-in interface for Refine applications. It handles user authentication through email/password and can be extended for social logins.

## Installation

Install the `sign-in-form` component via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/sign-in-form.json
```

This command will install the `SignInForm` component along with its dependencies:

- **Dependencies** (npm packages):
  - `@refinedev/core`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `button`
  - `input`
  - `label`
  - `card`
  - `checkbox`
  - `separator`

It will also install the shared `input-password.tsx` component if not already present.

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── form/
│   ├── sign-in-form.tsx     # Main SignInForm component
│   └── input-password.tsx   # Shared password input component
└── ... (other registry components)
```

## Usage

The `SignInForm` is typically used on a dedicated login page. It relies on Refine's `useLogin` hook and `authProvider` for its functionality.

```tsx
import { SignInForm } from "@/components/refine-ui/form/sign-in-form";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "justify-center",
        "h-screen",
        "w-screen",
      )}
    >
      <SignInForm />
    </div>
  );
}
```
