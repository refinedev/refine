import { FC, PropsWithChildren } from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { Text } from "@/components";

interface Props {
    onClick: () => void;
}

export const KanbanAddCardButton: FC<PropsWithChildren<Props>> = ({
    children,
    onClick,
}) => {
    return (
        <Button
            size="large"
            icon={<PlusSquareOutlined className="md" />}
            style={{
                margin: "16px",
                backgroundColor: "white",
            }}
            onClick={onClick}
        >
            {children ?? (
                <Text size="md" type="secondary">
                    Add new card
                </Text>
            )}
        </Button>
    );
};
