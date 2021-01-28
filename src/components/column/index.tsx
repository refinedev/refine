import React from "react";
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";

export const Column: React.FC<ColumnProps<any>> = ({ ...rest }) => {
    return <Table.Column {...rest} />;
};
