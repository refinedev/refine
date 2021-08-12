import {
    Typography,
    Table,
    Avatar,
    Space,
    Tag,
    NumberField,
    useSimpleList,
    AntdList,
} from "@pankod/refine";
import "./style.less";

import { OrderActions } from "components";

import { IOrder } from "interfaces";

const { Text, Paragraph } = Typography;

export const TrendingMenu: React.FC = () => {
    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        pagination: { pageSize: 5 },
    });

    console.log("listprops", listProps);

    const MenuItem: React.FC<{ item: IOrder; index: number }> = ({
        item,
        index,
    }) => (
        <div className="menu-item" key={item.id}>
            <Space size="large">
                <div className="menu-item__avatar">
                    <Avatar
                        size={{
                            md: 60,
                            lg: 108,
                            xl: 132,
                            xxl: 108,
                        }}
                        src={item.products[0].images[0].url}
                    />
                    <div className="menu-item__avatar-circle">
                        <span>#{index + 1}</span>
                    </div>
                </div>
                <div className="menu-item__text">
                    <Text strong>{item.products[0].name}</Text>
                    <NumberField
                        strong
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "standard",
                        }}
                        value={item.amount / 100}
                    />
                    <Text>Order {item.id}</Text>
                </div>
            </Space>
        </div>
    );

    return (
        <AntdList
            {...listProps}
            pagination={false}
            renderItem={(item, index) => <MenuItem item={item} index={index} />}
        ></AntdList>
    );
};
