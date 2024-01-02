import { FC } from "react";
import { useLocation } from "react-router-dom";

import { useGo, useNavigation } from "@refinedev/core";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Grid } from "antd";

import { Text } from "../components";

interface ListTitleButtonProps {
    toPath: string;
    buttonText: string;
}

export const ListTitleButton: FC<ListTitleButtonProps> = ({
    buttonText,
    toPath,
}) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { createUrl } = useNavigation();
    const screens = Grid.useBreakpoint();

    return (
        <Button
            type="primary"
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
            size={screens.xs ? "middle" : "large"}
            style={{
                marginTop: screens.xs ? "1.6rem" : "0.3rem",
            }}
        >
            <Text
                style={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                }}
            >
                {!screens.xs ? buttonText : null}
            </Text>
        </Button>
    );
};
