import { PropsWithChildren, ReactNode } from "react";
import { Space } from "antd";

import { Text } from "../components/text";

type Props = PropsWithChildren<{
    icon: ReactNode;
    isActive: boolean;
    fallback: string | ReactNode;
}>;

export const AccordionHeader = ({
    icon,
    isActive,
    fallback,
    children,
}: Props) => {
    return (
        <Space size={15} align="start">
            {icon}
            {isActive ? <Text strong>{children}</Text> : fallback}
        </Space>
    );
};
