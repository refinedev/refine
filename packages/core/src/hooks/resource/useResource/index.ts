import { useContext } from "react";
import { ResourceContext } from "@contexts/resource";
import { IResourceContext } from "../../../contexts/resource/IResourceContext";

export type UseResourceType = {
    (): {
        resources: IResourceContext["resources"];
    };
};

/**
 * `useResource` is used to get `<Resource>` properties that are defined as children of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/resource/useResource} for more details.
 */
export const useResource: UseResourceType = () => {
    const { resources } = useContext(ResourceContext);

    return { resources };
};
