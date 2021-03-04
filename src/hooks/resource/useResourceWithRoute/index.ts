import { useContext } from "react";
import { ResourceContext } from "@contexts/resource";

export const useResourceWithRoute = (route: string) => {
    const { resources } = useContext(ResourceContext);

    const resource = resources.find((p) => p.route === route);

    if (!resource) {
        throw new Error("'resource' is required for delete button.");
    }

    return resource;
};
