import React from "react";
import { Typography, TypographyProps } from "antd";

export const DefaultAside: React.FC<TypographyProps> = (props) => {
    const { Text, Title } = Typography;

    return (
        <div {...props}>
            <Title level={5}>Post details</Title>
            <Text>
                Posts will only be published once an editor approves them
            </Text>
        </div>
    );
};
