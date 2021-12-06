import { useContext } from "react";

import { LiveContext } from "@contexts/live";
import { ILiveContext } from "../../../interfaces";

export const usePublish: () => NonNullable<ILiveContext>["publish"] = () => {
    const liveContext = useContext<ILiveContext>(LiveContext);

    return liveContext?.publish;
};
