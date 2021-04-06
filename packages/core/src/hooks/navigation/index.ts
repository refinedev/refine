import { useHistory } from "react-router-dom";

export type HistoryType = "push" | "replace";

export const useNavigation = () => {
    const history = useHistory();

    // const resourceName = useResourceWithRoute(resource);

    const create = (resource: string, type: HistoryType) => {
        type === "push"
            ? history.push(`/resources/${resource}/create`)
            : history.replace(`/resources/${resource}/create`);
    };

    const edit = (resource: string, type: HistoryType, id: string) => {
        type === "push"
            ? history.push(`/resources/${resource}/edit/${id}`)
            : history.replace(`/resources/${resource}/edit/${id}`);
    };

    const show = (resource: string, type: HistoryType, id: string) => {
        type === "push"
            ? history.push(`/resources/${resource}/show/${id}`)
            : history.replace(`/resources/${resource}/show/${id}`);
    };

    const list = (resource: string, type: HistoryType) => {
        type === "push"
            ? history.push(`/resources/${resource}`)
            : history.replace(`/resources/${resource}`);
    };

    const push = (path: any) => {
        history.push(`${path}`);
    };

    const replace = (path: any) => {
        history.replace(`${path}`);
    };

    return { create, edit, show, list, push, replace };
};
