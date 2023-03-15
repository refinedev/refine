import { useCallback } from "react";

import {
    BaseKey,
    IResourceItem,
    MetaDataQuery,
    RedirectAction,
} from "../../interfaces";
import { useNavigation } from "@hooks";

export type UseRedirectionAfterSubmissionType = () => (options: {
    redirect: RedirectAction;
    resource?: IResourceItem;
    id?: BaseKey;
    meta?: MetaDataQuery;
}) => void;

export const useRedirectionAfterSubmission: UseRedirectionAfterSubmissionType =
    () => {
        const { show, edit, list, create } = useNavigation();

        const handleSubmitWithRedirect = useCallback(
            ({
                redirect,
                resource,
                id,
                meta = {},
            }: {
                redirect: RedirectAction;
                resource?: IResourceItem;
                id?: BaseKey;
                meta?: MetaDataQuery;
            }) => {
                if (redirect && resource) {
                    if (!!resource.show && redirect === "show" && id) {
                        return show(resource, id, undefined, meta);
                    }

                    if (!!resource.edit && redirect === "edit" && id) {
                        return edit(resource, id, undefined, meta);
                    }

                    if (!!resource.create && redirect === "create") {
                        return create(resource, undefined, meta);
                    }

                    return list(resource, "push", meta);
                } else {
                    return;
                }
            },
            [],
        );

        return handleSubmitWithRedirect;
    };
