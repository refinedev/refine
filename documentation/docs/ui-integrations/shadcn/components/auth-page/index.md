---
title: Auth Page
---

Refine provides pre-built authentication components for shadcn/ui that handle common authentication flows including sign-in, sign-up, and password reset. These components are built with accessibility in mind and follow shadcn/ui design principles.

## Components

### Sign In Form

A complete sign-in form component with email/password authentication.

**Component:** `SignInForm` from `@/components/refine-ui/auth/sign-in-form`

[Learn more about Sign In Form →](/docs/ui-integrations/shadcn/components/sign-in-form)

### Sign Up Form

A registration form component for new user sign-ups.

**Component:** `SignUpForm` from `@/components/refine-ui/auth/sign-up-form`

[Learn more about Sign Up Form →](/docs/ui-integrations/shadcn/components/sign-up-form)

### Forgot Password Form

A password reset form component for users who forgot their credentials.

**Component:** `ForgotPasswordForm` from `@/components/refine-ui/auth/forgot-password`

[Learn more about Forgot Password Form →](/docs/ui-integrations/shadcn/components/forgot-password)

## Installation

Install all auth components at once:

```bash
npx shadcn@latest add https://ui.refine.dev/r/auth-page.json
```

This will install all authentication form components and their dependencies.

## Usage

```tsx
import { SignInForm } from "@/components/refine-ui/auth/sign-in-form";
import { SignUpForm } from "@/components/refine-ui/auth/sign-up-form";
import { ForgotPasswordForm } from "@/components/refine-ui/auth/forgot-password";

// In your auth pages
export function LoginPage() {
  return <SignInForm />;
}

export function RegisterPage() {
  return <SignUpForm />;
}

export function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
```

## Features

- **Built-in validation** using Zod schemas
- **Responsive design** that works on all screen sizes
- **Accessibility support** with proper ARIA labels and keyboard navigation
- **Customizable styling** through shadcn/ui component system
- **Integration with Refine's auth system** using `useLogin`, `useRegister`, and `useForgotPassword` hooks
- **Loading states** and error handling
- **Social login support** (optional)
