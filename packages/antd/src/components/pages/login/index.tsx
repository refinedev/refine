import React from "react";
import { LoginPageProps, useActiveAuthProvider } from "@refinedev/core";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import { useLogin, useTranslate } from "@refinedev/core";

import {
  layoutStyles,
  containerStyles,
  titleStyles,
  imageContainer,
} from "./styles";

export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

/**
 * @deprecated LoginPage is deprecated. Use AuthPage instead. @see {@link https://refine.dev/docs/api-reference/antd/components/antd-auth-page} for more details.
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/components/refine-config/#loginpage} for more details.
 */
export const LoginPage: React.FC<LoginPageProps> = () => {
  const [form] = Form.useForm<ILoginForm>();
  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<ILoginForm>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const CardTitle = (
    <Typography.Title level={3} style={titleStyles}>
      {translate("pages.login.title", "Sign in your account")}
    </Typography.Title>
  );

  return (
    <Layout style={layoutStyles}>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div style={containerStyles}>
            <div style={imageContainer}>
              <img
                src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
                alt="Refine Logo"
              />
            </div>
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form<ILoginForm>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  login(values);
                }}
                requiredMark={false}
                initialValues={{
                  remember: false,
                }}
              >
                <Form.Item
                  name="username"
                  label={translate("pages.login.username", "Username")}
                  rules={[{ required: true }]}
                >
                  <Input
                    size="large"
                    placeholder={translate("pages.login.username", "Username")}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={translate("pages.login.password", "Password")}
                  rules={[{ required: true }]}
                  style={{ marginBottom: "12px" }}
                >
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>
                <div style={{ marginBottom: "12px" }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {translate("pages.login.remember", "Remember me")}
                    </Checkbox>
                  </Form.Item>

                  <a
                    style={{
                      float: "right",
                      fontSize: "12px",
                    }}
                    href="#"
                  >
                    {translate(
                      "pages.login.forgotPassword",
                      "Forgot password?",
                    )}
                  </a>
                </div>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isLoading}
                  block
                >
                  {translate("pages.login.signin", "Sign in")}
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}>
                <Typography.Text style={{ fontSize: 12 }}>
                  {translate("pages.login.noAccount", "Don’t have an account?")}{" "}
                  <a href="#" style={{ fontWeight: "bold" }}>
                    {translate("pages.login.signup", "Sign up")}
                  </a>
                </Typography.Text>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};
