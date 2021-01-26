import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { DataContext, IDataContext } from "@contexts/data";

export const ResourcePage: React.FC = () => {
    const { resourceName } = useParams<Record<string, string>>();
    const { getList } = useContext<IDataContext>(DataContext);

    getList(resourceName, {
        pagination: {
            page: 1,
            perPage: 10,
        },
        sort: {
            field: "id",
            order: "DESC",
        },
    }).then((data) => {
        console.log("data", data);
    });

    return <span>resource page {resourceName}</span>;
};
