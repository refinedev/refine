# Forgot Password Form Component

The `ForgotPasswordForm` component provides an interface for users to request a password reset link. It typically collects the user's email address.

## Installation

Install the `forgot-password-form` component via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/forgot-password-form.json
```

This command will install the `ForgotPasswordForm` component along with its dependencies:

- **Dependencies** (npm packages):
  - `@refinedev/core`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `button`
  - `input`
  - `label`
  - `card`

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── form/
│   ├── forgot-password-form.tsx # Main ForgotPasswordForm component
└── ... (other registry components)
```

## Usage

The `ForgotPasswordForm` is typically used on a dedicated "Forgot Password" or password reset request page. It relies on Refine's `useForgotPassword` hook and `authProvider` for its functionality.

```tsx
import { ForgotPasswordForm } from "@/components/refine-ui/form/forgot-password-form";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
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
      <ForgotPasswordForm />
    </div>
  );
}
```
