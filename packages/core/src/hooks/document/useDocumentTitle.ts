import { useEffect } from "react";
import { useResource } from "@hooks/resource";
import { RouteAction } from "../../interfaces";
import { userFriendlyResourceName } from "@definitions";

type DefaultPageTitleParams = {
    resourceName: string;
    id?: string | number | undefined;
    action: RouteAction;
};
export const useDocumentTitle = (title = "") => {
    const { resourceName, id, action } = useResource();
    const pageTitle = title
        ? title
        : buildDefaultPageTitle({ resourceName, id, action });

    console.log(resourceName, id, action, pageTitle);

    useEffect(() => {
        document.title = titleCase(pageTitle);
    }, [pageTitle]);
};

function buildDefaultPageTitle({
    resourceName,
    id,
    action,
}: DefaultPageTitleParams): string {
    let title = "";
    const titleSuffix = " | refine";

    if (id) {
        title += id;
    }

    if (action) {
        title += action === "create" ? `${action} New` : ` ${action}`;
        resourceName = userFriendlyResourceName(resourceName, "singular");
    }

    title += ` ${resourceName}${titleSuffix}`;

    return title;
}

function titleCase(str: string): string {
    const words = str.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(" ");
}
