import { useContext } from "react";

import { LiveContext } from "@contexts/live";
import { LiveProvider } from "../../../contexts/live/types";

export const usePublish: () => NonNullable<LiveProvider>["publish"] = () => {
  const { liveProvider } = useContext(LiveContext);

  return liveProvider?.publish;
};
