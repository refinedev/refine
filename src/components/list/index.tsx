import React from "react";
import { AxiosResponse } from "axios";
import { Table } from "antd";
export interface ListProps {
    data?: AxiosResponse<any>;
    isLoading?: boolean;
}

export const List: React.FC<ListProps> = ({ isLoading, data, children }) => {
    return (
        <Table dataSource={data?.data} loading={isLoading}>
            {children}
        </Table>
    );
};
