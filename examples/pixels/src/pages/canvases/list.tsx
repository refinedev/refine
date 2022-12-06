import { Row, Space, Typography } from "@pankod/refine-antd";
import { useResource } from "@pankod/refine-core";
import { SponsorsBanner } from "components/banners";
import AllCanvases from "components/lists/allCanvases";
import FeaturedCanvases from "components/lists/featuredCanvases";

export const CanvasList = () => {
    const {
        resource: { label, name },
    } = useResource();

    return (
        <Row
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Space
                direction="vertical"
                className="page-shadow"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Space direction="vertical">
                    <Typography.Title level={3}>
                        {label ?? name}
                    </Typography.Title>
                </Space>
                <FeaturedCanvases />
                <AllCanvases />
            </Space>
            <SponsorsBanner />
        </Row>
    );
};
