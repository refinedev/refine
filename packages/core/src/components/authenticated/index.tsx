import React from "react";

import { useAuthenticated, useNotification } from "@hooks";
import { Button, Result, Typography, Space, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Text } = Typography;
export type AuthenticatedProps = {
    fallback?: React.ReactNode;
    loading?: React.ReactNode;
};

export const Authenticated: React.FC<AuthenticatedProps> = ({
    children,
    fallback,
    loading,
}) => {
    const { isSuccess, isLoading, isError } = useAuthenticated();

    const error = (
        <Result
            status="404"
            extra={
                <Space direction="vertical" size="large">
                    <Space>
                        <Text>sasda</Text>
                        <Tooltip title={"dasdsa"}>
                            <InfoCircleOutlined data-testid="error-component-tooltip" />
                        </Tooltip>
                    </Space>
                    <Button type="primary">home</Button>
                </Space>
            }
        />
    );

    if (isLoading) {
        return <>{loading}</> || null;
    }
    if (isError) {
        return (
            <>
                {fallback} || {error}
            </>
        );
    }
    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};
