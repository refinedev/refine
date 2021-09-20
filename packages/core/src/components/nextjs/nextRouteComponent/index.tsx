import React from "react";
import { useResource, useRouterContext } from "@hooks";
import { ResourceRouterParams } from "src/interfaces";

export const NextRouteComponent: React.FC = () => {
    const { resources } = useResource();
    const { useParams } = useRouterContext();
    const { resource: routeResourceName, action } =
        useParams<ResourceRouterParams>();

    console.log("NextRoute:: ", { action });

    const resource = resources.find((res) => res.name === routeResourceName);
    const {
        list,
        create,
        edit,
        show,
        name,
        canCreate,
        canEdit,
        canShow,
        canDelete,
    } = resource ?? {};

    const List = list ?? (() => null);
    const Create = create ?? (() => null);
    const Edit = edit ?? (() => null);
    const Show = show ?? (() => null);

    switch (action) {
        case undefined: {
            return (
                <List
                    name={name}
                    canCreate={canCreate}
                    canEdit={canEdit}
                    canDelete={canDelete}
                    canShow={canShow}
                />
            );
        }

        case "create": {
            return (
                <Create
                    name={name}
                    canCreate={canCreate}
                    canEdit={canEdit}
                    canDelete={canDelete}
                    canShow={canShow}
                />
            );
        }

        case "edit": {
            return (
                <Edit
                    name={name}
                    canCreate={canCreate}
                    canEdit={canEdit}
                    canDelete={canDelete}
                    canShow={canShow}
                />
            );
        }

        case "show": {
            return (
                <Show
                    name={name}
                    canCreate={canCreate}
                    canEdit={canEdit}
                    canDelete={canDelete}
                    canShow={canShow}
                />
            );
        }
    }
};
