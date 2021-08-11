import {
    Typography,
    useTranslate,
    Timeline,
    useSimpleList,
    AntdList,
    Tooltip,
    useNavigation,
} from "@pankod/refine";

import { IOrder } from "interfaces";

export const RecentOrders: React.FC = () => {
    const { listProps } = useSimpleList<IOrder>({
        resource: "orders",
        sorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        pagination: {
            pageSize: 6,
            simple: true,
        },
    });
    return (
        <AntdList
            {...listProps}
            renderItem={(item) => {
                return <div>{item.adress.text}</div>;
            }}
        />
    );
};
