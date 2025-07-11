# Sign Up Form Component

The `SignUpForm` component provides a user registration interface for Refine applications. It handles new user sign-up with email/password and includes password confirmation.

**When to use:**

- For the registration page of your Refine application.
- When you need a standardized form for new users to create an account.

## Installation

Install the `sign-up-form` component via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/sign-up-form.json
```

This command will install the `SignUpForm` component along with its dependencies:

- **Dependencies** (npm packages):
  - `@refinedev/core`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `button`
  - `input`
  - `label`
  - `card`
  - `separator`

It will also install the shared `input-password.tsx` component if not already present.

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── form/
│   ├── sign-up-form.tsx     # Main SignUpForm component
│   └── input-password.tsx   # Shared password input component (if not already present)
└── ... (other registry components)
```

## Usage

The `SignUpForm` is typically used on a dedicated registration page. It relies on Refine's `useRegister` hook, `useNotification` hook, and `authProvider` for its functionality.

```tsx
import { SignUpForm } from "@/components/refine-ui/form/sign-up-form";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
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
      <SignUpForm />
    </div>
  );
}
```
