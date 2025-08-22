import { AuthPage, ThemedTitle } from "@refinedev/antd";

import { authCredentials } from "@/providers";

export const LoginPage = () => {
  return (
    <AuthPage
      type="login"
      registerLink={false}
      forgotPasswordLink={false}
      title={<ThemedTitle collapsed={false} text="Refine Project" />}
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};
