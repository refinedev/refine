# Sign Up Form Component

## Purpose & Overview

The `SignUpForm` component provides a user registration interface for Refine applications. It handles new user sign-up with email/password and includes password confirmation.

**When to use:**

- For the registration page of your Refine application.
- When you need a standardized form for new users to create an account.

## Installation

Install the `sign-up-form` component via shadcn/ui registry:

```bash
npx shadcn@latest add http://localhost:3000/r/sign-up-form.json
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

## File Structure & Paths

The registry will generate the following files:

```
src/components/refine-ui/
├── form/
│   ├── sign-up-form.tsx     # Main SignUpForm component
│   └── input-password.tsx   # Shared password input component (if not already present)
└── ... (other registry components)
```

## Usage

The `SignUpForm` is typically used on a dedicated registration page.

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

## Props & API

The `SignUpForm` component currently does not accept any direct props. It relies on Refine's `useRegister` hook, `useNotification` hook, and `authProvider` for its functionality.

## Features

- **Email/Password Registration**: Allows users to sign up with an email and password.
- **Password Confirmation**: Includes a field for confirming the password to prevent typos.
- **Sign In Link**: Navigates to the login page (ensure you have a `/login` route).
- **Social Logins**: Includes commented-out placeholder buttons and logic for Google and GitHub sign-up, which can be configured via your `authProvider` by uncommenting and implementing them.
- **UI**: Styled with shadcn/ui components.

## Customization

- **Social Logins**: Uncomment and implement the `register` method in your `authProvider` to handle social provider registration (e.g., `providerName: "google"`).
- **Styling**: Modify Tailwind CSS classes in `src/components/refine-ui/form/sign-up-form.tsx` or `src/components/refine-ui/form/input-password.tsx`.
- **Form Fields**: Adjust or add fields by editing the component's source code.
- **Navigation**: Update the `to` prop of the `Link` component for "Sign in" if your login route differs.
