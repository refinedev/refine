import { useList } from "@pankod/refine-core";
import React, { ReactElement } from "react";
import { Canvas } from "types/canvas";
import { Pixel } from "types/pixel";

type DisplayCanvasProps = {
    canvas: Canvas;
    children: (pixels: Pixel[] | undefined) => ReactElement;
};

export const DisplayCanvas: React.FC<DisplayCanvasProps> = ({
    canvas: { id },
    children,
}) => {
    const { data } = useList<Pixel>({
        resource: "pixels",
        liveMode: "auto",
        config: {
            filters: [
                {
                    field: "canvas_id",
                    operator: "eq",
                    value: id,
                },
            ],
            sort: [
                {
                    field: "created_at",
                    order: "desc",
                },
            ],
            hasPagination: false,
        },
        metaData: {
            select: "*, users(id, full_name, avatar_url)",
        },
    });

    const pixels = data?.data;

    return <>{children(pixels)}</>;
};
