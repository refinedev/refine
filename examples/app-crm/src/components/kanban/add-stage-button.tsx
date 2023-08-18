import { FC, PropsWithChildren } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Text } from "../text";

interface Props {
    onClick: () => void;
}

export const KanbanAddStageButton: FC<PropsWithChildren<Props>> = ({
    children,
    onClick,
}) => {
    return (
        <Button
            type="dashed"
            size="large"
            icon={<PlusSquareOutlined className="secondary md" />}
            style={{
                marginTop: "16px",
                height: "56px",
            }}
            onClick={onClick}
        >
            {children ?? (
                <Text size="md" type="secondary">
                    Add stage
                </Text>
            )}
        </Button>
    );
};
