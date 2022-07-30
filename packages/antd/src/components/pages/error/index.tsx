import React, { useEffect, useState } from "react";
import { ResourceErrorRouterParams } from "@pankod/refine-core";
import { RefineErrorPageProps } from "@pankod/refine-ui-types";
import { Button, Result, Typography, Space, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
    useNavigation,
    useTranslate,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";

const { Text } = Typography;

/**
 * When the app is navigated to a non-existent route, refine shows a default error page.
 * A custom error component can be used for this error page.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#catchall} for more details.
 */
export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const { push } = useNavigation();
    const translate = useTranslate();
    const actionTypes = ["edit", "create", "show"];

    const { useParams } = useRouterContext();

    const params = useParams<ResourceErrorRouterParams>();
    const resource = useResourceWithRoute();

    useEffect(() => {
        if (params.resource) {
            const resourceFromRoute = resource(params.resource);
            if (
                params.action &&
                actionTypes.includes(params.action) &&
                !resourceFromRoute[params.action]
            ) {
                setErrorMessage(
                    translate(
                        "pages.error.info",
                        {
                            action: params.action,
                            resource: params.resource,
                        },
                        `You may have forgotten to add the "${params.action}" component to "${params.resource}" resource.`,
                    ),
                );
            }
        }
    }, [params]);

    return (
        <Result
            status="404"
            title="404"
            extra={
                <Space direction="vertical" size="large">
                    <Space>
                        <Text>
                            {translate(
                                "pages.error.404",
                                "Sorry, the page you visited does not exist.",
                            )}
                        </Text>
                        {errorMessage && (
                            <Tooltip title={errorMessage}>
                                <InfoCircleOutlined data-testid="error-component-tooltip" />
                            </Tooltip>
                        )}
                    </Space>
                    <Button type="primary" onClick={() => push("/")}>
                        {translate("pages.error.backHome", "Back Home")}
                    </Button>
                </Space>
            }
        />
    );
};
