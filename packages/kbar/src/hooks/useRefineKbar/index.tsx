import { useEffect, useState, useContext } from "react";

import {
    ResourceRouterParams,
    useRouterContext,
    useNavigation,
    useDelete,
    useTranslate,
    useResource,
    IResourceItem,
} from "@pankod/refine-core";
import {
    useRegisterActions,
    createAction,
    Action,
    KBarContext,
    VisualState,
} from "kbar";

enum RefineKbarActionType {
    List = "list",
    Create = "create",
    Show = "show",
    Edit = "edit",
    Delete = "delete",
}
// Capitalize first letter of each word
const capitalize = (str: string) =>
    str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
    );

export const useRefineKbar = (): void => {
    const t = useTranslate();
    const { resources } = useResource();
    const { useParams } = useRouterContext();
    const { mutate } = useDelete();
    const kbarContext = useContext(KBarContext);

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
        setActions(
            moveActionToFirst().flatMap((resource) => {
                return createActionWithResource(resource);
            }),
        );
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

    const createActionWithResource = (resource: IResourceItem) => {
        const {
            name,
            label,
            list,
            create,
            icon,
            show,
            canShow,
            canCreate,
            canDelete,
            canEdit,
            edit,
            route,
        } = resource;

        const resourceName = label ?? name;
        const tempActions: Action[] = [];
        if (
            list &&
            (resourceFromRoute !== name ||
                (actionFromRoute !== undefined && resourceFromRoute === name))
        ) {
            tempActions.push(
                createAction({
                    name: t(
                        `actions.list`,
                        capitalize(RefineKbarActionType.List),
                    ),
                    section: resourceName,
                    icon,
                    perform: () => {
                        goToList(route!);
                    },
                }),
            );
        }
        if (
            canCreate &&
            create &&
            (RefineKbarActionType.Create !== actionFromRoute ||
                resourceFromRoute !== name)
        ) {
            tempActions.push(
                createAction({
                    name: t(
                        `actions.create`,
                        capitalize(RefineKbarActionType.Create),
                    ),
                    section: resourceName,
                    icon,
                    keywords: "new",
                    perform: () => {
                        goToCreate(route!);
                    },
                }),
            );
        }
        if (resourceFromRoute === name && idFromRoute) {
            if (
                canShow &&
                show &&
                RefineKbarActionType.Show !== actionFromRoute
            ) {
                tempActions.push(
                    createAction({
                        name: t(
                            `actions.show`,
                            capitalize(RefineKbarActionType.Show),
                        ),
                        section: resourceName,
                        icon,
                        perform: () => {
                            goToShow(route!, idFromRoute);
                        },
                    }),
                );
            }
            if (
                canEdit &&
                edit &&
                RefineKbarActionType.Edit !== actionFromRoute
            ) {
                tempActions.push(
                    createAction({
                        name: t(
                            `actions.edit`,
                            capitalize(RefineKbarActionType.Edit),
                        ),
                        section: resourceName,
                        icon,
                        perform: () => {
                            goToEdit(route!, idFromRoute);
                        },
                    }),
                );
            }
            if (canDelete) {
                tempActions.push(
                    {
                        id: "delete",
                        name: t(
                            `actions.delete`,
                            capitalize(RefineKbarActionType.Delete),
                        ),
                        icon,
                        section: resourceName,
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
