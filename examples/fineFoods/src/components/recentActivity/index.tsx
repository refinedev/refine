import {
    Typography,
    Avatar,
    Row,
    Col,
    AntdList,
    useSimpleList,
    useMany,
    Icons,
    useTranslate,
} from "@pankod/refine";
import dayjs from "dayjs";

import styles from "./styles";
import { IOrder, IUser } from "interfaces";

export const RecentActivity: React.FC = () => {
    const t = useTranslate();
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

    const userIds = listProps?.dataSource?.map((item) => item.user.id) ?? [];
    const { data, isLoading } = useMany<IUser>("users", userIds, {
        enabled: userIds.length > 0,
    });

    const renderItem = (item: IOrder) => {
        const user = data?.data.find((user: IUser) => user.id === item.user.id);
        const renderUser = () => {
            if (isLoading) {
                return <span>loading...</span>;
            }

            return user.fullName;
        };

        return (
            <Row style={styles.row} align="bottom">
                <Col md={14} style={styles.userArea}>
                    <Avatar
                        src={user?.avatar[0].url}
                        size={32}
                        icon={<Icons.UserOutlined />}
                    />

                    <div style={styles.userInfo}>
                        <div>
                            <Text style={styles.userInfo__name} strong>
                                {renderUser()}
                            </Text>
                        </div>
                        <Text style={styles.status}>
                            {t(`enum:orderStatuses.${item.status.text}`)}
                        </Text>
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
            <Title level={5}>{t("dashboard:recentActivity.title")}</Title>
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
