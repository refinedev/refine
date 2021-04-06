import { useHistory } from "react-router-dom";

import { useResourceWithRoute } from "@hooks";

export type HistoryType = "push" | "replace";

export const useNavigation = () => {
    const history = useHistory();
    const resourceWithRoute = useResourceWithRoute();

    const create = (resource: string, type: HistoryType) => {
        const resourceName = resourceWithRoute(resource);
        console.log("resourceName", resourceName);

        type === "push"
            ? history.push(`/resources/${resourceName}/create`)
            : history.replace(`/resources/${resourceName}/create`);
    };

    const edit = (resource: string, type: HistoryType, id: string) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/resources/${resourceName}/edit/${id}`)
            : history.replace(`/resources/${resourceName}/edit/${id}`);
    };

    const show = (resource: string, type: HistoryType, id: string) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/resources/${resourceName}/show/${id}`)
            : history.replace(`/resources/${resourceName}/show/${id}`);
    };

    const list = (resource: string, type: HistoryType) => {
        const resourceName = resourceWithRoute(resource);

        type === "push"
            ? history.push(`/resources/${resourceName}`)
            : history.replace(`/resources/${resourceName}`);
    };

    const push = (path: any) => {
        history.push(`${path}`);
    };

    const replace = (path: any) => {
        history.replace(`${path}`);
    };

    return { create, edit, show, list, push, replace };
};
