import { useCallback } from "react";

import { BaseKey, IResourceItem } from "../../interfaces";
import { useNavigation } from "@hooks";

export type UseRedirectionAfterSubmissionType = () => (options: {
    redirect: "show" | "list" | "edit" | false;
    resource: IResourceItem;
    id?: BaseKey;
}) => void;

export const useRedirectionAfterSubmission: UseRedirectionAfterSubmissionType =
    () => {
        const { show, edit, list } = useNavigation();

        const handleSubmitWithRedirect = useCallback(
            ({
                redirect,
                resource,
                id,
            }: {
                redirect: "show" | "list" | "edit" | false;
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

                    return list(resource.route, "push");
                } else {
                    return;
                }
            },
            [],
        );

        return handleSubmitWithRedirect;
    };
