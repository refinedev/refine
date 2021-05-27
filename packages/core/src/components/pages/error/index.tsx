import React, { useEffect, useState } from "react";
import { Button, Result, Typography, Tooltip, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate, useResourceWithRoute } from "@hooks";
import { ResourceErrorRouterParams } from "../../../interfaces";

const { Text } = Typography;

export const ErrorComponent: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { push } = useNavigation();
    const translate = useTranslate();
    const actionTypes = ["edit", "create", "show"];

    const params = useParams<ResourceErrorRouterParams>();
    const resource = useResourceWithRoute();

    useEffect(() => {
        if (params.resource) {
            try {
                const resourceFromRoute = resource(params.resource);
                if (params.action) {
                    if (actionTypes.includes(params.action)) {
                        if (!resourceFromRoute[params.action]) {
                            setErrorMessage(
                                `You may have forgotten to add the "${params.action}" component to "${params.resource}".`,
                            );
                        }
                    } else {
                        setErrorMessage(`page not found`);
                    }
                }
            } catch (error) {
                setErrorMessage(`${params.resource} resource not found`);
            }
        }
    }, [params]);

    return (
        <Result
            status="404"
            title="404"
            extra={
                <Space direction="vertical">
                    <Text>
                        <Space>
                            Sorry, the page you visited does not exist.
                            <Tooltip title={errorMessage}>
                                <InfoCircleOutlined />
                            </Tooltip>
                        </Space>
                    </Text>
                    <Button type="primary" onClick={() => push("/")}>
                        {translate("backHome", "Back Home")}
                    </Button>
                </Space>
            }
        />
    );
};
