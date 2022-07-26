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

export const ResourceComponentWrapper: React.FC<{ route: string }> = ({
    route,
}) => {
    const { catchAll } = useRefineContext();
    const { useParams } = useRouterContext();
    const { resources } = useResource();

    const { action, id } = useParams<ResourceRouterParams>();

    const resource = resources.find((res) => res.route === route);

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
                            params={{
                                resource,
                            }}
                        >
                            {!list ? (
                                catchAll ?? <ErrorComponent />
                            ) : (
                                <List
                                    name={name}
                                    canCreate={canCreate}
                                    canEdit={canEdit}
                                    canDelete={canDelete}
                                    canShow={canShow}
                                    options={options}
                                />
                            )}
                        </CanAccess>
                    );

                case "create":
                case "clone":
                    return (
                        <CanAccess
                            resource={name}
                            action="create"
                            fallback={catchAll ?? <ErrorComponent />}
                            params={{
                                id: id ? decodeURIComponent(id) : undefined,
                                resource,
                            }}
                        >
                            {!create ? (
                                catchAll ?? <ErrorComponent />
                            ) : (
                                <Create
                                    name={name}
                                    canCreate={canCreate}
                                    canEdit={canEdit}
                                    canDelete={canDelete}
                                    canShow={canShow}
                                    options={options}
                                />
                            )}
                        </CanAccess>
                    );

                case "edit":
                    return (
                        <CanAccess
                            resource={name}
                            action="edit"
                            params={{
                                id: id ? decodeURIComponent(id) : undefined,
                                resource,
                            }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            {!edit ? (
                                catchAll ?? <ErrorComponent />
                            ) : (
                                <Edit
                                    name={name}
                                    canCreate={canCreate}
                                    canEdit={canEdit}
                                    canDelete={canDelete}
                                    canShow={canShow}
                                    options={options}
                                />
                            )}
                        </CanAccess>
                    );

                case "show":
                    return (
                        <CanAccess
                            resource={name}
                            action="show"
                            params={{
                                id: id ? decodeURIComponent(id) : undefined,
                                resource,
                            }}
                            fallback={catchAll ?? <ErrorComponent />}
                        >
                            {!show ? (
                                catchAll ?? <ErrorComponent />
                            ) : (
                                <Show
                                    name={name}
                                    canCreate={canCreate}
                                    canEdit={canEdit}
                                    canDelete={canDelete}
                                    canShow={canShow}
                                    options={options}
                                />
                            )}
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
