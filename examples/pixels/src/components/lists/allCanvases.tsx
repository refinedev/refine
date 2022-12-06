import React from "react";
import { useList } from "@pankod/refine-core";
import { Empty, Row, Typography } from "@pankod/refine-antd";
import { Canvas } from "types/canvas";
import CanvasTile from "components/canvas/tile";

const { Title } = Typography;

const AllCanvases = () => {
    const { data } = useList<Canvas>({
        resource: "canvases",
        config: {
            hasPagination: false,
            sort: [
                {
                    field: "created_at",
                    order: "desc",
                },
            ],
        },
    });

    return (
        <>
            <Title level={3} style={{ margin: "48px 0 24px" }}>
                All Items
            </Title>
            {data?.data ? (
                <Row
                    gutter={[16, 16]}
                    align="middle"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(248px, 1fr))",
                        alignItems: "start",
                        justifyItems: "center",
                    }}
                >
                    {data?.data?.map((canvas) => (
                        <CanvasTile key={canvas.id} canvas={canvas} />
                    ))}
                </Row>
            ) : (
                <Empty />
            )}
        </>
    );
};

export default AllCanvases;
