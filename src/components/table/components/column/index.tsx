import React from "react";
import { Table } from "antd";
import { ColumnProps as AntdColumnProps } from "antd/lib/table";

export type ColumnProps = AntdColumnProps<any> & {};

export const Column: React.FC<ColumnProps> = ({ ...rest }) => {
    return <Table.Column {...rest} />;
};
