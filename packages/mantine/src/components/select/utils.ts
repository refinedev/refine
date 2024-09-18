import type { ComboboxData, ComboboxItem } from "@mantine/core";

export const isString = (value: any) =>
  typeof value === "string" || value instanceof String;

export const convertOptions = (
  data: ComboboxData | undefined,
): ComboboxItem[] => {
  const ret: ComboboxItem[] = [];
  if (data) {
    data.forEach((opt) => {
      if (isString(opt)) {
        ret.push({
          label: opt as string,
          value: opt as string,
        } as ComboboxItem);
      } else {
        const o = opt as ComboboxItem;
        ret.push({
          label: (o.label || o.value.toString()) as string,
          value: o.value.toString() as string,
        } as ComboboxItem);
      }
    });
  }

  return ret;
};

export const getValue = (data: ComboboxData, val: string): ComboboxItem => {
  let found;
  data.some((opt) => {
    if (isString(opt)) {
      if (opt === val) {
        found = opt;
        return true;
      }
    } else {
      const so = opt as ComboboxItem;
      if (so.value === val) {
        found = opt;
        return true;
      }
    }
    return false;
  });

  if (found) {
    return found;
  }

  return { label: val, value: val };
};
