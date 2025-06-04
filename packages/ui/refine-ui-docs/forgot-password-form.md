# Forgot Password Form Component

## Purpose & Overview

The `ForgotPasswordForm` component provides an interface for users to request a password reset link. It typically collects the user's email address.

**When to use:**

- On a dedicated "Forgot Password" page in your Refine application.
- When users need to be able to reset their password if they've forgotten it.

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

## File Structure & Paths

The registry will generate the following file:

```
src/components/refine-ui/
├── form/
│   ├── forgot-password-form.tsx # Main ForgotPasswordForm component
└── ... (other registry components)
```

## Usage

The `ForgotPasswordForm` is typically used on a dedicated "Forgot Password" or password reset request page.

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

## Props & API

The `ForgotPasswordForm` component currently does not accept any direct props. It relies on Refine's `useForgotPassword` hook and `authProvider` for its functionality.

## Features

- **Email Input**: Collects the user's email address to send reset instructions.
- **Back to Login Link**: Provides a link to navigate back to the login page (ensure you have a `/login` route).
- **UI**: Styled with shadcn/ui components.

## Customization

- **Styling**: Modify Tailwind CSS classes in `src/components/refine-ui/form/forgot-password-form.tsx`.
- **Form Fields**: If you need to collect additional information, you can modify the component's source code, though this is uncommon for forgot password forms.
- **Navigation**: Update the `to` prop of the `Link` component for "Back" if your login route differs.
- **`forgotPassword` Logic**: Ensure your `authProvider` has a `forgotPassword` method implemented to handle the password reset request (e.g., sending an email with a reset link).
