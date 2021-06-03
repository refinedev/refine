import { Typography, AntdList, useSimpleList } from "@pankod/refine";

export const DeliverySchedule: React.FC = () => {
    const { Title } = Typography;

    const { listProps } = useSimpleList<{
        title: string;
        id: string;
        status: "draft" | "published";
    }>({
        resource: "posts",
        filters: [
            {
                field: "status",
                operator: "eq",
                value: "published",
            },
        ],
        sorter: [
            {
                field: "id",
                order: "asc",
            },
        ],

        pagination: {
            pageSize: 3,
        },
    });

    return (
        <>
            <Title level={5}>Upcoming Delivery Schedule</Title>

            <AntdList
                {...listProps}
                renderItem={(item) => (
                    <div>{`${item.id} - ${item.title} - ${item.status}`}</div>
                )}
            />
        </>
    );
};
