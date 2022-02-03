import { useContext } from "react";
import { ResourceContext } from "@contexts/resource";
import { IResourceContext } from "../../../contexts/resource/IResourceContext";

export type UseResourceType = {
    (): {
        resources: IResourceContext["resources"];
    };
};

/**
 * `useResource` is used to get `resources` that are defined as property of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/core/hooks/resource/useResource} for more details.
 */
export const useResource: UseResourceType = () => {
    const { resources } = useContext(ResourceContext);

    return { resources };
};
