import {
    Typography,
    Avatar,
    Row,
    Col,
    AntdList,
    useSimpleList,
    useMany,
    Icons,
} from "@pankod/refine";
import dayjs from "dayjs";

import styles from "./styles";
import { IOrder, IUser } from "interfaces";

export const RecentActivity: React.FC = () => {
    const { Title, Text } = Typography;

    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        sorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });

    const userIds = listProps?.dataSource?.map((item) => item.userId) ?? [];
    const { data, isLoading } = useMany<IUser>("users", userIds, {
        enabled: userIds.length > 0,
    });

    const renderItem = (item: IOrder) => {
        const renderUser = () => {
            if (isLoading) {
                return <span>loading...</span>;
            }

            const user = data?.data.find(
                (user: IUser) => user.id === item.userId,
            );

            return `${user.name} ${user.surname}`;
        };

        return (
            <Row style={styles.row} align="bottom">
                <Col md={14} style={styles.userArea}>
                    <Avatar size={32} icon={<Icons.UserOutlined />} />

                    <div style={styles.userInfo}>
                        <div>
                            <Text style={styles.userInfo__name} strong>
                                {renderUser()}
                            </Text>
                        </div>
                        <Text
                            style={styles.status}
                        >{`${item.status.text}`}</Text>
                    </div>
                </Col>
                <Col md={10}>
                    <Text style={styles.date}>
                        {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </Text>
                </Col>
            </Row>
        );
    };

    return (
        <>
            <Title level={5}>Recent Activity</Title>
            <AntdList
                {...listProps}
                renderItem={renderItem}
                pagination={{
                    ...listProps.pagination,
                    size: "small",
                    simple: true,
                }}
            />
        </>
    );
};
