import { AuthPage } from "@refinedev/antd";

import { authCredentials } from "@/providers";

export const LoginPage = () => {
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
