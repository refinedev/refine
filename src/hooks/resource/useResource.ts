import { useContext } from "react";
import { ResourceContext } from "@contexts/resource";

export const useResource = () => {
    const {resources} = useContext(ResourceContext)

    return {resources};
}