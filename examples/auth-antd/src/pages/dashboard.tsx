import { useGetIdentity, usePermissions } from "@refinedev/core";

import { Row, Col, Card, Avatar, Typography, Space } from "antd";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
  const { data: identity } = useGetIdentity<{
    id: string;
    name: string;
    avatar: string;
  }>();
  const permissions = usePermissions<string[], { permissions: string[] }>({
    params: { permissions: ["admin"] },
  });

  return (
    <Row gutter={20}>
      <Col span={6}>
        <Card
          title="Identity"
          style={{ height: "300px", borderRadius: "15px" }}
          styles={{
            header: {
              textAlign: "center",
            },
          }}
        >
          <Space align="center" orientation="horizontal">
            <Avatar size="large" src={identity?.avatar} />
            <Text>{identity?.name}</Text>
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Permissions"
          style={{ height: "300px", borderRadius: "15px" }}
          styles={{
            header: {
              textAlign: "center",
            },
          }}
        >
          <Text>{permissions.data}</Text>
        </Card>
      </Col>
    </Row>
  );
};
