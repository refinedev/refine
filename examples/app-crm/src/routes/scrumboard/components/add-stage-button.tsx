import { FC, PropsWithChildren } from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";

import { Text } from "@/components";

type Props = ButtonProps;

export const KanbanAddStageButton: FC<PropsWithChildren<Props>> = ({
    children,
    onClick,
    style,
    ...rest
}) => {
    return (
        <Button
            type="dashed"
            size="large"
            icon={<PlusSquareOutlined className="secondary md" />}
            style={{
                marginTop: "16px",
                marginLeft: "16px",
                marginRight: "16px",
                height: "56px",
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children ?? (
                <Text size="md" type="secondary">
                    Add stage
                </Text>
            )}
        </Button>
    );
};
