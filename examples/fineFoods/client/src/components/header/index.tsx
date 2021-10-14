import {
    AntdLayout,
    Row,
    Typography,
    NumberField,
    useRouterContext,
} from "@pankod/refine";

import {
    MotorcycleIcon,
    FinefoodsIcon,
    BasketIcon,
    SearchIcon,
} from "@components";

import { useBasketContext, useIsMobile } from "@hooks";
import { useOrdesModalContext } from "@hooks/useOrdersModalContext";

const { Text } = Typography;

require("./header.less");

export const Header = () => {
    const isMobile = useIsMobile();
    const { Link } = useRouterContext();

    const { setOrdersModalVisible } = useOrdesModalContext();
    const { orders, totalPrice } = useBasketContext();
    const isBasketHaveOrders = orders.length > 0;

    return (
        <AntdLayout.Header className="header">
            <Row>
                <Link href="/">
                    <a style={{ display: "flex" }}>
                        <MotorcycleIcon
                            svgProps={{
                                height: isMobile ? 24 : 36,
                                style: { marginRight: isMobile ? 14 : 24 },
                            }}
                        />
                        <FinefoodsIcon height={isMobile ? 24 : 36} />
                    </a>
                </Link>
            </Row>
            <Row
                className="basket"
                style={{ alignItems: "center" }}
                onClick={() => setOrdersModalVisible((prev: boolean) => !prev)}
            >
                {isBasketHaveOrders && (
                    <>
                        <Text className="basket-amount">
                            {isBasketHaveOrders && `${orders.length} items /`}
                        </Text>
                        <NumberField
                            className="basket-amount total-price"
                            value={totalPrice / 100}
                            options={{
                                currency: "USD",
                                style: "currency",
                            }}
                        />
                    </>
                )}
                <BasketIcon />
            </Row>
        </AntdLayout.Header>
    );
};
