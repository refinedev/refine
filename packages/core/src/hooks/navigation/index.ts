import { useHistory } from "react-router-dom";

import { useResourceWithRoute } from "@hooks";

export type HistoryType = "push" | "replace";

export const useNavigation = () => {
    const history = useHistory();
    const resourceWithRoute = useResourceWithRoute();

    const create = (resource: string, type: HistoryType) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/resources/${resourceName.route}/create`)
            : history.replace(`/resources/${resourceName.route}/create`);
    };

    const edit = (resource: string, type: HistoryType, id: number | string) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/resources/${resourceName.route}/edit/${id}`)
            : history.replace(`/resources/${resourceName.route}/edit/${id}`);
    };

    const show = (resource: string, type: HistoryType, id: number | string) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/resources/${resourceName.route}/show/${id}`)
            : history.replace(`/resources/${resourceName.route}/show/${id}`);
    };

    const list = (resource: string, type: HistoryType) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/resources/${resourceName.route}`)
            : history.replace(`/resources/${resourceName.route}`);
    };

    const push = (path: any) => {
        history.push(`${path}`);
    };

    const replace = (path: any) => {
        history.replace(`${path}`);
    };

    return { create, edit, show, list, push, replace };
};
