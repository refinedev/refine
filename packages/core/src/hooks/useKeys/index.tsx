import { useRefineContext } from "..";
import { keys } from "@definitions/index";

export const useKeys = () => {
  const {
    options: { useNewQueryKeys },
  } = useRefineContext();

  return {
    keys,
    preferLegacyKeys: !useNewQueryKeys,
  };
};
