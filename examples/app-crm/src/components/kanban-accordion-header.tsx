import { PropsWithChildren, ReactNode } from "react";
import { Space, Typography } from "antd";

import { Text } from "../components/text";

type Props = PropsWithChildren<{
    icon: ReactNode;
    isActive: boolean;
    fallback: string;
}>;

export const AccordionHeader = ({
    icon,
    isActive,
    fallback,
    children,
}: Props) => {
    return (
        <Space size={15}>
            {icon}
            {isActive ? (
                <Text strong>{children}</Text>
            ) : (
                <Typography.Link>{fallback}</Typography.Link>
            )}
        </Space>
    );
};
