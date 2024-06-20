import React from "react";
import {
  type ForgotPasswordPageProps,
  type ForgotPasswordFormTypes,
  useRouterType,
  useLink,
} from "@refinedev/core";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  type LayoutProps,
  type CardProps,
  type FormProps,
  theme,
} from "antd";
import {
  useTranslate,
  useRouterContext,
  useForgotPassword,
} from "@refinedev/core";

import {
  layoutStyles,
  containerStyles,
  titleStyles,
  headStyles,
  bodyStyles,
} from "../styles";
import { ThemedTitleV2 } from "@components";

type ResetPassworProps = ForgotPasswordPageProps<
  LayoutProps,
  CardProps,
  FormProps
>;

/**
 * **refine** has forgot password page form which is served on `/forgot-password` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#forgot-password} for more details.
 */
export const ForgotPasswordPage: React.FC<ResetPassworProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<ForgotPasswordFormTypes>();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const { mutate: forgotPassword, isLoading } =
    useForgotPassword<ForgotPasswordFormTypes>();

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? <ThemedTitleV2 collapsed={false} />}
      </div>
    );

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {translate("pages.forgotPassword.title", "Forgot your password?")}
    </Typography.Title>
  );
  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      <Form<ForgotPasswordFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) => forgotPassword(values)}
        requiredMark={false}
        {...formProps}
      >
        <Form.Item
          name="email"
          label={translate("pages.forgotPassword.fields.email", "Email")}
          rules={[
            {
              required: true,
              message: translate(
                "pages.forgotPassword.errors.requiredEmail",
                "Email is required",
              ),
            },
            {
              type: "email",
              message: translate(
                "pages.forgotPassword.errors.validEmail",
                "Invalid email address",
              ),
            },
          ]}
        >
          <Input
            type="email"
            size="large"
            placeholder={translate(
              "pages.forgotPassword.fields.email",
              "Email",
            )}
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {loginLink ?? (
            <Typography.Text
              style={{
                fontSize: 12,
                marginLeft: "auto",
              }}
            >
              {translate(
                "pages.register.buttons.haveAccount",
                "Have an account? ",
              )}{" "}
              <ActiveLink
                style={{
                  fontWeight: "bold",
                  color: token.colorPrimaryTextHover,
                }}
                to="/login"
              >
                {translate("pages.login.signin", "Sign in")}
              </ActiveLink>
            </Typography.Text>
          )}
        </div>
        <Form.Item
          style={{
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            block
          >
            {translate(
              "pages.forgotPassword.buttons.submit",
              "Send reset instructions",
            )}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
