import { Text } from "@/components/text";
import { Spin } from "antd";
import { FC } from "react";

type Props = {
    text?: string;
};

export const FullscreenLoading: FC<Props> = ({ text }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
            }}
        >
            <Spin size="large" spinning />
            {text && <Text size="lg">{text}</Text>}
        </div>
    );
};
