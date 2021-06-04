import { Typography, useList } from "@pankod/refine";
import { RadialBar } from "@ant-design/charts";

export const OrdersChart: React.FC = () => {
    const { data, isLoading } = useList("orderChart");

    const config = {
        width: 400,
        height: 300,
        data: data?.data || [],
        loading: isLoading,
        xField: "status",
        yField: "count",
        radius: 0.8,
        innerRadius: 0.2,
        colorField: "status",
        color: function color(_ref) {
            const status = _ref.status;

            switch (status) {
                case "waiting":
                    return "#F39800";
                case "ready":
                    return "#B033AB";
                case "on the way":
                    return "#1890FF";
                case "delivered":
                    return "#52C41A";
                case "could not be delivered":
                    return "#F5222D";
            }
        },
    };

    const { Title } = Typography;

    return (
        <>
            <Title level={5}>Orders</Title>
            <RadialBar {...config} />
        </>
    );
};
