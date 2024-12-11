"use client";

import { AuthPage as AuthPageBase } from "@refinedev/core";
import type { AuthPageProps } from "@refinedev/core";

export const AuthPage = (props: AuthPageProps) => {
  return (
    <div>
      <AuthPageBase {...props} />
      <div>
        <p>Email: admin@refine.dev</p>
        <p>Password: 123456</p>
      </div>
    </div>
  );
};
