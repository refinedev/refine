import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import { IRefineContext } from "src/interfaces";

type UseMutationModeType = () => {
    mutationMode: IRefineContext["mutationMode"];
    undoableTimeout: IRefineContext["undoableTimeout"];
};

export const useMutationMode: UseMutationModeType = () => {
    const { mutationMode, undoableTimeout } = useContext(RefineContext);

    return { mutationMode, undoableTimeout };
};
