# Sign In Form Component

## Purpose & Overview

The `SignInForm` component provides a ready-to-use sign-in interface for Refine applications. It handles user authentication through email/password and can be extended for social logins.

**When to use:**

- For the login page of your Refine application.
- When you need a quick and consistent way to implement user sign-in.

## Installation

Install the `sign-in-form` component via shadcn/ui registry:

```bash
npx shadcn@latest add http://localhost:3000/r/sign-in-form.json
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

## File Structure & Paths

The registry will generate the following files:

```
src/components/refine-ui/
├── form/
│   ├── sign-in-form.tsx     # Main SignInForm component
│   └── input-password.tsx   # Shared password input component
└── ... (other registry components)
```

## Usage

The `SignInForm` is typically used on a dedicated login page.

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

## Props & API

The `SignInForm` component currently does not accept any direct props. It relies on Refine's `useLogin` hook and `authProvider` for its functionality.

## Features

- **Email/Password Login**: Standard email and password authentication.
- **"Remember Me"**: Option to persist login session.
- **Forgot Password Link**: Navigates to the forgot password page (ensure you have a `/forgot-password` route).
- **Sign Up Link**: Navigates to the registration page (ensure you have a `/register` route).
- **Social Logins**: Includes placeholder buttons and logic for Google and GitHub sign-in, which can be configured via your `authProvider`.
- **UI**: Styled with shadcn/ui components for a consistent look and feel.

## Customization

- **Social Logins**: Implement the `login` method in your `authProvider` to handle `providerName: "google"` or `providerName: "github"`.
- **Styling**: Modify the Tailwind CSS classes directly in `src/components/refine-ui/form/sign-in-form.tsx` or `src/components/refine-ui/form/input-password.tsx`.
- **Form Fields**: Adjust input fields or add new ones by editing the component's source code.
- **Navigation**: Update the `to` props of the `Link` components for "Forgot password" and "Sign up" if your routes differ.
