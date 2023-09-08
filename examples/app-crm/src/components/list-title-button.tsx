import { PlusCircleOutlined } from "@ant-design/icons";
import { useGo, useNavigation } from "@refinedev/core";
import { Button } from "antd";
import { useLocation } from "react-router-dom";

import { Text } from "../components";

interface ListTitleButtonProps {
    toPath: string;
    buttonText: string;
}

export const ListTitleButton: React.FC<ListTitleButtonProps> = ({
    buttonText,
    toPath,
}) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { createUrl } = useNavigation();

    return (
        <Button
            type="primary"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => {
                return go({
                    to: `${createUrl(toPath)}`,
                    query: {
                        to: pathname,
                    },
                    options: {
                        keepQuery: true,
                    },
                    type: "replace",
                });
            }}
        >
            <Text
                hideOnSizes={["sm"]}
                style={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                }}
            >
                {buttonText}
            </Text>
        </Button>
    );
};
