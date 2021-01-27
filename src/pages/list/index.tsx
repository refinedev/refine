import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";

import { DataContext, IDataContext } from "@contexts/data";

export const ListPage: React.FC = () => {
    const { resourceName } = useParams<Record<string, string>>();
    const { getList } = useContext<IDataContext>(DataContext);

    const { data, isLoading } = useQuery(`resourceList-${resourceName}`, () =>
        getList(resourceName, {
            pagination: {
                page: 1,
                perPage: 10,
            },
            sort: {
                field: "id",
                order: "desc",
            },
        }),
    );

    if (isLoading) return <span>loading</span>;

    return (
        <div>
            <Link to={`/resources/${resourceName}/create`}>Create</Link>
            <span>{JSON.stringify(data?.data)}</span>
        </div>
    );
};
