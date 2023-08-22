import { Skeleton } from "antd";

export const AccordionHeaderSkeleton = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Skeleton.Avatar size="small" shape="square" />
            <Skeleton.Input size="small" block style={{ height: "22px" }} />
        </div>
    );
};
