import React from "react";
import { useList } from "@pankod/refine-core";
import { Empty, Row } from "@pankod/refine-antd";
import { Canvas } from "types/canvas";
import CanvasTile from "components/canvas/tile";

const FeaturedCanvases = () => {
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
            filters: [
                {
                    field: "is_featured",
                    operator: "eq",
                    value: true,
                },
            ],
        },
    });

    return (
        <>
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

export default FeaturedCanvases;
