import React, { useContext } from "react";
import { useResource, useRouterContext } from "@hooks";
import { IRefineContext, ResourceRouterParams } from "src/interfaces";
import { LayoutWrapper } from "@components";
import { RefineContext } from "@contexts/refine";

export const NextRouteComponent: React.FC = (props) => {
    const { resources } = useResource();
    const { useParams, useLocation } = useRouterContext();
    const { resource: routeResourceName, action } =
        useParams<ResourceRouterParams>();
    const { pathname } = useLocation();

    const { customRoutes } = useContext<IRefineContext>(RefineContext);

    const resource = resources.find(
        (res) => res.route === (routeResourceName ?? pathname.substring(1)),
    );

    if (resource) {
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
        } = resource;

        const List = list ?? (() => null);
        const Create = create ?? (() => null);
        const Edit = edit ?? (() => null);
        const Show = show ?? (() => null);

        const renderCrud = () => {
            switch (action) {
                case undefined: {
                    return (
                        <List
                            name={name}
                            canCreate={canCreate}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canShow={canShow}
                            initialData={props}
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

        return <LayoutWrapper>{renderCrud()}</LayoutWrapper>;
    } else {
        const route = customRoutes.find((r) => r.path === routeResourceName);
        const Route = route
            ? (route.component as any) ??
              (() => "No component for this custom route found")
            : () => "No custom route found";
        return <Route />;
    }

    return null;
};
