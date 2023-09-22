import { Card, Skeleton, Space } from "antd";

import { Text } from "@/components";

export const CompanyCardSkeleton = () => {
    return (
        <Card
            size="small"
            actions={[
                <div
                    key={1}
                    style={{
                        width: "100%",
                        height: "60px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "0 16px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
                        }}
                    >
                        <Text size="xs">Related contacts</Text>
                        <Space size={4}>
                            <Skeleton.Avatar
                                active
                                shape="circle"
                                size="small"
                            />
                            <Skeleton.Avatar
                                active
                                shape="circle"
                                size="small"
                            />
                            <Skeleton.Avatar
                                active
                                shape="circle"
                                size="small"
                            />
                        </Space>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "6px",
                        }}
                    >
                        <Text size="xs">Sales owner</Text>
                        <Space size={4}>
                            <Skeleton.Avatar
                                active
                                shape="circle"
                                size="small"
                            />
                        </Space>
                    </div>
                </div>,
            ]}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <Skeleton.Avatar
                    active
                    shape="square"
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "4px",
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: "200px",
                        height: "16px",
                        marginTop: "16px",
                    }}
                />
                <Space
                    direction="vertical"
                    size={0}
                    style={{
                        marginBottom: "6px",
                        alignItems: "center",
                    }}
                >
                    <Skeleton.Input
                        active
                        style={{
                            height: "16px",
                            marginTop: "12px",
                        }}
                    />
                    <Skeleton.Input
                        active
                        style={{
                            height: "16px",
                            marginTop: "8px",
                        }}
                    />
                </Space>
            </div>
        </Card>
    );
};
