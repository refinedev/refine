import {
    ResourceRouterParams,
    useRouterContext,
    useResourceWithRoute,
    useNavigation,
    useDelete,
    useTranslate,
} from "@pankod/refine-core";
import { useRegisterActions, createAction, Action } from "kbar";

export type useRefineKbarActionsProps = {
    resource?: string;
};

export const useRefineKbarActions = ({
    resource,
}: useRefineKbarActionsProps = {}): void => {
    const t = useTranslate();
    const { useParams } = useRouterContext();
    const resourceWithRoute = useResourceWithRoute();
    const {
        list: goToList,
        create: goToCreate,
        show: goToShow,
        edit: goToEdit,
    } = useNavigation();

    const { resource: resourceFromRoute, id: idFromRoute } =
        useParams<ResourceRouterParams>();
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
    } = resourceWithRoute(resource ?? resourceFromRoute);

    const createActionWithResource = (): Action[] => {
        const actions: Action[] = [];
        const resourceName = label ?? name;

        if (list) {
            actions.push(
                createAction({
                    name: t(`actions.list`, "List"),
                    section: resourceName,
                    icon,
                    perform: () => {
                        goToList(resourceName);
                    },
                }),
            );
        }
        if (canCreate && create) {
            actions.push(
                createAction({
                    name: t(`actions.create`, "Create"),
                    section: resourceName,
                    icon,
                    keywords: "new",
                    perform: () => {
                        goToCreate(resourceName);
                    },
                }),
            );
        }
        if (resourceFromRoute === name && idFromRoute) {
            if (canShow && show) {
                actions.push(
                    createAction({
                        name: t(`actions.show`, "Show"),
                        section: resourceName,
                        icon,
                        perform: () => {
                            goToShow(resourceName, idFromRoute);
                        },
                    }),
                );
            }
            if (canEdit && edit) {
                actions.push(
                    createAction({
                        name: t(`actions.edit`, "Edit"),
                        section: resourceName,
                        icon,
                        perform: () => {
                            goToEdit(resourceName, idFromRoute);
                        },
                    }),
                );
            }
            if (canDelete) {
                const { mutate } = useDelete();

                actions.push(
                    createAction({
                        name: t(`buttons.delete`, "Delete"),
                        section: resourceName,
                        icon,
                        perform: () => {
                            mutate(
                                {
                                    resource: resourceName,
                                    id: idFromRoute,
                                },
                                {
                                    onSuccess: () => {
                                        goToList(resourceName);
                                    },
                                },
                            );
                        },
                    }),
                );
            }
        }

        return actions;
    };

    useRegisterActions(createActionWithResource());
};
