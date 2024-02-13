import { useTranslate } from "@refinedev/core";
import { ListButton } from "@refinedev/antd";
import { Row, Col, Flex, Divider } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { StoreForm } from "../../components";

export const StoreCreate = () => {
    const t = useTranslate();

    return (
        <>
            <Flex>
                <ListButton icon={<LeftOutlined />}>
                    {t("stores.stores")}
                </ListButton>
            </Flex>
            <Divider />
            <Row gutter={[64, 0]} wrap>
                <Col xs={24} lg={11}>
                    <StoreForm action="create" />
                </Col>
            </Row>
        </>
    );
};
