import { useCallback } from "react";

import { BaseKey, IResourceItem } from "../../interfaces";
import { useNavigation } from "@hooks";

export type UseRedirectionAfterSubmissionType = () => (options: {
    redirect: "show" | "list" | "edit" | "create" | false;
    resource: IResourceItem;
    id?: BaseKey;
}) => void;

export const useRedirectionAfterSubmission: UseRedirectionAfterSubmissionType =
    () => {
        const { show, edit, list, create } = useNavigation();

        const handleSubmitWithRedirect = useCallback(
            ({
                redirect,
                resource,
                id,
            }: {
                redirect: "show" | "list" | "edit" | "create" | false;
                resource: IResourceItem;
                id?: BaseKey;
            }) => {
                const localStorageredirectUrl = localStorage.getItem(
                    `refine-table-sync-with-location-${resource.route}`,
                );
                const redirectListUrl =
                    localStorageredirectUrl && localStorageredirectUrl !== null
                        ? localStorageredirectUrl.substring(1)
                        : resource.route;

                if (redirect && resource.route) {
                    if (resource.canShow && redirect === "show" && id) {
                        return show(resource.route, id);
                    }

                    if (resource.canEdit && redirect === "edit" && id) {
                        return edit(resource.route, id);
                    }

                    if (resource.canCreate && redirect === "create") {
                        return create(resource.route);
                    }

                    return list(redirectListUrl ?? resource.route, "push");
                } else {
                    return;
                }
            },
            [],
        );

        return handleSubmitWithRedirect;
    };
