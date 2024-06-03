import React, { useEffect, useState } from "react";
import { useGo, useResource, useRouterType } from "@refinedev/core";
import type { RefineErrorPageProps } from "@refinedev/ui-types";
import { Button, Result, Typography, Space, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigation, useTranslate } from "@refinedev/core";

/**
 * When the app is navigated to a non-existent route, refine shows a default error page.
 * A custom error component can be used for this error page.
 *
 * @see {@link https://refine.dev/docs/packages/documentation/routers/} for more details.
 */
export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const translate = useTranslate();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();

  const { resource, action } = useResource();

  useEffect(() => {
    if (resource) {
      if (action) {
        setErrorMessage(
          translate(
            "pages.error.info",
            {
              action: action,
              resource: resource?.name,
            },
            `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
          ),
        );
      }
    }
  }, [resource, action]);

  return (
    <Result
      status="404"
      title="404"
      extra={
        <Space direction="vertical" size="large">
          <Space>
            <Typography.Text>
              {translate(
                "pages.error.404",
                "Sorry, the page you visited does not exist.",
              )}
            </Typography.Text>
            {errorMessage && (
              <Tooltip title={errorMessage}>
                {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
                <InfoCircleOutlined data-testid="error-component-tooltip" />
              </Tooltip>
            )}
          </Space>
          <Button
            type="primary"
            onClick={() => {
              if (routerType === "legacy") {
                push("/");
              } else {
                go({ to: "/" });
              }
            }}
          >
            {translate("pages.error.backHome", "Back Home")}
          </Button>
        </Space>
      }
    />
  );
};
