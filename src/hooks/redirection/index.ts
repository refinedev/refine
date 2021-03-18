import { useCallback, ReactText } from "react";
import { useHistory } from "react-router-dom";
import { IResourceItem } from "@contexts/resource";

export const useRedirectionAfterSubmission = () => {
    const history = useHistory();

    const handleSubmitWithRedirect = useCallback(
        ({
            redirect,
            resource,
            idFromRoute,
        }: {
            redirect: "show" | "list" | "edit" | false;
            resource: IResourceItem;
            idFromRoute: string | ReactText;
        }) => {
            if (redirect) {
                if (resource.canShow && redirect === "show") {
                    return history.push(
                        `/resources/${resource.route}/show/${idFromRoute}`,
                    );
                }

                if (resource.canEdit && redirect === "edit") {
                    return history.push(
                        `/resources/${resource.route}/edit/${idFromRoute}`,
                    );
                }

                return history.push(`/resources/${resource.route}`);
            } else {
                return;
            }
        },
        [],
    );

    return handleSubmitWithRedirect;
};
