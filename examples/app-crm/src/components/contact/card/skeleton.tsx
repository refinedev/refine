import { Card, Skeleton, Space } from "antd";

export const ContactCardSkeleton = () => {
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
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        padding: "0 16px",
                    }}
                >
                    <Skeleton.Button
                        active
                        style={{
                            width: "200px",
                            height: "16px",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Skeleton.Avatar
                            active
                            shape="square"
                            size="small"
                            style={{
                                borderRadius: "4px",
                            }}
                        />
                        <Skeleton.Button
                            active
                            style={{
                                height: "16px",
                                marginTop: "4px",
                                width: "100px",
                            }}
                        />
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
                    shape="circle"
                    style={{
                        width: "64px",
                        height: "64px",
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: "100px",
                        height: "12px",
                        marginTop: "14px",
                    }}
                />
                <Space
                    direction="vertical"
                    size={0}
                    style={{
                        marginTop: "4px",
                        marginBottom: "2px",
                        alignItems: "center",
                    }}
                >
                    <Skeleton.Input
                        active
                        style={{
                            width: "200px",
                            height: "16px",
                            marginTop: "12px",
                        }}
                    />
                    <Skeleton.Button
                        active
                        style={{
                            width: "80px",
                            height: "22px",
                            marginTop: "8px",
                        }}
                    />
                </Space>
            </div>
        </Card>
    );
};
