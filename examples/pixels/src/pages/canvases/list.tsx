import { AntdList, Skeleton, useSimpleList } from "@pankod/refine-antd";

import { CanvasTile } from "components/canvas";
import { SponsorsBanner } from "components/banners";
import { Canvas } from "types";

export const CanvasList: React.FC = () => {
    const { listProps, queryResult } = useSimpleList<Canvas>({
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
    });

    const { isLoading } = queryResult;

    return (
        <div className="container">
            <div className="paper">
                {isLoading ? (
                    <div className="canvas-skeleton-list">
                        {[...Array(12)].map((_, index) => (
                            <Skeleton key={index} paragraph={{ rows: 8 }} />
                        ))}
                    </div>
                ) : (
                    <AntdList
                        {...listProps}
                        className="canvas-list"
                        split={false}
                        renderItem={(canvas) => <CanvasTile canvas={canvas} />}
                    />
                )}
            </div>
            <SponsorsBanner />
        </div>
    );
};
