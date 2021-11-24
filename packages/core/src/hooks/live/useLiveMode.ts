import { useContext } from "react";
import { ILiveModeContext, LiveModeProps } from "../../interfaces";
import { LiveModeContext } from "@contexts/live";

export const useLiveMode = (
    liveMode: LiveModeProps["liveMode"],
): LiveModeProps["liveMode"] => {
    const { liveMode: liveModeFromContext } =
        useContext<ILiveModeContext>(LiveModeContext);

    return liveMode ?? liveModeFromContext;
};
