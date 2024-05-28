import { useEffect, useState, useContext } from "react";
import {
  useNavigation,
  useDelete,
  useTranslate,
  useResource,
  type IResourceItem,
  useCanWithoutCache,
  useUserFriendlyName,
  useRouterType,
  useGo,
} from "@refinedev/core";
import {
  useRegisterActions,
  createAction,
  type Action,
  KBarContext,
  VisualState,
} from "kbar";

import { capitalize } from "@definitions";
import { useGetToPath } from "@refinedev/core";

enum RefineKbarActionType {
  List = "list",
  Create = "create",
  Show = "show",
  Edit = "edit",
  Delete = "delete",
}

export const useRefineKbar = (): void => {
  const t = useTranslate();
  const {
    resource: resourceFromParams,
    resources,
    id: idFromParams,
    action: actionFromParams,
  } = useResource();
  const routerType = useRouterType();
  const getToPath = useGetToPath();
  const go = useGo();
  const { mutate } = useDelete();
  const {
    push,
    list: goToList,
    create: goToCreate,
    show: goToShow,
    edit: goToEdit,
  } = useNavigation();
  const getUserFriendlyName = useUserFriendlyName();

  const kbarContext = useContext(KBarContext);

  const { can } = useCanWithoutCache();

  const [actions, setActions] = useState<Action[]>([]);

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
  }, [resources, idFromParams, resourceFromParams, actionFromParams]);

  useEffect(() => {
    if (actions.length === 0) {
      kbarContext.query.setVisualState(VisualState.hidden);
    }
  }, [actions]);

  const moveActionToFirst = (): IResourceItem[] => {
    const orderedResources = [...resources];
    const fromIndex = orderedResources?.findIndex(
      (resource) =>
        (resource.identifier ?? resource?.name) ===
        (resourceFromParams?.identifier ?? resourceFromParams?.name),
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
      label: deprecatedLabel,
      list,
      create,
      canCreate,
      canEdit,
      canShow,
      icon: deprecatedIcon,
      show,
      canDelete: deprecatedCanDelete,
      edit,
      route,
    } = resource;

    const label =
      resource?.meta?.label ?? resource?.options?.label ?? deprecatedLabel;

    const icon =
      resource?.meta?.icon ?? resource?.options?.icon ?? deprecatedIcon;

    const canDelete =
      resource?.meta?.canDelete ??
      resource?.options?.canDelete ??
      deprecatedCanDelete;

    const section =
      label ??
      t(
        `${resource.name}.${resource.name}`,
        getUserFriendlyName(resource.name, "plural"),
      );
    const tempActions: Action[] = [];

    if (
      list &&
      ((resourceFromParams !== undefined &&
        resourceFromParams?.name !== name) ||
        (actionFromParams !== undefined && resourceFromParams?.name === name))
    ) {
      const { can: canList } = (await can?.({
        resource: name,
        action: RefineKbarActionType.List,
        params: { id: idFromParams, resource },
      })) || { can: true };
      if (canList) {
        tempActions.push(
          createAction({
            name: t("actions.list", capitalize(RefineKbarActionType.List)),
            section,
            icon,
            perform: () => {
              const p = getToPath({
                resource,
                action: "list",
                legacy: routerType === "legacy",
              });

              if (p) {
                if (routerType === "legacy") {
                  push(p);
                } else {
                  go({ to: p });
                }
              }
            },
          }),
        );
      }
    }
    if (
      (canCreate || !!create) &&
      create &&
      (RefineKbarActionType.Create !== actionFromParams ||
        resourceFromParams?.name !== name)
    ) {
      const { can: canAccessCreate } = (await can?.({
        resource: name,
        action: RefineKbarActionType.Create,
        params: { resource },
      })) || { can: true };

      if (canAccessCreate) {
        tempActions.push(
          createAction({
            name: t("actions.create", capitalize(RefineKbarActionType.Create)),
            section,
            icon,
            keywords: "new",
            perform: () => {
              const p = getToPath({
                resource,
                action: "create",
                legacy: routerType === "legacy",
              });

              if (p) {
                if (routerType === "legacy") {
                  push(p);
                } else {
                  go({ to: p });
                }
              }
            },
          }),
        );
      }
    }

    if (resourceFromParams?.name === name && idFromParams) {
      if (
        (canShow || !!show) &&
        show &&
        RefineKbarActionType.Show !== actionFromParams
      ) {
        const { can: canAccessShow } = (await can?.({
          resource: name,
          action: RefineKbarActionType.Show,
          params: { id: idFromParams, resource },
        })) || { can: true };

        if (canAccessShow) {
          tempActions.push(
            createAction({
              name: t("actions.show", capitalize(RefineKbarActionType.Show)),
              section,
              icon,
              perform: () => {
                const p = getToPath({
                  resource,
                  action: "show",
                  legacy: routerType === "legacy",
                  meta: {
                    id: idFromParams,
                  },
                });

                if (p) {
                  if (routerType === "legacy") {
                    push(p);
                  } else {
                    go({ to: p });
                  }
                }
              },
            }),
          );
        }
      }
      if (
        (canEdit || !!edit) &&
        edit &&
        RefineKbarActionType.Edit !== actionFromParams
      ) {
        const { can: canAccessEdit } = (await can?.({
          resource: name,
          action: RefineKbarActionType.Edit,
          params: { id: idFromParams, resource },
        })) || { can: true };
        if (canAccessEdit) {
          tempActions.push(
            createAction({
              name: t("actions.edit", capitalize(RefineKbarActionType.Edit)),
              section,
              icon,
              perform: () => {
                const p = getToPath({
                  resource,
                  action: "edit",
                  legacy: routerType === "legacy",
                  meta: {
                    id: idFromParams,
                  },
                });

                if (p) {
                  if (routerType === "legacy") {
                    push(p);
                  } else {
                    go({ to: p });
                  }
                }
              },
            }),
          );
        }
      }
      if (canDelete) {
        const { can: canAccessDelete } = (await can?.({
          resource: name,
          action: RefineKbarActionType.Delete,
          params: { id: idFromParams, resource },
        })) || { can: true };
        if (canAccessDelete) {
          tempActions.push(
            {
              id: "delete",
              name: t(
                "actions.delete",
                capitalize(RefineKbarActionType.Delete),
              ),
              section,
              icon,
            },
            createAction({
              name: t(
                "buttons.delete",
                capitalize(RefineKbarActionType.Delete),
              ),
              section: t("buttons.confirm", "Are you sure?"),
              parent: "delete",
              perform: () => {
                mutate(
                  {
                    resource: resource.name,
                    id: idFromParams,
                  },
                  {
                    onSuccess: () => {
                      const p = getToPath({
                        resource,
                        action: "list",
                        legacy: routerType === "legacy",
                      });

                      if (p) {
                        if (routerType === "legacy") {
                          push(p);
                        } else {
                          go({ to: p });
                        }
                      }
                    },
                  },
                );
              },
            }),
            createAction({
              name: t("buttons.cancel", "Cancel"),
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
