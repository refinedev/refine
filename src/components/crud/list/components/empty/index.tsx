import React from "react";
import { Empty, EmptyProps } from "antd";

export const DefaultEmpty: React.FC<EmptyProps> = (props) => {
    return <Empty {...props} />;
};
