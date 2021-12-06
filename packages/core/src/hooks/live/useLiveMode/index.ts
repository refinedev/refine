import { useContext } from "react";
import { LiveModeProps, IRefineContext } from "../../../interfaces";
import { RefineContext } from "@contexts/refine";

export const useLiveMode = (
    liveMode: LiveModeProps["liveMode"],
): LiveModeProps["liveMode"] => {
    const { liveMode: liveModeFromContext } =
        useContext<IRefineContext>(RefineContext);

    return liveMode ?? liveModeFromContext;
};
