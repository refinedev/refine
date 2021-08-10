import { useHistory } from "react-router-dom";

import { useResourceWithRoute } from "@hooks";

export type HistoryType = "push" | "replace";

/**
 * `refine` uses {@link https://reactrouter.com/web/api/Hooks `React Router`} and comes with all redirects out of the box.
 * It allows you to manage your routing operations in refine.
 * Using this hook, you can manage all the routing operations of your application very easily.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation} for more details.
 */
export const useNavigation = () => {
    const history = useHistory();
    const resourceWithRoute = useResourceWithRoute();

    const create = (resource: string, type: HistoryType = "push") => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/${resourceName.route}/create`)
            : history.replace(`/${resourceName.route}/create`);
    };

    const edit = (resource: string, id: string, type: HistoryType = "push") => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/${resourceName.route}/edit/${id}`)
            : history.replace(`/${resourceName.route}/edit/${id}`);
    };

    const clone = (
        resource: string,
        id: string,
        type: HistoryType = "push",
    ) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/${resourceName.route}/create/${id}`)
            : history.replace(`/${resourceName.route}/create/${id}`);
    };

    const show = (resource: string, id: string, type: HistoryType = "push") => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/${resourceName.route}/show/${id}`)
            : history.replace(`/${resourceName.route}/show/${id}`);
    };

    const list = (resource: string, type: HistoryType = "push") => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/${resourceName.route}`)
            : history.replace(`/${resourceName.route}`);
    };

    const push = (path: string, state?: unknown) => {
        history.push(path, state);
    };

    const replace = (path: string, state?: unknown) => {
        history.replace(path, state);
    };

    const goBack = () => {
        history.goBack();
    };

    return { create, edit, clone, show, list, push, replace, goBack };
};
