import { AxiosResponse } from "axios";
import React from "react";

export interface ListProps {
    data?: AxiosResponse<any>;
    isLoading?: boolean;
}

export const List: React.FC<ListProps> = ({ isLoading, data }) => {
    if (isLoading) {
        return <span>loading</span>;
    }

    return <span>{JSON.stringify(data?.data)}</span>;
};
