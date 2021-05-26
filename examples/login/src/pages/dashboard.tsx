import {
    Row,
    Col,
    Card,
    Typography,
    useGetIdentity,
    usePermissions,
} from "@pankod/refine";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
    const identity = useGetIdentity();
    const permissions = usePermissions();

    return (
        <Row gutter={20}>
            <Col span={6}>
                <Card
                    title="Identity"
                    style={{ height: "300px", borderRadius: "15px" }}
                    headStyle={{ textAlign: "center" }}
                >
                    <Text>{JSON.stringify(identity.userIdentity)}</Text>
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    title="Permissions"
                    style={{ height: "300px", borderRadius: "15px" }}
                    headStyle={{ textAlign: "center" }}
                >
                    <Text>{JSON.stringify(permissions.permissions)}</Text>
                </Card>
            </Col>
        </Row>
    );
};
