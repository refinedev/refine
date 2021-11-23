/* eslint-disable react/display-name */
import React from "react";
import {
    ErrorComponent,
    LayoutWrapper,
    useResource,
    useRefineContext,
    useRouterContext,
    ResourceRouterParams,
} from "@pankod/refine";

export const ResourceComponentWrapper: React.FC = () => {
    const { catchAll } = useRefineContext();
    const { useParams } = useRouterContext();
    const { resources } = useResource();

    const { resource: routeResourceName, action } =
        useParams<ResourceRouterParams>();

    const resource = resources.find((res) => res.route === routeResourceName);

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
                        />
                    );
                }

                case "create":
                case "clone": {
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
    }

    return catchAll ? (
        <>{catchAll}</>
    ) : (
        <LayoutWrapper>
            <ErrorComponent />
        </LayoutWrapper>
    );
};
