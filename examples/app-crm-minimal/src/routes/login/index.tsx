import { FC } from "react";

import { AuthPage } from "@refinedev/antd";

import { authCredentials } from "@/providers";

export const LoginPage: FC = () => {
  return (
    <AuthPage
      type="login"
      registerLink={false}
      forgotPasswordLink={false}
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};
