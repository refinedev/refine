import {
    Typography,
    Avatar,
    Space,
    NumberField,
    useSimpleList,
    AntdList,
} from "@pankod/refine-antd";
import { Container, AvatarWrapper, AvatarCircle, TextWrapper } from "./styled";

import { IOrder } from "interfaces";

const { Text } = Typography;

export const TrendingMenu: React.FC = () => {
    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        pagination: { pageSize: 5 },
        syncWithLocation: false,
    });

    return (
        <AntdList
            {...listProps}
            pagination={false}
            renderItem={(item, index) => <MenuItem item={item} index={index} />}
        ></AntdList>
    );
};

const MenuItem: React.FC<{ item: IOrder; index: number }> = ({
    item,
    index,
}) => (
    <Container key={item.id}>
        <Space size="large">
            <AvatarWrapper className="menu-item__avatar">
                <Avatar
                    size={{
                        xs: 64,
                        sm: 64,
                        md: 64,
                        lg: 108,
                        xl: 132,
                        xxl: 108,
                    }}
                    src={item.products[0]?.images[0]?.url}
                />
                <AvatarCircle>
                    <span>#{index + 1}</span>
                </AvatarCircle>
            </AvatarWrapper>
            <TextWrapper>
                <Text strong>{item.products[0]?.name}</Text>
                <NumberField
                    strong
                    options={{
                        currency: "USD",
                        style: "currency",
                        notation: "standard",
                    }}
                    value={item.amount / 100}
                />
            </TextWrapper>
        </Space>
    </Container>
);
