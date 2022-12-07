import { AntdList, useSimpleList } from "@pankod/refine-antd";

import { CanvasTile } from "components/canvas";
import { SponsorsBanner } from "components/banners";
import { Canvas } from "types";

export const CanvasFeaturedList: React.FC = () => {
    const { listProps } = useSimpleList<Canvas>({
        resource: "canvases",
        pagination: {
            pageSize: 12,
        },
        initialSorter: [
            {
                field: "created_at",
                order: "desc",
            },
        ],
        initialFilter: [
            {
                field: "is_featured",
                operator: "eq",
                value: true,
            },
        ],
    });

    return (
        <div className="container">
            <div className="paper">
                <AntdList
                    {...listProps}
                    className="canvas-list"
                    split={false}
                    renderItem={(canvas) => <CanvasTile canvas={canvas} />}
                />
            </div>
            <SponsorsBanner />
        </div>
    );
};
