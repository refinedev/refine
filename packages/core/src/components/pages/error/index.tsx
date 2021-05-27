import React, { useEffect, useState } from "react";
import { Button, Result, Typography, Space, Alert } from "antd";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate, useResourceWithRoute } from "@hooks";
import { ResourceErrorRouterParams } from "../../../interfaces";

const { Text } = Typography;

export const ErrorComponent: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const { push } = useNavigation();
    const translate = useTranslate();
    const actionTypes = ["edit", "create", "show"];

    const params = useParams<ResourceErrorRouterParams>();
    const resource = useResourceWithRoute();

    useEffect(() => {
        if (params.resource) {
            try {
                const resourceFromRoute = resource(params.resource);
                if (
                    params.action &&
                    actionTypes.includes(params.action) &&
                    !resourceFromRoute[params.action]
                ) {
                    setErrorMessage(
                        translate(
                            "pages.error.infoText",
                            {
                                action: params.action.toUpperCase(),
                                resource: params.resource.toUpperCase(),
                            },
                            `You may have forgotten to add the "${params.action.toUpperCase()}" component to "${params.resource.toUpperCase()}" resource.`,
                        ),
                    );
                }
            } catch (error) {
                setErrorMessage(
                    translate(
                        "pages.error.resourceNotFound",
                        {
                            resource: params.resource.toUpperCase(),
                        },
                        `Are you sure you have created the "${params.resource.toUpperCase()}" resource.`,
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
                    <Text>
                        {translate(
                            "pages.error.404text",
                            "Sorry, the page you visited does not exist.",
                        )}
                    </Text>
                    {errorMessage && (
                        <Alert
                            message="Informational Notes"
                            description={errorMessage}
                            type="info"
                            showIcon
                            style={{ textAlign: "left" }}
                        />
                    )}
                    <Button type="primary" onClick={() => push("/")}>
                        {translate("pages.error.backHome", "Back Home")}
                    </Button>
                </Space>
            }
        />
    );
};
