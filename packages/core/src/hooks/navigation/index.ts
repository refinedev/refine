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

    const handleUrl = (url: string, type: HistoryType = "push") => {
        type === "push" ? history.push(url) : history.replace(url);
    };

    const createUrl = (resource: string) => {
        const resourceName = resourceWithRoute(resource);
        return `/${resourceName.route}/create`;
    };

    const editUrl = (resource: string, id: BaseKey) => {
        const resourceName = resourceWithRoute(resource);
        const encodedId = encodeURIComponent(id);

        return `/${resourceName.route}/edit/${encodedId}`;
    };

    const cloneUrl = (resource: string, id: BaseKey) => {
        const resourceName = resourceWithRoute(resource);
        const encodedId = encodeURIComponent(id);
        return `/${resourceName.route}/clone/${encodedId}`;
    };

    const showUrl = (resource: string, id: BaseKey) => {
        const resourceName = resourceWithRoute(resource);
        const encodedId = encodeURIComponent(id);
        return `/${resourceName.route}/show/${encodedId}`;
    };

    const listUrl = (resource: string) => {
        const resourceName = resourceWithRoute(resource);
        return `/${resourceName.route}`;
    };

    const create = (resource: string, type: HistoryType = "push") => {
        handleUrl(createUrl(resource), type);
    };

    const edit = (
        resource: string,
        id: BaseKey,
        type: HistoryType = "push",
    ) => {
        handleUrl(editUrl(resource, id), type);
    };

    const clone = (
        resource: string,
        id: BaseKey,
        type: HistoryType = "push",
    ) => {
        handleUrl(cloneUrl(resource, id), type);
    };

    const show = (
        resource: string,
        id: BaseKey,
        type: HistoryType = "push",
    ) => {
        handleUrl(showUrl(resource, id), type);
    };

    const list = (resource: string, type: HistoryType = "push") => {
        handleUrl(listUrl(resource), type);
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

    return {
        create,
        createUrl,
        edit,
        editUrl,
        clone,
        cloneUrl,
        show,
        showUrl,
        list,
        listUrl,
        push,
        replace,
        goBack,
    };
};
