import { Flex, Popover, Typography, Badge, Avatar, theme } from "antd";
import { getUniqueListWithCount } from "../../../utils";
import { IOrder } from "../../../interfaces";
import { useTranslate } from "@refinedev/core";

type Props = {
    order: IOrder;
};

export const OrdersTableColumnProducts = ({ order }: Props) => {
    const t = useTranslate();
    const { token } = theme.useToken();

    const uniqueProducts = getUniqueListWithCount({
        list: order?.products || [],
        field: "id",
    });
    const firstThree = uniqueProducts.slice(0, 3);
    const rest = uniqueProducts.slice(3);

    return (
        <Flex gap={12}>
            {firstThree.map((product) => {
                return (
                    <Popover
                        key={product.id}
                        content={
                            <Typography.Text>{product.name}</Typography.Text>
                        }
                    >
                        <Badge
                            style={{
                                color: "#fff",
                            }}
                            count={product.count === 1 ? 0 : product.count}
                        >
                            <Avatar
                                shape="square"
                                src={product.images[0].url}
                            />
                        </Badge>
                    </Popover>
                );
            })}
            {!!rest.length && (
                <Popover
                    title={t("orders.fields.products")}
                    content={
                        <Flex gap={8}>
                            {rest.map((product) => {
                                return (
                                    <Popover
                                        key={product.id}
                                        content={
                                            <Typography.Text>
                                                {product.name}
                                            </Typography.Text>
                                        }
                                    >
                                        <Badge
                                            style={{
                                                color: "#fff",
                                            }}
                                            count={
                                                product.count === 1
                                                    ? 0
                                                    : product.count
                                            }
                                        >
                                            <Avatar
                                                shape="square"
                                                src={product.images[0].url}
                                            />
                                        </Badge>
                                    </Popover>
                                );
                            })}
                        </Flex>
                    }
                >
                    <Avatar
                        shape="square"
                        style={{
                            backgroundColor: token.colorPrimaryBg,
                        }}
                    >
                        <Typography.Text
                            style={{
                                color: token.colorPrimary,
                            }}
                        >
                            +{rest.length}
                        </Typography.Text>
                    </Avatar>
                </Popover>
            )}
        </Flex>
    );
};
