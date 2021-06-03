import { Typography, AntdList, Avatar } from "@pankod/refine";

export const DeliverySchedule: React.FC = () => {
    const { Title } = Typography;
    return (
        <>
            <Title level={5}>Upcoming Delivery Schedule</Title>
            <AntdList
                itemLayout="horizontal"
                dataSource={[1, 2, 3, 4, 5]}
                renderItem={(item) => (
                    <AntdList.Item>
                        <AntdList.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title="Stepni Doe"
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </AntdList.Item>
                )}
                pagination={{
                    pageSize: 3,
                    size: "small",
                }}
            />
        </>
    );
};
