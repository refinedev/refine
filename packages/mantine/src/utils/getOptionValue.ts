import { get } from "lodash";

export const getOptionValue = <TData>(
  item: TData,
  optionValue: string | ((item: TData) => string),
): string => {
  if (typeof optionValue === "string") {
    return get(item, optionValue).toString();
  }

  return optionValue(item).toString();
};
