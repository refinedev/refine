import { useContext } from "react";
import { ResourceContext } from "@contexts/resource";
import { IResourceContext } from "../../../contexts/resource/IResourceContext";

export type UseResourceType = {
    (): {
        resources: IResourceContext["resources"];
    };
};

export const useResource: UseResourceType = () => {
    const { resources } = useContext(ResourceContext);

    return { resources };
};
