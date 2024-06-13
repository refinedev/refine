import React from "react";

import { AuthPage } from "@refinedev/antd";

import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";

import { Title } from "@/components";

export const RegisterPage: React.FC = () => {
  return (
    <AuthPage
      type="register"
      title={<Title collapsed={false} />}
      providers={[
        {
          name: "google",
          label: "Sign in with Google",
          icon: (
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            <GoogleOutlined
              style={{
                fontSize: 24,
                lineHeight: 0,
              }}
            />
          ),
        },
        {
          name: "github",
          label: "Sign in with GitHub",
          icon: (
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            <GithubOutlined
              style={{
                fontSize: 24,
                lineHeight: 0,
              }}
            />
          ),
        },
      ]}
    />
  );
};
