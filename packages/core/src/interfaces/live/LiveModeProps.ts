import { LiveEvent } from ".";

export type LiveModeProps = {
    liveMode?: "immediate" | "controlled";
    onLiveEvent?: (event: LiveEvent) => void;
};

export type ILiveModeContext = LiveModeProps;
export type ILiveModeContextProvider = LiveModeProps;
