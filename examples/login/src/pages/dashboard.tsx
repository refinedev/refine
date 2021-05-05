import React, { useEffect } from "react";

import {
    Space,
    Card,
    Typography,
    useGetIdentity,
    usePermissions,
    useAuthenticated,
    useLogout,
} from "@pankod/refine";

const { Title, Text } = Typography;

export const DashboardPage = () => {
    const identity = useGetIdentity();
    const permissions = usePermissions();
    const checkAuth = useAuthenticated();
    const logout = useLogout();

    useEffect(() => {
        checkAuth().catch(() => logout());
    }, []);

    return (
        <Space direction="vertical">
            <Card>
                <Title level={2}>Identity</Title>
                <Text>{JSON.stringify(identity)}</Text>
            </Card>
            <Card>
                <Title level={2}>Permissions</Title>
                <Text>{JSON.stringify(permissions)}</Text>
            </Card>
        </Space>
    );
};
