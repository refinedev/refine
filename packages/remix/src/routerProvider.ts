import { handleUseParams, IRouterProvider } from "@pankod/refine-core";

import { Prompt } from "./prompt";
import { Link, useLocation, useNavigate, useParams } from "@remix-run/react";

export const RouterProvider: IRouterProvider = {
    useHistory: () => {
        const navigate = useNavigate();

        return {
            push: navigate,
            replace: (path: string) => {
                navigate(path, { replace: true });
            },
            goBack: () => {
                navigate(-1);
            },
        };
    },
    useLocation: () => {
        const location = useLocation();
        console.log({ location });

        return location;
    },
    useParams: () => {
        const params = useParams();
        console.log({ params });
        return handleUseParams(params);
    },
    Prompt,
    Link,
};
