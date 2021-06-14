import {
    Typography,
    Row,
    Col,
    useApiUrl,
    useCustom,
    Spin,
    useTranslate,
} from "@pankod/refine";
import { IOrderTotalCount } from "interfaces";

import styles from "./styles";

export const Orders: React.FC = () => {
    const t = useTranslate();
    const { Title } = Typography;

    const API_URL = useApiUrl();

    const url = `${API_URL}/orderTotalCount`;
    const { data, isLoading } = useCustom<IOrderTotalCount>(url, "get");

    return (
        <Spin spinning={isLoading}>
            <Row gutter={[16, 0]}>
                <Col md={12}>
                    <Title style={styles.title} level={5}>
                        {t("fine-foods:dashboard.orderCountCard.totalOrder")}
                    </Title>
                    <div style={styles.countArea}>
                        <span style={styles.count}>
                            {data?.data.total || "0"}
                        </span>
                        <img src="/images/bike.svg" width="40" />
                    </div>
                </Col>
                <Col md={12}>
                    <Title style={styles.title} level={5}>
                        {t(
                            "fine-foods:dashboard.orderCountCard.totalDelivered",
                        )}
                    </Title>
                    <div style={styles.countArea}>
                        <span style={styles.count}>
                            {data?.data.totalDelivered || "0"}
                        </span>
                        <img src="/images/order-success.svg" width="37" />
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};
