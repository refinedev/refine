import { LiveEvent } from ".";
import { BaseKey } from "..";

export type LiveModeProps = {
    /**
     * Live interaction mode to be used when `liveProvider` is set in `Refine` component
     */
    liveMode?: "auto" | "manual" | "off";
    /**
     * Callback function to be called when a related subscription is triggered
     */
    onLiveEvent?: (event: LiveEvent) => void;
    /**
     * Additional props to be passed to the live provider subscription
     */
    liveParams?: {
        ids?: BaseKey[];
        [key: string]: any;
    };
};

export type ILiveModeContextProvider = LiveModeProps;
