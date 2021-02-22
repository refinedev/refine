import React from "react";
import { Empty as AntdEmpty, EmptyProps } from "antd";

export const Empty: React.FC<EmptyProps> = (props) => {
    return <AntdEmpty {...props} />;
};
