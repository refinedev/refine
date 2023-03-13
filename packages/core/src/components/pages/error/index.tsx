import React, { useEffect, useState } from "react";

import {
    useNavigation,
    useTranslate,
    useResource,
    useGo,
    useRouterType,
} from "@hooks";

/**
 * When the app is navigated to a non-existent route, refine shows a default error page.
 * A custom error component can be used for this error page.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#catchall} for more details.
 */
export const ErrorComponent: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const translate = useTranslate();
    const { push } = useNavigation();
    const go = useGo();
    const routerType = useRouterType();

    const { resource, action } = useResource();

    useEffect(() => {
        if (resource && action) {
            setErrorMessage(
                translate(
                    "pages.error.info",
                    {
                        action: action,
                        resource: resource?.name,
                    },
                    `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
                ),
            );
        }
    }, [resource, action]);

    return (
        <>
            <h1>
                {translate(
                    "pages.error.404",
                    undefined,
                    "Sorry, the page you visited does not exist.",
                )}
            </h1>
            {errorMessage && <p>{errorMessage}</p>}
            <button
                onClick={() => {
                    if (routerType === "legacy") {
                        push("/");
                    } else {
                        go({ to: "/" });
                    }
                }}
            >
                {translate("pages.error.backHome", undefined, "Back Home")}
            </button>
        </>
    );
};
