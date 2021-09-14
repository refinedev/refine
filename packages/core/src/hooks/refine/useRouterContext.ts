import { useContext } from "react";
import { RefineContext } from "@contexts/refine";

/**
 * `useTitle` returns a component that calls the `<Title>` passed to the `<Refine>`.
 * In this way, it becomes easier for us to access this component in various parts of the application.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/refine/useTitle} for more details.
 */
export const useRouterContext = () => {
    const { useHistory, useLocation, useParams, Prompt, Link } =
        useContext(RefineContext);

    return { useHistory, useLocation, useParams, Prompt, Link };
};
