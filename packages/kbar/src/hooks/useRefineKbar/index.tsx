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
            console.log(
                "actions",
                actions.flatMap((action) => action),
            );

            return setActions(actions.flatMap((action) => action));
        });
    }, [resources, idFromRoute, resourceFromRoute, actionFromRoute]);

    useEffect(() => {
        if (actions.length === 0) {
            kbarContext.query.setVisualState(VisualState.hidden);
        }
    }, [actions]);

    const moveActionToFirst = (): IResourceItem[] => {
        const fromIndex = resources?.findIndex(
            (resource) => resource.name === resourceFromRoute,
        );

        if (fromIndex > 0) {
            const element = resources[fromIndex];
            resources.splice(fromIndex, 1);
            resources.splice(0, 0, element);
        }

        return resources;
    };

    const createActionWithResource = async (resource: IResourceItem) => {
        const {
            name,
            label,
            list,
            create,
            icon,
            show,
            canDelete,
            edit,
            route,
        } = resource;

        const resourceName = label ?? name;
        const tempActions: Action[] = [];
        const section = t(`${resourceName}.${resourceName}`, resourceName);

        if (
            list &&
            ((resourceFromRoute !== undefined && resourceFromRoute !== name) ||
                (actionFromRoute !== undefined && resourceFromRoute === name))
        ) {
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
        if (
            create &&
            (RefineKbarActionType.Create !== actionFromRoute ||
                resourceFromRoute !== name)
        ) {
            const { can: canCreate } = (await can?.({
                resource: name,
                action: RefineKbarActionType.Create,
            })) || { can: true };

            if (canCreate) {
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
            if (show && RefineKbarActionType.Show !== actionFromRoute) {
                const { can: canShow } = (await can?.({
                    resource: name,
                    action: RefineKbarActionType.Show,
                    params: { id: idFromRoute },
                })) || { can: true };

                if (canShow) {
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
            if (edit && RefineKbarActionType.Edit !== actionFromRoute) {
                const { can: canEdit } = (await can?.({
                    resource: name,
                    action: RefineKbarActionType.Show,
                    params: { id: idFromRoute },
                })) || { can: true };
                if (canEdit) {
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
                                    resource: resourceName,
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
        return tempActions;
    };
    useRegisterActions(actions, [actions]);
};
