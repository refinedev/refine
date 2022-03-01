import { useResourceWithRoute, useRouterContext } from "@hooks";
import { BaseKey } from "../../interfaces";

export type HistoryType = "push" | "replace";

/**
 * `refine` uses {@link https://reactrouter.com/web/api/Hooks `React Router`} and comes with all redirects out of the box.
 * It allows you to manage your routing operations in refine.
 * Using this hook, you can manage all the routing operations of your application very easily.
 *
 * @see {@link https://refine.dev/docs/core/hooks/navigation/useNavigation} for more details.
 */
export const useNavigation = () => {
    const { useHistory } = useRouterContext();
    const history = useHistory();
    const resourceWithRoute = useResourceWithRoute();

    const create = (resource: string, type: HistoryType = "push") => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/${resourceName.route}/create`)
            : history.replace(`/${resourceName.route}/create`);
    };

    const edit = (
        resource: string,
        id: BaseKey,
        type: HistoryType = "push",
    ) => {
        const resourceName = resourceWithRoute(resource);

        const encodedId = encodeURIComponent(id);

        type === "push"
            ? history.push(`/${resourceName.route}/edit/${encodedId}`)
            : history.replace(`/${resourceName.route}/edit/${encodedId}`);
    };

    const clone = (
        resource: string,
        id: BaseKey,
        type: HistoryType = "push",
    ) => {
        const resourceName = resourceWithRoute(resource);

        const encodedId = encodeURIComponent(id);

        type === "push"
            ? history.push(`/${resourceName.route}/clone/${encodedId}`)
            : history.replace(`/${resourceName.route}/clone/${encodedId}`);
    };

    const show = (
        resource: string,
        id: BaseKey,
        type: HistoryType = "push",
    ) => {
        const resourceName = resourceWithRoute(resource);

        const encodedId = encodeURIComponent(id);

        type === "push"
            ? history.push(`/${resourceName.route}/show/${encodedId}`)
            : history.replace(`/${resourceName.route}/show/${encodedId}`);
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
