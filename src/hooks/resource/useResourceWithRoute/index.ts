import { useContext } from "react";
import { ResourceContext } from "@contexts/resource";

export const useResourceWithRoute = (route: string) => {
    const { resources } = useContext(ResourceContext);

    const resource = resources.find((p) => p.route === route);

    if (!resource) {
        throw new Error(`'${route}' not found on resources."`);
    }

    return resource;
};
