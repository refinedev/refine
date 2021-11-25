import { LiveEvent } from ".";

export type LiveModeProps = {
    liveMode?: "immediate" | "controlled";
    onLiveEvent?: (event: LiveEvent) => void;
    liveParams?: {
        id?: string;
        [key: string]: any;
    };
};

export type ILiveModeContext = LiveModeProps;
export type ILiveModeContextProvider = LiveModeProps;
