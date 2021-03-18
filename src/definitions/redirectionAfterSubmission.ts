import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const redirectionAfterSubmission = () => {
    const history = useHistory();

    const handleSubmitWithRedirect = useCallback(
        ({ redirect, resource, idFromRoute }: any) => {
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
