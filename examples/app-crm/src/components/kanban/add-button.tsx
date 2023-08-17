import { FC } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Text } from "../../components/text";

interface Props {
    onClick: () => void;
}

export const Addbutton: FC<Props> = ({ onClick }) => {
    return (
        <Button
            type="dashed"
            size="large"
            icon={<PlusSquareOutlined className="secondary md" />}
            style={{
                width: "128px",
                height: "56px",
            }}
            onClick={onClick}
        >
            <Text size="md" type="secondary">
                Add stage
            </Text>
        </Button>
    );
};
