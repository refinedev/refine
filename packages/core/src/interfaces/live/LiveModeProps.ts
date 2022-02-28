import { LiveEvent } from ".";
import { BaseKey } from "..";

export type LiveModeProps = {
    liveMode?: "auto" | "manual" | "off";
    onLiveEvent?: (event: LiveEvent) => void;
    liveParams?: {
        ids?: BaseKey[];
        [key: string]: any;
    };
};

export type ILiveModeContextProvider = LiveModeProps;
