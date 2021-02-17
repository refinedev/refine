import React from "react";
import { Empty, EmptyProps } from "antd";

export const DeafultEmpty: React.FC<EmptyProps> = (props) => {
    return <Empty {...props} />;
};
