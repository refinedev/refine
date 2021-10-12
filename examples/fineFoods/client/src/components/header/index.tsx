import { AntdLayout, Row, Typography, NumberField } from "@pankod/refine";

import {
    MotorcycleIcon,
    FinefoodsIcon,
    BasketIcon,
    SearchIcon,
} from "@components";

import { useBasketContext, useIsMobile } from "@hooks";

const { Text } = Typography;

require("./header.less");

export const Header = () => {
    const isMobile = useIsMobile();

    const { orders, totalAmount } = useBasketContext();
    const isBasketHaveOrders = orders.length > 0;

    return (
        <AntdLayout.Header className="header">
            <Row>
                <MotorcycleIcon
                    svgProps={{
                        height: isMobile ? 24 : 36,
                        style: { marginRight: isMobile ? 14 : 24 },
                    }}
                />
                <FinefoodsIcon height={isMobile ? 24 : 36} />
            </Row>
            <Row style={{ alignItems: "center" }}>
                <SearchIcon height={24} style={{ marginRight: 14 }} />
                <Text className="basket-amount">
                    {isBasketHaveOrders && `${orders.length} items /`}
                </Text>
                <NumberField
                    className="basket-amount total-amount"
                    value={totalAmount / 100}
                    options={{
                        currency: "USD",
                        style: "currency",
                    }}
                />
                <BasketIcon />
            </Row>
        </AntdLayout.Header>
    );
};
