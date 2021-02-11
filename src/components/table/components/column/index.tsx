import React from "react";
import { Table } from "antd";
import { ColumnProps as AntdColumnProps } from "antd/lib/table";

export type ColumnProps = AntdColumnProps<{
    id: string | number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}> & {};

export const Column: React.FC<ColumnProps> = ({ ...rest }) => {
    return <Table.Column {...rest} />;
};
