import pluralize from "pluralize";
import { humanizeString } from "@definitions";

/**
 * A method that the internal uses
 * @internal
 * @deprecated use `useUserFriendlyName` instead.
 */
export const userFriendlyResourceName = (
  resource = "",
  type: "singular" | "plural",
): string => {
  const humanizeResource = humanizeString(resource);
  if (type === "singular") {
    return pluralize.singular(humanizeResource);
  }
  return pluralize.plural(humanizeResource);
};
