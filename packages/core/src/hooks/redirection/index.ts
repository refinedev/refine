import { useCallback, ReactText } from "react";
import { IResourceItem } from "@contexts/resource";
import { useNavigation } from "@hooks/navigation";

export const useRedirectionAfterSubmission = () => {
    const { show, edit, list } = useNavigation();

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
            if (redirect && resource.route) {
                if (resource.canShow && redirect === "show") {
                    return show(resource.route, "push", idFromRoute);
                }

                if (resource.canEdit && redirect === "edit") {
                    return edit(resource.route, "push", idFromRoute);
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
