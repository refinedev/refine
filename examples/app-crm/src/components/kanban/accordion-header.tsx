import { PropsWithChildren, ReactNode } from "react";
import { Skeleton, Space } from "antd";

import { Text } from "../../components/text";

type Props = PropsWithChildren<{
    icon: ReactNode;
    isActive: boolean;
    fallback: string | ReactNode;
    isLoading?: boolean;
}>;

export const AccordionHeader = ({
    icon,
    isActive,
    fallback,
    isLoading = false,
    children,
}: Props) => {
    if (isLoading) {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Skeleton.Avatar size="small" shape="square" />
                <Skeleton.Input size="small" block style={{ height: "22px" }} />
            </div>
        );
    }

    return (
        <Space size={15} align="start">
            {icon}
            {isActive ? <Text strong>{children}</Text> : fallback}
        </Space>
    );
};
