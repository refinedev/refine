import { useContext } from "react";
import { IRefineContext } from "../../../contexts/refine/types";
import { RefineContext } from "@contexts/refine";
import { LiveModeProps } from "../../../contexts/live/types";

export const useLiveMode = (
  liveMode: LiveModeProps["liveMode"],
): LiveModeProps["liveMode"] => {
  const { liveMode: liveModeFromContext } =
    useContext<IRefineContext>(RefineContext);

  return liveMode ?? liveModeFromContext;
};
