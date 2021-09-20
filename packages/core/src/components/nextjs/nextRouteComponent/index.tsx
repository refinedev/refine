import React from "react";
import { useResource } from "@hooks";

export const NextRouteComponent: React.FC = () => {
    const { resources } = useResource();

    const resource = resources.find((res) => res.name === "users");
    const { list, name, canCreate, canEdit, canShow, canDelete } =
        resource ?? {};
    const List = list ?? (() => null);
    return (
        <List
            name={name}
            canCreate={canCreate}
            canEdit={canEdit}
            canDelete={canDelete}
            canShow={canShow}
        />
    );
};
