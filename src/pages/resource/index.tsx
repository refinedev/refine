import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { DataContext, DataContextProps } from "@contexts/data";

export const ResourcePage: React.FC = () => {
    const { resourceName } = useParams<Record<string, string | undefined>>();
    const { getList } = useContext<DataContextProps>(DataContext);

    getList("post", {}).then((data) => {
        console.log("data", data);
    });

    return <span>resource page {resourceName}</span>;
};
