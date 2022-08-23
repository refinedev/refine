import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import { IRefineConfig } from "../../interfaces";

type UseMutationModeType = () => {
    mutationMode: IRefineConfig["mutationMode"];
    undoableTimeout: IRefineConfig["undoableTimeout"];
};

/**
 * Mutation mode determines which mode the mutation runs with.
 * Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`.
 * Each mode corresponds to a different type of user experience.
 *
 * @see {@link https://refine.dev/docs/guides-and-concepts/mutation-mode} for more details.
 */
export const useMutationMode: UseMutationModeType = () => {
    const { mutationMode, undoableTimeout, config } = useContext(RefineContext);

    const mode = mutationMode ?? config.mutationMode;
    const timeout = undoableTimeout ?? config.undoableTimeout;

    return { mutationMode: mode, undoableTimeout: timeout };
};
