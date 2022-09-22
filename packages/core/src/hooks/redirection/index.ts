import { useCallback } from "react";

import { BaseKey, IResourceItem, RedirectAction } from "../../interfaces";
import { useNavigation } from "@hooks";

export type UseRedirectionAfterSubmissionType = () => (options: {
    redirect: RedirectAction;
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
                redirect: RedirectAction;
                resource: IResourceItem;
                id?: BaseKey;
            }) => {
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

                    return list(resource.route, "push");
                } else {
                    return;
                }
            },
            [],
        );

        return handleSubmitWithRedirect;
    };
