import { useEffect, useState, useContext } from "react";
import {
    ResourceRouterParams,
    useRouterContext,
    useNavigation,
    useDelete,
    useTranslate,
    useResource,
    IResourceItem,
    useCanWithoutCache,
    userFriendlyResourceName,
} from "@pankod/refine-core";
import {
    useRegisterActions,
    createAction,
    Action,
    KBarContext,
    VisualState,
} from "kbar";

import { capitalize } from "@definitions";

enum RefineKbarActionType {
    List = "list",
    Create = "create",
    Show = "show",
    Edit = "edit",
    Delete = "delete",
}

export const useRefineKbar = (): void => {
    const t = useTranslate();
    const { resources } = useResource();
    const { useParams } = useRouterContext();
    const { mutate } = useDelete();
    const kbarContext = useContext(KBarContext);

    const { can } = useCanWithoutCache();

    const {
        resource: resourceFromRoute,
        action: actionFromRoute,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const [actions, setActions] = useState<Action[]>([]);

    const {
        list: goToList,
        create: goToCreate,
        show: goToShow,
        edit: goToEdit,
    } = useNavigation();

    useEffect(() => {
        const preaparedActions = async () => {
            return await Promise.all(
                moveActionToFirst().flatMap((resource) => {
                    return createActionWithResource(resource);
                }),
            );
        };

        preaparedActions().then((actions) => {
            return setActions(actions.flatMap((action) => action));
        });
    }, [resources, idFromRoute, resourceFromRoute, actionFromRoute]);

    useEffect(() => {
        if (actions.length === 0) {
            kbarContext.query.setVisualState(VisualState.hidden);
        }
    }, [actions]);

    const moveActionToFirst = (): IResourceItem[] => {
        const orderedResources = [...resources];
        const fromIndex = orderedResources?.findIndex(
            (resource) => resource.name === resourceFromRoute,
        );

        if (fromIndex > 0) {
            const element = orderedResources[fromIndex];
            orderedResources.splice(fromIndex, 1);
            orderedResources.splice(0, 0, element);
        }

        return orderedResources;
    };

    const createActionWithResource = async (resource: IResourceItem) => {
        const {
            name,
            label,
            list,
            create,
            canCreate,
            canEdit,
            canShow,
            icon,
            show,
            canDelete,
            edit,
            route,
        } = resource;

        const section =
            label ??
            t(
                `${resource.name}.${resource.name}`,
                userFriendlyResourceName(resource.name, "plural"),
            );
        const tempActions: Action[] = [];

        if (
            list &&
            ((resourceFromRoute !== undefined && resourceFromRoute !== name) ||
                (actionFromRoute !== undefined && resourceFromRoute === name))
        ) {
            const { can: canList } = (await can?.({
                resource: name,
                action: RefineKbarActionType.Show,
                params: { id: idFromRoute, resource },
            })) || { can: true };
            if (canList) {
                tempActions.push(
                    createAction({
                        name: t(
                            `actions.list`,
                            capitalize(RefineKbarActionType.List),
                        ),
                        section,
                        icon,
                        perform: () => {
                            goToList(route!);
                        },
                    }),
                );
            }
        }
        if (
            canCreate &&
            create &&
            (RefineKbarActionType.Create !== actionFromRoute ||
                resourceFromRoute !== name)
        ) {
            const { can: canAccessCreate } = (await can?.({
                resource: name,
                action: RefineKbarActionType.Create,
                params: { resource },
            })) || { can: true };

            if (canAccessCreate) {
                tempActions.push(
                    createAction({
                        name: t(
                            `actions.create`,
                            capitalize(RefineKbarActionType.Create),
                        ),
                        section,
                        icon,
                        keywords: "new",
                        perform: () => {
                            goToCreate(route!);
                        },
                    }),
                );
            }
        }

        if (resourceFromRoute === name && idFromRoute) {
            if (
                canShow &&
                show &&
                RefineKbarActionType.Show !== actionFromRoute
            ) {
                const { can: canAccessShow } = (await can?.({
                    resource: name,
                    action: RefineKbarActionType.Show,
                    params: { id: idFromRoute, resource },
                })) || { can: true };

                if (canAccessShow) {
                    tempActions.push(
                        createAction({
                            name: t(
                                `actions.show`,
                                capitalize(RefineKbarActionType.Show),
                            ),
                            section,
                            icon,
                            perform: () => {
                                goToShow(route!, idFromRoute);
                            },
                        }),
                    );
                }
            }
            if (
                canEdit &&
                edit &&
                RefineKbarActionType.Edit !== actionFromRoute
            ) {
                const { can: canAccessEdit } = (await can?.({
                    resource: name,
                    action: RefineKbarActionType.Show,
                    params: { id: idFromRoute, resource },
                })) || { can: true };
                if (canAccessEdit) {
                    tempActions.push(
                        createAction({
                            name: t(
                                `actions.edit`,
                                capitalize(RefineKbarActionType.Edit),
                            ),
                            section,
                            icon,
                            perform: () => {
                                goToEdit(route!, idFromRoute);
                            },
                        }),
                    );
                }
            }
            if (canDelete) {
                const { can: canAccessDelete } = (await can?.({
                    resource: name,
                    action: RefineKbarActionType.Show,
                    params: { id: idFromRoute, resource },
                })) || { can: true };
                if (canAccessDelete) {
                    tempActions.push(
                        {
                            id: "delete",
                            name: t(
                                `actions.delete`,
                                capitalize(RefineKbarActionType.Delete),
                            ),
                            section,
                            icon,
                        },
                        createAction({
                            name: t(
                                `buttons.delete`,
                                capitalize(RefineKbarActionType.Delete),
                            ),
                            section: t(`buttons.confirm`, "Are you sure?"),
                            parent: "delete",
                            perform: () => {
                                mutate(
                                    {
                                        resource: resource.name,
                                        id: idFromRoute,
                                    },
                                    {
                                        onSuccess: () => {
                                            goToList(route!);
                                        },
                                    },
                                );
                            },
                        }),
                        createAction({
                            name: t(`buttons.cancel`, "Cancel"),
                            parent: "delete",
                            perform: () => null,
                        }),
                    );
                }
            }
        }
        return tempActions;
    };
    useRegisterActions(actions, [actions]);
};
