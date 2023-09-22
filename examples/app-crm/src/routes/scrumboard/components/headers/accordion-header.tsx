import { PropsWithChildren, ReactNode } from "react";

import { Space } from "antd";

import { Text } from "@/components";

import { AccordionHeaderSkeleton } from "../accordion-header-skeleton";

type Props = PropsWithChildren<{
    icon: ReactNode;
    isActive: boolean;
    fallback?: string | ReactNode;
    isLoading?: boolean;
    onClick?: () => void;
}>;

export const AccordionHeader = ({
    icon,
    isActive,
    fallback,
    isLoading = false,
    children,
}: Props) => {
    if (isLoading) {
        return <AccordionHeaderSkeleton />;
    }

    return (
        <Space size={15} align="start">
            {icon}
            {isActive ? <Text strong>{children}</Text> : fallback}
        </Space>
    );
};
