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

import styles from "./styles";
import { IOrder, IUser } from "interfaces";

export const DeliverySchedule: React.FC = () => {
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
        pagination: {
            pageSize: 3,
            size: "small",
            simple: true,
        },
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

            return user?.fullName;
        };

        return (
            <Row style={styles.row} align="bottom">
                <Col md={10} style={styles.userArea}>
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
                            <Text
                                style={styles.userInfo__productLength}
                            >{`(${item.products.length} items)`}</Text>
                        </div>
                        <Text style={styles.status}>
                            {t(`enum:orderStatuses.${item.status.text}`)}
                        </Text>
                    </div>
                </Col>
                <Col md={14}>
                    <Text style={styles.address}>
                        {`${item.adress.text}`}
                        <Icons.EnvironmentFilled style={{ marginLeft: 5 }} />
                    </Text>
                </Col>
            </Row>
        );
    };

    return (
        <>
            <Title level={5}>
                {t("dashboard:upcomingDeliverySchedule.title")}
            </Title>
            <AntdList {...listProps} renderItem={renderItem} />
        </>
    );
};
