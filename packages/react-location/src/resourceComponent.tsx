/* eslint-disable react/display-name */
import React from "react";
import {
    ErrorComponent,
    LayoutWrapper,
    useResource,
    useRefineContext,
    useRouterContext,
    ResourceRouterParams,
    CanAccess,
} from "@pankod/refine-core";

export const ResourceComponentWrapper: React.FC<{ optionParam?: any }> = ({
    optionParam,
}) => {
    const { catchAll } = useRefineContext();
    const { useParams } = useRouterContext();
    const { resources } = useResource();

    const {
        resource: routeResourceName,
        action,
        id,
    } = useParams<ResourceRouterParams>();

    // console.log("resources", resources);
    // console.log("routeResourceName", routeResourceName);
    // console.log("optionParam", optionParam);

    const resourceName = optionParam ? optionParam.name : routeResourceName;

    const resource = resources.find((res) => res.name === resourceName);

    console.log("resource", resource);

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
            options,
        } = resource;

        console.log("name", name);

        const List = list ?? (() => null);
        const Create = create ?? (() => null);
        const Edit = edit ?? (() => null);
        const Show = show ?? (() => null);

        const renderCrud = () => {
            switch (action) {
                default:
                    return (
                        <CanAccess
                            resource={name}
                            action="list"
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <List
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );

                case "create":
                case "clone":
                    return (
                        <CanAccess
                            resource={name}
                            action="create"
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Create
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );

                case "edit":
                    return (
                        <CanAccess
                            resource={name}
                            action="edit"
                            params={{ id }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Edit
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );

                case "show":
                    return (
                        <CanAccess
                            resource={name}
                            action="show"
                            params={{ id }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            <Show
                                name={name}
                                canCreate={canCreate}
                                canEdit={canEdit}
                                canDelete={canDelete}
                                canShow={canShow}
                                options={options}
                            />
                        </CanAccess>
                    );
            }
        };

        return renderCrud();
    }

    return catchAll ? (
        <>{catchAll}</>
    ) : (
        <LayoutWrapper>
            <ErrorComponent />
        </LayoutWrapper>
    );
};
